<template>
  <MenubarGroupRoot data-slot="menubar-group" v-bind="$attrs">
    <slot />
  </MenubarGroupRoot>
</template>

<script setup lang="ts">
import { MenubarGroup } from 'reka-ui'

interface MenubarGroupProps {
  class?: string
}

defineProps<MenubarGroupProps>()

const MenubarGroupRoot = MenubarGroup
</script>

<style lang="less" scoped>
.menubar-group {
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
