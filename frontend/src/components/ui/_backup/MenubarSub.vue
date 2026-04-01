<template>
  <MenubarSubRoot data-slot="menubar-sub" v-bind="$attrs">
    <slot />
  </MenubarSubRoot>
</template>

<script setup lang="ts">
import { MenubarSub } from 'reka-ui'

interface MenubarSubProps {
  class?: string
  defaultOpen?: boolean
  open?: boolean
}

defineProps<MenubarSubProps>()

const MenubarSubRoot = MenubarSub
</script>

<style lang="less" scoped>
.menubar-sub {
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
