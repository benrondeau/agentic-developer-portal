import { useNavigate } from 'react-router'
import { Icon } from '../primitives/Icon.tsx'
import { tasks } from '../../data/tasks.ts'

const SAMPLE_COMMAND = '/upgrade-deps --target=all --auto-pr'
const SAMPLE_TASK_ID = 'dep-upgrade'

export function CommandBar({ repoSlug }: { repoSlug: string }) {
  const navigate = useNavigate()

  const run = () => {
    // Find the task that matches the displayed sample command, or default to dep-upgrade.
    const match = tasks.find((t) => t.command.startsWith('/upgrade'))
    navigate(`/repo/${repoSlug}?launch=${match?.id ?? SAMPLE_TASK_ID}`)
  }

  return (
    <div className="flex-shrink-0 border-t border-border px-4 py-2.5">
      <div className="mb-1 font-mono text-[9px] tracking-[0.06em] text-muted uppercase">
        Run a Command on Repo
      </div>
      <div className="flex items-center gap-1.5 overflow-hidden rounded-[4px] border-[1.5px] border-border bg-surface-2">
        <span className="flex-shrink-0 pl-2.5 font-mono text-[13px] font-semibold text-muted">/</span>
        <span className="flex-1 py-2 pr-1.5 font-mono text-[11px] text-muted-2">{SAMPLE_COMMAND}</span>
        <button
          type="button"
          onClick={run}
          className="inline-flex flex-shrink-0 cursor-pointer items-center gap-1.5 bg-accent px-3 py-2 font-mono text-[10px] whitespace-nowrap text-white hover:opacity-90"
        >
          <Icon name="play" size={10} color="white" />
          run
        </button>
      </div>
    </div>
  )
}
