import type { Repo, RepoStat } from '../types/repo.ts'

export const repos: Repo[] = [
  {
    slug: 'backend-api',
    name: 'acme/backend-api',
    language: 'py',
    languageLabel: 'Python',
    fileCount: 3241,
    lastPushLabel: '2h ago',
    branch: 'main',
    branches: ['main', 'develop', 'release/2025-q1', 'feat/agentic-flow', 'hotfix/cve-cryptography'],
    description: 'REST API service powering the Acme platform. Built with FastAPI and deployed on AWS ECS.',
    stack: ['FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'Docker', 'AWS ECS'],
    contributing:
      'Open a PR against main. All changes require passing CI and one approval from @acme/backend-team.',
    gettingStarted: [
      '$ git clone git@github.com:acme/backend-api',
      '$ pip install -r requirements.txt',
      '$ uvicorn main:app --reload',
    ],
    stats: [
      { label: 'Open PRs', value: '14' },
      { label: 'Open Issues', value: '32' },
      { label: 'Test Coverage', value: '73%', warn: true },
      { label: 'Dep Issues', value: '6', warn: true },
      { label: 'Code Health', value: 'A−' },
      { label: 'CI Pass Rate', value: '99.2%' },
    ],
  },
  {
    slug: 'frontend-v3',
    name: 'acme/frontend-v3',
    language: 'ts',
    languageLabel: 'TypeScript',
    fileCount: 1872,
    lastPushLabel: '4h ago',
    branch: 'main',
    branches: ['main', 'develop', 'release/2025-q1', 'feat/agentic-flow', 'hotfix/cve-cryptography'],
    description: 'Acme customer-facing web app. React + Vite + Tailwind.',
    stack: ['React', 'Vite', 'Tailwind', 'TanStack Query', 'Playwright'],
    contributing: 'Open a PR against main. Visual diffs auto-posted via Chromatic.',
    gettingStarted: ['$ git clone git@github.com:acme/frontend-v3', '$ pnpm install', '$ pnpm dev'],
    stats: [
      { label: 'Open PRs', value: '8' },
      { label: 'Open Issues', value: '21' },
      { label: 'Test Coverage', value: '81%' },
      { label: 'Dep Issues', value: '2' },
      { label: 'Code Health', value: 'A' },
      { label: 'CI Pass Rate', value: '98.4%' },
    ],
  },
  {
    slug: 'infra-k8s',
    name: 'acme/infra-k8s',
    language: 'k8s',
    languageLabel: 'Kubernetes',
    fileCount: 412,
    lastPushLabel: '1d ago',
    branch: 'main',
    branches: ['main', 'develop', 'release/2025-q1', 'feat/agentic-flow', 'hotfix/cve-cryptography'],
    description: 'Production cluster manifests, helm charts, and ArgoCD config.',
    stack: ['Helm', 'ArgoCD', 'Terraform', 'Kustomize'],
    contributing: 'PR review required from @acme/sre. Synced to prod via ArgoCD.',
    gettingStarted: ['$ git clone git@github.com:acme/infra-k8s', '$ helm dep update charts/'],
    stats: [
      { label: 'Open PRs', value: '3' },
      { label: 'Open Issues', value: '11' },
      { label: 'Drift', value: 'none' },
      { label: 'Dep Issues', value: '0' },
      { label: 'Code Health', value: 'B+' },
      { label: 'CI Pass Rate', value: '100%' },
    ],
  },
  {
    slug: 'ml-pipeline',
    name: 'acme/ml-pipeline',
    language: 'py',
    languageLabel: 'Python',
    fileCount: 942,
    lastPushLabel: '3d ago',
    branch: 'main',
    branches: ['main', 'develop', 'release/2025-q1', 'feat/agentic-flow', 'hotfix/cve-cryptography'],
    description: 'Recommendation training + serving pipeline. Airflow + Ray Serve.',
    stack: ['Airflow', 'Ray Serve', 'PyTorch', 'MLflow'],
    contributing: 'PR + DAG dry-run required. @acme/ml owns review.',
    gettingStarted: ['$ git clone git@github.com:acme/ml-pipeline', '$ poetry install'],
    warn: true,
    stats: [
      { label: 'Open PRs', value: '6' },
      { label: 'Open Issues', value: '47', warn: true },
      { label: 'Test Coverage', value: '52%', warn: true },
      { label: 'Dep Issues', value: '11', warn: true },
      { label: 'Code Health', value: 'C' },
      { label: 'CI Pass Rate', value: '88.0%', warn: true },
    ],
  },
  {
    slug: 'data-ingest',
    name: 'acme/data-ingest',
    language: 'go',
    languageLabel: 'Go',
    fileCount: 612,
    lastPushLabel: '5d ago',
    branch: 'main',
    branches: ['main', 'develop', 'release/2025-q1', 'feat/agentic-flow', 'hotfix/cve-cryptography'],
    description: 'High-throughput Kafka → S3 ingestion service.',
    stack: ['Go', 'Kafka', 'S3', 'Parquet'],
    contributing: 'Reviews from @acme/platform.',
    gettingStarted: ['$ git clone git@github.com:acme/data-ingest', '$ go build ./...'],
    stats: [
      { label: 'Open PRs', value: '2' },
      { label: 'Open Issues', value: '7' },
      { label: 'Test Coverage', value: '88%' },
      { label: 'Dep Issues', value: '1' },
      { label: 'Code Health', value: 'A' },
      { label: 'CI Pass Rate', value: '99.9%' },
    ],
  },
  {
    slug: 'devtools-cli',
    name: 'acme/devtools-cli',
    language: 'cli',
    languageLabel: 'Shell / Bun',
    fileCount: 188,
    lastPushLabel: '1w ago',
    branch: 'main',
    branches: ['main', 'develop', 'release/2025-q1', 'feat/agentic-flow', 'hotfix/cve-cryptography'],
    description: 'Internal CLI for repo bootstrap and on-call helpers.',
    stack: ['Bun', 'TypeScript', 'cliui'],
    contributing: 'Single-maintainer review.',
    gettingStarted: ['$ git clone git@github.com:acme/devtools-cli', '$ bun install', '$ bun run dev'],
    stats: [
      { label: 'Open PRs', value: '1' },
      { label: 'Open Issues', value: '4' },
      { label: 'Test Coverage', value: '70%' },
      { label: 'Dep Issues', value: '0' },
      { label: 'Code Health', value: 'A−' },
      { label: 'CI Pass Rate', value: '100%' },
    ],
  },
  {
    slug: 'design-system',
    name: 'acme/design-system',
    language: 'ts',
    languageLabel: 'TypeScript',
    fileCount: 521,
    lastPushLabel: '1w ago',
    branch: 'main',
    branches: ['main', 'develop', 'release/2025-q1', 'feat/agentic-flow', 'hotfix/cve-cryptography'],
    description: 'Cross-product component library + design tokens.',
    stack: ['React', 'Storybook', 'Vite', 'Style Dictionary'],
    contributing: 'Visual review + a11y audit required for new components.',
    gettingStarted: ['$ git clone git@github.com:acme/design-system', '$ pnpm install'],
    stats: [
      { label: 'Open PRs', value: '5' },
      { label: 'Open Issues', value: '13' },
      { label: 'Test Coverage', value: '92%' },
      { label: 'Dep Issues', value: '0' },
      { label: 'Code Health', value: 'A' },
      { label: 'CI Pass Rate', value: '99.6%' },
    ],
  },
  {
    slug: 'edge-proxy',
    name: 'acme/edge-proxy',
    language: 'rust',
    languageLabel: 'Rust',
    fileCount: 312,
    lastPushLabel: '2w ago',
    branch: 'main',
    branches: ['main', 'develop', 'release/2025-q1', 'feat/agentic-flow', 'hotfix/cve-cryptography'],
    description: 'Edge L7 proxy with WAF rules + JWT authn.',
    stack: ['Rust', 'Tokio', 'Hyper'],
    contributing: 'Two reviewers required for auth path changes.',
    gettingStarted: ['$ git clone git@github.com:acme/edge-proxy', '$ cargo build --release'],
    stats: [
      { label: 'Open PRs', value: '4' },
      { label: 'Open Issues', value: '9' },
      { label: 'Test Coverage', value: '79%' },
      { label: 'Dep Issues', value: '1' },
      { label: 'Code Health', value: 'A' },
      { label: 'CI Pass Rate', value: '99.0%' },
    ],
  },
  {
    slug: 'etl-jobs',
    name: 'acme/etl-jobs',
    language: 'py',
    languageLabel: 'Python',
    fileCount: 281,
    lastPushLabel: '2w ago',
    branch: 'main',
    branches: ['main', 'develop', 'release/2025-q1', 'feat/agentic-flow', 'hotfix/cve-cryptography'],
    description: 'Nightly batch ETL into the warehouse.',
    stack: ['dbt', 'Snowflake', 'Airflow'],
    contributing: 'PR + warehouse cost review.',
    gettingStarted: ['$ git clone git@github.com:acme/etl-jobs'],
    warn: true,
    stats: [
      { label: 'Open PRs', value: '1' },
      { label: 'Open Issues', value: '22', warn: true },
      { label: 'Test Coverage', value: '41%', warn: true },
      { label: 'Dep Issues', value: '5', warn: true },
      { label: 'Code Health', value: 'D' },
      { label: 'CI Pass Rate', value: '74.0%', warn: true },
    ],
  },
  {
    slug: 'api-gateway',
    name: 'acme/api-gateway',
    language: 'go',
    languageLabel: 'Go',
    fileCount: 198,
    lastPushLabel: '3w ago',
    branch: 'main',
    branches: ['main', 'develop', 'release/2025-q1', 'feat/agentic-flow', 'hotfix/cve-cryptography'],
    description: 'GraphQL gateway federating internal services.',
    stack: ['Go', 'GraphQL', 'gqlgen'],
    contributing: '@acme/platform reviews.',
    gettingStarted: ['$ git clone git@github.com:acme/api-gateway'],
    stats: [
      { label: 'Open PRs', value: '0' },
      { label: 'Open Issues', value: '3' },
      { label: 'Test Coverage', value: '85%' },
      { label: 'Dep Issues', value: '0' },
      { label: 'Code Health', value: 'A−' },
      { label: 'CI Pass Rate', value: '100%' },
    ],
  },
  {
    slug: 'billing-svc',
    name: 'acme/billing-svc',
    language: 'java',
    languageLabel: 'Java',
    fileCount: 412,
    lastPushLabel: '1mo ago',
    branch: 'main',
    branches: ['main', 'develop', 'release/2025-q1', 'feat/agentic-flow', 'hotfix/cve-cryptography'],
    description: 'Stripe-backed billing service. Handles subscriptions + invoicing.',
    stack: ['Spring Boot', 'PostgreSQL', 'Stripe'],
    contributing: 'Required: SOC2 reviewer + @acme/finance approval.',
    gettingStarted: ['$ git clone git@github.com:acme/billing-svc'],
    stats: [
      { label: 'Open PRs', value: '2' },
      { label: 'Open Issues', value: '5' },
      { label: 'Test Coverage', value: '94%' },
      { label: 'Dep Issues', value: '2' },
      { label: 'Code Health', value: 'A' },
      { label: 'CI Pass Rate', value: '99.8%' },
    ],
  },
  {
    slug: 'admin-panel',
    name: 'acme/admin-panel',
    language: 'ts',
    languageLabel: 'TypeScript',
    fileCount: 244,
    lastPushLabel: '1mo ago',
    branch: 'main',
    branches: ['main', 'develop', 'release/2025-q1', 'feat/agentic-flow', 'hotfix/cve-cryptography'],
    description: 'Internal admin UI for support and operations.',
    stack: ['React', 'Vite', 'tRPC'],
    contributing: 'Single reviewer.',
    gettingStarted: ['$ git clone git@github.com:acme/admin-panel'],
    stats: [
      { label: 'Open PRs', value: '0' },
      { label: 'Open Issues', value: '8' },
      { label: 'Test Coverage', value: '64%', warn: true },
      { label: 'Dep Issues', value: '3' },
      { label: 'Code Health', value: 'B' },
      { label: 'CI Pass Rate', value: '96.7%' },
    ],
  },
]

export const reposBySlug = new Map(repos.map((r) => [r.slug, r]))

export function getRepoBySlug(slug: string): Repo | undefined {
  return reposBySlug.get(slug)
}

// ── per-branch view derivation ─────────────────────────────────────────────
// Each non-default branch projects a "personality" onto the repo's headline
// numbers so switching branches in the dropdown produces visibly different
// data. Top-level repo fields (name/description/stack/contributing/getting
// started) remain branch-agnostic — they're repo-level metadata.

type BranchProfile = {
  lastPushLabel: string
  fileMul: number
  /** scaled multipliers + absolute deltas applied to numeric stats. */
  prMul: number
  issueMul: number
  coverageDelta: number
  depIssueDelta: number
  ciDelta: number
  alwaysWarn?: boolean
}

function branchProfile(branch: string): BranchProfile | null {
  if (branch === 'develop') {
    return { lastPushLabel: '15m ago', fileMul: 1.02, prMul: 1.6, issueMul: 1.1, coverageDelta: -3, depIssueDelta: 1, ciDelta: -0.5 }
  }
  if (branch.startsWith('release/')) {
    return { lastPushLabel: '5d ago', fileMul: 1.0, prMul: 0.2, issueMul: 0.7, coverageDelta: 4, depIssueDelta: -1, ciDelta: 0.4 }
  }
  if (branch.startsWith('feat/')) {
    return { lastPushLabel: '38m ago', fileMul: 1.05, prMul: 0.4, issueMul: 1.0, coverageDelta: -8, depIssueDelta: 0, ciDelta: -1.5 }
  }
  if (branch.startsWith('hotfix/')) {
    return { lastPushLabel: '6m ago', fileMul: 1.0, prMul: 0.1, issueMul: 0.6, coverageDelta: 0, depIssueDelta: -2, ciDelta: -0.2, alwaysWarn: true }
  }
  return null
}

function transformStat(stat: RepoStat, p: BranchProfile): RepoStat {
  switch (stat.label.toLowerCase()) {
    case 'open prs': return scaleIntStat(stat, p.prMul)
    case 'open issues': return scaleIntStat(stat, p.issueMul, /* warnIfAbove */ 30)
    case 'test coverage': return shiftPctStat(stat, p.coverageDelta, /* warnIfBelow */ 75)
    case 'dep issues': return shiftIntStat(stat, p.depIssueDelta, /* warnIfAbove */ 4)
    case 'ci pass rate': return shiftPctStat(stat, p.ciDelta, /* warnIfBelow */ 95)
    default: return stat
  }
}

function scaleIntStat(stat: RepoStat, mul: number, warnIfAbove?: number): RepoStat {
  const n = Number.parseInt(stat.value, 10)
  if (Number.isNaN(n)) return stat
  const next = Math.max(0, Math.round(n * mul))
  const warn = warnIfAbove != null ? next > warnIfAbove : false
  return { ...stat, value: String(next), warn: warn || stat.warn }
}

function shiftIntStat(stat: RepoStat, delta: number, warnIfAbove: number): RepoStat {
  const n = Number.parseInt(stat.value, 10)
  if (Number.isNaN(n)) return stat
  const next = Math.max(0, n + delta)
  return { ...stat, value: String(next), warn: next > warnIfAbove }
}

function shiftPctStat(stat: RepoStat, delta: number, warnIfBelow: number): RepoStat {
  const m = stat.value.match(/^(\d+(?:\.\d+)?)%$/)
  if (!m) return stat
  const raw = m[1]
  const n = Number.parseFloat(raw)
  const next = Math.max(0, Math.min(100, Math.round((n + delta) * 10) / 10))
  const formatted = raw.includes('.') ? `${next.toFixed(1)}%` : `${Math.round(next)}%`
  return { ...stat, value: formatted, warn: next < warnIfBelow }
}

/**
 * Project a per-branch view of `repo`. Top-level repo fields are treated as
 * the default-branch's data; other branches transform via `branchProfile`.
 * Falls back to `repo` unchanged when `branch` is the repo's default or
 * unknown.
 */
export function getRepoForBranch(repo: Repo, branch: string): Repo {
  if (branch === repo.branch) return repo
  if (!repo.branches.includes(branch)) return repo
  const profile = branchProfile(branch)
  if (!profile) return { ...repo, branch }
  return {
    ...repo,
    branch,
    lastPushLabel: profile.lastPushLabel,
    fileCount: Math.max(50, Math.round(repo.fileCount * profile.fileMul)),
    stats: repo.stats.map((s) => transformStat(s, profile)),
    warn: profile.alwaysWarn ? true : repo.warn,
  }
}
