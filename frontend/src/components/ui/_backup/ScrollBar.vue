<template>
  <ScrollAreaScrollbarRoot
    data-slot="scroll-area-scrollbar"
    :orientation="orientation"
    :class="scrollbarClasses"
    v-bind="$attrs"
  >
    <ScrollAreaThumb
      data-slot="scroll-area-thumb"
      :class="thumbClasses"
    />
  </ScrollAreaScrollbarRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ScrollAreaScrollbar, ScrollAreaThumb } from 'reka-ui'
import { cn } from '@/utils/cn'

interface ScrollBarProps {
  class?: string
  orientation?: 'vertical' | 'horizontal'
}

const props = withDefaults(defineProps<ScrollBarProps>(), {
  orientation: 'vertical'
})

const ScrollAreaScrollbarRoot = ScrollAreaScrollbar

const scrollbarClasses = computed(() =>
  cn(
    "flex touch-none p-px transition-colors select-none",
    props.orientation === 'vertical' && "h-full w-2.5 border-l border-l-transparent",
    props.orientation === 'horizontal' && "h-2.5 flex-col border-t border-t-transparent",
    props.class
  )
)

const thumbClasses = "bg-border relative flex-1 rounded-full"
</script>

<style lang="less" scoped>
.scroll-area-scrollbar {
  display: flex;
  touch-action: none;
  padding: 1px;
  transition: colors 0.15s ease;
  user-select: none;
  
  &[data-orientation="vertical"] {
    height: 100%;
    width: 0.625rem;
    border-left: 1px solid transparent;
  }
  
  &[data-orientation="horizontal"] {
    height: 0.625rem;
    flex-direction: column;
    border-top: 1px solid transparent;
  }
  
  .scroll-area-thumb {
    background-color: var(--color-border);
    position: relative;
    flex: 1;
    border-radius: 9999px;
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
