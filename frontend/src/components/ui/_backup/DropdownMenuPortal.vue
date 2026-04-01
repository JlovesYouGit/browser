<template>
  <DropdownMenuPortalRoot data-slot="dropdown-menu-portal" v-bind="$attrs">
    <slot />
  </DropdownMenuPortalRoot>
</template>

<script setup lang="ts">
import { DropdownMenuPortal } from 'reka-ui'

interface DropdownMenuPortalProps {
  class?: string
  to?: string | HTMLElement
}

defineProps<DropdownMenuPortalProps>()

const DropdownMenuPortalRoot = DropdownMenuPortal
</script>

<style lang="less" scoped>
.dropdown-menu-portal {
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>
