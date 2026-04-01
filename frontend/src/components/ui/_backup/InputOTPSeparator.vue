<template>
  <div
    data-slot="input-otp-separator"
    role="separator"
    v-bind="$attrs"
  >
    <MinusIcon />
  </div>
</template>

<script setup lang="ts">
import { Minus } from 'lucide-vue-next'

const MinusIcon = Minus
</script>

<style lang="less" scoped>
.input-otp-separator {
  display: flex;
  align-items: center;
  justify-content: center;
  
  :deep(svg) {
    width: 1rem;
    height: 1rem;
    color: var(--color-muted-foreground);
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
