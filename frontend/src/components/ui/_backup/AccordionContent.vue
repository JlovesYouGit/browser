<template>
  <AccordionContentPrimitive
    :data-slot="'accordion-content'"
    class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
    v-bind="$attrs"
  >
    <div :class="cn('pt-0 pb-4', className)">
      <slot />
    </div>
  </AccordionContentPrimitive>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AccordionContent } from 'radix-vue'
import { cn } from '@/utils/cn'

// Component props interface
interface AccordionContentProps {
  class?: string
  forceMount?: boolean
}

// Define props with default values
const props = withDefaults(defineProps<AccordionContentProps>(), {
  forceMount: false
})

// Use Radix Vue AccordionContent under the hood
const AccordionContentPrimitive = AccordionContent

// Computed classes
const className = computed(() => props.class)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.accordion-content {
  // Base content styles
  overflow: hidden;
  font-size: 0.875rem;
  
  // Animation states
  &[data-state="closed"] {
    animation: accordion-up 0.2s ease-out forwards;
  }
  
  &[data-state="open"] {
    animation: accordion-down 0.2s ease-out forwards;
  }
}

.accordion-content-inner {
  padding: 0 0 1rem 0;
}

// Animations
@keyframes accordion-up {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
}

@keyframes accordion-down {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// High DPI display optimization
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .accordion-content {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Reduced motion support
@media (prefers-reduced-motion: reduce) {
  .accordion-content {
    animation: none;
    
    &[data-state="closed"] {
      display: none;
    }
    
    &[data-state="open"] {
      display: block;
      opacity: 1;
      transform: none;
    }
  }
}

// Dark mode support
@media (prefers-color-scheme: dark) {
  .accordion-content {
    color: var(--color-foreground);
  }
}

// Print styles
@media print {
  .accordion-content {
    animation: none;
    
    &[data-state="closed"] {
      display: none;
    }
    
    &[data-state="open"] {
      display: block;
    }
  }
}
</style>
