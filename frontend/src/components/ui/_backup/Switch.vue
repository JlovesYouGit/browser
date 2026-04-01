<template>
  <SwitchRoot
    data-slot="switch"
    v-model="switchValue"
    :disabled="disabled"
    :class="switchClasses"
    v-bind="$attrs"
  >
    <SwitchThumb
      data-slot="switch-thumb"
      :class="thumbClasses"
    />
  </SwitchRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SwitchRoot, SwitchThumb } from 'reka-ui'
import { cn } from '@/utils/cn'

interface SwitchProps {
  class?: string
  modelValue?: boolean
  defaultValue?: boolean
  disabled?: boolean
  required?: boolean
}

const props = defineProps<SwitchProps>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const switchValue = computed({
  get: () => props.modelValue ?? props.defaultValue ?? false,
  set: (value: boolean) => emit('update:modelValue', value)
})

const switchClasses = computed(() =>
  cn(
    "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-switch-background focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
    props.class
  )
)

const thumbClasses = computed(() =>
  cn(
    "bg-card dark:data-[state=unchecked]:bg-card-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
  )
)
</script>

<style lang="less" scoped>
.switch {
  display: inline-flex;
  height: 1.15rem;
  width: 2rem;
  flex-shrink: 0;
  align-items: center;
  border-radius: 9999px;
  border: 1px solid transparent;
  transition: all 0.15s ease;
  outline: none;
  cursor: pointer;
  
  &[data-state="checked"] {
    background-color: var(--color-primary);
  }
  
  &[data-state="unchecked"] {
    background-color: var(--color-switch-background);
  }
  
  @media (prefers-color-scheme: dark) {
    &[data-state="unchecked"] {
      background-color: color-mix(in srgb, var(--color-input) 80%, transparent);
    }
  }
  
  &:focus-visible {
    border-color: var(--color-ring);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-ring) 50%, transparent);
    outline: none;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  .switch-thumb {
    background-color: var(--color-card);
    pointer-events: none;
    display: block;
    width: 1rem;
    height: 1rem;
    border-radius: 9999px;
    box-shadow: 0 0 0 0 transparent;
    transition: transform 0.15s ease;
    
    @media (prefers-color-scheme: dark) {
      &[data-state="unchecked"] {
        background-color: var(--color-card-foreground);
      }
      
      &[data-state="checked"] {
        background-color: var(--color-primary-foreground);
      }
    }
    
    &[data-state="checked"] {
      transform: translateX(calc(100% - 2px));
    }
    
    &[data-state="unchecked"] {
      transform: translateX(0);
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
