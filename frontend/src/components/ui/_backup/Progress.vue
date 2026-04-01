<template>
  <ProgressRoot
    data-slot="progress"
    :class="progressClasses"
    :value="value"
    :max="max"
    v-bind="$attrs"
  >
    <ProgressIndicator
      data-slot="progress-indicator"
      :class="indicatorClasses"
      :style="indicatorStyle"
    />
  </ProgressRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ProgressRoot, ProgressIndicator } from 'reka-ui'
import { cn } from '@/utils/cn'

interface ProgressProps {
  class?: string
  value?: number
  max?: number
}

const props = withDefaults(defineProps<ProgressProps>(), {
  value: 0,
  max: 100
})

const progressClasses = computed(() =>
  cn(
    "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
    props.class
  )
)

const indicatorClasses = "bg-primary h-full w-full flex-1 transition-all"

const indicatorStyle = computed(() => ({
  transform: `translateX(-${100 - (props.value || 0)}%)`
}))
</script>

<style lang="less" scoped>
.progress {
  background-color: color-mix(in srgb, var(--color-primary) 20%, transparent);
  position: relative;
  height: 0.5rem;
  width: 100%;
  overflow: hidden;
  border-radius: 9999px;
  
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

.progress-indicator {
  background-color: var(--color-primary);
  height: 100%;
  width: 100%;
  flex: 1;
  transition: transform 0.3s ease;
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>
