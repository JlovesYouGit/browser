<template>
  <DrawerTitleRoot
    data-slot="drawer-title"
    :class="titleClasses"
    v-bind="$attrs"
  >
    <slot />
  </DrawerTitleRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DrawerTitle } from 'vaul'
import { cn } from '@/utils/cn'

interface DrawerTitleProps {
  class?: string
}

const props = defineProps<DrawerTitleProps>()

const DrawerTitleRoot = DrawerTitle

const titleClasses = computed(() =>
  cn(
    "text-foreground font-semibold",
    props.class
  )
)
</script>

<style lang="less" scoped>
.drawer-title {
  color: var(--color-foreground);
  font-weight: 600;
  
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
