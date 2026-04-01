<template>
  <SelectScrollUpButtonRoot
    data-slot="select-scroll-up-button"
    :class="buttonClasses"
    v-bind="$attrs"
  >
    <ChevronUpIcon class="chevron" />
  </SelectScrollUpButtonRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SelectScrollUpButton } from 'reka-ui'
import { ChevronUp } from 'lucide-vue-next'
import { cn } from '@/utils/cn'

interface SelectScrollUpButtonProps {
  class?: string
}

const props = defineProps<SelectScrollUpButtonProps>()

const SelectScrollUpButtonRoot = SelectScrollUpButton
const ChevronUpIcon = ChevronUp

const buttonClasses = computed(() =>
  cn(
    "flex cursor-default items-center justify-center py-1",
    props.class
  )
)
</script>

<style lang="less" scoped>
.select-scroll-up-button {
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
