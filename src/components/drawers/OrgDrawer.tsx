import { useState } from 'react'
import { DrawerShell } from './DrawerShell.tsx'
import { Icon } from '../primitives/Icon.tsx'
import { ACTIVE_ORG_SLUG, orgs } from '../../data/orgs.ts'
import { cn } from '../../utils/cn.ts'

type OrgDrawerProps = {
  onClose: () => void
}

export function OrgDrawer({ onClose }: OrgDrawerProps) {
  const initialIdx = orgs.findIndex((o) => o.slug === ACTIVE_ORG_SLUG)
  const [selectedIdx, setSelectedIdx] = useState(initialIdx >= 0 ? initialIdx : 1)

  return (
    <DrawerShell side="left" width={300} onClose={onClose}>
      <div className="flex flex-shrink-0 items-center gap-2 border-b border-border bg-nav-bg px-4 py-3">
        <span className="flex-1 font-mono text-xs font-semibold text-white">Switch Organisation</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="cursor-pointer font-mono text-base text-zinc-400 hover:text-white"
        >
          ×
        </button>
      </div>

      <div className="flex-shrink-0 border-b border-border px-3 py-2.5">
        <div className="flex items-center gap-2 rounded-[4px] border-[1.5px] border-border bg-surface-2 px-2.5 py-1.5">
          <Icon name="search" size={12} color="var(--c-muted)" />
          <span className="font-mono text-[11px] text-muted">search organisations…</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-3 pt-1.5 pb-1 font-mono text-[9px] tracking-[0.08em] text-muted uppercase">
          Your Organisations
        </div>
        {orgs.map((o, i) => {
          const selected = selectedIdx === i
          return (
            <button
              key={o.slug}
              type="button"
              onClick={() => setSelectedIdx(i)}
              className={cn(
                'flex w-full cursor-pointer items-center gap-2.5 border-b border-border-2 px-3.5 py-2.5 text-left',
                selected
                  ? 'border-l-[4px] border-l-accent bg-accent'
                  : 'border-l-[4px] border-l-transparent hover:bg-surface-2',
              )}
            >
              <div
                className={cn(
                  'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-[4px] border-[1.5px] border-border font-mono text-[10px] font-bold',
                  selected ? 'bg-surface text-accent' : 'bg-surface-2 text-muted',
                )}
              >
                {o.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div
                  className={cn(
                    'overflow-hidden font-mono text-[11px] text-ellipsis whitespace-nowrap',
                    selected ? 'font-semibold text-surface' : 'text-text',
                  )}
                >
                  {o.name}
                </div>
                <div
                  className={cn(
                    'mt-px font-mono text-[9px]',
                    selected ? 'text-surface-2' : 'text-muted',
                  )}
                >
                  {o.repoCount} repos
                </div>
              </div>
              {o.agentCount > 0 && (
                <div
                  className={cn(
                    'flex-shrink-0 rounded-[3px] border px-1.5 py-px font-mono text-[9px] whitespace-nowrap',
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
              {selected && <span className="flex-shrink-0 font-mono text-[9px] text-surface">✓</span>}
            </button>
          )
        })}
      </div>
    </DrawerShell>
  )
}
