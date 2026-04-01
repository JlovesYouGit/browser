<template>
  <div class="browser-chrome">
    <!-- Browser Frame with macOS-style traffic light buttons -->
    <div class="browser-frame">
      <!-- Title bar with traffic lights -->
      <div class="title-bar">
        <!-- Address Bar -->
        <div class="address-bar">
          <div class="address-input-wrapper">
            <input
              v-model="urlInput"
              type="text"
              class="address-input"
              placeholder="Search or enter address"
              @keydown.enter="navigateToUrl"
            />
            <button class="navigate-btn" @click="navigateToUrl">
              <ArrowRight class="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <!-- Navigation Controls -->
        <div class="nav-controls">
          <button class="nav-btn" :disabled="!canGoBack" @click="goBack">
            <ChevronLeft class="w-4 h-4" />
          </button>
          <button class="nav-btn" :disabled="!canGoForward" @click="goForward">
            <ChevronRight class="w-4 h-4" />
          </button>
          <button class="nav-btn" @click="refresh">
            <RotateCw class="w-4 h-4" />
          </button>
          <!-- AI Chat Toggle -->
          <button 
            class="nav-btn ai-btn" 
            :class="{ active: showChatPanel }"
            @click="toggleChatPanel"
          >
            <Sparkles class="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <!-- Main Content Area -->
      <div class="content-area">
        <!-- WebView Container -->
        <div class="webview-container" :class="{ 'chat-open': showChatPanel }">
          <div ref="webviewRef" class="webview" />
          
          <!-- Loading Indicator -->
          <div v-if="isLoading" class="loading-bar">
            <div class="loading-progress" />
          </div>
        </div>
        
        <!-- AI Chat Panel -->
        <Transition name="slide">
          <div v-if="showChatPanel" class="chat-panel">
            <div class="chat-header">
              <div class="chat-title">
                <Sparkles class="w-4 h-4" />
                <span>AI Assistant</span>
              </div>
              <button class="close-chat" @click="toggleChatPanel">
                <X class="w-4 h-4" />
              </button>
            </div>
            
            <!-- API Key Warning -->
            <div v-if="!hasApiKey" class="api-warning">
              <p>Configure your Gemini API key to use AI features</p>
              <button class="setup-btn" @click="showApiSettings = true">Setup</button>
            </div>
            
            <!-- Chat Messages -->
            <div v-else class="chat-messages" ref="messagesRef">
              <div 
                v-for="(msg, idx) in chatMessages" 
                :key="idx"
                class="message"
                :class="msg.role"
              >
                <div class="message-content">{{ msg.content }}</div>
                <div v-if="msg.actions?.length" class="message-actions">
                  <span v-for="action in msg.actions" :key="action" class="action-tag">
                    {{ action }}
                  </span>
                </div>
              </div>
              <div v-if="isAiThinking" class="message model thinking">
                <div class="thinking-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
            
            <!-- Chat Input -->
            <div class="chat-input-container">
              <GlassChatBox 
                ref="chatInputRef"
                placeholder="Ask me to browse, research, or summarize..."
                @submit="handleChatSubmit"
              />
            </div>
          </div>
        </Transition>
      </div>
    </div>
    
    <!-- API Settings Modal -->
    <Transition name="fade">
      <div v-if="showApiSettings" class="modal-overlay" @click="showApiSettings = false">
        <div class="modal-content" @click.stop>
          <ApiKeySettings @saved="onApiKeySaved" @removed="onApiKeyRemoved" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { listen, type Event } from '@tauri-apps/api/event'
import { 
  ArrowRight, ChevronLeft, ChevronRight, RotateCw, 
  Sparkles, X 
} from 'lucide-vue-next'
import GlassChatBox from '@/components/ui/GlassChatBox.vue'
import ApiKeySettings from '@/components/settings/ApiKeySettings.vue'
import { 
  navigate as tauriNavigate, hasApiKey as checkApiKey, initializeGemini, geminiChat,
  type ChatMessage 
} from '@/utils/tauri'

const props = defineProps<{
  initialUrl?: string
}>()

const urlInput = ref(props.initialUrl || 'https://www.google.com')
const currentUrl = ref(props.initialUrl || 'https://www.google.com')
const isLoading = ref(false)
const canGoBack = ref(false)
const canGoForward = ref(false)
const webviewRef = ref<HTMLDivElement>()

// Chat state
const showChatPanel = ref(false)
const hasApiKey = ref(false)
const showApiSettings = ref(false)
const chatMessages = ref<ChatMessage[]>([
  { role: 'model', content: 'Hello! I\'m your AI browsing assistant. I can help you navigate, research, or summarize web pages. What would you like to do?' }
])
const isAiThinking = ref(false)
const messagesRef = ref<HTMLDivElement>()
const chatInputRef = ref<InstanceType<typeof GlassChatBox>>()

// Toggle chat panel
const toggleChatPanel = async () => {
  showChatPanel.value = !showChatPanel.value
  if (showChatPanel.value) {
    // Check API key status
    try {
      hasApiKey.value = await checkApiKey()
      if (hasApiKey.value) {
        await initializeGemini()
      }
    } catch (e) {
      console.error('Failed to check API key:', e)
    }
    
    // Focus chat input
    nextTick(() => {
      chatInputRef.value?.focus()
      scrollToBottom()
    })
  }
}

