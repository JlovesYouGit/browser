<template>
  <AlertDialogRoot
    :data-slot="'alert-dialog'"
    v-bind="$attrs"
  >
    <slot />
  </AlertDialogRoot>
</template>

<script setup lang="ts">
import { AlertDialog as AlertDialogRoot } from 'radix-vue'

// Component props interface
interface AlertDialogProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

// Define props with default values
const props = withDefaults(defineProps<AlertDialogProps>(), {
  open: undefined,
  defaultOpen: false
})

// Component emits
const emit = defineEmits<{
  openChange: [open: boolean]
}>()

// Handle open change
const handleOpenChange = (open: boolean) => {
  emit('openChange', open)
  props.onOpenChange?.(open)
}

// Expose methods
defineExpose({
  handleOpenChange
})
</script>

<style lang="less" scoped>
.alert-dialog {
  // Base alert dialog styles
}
</style>
