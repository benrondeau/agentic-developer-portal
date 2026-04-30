import type { Suggestion } from '../types/suggestion.ts'

const defaultSuggestions: Suggestion[] = [
  {
    id: 'sug-default-1',
    icon: 'security',
    text: '6 deps flagged — 3 have known CVEs',
    cta: 'Upgrade Deps',
    color: 'red',
    taskId: 'dep-upgrade',
  },
  {
    id: 'sug-default-2',
    icon: 'refactor',
    text: 'auth/ module complexity score: 89',
    cta: 'Refactor',
    color: 'orange',
    taskId: 'refactor',
  },
  {
    id: 'sug-default-3',
    icon: 'beaker',
    text: 'Coverage dropped below 75% threshold',
    cta: 'Run Tests',
    color: 'orange',
    taskId: 'run-tests',
  },
]

const perRepo: Record<string, Suggestion[]> = {
  'frontend-v3': [
    {
      id: 'sug-fe-1',
      icon: 'package',
      text: 'react@19 minor available — patch + typings only',
      cta: 'Upgrade Deps',
      color: 'orange',
      taskId: 'dep-upgrade',
    },
    {
      id: 'sug-fe-2',
      icon: 'beaker',
      text: '4 visual snapshots stale — re-baseline?',
      cta: 'Run Tests',
      color: 'accent',
      taskId: 'run-tests',
    },
  ],
  'ml-pipeline': [
    {
      id: 'sug-ml-1',
      icon: 'security',
      text: '11 outdated deps; 4 high-severity CVEs',
      cta: 'Upgrade Deps',
      color: 'red',
      taskId: 'dep-upgrade',
    },
    {
      id: 'sug-ml-2',
      icon: 'beaker',
      text: 'CI pass rate at 88% — flaky training tests',
      cta: 'Run Tests',
      color: 'red',
      taskId: 'run-tests',
    },
  ],
}

export function getSuggestionsForRepo(slug: string): Suggestion[] {
  return perRepo[slug] ?? defaultSuggestions
}
