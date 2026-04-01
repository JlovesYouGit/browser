<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Dashboard</h1>
      <div class="header-actions">
        <button class="btn btn-primary" @click="refreshData">
          Refresh
        </button>
      </div>
    </div>
    
    <div class="metrics-grid">
      <div class="card metric-card">
        <div class="metric-header">
          <h3>Total Agents</h3>
          <div class="status-indicator status-active"></div>
        </div>
        <div class="metric-value">{{ totalStats.totalAgents }}</div>
        <div class="metric-label">Active: {{ totalStats.activeAgents }}</div>
      </div>
      
      <div class="card metric-card">
        <div class="metric-header">
          <h3>Pages Processed</h3>
          <div class="status-indicator status-active"></div>
        </div>
        <div class="metric-value">{{ totalStats.totalPagesProcessed }}</div>
        <div class="metric-label">Total pages</div>
      </div>
      
      <div class="card metric-card">
        <div class="metric-header">
          <h3>Errors</h3>
          <div class="status-indicator" :class="totalStats.totalErrors > 0 ? 'status-error' : 'status-active'"></div>
        </div>
        <div class="metric-value">{{ totalStats.totalErrors }}</div>
        <div class="metric-label">Total errors</div>
      </div>
      
      <div class="card metric-card">
        <div class="metric-header">
          <h3>Memory Usage</h3>
          <div class="status-indicator status-active"></div>
        </div>
        <div class="metric-value">{{ totalStats.totalMemoryUsage }}MB</div>
        <div class="metric-label">Total memory</div>
      </div>
    </div>
    
    <div class="dashboard-content">
      <div class="agents-section">
        <div class="section-header">
          <h2>Active Agents</h2>
          <router-link to="/agents" class="btn btn-secondary">View All</router-link>
        </div>
        
        <div class="agents-list">
          <div v-for="agent in activeAgents" :key="agent.id" class="card agent-card">
            <div class="agent-info">
              <div class="agent-header">
                <h3>{{ agent.name }}</h3>
                <div class="status-indicator" :class="`status-${agent.status}`"></div>
              </div>
              <div class="agent-details">
                <p><strong>Status:</strong> {{ agent.status }}</p>
                <p v-if="agent.currentUrl"><strong>Current URL:</strong> {{ agent.currentUrl }}</p>
                <p><strong>Pages:</strong> {{ agent.pagesProcessed }}</p>
                <p><strong>Memory:</strong> {{ agent.memoryUsage }}MB</p>
              </div>
            </div>
            <div class="agent-actions">
              <button class="btn btn-secondary" @click="pauseAgent(agent.id)">
                Pause
              </button>
              <button class="btn btn-danger" @click="stopAgent(agent.id)">
                Stop
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAgentStore } from '@/stores/agents'

const agentStore = useAgentStore()

const totalStats = computed(() => agentStore.totalStats)
const activeAgents = computed(() => agentStore.activeAgents)

const refreshData = async () => {
  await agentStore.fetchAgents()
}

const pauseAgent = (id: string) => {
  agentStore.updateAgentStatus(id, 'idle')
}

const stopAgent = (id: string) => {
  agentStore.updateAgentStatus(id, 'inactive')
}

onMounted(() => {
  refreshData()
})
</script>

<style lang="less" scoped>
.dashboard {
  padding: @spacing-lg;
  
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: @spacing-xl;
    
    h1 {
      font-size: @macos-font-size-3xl;
      font-weight: 600;
      color: #1d1d1f;
    }
  }
  
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: @spacing-lg;
    margin-bottom: @spacing-2xl;
    
    .metric-card {
      text-align: center;
      
      .metric-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: @spacing-md;
        
        h3 {
          font-size: @macos-font-size-md;
          font-weight: 500;
          color: @macos-gray;
        }
      }
      
      .metric-value {
        font-size: @macos-font-size-3xl;
        font-weight: 600;
        color: #1d1d1f;
        margin-bottom: @spacing-sm;
      }
      
      .metric-label {
        font-size: @macos-font-size-sm;
        color: @macos-gray;
      }
    }
  }
  
  .dashboard-content {
    .agents-section {
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: @spacing-lg;
        
        h2 {
          font-size: @macos-font-size-2xl;
          font-weight: 600;
          color: #1d1d1f;
        }
      }
      
      .agents-list {
        display: grid;
        gap: @spacing-md;
        
        .agent-card {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          
          .agent-info {
            flex: 1;
            
            .agent-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: @spacing-md;
              
              h3 {
                font-size: @macos-font-size-lg;
                font-weight: 600;
                color: #1d1d1f;
              }
            }
            
            .agent-details {
              p {
                margin-bottom: @spacing-xs;
                font-size: @macos-font-size-sm;
                color: @macos-gray;
                
                strong {
                  color: #1d1d1f;
                }
              }
            }
          }
          
          .agent-actions {
            display: flex;
            gap: @spacing-sm;
          }
        }
      }
    }
  }
}
</style>
