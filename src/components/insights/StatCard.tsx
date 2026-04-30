import type { RepoStat } from '../../types/repo.ts'
import { cn } from '../../utils/cn.ts'

export function StatCard({ stat }: { stat: RepoStat }) {
  return (
    <div
      className={cn(
        'flex-1 rounded-[4px] border-[1.5px] px-2.5 py-2',
        stat.warn ? 'border-orange bg-orange-bg' : 'border-border bg-surface-2',
      )}
    >
      <div className={cn('font-mono text-xl font-semibold', stat.warn ? 'text-orange' : 'text-text')}>
        {stat.value}
      </div>
      <div className="mt-0.5 font-mono text-[10px] text-muted">{stat.label}</div>
    </div>
  )
}
