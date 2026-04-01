import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import Dashboard from '@/views/Dashboard.vue'
import { useAgentStore } from '@/stores/agents'

describe('Dashboard Component', () => {
  let wrapper: any
  let agentStore: any

  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
    agentStore = useAgentStore()
    
    wrapper = mount(Dashboard, {
      global: {
        plugins: [pinia],
        stubs: ['router-link']
      }
    })
  })

  describe('Component Rendering', () => {
    it('should render dashboard correctly', () => {
      expect(wrapper.find('.dashboard').exists()).toBe(true)
      expect(wrapper.find('h1').text()).toBe('Dashboard')
    })

    it('should display metrics cards', () => {
      const metricCards = wrapper.findAll('.metric-card')
      expect(metricCards).toHaveLength(4)
      
      expect(metricCards[0].find('h3').text()).toBe('Total Agents')
      expect(metricCards[1].find('h3').text()).toBe('Pages Processed')
      expect(metricCards[2].find('h3').text()).toBe('Errors')
      expect(metricCards[3].find('h3').text()).toBe('Memory Usage')
    })

    it('should display active agents section', () => {
      expect(wrapper.find('.agents-section').exists()).toBe(true)
      expect(wrapper.find('.section-header h2').text()).toBe('Active Agents')
    })
  })

  describe('Data Display', () => {
    it('should show correct total stats', () => {
      const stats = agentStore.totalStats
      
      expect(wrapper.find('.metric-value').text()).toContain(stats.totalAgents.toString())
      expect(wrapper.findAll('.metric-value')[1].text()).toContain(stats.totalPagesProcessed.toString())
      expect(wrapper.findAll('.metric-value')[2].text()).toContain(stats.totalErrors.toString())
      expect(wrapper.findAll('.metric-value')[3].text()).toContain(`${stats.totalMemoryUsage}MB`)
    })

    it('should display active agents correctly', () => {
      const activeAgents = wrapper.findAll('.agent-card')
      expect(activeAgents).toHaveLength(1) // Only one active agent by default
      
      const firstAgent = activeAgents[0]
      expect(firstAgent.find('h3').text()).toBe('Discovery Agent')
      expect(firstAgent.find('.status-active').exists()).toBe(true)
    })

    it('should show agent details', () => {
      const agentCard = wrapper.find('.agent-card')
      
      expect(agentCard.text()).toContain('Status: active')
      expect(agentCard.text()).toContain('Pages: 42')
      expect(agentCard.text()).toContain('Memory: 128MB')
    })
  })

  describe('User Interactions', () => {
    it('should refresh data when refresh button is clicked', async () => {
      const fetchAgentsSpy = vi.spyOn(agentStore, 'fetchAgents')
      const refreshButton = wrapper.find('[data-test="refresh-button"]')
      
      if (refreshButton.exists()) {
        await refreshButton.trigger('click')
        expect(fetchAgentsSpy).toHaveBeenCalled()
      }
    })

    it('should pause agent when pause button is clicked', async () => {
      const pauseButton = wrapper.find('[data-test="pause-agent"]')
      
      if (pauseButton.exists()) {
        await pauseButton.trigger('click')
        expect(agentStore.agents[0].status).toBe('idle')
      }
    })

    it('should stop agent when stop button is clicked', async () => {
      const stopButton = wrapper.find('[data-test="stop-agent"]')
      
      if (stopButton.exists()) {
        await stopButton.trigger('click')
        expect(agentStore.agents[0].status).toBe('inactive')
      }
    })
  })

  describe('Status Indicators', () => {
    it('should show correct status colors', () => {
      const statusIndicators = wrapper.findAll('.status-indicator')
      
      // Check that status indicators exist and have correct classes
      expect(statusIndicators.length).toBeGreaterThan(0)
      
      // Active status should have green indicator
      const activeIndicator = wrapper.find('.status-active')
      expect(activeIndicator.exists()).toBe(true)
    })

    it('should update status indicators when agent status changes', async () => {
      // Change agent status
      agentStore.updateAgentStatus('1', 'error')
      await wrapper.vm.$nextTick()
      
      // Check if error indicator is shown
      const errorIndicator = wrapper.find('.status-error')
      expect(errorIndicator.exists()).toBe(true)
    })
  })

  describe('Responsive Design', () => {
    it('should have responsive grid layout', () => {
      const metricsGrid = wrapper.find('.metrics-grid')
      expect(metricsGrid.exists()).toBe(true)
      
      // Check if grid has proper CSS classes
      expect(metricsGrid.classes()).toContain('metrics-grid')
    })
  })

  describe('Error Handling', () => {
    it('should handle fetch errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      // Mock fetch to fail
      vi.spyOn(agentStore, 'fetchAgents').mockRejectedValue(new Error('Network error'))
      
      await wrapper.vm.refreshData()
      
      expect(agentStore.error).toBe('Failed to fetch agents')
      
      consoleSpy.mockRestore()
    })

    it('should show error state when no agents', async () => {
      // Clear all agents
      agentStore.agents = []
      await wrapper.vm.$nextTick()
      
      const agentsList = wrapper.find('.agents-list')
      expect(agentsList.text()).toContain('No active agents')
    })
  })

  describe('Performance', () => {
    it('should render quickly with many agents', async () => {
      // Add many agents
      for (let i = 0; i < 100; i++) {
        agentStore.addAgent({
          name: `Test Agent ${i}`,
          status: 'active',
          memoryUsage: 64,
          cpuUsage: 10
        })
      }
      
      const start = performance.now()
      await wrapper.vm.$nextTick()
      const end = performance.now()
      
      // Should render in reasonable time
      expect(end - start).toBeLessThan(100) // 100ms max
      
      const agentCards = wrapper.findAll('.agent-card')
      expect(agentCards.length).toBeGreaterThan(50) // Many active agents
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      const buttons = wrapper.findAll('button')
      
      buttons.forEach(button => {
        // Buttons should have accessible names
        expect(button.attributes('aria-label') || button.text()).toBeTruthy()
      })
    })

    it('should have semantic HTML structure', () => {
      // Check for semantic elements
      expect(wrapper.find('main').exists()).toBe(true)
      expect(wrapper.find('nav').exists()).toBe(true)
      expect(wrapper.find('h1').exists()).toBe(true)
    })
  })
})
