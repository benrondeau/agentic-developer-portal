import { Link } from 'react-router'
import { LanguageIcon } from './LanguageIcon.tsx'
import { Icon } from '../primitives/Icon.tsx'
import { Badge } from '../primitives/Badge.tsx'
import type { Repo } from '../../types/repo.ts'
import { cn } from '../../utils/cn.ts'

type RepoListItemProps = {
  repo: Repo
  active: boolean
  /** number of running agents on this repo, used to show a "N running" badge. */
  runningCount: number
}

export function RepoListItem({ repo, active, runningCount }: RepoListItemProps) {
  const badgeLabel = runningCount > 1 ? `${runningCount} running` : runningCount === 1 ? 'running' : null

  return (
    <Link
      to={`/repo/${repo.slug}`}
      className={cn(
        'block cursor-pointer border-b border-border-2 px-3.5 py-2.5 transition-colors',
        active ? 'border-l-[4px] border-l-accent bg-accent' : 'border-l-[4px] border-l-transparent hover:bg-surface-2',
      )}
    >
      <div className="mb-0.5 flex items-center gap-2">
        <LanguageIcon tag={repo.language} />
        <span
          className={cn(
            'flex-1 overflow-hidden font-mono text-[14px] text-ellipsis whitespace-nowrap',
            active ? 'font-semibold text-surface' : 'text-text',
          )}
        >
          {repo.name}
        </span>
        {badgeLabel && (
          <Badge className={cn(active ? 'bg-surface text-text' : 'bg-accent text-white')}>{badgeLabel}</Badge>
        )}
        {repo.warn && (
          <span
            title="Needs attention"
            className={cn(
              'inline-flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-[3px]',
              active ? 'bg-surface' : 'bg-orange/15',
            )}
          >
            <Icon name="warn" size={11} color="var(--c-orange)" />
          </span>
        )}
      </div>
      <div
        className={cn(
          'pl-7 font-mono text-[11px]',
          active ? 'text-surface-2' : 'text-muted',
        )}
      >
        {repo.lastPushLabel}
      </div>
    </Link>
  )
}
