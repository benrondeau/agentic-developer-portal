import { useState } from 'react'
import { Link } from 'react-router'
import { Icon } from '../primitives/Icon.tsx'
import { tasks } from '../../data/tasks.ts'
import type { TaskColorToken } from '../../types/task.ts'
import { cn } from '../../utils/cn.ts'

const colorVar: Record<TaskColorToken, string> = {
  accent: 'var(--c-accent)',
  green: 'var(--c-green)',
  orange: 'var(--c-orange)',
  red: 'var(--c-red)',
  purple: 'var(--c-purple)',
}

export function TaskGrid({ repoSlug }: { repoSlug: string }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className="mb-2.5 grid grid-cols-3 gap-1.5">
      {tasks.map((task) => {
        const isHover = task.id === hoveredId
        return (
          <Link
            key={task.id}
            to={`/repo/${repoSlug}?launch=${task.id}`}
            onMouseEnter={() => setHoveredId(task.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={cn(
              'flex cursor-pointer flex-col items-center justify-center rounded-[4px] border-[1.5px] px-2.5 py-3.5 text-center transition-colors',
              isHover ? 'border-accent bg-accent-bg' : 'border-border bg-surface',
            )}
          >
            <div className="mb-1.5 flex h-[18px] items-center justify-center">
              <Icon name={task.icon} size={16} color={isHover ? colorVar[task.color] : 'var(--c-muted)'} />
            </div>
            <div className={cn('font-mono text-[12px]', isHover ? 'text-accent-text' : 'text-text')}>
              {task.label}
            </div>
          </Link>
        )
      })}
    </div>
  )
}
