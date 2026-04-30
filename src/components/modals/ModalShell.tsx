import { useEffect, type ReactNode } from 'react'

type ModalShellProps = {
  onClose: () => void
  children: ReactNode
  /** width in px */
  width?: number
}

export function ModalShell({ onClose, children, width = 480 }: ModalShellProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="absolute inset-0 z-[60] flex items-center justify-center">
      <div onClick={onClose} className="absolute inset-0 bg-black/45" aria-hidden />
      <div
        role="dialog"
        aria-modal
        className="relative z-[61] rounded-md border-[1.5px] border-border bg-surface font-mono shadow-2xl"
        style={{ width, boxShadow: '0 12px 40px rgba(0,0,0,0.25)' }}
      >
        {children}
      </div>
    </div>
  )
}
