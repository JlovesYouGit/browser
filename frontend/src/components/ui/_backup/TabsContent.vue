<template>
  <TabsContentRoot
    data-slot="tabs-content"
    :class="contentClasses"
    v-bind="$attrs"
  >
    <slot />
  </TabsContentRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TabsContent } from 'reka-ui'
import { cn } from '@/utils/cn'

interface TabsContentProps {
  class?: string
  value: string
  forceMount?: boolean
}

const props = defineProps<TabsContentProps>()

const TabsContentRoot = TabsContent

const contentClasses = computed(() =>
  cn(
    "flex-1 outline-none",
    props.class
  )
)
</script>

<style lang="less" scoped>
.tabs-content {
  flex: 1;
  outline: none;
  
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
