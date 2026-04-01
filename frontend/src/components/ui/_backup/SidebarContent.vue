<template>
  <div
    data-slot="sidebar-content"
    data-sidebar="content"
    :class="contentClasses"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface SidebarContentProps {
  class?: string
}

const props = defineProps<SidebarContentProps>()

const contentClasses = computed(() =>
  cn(
    "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
    props.class
  )
)
</script>

<style lang="less" scoped>
.sidebar-content {
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
