<template>
  <HoverCardTriggerRoot data-slot="hover-card-trigger" v-bind="$attrs">
    <slot />
  </HoverCardTriggerRoot>
</template>

<script setup lang="ts">
import { HoverCardTrigger } from 'reka-ui'

interface HoverCardTriggerProps {
  class?: string
  asChild?: boolean
}

defineProps<HoverCardTriggerProps>()

const HoverCardTriggerRoot = HoverCardTrigger
</script>

<style lang="less" scoped>
.hover-card-trigger {
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
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
