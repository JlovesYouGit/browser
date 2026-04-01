<template>
  <span
    data-slot="context-menu-shortcut"
    :class="shortcutClasses"
    v-bind="$attrs"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface ContextMenuShortcutProps {
  class?: string
}

defineProps<ContextMenuShortcutProps>()

const shortcutClasses = computed(() =>
  cn(
    "text-muted-foreground ml-auto text-xs tracking-widest",
    props.class
  )
)
</script>

<style lang="less" scoped>
.context-menu-shortcut {
  color: var(--color-muted-foreground);
  margin-left: auto;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // RTL support
  [dir="rtl"] & {
    margin-left: 0;
    margin-right: auto;
  }
  
  // Performance optimizations
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: auto;
  contain: layout style paint;
}
</style>
