<template>
  <FormProvider v-slot="slotProps">
    <slot v-bind="slotProps" />
  </FormProvider>
</template>

<script setup lang="ts">
import { Form as FormProvider } from '@vee-validate/vue'
import type { FormOptions, FormMeta } from '@vee-validate/vue'

interface FormProps extends Omit<FormOptions, 'validationSchema'> {
  class?: string
  validationSchema?: Record<string, any>
  initialValues?: Record<string, any>
  onSubmit?: (values: any) => void | Promise<void>
}

const props = defineProps<FormProps>()

// Define emits
const emit = defineEmits<{
  submit: [values: any]
}>()
</script>

<style lang="less" scoped>
.form {
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
