<template>
  <ul
    data-slot="pagination-content"
    :class="contentClasses"
    v-bind="$attrs"
  >
    <slot />
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface PaginationContentProps {
  class?: string
}

const props = defineProps<PaginationContentProps>()

const contentClasses = computed(() =>
  cn(
    "flex flex-row items-center gap-1",
    props.class
  )
)
</script>

<style lang="less" scoped>
.pagination-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
  
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
