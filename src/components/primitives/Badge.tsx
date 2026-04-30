import type { ReactNode } from 'react'
import { cn } from '../../utils/cn.ts'

type BadgeProps = {
  children: ReactNode
  className?: string
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex flex-shrink-0 items-center rounded-[3px] px-1.5 py-px font-mono text-[12px] whitespace-nowrap',
        className,
      )}
    >
      {children}
    </span>
  )
}
