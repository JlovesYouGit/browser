<template>
  <MenubarItemRoot
    data-slot="menubar-item"
    :data-inset="inset"
    :data-variant="variant"
    :class="itemClasses"
    v-bind="$attrs"
  >
    <slot />
  </MenubarItemRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MenubarItem } from 'reka-ui'
import { cn } from '@/utils/cn'

interface MenubarItemProps {
  class?: string
  inset?: boolean
  variant?: 'default' | 'destructive'
  disabled?: boolean
}

const props = withDefaults(defineProps<MenubarItemProps>(), {
  variant: 'default'
})

const MenubarItemRoot = MenubarItem

const itemClasses = computed(() =>
  cn(
    "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    props.class
  )
)
</script>

<style lang="less" scoped>
.menubar-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: default;
  border-radius: 0.125rem;
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  outline: none;
  user-select: none;
  
  &:focus {
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
    outline: none;
  }
  
  &[data-variant="destructive"] {
    color: var(--color-destructive);
    
    &:focus {
      background-color: color-mix(in srgb, var(--color-destructive) 10%, transparent);
    }
    
    @media (prefers-color-scheme: dark) {
      &:focus {
        background-color: color-mix(in srgb, var(--color-destructive) 20%, transparent);
      }
    }
    
    :deep(svg) {
      color: var(--color-destructive) !important;
    }
  }
  
  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &[data-inset] {
    padding-left: 2rem;
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
