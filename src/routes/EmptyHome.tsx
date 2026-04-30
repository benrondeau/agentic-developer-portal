import { InsightsPanelEmpty } from '../components/insights/InsightsPanel.tsx'
import { AgentPanelEmpty } from '../components/agents/AgentPanel.tsx'

export function EmptyHome() {
  return (
    <>
      <InsightsPanelEmpty />
      <AgentPanelEmpty message={'Select a repository first,\nthen trigger an agent task.'} />
    </>
  )
}
