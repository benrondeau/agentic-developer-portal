import type { Task } from '../types/task.ts'

export const tasks: Task[] = [
  {
    id: 'create-pr',
    label: 'Create PR',
    command: '/create-pr',
    icon: 'pr',
    color: 'purple',
    description: 'Generate a pull request from the current diff with an AI-written body.',
    bullets: [
      'Diff the working tree against the base branch',
      'Generate a PR title and description',
      'Push the branch to the remote',
      'Open a draft PR via the GitHub API',
    ],
    estTokens: 52000,
    estCost: 0.26,
    estDurationSec: 90,
  },
  {
    id: 'refactor',
    label: 'Refactor',
    command: '/refactor --target=auto',
    icon: 'refactor',
    color: 'purple',
    description: 'AI-guided refactor of a chosen module to reduce complexity.',
    bullets: [
      'Identify candidate hot-spot modules',
      'Generate refactor proposals',
      'Run the test suite against each candidate',
      'Open a draft PR with the winning proposal',
    ],
    estTokens: 96000,
    estCost: 0.48,
    estDurationSec: 240,
  },
  {
    id: 'sec-scan',
    label: 'Sec Scan',
    command: '/security-scan',
    icon: 'security',
    color: 'red',
    description: 'CVE + secret detection scan with a SARIF report.',
    bullets: [
      'Enumerate secrets via gitleaks',
      'Run SAST analysis on the source tree',
      'Cross-reference dependencies with CVE database',
      'Generate a SARIF report and post to PR',
    ],
    estTokens: 38000,
    estCost: 0.19,
    estDurationSec: 180,
  },
  {
    id: 'dep-upgrade',
    label: 'Upgrade Deps',
    command: '/upgrade-deps --target=all --auto-pr',
    icon: 'package',
    color: 'orange',
    description: 'Bump and test all package-manager dependencies, then open a PR.',
    bullets: [
      'Clone repo @ main',
      'Scan manifest for outdated deps (~42 packages)',
      'Cross-reference CVE database',
      'Resolve compatible version bumps',
      'Run test suite against patched versions',
      'Open a draft PR with the diff',
    ],
    estTokens: 84000,
    estCost: 0.42,
    estDurationSec: 180,
  },
  {
    id: 'run-tests',
    label: 'Run Tests',
    command: '/run-tests',
    icon: 'beaker',
    color: 'green',
    description: 'Run the full test suite with coverage reporting.',
    bullets: [
      'Install pinned dependencies',
      'Run unit + integration tests',
      'Collect coverage with JaCoCo / coverage.py / vitest',
      'Post a coverage delta comment',
    ],
    estTokens: 24000,
    estCost: 0.12,
    estDurationSec: 120,
  },
  {
    id: 'dep-map',
    label: 'Dep Map',
    command: '/dep-map',
    icon: 'graph',
    color: 'accent',
    description: 'Build a dependency graph and surface circular imports.',
    bullets: [
      'Walk the project tree and parse imports',
      'Build the dependency graph in-memory',
      'Detect cycles and flag them',
      'Render an SVG graph in the run output',
    ],
    estTokens: 44000,
    estCost: 0.22,
    estDurationSec: 150,
  },
]

export const tasksById = new Map(tasks.map((t) => [t.id, t]))

export function getTaskById(id: string): Task | undefined {
  return tasksById.get(id)
}
