<template>
  <AlertDialogTriggerPrimitive
    :data-slot="'alert-dialog-trigger'"
    v-bind="$attrs"
  >
    <slot />
  </AlertDialogTriggerPrimitive>
</template>

<script setup lang="ts">
import { AlertDialogTrigger } from 'radix-vue'

// Component props interface
interface AlertDialogTriggerProps {
  asChild?: boolean
}

// Define props with default values
const props = withDefaults(defineProps<AlertDialogTriggerProps>(), {
  asChild: false
})

// Use Radix Vue AlertDialogTrigger under the hood
const AlertDialogTriggerPrimitive = AlertDialogTrigger

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.alert-dialog-trigger {
  // Base trigger styles
}
</style>
