<template>
  <Separator
    data-slot="sidebar-separator"
    data-sidebar="separator"
    :class="separatorClasses"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'
import Separator from './Separator.vue'

interface SidebarSeparatorProps {
  class?: string
}

const props = defineProps<SidebarSeparatorProps>()

const separatorClasses = computed(() =>
  cn(
    "bg-sidebar-border mx-2 w-auto",
    props.class
  )
)
</script>

<style lang="less" scoped>
.sidebar-separator {
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
