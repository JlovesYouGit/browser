<template>
  <div
    v-if="active && payload?.length"
    :class="tooltipClasses"
  >
    <div v-if="!nestLabel" :class="labelClasses">
      {{ tooltipLabel }}
    </div>
    <div class="grid gap-1.5">
      <div
        v-for="(item, index) in payload"
        :key="item.dataKey"
        :class="itemClasses"
      >
        <template v-if="formatter && item?.value !== undefined && item.name">
          {{ formatter(item.value, item.name, item, index, item.payload) }}
        </template>
        <template v-else>
          <component
            v-if="itemConfig?.icon && !hideIndicator"
            :is="itemConfig.icon"
            class="text-muted-foreground h-2.5 w-2.5 shrink-0"
          />
          <div
            v-else-if="!hideIndicator"
            :class="indicatorClasses"
            :style="indicatorStyles"
          />
          <div :class="contentClasses">
            <div class="grid gap-1.5">
              <div v-if="nestLabel" :class="labelClasses">
                {{ tooltipLabel }}
              </div>
              <span class="text-muted-foreground">
                {{ itemConfig?.label || item.name }}
              </span>
            </div>
            <span
              v-if="item.value"
              class="text-foreground font-mono font-medium tabular-nums"
            >
              {{ formattedValue(item.value) }}
            </span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'
import { useChart, getPayloadConfigFromPayload } from './ChartContext'
import type { ChartConfig } from './ChartContext'

// Component props interface
interface ChartTooltipContentProps {
  active?: boolean
  payload?: any[]
  className?: string
  indicator?: 'line' | 'dot' | 'dashed'
  hideLabel?: boolean
  hideIndicator?: boolean
  label?: string
  labelFormatter?: (value: any, payload: any[]) => string
  labelClassName?: string
  formatter?: (value: any, name: string, item: any, index: number, payload: any) => any
  color?: string
  nameKey?: string
  labelKey?: string
}

// Define props with default values
const props = withDefaults(defineProps<ChartTooltipContentProps>(), {
  indicator: 'dot',
  hideLabel: false,
  hideIndicator: false
})

// Get chart context
const { config } = useChart()

// Computed properties
const tooltipLabel = computed(() => {
  if (props.hideLabel || !props.payload?.length) {
    return null;
  }

  const [item] = props.payload;
  const key = `${props.labelKey || item?.dataKey || item?.name || "value"}`;
  const itemConfig = getPayloadConfigFromPayload(config, item, key);
  const value =
    !props.labelKey && typeof props.label === "string"
      ? config[props.label as keyof typeof config]?.label || props.label
      : itemConfig?.label;

  if (props.labelFormatter) {
    return props.labelFormatter(value, props.payload);
  }

  if (!value) {
    return null;
  }

  return value;
})

const nestLabel = computed(() => props.payload?.length === 1 && props.indicator !== "dot")

const tooltipClasses = computed(() => 
  cn(
    "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
    props.className
  )
)

const labelClasses = computed(() => 
  cn("font-medium", props.labelClassName)
)

const itemClasses = computed(() => 
  cn(
    "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
    props.indicator === "dot" && "items-center"
  )
)

const indicatorClasses = computed(() => 
  cn(
    "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
    {
      "h-2.5 w-2.5": props.indicator === "dot",
      "w-1": props.indicator === "line",
      "w-0 border-[1.5px] border-dashed bg-transparent": props.indicator === "dashed",
      "my-0.5": nestLabel.value && props.indicator === "dashed",
    }
  )
)

const contentClasses = computed(() => 
  cn(
    "flex flex-1 justify-between leading-none",
    nestLabel.value ? "items-end" : "items-center"
  )
)

// Helper function to get item config
const getItemConfig = (item: any) => {
  const key = `${props.nameKey || item.name || item.dataKey || "value"}`;
  return getPayloadConfigFromPayload(config, item, key);
}

// Helper function to get indicator color
const getIndicatorColor = (item: any) => {
  const itemConfig = getItemConfig(item);
  return props.color || item.payload?.fill || item.color;
}

// Computed indicator styles
const indicatorStyles = computed(() => {
  if (!props.payload?.length) return {};
  
  const item = props.payload[0];
  const indicatorColor = getIndicatorColor(item);
  
  return {
    "--color-bg": indicatorColor,
    "--color-border": indicatorColor,
  } as Record<string, string>;
})

