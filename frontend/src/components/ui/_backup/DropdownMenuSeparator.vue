<template>
  <DropdownMenuSeparatorRoot
    data-slot="dropdown-menu-separator"
    :class="separatorClasses"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DropdownMenuSeparator } from 'reka-ui'
import { cn } from '@/utils/cn'

interface DropdownMenuSeparatorProps {
  class?: string
}

const props = defineProps<DropdownMenuSeparatorProps>()

const DropdownMenuSeparatorRoot = DropdownMenuSeparator

const separatorClasses = computed(() =>
  cn(
    "bg-border -mx-1 my-1 h-px",
    props.class
  )
)
</script>

<style lang="less" scoped>
.dropdown-menu-separator {
  background-color: var(--color-border);
  margin-left: -0.25rem;
  margin-right: -0.25rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  height: 1px;
  
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
