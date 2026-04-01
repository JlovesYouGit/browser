<template>
  <div data-slot="table-container" class="relative w-full overflow-x-auto">
    <table
      data-slot="table"
      :class="tableClasses"
      v-bind="$attrs"
    >
      <slot />
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface TableProps {
  class?: string
}

const props = defineProps<TableProps>()

const tableClasses = computed(() =>
  cn(
    "w-full caption-bottom text-sm",
    props.class
  )
)
</script>

<style lang="less" scoped>
.table-container {
  position: relative;
  width: 100%;
  overflow-x: auto;
}

.table {
  width: 100%;
  caption-side: bottom;
  font-size: 0.875rem;
  
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
