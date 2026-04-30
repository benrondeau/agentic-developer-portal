import type { AgentRunStatus } from '../../types/agent.ts'

/**
 * Tailwind class set per agent status for the small circle shown next to an
 * agent's name. Shared by the drawer, the tab bar, and the meta panel so the
 * three call sites tell the same color story:
 *
 *   running → pulsing accent (matches the in-flight progress bar)
 *   done    → solid green   (matches the completed progress bar)
 *   error   → solid red     (matches the failed progress bar)
 *   aborted → solid muted   (stopped before completion — neither success nor failure)
 */
export const STATUS_DOT: Record<AgentRunStatus, string> = {
  running: 'animate-pulse-soft bg-accent',
  done: 'bg-green',
  error: 'bg-red',
  aborted: 'bg-muted',
}
