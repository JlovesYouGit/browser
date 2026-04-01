<template>
  <textarea
    data-slot="textarea"
    :class="textareaClasses"
    v-bind="$attrs"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface TextareaProps {
  class?: string
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  rows?: number
}

const props = defineProps<TextareaProps>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const textareaClasses = computed(() =>
  cn(
    "resize-none border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-input-background px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
    props.class
  )
)
</script>

<style lang="less" scoped>
.textarea {
  resize: none;
  border: 1px solid var(--color-input);
  background-color: var(--color-input);
  display: flex;
  min-height: 4rem;
  width: 100%;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  transition: color 0.15s ease, box-shadow 0.15s ease;
  outline: none;
  
  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
  
  &::placeholder {
    color: var(--color-muted-foreground);
  }
  
  &:focus-visible {
    border-color: var(--color-ring);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-ring) 50%, transparent);
    outline: none;
  }
  
  &[aria-invalid="true"] {
    border-color: var(--color-destructive);
    
    &:focus-visible {
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-destructive) 20%, transparent);
    }
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: color-mix(in srgb, var(--color-input) 30%, transparent);
    
    &[aria-invalid="true"]:focus-visible {
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-destructive) 40%, transparent);
    }
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
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
