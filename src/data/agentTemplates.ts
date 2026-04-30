import type { AgentTemplate } from '../types/agent.ts'

const depUpgrade: AgentTemplate = {
  taskId: 'dep-upgrade',
  outcome: 'success',
  steps: [
    { label: 'Clone repo @ main', detail: '3,241 files', doneAtPct: 5 },
    { label: 'Scan pyproject.toml', detail: '42 deps found', doneAtPct: 15 },
    { label: 'Identify outdated pkgs', detail: '6 packages flagged', doneAtPct: 30 },
    { label: 'Check CVE database', detail: '3 CVEs matched', doneAtPct: 45 },
    { label: 'Resolve version bumps', detail: 'boto3, sqlalchemy…', doneAtPct: 65 },
    { label: 'Run compatibility tests', doneAtPct: 85 },
    { label: 'Patch pyproject.toml', doneAtPct: 95 },
    { label: 'Open draft PR', doneAtPct: 100 },
  ],
  logScript: [
    { atPct: 1, text: 'init: cloning repo @ main…' },
    { atPct: 6, text: '✓ 3,241 files indexed', kind: 'ok' },
    { atPct: 15, text: '✓ found 42 dependencies', kind: 'ok' },
    { atPct: 28, text: '⚠ boto3 1.26 → 1.34 (minor breaking)', kind: 'warn' },
    { atPct: 35, text: '⚠ sqlalchemy 1.4 → 2.0 (major — migration req.)', kind: 'warn' },
    { atPct: 42, text: '✕ CVE-2024-1234: cryptography <42.0', kind: 'err' },
    { atPct: 50, text: '→ proposed: boto3==1.34.84', kind: 'info' },
    { atPct: 55, text: '→ proposed: sqlalchemy==2.0.29', kind: 'info' },
    { atPct: 60, text: '→ proposed: cryptography==42.0.5', kind: 'info' },
    { atPct: 70, text: '✓ no dep conflicts detected', kind: 'ok' },
    { atPct: 78, text: 'spawning test runner…' },
    { atPct: 85, text: '✓ 148 tests passed · 2 skipped', kind: 'ok' },
    { atPct: 92, text: '→ patching pyproject.toml', kind: 'info' },
    { atPct: 98, text: '→ pushing branch chore/dep-upgrade', kind: 'info' },
    { atPct: 100, text: '✓ PR #218 opened', kind: 'ok' },
  ],
}

const createPR: AgentTemplate = {
  taskId: 'create-pr',
  outcome: 'success',
  steps: [
    { label: 'Analyse diff', detail: '14 changed files', doneAtPct: 25 },
    { label: 'Generate PR body', detail: 'title + description', doneAtPct: 55 },
    { label: 'Push branch', detail: 'feat/remove-deprecated-jwt', doneAtPct: 80 },
    { label: 'Open PR', detail: 'PR #214 opened', doneAtPct: 100 },
  ],
  logScript: [
    { atPct: 2, text: 'init: cloning @ main…' },
    { atPct: 18, text: '✓ diff analysed — 14 files', kind: 'ok' },
    { atPct: 50, text: '✓ PR body generated', kind: 'ok' },
    { atPct: 70, text: '→ pushing branch feat/remove-deprecated-jwt', kind: 'info' },
    { atPct: 100, text: '✓ PR #214 opened successfully', kind: 'ok' },
  ],
}

const secScan: AgentTemplate = {
  taskId: 'sec-scan',
  outcome: 'fail',
  failAtPct: 48,
  failMessage: 'SAST analysis timed out after 5m',
  steps: [
    { label: 'Enumerate secrets', detail: '0 found', doneAtPct: 20 },
    { label: 'SAST analysis', detail: 'timeout @ 5m', doneAtPct: 100 },
    { label: 'CVE cross-ref', doneAtPct: 100 },
    { label: 'Generate report', doneAtPct: 100 },
  ],
  logScript: [
    { atPct: 1, text: 'init: cloning repo…' },
    { atPct: 18, text: '✓ enumerated secrets: 0 found', kind: 'ok' },
    { atPct: 30, text: '→ starting SAST scan on src/', kind: 'info' },
    { atPct: 44, text: '⚠ scan duration approaching timeout', kind: 'warn' },
    { atPct: 48, text: '✕ SAST analysis timed out after 5m', kind: 'err' },
    { atPct: 48, text: '✕ agent halted — see retry options below', kind: 'err' },
  ],
}

