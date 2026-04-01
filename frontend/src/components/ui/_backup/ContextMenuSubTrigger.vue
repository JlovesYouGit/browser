<template>
  <ContextMenuSubTriggerRoot
    data-slot="context-menu-sub-trigger"
    :data-inset="inset"
    :class="triggerClasses"
    v-bind="$attrs"
  >
    <slot />
    <ChevronRightIcon class="ml-auto" />
  </ContextMenuSubTriggerRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ContextMenuSubTrigger } from 'reka-ui'
import { ChevronRight } from 'lucide-vue-next'
import { cn } from '@/utils/cn'

interface ContextMenuSubTriggerProps {
  class?: string
  inset?: boolean
  disabled?: boolean
}

const props = defineProps<ContextMenuSubTriggerProps>()

const ContextMenuSubTriggerRoot = ContextMenuSubTrigger
const ChevronRightIcon = ChevronRight

const triggerClasses = computed(() =>
  cn(
    "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    props.class
  )
)
</script>

<style lang="less" scoped>
.context-menu-sub-trigger {
  cursor: default;
  user-select: none;
  
  &:focus {
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
    outline: none;
  }
  
  &[data-state="open"] {
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
  }
  
  &[data-inset] {
    padding-left: 2rem;
  }
  
  :deep(svg) {
    pointer-events: none;
    flex-shrink: 0;
    
    &:not([class*='size-']) {
      width: 1rem;
      height: 1rem;
    }
  }
  
  .ml-auto {
    margin-left: auto;
  }
  
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
