import { useSearchParams } from 'react-router'
import { ThemeToggle } from './ThemeToggle.tsx'
import { ACTIVE_ORG_SLUG, orgs } from '../../data/orgs.ts'

type NavBarProps = {
  agentCount: number
}

export function NavBar({ agentCount }: NavBarProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const org = orgs.find((o) => o.slug === ACTIVE_ORG_SLUG)

  const openDrawer = (drawer: 'agents' | 'org') => {
    const next = new URLSearchParams(searchParams)
    next.set('drawer', drawer)
    setSearchParams(next)
  }

  return (
    <header className="flex h-11 flex-shrink-0 items-center gap-3.5 border-b border-black/40 bg-nav-bg px-4">
      <span className="font-mono text-[13px] font-semibold tracking-[-0.02em] text-white">
        dev-portal
      </span>
      <span className="text-base text-nav-muted">/</span>
      <button
        type="button"
        onClick={() => openDrawer('org')}
        className="cursor-pointer border-b border-dashed border-zinc-600 pb-px font-mono text-[11px] text-zinc-400 hover:text-white"
      >
        {org?.name ?? ACTIVE_ORG_SLUG}
      </button>
      <div className="ml-auto flex items-center gap-3">
        {agentCount > 0 ? (
          <button
            type="button"
            onClick={() => openDrawer('agents')}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-[3px] border border-zinc-600 py-0.5 pr-2 pl-1.5 font-mono text-[10px] text-zinc-400 hover:text-white"
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"
              style={{ boxShadow: '0 0 6px #7DD879' }}
            />
            {agentCount} agent{agentCount !== 1 ? 's' : ''} active
          </button>
        ) : (
          <span className="font-mono text-[10px] text-zinc-600">no agents running</span>
        )}
        <div className="flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] border-zinc-600 bg-nav-muted font-mono text-[10px] text-zinc-200">
          JD
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
