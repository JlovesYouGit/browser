<template>
  <AccordionRoot
    :data-slot="'accordion'"
    v-bind="$attrs"
    :class="accordionClasses"
  >
    <slot />
  </AccordionRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AccordionRoot } from 'radix-vue'
import { cn } from '@/utils/cn'

// Component props interface
interface AccordionProps {
  class?: string
  type?: 'single' | 'multiple'
  collapsible?: boolean
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  disabled?: boolean
  dir?: 'ltr' | 'rtl'
  orientation?: 'vertical' | 'horizontal'
}

// Define props with default values
const props = withDefaults(defineProps<AccordionProps>(), {
  type: 'single',
  collapsible: true,
  disabled: false,
  dir: 'ltr',
  orientation: 'vertical'
})

// Component emits
const emit = defineEmits<{
  valueChange: [value: string | string[]]
}>()

// Computed classes
const accordionClasses = computed(() => cn(props.class))

// Handle value change
const handleValueChange = (value: string | string[]) => {
  emit('valueChange', value)
  props.onValueChange?.(value)
}

// Expose methods
defineExpose({
  handleValueChange
})
</script>

<style lang="less" scoped>
.accordion {
  // Base accordion styles
}
</style>
