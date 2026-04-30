import { Icon } from '../primitives/Icon.tsx'
import type { AgentStep } from '../../types/agent.ts'
import { cn } from '../../utils/cn.ts'

const ringClasses: Record<AgentStep['status'], string> = {
  done: 'border-green bg-green',
  running: 'animate-spin-slow border-yellow bg-yellow',
  pending: 'border-muted-2 bg-transparent',
  error: 'border-red bg-transparent',
}

export function StepRow({ step }: { step: AgentStep }) {
  return (
    <div className="flex gap-2.5 border-b border-border-2 py-1.5">
      <span
        className={cn(
          'mt-px flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full border-[1.5px]',
          ringClasses[step.status],
        )}
      >
        {step.status === 'done' && <Icon name="check" size={11} color="#fff" />}
        {step.status === 'running' && <Icon name="spinner" size={11} color="#fff" />}
        {step.status === 'pending' && <Icon name="circle" size={6} color="var(--c-muted-2)" />}
        {step.status === 'error' && <Icon name="x" size={11} color="var(--c-red)" />}
      </span>
      <div className="min-w-0 flex-1">
        <div className={cn('font-mono text-[12px]', step.status === 'pending' ? 'text-muted' : 'text-text')}>
          {step.label}
        </div>
        {step.detail && <div className="mt-px font-mono text-[11px] text-muted">{step.detail}</div>}
      </div>
    </div>
  )
}
