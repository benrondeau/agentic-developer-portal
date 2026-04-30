import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { LanguageIcon } from '../repos/LanguageIcon.tsx'
import { Icon } from '../primitives/Icon.tsx'
import type { Repo } from '../../types/repo.ts'
import { cn } from '../../utils/cn.ts'

export function RepoHeader({ repo }: { repo: Repo }) {
  return (
    <div className="flex-shrink-0 border-b border-border px-6 py-4">
      <div className="mb-1 flex items-center gap-2">
        <LanguageIcon tag={repo.language} />
        <span className="font-mono text-[16px] font-semibold text-text">{repo.name}</span>
        <BranchDropdown repo={repo} />
      </div>
      <div className="pl-[22px] font-mono text-[12px] text-muted">
        {repo.languageLabel} · {repo.fileCount.toLocaleString()} files · last push {repo.lastPushLabel}
      </div>
    </div>
  )
}

function BranchDropdown({ repo }: { repo: Repo }) {
  // The active branch lives in the URL as `?branch=<name>`. RepoView reads
  // the same param to derive per-branch data, so writing here updates the
  // entire repo view in one place.
  const [searchParams, setSearchParams] = useSearchParams()
  const selected = searchParams.get('branch') ?? repo.branch
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  const selectBranch = (branch: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (branch === repo.branch) next.delete('branch')
        else next.set('branch', branch)
        return next
      },
      { replace: true },
    )
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={wrapRef} className="relative ml-auto">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex cursor-pointer items-center gap-1 rounded-[4px] border border-border bg-surface-2 px-2 py-0.5 hover:border-accent"
      >
        <span className="font-mono text-[12px] text-muted">branch:</span>
        <span className="max-w-[180px] overflow-hidden font-mono text-[12px] font-semibold text-ellipsis whitespace-nowrap text-text">
          {selected}
        </span>
        <Icon name="chevron-d" size={10} color="var(--c-muted)" />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-30 mt-1 max-h-64 w-56 overflow-y-auto rounded-[4px] border border-border bg-surface py-1 shadow-lg"
        >
          {repo.branches.map((b) => {
            const isSelected = b === selected
            return (
              <li key={b}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => selectBranch(b)}
                  className={cn(
                    'flex w-full cursor-pointer items-center gap-2 px-3 py-1.5 text-left font-mono text-[12px] hover:bg-surface-2',
                    isSelected ? 'text-accent-text' : 'text-text',
                  )}
                >
                  <span className="flex w-3 flex-shrink-0 justify-center">
                    {isSelected && <Icon name="check" size={11} color="var(--c-accent)" />}
                  </span>
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">{b}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
