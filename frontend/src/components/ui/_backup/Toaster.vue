<template>
  <Sonner
    :theme="currentTheme"
    class="toaster group"
    :style="toasterStyle"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { Toaster as Sonner } from 'vue-sonner'

interface ToasterProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'
  expand?: boolean
  richColors?: boolean
  closeButton?: boolean
}

const props = defineProps<ToasterProps>()

const theme = ref('system')

onMounted(() => {
  // Detect theme from document class or localStorage
  const detectTheme = () => {
    const html = document.documentElement
    if (html.classList.contains('dark')) {
      return 'dark'
    } else if (html.classList.contains('light')) {
      return 'light'
    }
    return 'system'
  }
  
  theme.value = detectTheme()
  
  // Watch for theme changes
  const observer = new MutationObserver(() => {
    theme.value = detectTheme()
  })
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})

const currentTheme = computed(() => theme.value as 'light' | 'dark' | 'system')

const toasterStyle = computed(() => ({
  '--normal-bg': 'var(--popover)',
  '--normal-text': 'var(--popover-foreground)',
  '--normal-border': 'var(--border)'
}))
</script>

<style lang="less" scoped>
.toaster {
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Performance optimizations
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: auto;
  contain: layout style paint;
}
</style>
