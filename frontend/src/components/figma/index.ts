// Figma component exports
export { default as ImageWithFallback } from './ImageWithFallback.vue'

// BrowserInfoPopupProps interface
export interface BrowserInfoPopupProps {
  onComplete: () => void
}

// BrowserInfoPopup component
export { default as BrowserInfoPopup } from './BrowserInfoPopup.vue'

// Component registration for global use
import type { App } from 'vue'
import ImageWithFallback from './ImageWithFallback.vue'

export const registerFigmaComponents = (app: App) => {
  app.component('ImageWithFallback', ImageWithFallback)
}

// Type exports - re-export the props interface
export type ImageWithFallbackProps = {
  src: string
  alt?: string
  class?: string
  style?: string | Record<string, any>
  width?: string | number
  height?: string | number
}
