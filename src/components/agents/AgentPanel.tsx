import { useState } from 'react'
import { Icon } from '../primitives/Icon.tsx'
import { EmptyPane } from '../primitives/EmptyPane.tsx'
import { Label } from '../primitives/Label.tsx'
import { AgentTabBar } from './AgentTabBar.tsx'
import { ViewModeToggle, type ViewMode } from './ViewModeToggle.tsx'
import { AgentMeta } from './AgentMeta.tsx'
import { StepList } from './StepList.tsx'
import { Terminal } from './Terminal.tsx'
import { AgentToolbar } from './AgentToolbar.tsx'
import { useAgentRuntime } from '../../hooks/useAgentRuntime.ts'

const PANEL_BASE = 'flex w-[50%] min-w-0 flex-shrink-0 flex-col bg-surface'

export function AgentPanelEmpty({ message }: { message: string }) {
  return (
    <section className={PANEL_BASE}>
      <div className="flex-shrink-0 border-b border-border px-4 py-2.5 font-mono text-[14px] font-semibold text-text">
        Agent Activity
      </div>
      <EmptyPane
        icon={<Icon name="agent" size={32} color="var(--c-muted-2)" />}
        title="No agent running"
        sub={message}
      />
    </section>
  )
}

export function AgentPanel({ repoSlug }: { repoSlug: string }) {
  const { visibleRunsForRepo } = useAgentRuntime()
  const runs = visibleRunsForRepo(repoSlug)

  // userPickedId is the user's most recent tab choice (or null if they haven't picked).
  // The "effective" active id is derived: their pick if still present, otherwise the latest run.
  const [userPickedId, setUserPickedId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('split')

  if (runs.length === 0) {
    return (
      <AgentPanelEmpty message={'Trigger an agent task from the\ncenter panel to see live activity here.'} />
    )
  }

  const pickedRun = userPickedId ? runs.find((r) => r.id === userPickedId) : null
  const active = pickedRun ?? runs[runs.length - 1]
  const runningCount = runs.filter((r) => r.status === 'running').length
  const doneCount = runs.filter((r) => r.status === 'done').length

  return (
    <section className={PANEL_BASE}>
      <div className="flex min-w-0 flex-shrink-0 items-center gap-0 overflow-hidden border-b border-border px-3.5">
        <span className="mr-2 flex-shrink-0 py-3 font-mono text-[14px] font-semibold text-text">
          Agent Activity
        </span>
        <span className="mr-2 flex-shrink-0 py-3 font-mono text-[11px] whitespace-nowrap text-muted">
          {runningCount} running · {doneCount} done
        </span>
        <AgentTabBar runs={runs} activeId={active.id} onSelect={setUserPickedId} />
        <div className="ml-2.5 flex-shrink-0 py-2.5">
          <ViewModeToggle value={viewMode} onChange={setViewMode} />
        </div>
      </div>

      <AgentMeta run={active} />

      <div className="flex flex-1 overflow-hidden">
        {(viewMode === 'steps' || viewMode === 'split') && (
          <div
            className={`overflow-y-auto px-3.5 py-2.5 ${viewMode === 'split' ? 'w-[260px] flex-shrink-0 border-r border-border' : 'flex-1'}`}
          >
            <StepList steps={active.steps} />
          </div>
        )}
        {(viewMode === 'log' || viewMode === 'split') && (
          <div className="flex flex-1 flex-col gap-2 overflow-hidden p-3.5">
            <Label>Live Log</Label>
            <Terminal lines={active.log} />
            <AgentToolbar run={active} />
          </div>
        )}
      </div>
    </section>
  )
}
