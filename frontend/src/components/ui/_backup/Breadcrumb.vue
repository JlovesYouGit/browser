<template>
  <nav
    aria-label="breadcrumb"
    data-slot="breadcrumb"
    v-bind="$attrs"
  >
    <slot />
  </nav>
</template>

<script setup lang="ts">
// Component props interface
interface BreadcrumbProps {
  class?: string
}

// Define props
const props = defineProps<BreadcrumbProps>()

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.breadcrumb {
  // Base breadcrumb styles
  // Breadcrumb is a container component, so minimal styles needed
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // No animations needed for breadcrumb container
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    // Breadcrumb is theme-agnostic
  }
  
  // Print styles
  @media print {
    // Ensure breadcrumb prints correctly
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    // Mobile-specific breadcrumb optimizations
  }
  
  // Focus management
  &:focus {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  // Performance optimizations
  // Hardware acceleration for smooth transitions
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  
  // Optimize for animations
  will-change: auto;
  
  // Contain layout for performance
  contain: layout style paint;
}
</style>
