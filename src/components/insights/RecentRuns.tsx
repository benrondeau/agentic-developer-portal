import type { RecentRun } from '../../data/seedRuns.ts'
import { useUrlParam } from '../../hooks/useUrlParam.ts'
import { cn } from '../../utils/cn.ts'

function RecentRunRow({ run, onClick }: { run: RecentRun; onClick: () => void }) {
  const isError = run.status === 'error'
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-1.5 flex w-full cursor-pointer items-start gap-2.5 rounded-[3px] border border-border bg-surface-2 px-3 py-2.5 text-left hover:border-accent"
    >
      <div
        className={cn(
          'mt-1 h-2 w-2 flex-shrink-0 rounded-full border-[1.5px]',
          isError ? 'border-red bg-red' : 'border-muted bg-transparent',
        )}
      />
      <div className="min-w-0 flex-1">
        <div className="flex justify-between gap-1">
          <span className="overflow-hidden font-mono text-[12px] text-ellipsis whitespace-nowrap text-text">
            {run.label}
          </span>
          <span className="flex-shrink-0 font-mono text-[11px] text-muted">{run.elapsed}</span>
        </div>
        <div className={cn('mt-px font-mono text-[11px]', isError ? 'text-red' : 'text-muted')}>
          {run.detail}
        </div>
      </div>
    </button>
  )
}

export function RecentRuns({ runs }: { runs: RecentRun[] }) {
  // Clicking a recent row sets `?retry=<taskId>` which `LaunchModalController`
  // reads and renders the agent-confirmation modal in retry mode for the same
  // task on the current repo.
  const [, setRetryParam] = useUrlParam('retry')
  return (
    <div>
      {runs.map((r) => (
        <RecentRunRow
          key={`${r.label}|${r.elapsed}`}
          run={r}
          onClick={() => setRetryParam(r.taskId)}
        />
      ))}
    </div>
  )
}
