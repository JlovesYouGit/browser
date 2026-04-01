<template>
  <div
    data-slot="input-otp-slot"
    :data-active="isActive"
    :class="slotClasses"
    v-bind="$attrs"
  >
    {{ char }}
    <div v-if="hasFakeCaret" class="caret-container">
      <div class="caret" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, type InjectionKey } from 'vue'
import { cn } from '@/utils/cn'

// Define the context interface for OTP slots
interface OTPSlotContext {
  slots: Array<{
    char: string | null
    hasFakeCaret: boolean
    isActive: boolean
  }>
}

export const OTPInputContextKey: InjectionKey<OTPSlotContext> = Symbol('input-otp')

interface InputOTPSlotProps {
  class?: string
  index: number
}

const props = defineProps<InputOTPSlotProps>()

// Inject the OTP context from the parent InputOTP component
const otpContext = inject(OTPInputContextKey, { slots: [] })

const slotData = computed(() => {
  return otpContext.slots[props.index] || {
    char: null,
    hasFakeCaret: false,
    isActive: false
  }
})

const char = computed(() => slotData.value.char)
const hasFakeCaret = computed(() => slotData.value.hasFakeCaret)
const isActive = computed(() => slotData.value.isActive)

const slotClasses = computed(() =>
  cn(
    "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm bg-input-background transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
    props.class
  )
)
</script>

<style lang="less" scoped>
.input-otp-slot {
  position: relative;
  display: flex;
  height: 2.25rem;
  width: 2.25rem;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--color-input);
  border-bottom: 1px solid var(--color-input);
  border-right: 1px solid var(--color-input);
  font-size: 0.875rem;
  background-color: var(--color-input);
  transition: all 0.15s ease;
  outline: none;
  
  &:first-child {
    border-radius: 0.375rem 0 0 0.375rem;
    border-left: 1px solid var(--color-input);
  }
  
  &:last-child {
    border-radius: 0 0.375rem 0.375rem 0;
  }
  
  &[data-active="true"] {
    z-index: 10;
    border-color: var(--color-ring);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-ring) 50%, transparent);
    
    &[aria-invalid="true"] {
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-destructive) 20%, transparent);
    }
  }
  
  &[aria-invalid="true"] {
    border-color: var(--color-destructive);
    
    &[data-active="true"] {
      border-color: var(--color-destructive);
    }
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: color-mix(in srgb, var(--color-input) 30%, transparent);
    
    &[data-active="true"][aria-invalid="true"] {
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-destructive) 40%, transparent);
    }
  }
  
  // Caret container
  .caret-container {
    pointer-events: none;
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .caret {
      background-color: var(--color-foreground);
      height: 1rem;
      width: 1px;
      animation: caret-blink 1s ease-in-out infinite;
    }
  }
  
  @keyframes caret-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    .caret {
      animation: none;
    }
  }
  
  // Performance optimizations
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: auto;
  contain: layout style paint;
}
</style>
