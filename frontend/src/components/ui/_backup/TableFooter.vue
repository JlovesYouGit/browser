<template>
  <tfoot
    data-slot="table-footer"
    :class="footerClasses"
    v-bind="$attrs"
  >
    <slot />
  </tfoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface TableFooterProps {
  class?: string
}

const props = defineProps<TableFooterProps>()

const footerClasses = computed(() =>
  cn(
    "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
    props.class
  )
)
</script>

<style lang="less" scoped>
.table-footer {
  background-color: color-mix(in srgb, var(--color-muted) 50%, transparent);
  border-top: 1px solid var(--color-border);
  font-weight: 500;
  
  > tr:last-child {
    border-bottom: 0;
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
