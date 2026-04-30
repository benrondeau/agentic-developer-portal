import { useEffect, type ReactNode } from 'react'
import { cn } from '../../utils/cn.ts'

type DrawerShellProps = {
  side: 'left' | 'right'
  width?: number
  onClose: () => void
  children: ReactNode
}

export function DrawerShell({ side, width = 320, onClose, children }: DrawerShellProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="absolute inset-0 z-50 flex">
      <div onClick={onClose} className="absolute inset-0 bg-black/35" aria-hidden />
      <aside
        role="dialog"
        aria-modal
        className={cn(
          'absolute top-0 z-[51] flex h-full flex-col bg-surface',
          side === 'left' ? 'left-0 border-r-2 border-border' : 'right-0 border-l-2 border-border',
        )}
        style={{
          width,
          boxShadow: side === 'left' ? '4px 0 24px rgba(0,0,0,0.18)' : '-4px 0 24px rgba(0,0,0,0.18)',
        }}
      >
        {children}
      </aside>
    </div>
  )
}
