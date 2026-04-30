export type LogKind = 'log' | 'ok' | 'warn' | 'err' | 'info'

export type LogLine = {
  ts: string
  text: string
  kind?: LogKind
  blink?: boolean
}

export type StepStatus = 'pending' | 'running' | 'done' | 'error'

export type StepDef = {
  label: string
  detail?: string
  /** percent of total run progress at which this step transitions to `done`. */
  doneAtPct: number
}

export type AgentStep = {
  label: string
  detail?: string
  status: StepStatus
}

export type LogScriptEntry = {
  /** percent of total run progress at which this line should appear. */
  atPct: number
  text: string
  kind?: LogKind
}

export type AgentTemplate = {
  taskId: string
  steps: StepDef[]
  logScript: LogScriptEntry[]
  /** Deterministic outcome — most templates 'success', sec-scan demonstrates 'fail'. */
  outcome: 'success' | 'fail'
  failAtPct?: number
  failMessage?: string
}

export type AgentRunStatus = 'running' | 'done' | 'error' | 'aborted'

export type AgentRun = {
  id: string
  taskId: string
  /** human-readable agent label e.g. "dep-upgrade-agent". */
  label: string
  repoSlug: string
  status: AgentRunStatus
  pct: number
  startedAt: number
  endedAt?: number
  /** mock token usage projection. */
  estTokens: number
  estCost: number
  estDurationSec: number
  steps: AgentStep[]
  log: LogLine[]
  /** when 'done', the resulting artifact (PR number etc) for the toolbar. */
  result?: { kind: 'pr'; number: number; title: string } | { kind: 'report'; summary: string }
}
