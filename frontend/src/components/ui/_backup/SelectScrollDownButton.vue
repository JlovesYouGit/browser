<template>
  <SelectScrollDownButtonRoot
    data-slot="select-scroll-down-button"
    :class="buttonClasses"
    v-bind="$attrs"
  >
    <ChevronDownIcon class="chevron" />
  </SelectScrollDownButtonRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SelectScrollDownButton } from 'reka-ui'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '@/utils/cn'

interface SelectScrollDownButtonProps {
  class?: string
}

const props = defineProps<SelectScrollDownButtonProps>()

const SelectScrollDownButtonRoot = SelectScrollDownButton
const ChevronDownIcon = ChevronDown

const buttonClasses = computed(() =>
  cn(
    "flex cursor-default items-center justify-center py-1",
    props.class
  )
)
</script>

<style lang="less" scoped>
.select-scroll-down-button {
  display: flex;
  cursor: default;
  align-items: center;
  justify-content: center;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  
  .chevron {
    width: 1rem;
    height: 1rem;
  }
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Performance optimizations
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: auto;
  contain: layout style paint;
}
</style>
