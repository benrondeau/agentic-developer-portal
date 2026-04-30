import { Outlet } from 'react-router'
import { NavBar } from '../components/chrome/NavBar.tsx'
import { RepoList } from '../components/repos/RepoList.tsx'
import { LaunchModalController } from '../components/modals/LaunchModalController.tsx'
import { DrawerController } from '../components/drawers/DrawerController.tsx'
import { useAgentRuntime } from '../hooks/useAgentRuntime.ts'

export function Layout() {
  const { activeAgentCount } = useAgentRuntime()

  return (
    <div className="flex h-screen min-w-[1024px] flex-col bg-bg text-text">
      <NavBar agentCount={activeAgentCount} />
      <div className="relative flex flex-1 overflow-hidden">
        <RepoList />
        <Outlet />
        <DrawerController />
        <LaunchModalController />
      </div>
    </div>
  )
}
