import { useEffect, useState } from 'react'

/**
 * Re-renders every `intervalMs` while `active` is true, returning a fresh
 * `Date.now()` each render. Pause and resume by toggling `active`.
 */
export function useNow(active: boolean, intervalMs = 1000) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (!active) return
    const id = window.setInterval(() => setNow(Date.now()), intervalMs)
    return () => window.clearInterval(id)
  }, [active, intervalMs])
  return now
}
