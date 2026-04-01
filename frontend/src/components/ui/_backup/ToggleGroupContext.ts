import { type InjectionKey, inject, provide, type Ref } from 'vue'

export interface ToggleGroupContextValue {
  variant: Ref<'default' | 'outline'>
  size: Ref<'default' | 'sm' | 'lg'>
}

export const ToggleGroupContextKey: InjectionKey<ToggleGroupContextValue> = Symbol('toggle-group')

export function provideToggleGroup(context: ToggleGroupContextValue) {
  provide(ToggleGroupContextKey, context)
}

export function useToggleGroup(): ToggleGroupContextValue {
  const context = inject(ToggleGroupContextKey, {
    variant: { value: 'default' } as Ref<'default' | 'outline'>,
    size: { value: 'default' } as Ref<'default' | 'sm' | 'lg'>
  })
  
  return context
}
