<template>
  <DrawerPortalRoot data-slot="drawer-portal" v-bind="$attrs">
    <slot />
  </DrawerPortalRoot>
</template>

<script setup lang="ts">
import { DrawerPortal } from 'vaul'

interface DrawerPortalProps {
  class?: string
  to?: string | HTMLElement
}

defineProps<DrawerPortalProps>()

const DrawerPortalRoot = DrawerPortal
</script>

<style lang="less" scoped>
.drawer-portal {
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>
