<template>
  <SliderRoot
    data-slot="slider"
    v-model="sliderValue"
    :default-value="defaultValue"
    :min="min"
    :max="max"
    :disabled="disabled"
    :orientation="orientation"
    :class="sliderClasses"
    v-bind="$attrs"
  >
    <SliderTrack
      data-slot="slider-track"
      :class="trackClasses"
    >
      <SliderRange
        data-slot="slider-range"
        :class="rangeClasses"
      />
    </SliderTrack>
    <SliderThumb
      v-for="(thumbValue, index) in thumbValues"
      :key="index"
      data-slot="slider-thumb"
      :class="thumbClasses"
    />
  </SliderRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SliderRoot, SliderTrack, SliderRange, SliderThumb } from 'reka-ui'
import { cn } from '@/utils/cn'

interface SliderProps {
  class?: string
  modelValue?: number[]
  defaultValue?: number[]
  min?: number
  max?: number
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<SliderProps>(), {
  min: 0,
  max: 100,
  orientation: 'horizontal'
})

const emit = defineEmits<{
  'update:modelValue': [value: number[]]
}>()

const sliderValue = computed({
  get: () => props.modelValue ?? props.defaultValue ?? [props.min, props.max],
  set: (value: number[]) => emit('update:modelValue', value)
})

const thumbValues = computed(() => sliderValue.value)

const sliderClasses = computed(() =>
  cn(
    "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
    props.class
  )
)

const trackClasses = computed(() =>
  cn(
    "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-4 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
  )
)

const rangeClasses = computed(() =>
  cn(
    "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
  )
)

const thumbClasses = computed(() =>
  cn(
    "border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
  )
)
</script>

<style lang="less" scoped>
.slider {
  position: relative;
  display: flex;
  width: 100%;
  touch-action: none;
  align-items: center;
  user-select: none;
  
  &[data-disabled] {
    opacity: 0.5;
  }
  
  &[data-orientation="vertical"] {
    height: 100%;
    min-height: 11rem;
    width: auto;
    flex-direction: column;
  }
  
  .slider-track {
    background-color: var(--color-muted);
    position: relative;
    flex-grow: 1;
    overflow: hidden;
    border-radius: 9999px;
    
    &[data-orientation="horizontal"] {
      height: 1rem;
      width: 100%;
    }
    
    &[data-orientation="vertical"] {
      height: 100%;
      width: 0.375rem;
    }
    
    .slider-range {
      background-color: var(--color-primary);
      position: absolute;
      
      &[data-orientation="horizontal"] {
        height: 100%;
      }
      
      &[data-orientation="vertical"] {
        width: 100%;
      }
    }
  }
  
  .slider-thumb {
    border: 1px solid var(--color-primary);
    background-color: var(--color-background);
    display: block;
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    border-radius: 9999px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transition: color 0.15s ease, box-shadow 0.15s ease;
    outline: none;
    cursor: pointer;
    
    &:hover {
      box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-ring) 50%, transparent);
    }
    
    &:focus-visible {
      box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-ring) 50%, transparent);
      outline: none;
    }
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
      pointer-events: none;
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
