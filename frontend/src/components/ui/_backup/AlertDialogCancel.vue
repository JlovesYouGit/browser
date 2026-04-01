<template>
  <AlertDialogCancelPrimitive
    :class="cancelClasses"
    v-bind="$attrs"
  >
    <slot />
  </AlertDialogCancelPrimitive>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AlertDialogCancel } from 'radix-vue'
import { cn } from '@/utils/cn'
import { buttonVariants } from '@/utils/buttonVariants'

// Component props interface
interface AlertDialogCancelProps {
  class?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
  disabled?: boolean
}

// Define props with default values
const props = withDefaults(defineProps<AlertDialogCancelProps>(), {
  variant: 'outline',
  size: 'default',
  asChild: false,
  disabled: false
})

// Use Radix Vue AlertDialogCancel under the hood
const AlertDialogCancelPrimitive = AlertDialogCancel

// Computed classes
const cancelClasses = computed(() => 
  cn(buttonVariants({ variant: props.variant, size: props.size }), props.class)
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.alert-dialog-cancel {
  // Base cancel button styles
  // Styles are handled by buttonVariants utility
}
</style>
