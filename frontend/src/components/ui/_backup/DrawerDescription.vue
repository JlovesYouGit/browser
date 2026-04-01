<template>
  <DrawerDescriptionRoot
    data-slot="drawer-description"
    :class="descriptionClasses"
    v-bind="$attrs"
  >
    <slot />
  </DrawerDescriptionRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DrawerDescription } from 'vaul'
import { cn } from '@/utils/cn'

interface DrawerDescriptionProps {
  class?: string
}

const props = defineProps<DrawerDescriptionProps>()

const DrawerDescriptionRoot = DrawerDescription

const descriptionClasses = computed(() =>
  cn(
    "text-muted-foreground text-sm",
    props.class
  )
)
</script>

<style lang="less" scoped>
.drawer-description {
  color: var(--color-muted-foreground);
  font-size: 0.875rem;
  
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
