<template>
  <div v-if="didError" :class="containerClasses" :style="style" class="inline-block bg-gray-100 text-center align-middle">
    <div class="flex items-center justify-center w-full h-full">
      <img 
        :src="ERROR_IMG_SRC" 
        alt="Error loading image" 
        v-bind="$attrs"
        :data-original-url="src"
      />
    </div>
  </div>
  <img 
    v-else
    :src="src" 
    :alt="alt" 
    :class="className" 
    :style="style" 
    v-bind="$attrs"
    @error="handleError"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Component props interface
interface ImageWithFallbackProps {
  src: string
  alt?: string
  class?: string
  style?: string | Record<string, any>
  width?: string | number
  height?: string | number
}

// Define props with TypeScript support
const props = withDefaults(defineProps<ImageWithFallbackProps>(), {
  alt: '',
  class: '',
  style: '',
  width: undefined,
  height: undefined,
})

// Reactive error state
const didError = ref(false)

// Error image placeholder (base64 encoded SVG)
const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

// Computed class name for error container
const containerClasses = computed(() => props.class)

// Error handler function
const handleError = () => {
  didError.value = true
}

// Expose methods and state to parent components
defineExpose({
  didError,
  resetError: () => {
    didError.value = false
  }
})
</script>

<style lang="less" scoped>
.inline-block {
  display: inline-block;
}

.bg-gray-100 {
  background-color: #f3f4f6;
}

.text-center {
  text-align: center;
}

.align-middle {
  vertical-align: middle;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}
</style>
