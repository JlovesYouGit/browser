<template>
  <MenubarRadioGroupRoot data-slot="menubar-radio-group" v-bind="$attrs">
    <slot />
  </MenubarRadioGroupRoot>
</template>

<script setup lang="ts">
import { MenubarRadioGroup } from 'reka-ui'

interface MenubarRadioGroupProps {
  class?: string
  value?: string
  defaultValue?: string
}

defineProps<MenubarRadioGroupProps>()

const MenubarRadioGroupRoot = MenubarRadioGroup
</script>

<style lang="less" scoped>
.menubar-radio-group {
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
