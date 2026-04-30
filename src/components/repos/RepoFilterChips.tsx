import { cn } from '../../utils/cn.ts'

export type RepoFilter = 'all' | 'active' | 'mine'

const filters: ReadonlyArray<{ value: RepoFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'mine', label: 'Mine' },
]

type RepoFilterChipsProps = {
  value: RepoFilter
  onChange: (next: RepoFilter) => void
}

export function RepoFilterChips({ value, onChange }: RepoFilterChipsProps) {
  return (
    <div className="flex gap-1.5">
      {filters.map((f) => {
        const selected = f.value === value
        return (
          <button
            key={f.value}
            type="button"
            onClick={() => onChange(f.value)}
            className={cn(
              'flex-shrink-0 cursor-pointer rounded-[3px] border px-1.5 py-px font-mono text-[12px] whitespace-nowrap',
              selected
                ? 'border-transparent bg-accent text-white'
                : 'border-border bg-transparent text-muted hover:text-text',
            )}
          >
            {f.label}
          </button>
        )
      })}
    </div>
  )
}
