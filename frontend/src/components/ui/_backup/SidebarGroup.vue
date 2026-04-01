<template>
  <div
    data-slot="sidebar-group"
    data-sidebar="group"
    :class="groupClasses"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface SidebarGroupProps {
  class?: string
}

const props = defineProps<SidebarGroupProps>()

const groupClasses = computed(() =>
  cn(
    "relative flex w-full min-w-0 flex-col p-2",
    props.class
  )
)
</script>

<style lang="less" scoped>
.sidebar-group {
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
