<template>
  <DialogDescriptionRoot
    data-slot="dialog-description"
    :class="descriptionClasses"
    v-bind="$attrs"
  >
    <slot />
  </DialogDescriptionRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DialogDescription } from 'reka-ui'
import { cn } from '@/utils/cn'

interface DialogDescriptionProps {
  class?: string
}

const props = defineProps<DialogDescriptionProps>()

const DialogDescriptionRoot = DialogDescription

const descriptionClasses = computed(() =>
  cn(
    "text-muted-foreground text-sm",
    props.class
  )
)
</script>

<style lang="less" scoped>
.dialog-description {
  color: var(--color-muted-foreground);
  font-size: 0.875rem;
  
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
