import type { Org } from '../types/org.ts'

export const orgs: Org[] = [
  { slug: 'personal', name: 'personal', repoCount: 4, agentCount: 0 },
  { slug: 'acme-org', name: 'acme-org', repoCount: 12, agentCount: 12 },
  { slug: 'acme-labs', name: 'acme-labs', repoCount: 6, agentCount: 1 },
  { slug: 'partner-co', name: 'partner-co', repoCount: 3, agentCount: 0 },
  { slug: 'open-source-wg', name: 'open-source-wg', repoCount: 8, agentCount: 0 },
]

export const ACTIVE_ORG_SLUG = 'acme-org'
