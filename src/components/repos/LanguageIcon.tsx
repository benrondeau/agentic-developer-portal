import { Icon } from '../primitives/Icon.tsx'
import type { LanguageTag } from '../../types/repo.ts'

export function LanguageIcon({ tag, size = 14 }: { tag: LanguageTag; size?: number }) {
  return (
    <span className="inline-flex flex-shrink-0 items-center justify-center">
      <Icon name={`lang-${tag}`} size={size} />
    </span>
  )
}
