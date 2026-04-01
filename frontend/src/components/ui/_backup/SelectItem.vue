<template>
  <SelectItemRoot
    data-slot="select-item"
    :class="itemClasses"
    v-bind="$attrs"
  >
    <span class="item-indicator-wrapper">
      <SelectItemIndicator>
        <CheckIcon class="check-icon" />
      </SelectItemIndicator>
    </span>
    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItemRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SelectItem, SelectItemIndicator, SelectItemText } from 'reka-ui'
import { Check } from 'lucide-vue-next'
import { cn } from '@/utils/cn'

interface SelectItemProps {
  class?: string
  value: string
  disabled?: boolean
  textValue?: string
}

const props = defineProps<SelectItemProps>()

const SelectItemRoot = SelectItem
const CheckIcon = Check

const itemClasses = computed(() =>
  cn(
    "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
    props.class
  )
)
</script>

<style lang="less" scoped>
.select-item {
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.5rem;
  cursor: default;
  border-radius: 0.125rem;
  padding: 0.375rem 2rem 0.375rem 0.5rem;
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
    position: absolute;
    right: 0.5rem;
    display: flex;
    width: 0.875rem;
    height: 0.875rem;
    align-items: center;
    justify-content: center;
  }
  
  .check-icon {
    width: 1rem;
    height: 1rem;
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
