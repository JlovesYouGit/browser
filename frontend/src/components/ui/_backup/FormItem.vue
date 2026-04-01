<template>
  <div
    data-slot="form-item"
    :class="itemClasses"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { cn } from '@/utils/cn'
import { provideFormItem } from './FormContext'

interface FormItemProps {
  class?: string
}

const props = defineProps<FormItemProps>()

// Generate unique ID
const id = `form-item-${Math.random().toString(36).slice(2, 9)}`

// Provide form item context
onMounted(() => {
  provideFormItem({ id })
})

const itemClasses = computed(() =>
  cn(
    "grid gap-2",
    props.class
  )
)
</script>

<style lang="less" scoped>
.form-item {
  display: grid;
  gap: 0.5rem;
  
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
