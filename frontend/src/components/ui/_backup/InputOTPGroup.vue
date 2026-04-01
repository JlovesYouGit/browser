<template>
  <div
    data-slot="input-otp-group"
    :class="groupClasses"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface InputOTPGroupProps {
  class?: string
}

const props = defineProps<InputOTPGroupProps>()

const groupClasses = computed(() =>
  cn(
    "flex items-center gap-1",
    props.class
  )
)
</script>

<style lang="less" scoped>
.input-otp-group {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
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
