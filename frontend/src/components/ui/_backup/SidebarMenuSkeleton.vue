<template>
  <div
    data-slot="sidebar-menu-skeleton"
    data-sidebar="menu-skeleton"
    :class="skeletonClasses"
    v-bind="$attrs"
  >
    <Skeleton
      v-if="showIcon"
      class="size-4 rounded-md"
      data-sidebar="menu-skeleton-icon"
    />
    <Skeleton
      class="h-4 flex-1"
      data-sidebar="menu-skeleton-text"
      :style="{ maxWidth: width }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'
import Skeleton from './Skeleton.vue'

interface SidebarMenuSkeletonProps {
  class?: string
  showIcon?: boolean
}

const props = withDefaults(defineProps<SidebarMenuSkeletonProps>(), {
  showIcon: false
})

// Random width between 50% and 90%
const width = computed(() => `${Math.floor(Math.random() * 40) + 50}%`)

const skeletonClasses = computed(() =>
  cn(
    "flex h-8 items-center gap-2 rounded-md px-2",
    props.class
  )
)
</script>

<style lang="less" scoped>
.sidebar-menu-skeleton {
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
