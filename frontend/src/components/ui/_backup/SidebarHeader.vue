<template>
  <div
    data-slot="sidebar-header"
    data-sidebar="header"
    :class="headerClasses"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface SidebarHeaderProps {
  class?: string
}

const props = defineProps<SidebarHeaderProps>()

const headerClasses = computed(() =>
  cn(
    "flex flex-col gap-2 p-2",
    props.class
  )
)
</script>

<style lang="less" scoped>
.sidebar-header {
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
