import type { RepoStat } from '../../types/repo.ts'
import { StatCard } from './StatCard.tsx'

export function StatGrid({ stats }: { stats: RepoStat[] }) {
  return (
    <div className="mb-3 grid grid-cols-3 gap-2">
      {stats.map((s) => (
        <StatCard key={s.label} stat={s} />
      ))}
    </div>
  )
}
