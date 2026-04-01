<template>
  <component
    :is="asChild ? 'button' : 'button'"
    data-slot="sidebar-group-action"
    data-sidebar="group-action"
    :class="actionClasses"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface SidebarGroupActionProps {
  class?: string
  asChild?: boolean
}

const props = withDefaults(defineProps<SidebarGroupActionProps>(), {
  asChild: false
})

const actionClasses = computed(() =>
  cn(
    "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
    "after:absolute after:-inset-2 md:after:hidden",
    "group-data-[collapsible=icon]:hidden",
    props.class
  )
)
</script>

<style lang="less" scoped>
.sidebar-group-action {
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
