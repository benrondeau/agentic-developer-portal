import { useEffect, useRef } from 'react'
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
  const ref = useRef<HTMLButtonElement>(null)

  // Bring the active tab into view when it becomes active. Fires when the
  // user picks an agent from the global drawer (which sets `?run=<id>`) and
  // the tab is currently scrolled out of view in the overflow tab bar.
  useEffect(() => {
    if (!active) return
    ref.current?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' })
  }, [active])

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={cn(
        'flex flex-shrink-0 cursor-pointer items-center gap-1.5 px-3.5 py-1.5 font-mono text-[12px] whitespace-nowrap select-none',
        'border-b-2',
        active
          ? 'border-accent bg-accent-bg text-accent-text'
          : 'border-transparent bg-transparent text-muted hover:text-text',
      )}
    >
      <span className={cn('h-1.5 w-1.5 flex-shrink-0 rounded-full', statusDot[status])} />
      {label}
    </button>
  )
}
