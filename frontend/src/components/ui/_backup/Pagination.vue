<template>
  <nav
    role="navigation"
    aria-label="pagination"
    data-slot="pagination"
    :class="paginationClasses"
    v-bind="$attrs"
  >
    <slot />
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface PaginationProps {
  class?: string
}

const props = defineProps<PaginationProps>()

const paginationClasses = computed(() =>
  cn(
    "mx-auto flex w-full justify-center",
    props.class
  )
)
</script>

<style lang="less" scoped>
.pagination {
  margin-left: auto;
  margin-right: auto;
  display: flex;
  width: 100%;
  justify-content: center;
  
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
