import { Navigate, useParams } from 'react-router'
import { getRepoBySlug } from '../data/repos.ts'
import { InsightsPanel } from '../components/insights/InsightsPanel.tsx'
import { AgentPanel } from '../components/agents/AgentPanel.tsx'

export function RepoView() {
  const { repoSlug } = useParams<{ repoSlug: string }>()
  const repo = repoSlug ? getRepoBySlug(repoSlug) : undefined

  if (!repo) return <Navigate to="/" replace />

  return (
    <>
      <InsightsPanel repo={repo} />
      <AgentPanel repoSlug={repo.slug} />
    </>
  )
}
