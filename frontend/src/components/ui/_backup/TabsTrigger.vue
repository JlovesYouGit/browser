<template>
  <TabsTriggerRoot
    data-slot="tabs-trigger"
    :class="triggerClasses"
    v-bind="$attrs"
  >
    <slot />
  </TabsTriggerRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TabsTrigger } from 'reka-ui'
import { cn } from '@/utils/cn'

interface TabsTriggerProps {
  class?: string
  value: string
  disabled?: boolean
}

const props = defineProps<TabsTriggerProps>()

const TabsTriggerRoot = TabsTrigger

const triggerClasses = computed(() =>
  cn(
    "data-[state=active]:bg-card dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    props.class
  )
)
</script>

<style lang="less" scoped>
.tabs-trigger {
  display: inline-flex;
  height: calc(100% - 1px);
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  border-radius: 0.75rem;
  border: 1px solid transparent;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  transition: color 0.15s ease, box-shadow 0.15s ease;
  outline: none;
  cursor: pointer;
  
  &[data-state="active"] {
    background-color: var(--color-card);
    
    @media (prefers-color-scheme: dark) {
      color: var(--color-foreground);
      border-color: var(--color-input);
      background-color: color-mix(in srgb, var(--color-input) 30%, transparent);
    }
  }
  
  color: var(--color-foreground);
  
  @media (prefers-color-scheme: dark) {
    color: var(--color-muted-foreground);
  }
  
  &:focus-visible {
    border-color: var(--color-ring);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-ring) 50%, transparent);
    outline: 1px solid var(--color-ring);
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }
  
  :deep(svg) {
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
