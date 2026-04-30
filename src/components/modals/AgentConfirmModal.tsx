import { Icon } from '../primitives/Icon.tsx'
import { ModalShell } from './ModalShell.tsx'
import type { Task, TaskColorToken } from '../../types/task.ts'
import type { Repo } from '../../types/repo.ts'
import { formatCost, formatTokensK } from '../../utils/format.ts'

const colorVar: Record<TaskColorToken, string> = {
  accent: 'var(--c-accent)',
  green: 'var(--c-green)',
  orange: 'var(--c-orange)',
  red: 'var(--c-red)',
  purple: 'var(--c-purple)',
}

type AgentConfirmModalProps = {
  task: Task
  repo: Repo
  onCancel: () => void
  onConfirm: () => void
}

export function AgentConfirmModal({ task, repo, onCancel, onConfirm }: AgentConfirmModalProps) {
  const inTokens = Math.round(task.estTokens * 0.74)
  const outTokens = task.estTokens - inTokens
  const durationLabel =
    task.estDurationSec >= 60 ? `~${Math.round(task.estDurationSec / 60)} min` : `~${task.estDurationSec}s`

  return (
    <ModalShell onClose={onCancel}>
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-[4px] border border-border bg-surface-2">
          <Icon name={task.icon} size={14} color={colorVar[task.color]} />
        </span>
        <span className="font-mono text-xs font-semibold text-text">
          Run {task.label.toLowerCase()} on {repo.name}?
        </span>
      </div>

      <div className="px-4 py-4">
        <div className="mb-1.5 font-mono text-[9px] tracking-[0.06em] text-muted uppercase">
          What this agent will do
        </div>
        <ul className="m-0 mb-3 list-none p-0">
          {task.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 py-1 font-mono text-[11px] text-text">
              <span className="text-muted">{String(i + 1).padStart(2, '0')}.</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="my-2.5 h-px bg-border" />

        <div className="mb-3.5 grid grid-cols-3 gap-2.5">
          <Cell label="Est. tokens" value={`~${formatTokensK(task.estTokens)}`} sub={`in ${formatTokensK(inTokens)} · out ${formatTokensK(outTokens)}`} />
          <Cell label="Est. cost" value={formatCost(task.estCost)} sub="claude-sonnet-4.5" />
          <Cell label="Est. duration" value={durationLabel} sub="p50 from history" />
        </div>

        <div className="rounded-[3px] border border-dashed border-border bg-surface-2 px-2.5 py-2 font-mono text-[10px] leading-relaxed text-muted">
          Output is a <span className="font-semibold text-text">draft PR</span> — no changes are merged
          automatically. You will review the diff before approval.
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-border px-4 py-3">
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer rounded-[4px] border-[1.5px] border-border bg-transparent px-3.5 py-1.5 font-mono text-[11px] text-text hover:bg-surface-2"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-[4px] border-[1.5px] border-accent bg-accent px-4 py-1.5 font-mono text-[11px] font-semibold text-white hover:opacity-90"
        >
          <Icon name="play" size={11} color="white" />
          Run agent · {formatCost(task.estCost)}
        </button>
      </div>
    </ModalShell>
  )
}

function Cell({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-[4px] border border-border bg-surface-2 px-2.5 py-2">
      <div className="mb-0.5 font-mono text-[9px] tracking-[0.06em] text-muted uppercase">{label}</div>
      <div className="font-mono text-sm font-semibold text-text">{value}</div>
      <div className="mt-px font-mono text-[9px] text-muted">{sub}</div>
    </div>
  )
}
