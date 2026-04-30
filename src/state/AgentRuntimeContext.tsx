import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from 'react'
import type { AgentRun, AgentStep, LogLine } from '../types/agent.ts'
import { tasksById } from '../data/tasks.ts'
import { templatesByTaskId } from '../data/agentTemplates.ts'
import { buildSeedRuns } from '../data/seedRuns.ts'
import { elapsedToTs } from '../utils/format.ts'

const TICK_MS = 250

type State = {
  runs: AgentRun[]
  /** ids of runs the user has dismissed (hidden from tabs but kept for history). */
  dismissed: string[]
}

type Action =
  | { type: 'tick'; now: number }
  | { type: 'launch'; run: AgentRun }
  | { type: 'abort'; runId: string }
  | { type: 'dismiss'; runId: string }

let runIdSeq = 0
const newRunId = (taskId: string) => `run-${taskId}-${++runIdSeq}-${Math.random().toString(36).slice(2, 6)}`

/** Maximum positive jitter applied per tick (% of total run progress). */
const TICK_JITTER_PCT = 1.5

function progressRun(run: AgentRun, now: number): AgentRun {
  if (run.status !== 'running') return run

  const elapsedSec = Math.max(0, (now - run.startedAt) / 1000)
  const targetPct = Math.min(100, (elapsedSec / run.estDurationSec) * 100)
  const tpl = templatesByTaskId[run.taskId]
  if (!tpl) return run

  // 1. determine new pct. Add a small forward jitter so progress doesn't feel
  //    perfectly linear, then clamp to the fail/done cap and to the prior pct
  //    (progress is monotonic — never goes backwards across ticks).
  const willFail = tpl.outcome === 'fail' && tpl.failAtPct != null
  const cap = willFail ? tpl.failAtPct! : 100
  const jitter = targetPct > 0 && targetPct < cap ? Math.random() * TICK_JITTER_PCT : 0
  const nextPct = Math.max(run.pct, Math.min(targetPct + jitter, cap))

  // 2. recompute step states from doneAtPct thresholds.
  const nextSteps: AgentStep[] = tpl.steps.map((stepDef, i) => {
    const prev = run.steps[i]
    if (prev?.status === 'error') return prev
    if (nextPct >= stepDef.doneAtPct) {
      return { label: stepDef.label, detail: stepDef.detail, status: 'done' }
    }
    const isFirstUndone = tpl.steps.slice(0, i).every((s) => nextPct >= s.doneAtPct)
    return {
      label: stepDef.label,
      detail: stepDef.detail,
      status: isFirstUndone ? 'running' : 'pending',
    }
  })

  // 3. append new log lines whose atPct threshold has been crossed since last tick.
  // Always copy into a fresh array — the rest of this function may mutate trailing entries.
  const seenLogTexts = new Set(run.log.map((l) => l.text))
  const newlyAppearing: LogLine[] = tpl.logScript
    .filter((l) => l.atPct <= nextPct && !seenLogTexts.has(l.text))
    .map((l) => ({ ts: elapsedToTs((l.atPct / 100) * run.estDurationSec), text: l.text, kind: l.kind }))
  const log: LogLine[] = newlyAppearing.length
    ? [...run.log.filter((l) => !l.blink), ...newlyAppearing]
    : [...run.log]

  // 4. resolve final status when we hit 100% (or fail threshold).
  let status: AgentRun['status'] = run.status
  let endedAt = run.endedAt
  if (willFail && nextPct >= cap) {
    status = 'error'
    endedAt = now
    // mark the failing step explicitly.
    if (tpl.failAtPct != null) {
      const failingStepIndex = tpl.steps.findIndex((s) => s.doneAtPct >= tpl.failAtPct!)
      if (failingStepIndex >= 0) {
        nextSteps[failingStepIndex] = {
          ...nextSteps[failingStepIndex],
          status: 'error',
          detail: tpl.failMessage ?? nextSteps[failingStepIndex].detail,
        }
      }
    }
  } else if (nextPct >= 100) {
    status = 'done'
    endedAt = now
  }

  // 5. add a blinking "in progress" line at the tail while still running.
  if (status === 'running') {
    const lastLog = log[log.length - 1]
    if (!lastLog?.blink) {
      log.push({ ts: elapsedToTs(elapsedSec), text: 'working…', blink: true })
    } else {
      // refresh ts on the existing blink line
      log[log.length - 1] = { ...lastLog, ts: elapsedToTs(elapsedSec) }
    }
  } else {
    // strip blink lines once finished
    while (log.length && log[log.length - 1].blink) log.pop()
  }

  // Attach the template's success artifact (if any) the moment the run completes.
  const result = status === 'done' && run.result == null ? tpl.successResult : run.result

  return { ...run, pct: nextPct, status, endedAt, steps: nextSteps, log, result }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'tick': {
      let changed = false
      const nextRuns = state.runs.map((r) => {
        if (r.status !== 'running') return r
        const updated = progressRun(r, action.now)
        if (updated !== r) changed = true
        return updated
      })
      return changed ? { ...state, runs: nextRuns } : state
    }
    case 'launch':
      return { ...state, runs: [...state.runs, action.run] }
    case 'abort':
      return {
        ...state,
        runs: state.runs.map((r) =>
          r.id === action.runId && r.status === 'running'
            ? { ...r, status: 'aborted', endedAt: Date.now(), pct: r.pct }
            : r,
        ),
      }
    case 'dismiss':
      return { ...state, dismissed: state.dismissed.includes(action.runId) ? state.dismissed : [...state.dismissed, action.runId] }
    default:
      return state
  }
}

