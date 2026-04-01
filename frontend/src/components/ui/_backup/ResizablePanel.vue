<template>
  <Pane
    data-slot="resizable-panel"
    :size="size"
    :min-size="minSize"
    :max-size="maxSize"
    v-bind="$attrs"
  >
    <slot />
  </Pane>
</template>

<script setup lang="ts">
import { Pane } from 'splitpanes'

interface ResizablePanelProps {
  class?: string
  size?: number
  minSize?: number
  maxSize?: number
}

const props = defineProps<ResizablePanelProps>()
</script>

<style lang="less" scoped>
.resizable-panel {
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
