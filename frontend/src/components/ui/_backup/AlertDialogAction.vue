<template>
  <AlertDialogActionPrimitive
    :class="actionClasses"
    v-bind="$attrs"
  >
    <slot />
  </AlertDialogActionPrimitive>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AlertDialogAction } from 'radix-vue'
import { cn } from '@/utils/cn'
import { buttonVariants } from '@/utils/buttonVariants'

// Component props interface
interface AlertDialogActionProps {
  class?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
  disabled?: boolean
}

// Define props with default values
const props = withDefaults(defineProps<AlertDialogActionProps>(), {
  variant: 'default',
  size: 'default',
  asChild: false,
  disabled: false
})

// Use Radix Vue AlertDialogAction under the hood
const AlertDialogActionPrimitive = AlertDialogAction

// Computed classes
const actionClasses = computed(() => 
  cn(buttonVariants({ variant: props.variant, size: props.size }), props.class)
)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.alert-dialog-action {
  // Base action button styles
  // Styles are handled by buttonVariants utility
}
</style>
