<template>
  <MenubarRadioItemRoot
    data-slot="menubar-radio-item"
    :class="radioItemClasses"
    v-bind="$attrs"
  >
    <span class="item-indicator-wrapper">
      <MenubarItemIndicator>
        <CircleIcon class="size-2 fill-current" />
      </MenubarItemIndicator>
    </span>
    <slot />
  </MenubarRadioItemRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MenubarRadioItem, MenubarItemIndicator } from 'reka-ui'
import { Circle } from 'lucide-vue-next'
import { cn } from '@/utils/cn'

interface MenubarRadioItemProps {
  class?: string
  value: string
  disabled?: boolean
}

const props = defineProps<MenubarRadioItemProps>()

const MenubarRadioItemRoot = MenubarRadioItem
const CircleIcon = Circle

const radioItemClasses = computed(() =>
  cn(
    "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    props.class
  )
)
</script>

<style lang="less" scoped>
.menubar-radio-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: default;
  border-radius: 0.25rem;
  padding: 0.375rem 0.5rem 0.375rem 2rem;
  font-size: 0.875rem;
  outline: none;
  user-select: none;
  
  &:focus {
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
    outline: none;
  }
  
  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .item-indicator-wrapper {
    pointer-events: none;
    position: absolute;
    left: 0.5rem;
    display: flex;
    width: 0.875rem;
    height: 0.875rem;
    align-items: center;
    justify-content: center;
  }
  
  :deep(svg) {
    pointer-events: none;
    flex-shrink: 0;
    
    &:not([class*='size-']) {
      width: 1rem;
      height: 1rem;
    }
    
    &.size-2 {
      width: 0.5rem;
      height: 0.5rem;
    }
    
    &.fill-current {
      fill: currentColor;
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
