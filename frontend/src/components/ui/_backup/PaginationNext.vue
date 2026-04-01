<template>
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    :class="nextClasses"
    v-bind="$attrs"
  >
    <span class="next-text">Next</span>
    <ChevronRightIcon />
  </PaginationLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ChevronRight } from 'lucide-vue-next'
import { cn } from '@/utils/cn'
import PaginationLink from './PaginationLink.vue'

interface PaginationNextProps {
  class?: string
}

const props = defineProps<PaginationNextProps>()

const ChevronRightIcon = ChevronRight

const nextClasses = computed(() =>
  cn(
    "gap-1 px-2.5 sm:pr-2.5",
    props.class
  )
)
</script>

<style lang="less" scoped>
.next-text {
  display: none;
  
  @media (min-width: 640px) {
    display: block;
  }
}

// High DPI display optimization
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .next-text {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>
