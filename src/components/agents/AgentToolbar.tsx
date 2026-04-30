import { useEffect, useRef, useState } from 'react'
import { Button } from '../primitives/Button.tsx'
import type { AgentRun } from '../../types/agent.ts'
import { useAgentRuntime } from '../../hooks/useAgentRuntime.ts'
import { useUrlParam } from '../../hooks/useUrlParam.ts'

const COPIED_RESET_MS = 1500

export function AgentToolbar({ run }: { run: AgentRun }) {
  const { abort, dismiss } = useAgentRuntime()
  const [, setRetryParam] = useUrlParam('retry')
  const [, setReportParam] = useUrlParam('report')
  const [copied, setCopied] = useState(false)
  const copyResetRef = useRef<number | null>(null)

  // Clear any pending reset timer on unmount so we don't setState after teardown.
  useEffect(() => {
    return () => {
      if (copyResetRef.current != null) window.clearTimeout(copyResetRef.current)
    }
  }, [])

  const copyLog = async () => {
    try {
      await navigator.clipboard.writeText(run.log.map((l) => `${l.ts} ${l.text}`).join('\n'))
      setCopied(true)
      if (copyResetRef.current != null) window.clearTimeout(copyResetRef.current)
      copyResetRef.current = window.setTimeout(() => setCopied(false), COPIED_RESET_MS)
    } catch {
      /* swallow — no clipboard in test env */
    }
  }

  const openRetryConfirm = () => setRetryParam(run.taskId)
  const openReport = () => setReportParam(run.id)

  return (
    <div className="flex flex-shrink-0 flex-wrap gap-2">
      {run.status === 'running' && (
        <Button label="abort" variant="danger" small icon="stop" onClick={() => abort(run.id)} />
      )}
      {run.status === 'done' && run.result?.kind === 'pr' && (
        <Button label={`view PR #${run.result.number}`} small icon="external" />
      )}
      {run.status === 'done' && run.result?.kind === 'report' && (
        <Button label="view report" small icon="external" onClick={openReport} />
      )}
      {run.status === 'error' && (
        <Button label="re-run agent" variant="primary" small icon="refresh" onClick={openRetryConfirm} />
      )}
      {run.status === 'error' && <Button label="edit & retry" small icon="edit" />}
      <Button
        label={copied ? 'copied!' : 'copy log'}
        small
        icon={copied ? 'check' : 'copy'}
        onClick={copyLog}
      />
      {run.status !== 'running' && <Button label="dismiss" small icon="close" onClick={() => dismiss(run.id)} />}
    </div>
  )
}