export type AgentRuntimeValue = {
  runs: AgentRun[]
  dismissed: string[]
  activeAgentCount: number
  runningCountByRepo: Record<string, number>
  runsForRepo: (slug: string) => AgentRun[]
  visibleRunsForRepo: (slug: string) => AgentRun[]
  launch: (taskId: string, repoSlug: string) => string | null
  abort: (runId: string) => void
  dismiss: (runId: string) => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const AgentRuntimeContext = createContext<AgentRuntimeValue | null>(null)

function initialState(): State {
  return { runs: buildSeedRuns(Date.now()), dismissed: [] }
}

export function AgentRuntimeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState)

  // Tick engine. `useRef` ensures the interval id survives strict-mode double-invocation.
  const intervalRef = useRef<number | null>(null)
  useEffect(() => {
    if (intervalRef.current != null) return
    intervalRef.current = window.setInterval(() => dispatch({ type: 'tick', now: Date.now() }), TICK_MS)
    return () => {
      if (intervalRef.current != null) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [])

  const launch = useCallback((taskId: string, repoSlug: string): string | null => {
    const task = tasksById.get(taskId)
    const tpl = templatesByTaskId[taskId]
    if (!task || !tpl) return null
    const id = newRunId(taskId)
    const run: AgentRun = {
      id,
      taskId,
      label: task.label.toLowerCase().replace(/\s+/g, '-'),
      repoSlug,
      status: 'running',
      pct: 0,
      startedAt: Date.now(),
      estTokens: task.estTokens,
      estCost: task.estCost,
      estDurationSec: task.estDurationSec,
      steps: tpl.steps.map((s) => ({ label: s.label, detail: s.detail, status: 'pending' })),
      log: [{ ts: '[00:00]', text: 'starting agent…' }],
    }
    dispatch({ type: 'launch', run })
    return id
  }, [])

  const abort = useCallback((runId: string) => dispatch({ type: 'abort', runId }), [])
  const dismiss = useCallback((runId: string) => dispatch({ type: 'dismiss', runId }), [])

  const value = useMemo<AgentRuntimeValue>(() => {
    const runningCountByRepo: Record<string, number> = {}
    let activeAgentCount = 0
    for (const r of state.runs) {
      if (r.status === 'running') {
        activeAgentCount++
        runningCountByRepo[r.repoSlug] = (runningCountByRepo[r.repoSlug] ?? 0) + 1
      }
    }
    const runsForRepo = (slug: string) => state.runs.filter((r) => r.repoSlug === slug)
    const visibleRunsForRepo = (slug: string) =>
      state.runs.filter((r) => r.repoSlug === slug && !state.dismissed.includes(r.id))
    return {
      runs: state.runs,
      dismissed: state.dismissed,
      activeAgentCount,
      runningCountByRepo,
      runsForRepo,
      visibleRunsForRepo,
      launch,
      abort,
      dismiss,
    }
  }, [state, launch, abort, dismiss])

  return <AgentRuntimeContext.Provider value={value}>{children}</AgentRuntimeContext.Provider>
}
