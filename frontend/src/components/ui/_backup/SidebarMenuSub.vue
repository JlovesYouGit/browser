<template>
  <ul
    data-slot="sidebar-menu-sub"
    data-sidebar="menu-sub"
    :class="subClasses"
    v-bind="$attrs"
  >
    <slot />
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface SidebarMenuSubProps {
  class?: string
}

const props = defineProps<SidebarMenuSubProps>()

const subClasses = computed(() =>
  cn(
    "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
    "group-data-[collapsible=icon]:hidden",
    props.class
  )
)
</script>

<style lang="less" scoped>
.sidebar-menu-sub {
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
