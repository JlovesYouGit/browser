<template>
  <Label
    data-slot="form-label"
    :data-error="error ? true : undefined"
    :for="formItemId"
    :class="labelClasses"
    v-bind="$attrs"
  >
    <slot />
  </Label>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Label } from 'reka-ui'
import { cn } from '@/utils/cn'
import { useFormField } from './FormContext'

interface FormLabelProps {
  class?: string
}

const props = defineProps<FormLabelProps>()

const { error, formItemId } = useFormField()

const labelClasses = computed(() =>
  cn(
    "data-[error=true]:text-destructive",
    props.class
  )
)
</script>

<style lang="less" scoped>
.form-label {
  &[data-error="true"] {
    color: var(--color-destructive);
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