// Helper function to format value
const formattedValue = (value: any) => {
  if (typeof value === 'number') {
    return value.toLocaleString();
  }
  return value;
}

// Helper function to get item config for rendering
const itemConfig = computed(() => {
  if (!props.payload?.length) return undefined;
  const item = props.payload[0];
  return getItemConfig(item);
})

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.chart-tooltip-content {
  // Base tooltip content styles
  background-color: var(--color-background);
  border: 1px solid color-mix(in srgb, var(--color-border) 50%, transparent);
  border-radius: 0.5rem;
  padding: 0.375rem 0.625rem;
  font-size: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.375rem;
  align-items: flex-start;
  min-width: 8rem;
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // Reduce animations for tooltip content
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    // Tooltip content styling is theme-agnostic
  }
  
  // Print styles
  @media print {
    // Hide tooltip content in print
    display: none;
    
    // Remove animations in print
    animation: none;
    
    // Remove transitions in print
    transition: none;
    
    // Remove filters in print
    filter: none;
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    // Mobile-specific tooltip content optimizations
    font-size: 0.6875rem;
    padding: 0.3125rem 0.5rem;
    min-width: 6rem;
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    // Small mobile tooltip content optimizations
    font-size: 0.625rem;
    padding: 0.25rem 0.375rem;
    min-width: 5rem;
  }
  
  // Focus management
  &:focus {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  // Performance optimizations
  // Hardware acceleration for smooth transitions
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  
  // Optimize for animations
  will-change: auto;
  
  // Contain layout for performance
  contain: layout style paint;
}

// Tooltip label styles
.tooltip-label {
  font-weight: 500;
  color: var(--color-foreground);
}

// Tooltip item styles
.tooltip-item {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 0.5rem;
  
  // Icon styles
  :deep(svg) {
    color: var(--color-muted-foreground);
    height: 0.625rem;
    width: 0.625rem;
    flex-shrink: 0;
  }
  
  // Dot indicator styles
  &.indicator-dot {
    align-items: center;
  }
}

// Indicator styles
.tooltip-indicator {
  flex-shrink: 0;
  border-radius: 2px;
  border: 1px solid var(--color-border);
  background-color: var(--color-bg);
  
  // Dot indicator
  &.indicator-dot {
    height: 0.625rem;
    width: 0.625rem;
  }
  
  // Line indicator
  &.indicator-line {
    width: 0.25rem;
    height: 0;
  }
  
  // Dashed indicator
  &.indicator-dashed {
    width: 0;
    border-width: 1.5px;
    border-style: dashed;
    background-color: transparent;
    
    &.nested {
      margin: 0.125rem 0;
    }
  }
}

// Content styles
.tooltip-content {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  line-height: 1;
  
  // Nested label alignment
  &.nested {
    align-items: flex-end;
  }
  
  // Regular alignment
  &:not(.nested) {
    align-items: center;
  }
}

// Content grid styles
.content-grid {
  display: grid;
  gap: 0.375rem;
}

// Muted text styles
.muted-text {
  color: var(--color-muted-foreground);
}

