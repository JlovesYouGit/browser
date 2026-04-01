<template>
  <SelectLabelRoot
    data-slot="select-label"
    :class="labelClasses"
    v-bind="$attrs"
  >
    <slot />
  </SelectLabelRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SelectLabel } from 'reka-ui'
import { cn } from '@/utils/cn'

interface SelectLabelProps {
  class?: string
}

const props = defineProps<SelectLabelProps>()

const SelectLabelRoot = SelectLabel

const labelClasses = computed(() =>
  cn(
    "text-muted-foreground px-2 py-1.5 text-xs",
    props.class
  )
)
</script>

<style lang="less" scoped>
.select-label {
  color: var(--color-muted-foreground);
  padding: 0.375rem 0.5rem;
  font-size: 0.75rem;
  
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
