<template>
  <div
    v-if="withHandle"
    data-slot="resizable-handle"
    :class="handleClasses"
  >
    <div class="handle-grip">
      <GripVerticalIcon class="grip-icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { GripVertical } from 'lucide-vue-next'
import { cn } from '@/utils/cn'

interface ResizableHandleProps {
  class?: string
  withHandle?: boolean
}

const props = defineProps<ResizableHandleProps>()

const GripVerticalIcon = GripVertical

const handleClasses = computed(() =>
  cn(
    "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
    props.class
  )
)
</script>

<style lang="less" scoped>
.resizable-handle {
  background-color: var(--color-border);
  position: relative;
  display: flex;
  width: 1px;
  align-items: center;
  justify-content: center;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 0.25rem;
    transform: translateX(-50%);
  }
  
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 1px var(--color-ring);
    ring-offset: 1px;
  }
  
  &[data-panel-group-direction="vertical"] {
    height: 1px;
    width: 100%;
    
    &::after {
      left: 0;
      height: 0.25rem;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
    
    > div {
      transform: rotate(90deg);
    }
  }
  
  .handle-grip {
    background-color: var(--color-border);
    z-index: 10;
    display: flex;
    height: 1rem;
    width: 0.75rem;
    align-items: center;
    justify-content: center;
    border-radius: 0.125rem;
    border: 1px solid var(--color-border);
    
    .grip-icon {
      width: 0.625rem;
      height: 0.625rem;
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
