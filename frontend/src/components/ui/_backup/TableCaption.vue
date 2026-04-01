<template>
  <caption
    data-slot="table-caption"
    :class="captionClasses"
    v-bind="$attrs"
  >
    <slot />
  </caption>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface TableCaptionProps {
  class?: string
}

const props = defineProps<TableCaptionProps>()

const captionClasses = computed(() =>
  cn(
    "text-muted-foreground mt-4 text-sm",
    props.class
  )
)
</script>

<style lang="less" scoped>
.table-caption {
  color: var(--color-muted-foreground);
  margin-top: 1rem;
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
