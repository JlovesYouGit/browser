<template>
  <TooltipProviderRoot
    data-slot="tooltip-provider"
    :delay-duration="delayDuration"
    :skip-delay-duration="skipDelayDuration"
    :disable-hoverable-content="disableHoverableContent"
    v-bind="$attrs"
  >
    <slot />
  </TooltipProviderRoot>
</template>

<script setup lang="ts">
import { TooltipProvider } from 'reka-ui'

interface TooltipProviderProps {
  delayDuration?: number
  skipDelayDuration?: number
  disableHoverableContent?: boolean
}

const props = withDefaults(defineProps<TooltipProviderProps>(), {
  delayDuration: 0
})

const TooltipProviderRoot = TooltipProvider
</script>

<style lang="less" scoped>
.tooltip-provider {
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>
