<template>
  <MenubarPortalRoot data-slot="menubar-portal" v-bind="$attrs">
    <slot />
  </MenubarPortalRoot>
</template>

<script setup lang="ts">
import { MenubarPortal } from 'reka-ui'

interface MenubarPortalProps {
  class?: string
  to?: string | HTMLElement
}

defineProps<MenubarPortalProps>()

const MenubarPortalRoot = MenubarPortal
</script>

<style lang="less" scoped>
.menubar-portal {
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>
