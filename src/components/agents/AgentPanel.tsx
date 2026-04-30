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
import { useUrlParam } from '../../hooks/useUrlParam.ts'

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

  // The active tab is driven by the `?run=<id>` query param so it can be set from
  // outside (e.g. the global agents drawer). Falls back to the latest run.
  const [runIdFromUrl, setRunIdParam] = useUrlParam('run')
  const [viewMode, setViewMode] = useState<ViewMode>('split')

  if (runs.length === 0) {
    return (
      <AgentPanelEmpty message={'Trigger an agent task from the\ncenter panel to see live activity here.'} />
    )
  }

  const pickedRun = runIdFromUrl ? runs.find((r) => r.id === runIdFromUrl) : null
  // The URL pointed at a run that no longer exists for this repo (stale deep-link,
  // dismissed, or wrong repo). Surface a banner so the user understands why we're
  // showing something else.
  const isStaleRun = runIdFromUrl != null && pickedRun == null
  const active = pickedRun ?? runs[runs.length - 1]

  const handleSelectTab = (runId: string) => setRunIdParam(runId)

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
        <AgentTabBar runs={runs} activeId={active.id} onSelect={handleSelectTab} />
        <div className="ml-2.5 flex-shrink-0 py-2.5">
          <ViewModeToggle value={viewMode} onChange={setViewMode} />
        </div>
      </div>

      {isStaleRun && (
        <div className="flex flex-shrink-0 items-center gap-2 border-b border-border bg-surface-2 px-4 py-2 font-mono text-[11px] text-muted">
          <Icon name="warn" size={11} color="var(--c-muted)" />
          <span>
            agent <span className="font-semibold text-text">{runIdFromUrl}</span> is no longer available
            on this repo — showing the latest run instead.
          </span>
          <button
            type="button"
            onClick={() => setRunIdParam(null)}
            className="ml-auto cursor-pointer underline-offset-2 hover:text-text hover:underline"
          >
            dismiss
          </button>
        </div>
      )}

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
