import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAgentStore } from '@/stores/agents'

describe('Agent Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('State Management', () => {
    it('should initialize with default agents', () => {
      const store = useAgentStore()
      
      expect(store.agents).toHaveLength(2)
      expect(store.agents[0].name).toBe('Discovery Agent')
      expect(store.loading).toBe(false)
      expect(store.error).toBe(null)
    })

    it('should calculate total stats correctly', () => {
      const store = useAgentStore()
      const stats = store.totalStats
      
      expect(stats.totalAgents).toBe(2)
      expect(stats.activeAgents).toBe(1)
      expect(stats.totalPagesProcessed).toBe(70) // 42 + 28
      expect(stats.totalErrors).toBe(1)
      expect(stats.totalMemoryUsage).toBe(192) // 128 + 64
    })

    it('should filter active agents correctly', () => {
      const store = useAgentStore()
      const activeAgents = store.activeAgents
      
      expect(activeAgents).toHaveLength(1)
      expect(activeAgents[0].status).toBe('active')
    })
  })

  describe('Agent Actions', () => {
    it('should update agent status', () => {
      const store = useAgentStore()
      const agentId = '1'
      
      store.updateAgentStatus(agentId, 'idle')
      
      const agent = store.agentById(agentId)
      expect(agent?.status).toBe('idle')
      expect(agent?.lastActivity).toBeDefined()
    })

    it('should update agent metrics', () => {
      const store = useAgentStore()
      const agentId = '1'
      const metrics = {
        memoryUsage: 256,
        cpuUsage: 25,
        pagesProcessed: 50
      }
      
      store.updateAgentMetrics(agentId, metrics)
      
      const agent = store.agentById(agentId)
      expect(agent?.memoryUsage).toBe(256)
      expect(agent?.cpuUsage).toBe(25)
      expect(agent?.pagesProcessed).toBe(50)
    })

    it('should add new agent', () => {
      const store = useAgentStore()
      const newAgent = {
        name: 'Test Agent',
        status: 'idle' as const,
        memoryUsage: 128,
        cpuUsage: 10
      }
      
      store.addAgent(newAgent)
      
      expect(store.agents).toHaveLength(3)
      const agent = store.agents.find(a => a.name === 'Test Agent')
      expect(agent).toBeDefined()
      expect(agent?.status).toBe('idle')
      expect(agent?.pagesProcessed).toBe(0)
      expect(agent?.errors).toBe(0)
    })

    it('should remove agent', () => {
      const store = useAgentStore()
      const agentId = '1'
      const initialLength = store.agents.length
      
      store.removeAgent(agentId)
      
      expect(store.agents).toHaveLength(initialLength - 1)
      expect(store.agents.find(a => a.id === agentId)).toBeUndefined()
    })
  })

  describe('Async Operations', () => {
    it('should fetch agents successfully', async () => {
      const store = useAgentStore()
      
      await store.fetchAgents()
      
      expect(store.loading).toBe(false)
      expect(store.error).toBe(null)
    })

    it('should handle fetch errors', async () => {
      const store = useAgentStore()
      
      // Mock console.error to avoid test output noise
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      // Simulate API failure
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')))
      
      await store.fetchAgents()
      
      expect(store.loading).toBe(false)
      expect(store.error).toBe('Failed to fetch agents')
      
      consoleSpy.mockRestore()
    })
  })

  describe('Edge Cases', () => {
    it('should handle updating non-existent agent', () => {
      const store = useAgentStore()
      
      // Should not throw error
      expect(() => {
        store.updateAgentStatus('999', 'active')
      }).not.toThrow()
      
      // Agent should not exist
      expect(store.agentById('999')).toBeUndefined()
    })

    it('should handle removing non-existent agent', () => {
      const store = useAgentStore()
      const initialLength = store.agents.length
      
      store.removeAgent('999')
      
      expect(store.agents).toHaveLength(initialLength)
    })

    it('should handle adding agent with empty name', () => {
      const store = useAgentStore()
      const initialLength = store.agents.length
      
      store.addAgent({
        name: '',
        status: 'idle',
        memoryUsage: 0,
        cpuUsage: 0
      })
      
      // Should not add agent with empty name
      expect(store.agents).toHaveLength(initialLength)
    })
  })

  describe('Performance', () => {
    it('should handle large number of agents efficiently', () => {
      const store = useAgentStore()
      
      // Add many agents
      for (let i = 0; i < 1000; i++) {
        store.addAgent({
          name: `Agent ${i}`,
          status: 'idle',
          memoryUsage: 64,
          cpuUsage: 5
        })
      }
      
      expect(store.agents).toHaveLength(1002) // 2 initial + 1000 new
      
      // Stats calculation should still be fast
      const start = performance.now()
      const stats = store.totalStats
      const end = performance.now()
      
      expect(end - start).toBeLessThan(10) // Should complete in < 10ms
      expect(stats.totalAgents).toBe(1002)
    })
  })
})
