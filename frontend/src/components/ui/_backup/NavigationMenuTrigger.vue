<template>
  <NavigationMenuTriggerRoot
    data-slot="navigation-menu-trigger"
    :class="triggerClasses"
    v-bind="$attrs"
  >
    <slot />
    <ChevronDownIcon
      class="chevron"
      aria-hidden="true"
    />
  </NavigationMenuTriggerRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NavigationMenuTrigger } from 'reka-ui'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '@/utils/cn'
import { navigationMenuTriggerStyle } from './NavigationMenuTriggerStyle'

interface NavigationMenuTriggerProps {
  class?: string
}

const props = defineProps<NavigationMenuTriggerProps>()

const NavigationMenuTriggerRoot = NavigationMenuTrigger
const ChevronDownIcon = ChevronDown

const triggerClasses = computed(() =>
  cn(
    navigationMenuTriggerStyle(),
    "group",
    props.class
  )
)
</script>

<style lang="less" scoped>
.navigation-menu-trigger {
  position: relative;
  top: 1px;
  margin-left: 0.25rem;
  width: 0.75rem;
  height: 0.75rem;
  transition: transform 0.3s;
  
  :global(.group[data-state="open"]) & {
    transform: rotate(180deg);
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
