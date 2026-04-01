<template>
  <component
    :is="asChild ? 'div' : 'div'"
    data-slot="sidebar-group-label"
    data-sidebar="group-label"
    :class="labelClasses"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface SidebarGroupLabelProps {
  class?: string
  asChild?: boolean
}

const props = withDefaults(defineProps<SidebarGroupLabelProps>(), {
  asChild: false
})

const labelClasses = computed(() =>
  cn(
    "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
    "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
    props.class
  )
)
</script>

<style lang="less" scoped>
.sidebar-group-label {
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
