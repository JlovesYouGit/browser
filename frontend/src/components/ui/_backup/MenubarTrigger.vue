<template>
  <MenubarTriggerRoot
    data-slot="menubar-trigger"
    :class="triggerClasses"
    v-bind="$attrs"
  >
    <slot />
  </MenubarTriggerRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MenubarTrigger } from 'reka-ui'
import { cn } from '@/utils/cn'

interface MenubarTriggerProps {
  class?: string
}

const props = defineProps<MenubarTriggerProps>()

const MenubarTriggerRoot = MenubarTrigger

const triggerClasses = computed(() =>
  cn(
    "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none",
    props.class
  )
)
</script>

<style lang="less" scoped>
.menubar-trigger {
  display: flex;
  align-items: center;
  border-radius: 0.125rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  outline: none;
  user-select: none;
  cursor: pointer;
  
  &:focus {
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
    outline: none;
  }
  
  &[data-state="open"] {
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
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
