<template>
  <Input
    data-slot="sidebar-input"
    data-sidebar="input"
    :class="inputClasses"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'
import Input from './Input.vue'

interface SidebarInputProps {
  class?: string
}

const props = defineProps<SidebarInputProps>()

const inputClasses = computed(() =>
  cn(
    "bg-background h-8 w-full shadow-none",
    props.class
  )
)
</script>

<style lang="less" scoped>
.sidebar-input {
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
