import type { IconName } from '../components/primitives/Icon.tsx'

export type TaskColorToken = 'accent' | 'green' | 'orange' | 'red' | 'purple'

export type Task = {
  id: string
  label: string
  command: string
  icon: IconName
  color: TaskColorToken
  description: string
  bullets: string[]
  estTokens: number
  estCost: number
  estDurationSec: number
}
