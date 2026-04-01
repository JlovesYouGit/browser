<template>
  <div
    data-slot="drawer-footer"
    :class="footerClasses"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface DrawerFooterProps {
  class?: string
}

const props = defineProps<DrawerFooterProps>()

const footerClasses = computed(() =>
  cn(
    "mt-auto flex flex-col gap-2 p-4",
    props.class
  )
)
</script>

<style lang="less" scoped>
.drawer-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  
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
