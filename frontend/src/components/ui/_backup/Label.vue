<template>
  <LabelRoot
    data-slot="label"
    :class="labelClasses"
    v-bind="$attrs"
  >
    <slot />
  </LabelRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Label } from 'reka-ui'
import { cn } from '@/utils/cn'

interface LabelProps {
  class?: string
  for?: string
}

const props = defineProps<LabelProps>()

const LabelRoot = Label

const labelClasses = computed(() =>
  cn(
    "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
    props.class
  )
)
</script>

<style lang="less" scoped>
.label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  line-height: 1;
  font-weight: 500;
  user-select: none;
  
  // Group disabled state
  :global(.group[data-disabled="true"]) & {
    pointer-events: none;
    opacity: 0.5;
  }
  
  // Peer disabled state
  :global(.peer:disabled) ~ &,
  :global(.peer[data-disabled="true"]) ~ & {
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
