<template>
  <ScrollAreaRoot
    data-slot="scroll-area"
    :class="scrollAreaClasses"
    v-bind="$attrs"
  >
    <ScrollAreaViewport
      data-slot="scroll-area-viewport"
      :class="viewportClasses"
    >
      <slot />
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ScrollAreaRoot, ScrollAreaViewport, ScrollAreaCorner } from 'reka-ui'
import ScrollBar from './ScrollBar.vue'
import { cn } from '@/utils/cn'

interface ScrollAreaProps {
  class?: string
  viewportClass?: string
}

const props = defineProps<ScrollAreaProps>()

const scrollAreaClasses = computed(() =>
  cn(
    "relative",
    props.class
  )
)

const viewportClasses = computed(() =>
  cn(
    "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
    props.viewportClass
  )
)
</script>

<style lang="less" scoped>
.scroll-area {
  position: relative;
  
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

.scroll-area-viewport {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  outline: none;
  transition: color 0.15s ease, box-shadow 0.15s ease;
  
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-ring) 50%, transparent);
  }
}
</style>
