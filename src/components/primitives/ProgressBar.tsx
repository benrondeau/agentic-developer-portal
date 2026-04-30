import { cn } from '../../utils/cn.ts'

type ProgressBarProps = {
  pct: number
  /** when 'done', shows green; otherwise accent. */
  tone?: 'accent' | 'done' | 'muted'
  className?: string
  height?: number
}

export function ProgressBar({ pct, tone = 'accent', className, height = 5 }: ProgressBarProps) {
  const fillClass =
    tone === 'done' ? 'bg-green' : tone === 'muted' ? 'bg-muted' : 'bg-accent'
  return (
    <div
      className={cn('overflow-hidden rounded-[3px] bg-border', className)}
      style={{ height }}
    >
      <div
        className={cn('h-full rounded-[3px] transition-[width] duration-300 ease-out', fillClass)}
        style={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
      />
    </div>
  )
}
