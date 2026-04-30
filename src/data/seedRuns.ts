import type { AgentRun, AgentRunStatus, AgentStep, LogLine } from '../types/agent.ts'
import { tasksById } from './tasks.ts'
import { templatesByTaskId } from './agentTemplates.ts'
import { elapsedToTs } from '../utils/format.ts'

type Seed = {
  id: string
  taskId: string
  label: string
  repoSlug: string
  status: AgentRunStatus
  pct: number
  /** seconds-ago that this run started, used to derive `startedAt`. */
  startedSecondsAgo: number
  endedSecondsAgo?: number
  result?: AgentRun['result']
}

function buildRunFromSeed(seed: Seed, now: number): AgentRun {
  const task = tasksById.get(seed.taskId)!
  const tpl = templatesByTaskId[seed.taskId]!

  const steps: AgentStep[] = tpl.steps.map((s, i) => {
    if (seed.status === 'error' && tpl.failAtPct != null && s.doneAtPct >= tpl.failAtPct) {
      // mark the failing step (the first step at/after failAtPct) as error, the rest pending
      const isFailingStep = i === tpl.steps.findIndex((ss) => ss.doneAtPct >= tpl.failAtPct!)
      return {
        label: s.label,
        detail: isFailingStep ? (tpl.failMessage ?? s.detail) : s.detail,
        status: isFailingStep ? 'error' : 'pending',
      }
    }
    if (seed.pct >= s.doneAtPct) return { label: s.label, detail: s.detail, status: 'done' }
    const isFirstUndone = tpl.steps.slice(0, i).every((ss) => seed.pct >= ss.doneAtPct)
    return { label: s.label, detail: s.detail, status: isFirstUndone && seed.status === 'running' ? 'running' : 'pending' }
  })

  const log: LogLine[] = tpl.logScript
    .filter((l) => l.atPct <= seed.pct)
    .map((l) => ({ ts: elapsedToTs((l.atPct / 100) * task.estDurationSec), text: l.text, kind: l.kind }))

  if (seed.status === 'running') {
    log.push({ ts: elapsedToTs(seed.startedSecondsAgo), text: 'working…', blink: true })
  }

  return {
    id: seed.id,
    taskId: seed.taskId,
    label: seed.label,
    repoSlug: seed.repoSlug,
    status: seed.status,
    pct: seed.pct,
    startedAt: now - seed.startedSecondsAgo * 1000,
    endedAt: seed.endedSecondsAgo != null ? now - seed.endedSecondsAgo * 1000 : undefined,
    estTokens: task.estTokens,
    estCost: task.estCost,
    estDurationSec: task.estDurationSec,
    steps,
    log,
    result: seed.result,
  }
}

const seeds: Seed[] = [
  // — backend-api (the wireframe's hero state: one running, one done, one errored) —
  {
    id: 'seed-backend-dep',
    taskId: 'dep-upgrade',
    label: 'dep-upgrade-agent',
    repoSlug: 'backend-api',
    status: 'running',
    pct: 62,
    startedSecondsAgo: 102,
  },
  {
    id: 'seed-backend-pr',
    taskId: 'create-pr',
    label: 'pr-create-agent',
    repoSlug: 'backend-api',
    status: 'done',
    pct: 100,
    startedSecondsAgo: 12 * 60,
    endedSecondsAgo: 11 * 60,
    result: { kind: 'pr', number: 214, title: 'feat: remove deprecated JWT verifier' },
  },
  {
    id: 'seed-backend-sec',
    taskId: 'sec-scan',
    label: 'sec-scan',
    repoSlug: 'backend-api',
    status: 'error',
    pct: 48,
    startedSecondsAgo: 4 * 60,
    endedSecondsAgo: 3 * 60,
  },

  // — cross-repo seeds for the global drawer —
  { id: 'seed-fe-refactor', taskId: 'refactor', label: 'refactor', repoSlug: 'frontend-v3', status: 'running', pct: 48, startedSecondsAgo: 130 },
  { id: 'seed-fe-tests', taskId: 'run-tests', label: 'run-tests', repoSlug: 'frontend-v3', status: 'running', pct: 71, startedSecondsAgo: 50 },
  { id: 'seed-k8s-sec', taskId: 'sec-scan', label: 'sec-scan', repoSlug: 'infra-k8s', status: 'running', pct: 40, startedSecondsAgo: 240 },
  { id: 'seed-k8s-map', taskId: 'dep-map', label: 'dep-map', repoSlug: 'infra-k8s', status: 'running', pct: 22, startedSecondsAgo: 38 },
  { id: 'seed-ml-tests', taskId: 'run-tests', label: 'run-tests', repoSlug: 'ml-pipeline', status: 'running', pct: 55, startedSecondsAgo: 68 },
  { id: 'seed-ml-dep', taskId: 'dep-upgrade', label: 'dep-upgrade', repoSlug: 'ml-pipeline', status: 'error', pct: 40, startedSecondsAgo: 8 * 60, endedSecondsAgo: 4 * 60 },
  { id: 'seed-data-refactor', taskId: 'refactor', label: 'refactor', repoSlug: 'data-ingest', status: 'running', pct: 34, startedSecondsAgo: 200 },
  { id: 'seed-edge-sec', taskId: 'sec-scan', label: 'sec-scan', repoSlug: 'edge-proxy', status: 'running', pct: 30, startedSecondsAgo: 168 },
  { id: 'seed-edge-pr', taskId: 'create-pr', label: 'pr-create', repoSlug: 'edge-proxy', status: 'running', pct: 15, startedSecondsAgo: 11 },
  {
    id: 'seed-gateway-dep',
    taskId: 'dep-upgrade',
    label: 'dep-upgrade',
    repoSlug: 'api-gateway',
    status: 'done',
    pct: 100,
    startedSecondsAgo: 24 * 60,
    endedSecondsAgo: 22 * 60,
    result: { kind: 'pr', number: 88, title: 'chore: bump go modules' },
  },
]

/** Build all seeded runs from canned templates, anchored to `now`. */
export function buildSeedRuns(now: number): AgentRun[] {
  return seeds.map((s) => buildRunFromSeed(s, now))
}

// ── recent (historical) runs surfaced in the InsightsPanel ──
export type RecentRun = {
  label: string
  status: 'done' | 'error'
  elapsed: string
  detail: string
}

const recentBackend: RecentRun[] = [
  { label: 'dep-upgrade-agent', status: 'done', elapsed: '12m ago', detail: '6 deps bumped · PR #214' },
  { label: 'sec-scan-agent', status: 'error', elapsed: '2h ago', detail: 'failed: timeout on SAST pass' },
  { label: 'run-tests-agent', status: 'done', elapsed: '3h ago', detail: '148 passed · 2 skipped' },
  { label: 'pr-create-agent', status: 'done', elapsed: '1d ago', detail: 'PR #208 merged' },
]

const recentFrontend: RecentRun[] = [
  { label: 'run-tests-agent', status: 'done', elapsed: '1h ago', detail: '224 passed · coverage 81%' },
  { label: 'refactor-agent', status: 'done', elapsed: '8h ago', detail: 'PR #142 opened' },
]

const recentDefault: RecentRun[] = [
  { label: 'run-tests-agent', status: 'done', elapsed: '6h ago', detail: 'all green' },
]

export function getRecentRunsForRepo(slug: string): RecentRun[] {
  if (slug === 'backend-api') return recentBackend
  if (slug === 'frontend-v3') return recentFrontend
  return recentDefault
}
