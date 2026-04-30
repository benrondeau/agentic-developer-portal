import type { ReactNode } from 'react'

type EmptyPaneProps = {
  icon: ReactNode
  title: string
  sub?: ReactNode
}

export function EmptyPane({ icon, title, sub }: EmptyPaneProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-10 text-center">
      <div className="font-mono text-[28px] tracking-wider text-muted-2 opacity-60">{icon}</div>
      <div className="font-mono text-[16px] font-medium text-muted">{title}</div>
      {sub && (
        <div className="font-mono text-[14px] leading-relaxed whitespace-pre-line text-muted-2">
          {sub}
        </div>
      )}
    </div>
  )
}
