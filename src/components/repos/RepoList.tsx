import { useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { repos } from '../../data/repos.ts'
import { useAgentRuntime } from '../../hooks/useAgentRuntime.ts'
import { RepoListItem } from './RepoListItem.tsx'
import { RepoSearchBox } from './RepoSearchBox.tsx'
import { RepoFilterChips, type RepoFilter } from './RepoFilterChips.tsx'

export function RepoList() {
  const { repoSlug } = useParams()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<RepoFilter>('all')
  const { runningCountByRepo } = useAgentRuntime()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return repos.filter((r) => {
      if (q && !r.name.toLowerCase().includes(q)) return false
      if (filter === 'active') return (runningCountByRepo[r.slug] ?? 0) > 0
      if (filter === 'attention') return r.warn === true
      return true
    })
  }, [query, filter, runningCountByRepo])

  return (
    <aside className="flex w-[20%] flex-shrink-0 flex-col border-r-[1.5px] border-border bg-surface-2">
      <div className="border-b border-border p-3">
        <RepoSearchBox value={query} onChange={setQuery} />
      </div>
      <div className="flex gap-1.5 border-b border-border px-3 py-2">
        <RepoFilterChips value={filter} onChange={setFilter} />
      </div>
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="px-3.5 py-6 font-mono text-[12px] text-muted">no repos match</div>
        ) : (
          filtered.map((r) => (
            <RepoListItem
              key={r.slug}
              repo={r}
              active={r.slug === repoSlug}
              runningCount={runningCountByRepo[r.slug] ?? 0}
            />
          ))
        )}
      </div>
    </aside>
  )
}
