import { Link } from 'react-router'
import { Icon } from '../primitives/Icon.tsx'
import type { Suggestion } from '../../types/suggestion.ts'
import type { TaskColorToken } from '../../types/task.ts'
import { cn } from '../../utils/cn.ts'

const colorClassMap: Record<TaskColorToken, string> = {
  accent: 'text-accent',
  green: 'text-green',
  orange: 'text-orange',
  red: 'text-red',
  purple: 'text-purple',
}

type SuggestionRowProps = {
  suggestion: Suggestion
  repoSlug: string
}

function SuggestionRow({ suggestion, repoSlug }: SuggestionRowProps) {
  return (
    <div className="mb-1.5 flex items-center gap-2 rounded-[4px] border-[1.5px] border-border bg-surface-2 px-2.5 py-1.5">
      <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-[4px] border border-border bg-surface">
        <Icon
          name={suggestion.icon}
          size={14}
          color={`var(--c-${suggestion.color})`}
          className={colorClassMap[suggestion.color]}
        />
      </span>
      <span className="flex-1 font-mono text-[11px] text-text">{suggestion.text}</span>
      <Link
        to={`/repo/${repoSlug}?launch=${suggestion.taskId}`}
        className={cn(
          'inline-flex flex-shrink-0 cursor-pointer items-center gap-1.5 rounded-[4px] border-[1.5px] border-border bg-surface px-2.5 py-1 font-mono text-[10px] text-text whitespace-nowrap hover:border-accent',
        )}
      >
        {suggestion.cta}
      </Link>
    </div>
  )
}

export function AISuggestions({
  suggestions,
  repoSlug,
}: {
  suggestions: Suggestion[]
  repoSlug: string
}) {
  return (
    <div>
      {suggestions.map((s) => (
        <SuggestionRow key={s.id} suggestion={s} repoSlug={repoSlug} />
      ))}
    </div>
  )
}
