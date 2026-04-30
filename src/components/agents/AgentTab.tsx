import type { AgentRunStatus } from '../../types/agent.ts'
import { cn } from '../../utils/cn.ts'

const statusDot: Record<AgentRunStatus, string> = {
  running: 'bg-green animate-pulse-soft',
  done: 'bg-muted',
  error: 'bg-red',
  aborted: 'bg-muted',
}

type AgentTabProps = {
  label: string
  status: AgentRunStatus
  active: boolean
  onClick: () => void
}

export function AgentTab({ label, status, active, onClick }: AgentTabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex flex-shrink-0 cursor-pointer items-center gap-1.5 px-3.5 py-1.5 font-mono text-[10px] whitespace-nowrap select-none',
        'border-b-2',
        active ? 'border-accent bg-accent-bg text-accent-text' : 'border-transparent bg-transparent text-muted hover:text-text',
      )}
    >
      <span className={cn('h-1.5 w-1.5 flex-shrink-0 rounded-full', statusDot[status])} />
      {label}
    </button>
  )
}
