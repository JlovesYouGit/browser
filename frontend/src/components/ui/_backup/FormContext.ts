import { type InjectionKey, inject, provide } from 'vue'
import type { FieldError, FieldPath, FieldValues, FormState } from '@vee-validate/vue'

// Form Field Context
export interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName
}

export const FormFieldKey: InjectionKey<FormFieldContextValue> = Symbol('FormField')

export function provideFormField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
  context: FormFieldContextValue<TFieldValues, TName>
) {
  provide(FormFieldKey, context as FormFieldContextValue)
}

export function useFormFieldContext(): FormFieldContextValue | undefined {
  return inject(FormFieldKey)
}

// Form Item Context
export interface FormItemContextValue {
  id: string
}

export const FormItemKey: InjectionKey<FormItemContextValue> = Symbol('FormItem')

export function provideFormItem(context: FormItemContextValue) {
  provide(FormItemKey, context)
}

export function useFormItemContext(): FormItemContextValue | undefined {
  return inject(FormItemKey)
}

// Combined hook for form field access
export interface UseFormFieldReturn {
  id: string
  name: string
  formItemId: string
  formDescriptionId: string
  formMessageId: string
  error?: FieldError
  invalid: boolean
  isDirty: boolean
  isTouched: boolean
  isValidating: boolean
}

export function useFormField(): UseFormFieldReturn {
  const fieldContext = useFormFieldContext()
  const itemContext = useFormItemContext()

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  if (!itemContext) {
    throw new Error('useFormField should be used within <FormItem>')
  }

  const { id } = itemContext
  const { name } = fieldContext

  return {
    id,
    name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    error: undefined,
    invalid: false,
    isDirty: false,
    isTouched: false,
    isValidating: false
  }
}
