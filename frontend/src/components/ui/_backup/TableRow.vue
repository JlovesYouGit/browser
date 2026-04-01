<template>
  <tr
    data-slot="table-row"
    :class="rowClasses"
    v-bind="$attrs"
  >
    <slot />
  </tr>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface TableRowProps {
  class?: string
  selected?: boolean
}

const props = defineProps<TableRowProps>()

const rowClasses = computed(() =>
  cn(
    "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
    props.class
  )
)
</script>

<style lang="less" scoped>
.table-row {
  border-bottom: 1px solid var(--color-border);
  transition: background-color 0.15s ease;
  
  &:hover {
    background-color: color-mix(in srgb, var(--color-muted) 50%, transparent);
  }
  
  &[data-state="selected"] {
    background-color: var(--color-muted);
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
