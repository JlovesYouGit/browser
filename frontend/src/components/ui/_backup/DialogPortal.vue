<template>
  <DialogPortalRoot data-slot="dialog-portal" v-bind="$attrs">
    <slot />
  </DialogPortalRoot>
</template>

<script setup lang="ts">
import { DialogPortal } from 'reka-ui'

interface DialogPortalProps {
  class?: string
  to?: string | HTMLElement
}

defineProps<DialogPortalProps>()

const DialogPortalRoot = DialogPortal
</script>

<style lang="less" scoped>
.dialog-portal {
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>
