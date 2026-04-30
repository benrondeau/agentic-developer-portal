import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { Icon } from '../primitives/Icon.tsx'
import { tasks } from '../../data/tasks.ts'
import type { Task } from '../../types/task.ts'
import { cn } from '../../utils/cn.ts'

const PLACEHOLDER = 'upgrade-deps --target=all --auto-pr'

/** Strip the leading `/` (if present) from a raw input string. */
function normalize(input: string): string {
  return input.trim().replace(/^\//, '')
}

/** Find the task whose command-name is the longest prefix match for the input. */
function resolveTask(input: string): Task | null {
  const cmd = normalize(input)
  if (!cmd) return null
  // Compare on the slug-after-slash portion of each task's command (e.g. "upgrade-deps").
  const head = cmd.split(/\s+/)[0].toLowerCase()
  const exact = tasks.find((t) => t.command.replace(/^\//, '').split(/\s+/)[0].toLowerCase() === head)
  return exact ?? null
}

/** Suggestions that start with the typed prefix; capped at 5. */
function suggest(input: string): Task[] {
  const cmd = normalize(input).toLowerCase()
  return tasks
    .filter((t) => t.command.replace(/^\//, '').toLowerCase().startsWith(cmd))
    .slice(0, 5)
}

export function CommandBar({ repoSlug }: { repoSlug: string }) {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const wrapRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const suggestions = useMemo(() => (open ? suggest(value) : []), [value, open])
  const resolved = useMemo(() => resolveTask(value), [value])
  const noMatch = value.trim().length > 0 && !resolved

  // Clamp activeIdx whenever the suggestion list shrinks.
  const safeIdx = Math.min(activeIdx, Math.max(0, suggestions.length - 1))

  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  const submit = (taskId?: string) => {
    const id = taskId ?? resolved?.id
    if (!id) return
    setOpen(false)
    navigate(`/repo/${repoSlug}?launch=${id}`)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (open && suggestions[safeIdx]) submit(suggestions[safeIdx].id)
      else submit()
      return
    }
    if (e.key === 'Escape') {
      setOpen(false)
      return
    }
    if (!open || suggestions.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx((i) => (i + 1) % suggestions.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx((i) => (i - 1 + suggestions.length) % suggestions.length)
    } else if (e.key === 'Tab' && suggestions[safeIdx]) {
      e.preventDefault()
      const cmd = suggestions[safeIdx].command.replace(/^\//, '')
      setValue(cmd)
    }
  }

  return (
    <div ref={wrapRef} className="relative flex-shrink-0 border-t border-border px-6 py-4">
      <div className="mb-1 font-mono text-[11px] tracking-[0.06em] text-muted uppercase">
        Run a Command on Repo
      </div>

      <div
        className={cn(
          'flex items-center gap-1.5 overflow-hidden rounded-[4px] border-[1.5px] bg-surface-2',
          noMatch ? 'border-orange' : 'border-border focus-within:border-accent',
        )}
      >
        <span className="flex-shrink-0 pl-2.5 font-mono text-[16px] font-semibold text-muted">/</span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setOpen(true)
            setActiveIdx(0)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={PLACEHOLDER}
          className="min-w-0 flex-1 bg-transparent py-2 pr-1.5 font-mono text-[14px] text-text placeholder:text-muted-2 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => submit()}
          disabled={!resolved}
          className={cn(
            'inline-flex flex-shrink-0 items-center gap-1.5 px-3 py-2 font-mono text-[12px] whitespace-nowrap',
            resolved
              ? 'cursor-pointer bg-accent text-white hover:opacity-90'
              : 'cursor-not-allowed bg-border text-muted',
          )}
        >
          <Icon name="play" size={10} color={resolved ? 'white' : 'var(--c-muted)'} />
          run
        </button>
      </div>

      {noMatch && !open && (
        <div className="mt-1 font-mono text-[11px] text-orange">
          unknown command — try one of: {tasks.map((t) => t.command).join(', ')}
        </div>
      )}

      {open && suggestions.length > 0 && (
        <ul
          role="listbox"
          className="absolute right-6 bottom-full left-6 z-30 mb-1 max-h-64 overflow-y-auto rounded-[4px] border border-border bg-surface py-1 shadow-lg"
        >
          {suggestions.map((t, i) => (
            <li key={t.id}>
              <button
                type="button"
                role="option"
                aria-selected={i === safeIdx}
                onMouseEnter={() => setActiveIdx(i)}
                onMouseDown={(e) => {
                  // mousedown so the click fires before onBlur/outside-click closes the popover
                  e.preventDefault()
                  submit(t.id)
                }}
                className={cn(
                  'flex w-full cursor-pointer items-center gap-3 px-3 py-1.5 text-left font-mono text-[12px]',
                  i === safeIdx ? 'bg-accent-bg text-accent-text' : 'text-text hover:bg-surface-2',
                )}
              >
                <span className="font-semibold">{t.command}</span>
                <span className="flex-1 truncate text-muted">{t.description}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
