// UI components exports
export { default as Button } from './Button.vue'
export { default as Dialog } from './Dialog.vue'
export { default as DialogContent } from './DialogContent.vue'
export { default as DialogDescription } from './DialogDescription.vue'
export { default as DialogFooter } from './DialogFooter.vue'
export { default as DialogHeader } from './DialogHeader.vue'
export { default as DialogTitle } from './DialogTitle.vue'
export { default as DialogTrigger } from './DialogTrigger.vue'
export { default as GlassChatBox } from './GlassChatBox.vue'
export { default as Input } from './Input.vue'

// Type exports for UI components
export type GlassChatBoxProps = {
  placeholder?: string
  disabled?: boolean
  maxLength?: number
}

// Component registration for global use
import type { App } from 'vue'
import Button from './Button.vue'
import Dialog from './Dialog.vue'
import DialogContent from './DialogContent.vue'
import GlassChatBox from './GlassChatBox.vue'
import Input from './Input.vue'

export const registerUIComponents = (app: App) => {
  app.component('Button', Button)
  app.component('Dialog', Dialog)
  app.component('DialogContent', DialogContent)
  app.component('GlassChatBox', GlassChatBox)
  app.component('Input', Input)
}
