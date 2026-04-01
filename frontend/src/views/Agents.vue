<template>
  <div class="agents">
    <div class="agents-header">
      <h1>Agents</h1>
      <button class="btn btn-primary" @click="showAddAgentModal = true">
        Add Agent
      </button>
    </div>
    
    <div class="agents-grid">
      <div v-for="agent in agents" :key="agent.id" class="card agent-card">
        <div class="agent-header">
          <h3>{{ agent.name }}</h3>
          <div class="status-indicator" :class="`status-${agent.status}`"></div>
        </div>
        
        <div class="agent-metrics">
          <div class="metric">
            <span class="metric-label">Status</span>
            <span class="metric-value">{{ agent.status }}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Pages</span>
            <span class="metric-value">{{ agent.pagesProcessed }}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Memory</span>
            <span class="metric-value">{{ agent.memoryUsage }}MB</span>
          </div>
          <div class="metric">
            <span class="metric-label">CPU</span>
            <span class="metric-value">{{ agent.cpuUsage }}%</span>
          </div>
        </div>
        
        <div class="agent-info">
          <p v-if="agent.currentUrl"><strong>Current URL:</strong> {{ agent.currentUrl }}</p>
          <p><strong>Last Activity:</strong> {{ formatDate(agent.lastActivity) }}</p>
          <p><strong>Errors:</strong> {{ agent.errors }}</p>
        </div>
        
        <div class="agent-actions">
          <button 
            class="btn btn-secondary" 
            @click="startAgent(agent.id)"
            :disabled="agent.status === 'active'"
          >
            Start
          </button>
          <button 
            class="btn btn-secondary" 
            @click="pauseAgent(agent.id)"
            :disabled="agent.status !== 'active'"
          >
            Pause
          </button>
          <button 
            class="btn btn-danger" 
            @click="stopAgent(agent.id)"
            :disabled="agent.status === 'inactive'"
          >
            Stop
          </button>
        </div>
      </div>
    </div>
    
    <!-- Add Agent Modal -->
    <div v-if="showAddAgentModal" class="modal-overlay" @click="showAddAgentModal = false">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h2>Add New Agent</h2>
          <button class="btn btn-secondary" @click="showAddAgentModal = false">
            ×
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Agent Name</label>
            <input 
              v-model="newAgent.name" 
              type="text" 
              class="form-input"
              placeholder="Enter agent name"
            />
          </div>
          <div class="form-group">
            <label>Agent Type</label>
            <select v-model="newAgent.type" class="form-input">
              <option value="discovery">Discovery Agent</option>
              <option value="enrichment">Enrichment Agent</option>
              <option value="decision">Decision Agent</option>
              <option value="action">Action Agent</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="showAddAgentModal = false">
            Cancel
          </button>
          <button class="btn btn-primary" @click="addAgent">
            Add Agent
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAgentStore } from '@/stores/agents'

const agentStore = useAgentStore()

const agents = computed(() => agentStore.agents)
const showAddAgentModal = ref(false)

const newAgent = ref({
  name: '',
  type: 'discovery',
  status: 'idle' as const,
  memoryUsage: 0,
  cpuUsage: 0
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

const startAgent = (id: string) => {
  agentStore.updateAgentStatus(id, 'active')
}

const pauseAgent = (id: string) => {
  agentStore.updateAgentStatus(id, 'idle')
}

const stopAgent = (id: string) => {
  agentStore.updateAgentStatus(id, 'inactive')
}

const addAgent = () => {
  if (newAgent.value.name.trim()) {
    agentStore.addAgent({
      name: newAgent.value.name,
      status: 'idle',
      memoryUsage: 0,
      cpuUsage: 0
    })
    
    newAgent.value.name = ''
    newAgent.value.type = 'discovery'
    showAddAgentModal.value = false
  }
}

onMounted(() => {
  agentStore.fetchAgents()
})
</script>

<style lang="less" scoped>
.agents {
  padding: @spacing-lg;
  
  .agents-header {
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
  
  .agents-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: @spacing-lg;
    
    .agent-card {
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
      
      .agent-metrics {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: @spacing-md;
        margin-bottom: @spacing-md;
        
        .metric {
          text-align: center;
          
          .metric-label {
            display: block;
            font-size: @macos-font-size-xs;
            color: @macos-gray;
            margin-bottom: @spacing-xs;
          }
          
          .metric-value {
            display: block;
            font-size: @macos-font-size-md;
            font-weight: 600;
            color: #1d1d1f;
          }
        }
      }
      
      .agent-info {
        margin-bottom: @spacing-md;
        
        p {
          margin-bottom: @spacing-xs;
          font-size: @macos-font-size-sm;
          color: @macos-gray;
          
          strong {
            color: #1d1d1f;
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: @z-modal;
  
  .modal {
    background: @macos-card-bg;
    border-radius: @macos-border-radius-xl;
    box-shadow: @macos-shadow-modal;
    width: 90%;
    max-width: 500px;
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: @spacing-lg;
      border-bottom: 1px solid @macos-border-color;
      
      h2 {
        font-size: @macos-font-size-xl;
        font-weight: 600;
        color: #1d1d1f;
      }
    }
    
    .modal-body {
      padding: @spacing-lg;
      
      .form-group {
        margin-bottom: @spacing-md;
        
        label {
          display: block;
          margin-bottom: @spacing-xs;
          font-size: @macos-font-size-sm;
          font-weight: 500;
          color: #1d1d1f;
        }
      }
    }
    
    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: @spacing-sm;
      padding: @spacing-lg;
      border-top: 1px solid @macos-border-color;
    }
  }
}
</style>
