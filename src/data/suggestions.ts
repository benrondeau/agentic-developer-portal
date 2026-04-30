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

// Per-branch suggestion shown ahead of the repo-level ones. Demonstrates
// that the "AI Suggestions" panel is sensitive to which branch the user has
// checked out, not just which repo.
function branchSuggestion(branch: string): Suggestion | null {
  if (branch.startsWith('hotfix/')) {
    return {
      id: 'sug-branch-hotfix',
      icon: 'security',
      text: 'hotfix ready — open PR to main and request expedited review',
      cta: 'Open PR',
      color: 'red',
      taskId: 'create-pr',
    }
  }
  if (branch.startsWith('release/')) {
    return {
      id: 'sug-branch-release',
      icon: 'beaker',
      text: 'release branch — run full regression before tagging',
      cta: 'Run Tests',
      color: 'orange',
      taskId: 'run-tests',
    }
  }
  if (branch.startsWith('feat/')) {
    return {
      id: 'sug-branch-feat',
      icon: 'refactor',
      text: 'feature branch is 14 commits behind main',
      cta: 'Refactor',
      color: 'orange',
      taskId: 'refactor',
    }
  }
  if (branch === 'develop') {
    return {
      id: 'sug-branch-develop',
      icon: 'package',
      text: '7 commits ready to cherry-pick into the next release',
      cta: 'Open PR',
      color: 'accent',
      taskId: 'create-pr',
    }
  }
  return null
}

export function getSuggestionsForRepo(slug: string, branch?: string): Suggestion[] {
  const base = perRepo[slug] ?? defaultSuggestions
  if (!branch || branch === 'main') return base
  const head = branchSuggestion(branch)
  return head ? [head, ...base.slice(0, 2)] : base
}
