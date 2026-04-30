/** Format ms-elapsed since `since` as MM:SS for live agent meta. */
export function formatElapsed(now: number, since: number): string {
  const sec = Math.max(0, Math.floor((now - since) / 1000))
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

/** Tokens like 84000 → "84k". */
export function formatTokensK(n: number): string {
  return `${Math.round(n / 1000)}k`
}

/** Cost in dollars to "$0.42". */
export function formatCost(usd: number): string {
  return `$${usd.toFixed(2)}`
}

/** Humanise a "[MM:SS]" prefix from elapsed seconds. */
export function elapsedToTs(elapsedSec: number): string {
  const m = Math.floor(elapsedSec / 60)
  const s = Math.floor(elapsedSec % 60)
  return `[${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}]`
}
