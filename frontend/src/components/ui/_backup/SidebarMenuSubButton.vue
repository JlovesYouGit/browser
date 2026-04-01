<template>
  <component
    :is="asChild ? 'a' : 'a'"
    data-slot="sidebar-menu-sub-button"
    data-sidebar="menu-sub-button"
    :data-size="size"
    :data-active="isActive"
    :class="buttonClasses"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface SidebarMenuSubButtonProps {
  class?: string
  asChild?: boolean
  size?: 'sm' | 'md'
  isActive?: boolean
}

const props = withDefaults(defineProps<SidebarMenuSubButtonProps>(), {
  asChild: false,
  size: 'md',
  isActive: false
})

const buttonClasses = computed(() =>
  cn(
    "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
    "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
    props.size === 'sm' && "text-xs",
    props.size === 'md' && "text-sm",
    "group-data-[collapsible=icon]:hidden",
    props.class
  )
)
</script>

<style lang="less" scoped>
.sidebar-menu-sub-button {
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
