import { useEffect, useRef } from 'react'
import { Icon } from '../primitives/Icon.tsx'
import type { LogKind, LogLine } from '../../types/agent.ts'
import { cn } from '../../utils/cn.ts'

const KIND_COLOR_CLASS: Record<LogKind, string> = {
  log: 'text-term-text',
  ok: 'text-green',
  warn: 'text-yellow',
  err: 'text-red',
  info: 'text-muted',
}

function GlyphFor({ kind }: { kind?: LogKind }) {
  if (!kind || kind === 'log') return null
  if (kind === 'ok') return <Icon name="check" size={10} color="var(--c-green)" />
  if (kind === 'warn') return <Icon name="warn" size={10} color="var(--c-yellow)" />
  if (kind === 'err') return <Icon name="x" size={10} color="var(--c-red)" />
  return <Icon name="arrow-r" size={10} color="var(--c-muted)" />
}

// strip leading emoji glyphs that the canned scripts include for legibility.
const cleanText = (text: string) =>
  text.replace(/^[←-⇿☀-➿✀-➿⁰-₟‐-⁯]\s?/u, '')

export function Terminal({ lines }: { lines: LogLine[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // auto-scroll to bottom whenever the log grows
  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [lines.length])

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto rounded-[4px] bg-term-bg px-3 py-2.5 font-mono text-[12px] leading-relaxed text-term-text"
    >
      {lines.map((l) => (
        // The blink line at the tail mutates its `ts` each tick; key it on a
        // sentinel so it doesn't unmount/remount and lose its CSS animation.
        // All non-blink log lines have unique text within a run (the runtime
        // dedups against `text`), so plain text is a safe stable key.
        <div key={l.blink ? '__blink__' : l.text} className="flex items-baseline gap-1.5">
          <span className="flex-shrink-0 text-muted-2">{l.ts}</span>
          <span className="inline-flex w-3 flex-shrink-0 translate-y-px items-center justify-center">
            <GlyphFor kind={l.kind} />
          </span>
          <span className={cn('break-all whitespace-pre-wrap', KIND_COLOR_CLASS[l.kind ?? 'log'])}>
            {cleanText(l.text)}
            {l.blink && <span className="ml-1 animate-blink text-accent-text">▌</span>}
          </span>
        </div>
      ))}
    </div>
  )
}
