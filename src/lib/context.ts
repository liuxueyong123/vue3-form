import { defineComponent, inject } from 'vue'
import { FormComponentProps } from './types'

export const FormItemContext = Symbol('FormItemContext')

export const useFormItemContext = () => {
  const SchemaItemType = defineComponent({
    props: FormComponentProps
  })

  interface Context {
    SchemaItem: typeof SchemaItemType;
  }

  const context: Context | undefined = inject(FormItemContext)

  if (!context) {
    throw new Error("error: key doesn't exist in context")
  }

  return context
}
