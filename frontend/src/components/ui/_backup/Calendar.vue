<template>
  <DayPicker
    :show-outside-days="showOutsideDays"
    :class="calendarClasses"
    :class-names="mergedClassNames"
    v-bind="$attrs"
  >
    <template #IconLeft="{ className, ...iconProps }">
      <ChevronLeftIcon :class="cn('size-4', className)" v-bind="iconProps" />
    </template>
    <template #IconRight="{ className, ...iconProps }">
      <ChevronRightIcon :class="cn('size-4', className)" v-bind="iconProps" />
    </template>
  </DayPicker>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DayPicker } from 'v-day-picker'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { cn } from '@/utils/cn'
import { buttonVariants } from '@/utils/buttonVariants'

// Component props interface
interface CalendarProps {
  class?: string
  classNames?: {
    months?: string
    month?: string
    caption?: string
    caption_label?: string
    nav?: string
    nav_button?: string
    nav_button_previous?: string
    nav_button_next?: string
    table?: string
    head_row?: string
    head_cell?: string
    row?: string
    cell?: string
    day?: string
    day_range_start?: string
    day_range_end?: string
    day_selected?: string
    day_today?: string
    day_outside?: string
    day_disabled?: string
    day_range_middle?: string
    day_hidden?: string
  }
  showOutsideDays?: boolean
  mode?: 'single' | 'multiple' | 'range'
}

// Define props with default values
const props = withDefaults(defineProps<CalendarProps>(), {
  showOutsideDays: true,
  mode: 'single'
})

// Use ChevronLeft and ChevronRight icons
const ChevronLeftIcon = ChevronLeft
const ChevronRightIcon = ChevronRight

// Computed calendar classes
const calendarClasses = computed(() => 
  cn("p-3", props.class)
)

// Default class names for calendar components
const defaultClassNames = {
  months: "flex flex-col sm:flex-row gap-2",
  month: "flex flex-col gap-4",
  caption: "flex justify-center pt-1 relative items-center w-full",
  caption_label: "text-sm font-medium",
  nav: "flex items-center gap-1",
  nav_button: cn(
    buttonVariants({ variant: "outline" }),
    "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
  ),
  nav_button_previous: "absolute left-1",
  nav_button_next: "absolute right-1",
  table: "w-full border-collapse space-x-1",
  head_row: "flex",
  head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
  row: "flex w-full mt-2",
  cell: cn(
    "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
    props.mode === "range"
      ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
      : "[&:has([aria-selected])]:rounded-md",
  ),
  day: cn(
    buttonVariants({ variant: "ghost" }),
    "size-8 p-0 font-normal aria-selected:opacity-100",
  ),
  day_range_start: "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
  day_range_end: "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
  day_today: "bg-accent text-accent-foreground",
  day_outside: "day-outside text-muted-foreground aria-selected:text-muted-foreground",
  day_disabled: "text-muted-foreground opacity-50",
  day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
  day_hidden: "invisible",
}

// Merge custom class names with defaults
const mergedClassNames = computed(() => ({
  ...defaultClassNames,
  ...props.classNames,
}))

// Expose methods
defineExpose({})
</script>

