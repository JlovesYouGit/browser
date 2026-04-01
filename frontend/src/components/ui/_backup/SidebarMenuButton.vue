<template>
  <Tooltip v-if="tooltip && state === 'collapsed' && !isMobile" side="right" align="center">
    <TooltipTrigger as-child>
      <component
        :is="asChild ? 'button' : 'button'"
        data-slot="sidebar-menu-button"
        data-sidebar="menu-button"
        :data-size="size"
        :data-active="isActive"
        :class="buttonClasses"
        v-bind="$attrs"
      >
        <slot />
      </component>
    </TooltipTrigger>
    <TooltipContent>
      {{ typeof tooltip === 'string' ? tooltip : tooltip.children }}
    </TooltipContent>
  </Tooltip>
  
  <component
    v-else
    :is="asChild ? 'button' : 'button'"
    data-slot="sidebar-menu-button"
    data-sidebar="menu-button"
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
import { useSidebar } from './SidebarContext'
import { sidebarMenuButtonVariants, type SidebarMenuButtonVariants } from './SidebarMenuButtonVariants'
import Tooltip from './Tooltip.vue'
import TooltipTrigger from './TooltipTrigger.vue'
import TooltipContent from './TooltipContent.vue'

interface SidebarMenuButtonProps extends SidebarMenuButtonVariants {
  class?: string
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | { children: string }
}

const props = withDefaults(defineProps<SidebarMenuButtonProps>(), {
  asChild: false,
  isActive: false,
  variant: 'default',
  size: 'default'
})

const { isMobile, state } = useSidebar()

const buttonClasses = computed(() =>
  cn(
    sidebarMenuButtonVariants({ variant: props.variant, size: props.size }),
    props.class
  )
)
</script>

<style lang="less" scoped>
.sidebar-menu-button {
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
