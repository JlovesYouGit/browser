<template>
  <li
    data-slot="sidebar-menu-item"
    data-sidebar="menu-item"
    :class="itemClasses"
    v-bind="$attrs"
  >
    <slot />
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface SidebarMenuItemProps {
  class?: string
}

const props = defineProps<SidebarMenuItemProps>()

const itemClasses = computed(() =>
  cn(
    "group/menu-item relative",
    props.class
  )
)
</script>

<style lang="less" scoped>
.sidebar-menu-item {
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
