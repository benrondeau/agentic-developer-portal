import { useEffect, useRef } from 'react'
import { Icon } from '../primitives/Icon.tsx'

type RepoSearchBoxProps = {
  value: string
  onChange: (next: string) => void
}

export function RepoSearchBox({ value, onChange }: RepoSearchBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        inputRef.current?.select()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <label className="flex cursor-text items-center gap-2 rounded-[4px] border-[1.5px] border-border bg-surface px-2.5 py-1.5 focus-within:border-accent">
      <Icon name="search" size={12} color="var(--c-muted)" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="search repos…"
        className="min-w-0 flex-1 bg-transparent font-mono text-[14px] text-text placeholder:text-muted focus:outline-none"
      />
      <span className="flex-shrink-0 rounded-[3px] border border-border px-1 py-px font-mono text-[11px] leading-none text-muted-2">
        ⌘K
      </span>
    </label>
  )
}
