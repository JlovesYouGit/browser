import { InjectionKey, provide, inject, ref, computed, type Ref } from 'vue'
import type { UseEmblaCarouselType } from 'embla-carousel-vue'

// Type definitions
export type CarouselApi = UseEmblaCarouselType[1]
export type UseCarouselParameters = Parameters<typeof import('embla-carousel-vue').useEmblaCarousel>
export type CarouselOptions = UseCarouselParameters[0]
export type CarouselPlugin = UseCarouselParameters[1]

// Carousel context interface
export interface CarouselContext {
  carouselRef: Ref<HTMLElement | null>
  api: Ref<CarouselApi | undefined>
  opts: CarouselOptions
  orientation: 'horizontal' | 'vertical'
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: Ref<boolean>
  canScrollNext: Ref<boolean>
}

// Create injection key
export const CarouselContextKey: InjectionKey<CarouselContext> = Symbol('CarouselContext')

// Provider component
export function CarouselContextProvider(props: CarouselContext & { children: any }) {
  provide(CarouselContextKey, {
    carouselRef: props.carouselRef,
    api: props.api,
    opts: props.opts,
    orientation: props.orientation,
    scrollPrev: props.scrollPrev,
    scrollNext: props.scrollNext,
    canScrollPrev: props.canScrollPrev,
    canScrollNext: props.canScrollNext,
  })
  
  return props.children
}

// Hook for using carousel context
export function useCarousel(): CarouselContext {
  const context = inject(CarouselContextKey)
  
  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }
  
  return context
}
