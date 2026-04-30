import { useContext } from 'react'
import { AgentRuntimeContext } from '../state/AgentRuntimeContext.tsx'

export function useAgentRuntime() {
  const ctx = useContext(AgentRuntimeContext)
  if (!ctx) throw new Error('useAgentRuntime must be used inside AgentRuntimeProvider')
  return ctx
}
