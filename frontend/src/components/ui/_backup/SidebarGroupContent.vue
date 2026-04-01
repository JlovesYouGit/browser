<template>
  <div
    data-slot="sidebar-group-content"
    data-sidebar="group-content"
    :class="contentClasses"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface SidebarGroupContentProps {
  class?: string
}

const props = defineProps<SidebarGroupContentProps>()

const contentClasses = computed(() =>
  cn(
    "w-full text-sm",
    props.class
  )
)
</script>

<style lang="less" scoped>
.sidebar-group-content {
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
