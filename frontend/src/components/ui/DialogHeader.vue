<template>
  <div
    data-slot="dialog-header"
    :class="headerClasses"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface DialogHeaderProps {
  class?: string
}

const props = defineProps<DialogHeaderProps>()

const headerClasses = computed(() =>
  cn(
    "flex flex-col gap-2 text-center sm:text-left",
    props.class
  )
)
</script>

<style lang="less" scoped>
.dialog-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
  
  @media (min-width: 640px) {
    text-align: left;
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
