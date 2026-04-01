<template>
  <div class="app-container">
    <!-- Animated star background (only on landing) -->
    <StarBackground v-if="!showBrowser" />
    
    <!-- Glittering foreground effect (only on landing) -->
    <GlitterEffect v-if="!showBrowser" />

    <!-- Landing page sequence -->
    <div v-if="!showBrowser" class="resize-container" :class="{ 'scale-normal': mounted }">
      <!-- Browser info popup sequence -->
      <Transition name="fade-scale">
        <BrowserInfoPopup
          v-if="showBrowserInfo"
          @complete="handleBrowserInfoComplete"
        />
      </Transition>

      <!-- Login screen appears after browser info vanishes -->
      <Transition name="fade-scale">
        <LoginScreen 
          v-if="showLogin" 
          @authenticated="handleAuthenticated"
        />
      </Transition>
    </div>

    <!-- Main browser interface (appears after login) -->
    <Transition name="fade">
      <BrowserChrome 
        v-if="showBrowser" 
        :initial-url="defaultUrl"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StarBackground from './components/effects/StarBackground.vue'
import GlitterEffect from './components/effects/GlitterEffect.vue'
import BrowserInfoPopup from './components/ui/BrowserInfoPopup.vue'
import LoginScreen from './components/auth/LoginScreen.vue'
import BrowserChrome from './components/browser/BrowserChrome.vue'

const showBrowserInfo = ref(false)
const showLogin = ref(false)
const showBrowser = ref(false)
const mounted = ref(false)
const defaultUrl = ref('https://www.google.com')

onMounted(() => {
  mounted.value = true
  
  // Start sequence: Show browser info after 2 seconds
  setTimeout(() => {
    showBrowserInfo.value = true
  }, 2000)
})

const handleBrowserInfoComplete = () => {
  showBrowserInfo.value = false
  // Show login screen after browser info vanishes
  setTimeout(() => {
    showLogin.value = true
  }, 500)
}

const handleAuthenticated = () => {
  showLogin.value = false
  // Show browser interface after successful login
  setTimeout(() => {
    showBrowser.value = true
  }, 500)
}
</script>

<style lang="less" scoped>
.app-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.resize-container {
  position: fixed;
  inset: 0;
  transform: scale(1.2);
  transition: transform 2s ease-out;
  
  &.scale-normal {
    transform: scale(1);
  }
}

// Fade and scale transition
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.5s ease;
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.fade-scale-enter-to {
  opacity: 1;
  transform: scale(1);
}

.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

// High DPI display optimization
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .app-container {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Simple fade transition for browser
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
