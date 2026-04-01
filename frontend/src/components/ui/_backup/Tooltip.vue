<template>
  <TooltipProvider>
    <TooltipRoot
      data-slot="tooltip"
      :open="open"
      :default-open="defaultOpen"
      :delay-duration="delayDuration"
      :disable-hoverable-content="disableHoverableContent"
      @update:open="$emit('update:open', $event)"
      v-bind="$attrs"
    >
      <slot />
    </TooltipRoot>
  </TooltipProvider>
</template>

<script setup lang="ts">
import { TooltipRoot } from 'reka-ui'
import TooltipProvider from './TooltipProvider.vue'

interface TooltipProps {
  open?: boolean
  defaultOpen?: boolean
  delayDuration?: number
  disableHoverableContent?: boolean
}

const props = defineProps<TooltipProps>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<style lang="less" scoped>
.tooltip {
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
