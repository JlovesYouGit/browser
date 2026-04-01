import { type InjectionKey, inject, provide, ref, computed, type Ref } from 'vue'

export const SIDEBAR_COOKIE_NAME = 'sidebar_state'
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
export const SIDEBAR_WIDTH = '16rem'
export const SIDEBAR_WIDTH_MOBILE = '18rem'
export const SIDEBAR_WIDTH_ICON = '3rem'
export const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

export interface SidebarContextValue {
  state: Ref<'expanded' | 'collapsed'>
  open: Ref<boolean>
  setOpen: (open: boolean) => void
  openMobile: Ref<boolean>
  setOpenMobile: (open: boolean) => void
  isMobile: Ref<boolean>
  toggleSidebar: () => void
}

export const SidebarContextKey: InjectionKey<SidebarContextValue> = Symbol('sidebar')

export function provideSidebar(context: SidebarContextValue) {
  provide(SidebarContextKey, context)
}

export function useSidebar(): SidebarContextValue {
  const context = inject(SidebarContextKey)
  
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.')
  }
  
  return context
}
