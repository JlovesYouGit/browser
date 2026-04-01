<template>
  <ContextMenuLabelRoot
    data-slot="context-menu-label"
    :data-inset="inset"
    :class="labelClasses"
    v-bind="$attrs"
  >
    <slot />
  </ContextMenuLabelRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ContextMenuLabel } from 'reka-ui'
import { cn } from '@/utils/cn'

interface ContextMenuLabelProps {
  class?: string
  inset?: boolean
}

defineProps<ContextMenuLabelProps>()

const ContextMenuLabelRoot = ContextMenuLabel

const labelClasses = computed(() =>
  cn(
    "text-foreground px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
    props.class
  )
)
</script>

<style lang="less" scoped>
.context-menu-label {
  color: var(--color-foreground);
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  
  &[data-inset] {
    padding-left: 2rem;
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
