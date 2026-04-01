<template>
  <div class="api-key-settings">
    <div class="settings-card">
      <div class="header">
        <Sparkles class="w-6 h-6 text-purple-400" />
        <h2 class="title">AI Configuration</h2>
      </div>
      
      <p class="description">
        Enter your Google Gemini API key to enable AI-powered browsing features.
        <a href="https://ai.google.dev" target="_blank" class="link">Get your API key →</a>
      </p>
      
      <div class="input-group">
        <label class="label">Gemini API Key</label>
        <div class="input-wrapper">
          <input
            v-model="apiKey"
            :type="showKey ? 'text' : 'password'"
            placeholder="AI..."
            class="api-input"
            :disabled="isLoading"
          />
          <button 
            type="button"
            class="toggle-btn"
            @click="showKey = !showKey"
          >
            <Eye v-if="!showKey" class="w-4 h-4" />
            <EyeOff v-else class="w-4 h-4" />
          </button>
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">{{ success }}</p>
      </div>
      
      <div class="actions">
        <button
          class="save-btn"
          :disabled="!apiKey.trim() || isLoading"
          @click="handleSave"
        >
          <Loader2 v-if="isLoading" class="w-4 h-4 animate-spin" />
          <Check v-else class="w-4 h-4" />
          {{ isLoading ? 'Saving...' : 'Save API Key' }}
        </button>
        
        <button
          v-if="hasKey"
          class="delete-btn"
          :disabled="isLoading"
          @click="handleDelete"
        >
          <Trash2 class="w-4 h-4" />
          Remove Key
        </button>
      </div>
      
      <div v-if="hasKey" class="status">
        <CheckCircle class="w-4 h-4 text-green-400" />
        <span>API key configured</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Sparkles, Eye, EyeOff, Check, Trash2, Loader2, CheckCircle } from 'lucide-vue-next'
import { saveApiKey, deleteApiKey, hasApiKey, initializeGemini } from '@/utils/tauri'

const apiKey = ref('')
const showKey = ref(false)
const isLoading = ref(false)
const hasKey = ref(false)
const error = ref('')
const success = ref('')

const emit = defineEmits<{
  saved: []
  removed: []
}>()

onMounted(async () => {
  try {
    hasKey.value = await hasApiKey()
  } catch (e) {
    console.error('Failed to check API key status:', e)
  }
})

const handleSave = async () => {
  error.value = ''
  success.value = ''
  isLoading.value = true
  
  try {
    await saveApiKey(apiKey.value.trim())
    await initializeGemini()
    hasKey.value = true
    success.value = 'API key saved successfully!'
    apiKey.value = ''
    emit('saved')
    
    setTimeout(() => {
      success.value = ''
    }, 3000)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to save API key'
  } finally {
    isLoading.value = false
  }
}

const handleDelete = async () => {
  error.value = ''
  success.value = ''
  isLoading.value = true
  
  try {
    await deleteApiKey()
    hasKey.value = false
    success.value = 'API key removed'
    emit('removed')
    
    setTimeout(() => {
      success.value = ''
    }, 3000)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to remove API key'
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="less" scoped>
.api-key-settings {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.settings-card {
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
}

.header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.25rem;
  font-weight: 500;
  color: white;
}

.description {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.link {
  color: #a78bfa;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
}

.input-group {
  margin-bottom: 1.5rem;
}

.label {
  display: block;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  padding: 0 0.75rem;
  
  &:focus-within {
    border-color: rgba(255, 255, 255, 0.2);
  }
}

.api-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: white;
  padding: 0.75rem 0;
  font-size: 0.875rem;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
}

.toggle-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 0.25rem;
  
  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
}

.error {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.5rem;
}

.success {
  color: #22c55e;
  font-size: 0.75rem;
  margin-top: 0.5rem;
}

.actions {
  display: flex;
  gap: 0.75rem;
}

.save-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.8), rgba(59, 130, 246, 0.8));
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(147, 51, 234, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.delete-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: rgba(239, 68, 68, 0.2);
    border-color: rgba(239, 68, 68, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 0.5rem;
  color: #22c55e;
  font-size: 0.875rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
