<template>
  <Field
    :name="name"
    v-slot="fieldSlotProps"
    v-bind="$attrs"
  >
    <slot v-bind="fieldSlotProps" />
  </Field>
</template>

<script setup lang="ts">
import { Field } from '@vee-validate/vue'
import { provideFormField } from './FormContext'
import type { FieldPath, FieldValues } from '@vee-validate/vue'

interface FormFieldProps {
  name: string
  rules?: any
  validateOnMount?: boolean
  validateOnBlur?: boolean
  validateOnChange?: boolean
  validateOnInput?: boolean
  validateOnModelUpdate?: boolean
  standalone?: boolean
  label?: string
}

const props = defineProps<FormFieldProps>()

// Provide form field context
provideFormField({
  name: props.name
})
</script>

<style lang="less" scoped>
.form-field {
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
