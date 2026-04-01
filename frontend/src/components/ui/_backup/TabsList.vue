<template>
  <TabsListRoot
    data-slot="tabs-list"
    :class="listClasses"
    v-bind="$attrs"
  >
    <slot />
  </TabsListRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TabsList } from 'reka-ui'
import { cn } from '@/utils/cn'

interface TabsListProps {
  class?: string
  loop?: boolean
}

const props = defineProps<TabsListProps>()

const TabsListRoot = TabsList

const listClasses = computed(() =>
  cn(
    "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px] flex",
    props.class
  )
)
</script>

<style lang="less" scoped>
.tabs-list {
  background-color: var(--color-muted);
  color: var(--color-muted-foreground);
  display: inline-flex;
  height: 2.25rem;
  width: fit-content;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  padding: 3px;
  
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
