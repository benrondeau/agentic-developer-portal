import { Button } from '../primitives/Button.tsx'
import type { AgentRun } from '../../types/agent.ts'
import { useAgentRuntime } from '../../hooks/useAgentRuntime.ts'

export function AgentToolbar({ run }: { run: AgentRun }) {
  const { abort, dismiss } = useAgentRuntime()

  const copyLog = async () => {
    try {
      await navigator.clipboard.writeText(run.log.map((l) => `${l.ts} ${l.text}`).join('\n'))
    } catch {
      /* swallow — no clipboard in test env */
    }
  }

  return (
    <div className="flex flex-shrink-0 flex-wrap gap-2">
      {run.status === 'running' && (
        <Button label="abort" variant="danger" small icon="stop" onClick={() => abort(run.id)} />
      )}
      {run.status === 'done' && run.result?.kind === 'pr' && (
        <Button label={`view PR #${run.result.number}`} small icon="external" />
      )}
      {run.status === 'error' && <Button label="re-run agent" variant="primary" small icon="refresh" />}
      {run.status === 'error' && <Button label="edit & retry" small icon="edit" />}
      <Button label="copy log" small icon="copy" onClick={copyLog} />
      {run.status !== 'running' && <Button label="dismiss" small icon="close" onClick={() => dismiss(run.id)} />}
    </div>
  )
}
