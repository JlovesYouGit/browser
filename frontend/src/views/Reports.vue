<template>
  <div class="reports">
    <div class="reports-header">
      <h1>Reports</h1>
      <div class="header-actions">
        <button class="btn btn-primary" @click="generateReport">
          Generate Report
        </button>
      </div>
    </div>
    
    <div class="reports-content">
      <div class="reports-filters">
        <div class="filter-group">
          <label>Date Range</label>
          <select v-model="dateRange" class="form-input">
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Report Type</label>
          <select v-model="reportType" class="form-input">
            <option value="all">All Reports</option>
            <option value="performance">Performance</option>
            <option value="errors">Error Reports</option>
            <option value="activity">Activity Logs</option>
          </select>
        </div>
      </div>
      
      <div class="reports-grid">
        <div class="card report-card">
          <div class="report-header">
            <h3>Performance Summary</h3>
            <div class="status-indicator status-active"></div>
          </div>
          <div class="report-content">
            <div class="chart-placeholder">
              <p>Performance chart will be displayed here</p>
            </div>
          </div>
        </div>
        
        <div class="card report-card">
          <div class="report-header">
            <h3>Agent Activity</h3>
            <div class="status-indicator status-active"></div>
          </div>
          <div class="report-content">
            <div class="activity-stats">
              <div class="stat">
                <span class="stat-label">Total Sessions</span>
                <span class="stat-value">156</span>
              </div>
              <div class="stat">
                <span class="stat-label">Avg Duration</span>
                <span class="stat-value">23m</span>
              </div>
              <div class="stat">
                <span class="stat-label">Success Rate</span>
                <span class="stat-value">94.2%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="card report-card">
          <div class="report-header">
            <h3>Recent Errors</h3>
            <div class="status-indicator status-error"></div>
          </div>
          <div class="report-content">
            <div class="error-list">
              <div class="error-item">
                <div class="error-time">2 hours ago</div>
                <div class="error-message">Connection timeout to example.com</div>
              </div>
              <div class="error-item">
                <div class="error-time">5 hours ago</div>
                <div class="error-message">Memory limit exceeded</div>
              </div>
              <div class="error-item">
                <div class="error-time">1 day ago</div>
                <div class="error-message">Rate limit reached</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="reports-table">
        <div class="card">
          <div class="table-header">
            <h3>Recent Reports</h3>
            <button class="btn btn-secondary" @click="exportReports">
              Export
            </button>
          </div>
          
          <div class="table-container">
            <table class="reports-table-data">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Agent</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="report in recentReports" :key="report.id">
                  <td>{{ formatDate(report.date) }}</td>
                  <td>{{ report.type }}</td>
                  <td>{{ report.agent }}</td>
                  <td>
                    <div class="status-indicator" :class="`status-${report.status}`"></div>
                  </td>
                  <td>
                    <button class="btn btn-secondary" @click="viewReport(report.id)">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const dateRange = ref('week')
const reportType = ref('all')

const recentReports = ref([
  {
    id: '1',
    date: '2024-01-01T10:00:00Z',
    type: 'Performance',
    agent: 'Discovery Agent',
    status: 'completed'
  },
  {
    id: '2',
    date: '2024-01-01T09:30:00Z',
    type: 'Activity',
    agent: 'Enrichment Agent',
    status: 'completed'
  },
  {
    id: '3',
    date: '2024-01-01T09:00:00Z',
    type: 'Error',
    agent: 'Discovery Agent',
    status: 'failed'
  }
])

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

const generateReport = () => {
  console.log('Generating report...')
}

const exportReports = () => {
  console.log('Exporting reports...')
}

const viewReport = (id: string) => {
  console.log('Viewing report:', id)
}

onMounted(() => {
  console.log('Reports component mounted')
})
</script>

<style lang="less" scoped>
.reports {
  padding: @spacing-lg;
  
  .reports-header {
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
  
  .reports-content {
    .reports-filters {
      display: flex;
      gap: @spacing-lg;
      margin-bottom: @spacing-xl;
      
      .filter-group {
        display: flex;
        flex-direction: column;
        
        label {
          margin-bottom: @spacing-xs;
          font-size: @macos-font-size-sm;
          font-weight: 500;
          color: #1d1d1f;
        }
      }
    }
    
    .reports-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: @spacing-lg;
      margin-bottom: @spacing-2xl;
      
      .report-card {
        .report-header {
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
        
        .report-content {
          .chart-placeholder {
            height: 200px;
            background: @macos-sidebar-bg;
            border-radius: @macos-border-radius;
            display: flex;
            align-items: center;
            justify-content: center;
            color: @macos-gray;
          }
          
          .activity-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: @spacing-md;
            
            .stat {
              text-align: center;
              
              .stat-label {
                display: block;
                font-size: @macos-font-size-xs;
                color: @macos-gray;
                margin-bottom: @spacing-xs;
              }
              
              .stat-value {
                display: block;
                font-size: @macos-font-size-xl;
                font-weight: 600;
                color: #1d1d1f;
              }
            }
          }
          
          .error-list {
            .error-item {
              display: flex;
              justify-content: space-between;
              padding: @spacing-sm 0;
              border-bottom: 1px solid @macos-border-color;
              
              &:last-child {
                border-bottom: none;
              }
              
              .error-time {
                font-size: @macos-font-size-xs;
                color: @macos-gray;
              }
              
              .error-message {
                font-size: @macos-font-size-sm;
                color: @macos-red;
              }
            }
          }
        }
      }
    }
    
    .reports-table {
      .table-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: @spacing-lg;
        
        h3 {
          font-size: @macos-font-size-xl;
          font-weight: 600;
          color: #1d1d1f;
        }
      }
      
      .table-container {
        overflow-x: auto;
        
        .reports-table-data {
          width: 100%;
          border-collapse: collapse;
          
          th, td {
            padding: @spacing-md;
            text-align: left;
            border-bottom: 1px solid @macos-border-color;
          }
          
          th {
            font-size: @macos-font-size-sm;
            font-weight: 600;
            color: @macos-gray;
            background: @macos-sidebar-bg;
          }
          
          td {
            font-size: @macos-font-size-sm;
            color: #1d1d1f;
          }
          
          tr:hover {
            background: @macos-sidebar-bg;
          }
        }
      }
    }
  }
}
</style>
