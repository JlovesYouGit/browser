<template>
  <ContextMenuPortalRoot data-slot="context-menu-portal" v-bind="$attrs">
    <slot />
  </ContextMenuPortalRoot>
</template>

<script setup lang="ts">
import { ContextMenuPortal } from 'reka-ui'

interface ContextMenuPortalProps {
  class?: string
  to?: string | HTMLElement
}

defineProps<ContextMenuPortalProps>()

const ContextMenuPortalRoot = ContextMenuPortal
</script>

<style lang="less" scoped>
.context-menu-portal {
  // Base portal styles
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>
