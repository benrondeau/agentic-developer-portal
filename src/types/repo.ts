export type LanguageTag = 'py' | 'ts' | 'go' | 'rust' | 'java' | 'k8s' | 'cli'

export type RepoStat = {
  label: string
  value: string
  warn?: boolean
}

export type Repo = {
  slug: string
  name: string
  language: LanguageTag
  languageLabel: string
  fileCount: number
  lastPushLabel: string
  /** the currently-checked-out branch — also the first entry in `branches`. */
  branch: string
  /** all branches the user can switch to via the header dropdown. */
  branches: string[]
  description: string
  stack: string[]
  contributing: string
  gettingStarted: string[]
  stats: RepoStat[]
  warn?: boolean
}
