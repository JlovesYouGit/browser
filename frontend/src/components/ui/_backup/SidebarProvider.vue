<template>
  <TooltipProvider delay-duration="0">
    <div
      data-slot="sidebar-wrapper"
      :style="wrapperStyle"
      :class="wrapperClasses"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </TooltipProvider>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { TooltipProvider } from 'reka-ui'
import { cn } from '@/utils/cn'
import { useIsMobile } from '@/composables/useIsMobile'
import { provideSidebar, SIDEBAR_COOKIE_NAME, SIDEBAR_COOKIE_MAX_AGE, SIDEBAR_KEYBOARD_SHORTCUT } from './SidebarContext'

interface SidebarProviderProps {
  class?: string
  style?: Record<string, string>
  defaultOpen?: boolean
  modelValue?: boolean
}

const props = withDefaults(defineProps<SidebarProviderProps>(), {
  defaultOpen: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const isMobile = useIsMobile()
const openMobile = ref(false)

// Internal state
const _open = ref(props.defaultOpen)
const open = computed({
  get: () => props.modelValue !== undefined ? props.modelValue : _open.value,
  set: (value: boolean) => {
    if (props.modelValue !== undefined) {
      emit('update:modelValue', value)
    } else {
      _open.value = value
    }
    // Set cookie
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
  }
})

const state = computed(() => open.value ? 'expanded' : 'collapsed')

const setOpen = (value: boolean) => {
  open.value = value
}

const setOpenMobile = (value: boolean) => {
  openMobile.value = value
}

const toggleSidebar = () => {
  if (isMobile.value) {
    openMobile.value = !openMobile.value
  } else {
    open.value = !open.value
  }
}

// Keyboard shortcut
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
    event.preventDefault()
    toggleSidebar()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

// Provide context
provideSidebar({
  state,
  open,
  setOpen,
  openMobile,
  setOpenMobile,
  isMobile,
  toggleSidebar
})

const wrapperStyle = computed(() => ({
  '--sidebar-width': '16rem',
  '--sidebar-width-icon': '3rem',
  ...props.style
}))

const wrapperClasses = computed(() =>
  cn(
    "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
    props.class
  )
)
</script>

<style lang="less" scoped>
.sidebar-wrapper {
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
