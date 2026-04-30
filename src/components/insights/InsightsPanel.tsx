import { Icon } from '../primitives/Icon.tsx'
import { Divider } from '../primitives/Divider.tsx'
import { Label } from '../primitives/Label.tsx'
import { EmptyPane } from '../primitives/EmptyPane.tsx'
import { RepoHeader } from './RepoHeader.tsx'
import { StatGrid } from './StatGrid.tsx'
import { AISuggestions } from './AISuggestions.tsx'
import { TaskGrid } from './TaskGrid.tsx'
import { RecentRuns } from './RecentRuns.tsx'
import { ReadmeCard } from './ReadmeCard.tsx'
import { CommandBar } from './CommandBar.tsx'
import type { Repo } from '../../types/repo.ts'
import { getSuggestionsForRepo } from '../../data/suggestions.ts'
import { getRecentRunsForRepo } from '../../data/seedRuns.ts'

const PANEL_BASE = 'flex w-[340px] flex-shrink-0 flex-col border-r-[1.5px] border-border bg-surface'

export function InsightsPanelEmpty() {
  return (
    <section className={PANEL_BASE}>
      <EmptyPane
        icon={<Icon name="folder" size={32} color="var(--c-muted-2)" />}
        title="No repository selected"
        sub={'Select a repository from the list\non the left to view insights\nand trigger agent tasks.'}
      />
    </section>
  )
}

export function InsightsPanel({ repo }: { repo: Repo }) {
  const suggestions = getSuggestionsForRepo(repo.slug)
  const recent = getRecentRunsForRepo(repo.slug)

  return (
    <section className={PANEL_BASE}>
      <RepoHeader repo={repo} />

      <div className="flex-1 overflow-y-auto px-4 py-3">
        <Label>At a glance</Label>
        <StatGrid stats={repo.stats} />

        <Divider />
        <Label>AI Suggestions</Label>
        <AISuggestions suggestions={suggestions} repoSlug={repo.slug} />

        <Divider />
        <Label>Run Agent Task</Label>
        <TaskGrid repoSlug={repo.slug} />

        <Divider />
        <Label>Recent Agent Runs</Label>
        <RecentRuns runs={recent} />

        <Divider />
        <Label>README.md</Label>
        <ReadmeCard repo={repo} />

        <div className="h-4" />
      </div>

      <CommandBar repoSlug={repo.slug} />
    </section>
  )
}
