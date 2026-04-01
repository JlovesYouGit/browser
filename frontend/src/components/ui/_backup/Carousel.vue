<template>
  <CarouselContextProvider
    :carousel-ref="carouselRef"
    :api="api"
    :opts="mergedOpts"
    :orientation="orientation"
    :scroll-prev="scrollPrev"
    :scroll-next="scrollNext"
    :can-scroll-prev="canScrollPrev"
    :can-scroll-next="canScrollNext"
  >
    <div
      :class="carouselClasses"
      role="region"
      aria-roledescription="carousel"
      data-slot="carousel"
      v-bind="$attrs"
      @keydown.capture="handleKeyDown"
    >
      <slot />
    </div>
  </CarouselContextProvider>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useEmblaCarousel, type UseEmblaCarouselType } from 'embla-carousel-vue'
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/Button.vue'

// Type definitions
type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

// Component props interface
interface CarouselProps {
  class?: string
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
}

// Define props with default values
const props = withDefaults(defineProps<CarouselProps>(), {
  orientation: 'horizontal',
  opts: () => ({}),
  plugins: () => ([])
})

// Emits
const emit = defineEmits<{
  select: [api: CarouselApi]
  init: [api: CarouselApi]
  destroy: []
}>()

// Carousel state
const carouselRef = ref<HTMLElement | null>(null)
const [api, setApi] = useEmblaCarousel(
  computed(() => ({
    ...props.opts,
    axis: props.orientation === 'horizontal' ? 'x' : 'y',
  })),
  props.plugins
)

const canScrollPrev = ref(false)
const canScrollNext = ref(false)

// Methods
const onSelect = (emblaApi: CarouselApi) => {
  if (!emblaApi) return
  canScrollPrev.value = emblaApi.canScrollPrev()
  canScrollNext.value = emblaApi.canScrollNext()
  emit('select', emblaApi)
}

const scrollPrev = () => {
  api.value?.scrollPrev()
}

const scrollNext = () => {
  api.value?.scrollNext()
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    scrollPrev()
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    scrollNext()
  }
}

// Computed properties
const mergedOpts = computed(() => ({
  ...props.opts,
  axis: props.orientation === 'horizontal' ? 'x' : 'y',
}))

const carouselClasses = computed(() => 
  cn("relative", props.class)
)

// Watch for API changes
watch(api, (newApi) => {
  if (newApi && props.setApi) {
    props.setApi(newApi)
  }
})

// Lifecycle
onMounted(() => {
  if (api.value) {
    onSelect(api.value)
    api.value.on('reInit', onSelect)
    api.value.on('select', onSelect)
    emit('init', api.value)
  }
})

onUnmounted(() => {
  if (api.value) {
    api.value.off('select', onSelect)
    emit('destroy')
  }
})

// Expose methods
defineExpose({
  carouselRef,
  api,
  scrollPrev,
  scrollNext,
  canScrollPrev,
  canScrollNext
})
</script>

