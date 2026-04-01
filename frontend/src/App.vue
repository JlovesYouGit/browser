<template>
  <div class="size-full flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden h-screen w-screen">
    <!-- Subtle radial vignette -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,30,30,0.4)_0%,rgba(10,10,10,1)_100%)] pointer-events-none" />
    
    <!-- Browser Window (Main UI) -->
    <div v-if="isAuthenticated" class="relative z-10 w-full h-full flex items-center justify-center transition-opacity duration-1000">
      <BrowserChrome :url="browserUrl" />
    </div>

    <!-- Login Screen (Overlay) -->
    <LoginScreen v-else @authenticated="handleAuthenticated" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import BrowserChrome from './components/browser/BrowserChrome.vue'
import LoginScreen from './components/auth/LoginScreen.vue'

const isAuthenticated = ref(false)
const browserUrl = ref('https://accounts.google.com/signin')

const handleAuthenticated = () => {
  isAuthenticated.value = true
}

onMounted(async () => {
  await nextTick()
  // Ensure a small delay for smoothness as per LANDING_PAGE_SPEC
  setTimeout(() => {
    window.dispatchEvent(new CustomEvent('vue-ready'))
  }, 500)
})
</script>

<style>
.size-full {
  width: 100%;
  height: 100%;
}

html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: #000;
  overflow: hidden;
}
</style>
