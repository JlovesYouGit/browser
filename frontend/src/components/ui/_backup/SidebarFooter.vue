<template>
  <div
    data-slot="sidebar-footer"
    data-sidebar="footer"
    :class="footerClasses"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface SidebarFooterProps {
  class?: string
}

const props = defineProps<SidebarFooterProps>()

const footerClasses = computed(() =>
  cn(
    "flex flex-col gap-2 p-2",
    props.class
  )
)
</script>

<style lang="less" scoped>
.sidebar-footer {
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
