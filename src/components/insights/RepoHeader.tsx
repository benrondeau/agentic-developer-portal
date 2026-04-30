import { LanguageIcon } from '../repos/LanguageIcon.tsx'
import { Icon } from '../primitives/Icon.tsx'
import type { Repo } from '../../types/repo.ts'

export function RepoHeader({ repo }: { repo: Repo }) {
  return (
    <div className="flex-shrink-0 border-b border-border px-6 py-4">
      <div className="mb-1 flex items-center gap-2">
        <LanguageIcon tag={repo.language} />
        <span className="font-mono text-[16px] font-semibold text-text">{repo.name}</span>
        <button
          type="button"
          className="ml-auto flex cursor-pointer items-center gap-1 rounded-[4px] border border-border bg-surface-2 px-2 py-0.5 hover:border-accent"
        >
          <span className="font-mono text-[12px] text-muted">branch:</span>
          <span className="font-mono text-[12px] font-semibold text-text">{repo.branch}</span>
          <Icon name="chevron-d" size={10} color="var(--c-muted)" />
        </button>
      </div>
      <div className="pl-[22px] font-mono text-[12px] text-muted">
        {repo.languageLabel} · {repo.fileCount.toLocaleString()} files · last push {repo.lastPushLabel}
      </div>
    </div>
  )
}
