<template>
  <div
    data-slot="dialog-footer"
    :class="footerClasses"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface DialogFooterProps {
  class?: string
}

const props = defineProps<DialogFooterProps>()

const footerClasses = computed(() =>
  cn(
    "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
    props.class
  )
)
</script>

<style lang="less" scoped>
.dialog-footer {
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;
  
  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: flex-end;
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
