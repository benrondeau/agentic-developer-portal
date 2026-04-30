import { ProgressBar } from '../primitives/ProgressBar.tsx'
import type { AgentRun } from '../../types/agent.ts'
import { formatCost, formatElapsed, formatTokensK } from '../../utils/format.ts'
import { useNow } from '../../hooks/useNow.ts'
import { cn } from '../../utils/cn.ts'

export function AgentMeta({ run }: { run: AgentRun }) {
  const isLive = run.status === 'running'
  // Tick once a second while live; once a minute otherwise so "completed Xm ago" stays fresh-ish.
  const now = useNow(true, isLive ? 1000 : 30_000)
  const elapsedLabel = isLive
    ? formatElapsed(now, run.startedAt)
    : run.endedAt
      ? `${run.status === 'error' ? 'failed' : run.status === 'aborted' ? 'aborted' : 'completed'} ${formatElapsed(now, run.endedAt)} ago`
      : run.status

  const ratio = run.status === 'done' ? 1 : Math.max(0.05, run.pct / 100)
  const usedTokens = Math.round(run.estTokens * ratio)
  const inTokens = Math.round(usedTokens * 0.74)
  const outTokens = usedTokens - inTokens
  const cost = run.estCost * ratio
  const elapsedSec = Math.max(1, (now - run.startedAt) / 1000)
  const ratePerSec = isLive ? Math.round(usedTokens / elapsedSec) : null

  return (
    <div className="flex-shrink-0 border-b border-border px-3.5 py-2.5">
      <div className="mb-1.5 flex items-center gap-2">
        <span
          className={cn(
            'h-2 w-2 flex-shrink-0 rounded-full',
            isLive ? 'animate-pulse-soft bg-green' : run.status === 'error' ? 'bg-red' : 'bg-muted',
          )}
        />
        <span className="font-mono text-[14px] font-medium text-text">{run.label}</span>
        <span className="ml-auto font-mono text-[12px] text-muted">{elapsedLabel}</span>
      </div>
      <div className="mb-1 flex justify-between font-mono text-[11px] text-muted">
        <span>progress</span>
        <span>{Math.round(run.pct)}%</span>
      </div>
      <ProgressBar pct={run.pct} tone={run.status === 'done' ? 'done' : 'accent'} />

      <div className="mt-2 grid grid-cols-3 gap-2 border-t border-dashed border-border pt-2">
        <MetaCell
          label="Tokens used"
          live={isLive}
          value={`${formatTokensK(usedTokens)}`}
          suffix={` / ~${formatTokensK(run.estTokens)}`}
          subtext={`in ${formatTokensK(inTokens)} · out ${formatTokensK(outTokens)}`}
        />
        <MetaCell
          label="Cost so far"
          value={formatCost(cost)}
          suffix={` / ~${formatCost(run.estCost)}`}
          subtext="claude-sonnet-4.5"
        />
        <MetaCell
          label="Rate"
          value={ratePerSec != null ? String(ratePerSec) : '—'}
          suffix=" tok/s"
          subtext={isLive ? 'live' : 'completed'}
        />
      </div>
    </div>
  )
}

function MetaCell({
  label,
  live,
  value,
  suffix,
  subtext,
}: {
  label: string
  live?: boolean
  value: string
  suffix?: string
  subtext: string
}) {
  return (
    <div>
      <div className="mb-0.5 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.06em] text-muted uppercase">
        {label}
        {live && <span className="h-1 w-1 animate-pulse-soft rounded-full bg-accent" />}
      </div>
      <div className="font-mono text-[15px] font-semibold text-text">
        {value}
        {suffix && <span className="text-[11px] font-normal text-muted">{suffix}</span>}
      </div>
      <div className="mt-px font-mono text-[10px] text-muted">{subtext}</div>
    </div>
  )
}
