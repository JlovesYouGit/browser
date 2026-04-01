<template>
  <td
    data-slot="table-cell"
    :class="cellClasses"
    v-bind="$attrs"
  >
    <slot />
  </td>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface TableCellProps {
  class?: string
}

const props = defineProps<TableCellProps>()

const cellClasses = computed(() =>
  cn(
    "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
    props.class
  )
)
</script>

<style lang="less" scoped>
.table-cell {
  padding: 0.5rem;
  vertical-align: middle;
  white-space: nowrap;
  
  &:has([role="checkbox"]) {
    padding-right: 0;
  }
  
  :deep([role="checkbox"]) {
    transform: translateY(2px);
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
