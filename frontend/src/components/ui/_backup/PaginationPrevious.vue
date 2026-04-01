<template>
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    :class="previousClasses"
    v-bind="$attrs"
  >
    <ChevronLeftIcon />
    <span class="previous-text">Previous</span>
  </PaginationLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft } from 'lucide-vue-next'
import { cn } from '@/utils/cn'
import PaginationLink from './PaginationLink.vue'

interface PaginationPreviousProps {
  class?: string
}

const props = defineProps<PaginationPreviousProps>()

const ChevronLeftIcon = ChevronLeft

const previousClasses = computed(() =>
  cn(
    "gap-1 px-2.5 sm:pl-2.5",
    props.class
  )
)
</script>

<style lang="less" scoped>
.previous-text {
  display: none;
  
  @media (min-width: 640px) {
    display: block;
  }
}

// High DPI display optimization
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .previous-text {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>
