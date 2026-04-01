<template>
  <RadioGroupItemRoot
    data-slot="radio-group-item"
    :class="itemClasses"
    v-bind="$attrs"
  >
    <RadioGroupIndicator
      data-slot="radio-group-indicator"
      :class="indicatorClasses"
    >
      <CircleIcon class="circle" />
    </RadioGroupIndicator>
  </RadioGroupItemRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RadioGroupItem, RadioGroupIndicator } from 'reka-ui'
import { Circle } from 'lucide-vue-next'
import { cn } from '@/utils/cn'

interface RadioGroupItemProps {
  class?: string
  value: string
  disabled?: boolean
  required?: boolean
}

const props = defineProps<RadioGroupItemProps>()

const RadioGroupItemRoot = RadioGroupItem
const CircleIcon = Circle

const itemClasses = computed(() =>
  cn(
    "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
    props.class
  )
)

const indicatorClasses = "relative flex items-center justify-center"
</script>

<style lang="less" scoped>
.radio-group-item {
  aspect-ratio: 1;
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  border-radius: 9999px;
  border: 1px solid var(--color-input);
  color: var(--color-primary);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: color 0.15s ease, box-shadow 0.15s ease;
  outline: none;
  
  &:focus-visible {
    border-color: var(--color-ring);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-ring) 50%, transparent);
    outline: none;
  }
  
  &[aria-invalid="true"] {
    border-color: var(--color-destructive);
    
    &:focus-visible {
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-destructive) 20%, transparent);
    }
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: color-mix(in srgb, var(--color-input) 30%, transparent);
    
    &[aria-invalid="true"]:focus-visible {
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-destructive) 40%, transparent);
    }
  }
  
  .radio-group-indicator {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .circle {
      fill: var(--color-primary);
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0.5rem;
      height: 0.5rem;
      transform: translate(-50%, -50%);
    }
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
