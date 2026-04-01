<template>
  <ToggleGroupItemRoot
    data-slot="toggle-group-item"
    :data-variant="context.variant.value || variant"
    :data-size="context.size.value || size"
    :class="itemClasses"
    :value="value"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot />
  </ToggleGroupItemRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ToggleGroupItem } from 'reka-ui'
import { cn } from '@/utils/cn'
import { useToggleGroup } from './ToggleGroupContext'

interface ToggleGroupItemProps {
  class?: string
  value: string
  variant?: 'default' | 'outline'
  size?: 'default' | 'sm' | 'lg'
  disabled?: boolean
}

const props = defineProps<ToggleGroupItemProps>()

const ToggleGroupItemRoot = ToggleGroupItem
const context = useToggleGroup()

const itemClasses = computed(() => {
  const effectiveVariant = context.variant.value || props.variant || 'default'
  const effectiveSize = context.size.value || props.size || 'default'
  
  const baseClasses = cn(
    "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
    props.class
  )
  
  // Toggle variant styles
  const variantClasses = {
    default: cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
      "bg-transparent hover:bg-muted hover:text-muted-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
    ),
    outline: cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
      "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l"
    )
  }
  
  const sizeClasses = {
    default: "h-9 px-3",
    sm: "h-8 px-2",
    lg: "h-10 px-3"
  }
  
  return cn(variantClasses[effectiveVariant], sizeClasses[effectiveSize], baseClasses)
})
</script>

<style lang="less" scoped>
.toggle-group-item {
  min-width: 0;
  flex: 1;
  flex-shrink: 0;
  border-radius: 0;
  box-shadow: none;
  
  &:first-child {
    border-top-left-radius: 0.375rem;
    border-bottom-left-radius: 0.375rem;
  }
  
  &:last-child {
    border-top-right-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
  }
  
  &:focus {
    z-index: 10;
  }
  
  &:focus-visible {
    z-index: 10;
  }
  
  &[data-variant="outline"] {
    border-left: 0;
    
    &:first-child {
      border-left: 1px solid var(--color-input);
    }
  }
  
  &[data-state="on"] {
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
  }
  
  &:hover {
    background-color: var(--color-muted);
    color: var(--color-muted-foreground);
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
