<template>
  <TabsRoot
    data-slot="tabs"
    :class="tabsClasses"
    v-model="modelValue"
    :default-value="defaultValue"
    :orientation="orientation"
    :dir="dir"
    :activation-mode="activationMode"
    v-bind="$attrs"
  >
    <slot />
  </TabsRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TabsRoot } from 'reka-ui'
import { cn } from '@/utils/cn'

interface TabsProps {
  class?: string
  modelValue?: string
  defaultValue?: string
  orientation?: 'horizontal' | 'vertical'
  dir?: 'ltr' | 'rtl'
  activationMode?: 'automatic' | 'manual'
}

const props = defineProps<TabsProps>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const tabsClasses = computed(() =>
  cn(
    "flex flex-col gap-2",
    props.class
  )
)
</script>

<style lang="less" scoped>
.tabs {
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
