import type { AgentRun } from '../../types/agent.ts'
import { AgentTab } from './AgentTab.tsx'

type AgentTabBarProps = {
  runs: AgentRun[]
  activeId: string | null
  onSelect: (runId: string) => void
}

export function AgentTabBar({ runs, activeId, onSelect }: AgentTabBarProps) {
  return (
    <div className="flex min-w-0 flex-1 overflow-x-auto border-l border-border">
      {runs.map((r) => (
        <AgentTab
          key={r.id}
          label={r.label}
          status={r.status}
          active={r.id === activeId}
          onClick={() => onSelect(r.id)}
        />
      ))}
    </div>
  )
}
