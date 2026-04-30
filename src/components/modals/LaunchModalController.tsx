import { useNavigate, useParams, useSearchParams } from 'react-router'
import { AgentConfirmModal } from './AgentConfirmModal.tsx'
import { getTaskById } from '../../data/tasks.ts'
import { getRepoBySlug } from '../../data/repos.ts'
import { useAgentRuntime } from '../../hooks/useAgentRuntime.ts'

/**
 * Reads `?launch=<taskId>` from the URL and renders the confirmation modal
 * for that task on the current repo. Cancel clears the param. Confirm calls
 * runtime.launch and clears the param.
 */
export function LaunchModalController() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { repoSlug } = useParams<{ repoSlug: string }>()
  const navigate = useNavigate()
  const { launch } = useAgentRuntime()

  const launchId = searchParams.get('launch')
  if (!launchId || !repoSlug) return null

  const task = getTaskById(launchId)
  const repo = getRepoBySlug(repoSlug)
  if (!task || !repo) return null

  const clear = () => {
    const next = new URLSearchParams(searchParams)
    next.delete('launch')
    setSearchParams(next, { replace: true })
  }

  const confirm = () => {
    launch(task.id, repo.slug)
    clear()
    // ensure we stay on the repo route so the new run shows up in the panel.
    navigate(`/repo/${repo.slug}`, { replace: true })
  }

  return <AgentConfirmModal task={task} repo={repo} onCancel={clear} onConfirm={confirm} />
}
