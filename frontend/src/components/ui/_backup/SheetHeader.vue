<template>
  <div
    data-slot="sheet-header"
    :class="headerClasses"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface SheetHeaderProps {
  class?: string
}

const props = defineProps<SheetHeaderProps>()

const headerClasses = computed(() =>
  cn(
    "flex flex-col gap-1.5 p-4",
    props.class
  )
)
</script>

<style lang="less" scoped>
.sheet-header {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding: 1rem;
  
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
