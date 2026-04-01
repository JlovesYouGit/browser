<template>
  <p
    data-slot="form-description"
    :id="formDescriptionId"
    :class="descriptionClasses"
    v-bind="$attrs"
  >
    <slot />
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'
import { useFormField } from './FormContext'

interface FormDescriptionProps {
  class?: string
}

const props = defineProps<FormDescriptionProps>()

const { formDescriptionId } = useFormField()

const descriptionClasses = computed(() =>
  cn(
    "text-muted-foreground text-sm",
    props.class
  )
)
</script>

<style lang="less" scoped>
.form-description {
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
