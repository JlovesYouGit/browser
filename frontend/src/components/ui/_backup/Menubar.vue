<template>
  <MenubarRoot
    data-slot="menubar"
    :class="menubarClasses"
    v-bind="$attrs"
  >
    <slot />
  </MenubarRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MenubarRoot } from 'reka-ui'
import { cn } from '@/utils/cn'

interface MenubarProps {
  class?: string
  loop?: boolean
}

const props = defineProps<MenubarProps>()

const menubarClasses = computed(() =>
  cn(
    "bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",
    props.class
  )
)
</script>

<style lang="less" scoped>
.menubar {
  background-color: var(--color-background);
  display: flex;
  height: 2.25rem;
  align-items: center;
  gap: 0.25rem;
  border-radius: 0.375rem;
  border: 1px solid var(--color-border);
  padding: 0.25rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
  }
  
  // Performance optimizations
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: auto;
  contain: layout style paint;
}
</style>
