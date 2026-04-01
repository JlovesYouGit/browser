<template>
  <SeparatorRoot
    data-slot="separator-root"
    :decorative="decorative"
    :orientation="orientation"
    :class="separatorClasses"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SeparatorRoot as RadixSeparator } from 'reka-ui'
import { cn } from '@/utils/cn'

interface SeparatorProps {
  class?: string
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
}

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal',
  decorative: true
})

const SeparatorRoot = RadixSeparator

const separatorClasses = computed(() =>
  cn(
    "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
    props.class
  )
)
</script>

<style lang="less" scoped>
.separator-root {
  background-color: var(--color-border);
  flex-shrink: 0;
  
  &[data-orientation="horizontal"] {
    height: 1px;
    width: 100%;
  }
  
  &[data-orientation="vertical"] {
    height: 100%;
    width: 1px;
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
