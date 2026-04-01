<template>
  <thead
    data-slot="table-header"
    :class="headerClasses"
    v-bind="$attrs"
  >
    <slot />
  </thead>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface TableHeaderProps {
  class?: string
}

const props = defineProps<TableHeaderProps>()

const headerClasses = computed(() =>
  cn(
    "[&_tr]:border-b",
    props.class
  )
)
</script>

<style lang="less" scoped>
.table-header {
  :deep(tr) {
    border-bottom: 1px solid var(--color-border);
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
