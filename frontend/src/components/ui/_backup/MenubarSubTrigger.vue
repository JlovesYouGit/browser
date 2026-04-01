<template>
  <MenubarSubTriggerRoot
    data-slot="menubar-sub-trigger"
    :data-inset="inset"
    :class="triggerClasses"
    v-bind="$attrs"
  >
    <slot />
    <ChevronRightIcon class="ml-auto h-4 w-4" />
  </MenubarSubTriggerRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MenubarSubTrigger } from 'reka-ui'
import { ChevronRight } from 'lucide-vue-next'
import { cn } from '@/utils/cn'

interface MenubarSubTriggerProps {
  class?: string
  inset?: boolean
  disabled?: boolean
}

const props = defineProps<MenubarSubTriggerProps>()

const MenubarSubTriggerRoot = MenubarSubTrigger
const ChevronRightIcon = ChevronRight

const triggerClasses = computed(() =>
  cn(
    "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8",
    props.class
  )
)
</script>

<style lang="less" scoped>
.menubar-sub-trigger {
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
  
  .ml-auto {
    margin-left: auto;
  }
  
  .h-4 {
    height: 1rem;
  }
  
  .w-4 {
    width: 1rem;
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
