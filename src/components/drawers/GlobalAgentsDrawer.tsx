import { useNavigate } from 'react-router'
import { DrawerShell } from './DrawerShell.tsx'
import { LanguageIcon } from '../repos/LanguageIcon.tsx'
import { Icon } from '../primitives/Icon.tsx'
import { ProgressBar } from '../primitives/ProgressBar.tsx'
import { useAgentRuntime } from '../../hooks/useAgentRuntime.ts'
import { repos } from '../../data/repos.ts'
import { formatElapsed } from '../../utils/format.ts'
import { useNow } from '../../hooks/useNow.ts'
import type { AgentRun } from '../../types/agent.ts'
import { cn } from '../../utils/cn.ts'

type GlobalAgentsDrawerProps = {
  onClose: () => void
}

export function GlobalAgentsDrawer({ onClose }: GlobalAgentsDrawerProps) {
  const navigate = useNavigate()
  const { runs } = useAgentRuntime()
  const now = useNow(true, 1000)

  const grouped = repos
    .map((repo) => ({
      repo,
      agents: runs.filter((r) => r.repoSlug === repo.slug),
    }))
    .filter((group) => group.agents.length > 0)

  const runningCount = runs.filter((r) => r.status === 'running').length
  const doneCount = runs.filter((r) => r.status === 'done').length

  const openAgent = (slug: string, runId: string) => {
    onClose()
    navigate(`/repo/${slug}?run=${runId}`)
  }

  return (
    <DrawerShell side="right" width={320} onClose={onClose}>
      <div className="flex flex-shrink-0 items-center gap-2 border-b border-border px-4 py-3">
        <span className="flex-1 font-mono text-[15px] font-semibold text-text">Active Agents</span>
        <span className="font-mono text-[11px] text-muted">
          {runningCount} running · {doneCount} done
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="ml-2 cursor-pointer font-mono text-[18px] text-muted hover:text-text"
        >
          ×
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {grouped.map(({ repo, agents }) => (
          <div key={repo.slug}>
            <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-3.5 py-2">
              <LanguageIcon tag={repo.language} />
              <span className="font-mono text-[14px] font-semibold text-text">{repo.name}</span>
            </div>
            {agents.map((a) => (
              <GlobalAgentRow key={a.id} agent={a} now={now} onClick={() => openAgent(repo.slug, a.id)} />
            ))}
          </div>
        ))}
        {grouped.length === 0 && (
          <div className="p-6 text-center font-mono text-[12px] text-muted">no agent activity</div>
        )}
      </div>

      <div className="flex-shrink-0 border-t border-border px-3.5 py-2.5">
        <div className="text-center font-mono text-[12px] text-muted">click any agent to open its repo view</div>
      </div>
    </DrawerShell>
  )
}

function GlobalAgentRow({
  agent,
  now,
  onClick,
}: {
  agent: AgentRun
  now: number
  onClick: () => void
}) {
  const elapsedLabel =
    agent.status === 'running'
      ? formatElapsed(now, agent.startedAt)
      : agent.status === 'done'
        ? `done ${agent.endedAt ? formatElapsed(now, agent.endedAt) : ''} ago`.trim()
        : agent.status === 'error'
          ? `failed ${agent.endedAt ? formatElapsed(now, agent.endedAt) : ''} ago`.trim()
          : agent.status

  return (
    <button
      type="button"
      onClick={onClick}
      className="block w-full cursor-pointer border-b border-border-2 py-2.5 pr-4 pl-6 text-left hover:bg-surface-2"
    >
      <div className="mb-1 flex items-center gap-2">
        <span
          className={cn(
            'h-1.5 w-1.5 flex-shrink-0 rounded-full',
            agent.status === 'running' ? 'animate-pulse-soft bg-accent' : 'border-[1.5px] border-muted bg-transparent',
          )}
        />
        <span className="flex-1 font-mono text-[12px] text-text">{agent.label}</span>
        <span className="font-mono text-[11px] text-muted">{elapsedLabel}</span>
      </div>
      <ProgressBar
        pct={agent.pct}
        tone={agent.status === 'done' ? 'muted' : 'accent'}
        height={4}
        className="ml-3.5"
      />
      <div className="mt-1 ml-3.5 flex items-center gap-1.5 font-mono text-[11px] text-muted">
        {agent.status === 'running' ? 'click to view live log' : 'click to view output'}
        <Icon name="arrow-r" size={9} color="var(--c-muted)" />
      </div>
    </button>
  )
}
