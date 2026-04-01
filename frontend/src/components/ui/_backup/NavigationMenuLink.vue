<template>
  <NavigationMenuLinkRoot
    data-slot="navigation-menu-link"
    :class="linkClasses"
    v-bind="$attrs"
  >
    <slot />
  </NavigationMenuLinkRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NavigationMenuLink } from 'reka-ui'
import { cn } from '@/utils/cn'

interface NavigationMenuLinkProps {
  class?: string
  active?: boolean
}

const props = defineProps<NavigationMenuLinkProps>()

const NavigationMenuLinkRoot = NavigationMenuLink

const linkClasses = computed(() =>
  cn(
    "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
    props.class
  )
)
</script>

<style lang="less" scoped>
.navigation-menu-link {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border-radius: 0.125rem;
  padding: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.15s ease;
  outline: none;
  
  &[data-active="true"] {
    background-color: color-mix(in srgb, var(--color-accent) 50%, transparent);
    color: var(--color-accent-foreground);
    
    &:hover {
      background-color: var(--color-accent);
    }
    
    &:focus {
      background-color: var(--color-accent);
    }
  }
  
  &:hover {
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
  }
  
  &:focus {
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
    outline: none;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-ring) 50%, transparent);
  }
  
  :deep(svg:not([class*='text-'])) {
    color: var(--color-muted-foreground);
    
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
