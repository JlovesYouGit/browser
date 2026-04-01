<template>
  <MenubarMenuRoot data-slot="menubar-menu" v-bind="$attrs">
    <slot />
  </MenubarMenuRoot>
</template>

<script setup lang="ts">
import { MenubarMenu } from 'reka-ui'

interface MenubarMenuProps {
  class?: string
}

defineProps<MenubarMenuProps>()

const MenubarMenuRoot = MenubarMenu
</script>

<style lang="less" scoped>
.menubar-menu {
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
