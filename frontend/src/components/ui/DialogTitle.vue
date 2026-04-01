<template>
  <DialogTitleRoot
    data-slot="dialog-title"
    :class="titleClasses"
    v-bind="$attrs"
  >
    <slot />
  </DialogTitleRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DialogTitle } from 'reka-ui'
import { cn } from '@/utils/cn'

interface DialogTitleProps {
  class?: string
}

const props = defineProps<DialogTitleProps>()

const DialogTitleRoot = DialogTitle

const titleClasses = computed(() =>
  cn(
    "text-lg leading-none font-semibold",
    props.class
  )
)
</script>

<style lang="less" scoped>
.dialog-title {
  font-size: 1.125rem;
  line-height: 1;
  font-weight: 600;
  
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