<style lang="less" scoped>
.calendar {
  // Base calendar styles
  padding: 0.75rem;
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // No animations needed for calendar
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    // Calendar styling is theme-agnostic
  }
  
  // Print styles
  @media print {
    // Ensure calendar prints correctly
    border: 1px solid #000;
    
    // Remove animations in print
    animation: none;
    
    // Remove transitions in print
    transition: none;
    
    // Remove filters in print
    filter: none;
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    padding: 0.5rem;
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    padding: 0.375rem;
  }
  
  // Focus management
  &:focus {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
  
  // Size variants
  &.size-sm {
    padding: 0.5rem;
    
    .day {
      width: 2rem;
      height: 2rem;
      font-size: 0.75rem;
    }
  }
  
  &.size-lg {
    padding: 1rem;
    
    .day {
      width: 3rem;
      height: 3rem;
      font-size: 1rem;
    }
  }
  
  // Border variants
  &.border-none {
    border: none;
  }
  
  &.border {
    border: 1px solid var(--color-border);
  }
  
  &.border-2 {
    border: 2px solid var(--color-border);
  }
  
  // Shadow variants
  &.shadow-none {
    box-shadow: none;
  }
  
  &.shadow-sm {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
  
  &.shadow {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }
  
  &.shadow-lg {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  
  // Background variants
  &.bg-muted {
    background-color: var(--color-muted);
  }
  
  &.bg-card {
    background-color: var(--color-card);
  }
  
  &.bg-background {
    background-color: var(--color-background);
  }
  
  // Rounded variants
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
  
  // Performance optimizations
  // Hardware acceleration for smooth transitions
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  
  // Optimize for animations
  will-change: auto;
  
  // Contain layout for performance
  contain: layout style paint;
}

// Calendar months layout
.calendar {
  .months {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    @media (min-width: 640px) {
      flex-direction: row;
    }
  }
  
  .month {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

// Calendar caption (header)
.calendar {
  .caption {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 0.25rem;
    position: relative;
  }
  
  .caption_label {
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .nav {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  
  .nav_button {
    width: 1.75rem;
    height: 1.75rem;
    background-color: transparent;
    border: 1px solid var(--color-border);
    padding: 0;
    opacity: 0.5;
    transition: opacity 0.2s ease;
    
    &:hover:not(:disabled) {
      opacity: 1;
    }
    
    &:focus-visible {
      outline: 2px solid var(--color-ring);
      outline-offset: 2px;
    }
    
    &.nav_button_previous {
      position: absolute;
      left: 0.25rem;
    }
    
    &.nav_button_next {
      position: absolute;
      right: 0.25rem;
    }
  }
}

// Calendar table layout
.calendar {
  .table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0.25rem;
  }
  
  .head_row {
    display: flex;
    width: 100%;
  }
  
  .head_cell {
    color: var(--color-muted-foreground);
    border-radius: 0.375rem;
    width: 2rem;
    font-weight: 400;
    font-size: 0.8rem;
    text-align: center;
    padding: 0.25rem 0;
  }
  
  .row {
    display: flex;
    width: 100%;
    margin-top: 0.5rem;
  }
  
  .cell {
    position: relative;
    padding: 0;
    text-align: center;
    font-size: 0.875rem;
    
    // Focus within cell
    &:focus-within {
      position: relative;
      z-index: 20;
    }
    
    // Selected day background
    &:has([aria-selected="true"]) {
      background-color: var(--color-accent);
    }
    
    // Range end styling
    &:has([aria-selected="true"].day-range-end) {
      border-radius: 0 0.375rem 0.375rem 0;
    }
    
    // Range mode specific styling
    &[data-mode="range"] {
      &:has(.day-range-end) {
        border-radius: 0 0.375rem 0.375rem 0;
      }
      
      &:has(.day-range-start) {
        border-radius: 0.375rem 0 0 0.375rem;
      }
      
      &:first-child:has([aria-selected="true"]) {
        border-radius: 0.375rem 0 0 0.375rem;
      }
      
      &:last-child:has([aria-selected="true"]) {
        border-radius: 0 0.375rem 0.375rem 0;
      }
    }
    
    // Single mode styling
    &:not([data-mode="range"]):has([aria-selected="true"]) {
      border-radius: 0.375rem;
    }
  }
  
  .day {
    width: 2rem;
    height: 2rem;
    padding: 0;
    font-weight: 400;
    background-color: transparent;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover:not(:disabled) {
      background-color: var(--color-accent);
      color: var(--color-accent-foreground);
    }
    
    &:focus-visible {
      outline: 2px solid var(--color-ring);
      outline-offset: 2px;
    }
    
    // Selected state
    &[aria-selected="true"] {
      opacity: 1;
    }
    
    // Range start
    &.day_range_start {
      background-color: var(--color-primary);
      color: var(--color-primary-foreground);
      
      &:hover {
        background-color: var(--color-primary);
        color: var(--color-primary-foreground);
      }
      
      &:focus {
        background-color: var(--color-primary);
        color: var(--color-primary-foreground);
      }
    }
    
    // Range end
    &.day_range_end {
      background-color: var(--color-primary);
      color: var(--color-primary-foreground);
      
      &:hover {
        background-color: var(--color-primary);
        color: var(--color-primary-foreground);
      }
      
      &:focus {
        background-color: var(--color-primary);
        color: var(--color-primary-foreground);
      }
    }
    
    // Selected day
    &.day_selected {
      background-color: var(--color-primary);
      color: var(--color-primary-foreground);
      
      &:hover {
        background-color: var(--color-primary);
        color: var(--color-primary-foreground);
      }
      
      &:focus {
        background-color: var(--color-primary);
        color: var(--color-primary-foreground);
      }
    }
    
    // Today
    &.day_today {
      background-color: var(--color-accent);
      color: var(--color-accent-foreground);
    }
    
    // Outside days
    &.day_outside {
      color: var(--color-muted-foreground);
      
      &[aria-selected="true"] {
        color: var(--color-muted-foreground);
      }
    }
    
    // Disabled days
    &.day_disabled {
      color: var(--color-muted-foreground);
      opacity: 0.5;
      cursor: not-allowed;
      
      &:hover {
        background-color: transparent;
        color: var(--color-muted-foreground);
      }
    }
    
    // Range middle
    &.day_range_middle {
      background-color: var(--color-accent);
      color: var(--color-accent-foreground);
    }
    
    // Hidden days
    &.day_hidden {
      visibility: hidden;
    }
  }
}

// Animation support
.calendar {
  &.fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  &.slide-in {
    animation: slideIn 0.3s ease-out forwards;
  }
  
  &.zoom-in {
    animation: zoomIn 0.3s ease-out forwards;
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

// Reduced motion support for animations
@media (prefers-reduced-motion: reduce) {
  .calendar {
    &.fade-in,
    &.slide-in,
    &.zoom-in {
      animation: none;
    }
  }
}

// Hover effects
.calendar {
  &.hover-lift {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
  
  &.hover-grow {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(1.02);
    }
  }
}

// Focus effects
.calendar {
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
.calendar {
  &.loading {
    opacity: 0.7;
    pointer-events: none;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1.5rem;
      height: 1.5rem;
      margin: -0.75rem 0 0 -0.75rem;
      border: 2px solid var(--color-primary);
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
.calendar {
  &.error {
    border-color: var(--color-destructive);
    
    .day {
      &:hover:not(:disabled) {
        background-color: color-mix(in srgb, var(--color-destructive) 10%, transparent);
        color: var(--color-destructive);
      }
    }
  }
}

// Success state
.calendar {
  &.success {
    border-color: var(--color-chart-2);
    
    .day_selected {
      background-color: var(--color-chart-2);
      color: white;
    }
  }
}

// Accessibility enhancements
.calendar {
  // Ensure proper color contrast
  color: var(--color-foreground);
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    border: 2px solid currentColor;
    
    &.rounded {
      border-radius: 0;
    }
    
    .day {
      border: 1px solid currentColor;
      
      &:hover:not(:disabled) {
        border-color: currentColor;
      }
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
.calendar {
  [dir="rtl"] & {
    .nav_button_previous {
      left: auto;
      right: 0.25rem;
    }
    
    .nav_button_next {
      right: auto;
      left: 0.25rem;
    }
    
    .table {
      direction: rtl;
    }
  }
}

// Print optimizations
@media print {
  .calendar {
    // Ensure calendar prints correctly
    border: 1px solid #000;
    background: white;
    color: #000;
    
    // Remove animations in print
    animation: none;
    
    // Remove transitions in print
    transition: none;
    
    // Remove filters in print
    filter: none;
    
    // Ensure proper print layout
    break-inside: avoid;
    
    .day {
      border: 1px solid #ccc;
      
      &:hover {
        background: #f0f0f0;
        color: #000;
      }
      
      &.day_selected {
        background: #000;
        color: white;
      }
    }
  }
}

// High DPI optimizations
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .calendar {
    // Crisp rendering on high DPI displays
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Low bandwidth optimizations
@media (prefers-reduced-data: reduce) {
  .calendar {
    // Optimize for low bandwidth
    // Remove non-essential effects
    filter: none;
    transition: none;
    animation: none;
  }
}

// Color scheme adaptations
@media (prefers-color-scheme: dark) {
  .calendar {
    // Dark mode calendar adaptations are handled by CSS variables
  }
}

@media (prefers-color-scheme: light) {
  .calendar {
    // Light mode calendar adaptations are handled by CSS variables
  }
}

// Calendar with custom week numbers
.calendar {
  &.with-week-numbers {
    .head_row {
      .head_cell:first-child {
        color: var(--color-muted-foreground);
        font-weight: 600;
      }
    }
    
    .row {
      .cell:first-child {
        color: var(--color-muted-foreground);
        font-weight: 600;
        font-size: 0.75rem;
      }
    }
  }
}

// Calendar with custom time zones
.calendar {
  &.with-time-zone {
    .caption {
      flex-direction: column;
      gap: 0.5rem;
      
      .time-zone-selector {
        font-size: 0.75rem;
        color: var(--color-muted-foreground);
        background: var(--color-muted);
        border: 1px solid var(--color-border);
        border-radius: 0.25rem;
        padding: 0.25rem 0.5rem;
      }
    }
  }
}

// Calendar with events
.calendar {
  &.with-events {
    .day {
      position: relative;
      
      &.has-events::after {
        content: '';
        position: absolute;
        bottom: 2px;
        left: 50%;
        transform: translateX(-50%);
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: var(--color-primary);
      }
      
      &.has-multiple-events::after {
        width: 8px;
        background: linear-gradient(90deg, var(--color-primary) 50%, var(--color-chart-2) 50%);
      }
    }
  }
}

// Calendar with min/max dates
.calendar {
  &.with-restrictions {
    .day_disabled {
      text-decoration: line-through;
      opacity: 0.3;
    }
  }
}

// Calendar with custom formatting
.calendar {
  &.custom-formatting {
    .day {
      font-variant-numeric: tabular-nums;
    }
    
    .head_cell {
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }
}

// Calendar with keyboard navigation
.calendar {
  &.keyboard-nav {
    .day {
      &:focus-visible {
        box-shadow: 0 0 0 2px var(--color-ring);
        z-index: 30;
      }
    }
  }
}

// Calendar with multiple months
.calendar {
  &.multiple-months {
    .months {
      @media (min-width: 768px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
      }
      
      @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
}

// Calendar with compact view
.calendar {
  &.compact {
    padding: 0.5rem;
    
    .day {
      width: 1.75rem;
      height: 1.75rem;
      font-size: 0.75rem;
    }
    
    .head_cell {
      width: 1.75rem;
      font-size: 0.7rem;
    }
    
    .nav_button {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
}

// Calendar with large view
.calendar {
  &.large {
    padding: 1.5rem;
    
    .day {
      width: 2.5rem;
      height: 2.5rem;
      font-size: 1rem;
    }
    
    .head_cell {
      width: 2.5rem;
      font-size: 0.9rem;
    }
    
    .nav_button {
      width: 2rem;
      height: 2rem;
    }
  }
}
</style>
