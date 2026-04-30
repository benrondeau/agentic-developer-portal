import { Navigate, useParams, useSearchParams } from 'react-router'
import { getRepoBySlug, getRepoForBranch } from '../data/repos.ts'
import { InsightsPanel } from '../components/insights/InsightsPanel.tsx'
import { AgentPanel } from '../components/agents/AgentPanel.tsx'

export function RepoView() {
  const { repoSlug } = useParams<{ repoSlug: string }>()
  const repo = repoSlug ? getRepoBySlug(repoSlug) : undefined
  const [searchParams] = useSearchParams()

  if (!repo) return <Navigate to="/" replace />

  const branchParam = searchParams.get('branch') ?? repo.branch
  const branchView = getRepoForBranch(repo, branchParam)

  return (
    <>
      <InsightsPanel repo={branchView} />
      <AgentPanel repoSlug={repo.slug} />
    </>
  )
}