const refactor: AgentTemplate = {
  taskId: 'refactor',
  outcome: 'success',
  steps: [
    { label: 'Build module graph', doneAtPct: 12 },
    { label: 'Score complexity', detail: 'auth/ scored 89', doneAtPct: 28 },
    { label: 'Generate proposals', detail: '3 candidates', doneAtPct: 52 },
    { label: 'Run tests on each', doneAtPct: 78 },
    { label: 'Pick winner & write PR', doneAtPct: 100 },
  ],
  logScript: [
    { atPct: 2, text: 'building module graph…' },
    { atPct: 14, text: '✓ graph built — 218 nodes', kind: 'ok' },
    { atPct: 22, text: '⚠ auth/session.py complexity 89', kind: 'warn' },
    { atPct: 38, text: '→ proposal 1: extract token verifier', kind: 'info' },
    { atPct: 46, text: '→ proposal 2: split provider strategies', kind: 'info' },
    { atPct: 62, text: '✓ test suite passed against proposal 2', kind: 'ok' },
    { atPct: 86, text: '→ writing PR body…', kind: 'info' },
    { atPct: 100, text: '✓ PR #221 opened (refactor: auth)', kind: 'ok' },
  ],
}

const runTests: AgentTemplate = {
  taskId: 'run-tests',
  outcome: 'success',
  steps: [
    { label: 'Install dependencies', doneAtPct: 30 },
    { label: 'Run unit tests', doneAtPct: 65 },
    { label: 'Run integration tests', doneAtPct: 90 },
    { label: 'Post coverage delta', doneAtPct: 100 },
  ],
  logScript: [
    { atPct: 5, text: 'pip install -r requirements.txt' },
    { atPct: 28, text: '✓ deps installed', kind: 'ok' },
    { atPct: 55, text: '✓ 148 unit tests passed', kind: 'ok' },
    { atPct: 88, text: '✓ 32 integration tests passed', kind: 'ok' },
    { atPct: 100, text: '✓ coverage 73% (+0.4 vs main)', kind: 'ok' },
  ],
}

const depMap: AgentTemplate = {
  taskId: 'dep-map',
  outcome: 'success',
  steps: [
    { label: 'Walk source tree', doneAtPct: 25 },
    { label: 'Parse imports', doneAtPct: 60 },
    { label: 'Detect cycles', detail: '2 cycles found', doneAtPct: 85 },
    { label: 'Render graph', doneAtPct: 100 },
  ],
  logScript: [
    { atPct: 5, text: 'walking 3,241 files…' },
    { atPct: 22, text: '✓ tree walked', kind: 'ok' },
    { atPct: 50, text: '→ parsing python imports', kind: 'info' },
    { atPct: 78, text: '⚠ cycle: auth → users → auth', kind: 'warn' },
    { atPct: 82, text: '⚠ cycle: workers → tasks → workers', kind: 'warn' },
    { atPct: 100, text: '✓ graph rendered (218 nodes, 412 edges)', kind: 'ok' },
  ],
}

export const templatesByTaskId: Record<string, AgentTemplate> = {
  'dep-upgrade': depUpgrade,
  'create-pr': createPR,
  'sec-scan': secScan,
  refactor,
  'run-tests': runTests,
  'dep-map': depMap,
}

export function getTemplate(taskId: string): AgentTemplate | undefined {
  return templatesByTaskId[taskId]
}
