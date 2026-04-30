import { cn } from '../../utils/cn.ts'

export type ViewMode = 'split' | 'steps' | 'log'

const options: ReadonlyArray<{ value: ViewMode; label: string }> = [
  { value: 'split', label: 'Split' },
  { value: 'steps', label: 'Steps' },
  { value: 'log', label: 'Log' },
]

type ViewModeToggleProps = {
  value: ViewMode
  onChange: (next: ViewMode) => void
}

export function ViewModeToggle({ value, onChange }: ViewModeToggleProps) {
  return (
    <div className="flex flex-shrink-0 gap-1.5">
      {options.map((opt) => {
        const selected = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              'cursor-pointer rounded-[3px] border px-2 py-1 font-mono text-[11px]',
              selected
                ? 'border-accent bg-accent-bg text-accent-text'
                : 'border-border bg-transparent text-muted hover:text-text',
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
