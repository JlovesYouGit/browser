<template>
  <Splitpanes
    data-slot="resizable-panel-group"
    :class="groupClasses"
    :horizontal="direction === 'vertical'"
    v-bind="$attrs"
    @resize="$emit('resize', $event)"
    @resized="$emit('resized', $event)"
  >
    <slot />
  </Splitpanes>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Splitpanes } from 'splitpanes'
import { cn } from '@/utils/cn'

interface ResizablePanelGroupProps {
  class?: string
  direction?: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<ResizablePanelGroupProps>(), {
  direction: 'horizontal'
})

const emit = defineEmits<{
  resize: [sizes: number[]]
  resized: [sizes: number[]]
}>()

const groupClasses = computed(() =>
  cn(
    "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
    props.class
  )
)
</script>

<style lang="less" scoped>
.resizable-panel-group {
  display: flex;
  height: 100%;
  width: 100%;
  
  &[data-panel-group-direction="vertical"] {
    flex-direction: column;
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
