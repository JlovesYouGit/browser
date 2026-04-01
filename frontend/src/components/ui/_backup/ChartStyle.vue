<template>
  <style v-if="hasColorConfig" v-html="styleContent"></style>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ChartConfig } from './ChartContext'

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: '', dark: '.dark' } as const

// Component props interface
interface ChartStyleProps {
  id: string
  config: ChartConfig
}

// Define props
const props = defineProps<ChartStyleProps>()

// Computed properties
const colorConfig = computed(() => 
  Object.entries(props.config).filter(
    ([, config]) => config.theme || config.color,
  )
)

const hasColorConfig = computed(() => colorConfig.value.length > 0)

const styleContent = computed(() => {
  if (!hasColorConfig.value) return ''
  
  return Object.entries(THEMES)
    .map(
      ([theme, prefix]) => `
${prefix} [data-chart=${props.id}] {
${colorConfig.value
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join('\n')}
}
`,
    )
    .join('\n')
})

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
// Chart style component is primarily for dynamic CSS generation
// No static styles needed
</style>
