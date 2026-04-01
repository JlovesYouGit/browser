<template>
  <th
    data-slot="table-head"
    :class="headClasses"
    v-bind="$attrs"
  >
    <slot />
  </th>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface TableHeadProps {
  class?: string
}

const props = defineProps<TableHeadProps>()

const headClasses = computed(() =>
  cn(
    "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
    props.class
  )
)
</script>

<style lang="less" scoped>
.table-head {
  color: var(--color-foreground);
  height: 2.5rem;
  padding: 0 0.5rem;
  text-align: left;
  vertical-align: middle;
  font-weight: 500;
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