<style lang="less" scoped>
.carousel {
  // Base carousel styles
  position: relative;
  
  // High DPI display optimization
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    // Reduce animations for carousel
  }
  
  // Dark mode support
  @media (prefers-color-scheme: dark) {
    // Carousel styling is theme-agnostic
  }
  
  // Print styles
  @media print {
    // Ensure carousel prints correctly
    // Hide navigation in print
    .carousel-previous,
    .carousel-next {
      display: none;
    }
    
    // Remove animations in print
    animation: none;
    
    // Remove transitions in print
    transition: none;
    
    // Remove filters in print
    filter: none;
  }
  
  // Mobile optimizations
  @media (max-width: 640px) {
    // Mobile-specific carousel optimizations
  }
  
  // Small mobile optimizations
  @media (max-width: 480px) {
    // Small mobile carousel optimizations
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

// Animation support
.carousel {
  &.fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  &.slide-in {
    animation: slideIn 0.3s ease-out forwards;
  }
  
  &.zoom-in {
    animation: zoomIn 0.3s ease-out forwards;
  }
  
  &.bounce-in {
    animation: bounceIn 0.4s ease-out forwards;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
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
  .carousel {
    &.fade-in,
    &.slide-in,
    &.zoom-in,
    &.bounce-in {
      animation: none;
    }
  }
}

// Hover effects
.carousel {
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
.carousel {
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
.carousel {
  &.loading {
    opacity: 0.7;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2rem;
      height: 2rem;
      margin: -1rem 0 0 -1rem;
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
.carousel {
  &.error {
    border-color: var(--color-destructive);
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-destructive) 10%, transparent);
    }
  }
}

// Success state
.carousel {
  &.success {
    border-color: var(--color-chart-2);
    
    &:hover {
      background-color: color-mix(in srgb, var(--color-chart-2) 10%, transparent);
    }
  }
}

// Accessibility enhancements
.carousel {
  // Ensure proper color contrast
  color: inherit;
  
  // High contrast mode support
  @media (prefers-contrast: high) {
    border: 2px solid currentColor;
    
    &.rounded {
      border-radius: 0;
    }
  }
}

// RTL support
.carousel {
  [dir="rtl"] & {
    // RTL specific adjustments for carousel
    direction: rtl;
  }
}

// Print optimizations
@media print {
  .carousel {
    // Ensure carousel prints correctly
    // Hide navigation in print
    .carousel-previous,
    .carousel-next {
      display: none;
    }
    
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
  .carousel {
    // Crisp rendering on high DPI displays
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

// Low bandwidth optimizations
@media (prefers-reduced-data: reduce) {
  .carousel {
    // Optimize for low bandwidth
    // Remove non-essential effects
    filter: none;
    transition: none;
    animation: none;
  }
}

// Color scheme adaptations
@media (prefers-color-scheme: dark) {
  .carousel {
    // Dark mode carousel adaptations are handled by CSS variables
  }
}

@media (prefers-color-scheme: light) {
  .carousel {
    // Light mode carousel adaptations are handled by CSS variables
  }
}

// Carousel with custom spacing
.carousel {
  &.spacing-tight {
    // Tight spacing for carousel
  }
  
  &.spacing-normal {
    // Normal spacing for carousel
  }
  
  &.spacing-loose {
    // Loose spacing for carousel
  }
}

// Carousel with custom navigation
.carousel {
  &.navigation-hidden {
    .carousel-previous,
    .carousel-next {
      opacity: 0;
      pointer-events: none;
    }
    
    &:hover {
      .carousel-previous,
      .carousel-next {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }
  
  &.navigation-always {
    .carousel-previous,
    .carousel-next {
      opacity: 1;
      pointer-events: auto;
    }
  }
  
  &.navigation-on-hover {
    .carousel-previous,
    .carousel-next {
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }
    
    &:hover {
      .carousel-previous,
      .carousel-next {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }
}

// Carousel with custom indicators
.carousel {
  &.with-indicators {
    padding-bottom: 2rem;
    
    .carousel-indicators {
      position: absolute;
      bottom: 0.5rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 0.5rem;
      
      .indicator {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background-color: var(--color-muted-foreground);
        cursor: pointer;
        transition: all 0.2s ease;
        
        &.active {
          background-color: var(--color-primary);
          width: 1rem;
          border-radius: 0.25rem;
        }
        
        &:hover {
          background-color: var(--color-foreground);
        }
      }
    }
  }
}

// Carousel with custom navigation buttons
.carousel {
  &.navigation-rounded {
    .carousel-previous,
    .carousel-next {
      border-radius: 50%;
    }
  }
  
  &.navigation-square {
    .carousel-previous,
    .carousel-next {
      border-radius: 0.25rem;
    }
  }
  
  &.navigation-lg {
    .carousel-previous,
    .carousel-next {
      width: 3rem;
      height: 3rem;
    }
  }
  
  &.navigation-sm {
    .carousel-previous,
    .carousel-next {
      width: 2rem;
      height: 2rem;
    }
  }
}

// Carousel with loop behavior
.carousel {
  &.loop-enabled {
    // Loop enabled styles
  }
  
  &.loop-disabled {
    // Loop disabled styles
  }
}

// Carousel with drag behavior
.carousel {
  &.drag-enabled {
    // Drag enabled styles
    cursor: grab;
    
    &.dragging {
      cursor: grabbing;
    }
  }
  
  &.drag-disabled {
    // Drag disabled styles
    cursor: default;
  }
}

// Carousel with autoplay
.carousel {
  &.autoplay-enabled {
    // Autoplay enabled styles
  }
  
  &.autoplay-disabled {
    // Autoplay disabled styles
  }
}

// Carousel with custom alignment
.carousel {
  &.align-start {
    // Align to start
  }
  
  &.align-center {
    // Align to center
  }
  
  &.align-end {
    // Align to end
  }
}

// Carousel with custom slides per view
.carousel {
  &.slides-per-view-1 {
    // One slide per view
  }
  
  &.slides-per-view-2 {
    // Two slides per view
  }
  
  &.slides-per-view-3 {
    // Three slides per view
  }
  
  &.slides-per-view-auto {
    // Auto slides per view
  }
}

// Carousel with custom spacing between slides
.carousel {
  &.slide-spacing-none {
    // No spacing between slides
  }
  
  &.slide-spacing-sm {
    // Small spacing between slides
  }
  
  &.slide-spacing-md {
    // Medium spacing between slides
  }
  
  &.slide-spacing-lg {
    // Large spacing between slides
  }
}

// Carousel with custom slide width
.carousel {
  &.slide-width-auto {
    // Auto slide width
  }
  
  &.slide-width-full {
    // Full slide width
  }
  
  &.slide-width-50 {
    // 50% slide width
  }
  
  &.slide-width-33 {
    // 33% slide width
  }
  
  &.slide-width-25 {
    // 25% slide width
  }
}

// Carousel with custom height
.carousel {
  &.height-auto {
    // Auto height
  }
  
  &.height-full {
    // Full height
  }
  
  &.height-screen {
    // Screen height
  }
  
  &.height-400 {
    // 400px height
    height: 25rem;
  }
  
  &.height-500 {
    // 500px height
    height: 31.25rem;
  }
  
  &.height-600 {
    // 600px height
    height: 37.5rem;
  }
}

// Carousel with custom background
.carousel {
  &.bg-transparent {
    background-color: transparent;
  }
  
  &.bg-muted {
    background-color: var(--color-muted);
  }
  
  &.bg-accent {
    background-color: var(--color-accent);
  }
  
  &.bg-primary {
    background-color: var(--color-primary);
    color: var(--color-primary-foreground);
  }
  
  &.bg-secondary {
    background-color: var(--color-secondary);
    color: var(--color-secondary-foreground);
  }
}

// Carousel with custom border
.carousel {
  &.border-none {
    border: none;
  }
  
  &.border {
    border: 1px solid var(--color-border);
  }
  
  &.border-2 {
    border: 2px solid var(--color-border);
  }
  
  &.border-t {
    border-top: 1px solid var(--color-border);
  }
  
  &.border-b {
    border-bottom: 1px solid var(--color-border);
  }
}

// Carousel with custom border radius
.carousel {
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

// Carousel with custom shadow
.carousel {
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
</style>
