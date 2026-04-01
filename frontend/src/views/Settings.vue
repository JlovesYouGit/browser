<template>
  <div class="settings">
    <div class="settings-header">
      <h1>Settings</h1>
    </div>
    
    <div class="settings-content">
      <div class="settings-sections">
        <!-- General Settings -->
        <div class="card settings-section">
          <div class="section-header">
            <h2>General</h2>
          </div>
          <div class="section-content">
            <div class="form-group">
              <label>Application Theme</label>
              <select v-model="settings.theme" class="form-input">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Language</label>
              <select v-model="settings.language" class="form-input">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>
                <input 
                  v-model="settings.notifications" 
                  type="checkbox"
                />
                Enable Desktop Notifications
              </label>
            </div>
          </div>
        </div>
        
        <!-- Browser Settings -->
        <div class="card settings-section">
          <div class="section-header">
            <h2>Browser Configuration</h2>
          </div>
          <div class="section-content">
            <div class="form-group">
              <label>Default Browser</label>
              <select v-model="settings.defaultBrowser" class="form-input">
                <option value="chromium">Chromium</option>
                <option value="firefox">Firefox</option>
                <option value="webkit">WebKit</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Headless Mode</label>
              <label class="switch">
                <input 
                  v-model="settings.headless" 
                  type="checkbox"
                />
                <span class="slider"></span>
              </label>
            </div>
            
            <div class="form-group">
              <label>Request Delay (seconds)</label>
              <input 
                v-model.number="settings.requestDelay" 
                type="number" 
                class="form-input"
                min="0"
                max="60"
              />
            </div>
            
            <div class="form-group">
              <label>Max Concurrent Sessions</label>
              <input 
                v-model.number="settings.maxConcurrent" 
                type="number" 
                class="form-input"
                min="1"
                max="10"
              />
            </div>
          </div>
        </div>
        
        <!-- Security Settings -->
        <div class="card settings-section">
          <div class="section-header">
            <h2>Security</h2>
          </div>
          <div class="section-content">
            <div class="form-group">
              <label>
                <input 
                  v-model="settings.respectRobots" 
                  type="checkbox"
                />
                Respect robots.txt
              </label>
            </div>
            
            <div class="form-group">
              <label>
                <input 
                  v-model="settings.verifySSL" 
                  type="checkbox"
                />
                Verify SSL certificates
              </label>
            </div>
            
            <div class="form-group">
              <label>User Agent Rotation</label>
              <label class="switch">
                <input 
                  v-model="settings.rotateUserAgent" 
                  type="checkbox"
                />
                <span class="slider"></span>
              </label>
            </div>
            
            <div class="form-group">
              <label>Blocked Domains</label>
              <textarea 
                v-model="settings.blockedDomains" 
                class="form-input"
                rows="4"
                placeholder="Enter domains to block, one per line"
              ></textarea>
            </div>
          </div>
        </div>
        
        <!-- API Settings -->
        <div class="card settings-section">
          <div class="section-header">
            <h2>API Configuration</h2>
          </div>
          <div class="section-content">
            <div class="form-group">
              <label>Backend URL</label>
              <input 
                v-model="settings.backendUrl" 
                type="url" 
                class="form-input"
                placeholder="http://localhost:8000"
              />
            </div>
            
            <div class="form-group">
              <label>API Key</label>
              <input 
                v-model="settings.apiKey" 
                type="password" 
                class="form-input"
                placeholder="Enter API key"
              />
            </div>
            
            <div class="form-group">
              <label>Request Timeout (seconds)</label>
              <input 
                v-model.number="settings.requestTimeout" 
                type="number" 
                class="form-input"
                min="5"
                max="300"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div class="settings-actions">
        <button class="btn btn-secondary" @click="resetSettings">
          Reset to Defaults
        </button>
        <button class="btn btn-primary" @click="saveSettings">
          Save Settings
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const settings = ref({
  theme: 'light',
  language: 'en',
  notifications: true,
  defaultBrowser: 'chromium',
  headless: true,
  requestDelay: 2,
  maxConcurrent: 3,
  respectRobots: true,
  verifySSL: true,
  rotateUserAgent: false,
  blockedDomains: '',
  backendUrl: 'http://localhost:8000',
  apiKey: '',
  requestTimeout: 30
})

const defaultSettings = { ...settings.value }

const resetSettings = () => {
  settings.value = { ...defaultSettings }
}

const saveSettings = () => {
  console.log('Saving settings:', settings.value)
  // In a real app, this would save to localStorage or API
  localStorage.setItem('agentic-browser-settings', JSON.stringify(settings.value))
}

onMounted(() => {
  // Load settings from localStorage
  const savedSettings = localStorage.getItem('agentic-browser-settings')
  if (savedSettings) {
    settings.value = { ...settings.value, ...JSON.parse(savedSettings) }
  }
})
</script>

<style lang="less" scoped>
.settings {
  padding: @spacing-lg;
  
  .settings-header {
    margin-bottom: @spacing-xl;
    
    h1 {
      font-size: @macos-font-size-3xl;
      font-weight: 600;
      color: #1d1d1f;
    }
  }
  
  .settings-content {
    .settings-sections {
      display: grid;
      gap: @spacing-lg;
      margin-bottom: @spacing-2xl;
      
      .settings-section {
        .section-header {
          margin-bottom: @spacing-lg;
          
          h2 {
            font-size: @macos-font-size-xl;
            font-weight: 600;
            color: #1d1d1f;
          }
        }
        
        .section-content {
          .form-group {
            margin-bottom: @spacing-md;
            
            label {
              display: block;
              margin-bottom: @spacing-xs;
              font-size: @macos-font-size-sm;
              font-weight: 500;
              color: #1d1d1f;
              
              input[type="checkbox"] {
                margin-right: @spacing-xs;
              }
            }
            
            .form-input {
              width: 100%;
              padding: @spacing-sm @spacing-md;
              border: 1px solid @macos-border-color;
              border-radius: @macos-border-radius;
              font-family: @macos-font-family;
              font-size: @macos-font-size-base;
              
              &:focus {
                outline: none;
                border-color: @macos-blue;
                box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
              }
            }
            
            // Toggle switch styling
            .switch {
              position: relative;
              display: inline-block;
              width: 50px;
              height: 24px;
              margin-left: @spacing-sm;
              
              input {
                opacity: 0;
                width: 0;
                height: 0;
                
                &:checked + .slider {
                  background-color: @macos-blue;
                }
                
                &:checked + .slider:before {
                  transform: translateX(26px);
                }
              }
              
              .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: @macos-gray-light;
                transition: @macos-transition;
                border-radius: 24px;
                
                &:before {
                  position: absolute;
                  content: "";
                  height: 18px;
                  width: 18px;
                  left: 3px;
                  bottom: 3px;
                  background-color: white;
                  transition: @macos-transition;
                  border-radius: 50%;
                }
              }
            }
          }
        }
      }
    }
    
    .settings-actions {
      display: flex;
      justify-content: flex-end;
      gap: @spacing-sm;
    }
  }
}
</style>