// Value text styles
.value-text {
  color: var(--color-foreground);
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

// Animation support
.chart-tooltip-content {
  &.fade-in {
    animation: fadeIn 0.2s ease-out forwards;
  }
  
  &.slide-in {
    animation: slideIn 0.2s ease-out forwards;
  }
  
  &.zoom-in {
    animation: zoomIn 0.2s ease-out forwards;
  }
  
  &.bounce-in {
    animation: bounceIn 0.3s ease-out forwards;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

// Reduced motion support for animations
@media (prefers-reduced-motion: reduce) {
  .chart-tooltip-content {
    &.fade-in,
    &.slide-in,
    &.zoom-in,
    &.bounce-in {
      animation: none;
    }
  }
}

// Hover effects
.chart-tooltip-content {
  &.hover-lift {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
  
  &.hover-grow {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
}

// Focus effects
.chart-tooltip-content {
  &.focus-ring {
    &:focus {
      outline: 2px solid var(--color-ring);
      outline-offset: 2px;
    }
  }
  
  &.focus-inset {
    &:focus {
      outline: 2px solid var(--color-ring);
      outline-offset: -2px;
    }
  }
}

// Loading state
.chart-tooltip-content {
  &.loading {
    opacity: 0.7;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1rem;
      height: 1rem;
      margin: -0.5rem 0 0 -0.5rem;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }
}

@keyframes spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

// Error state
.chart-tooltip-content {
  &.error {
    border-color: var(--color-destructive);
    background-color: color-mix(in srgb, var(--color-destructive) 5%, var(--color-background));
  }
}

// Success state
.chart-tooltip-content {
  &.success {
    border-color: var(--color-chart-2);
    background-color: color-mix(in srgb, var(--color-chart-2) 5%, var(--color-background));
  }
}

// Warning state
.chart-tooltip-content {
  &.warning {
    border-color: var(--color-chart-1);
    background-color: color-mix(in srgb, var(--color-chart-1) 5%, var(--color-background));
  }
}

// Info state
.chart-tooltip-content {
  &.info {
    border-color: var(--color-chart-4);
    background-color: color-mix(in srgb, var(--color-chart-4) 5%, var(--color-background));
  }
}

// Accessibility enhancements
.chart-tooltip-content {
  // Ensure proper color contrast
  color: var(--color-foreground);
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    border: 2px solid currentColor;
    
    &.rounded {
      border-radius: 0;
    }
  }
  
  // Screen reader support
  &.sr-only {
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
}

// RTL support
.chart-tooltip-content {
  [dir="rtl"] & {
    // RTL specific adjustments for tooltip content
    direction: rtl;
  }
}

// Print optimizations
@media print {
  .chart-tooltip-content {
    // Hide tooltip content in print
    display: none;
    
    // Remove animations in print
    animation: none;
    
    // Remove transitions in print
    transition: none;
    
    // Remove filters in print
    filter: none;
  }
}

// High DPI optimizations
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .chart-tooltip-content {
    // Crisp rendering on high DPI displays
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Low bandwidth optimizations
@media (prefers-reduced-data: reduce) {
  .chart-tooltip-content {
    // Optimize for low bandwidth
    // Remove non-essential effects
    filter: none;
    transition: none;
    animation: none;
  }
}

// Color scheme adaptations
@media (prefers-color-scheme: dark) {
  .chart-tooltip-content {
    // Dark mode tooltip content adaptations are handled by CSS variables
  }
}

@media (prefers-color-scheme: light) {
  .chart-tooltip-content {
    // Light mode tooltip content adaptations are handled by CSS variables
  }
}

// Tooltip content with custom size
.chart-tooltip-content {
  &.size-xs {
    font-size: 0.625rem;
    padding: 0.25rem 0.375rem;
    min-width: 5rem;
  }
  
  &.size-sm {
    font-size: 0.6875rem;
    padding: 0.3125rem 0.5rem;
    min-width: 6rem;
  }
  
  &.size-md {
    font-size: 0.75rem;
    padding: 0.375rem 0.625rem;
    min-width: 8rem;
  }
  
  &.size-lg {
    font-size: 0.8125rem;
    padding: 0.4375rem 0.75rem;
    min-width: 10rem;
  }
  
  &.size-xl {
    font-size: 0.875rem;
    padding: 0.5rem 0.875rem;
    min-width: 12rem;
  }
}

// Tooltip content with custom padding
.chart-tooltip-content {
  &.p-0 {
    padding: 0;
  }
  
  &.p-1 {
    padding: 0.25rem;
  }
  
  &.p-2 {
    padding: 0.5rem;
  }
  
  &.p-3 {
    padding: 0.75rem;
  }
  
  &.p-4 {
    padding: 1rem;
  }
}

// Tooltip content with custom border radius
.chart-tooltip-content {
  &.rounded-none {
    border-radius: 0;
  }
  
  &.rounded-sm {
    border-radius: 0.125rem;
  }
  
  &.rounded {
    border-radius: 0.25rem;
  }
  
  &.rounded-md {
    border-radius: 0.375rem;
  }
  
  &.rounded-lg {
    border-radius: 0.5rem;
  }
  
  &.rounded-xl {
    border-radius: 0.75rem;
  }
  
  &.rounded-2xl {
    border-radius: 1rem;
  }
  
  &.rounded-full {
    border-radius: 50%;
  }
}

// Tooltip content with custom shadow
.chart-tooltip-content {
  &.shadow-none {
    box-shadow: none;
  }
  
  &.shadow-sm {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
  
  &.shadow {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }
  
  &.shadow-md {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  
  &.shadow-lg {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  
  &.shadow-xl {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  
  &.shadow-2xl {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
}

// Tooltip content with custom background
.chart-tooltip-content {
  &.bg-transparent {
    background-color: transparent;
  }
  
  &.bg-muted {
    background-color: var(--color-muted);
    color: var(--color-muted-foreground);
  }
  
  &.bg-accent {
    background-color: var(--color-accent);
    color: var(--color-accent-foreground);
  }
  
  &.bg-primary {
    background-color: var(--color-primary);
    color: var(--color-primary-foreground);
  }
  
  &.bg-secondary {
    background-color: var(--color-secondary);
    color: var(--color-secondary-foreground);
  }
  
  &.bg-success {
    background-color: var(--color-chart-2);
    color: white;
  }
  
  &.bg-warning {
    background-color: var(--color-chart-1);
    color: white;
  }
  
  &.bg-info {
    background-color: var(--color-chart-4);
    color: white;
  }
  
  &.bg-error {
    background-color: var(--color-destructive);
    color: var(--color-destructive-foreground);
  }
}

// Tooltip content with custom border
.chart-tooltip-content {
  &.border-none {
    border: none;
  }
  
  &.border {
    border: 1px solid var(--color-border);
  }
  
  &.border-2 {
    border: 2px solid var(--color-border);
  }
  
  &.border-transparent {
    border: 1px solid transparent;
  }
}

// Tooltip content with custom opacity
.chart-tooltip-content {
  &.opacity-0 {
    opacity: 0;
  }
  
  &.opacity-25 {
    opacity: 0.25;
  }
  
  &.opacity-50 {
    opacity: 0.5;
  }
  
  &.opacity-75 {
    opacity: 0.75;
  }
  
  &.opacity-100 {
    opacity: 1;
  }
}

// Tooltip content with custom visibility
.chart-tooltip-content {
  &.visible {
    visibility: visible;
  }
  
  &.invisible {
    visibility: hidden;
  }
  
  &.collapse {
    visibility: collapse;
  }
}

// Tooltip content with custom transition
.chart-tooltip-content {
  &.transition-none {
    transition: none;
  }
  
  &.transition-all {
    transition: all 0.15s ease-in-out;
  }
  
  &.transition-colors {
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
  }
  
  &.transition-opacity {
    transition: opacity 0.15s ease-in-out;
  }
  
  &.transition-shadow {
    transition: box-shadow 0.15s ease-in-out;
  }
  
  &.transition-transform {
    transition: transform 0.15s ease-in-out;
  }
}

// Tooltip content with custom duration
.chart-tooltip-content {
  &.duration-75 {
    transition-duration: 75ms;
  }
  
  &.duration-100 {
    transition-duration: 100ms;
  }
  
  &.duration-150 {
    transition-duration: 150ms;
  }
  
  &.duration-200 {
    transition-duration: 200ms;
  }
  
  &.duration-300 {
    transition-duration: 300ms;
  }
  
  &.duration-500 {
    transition-duration: 500ms;
  }
  
  &.duration-700 {
    transition-duration: 700ms;
  }
  
  &.duration-1000 {
    transition-duration: 1000ms;
  }
}

// Tooltip content with custom ease
.chart-tooltip-content {
  &.ease-linear {
    transition-timing-function: linear;
  }
  
  &.ease-in {
    transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
  }
  
  &.ease-out {
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  
  &.ease-in-out {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
}

// Tooltip content with custom delay
.chart-tooltip-content {
  &.delay-75 {
    transition-delay: 75ms;
  }
  
  &.delay-100 {
    transition-delay: 100ms;
  }
  
  &.delay-150 {
    transition-delay: 150ms;
  }
  
  &.delay-200 {
    transition-delay: 200ms;
  }
  
  &.delay-300 {
    transition-delay: 300ms;
  }
  
  &.delay-500 {
    transition-delay: 500ms;
  }
  
  &.delay-700 {
    transition-delay: 700ms;
  }
  
  &.delay-1000 {
    transition-delay: 1000ms;
  }
}
</style>
