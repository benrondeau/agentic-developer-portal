import { useParams, useSearchParams } from 'react-router'
import { AgentConfirmModal } from './AgentConfirmModal.tsx'
import { getTaskById } from '../../data/tasks.ts'
import { getRepoBySlug } from '../../data/repos.ts'
import { useAgentRuntime } from '../../hooks/useAgentRuntime.ts'

/**
 * Renders the agent-confirmation modal when either `?launch=<taskId>` (from a
 * task picker) or `?retry=<taskId>` (from the agent toolbar's re-run button)
 * is present. On confirm, launches the agent and points `?run=` at the new
 * run so it becomes the active tab. Other params (notably `?branch=`) are
 * preserved.
 */
export function LaunchModalController() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { repoSlug } = useParams<{ repoSlug: string }>()
  const { launch } = useAgentRuntime()

  const launchId = searchParams.get('launch')
  const retryId = searchParams.get('retry')
  const taskId = launchId ?? retryId
  if (!taskId || !repoSlug) return null

  const task = getTaskById(taskId)
  const repo = getRepoBySlug(repoSlug)
  if (!task || !repo) return null

  const mode = retryId ? 'retry' : 'launch'

  const clear = () => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.delete('launch')
        next.delete('retry')
        return next
      },
      { replace: true },
    )
  }

  const confirm = () => {
    const newRunId = launch(task.id, repo.slug)
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.delete('launch')
        next.delete('retry')
        if (newRunId) next.set('run', newRunId)
        return next
      },
      { replace: true },
    )
  }

  return <AgentConfirmModal task={task} repo={repo} mode={mode} onCancel={clear} onConfirm={confirm} />
}
