<template>
  <a
    :aria-current="isActive ? 'page' : undefined"
    data-slot="pagination-link"
    :data-active="isActive"
    :class="linkClasses"
    v-bind="$attrs"
  >
    <slot />
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface PaginationLinkProps {
  class?: string
  isActive?: boolean
  size?: 'default' | 'sm' | 'lg' | 'icon'
  href?: string
}

const props = withDefaults(defineProps<PaginationLinkProps>(), {
  size: 'icon'
})

const linkClasses = computed(() => {
  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    props.class
  )
  
  const variantClasses = props.isActive
    ? "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
    : "hover:bg-accent hover:text-accent-foreground"
  
  const sizeClasses = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9"
  }[props.size]
  
  return cn(baseClasses, variantClasses, sizeClasses)
})
</script>

<style lang="less" scoped>
.pagination-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.15s ease, background-color 0.15s ease;
  outline: none;
  
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-ring);
  }
  
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
  
  &[data-active="true"] {
    border: 1px solid var(--color-input);
    background-color: var(--color-background);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
  
  &:hover {
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
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
