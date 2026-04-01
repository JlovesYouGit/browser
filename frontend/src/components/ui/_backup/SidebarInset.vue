<template>
  <main
    data-slot="sidebar-inset"
    :class="insetClasses"
    v-bind="$attrs"
  >
    <slot />
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface SidebarInsetProps {
  class?: string
}

const props = defineProps<SidebarInsetProps>()

const insetClasses = computed(() =>
  cn(
    "bg-background relative flex w-full flex-1 flex-col",
    "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
    props.class
  )
)
</script>

<style lang="less" scoped>
.sidebar-inset {
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
