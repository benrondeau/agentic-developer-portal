import type { ReactNode } from 'react'
import { cn } from '../../utils/cn.ts'

export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('mb-1.5 font-mono text-[11px] tracking-[0.08em] text-muted uppercase', className)}>
      {children}
    </div>
  )
}
