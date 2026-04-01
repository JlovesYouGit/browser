<template>
  <!-- Non-collapsible sidebar -->
  <div
    v-if="collapsible === 'none'"
    data-slot="sidebar"
    :class="noneClasses"
    v-bind="$attrs"
  >
    <slot />
  </div>
  
  <!-- Mobile sidebar using Sheet -->
  <Sheet v-else-if="isMobile" v-model:open="openMobile">
    <SheetContent
      data-sidebar="sidebar"
      data-slot="sidebar"
      data-mobile="true"
      :side="side"
      :class="mobileClasses"
      :style="{ '--sidebar-width': '18rem' }"
    >
      <SheetHeader class="sr-only">
        <SheetTitle>Sidebar</SheetTitle>
        <SheetDescription>Displays the mobile sidebar.</SheetDescription>
      </SheetHeader>
      <div class="flex h-full w-full flex-col">
        <slot />
      </div>
    </SheetContent>
  </Sheet>
  
  <!-- Desktop collapsible sidebar -->
  <div
    v-else
    class="group peer text-sidebar-foreground hidden md:block"
    :data-state="state"
    :data-collapsible="state === 'collapsed' ? collapsible : ''"
    :data-variant="variant"
    :data-side="side"
    data-slot="sidebar"
  >
    <!-- Sidebar gap -->
    <div
      data-slot="sidebar-gap"
      :class="gapClasses"
    />
    <!-- Sidebar container -->
    <div
      data-slot="sidebar-container"
      :class="containerClasses"
      v-bind="$attrs"
    >
      <div
        data-sidebar="sidebar"
        data-slot="sidebar-inner"
        :class="innerClasses"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'
import { useSidebar } from './SidebarContext'
import Sheet from './Sheet.vue'
import SheetContent from './SheetContent.vue'
import SheetHeader from './SheetHeader.vue'
import SheetTitle from './SheetTitle.vue'
import SheetDescription from './SheetDescription.vue'

interface SidebarProps {
  class?: string
  side?: 'left' | 'right'
  variant?: 'sidebar' | 'floating' | 'inset'
  collapsible?: 'offcanvas' | 'icon' | 'none'
}

const props = withDefaults(defineProps<SidebarProps>(), {
  side: 'left',
  variant: 'sidebar',
  collapsible: 'offcanvas'
})

const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

const noneClasses = computed(() =>
  cn(
    "bg-sidebar text-sidebar-foreground flex h-full w-[var(--sidebar-width)] flex-col",
    props.class
  )
)

const mobileClasses = computed(() =>
  cn(
    "bg-sidebar text-sidebar-foreground w-[var(--sidebar-width)] p-0 [&>button]:hidden",
    props.class
  )
)

const gapClasses = computed(() =>
  cn(
    "relative w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear",
    "group-data-[collapsible=offcanvas]:w-0",
    "group-data-[side=right]:rotate-180",
    (props.variant === 'floating' || props.variant === 'inset')
      ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)]"
      : "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]"
  )
)

const containerClasses = computed(() =>
  cn(
    "fixed inset-y-0 z-10 hidden h-svh w-[var(--sidebar-width)] transition-[left,right,width] duration-200 ease-linear md:flex",
    props.side === 'left'
      ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
      : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
    (props.variant === 'floating' || props.variant === 'inset')
      ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem+2px)]"
      : "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[side=left]:border-r group-data-[side=right]:border-l",
    props.class
  )
)

const innerClasses = computed(() =>
  cn(
    "bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
  )
)
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
  .sidebar {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Performance optimizations
.sidebar {
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: auto;
  contain: layout style paint;
}
</style>
