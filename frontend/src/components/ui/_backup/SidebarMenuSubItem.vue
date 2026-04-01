<template>
  <li
    data-slot="sidebar-menu-sub-item"
    data-sidebar="menu-sub-item"
    :class="subItemClasses"
    v-bind="$attrs"
  >
    <slot />
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface SidebarMenuSubItemProps {
  class?: string
}

const props = defineProps<SidebarMenuSubItemProps>()

const subItemClasses = computed(() =>
  cn(
    "group/menu-sub-item relative",
    props.class
  )
)
</script>

<style lang="less" scoped>
.sidebar-menu-sub-item {
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
