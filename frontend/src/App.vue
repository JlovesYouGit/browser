<template>
  <div class="size-full flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden h-screen w-screen">
    <!-- Subtle radial vignette -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,30,30,0.4)_0%,rgba(10,10,10,1)_100%)] pointer-events-none" />
    
    <!-- Browser Window -->
    <div class="relative z-10 w-full h-full flex items-center justify-center">
      <BrowserChrome />
    </div>
  </div>
</template>

<script setup lang="ts">
import BrowserChrome from './components/browser/BrowserChrome.vue'
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