// Handle chat message submission
const handleChatSubmit = async (message: string) => {
  if (!message.trim() || isAiThinking.value) return
  
  // Add user message
  chatMessages.value.push({ role: 'user', content: message })
  isAiThinking.value = true
  scrollToBottom()
  
  try {
    // Call Gemini API
    const response = await geminiChat(message, chatMessages.value.slice(0, -1))
    
    // Add AI response
    chatMessages.value.push({ 
      role: 'model', 
      content: response.response,
      actions: response.actions 
    })
    
    // Handle agentic actions
    if (response.actions?.includes('navigate') && response.response.includes('http')) {
      const urlMatch = response.response.match(/https?:\/\/[^\s]+/)
      if (urlMatch) {
        urlInput.value = urlMatch[0]
        await navigateToUrl()
      }
    }
  } catch (error) {
    console.error('Chat error:', error)
    chatMessages.value.push({ 
      role: 'model', 
      content: 'Sorry, I encountered an error. Please check your API key and try again.' 
    })
  } finally {
    isAiThinking.value = false
    scrollToBottom()
  }
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
  })
}

const onApiKeySaved = () => {
  hasApiKey.value = true
  showApiSettings.value = false
  initializeGemini()
}

const onApiKeyRemoved = () => {
  hasApiKey.value = false
  showApiSettings.value = false
}

// Navigation functions
const navigateToUrl = async () => {
  if (!urlInput.value) return
  
  let url = urlInput.value
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`
  }
  
  isLoading.value = true
  currentUrl.value = url
  
  try {
    await tauriNavigate(url)
  } catch (error) {
    console.error('Navigation failed:', error)
  } finally {
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }
}

const goBack = async () => {
  console.log('Go back')
}

const goForward = async () => {
  console.log('Go forward')
}

const refresh = async () => {
  await navigateToUrl()
}

// Window controls
const onClose = async () => {
  const window = getCurrentWindow()
  await window.close()
}

const onMinimize = async () => {
  const window = getCurrentWindow()
  await window.minimize()
}

const onMaximize = async () => {
  const window = getCurrentWindow()
  const isMaximized = await window.isMaximized()
  if (isMaximized) {
    await window.unmaximize()
  } else {
    await window.maximize()
  }
}

// Listen for navigate events from Rust
onMounted(() => {
  if (props.initialUrl) {
    navigateToUrl()
  }
  
  listen('navigate', (event: Event<string>) => {
    if (event.payload) {
      urlInput.value = event.payload as string
      currentUrl.value = event.payload as string
    }
  })
  
  listen('screenshot', () => {
    console.log('Screenshot requested')
  })
})

defineExpose({
  navigateToUrl,
  currentUrl
})
</script>

<style lang="less" scoped>
.browser-chrome {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #1c1c1e;
}

.browser-frame {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.title-bar {
  height: 52px;
  display: flex;
  align-items: center;
  padding: 0 16px 0 80px; // Left padding for native traffic lights
  gap: 16px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.address-bar {
  flex: 1;
  display: flex;
  align-items: center;
}

.address-input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0 12px;
  height: 32px;
  transition: all 0.2s ease;
  
  &:focus-within {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.2);
  }
}

.address-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 14px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
}

.navigate-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.15s ease;
  
  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }
}

.nav-controls {
  display: flex;
  gap: 4px;
}

.nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s ease;
  
  &:hover:not(:disabled) {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
}

.webview-container {
  flex: 1;
  background: white;
  position: relative;
}

.webview {
  width: 100%;
  height: 100%;
}

.loading-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(0, 122, 255, 0.2);
  overflow: hidden;
}

.loading-progress {
  width: 30%;
  height: 100%;
  background: #007aff;
  animation: loading 1s ease-in-out infinite;
}

@keyframes loading {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
}

// Content area layout
.content-area {
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
}

// AI Chat button
.ai-btn {
  color: #a78bfa;
  
  &:hover:not(:disabled) {
    color: #c4b5fd;
    background: rgba(167, 139, 250, 0.1);
  }
  
  &.active {
    color: #c4b5fd;
    background: rgba(167, 139, 250, 0.2);
  }
}

// Chat panel
.chat-panel {
  width: 380px;
  background: rgba(28, 28, 30, 0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.chat-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #a78bfa;
  font-size: 14px;
  font-weight: 500;
}

.close-chat {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.15s;
  
  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }
}

// API Warning
.api-warning {
  padding: 16px;
  text-align: center;
  
  p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 13px;
    margin-bottom: 12px;
  }
  
  .setup-btn {
    padding: 8px 16px;
    background: linear-gradient(135deg, rgba(147, 51, 234, 0.8), rgba(59, 130, 246, 0.8));
    border: none;
    border-radius: 6px;
    color: white;
    font-size: 13px;
    cursor: pointer;
    
    &:hover {
      transform: translateY(-1px);
    }
  }
}

// Chat messages
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message {
  max-width: 90%;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 13px;
  line-height: 1.5;
  
  &.user {
    align-self: flex-end;
    background: rgba(147, 51, 234, 0.2);
    border: 1px solid rgba(147, 51, 234, 0.3);
    color: white;
  }
  
  &.model {
    align-self: flex-start;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
  }
  
  &.thinking {
    background: transparent;
    border: none;
  }
}

.message-actions {
  display: flex;
  gap: 4px;
  margin-top: 8px;
}

.action-tag {
  padding: 2px 8px;
  background: rgba(167, 139, 250, 0.2);
  border-radius: 4px;
  font-size: 10px;
  color: #a78bfa;
  text-transform: uppercase;
}

// Thinking animation
.thinking-dots {
  display: flex;
  gap: 4px;
  padding: 8px;
  
  span {
    width: 8px;
    height: 8px;
    background: #a78bfa;
    border-radius: 50%;
    animation: bounce 1.4s ease-in-out infinite both;
    
    &:nth-child(1) {
      animation-delay: -0.32s;
    }
    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

// Chat input
.chat-input-container {
  padding: 12px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

// Slide transition
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

// Fade transition
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// Modal overlay
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-content {
  background: transparent;
}
</style>
