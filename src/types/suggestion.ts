import type { IconName } from '../components/primitives/Icon.tsx'
import type { TaskColorToken } from './task.ts'

export type Suggestion = {
  id: string
  icon: IconName
  text: string
  cta: string
  color: TaskColorToken
  /** which task to launch when CTA is clicked. */
  taskId: string
}
