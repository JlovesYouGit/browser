<template>
  <PopoverAnchorRoot data-slot="popover-anchor" v-bind="$attrs">
    <slot />
  </PopoverAnchorRoot>
</template>

<script setup lang="ts">
import { PopoverAnchor } from 'reka-ui'

interface PopoverAnchorProps {
  class?: string
  asChild?: boolean
}

defineProps<PopoverAnchorProps>()

const PopoverAnchorRoot = PopoverAnchor
</script>

<style lang="less" scoped>
.popover-anchor {
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
