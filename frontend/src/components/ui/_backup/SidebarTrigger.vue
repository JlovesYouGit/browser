<template>
  <Button
    data-sidebar="trigger"
    data-slot="sidebar-trigger"
    variant="ghost"
    size="icon"
    :class="triggerClasses"
    @click="handleClick"
    v-bind="$attrs"
  >
    <PanelLeftIcon />
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PanelLeft } from 'lucide-vue-next'
import { cn } from '@/utils/cn'
import { useSidebar } from './SidebarContext'
import Button from './Button.vue'

interface SidebarTriggerProps {
  class?: string
}

const props = defineProps<SidebarTriggerProps>()
const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const { toggleSidebar } = useSidebar()

const PanelLeftIcon = PanelLeft

const triggerClasses = computed(() =>
  cn(
    "size-7",
    props.class
  )
)

const handleClick = (event: MouseEvent) => {
  emit('click', event)
  toggleSidebar()
}
</script>

<style lang="less" scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

// High DPI display optimization
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .sidebar-trigger {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Performance optimizations
.sidebar-trigger {
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: auto;
  contain: layout style paint;
}
</style>
