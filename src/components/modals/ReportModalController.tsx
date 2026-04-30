import { Icon } from '../primitives/Icon.tsx'
import { ModalShell } from './ModalShell.tsx'
import { useAgentRuntime } from '../../hooks/useAgentRuntime.ts'
import { useUrlParam } from '../../hooks/useUrlParam.ts'

/**
 * Renders the report-artifact viewer when `?report=<runId>` is set. Drives off
 * the toolbar's "view report" button on completed runs whose result is a
 * `kind: 'report'` artifact.
 */
export function ReportModalController() {
  const [reportRunId, setReportParam] = useUrlParam('report')
  const { runs } = useAgentRuntime()

  if (!reportRunId) return null
  const run = runs.find((r) => r.id === reportRunId)
  if (!run || run.result?.kind !== 'report') return null

  const close = () => setReportParam(null)

  return (
    <ModalShell onClose={close}>
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-[4px] border border-border bg-surface-2">
          <Icon name="graph" size={14} color="var(--c-accent)" />
        </span>
        <span className="font-mono text-[15px] font-semibold text-text">{run.label} report</span>
      </div>

      <div className="px-4 py-4">
        <div className="mb-1.5 font-mono text-[11px] tracking-[0.06em] text-muted uppercase">Summary</div>
        <div className="mb-3 font-mono text-[14px] text-text">{run.result.summary}</div>

        {run.result.details && run.result.details.length > 0 && (
          <>
            <div className="mb-1.5 font-mono text-[11px] tracking-[0.06em] text-muted uppercase">Findings</div>
            <ul className="m-0 list-none p-0">
              {run.result.details.map((d) => (
                <li key={d} className="flex gap-2 py-1 font-mono text-[13px] leading-relaxed text-text">
                  <span className="text-muted">·</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="flex justify-end gap-2 border-t border-border px-4 py-3">
        <button
          type="button"
          onClick={close}
          className="cursor-pointer rounded-[4px] border-[1.5px] border-border bg-transparent px-3.5 py-1.5 font-mono text-[14px] text-text hover:bg-surface-2"
        >
          Close
        </button>
      </div>
    </ModalShell>
  )
}
