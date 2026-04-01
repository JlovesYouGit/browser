<template>
  <AccordionHeader class="flex">
    <AccordionTriggerPrimitive
      :data-slot="'accordion-trigger'"
      :class="triggerClasses"
      v-bind="$attrs"
    >
      <slot />
      <ChevronDownIcon 
        class="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200 chevron-icon"
        :class="{ 'rotate-180': isOpen }"
      />
    </AccordionTriggerPrimitive>
  </AccordionHeader>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AccordionHeader, AccordionTrigger } from 'radix-vue'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '@/utils/cn'

// Component props interface
interface AccordionTriggerProps {
  class?: string
  disabled?: boolean
}

// Define props with default values
const props = withDefaults(defineProps<AccordionTriggerProps>(), {
  disabled: false
})

// Use Radix Vue components
const AccordionHeaderPrimitive = AccordionHeader
const AccordionTriggerPrimitive = AccordionTrigger
const ChevronDownIcon = ChevronDown

// Track open state for icon rotation
const isOpen = computed(() => {
  // This would be handled by the parent Accordion context
  // For now, we'll use a data attribute approach
  return false
})

// Computed classes
const triggerClasses = computed(() => 
  cn(
    "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
    props.class
  )
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.accordion-trigger {
  // Base trigger styles
  display: flex;
  flex: 1;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
  border-radius: 0.375rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  outline: none;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
  
  &:focus-visible {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
  
  // Icon rotation when open
  &[data-state="open"] {
    .chevron-icon {
      transform: rotate(180deg);
    }
  }
}

.chevron-icon {
  color: var(--color-muted-foreground);
  pointer-events: none;
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  transform: translateY(0.125rem);
  transition: transform 0.2s ease;
}

// High DPI display optimization
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .accordion-trigger {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Reduced motion support
@media (prefers-reduced-motion: reduce) {
  .accordion-trigger,
  .chevron-icon {
    transition: none;
  }
}

// Dark mode support
@media (prefers-color-scheme: dark) {
  .accordion-trigger {
    color: var(--color-foreground);
  }
  
  .chevron-icon {
    color: var(--color-muted-foreground);
  }
}
</style>
