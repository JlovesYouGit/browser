import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Agent {
  id: string
  name: string
  status: 'active' | 'inactive' | 'error' | 'idle'
  currentUrl?: string
  lastActivity: string
  pagesProcessed: number
  errors: number
  memoryUsage: number
  cpuUsage: number
}

export const useAgentStore = defineStore('agents', () => {
  // State
  const agents = ref<Agent[]>([
    {
      id: '1',
      name: 'Discovery Agent',
      status: 'active',
      currentUrl: 'https://example.com',
      lastActivity: '2024-01-01T12:00:00Z',
      pagesProcessed: 42,
      errors: 0,
      memoryUsage: 128,
      cpuUsage: 15
    },
    {
      id: '2',
      name: 'Enrichment Agent',
      status: 'idle',
      lastActivity: '2024-01-01T11:30:00Z',
      pagesProcessed: 28,
      errors: 1,
      memoryUsage: 64,
      cpuUsage: 5
    }
  ])
  
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  // Getters
  const activeAgents = computed(() => 
    agents.value.filter(agent => agent.status === 'active')
  )
  
  const agentById = computed(() => (id: string) => 
    agents.value.find(agent => agent.id === id)
  )
  
  const totalStats = computed(() => ({
    totalAgents: agents.value.length,
    activeAgents: activeAgents.value.length,
    totalPagesProcessed: agents.value.reduce((sum, agent) => sum + agent.pagesProcessed, 0),
    totalErrors: agents.value.reduce((sum, agent) => sum + agent.errors, 0),
    totalMemoryUsage: agents.value.reduce((sum, agent) => sum + agent.memoryUsage, 0)
  }))
  
  // Actions
  const fetchAgents = async () => {
    loading.value = true
    error.value = null
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      // In real app, this would be: const response = await api.getAgents()
      // agents.value = response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch agents'
    } finally {
      loading.value = false
    }
  }
  
  const updateAgentStatus = (id: string, status: Agent['status']) => {
    const agent = agents.value.find(a => a.id === id)
    if (agent) {
      agent.status = status
      agent.lastActivity = new Date().toISOString()
    }
  }
  
  const updateAgentMetrics = (id: string, metrics: Partial<Agent>) => {
    const agent = agents.value.find(a => a.id === id)
    if (agent) {
      Object.assign(agent, metrics)
      agent.lastActivity = new Date().toISOString()
    }
  }
  
  const addAgent = (agent: Omit<Agent, 'id' | 'lastActivity' | 'pagesProcessed' | 'errors'>) => {
    const newAgent: Agent = {
      ...agent,
      id: Date.now().toString(),
      lastActivity: new Date().toISOString(),
      pagesProcessed: 0,
      errors: 0
    }
    agents.value.push(newAgent)
  }
  
  const removeAgent = (id: string) => {
    const index = agents.value.findIndex(agent => agent.id === id)
    if (index > -1) {
      agents.value.splice(index, 1)
    }
  }
  
  return {
    // State
    agents,
    loading,
    error,
    
    // Getters
    activeAgents,
    agentById,
    totalStats,
    
    // Actions
    fetchAgents,
    updateAgentStatus,
    updateAgentMetrics,
    addAgent,
    removeAgent
  }
})
