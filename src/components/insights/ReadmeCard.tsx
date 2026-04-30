import type { Repo } from '../../types/repo.ts'

export function ReadmeCard({ repo }: { repo: Repo }) {
  return (
    <div className="overflow-y-auto rounded-[4px] border-[1.5px] border-border bg-surface-2 px-3.5 py-3">
      <div className="mb-2 font-mono text-[13px] font-bold text-text">{repo.name}</div>
      <div className="mb-2.5 font-mono text-[10px] leading-relaxed text-muted">{repo.description}</div>

      <SectionHeading>Getting Started</SectionHeading>
      <pre className="mb-2.5 rounded-[3px] bg-term-bg px-2.5 py-2 font-mono text-[10px] leading-relaxed text-term-text">
        {repo.gettingStarted.join('\n')}
      </pre>

      <SectionHeading>Stack</SectionHeading>
      <div className="mb-2.5 flex flex-wrap gap-1.5">
        {repo.stack.map((s) => (
          <span
            key={s}
            className="rounded-[2px] border border-border px-1.5 py-px font-mono text-[9px] text-muted"
          >
            {s}
          </span>
        ))}
      </div>

      <SectionHeading>Contributing</SectionHeading>
      <p className="font-mono text-[10px] leading-relaxed text-muted">{repo.contributing}</p>
    </div>
  )
}

function SectionHeading({ children }: { children: string }) {
  return (
    <div className="mb-1 font-mono text-[9px] font-bold tracking-[0.06em] text-text uppercase">
      {children}
    </div>
  )
}
