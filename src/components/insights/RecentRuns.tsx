import type { RecentRun } from '../../data/seedRuns.ts'
import { cn } from '../../utils/cn.ts'

function RecentRunRow({ run }: { run: RecentRun }) {
  const isError = run.status === 'error'
  return (
    <div className="mb-1 flex cursor-pointer items-start gap-2 rounded-[3px] border border-border bg-surface-2 px-2 py-1.5 hover:border-accent">
      <div
        className={cn(
          'mt-1 h-2 w-2 flex-shrink-0 rounded-full border-[1.5px]',
          isError ? 'border-red bg-red' : 'border-muted bg-transparent',
        )}
      />
      <div className="min-w-0 flex-1">
        <div className="flex justify-between gap-1">
          <span className="overflow-hidden font-mono text-[10px] text-ellipsis whitespace-nowrap text-text">
            {run.label}
          </span>
          <span className="flex-shrink-0 font-mono text-[9px] text-muted">{run.elapsed}</span>
        </div>
        <div className={cn('mt-px font-mono text-[9px]', isError ? 'text-red' : 'text-muted')}>
          {run.detail}
        </div>
      </div>
    </div>
  )
}

export function RecentRuns({ runs }: { runs: RecentRun[] }) {
  return (
    <div>
      {runs.map((r, i) => (
        <RecentRunRow key={i} run={r} />
      ))}
    </div>
  )
}
