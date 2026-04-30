import { useMemo, useState } from 'react'
import { DrawerShell } from './DrawerShell.tsx'
import { Icon } from '../primitives/Icon.tsx'
import { ACTIVE_ORG_SLUG, orgs } from '../../data/orgs.ts'
import { cn } from '../../utils/cn.ts'

type OrgDrawerProps = {
  onClose: () => void
}

export function OrgDrawer({ onClose }: OrgDrawerProps) {
  const [selectedSlug, setSelectedSlug] = useState(ACTIVE_ORG_SLUG)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return orgs
    return orgs.filter((o) => o.name.toLowerCase().includes(q))
  }, [query])

  return (
    <DrawerShell side="left" width={300} onClose={onClose}>
      <div className="flex flex-shrink-0 items-center gap-2 border-b border-border bg-nav-bg px-4 py-3">
        <span className="flex-1 font-mono text-[15px] font-semibold text-white">Switch Organization</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="cursor-pointer font-mono text-[20px] text-zinc-400 hover:text-white"
        >
          ×
        </button>
      </div>

      <div className="flex-shrink-0 border-b border-border px-3 py-2.5">
        <label className="flex cursor-text items-center gap-2 rounded-[4px] border-[1.5px] border-border bg-surface-2 px-2.5 py-1.5 focus-within:border-accent">
          <Icon name="search" size={12} color="var(--c-muted)" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search organizations…"
            autoFocus
            className="min-w-0 flex-1 bg-transparent font-mono text-[14px] text-text placeholder:text-muted focus:outline-none"
          />
        </label>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-3 pt-1.5 pb-1 font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
          Your Organizations
        </div>
        {filtered.length === 0 ? (
          <div className="px-4 py-6 font-mono text-[12px] text-muted">no organizations match</div>
        ) : (
          filtered.map((o) => {
            const selected = selectedSlug === o.slug
            return (
              <button
                key={o.slug}
                type="button"
                onClick={() => setSelectedSlug(o.slug)}
                className={cn(
                  'flex w-full cursor-pointer items-center gap-2.5 border-b border-border-2 px-3.5 py-2.5 text-left',
                  selected
                    ? 'border-l-[4px] border-l-accent bg-accent'
                    : 'border-l-[4px] border-l-transparent hover:bg-surface-2',
                )}
              >
                <div
                  className={cn(
                    'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-[4px] border-[1.5px] border-border font-mono text-[12px] font-bold',
                    selected ? 'bg-surface text-accent' : 'bg-surface-2 text-muted',
                  )}
                >
                  {o.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div
                    className={cn(
                      'overflow-hidden font-mono text-[14px] text-ellipsis whitespace-nowrap',
                      selected ? 'font-semibold text-surface' : 'text-text',
                    )}
                  >
                    {o.name}
                  </div>
                  <div
                    className={cn(
                      'mt-px font-mono text-[11px]',
                      selected ? 'text-surface-2' : 'text-muted',
                    )}
                  >
                    {o.repoCount} repos
                  </div>
                </div>
                {o.agentCount > 0 && (
                  <div
                    className={cn(
                      'flex-shrink-0 rounded-[3px] border px-1.5 py-px font-mono text-[11px] whitespace-nowrap',
                      selected ? 'border-surface text-surface' : 'border-border text-muted',
                    )}
                  >
                    <span
                      className={cn(
                        'mr-1 inline-block h-1.5 w-1.5 rounded-full align-middle',
                        selected ? 'bg-surface' : 'bg-green',
                      )}
                    />
                    {o.agentCount} running
                  </div>
                )}
                {selected && <span className="flex-shrink-0 font-mono text-[11px] text-surface">✓</span>}
              </button>
            )
          })
        )}
      </div>
    </DrawerShell>
  )
}
