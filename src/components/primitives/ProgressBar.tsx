import { cn } from '../../utils/cn.ts'

type ProgressBarProps = {
  pct: number
  /** 'done' = green, 'error' = red (always 100%), 'muted' = gray, default = accent. */
  tone?: 'accent' | 'done' | 'error' | 'muted'
  className?: string
  height?: number
}

export function ProgressBar({ pct, tone = 'accent', className, height = 5 }: ProgressBarProps) {
  const fillClass =
    tone === 'done'
      ? 'bg-green'
      : tone === 'error'
        ? 'bg-red'
        : tone === 'muted'
          ? 'bg-muted'
          : 'bg-accent'
  // A failed run shouldn't appear half-finished or in the in-progress accent — the
  // bar fills the full track in red so the failed state reads at a glance.
  const width = tone === 'error' ? 100 : Math.max(0, Math.min(100, pct))
  return (
    <div className={cn('overflow-hidden rounded-[3px] bg-border', className)} style={{ height }}>
      <div
        className={cn('h-full rounded-[3px] transition-[width] duration-300 ease-out', fillClass)}
        style={{ width: `${width}%` }}
      />
    </div>
  )
}
