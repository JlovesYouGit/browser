<template>
  <ToggleRoot
    data-slot="toggle"
    :class="toggleClasses"
    :pressed="pressed"
    :default-pressed="defaultPressed"
    :disabled="disabled"
    @update:pressed="$emit('update:pressed', $event)"
    v-bind="$attrs"
  >
    <slot />
  </ToggleRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ToggleRoot } from 'reka-ui'
import { cn } from '@/utils/cn'
import { toggleVariants, type ToggleVariants } from './ToggleVariants'

interface ToggleProps extends ToggleVariants {
  class?: string
  pressed?: boolean
  defaultPressed?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<ToggleProps>(), {
  variant: 'default',
  size: 'default'
})

const emit = defineEmits<{
  'update:pressed': [value: boolean]
}>()

const toggleClasses = computed(() =>
  cn(
    toggleVariants({ variant: props.variant, size: props.size }),
    props.class
  )
)
</script>

<style lang="less" scoped>
.toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  transition: color 0.15s ease, box-shadow 0.15s ease;
  outline: none;
  cursor: pointer;
  
  &:hover {
    background-color: var(--color-muted);
    color: var(--color-muted-foreground);
  }
  
  &[data-state="on"] {
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
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
    
    @media (prefers-color-scheme: dark) {
      &:focus-visible {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-destructive) 40%, transparent);
      }
    }
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }
  
  :deep(svg) {
    pointer-events: none;
    flex-shrink: 0;
    
    &:not([class*='size-']) {
      width: 1rem;
      height: 1rem;
    }
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
