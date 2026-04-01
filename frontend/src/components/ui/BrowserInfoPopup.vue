<template>
  <div class="browser-info-popup">
    <div class="popup-content">
      <h2 class="title">Browser Info</h2>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">User Agent:</span>
          <span class="value">{{ userAgent }}</span>
        </div>
        <div class="info-item">
          <span class="label">Platform:</span>
          <span class="value">{{ platform }}</span>
        </div>
        <div class="info-item">
          <span class="label">Language:</span>
          <span class="value">{{ language }}</span>
        </div>
        <div class="info-item">
          <span class="label">Screen:</span>
          <span class="value">{{ screenSize }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const userAgent = ref('')
const platform = ref('')
const language = ref('')
const screenSize = ref('')

onMounted(() => {
  userAgent.value = navigator.userAgent
  platform.value = navigator.platform
  language.value = navigator.language
  screenSize.value = `${window.screen.width}x${window.screen.height}`
  
  // Auto-complete after 3 seconds
  setTimeout(() => {
    emit('complete')
  }, 3000)
})

const emit = defineEmits<{
  complete: []
}>()
</script>

<style lang="less" scoped>
.browser-info-popup {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 30;
  
  .popup-content {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    padding: 2rem;
    max-width: 400px;
    width: 90%;
  }
  
  .title {
    font-size: 1.5rem;
    font-weight: 500;
    color: white;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .info-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .label {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.875rem;
    }
    
    .value {
      color: white;
      font-size: 0.875rem;
      font-family: monospace;
      max-width: 60%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
