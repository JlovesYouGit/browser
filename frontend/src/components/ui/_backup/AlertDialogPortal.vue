<template>
  <AlertDialogPortalPrimitive
    :data-slot="'alert-dialog-portal'"
    v-bind="$attrs"
  >
    <slot />
  </AlertDialogPortalPrimitive>
</template>

<script setup lang="ts">
import { AlertDialogPortal } from 'radix-vue'

// Component props interface
interface AlertDialogPortalProps {
  container?: HTMLElement | null
  forceMount?: boolean
}

// Define props with default values
const props = withDefaults(defineProps<AlertDialogPortalProps>(), {
  forceMount: false
})

// Use Radix Vue AlertDialogPortal under the hood
const AlertDialogPortalPrimitive = AlertDialogPortal

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.alert-dialog-portal {
  // Base portal styles
}
</style>
