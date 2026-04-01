<template>
  <div
    :data-slot="'alert-dialog-header'"
    :class="headerClasses"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

// Component props interface
interface AlertDialogHeaderProps {
  class?: string
}

// Define props
const props = defineProps<AlertDialogHeaderProps>()

// Computed classes
const headerClasses = computed(() => 
  cn("flex flex-col gap-2 text-center sm:text-left", props.class)
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.alert-dialog-header {
  // Base header styles
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
  
  // Responsive design
  @media (min-width: 640px) {
    text-align: left;
  }
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // No animations needed for header
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    color: var(--color-foreground);
  }
  
  // Print styles
  @media print {
    text-align: left;
    color: #000;
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    gap: 0.375rem;
  }
  
  // Accessibility enhancements
  // Ensure proper color contrast
  color: var(--color-foreground);
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    color: #000;
  }
}
</style>
