<template>
  <AccordionItemPrimitive
    :data-slot="'accordion-item'"
    :class="cn('border-b last:border-b-0', className)"
    v-bind="$attrs"
  >
    <slot />
  </AccordionItemPrimitive>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AccordionItem } from 'radix-vue'
import { cn } from '@/utils/cn'

// Component props interface
interface AccordionItemProps {
  class?: string
  value?: string
  disabled?: boolean
}

// Define props with default values
const props = withDefaults(defineProps<AccordionItemProps>(), {
  disabled: false
})

// Use Radix Vue AccordionItem under the hood
const AccordionItemPrimitive = AccordionItem

// Computed classes
const className = computed(() => props.class)

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.accordion-item {
  // Base accordion item styles
  border-bottom: 1px solid var(--color-border);
  
  &:last-child {
    border-bottom: none;
  }
}
</style>
