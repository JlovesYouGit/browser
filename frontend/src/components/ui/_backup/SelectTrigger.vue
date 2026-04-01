<template>
  <SelectTriggerRoot
    data-slot="select-trigger"
    :data-size="size"
    :class="triggerClasses"
    v-bind="$attrs"
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDownIcon class="chevron" />
    </SelectIcon>
  </SelectTriggerRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SelectTrigger, SelectIcon } from 'reka-ui'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '@/utils/cn'

interface SelectTriggerProps {
  class?: string
  size?: 'sm' | 'default'
}

const props = withDefaults(defineProps<SelectTriggerProps>(), {
  size: 'default'
})

const SelectTriggerRoot = SelectTrigger
const ChevronDownIcon = ChevronDown

const triggerClasses = computed(() =>
  cn(
    "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-full items-center justify-between gap-2 rounded-md border bg-input-background px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    props.class
  )
)
</script>

<style lang="less" scoped>
.select-trigger {
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid var(--color-input);
  background-color: var(--color-input);
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  white-space: nowrap;
  transition: color 0.15s ease, box-shadow 0.15s ease;
  outline: none;
  cursor: pointer;
  
  &[data-size="default"] {
    height: 2.25rem;
  }
  
  &[data-size="sm"] {
    height: 2rem;
  }
  
  &[data-placeholder] {
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
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: color-mix(in srgb, var(--color-input) 30%, transparent);
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-input) 50%, transparent);
    }
    
    &[aria-invalid="true"]:focus-visible {
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-destructive) 40%, transparent);
    }
  }
  
  :deep(svg:not([class*='text-'])) {
    color: var(--color-muted-foreground);
    pointer-events: none;
    flex-shrink: 0;
    
    &:not([class*='size-']) {
      width: 1rem;
      height: 1rem;
    }
  }
  
  .chevron {
    width: 1rem;
    height: 1rem;
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
