<template>
  <span
    aria-hidden="true"
    data-slot="pagination-ellipsis"
    :class="ellipsisClasses"
    v-bind="$attrs"
  >
    <MoreHorizontalIcon class="icon" />
    <span class="sr-only">More pages</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MoreHorizontal } from 'lucide-vue-next'
import { cn } from '@/utils/cn'

interface PaginationEllipsisProps {
  class?: string
}

const props = defineProps<PaginationEllipsisProps>()

const MoreHorizontalIcon = MoreHorizontal

const ellipsisClasses = computed(() =>
  cn(
    "flex size-9 items-center justify-center",
    props.class
  )
)
</script>

<style lang="less" scoped>
.pagination-ellipsis {
  display: flex;
  width: 2.25rem;
  height: 2.25rem;
  align-items: center;
  justify-content: center;
  
  .icon {
    width: 1rem;
    height: 1rem;
  }
  
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
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
