<template>
  <input
    :type="type"
    data-slot="input"
    :class="inputClasses"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface InputProps {
  class?: string
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'datetime-local' | 'month' | 'time' | 'week' | 'file' | string
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text'
})

const inputClasses = computed(() =>
  cn(
    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    props.class
  )
)
</script>

<style lang="less" scoped>
.input {
  color: var(--color-foreground);
  
  &::placeholder {
    color: var(--color-muted-foreground);
  }
  
  &::selection {
    background-color: var(--color-primary);
    color: var(--color-primary-foreground);
  }
  
  &:disabled {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.5;
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
  
  // File input styles
  &::file-selector-button {
    color: var(--color-foreground);
    display: inline-flex;
    height: 1.75rem;
    border: 0;
    background-color: transparent;
    font-size: 0.875rem;
    font-weight: 500;
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
