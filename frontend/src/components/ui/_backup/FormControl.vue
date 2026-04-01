<template>
  <Slot
    data-slot="form-control"
    :id="formItemId"
    :aria-describedby="ariaDescribedBy"
    :aria-invalid="error ? true : undefined"
    v-bind="$attrs"
  >
    <slot />
  </Slot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Slot } from 'reka-ui'
import { useFormField } from './FormContext'

interface FormControlProps {
  class?: string
}

defineProps<FormControlProps>()

const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

const ariaDescribedBy = computed(() =>
  !error
    ? formDescriptionId
    : `${formDescriptionId} ${formMessageId}`
)
</script>

<style lang="less" scoped>
.form-control {
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
