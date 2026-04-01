<template>
  <OTPInput
    data-slot="input-otp"
    :container-class="containerClasses"
    :class="inputClasses"
    v-bind="$attrs"
    v-model="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <slot />
  </OTPInput>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { OTPInput } from 'input-otp'
import { cn } from '@/utils/cn'

interface InputOTPProps {
  class?: string
  containerClassName?: string
  modelValue?: string
  maxLength?: number
  pattern?: string | RegExp
  inputMode?: 'numeric' | 'text' | 'tel'
  disabled?: boolean
}

const props = defineProps<InputOTPProps>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  complete: [value: string]
}>()

const containerClasses = computed(() =>
  cn(
    "flex items-center gap-2 has-disabled:opacity-50",
    props.containerClassName
  )
)

const inputClasses = computed(() =>
  cn(
    "disabled:cursor-not-allowed",
    props.class
  )
)
</script>

<style lang="less" scoped>
.input-otp {
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
  }
  
  // Performance optimizations
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: auto;
  contain: layout style paint;
}
</style>
