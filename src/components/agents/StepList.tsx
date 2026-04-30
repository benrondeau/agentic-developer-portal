import type { AgentStep } from '../../types/agent.ts'
import { Label } from '../primitives/Label.tsx'
import { StepRow } from './StepRow.tsx'

export function StepList({ steps }: { steps: AgentStep[] }) {
  return (
    <div>
      <Label>Steps</Label>
      {steps.map((s) => (
        <StepRow key={s.label} step={s} />
      ))}
    </div>
  )
}
