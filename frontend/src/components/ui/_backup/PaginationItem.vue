<template>
  <li data-slot="pagination-item" v-bind="$attrs">
    <slot />
  </li>
</template>

<script setup lang="ts">
interface PaginationItemProps {
  class?: string
}

defineProps<PaginationItemProps>()
</script>

<style lang="less" scoped>
.pagination-item {
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
