import { cn } from '../../utils/cn.ts'

export function Divider({ className }: { className?: string }) {
  return <div className={cn('my-2.5 border-t border-border', className)} />
}
