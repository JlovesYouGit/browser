<template>
  <p
    v-if="body"
    data-slot="form-message"
    :id="formMessageId"
    :class="messageClasses"
    v-bind="$attrs"
  >
    {{ body }}
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'
import { useFormField } from './FormContext'

interface FormMessageProps {
  class?: string
}

const props = defineProps<FormMessageProps>()
const slots = defineSlots<{
  default?: () => any
}>()

const { error, formMessageId } = useFormField()

const body = computed(() => {
  return error?.message || slots.default?.()
})

const messageClasses = computed(() =>
  cn(
    "text-destructive text-sm",
    props.class
  )
)
</script>

<style lang="less" scoped>
.form-message {
  color: var(--color-destructive);
  font-size: 0.875rem;
  
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
