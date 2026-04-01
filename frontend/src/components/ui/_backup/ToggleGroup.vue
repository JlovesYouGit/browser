<template>
  <ToggleGroupRoot
    data-slot="toggle-group"
    :data-variant="variant"
    :data-size="size"
    :class="groupClasses"
    v-model="modelValue"
    :type="type"
    :disabled="disabled"
    :roving-focus="rovingFocus"
    :loop="loop"
    v-bind="$attrs"
  >
    <slot />
  </ToggleGroupRoot>
</template>

<script setup lang="ts">
import { computed, ref, provide } from 'vue'
import { ToggleGroupRoot } from 'reka-ui'
import { cn } from '@/utils/cn'
import { ToggleGroupContextKey, type ToggleGroupContextValue } from './ToggleGroupContext'

interface ToggleGroupProps {
  class?: string
  modelValue?: string | string[]
  defaultValue?: string | string[]
  type?: 'single' | 'multiple'
  variant?: 'default' | 'outline'
  size?: 'default' | 'sm' | 'lg'
  disabled?: boolean
  rovingFocus?: boolean
  loop?: boolean
}

const props = withDefaults(defineProps<ToggleGroupProps>(), {
  variant: 'default',
  size: 'default',
  type: 'single'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
}>()

// Provide context to children
const variantRef = computed(() => props.variant)
const sizeRef = computed(() => props.size)

provide<ToggleGroupContextValue>(ToggleGroupContextKey, {
  variant: variantRef,
  size: sizeRef
})

const groupClasses = computed(() =>
  cn(
    "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
    props.class
  )
)
</script>

<style lang="less" scoped>
.toggle-group {
  display: flex;
  width: fit-content;
  align-items: center;
  border-radius: 0.375rem;
  
  &[data-variant="outline"] {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
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
