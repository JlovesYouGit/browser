<template>
  <tbody
    data-slot="table-body"
    :class="bodyClasses"
    v-bind="$attrs"
  >
    <slot />
  </tbody>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface TableBodyProps {
  class?: string
}

const props = defineProps<TableBodyProps>()

const bodyClasses = computed(() =>
  cn(
    "[&_tr:last-child]:border-0",
    props.class
  )
)
</script>

<style lang="less" scoped>
.table-body {
  :deep(tr:last-child) {
    border: 0;
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
