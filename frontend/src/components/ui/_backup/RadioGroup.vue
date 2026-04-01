<template>
  <RadioGroupRoot
    data-slot="radio-group"
    :class="groupClasses"
    v-bind="$attrs"
  >
    <slot />
  </RadioGroupRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RadioGroupRoot } from 'reka-ui'
import { cn } from '@/utils/cn'

interface RadioGroupProps {
  class?: string
  modelValue?: string
  defaultValue?: string
  orientation?: 'horizontal' | 'vertical'
  disabled?: boolean
  loop?: boolean
}

const props = defineProps<RadioGroupProps>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const groupClasses = computed(() =>
  cn(
    "grid gap-3",
    props.class
  )
)
</script>

<style lang="less" scoped>
.radio-group {
  display: grid;
  gap: 0.75rem;
  
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
