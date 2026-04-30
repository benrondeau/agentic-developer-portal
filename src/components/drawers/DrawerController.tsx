import { useSearchParams } from 'react-router'
import { OrgDrawer } from './OrgDrawer.tsx'
import { GlobalAgentsDrawer } from './GlobalAgentsDrawer.tsx'

/**
 * Reads `?drawer=` from the URL and mounts the matching drawer.
 *  - drawer=org    → org switcher (left slide-in)
 *  - drawer=agents → global agents (right slide-in)
 */
export function DrawerController() {
  const [searchParams, setSearchParams] = useSearchParams()
  const drawer = searchParams.get('drawer')

  const close = () => {
    const next = new URLSearchParams(searchParams)
    next.delete('drawer')
    setSearchParams(next, { replace: true })
  }

  if (drawer === 'org') return <OrgDrawer onClose={close} />
  if (drawer === 'agents') return <GlobalAgentsDrawer onClose={close} />
  return null
}
