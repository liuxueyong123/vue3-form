import { defineComponent, ComputedRef } from 'vue'
import { FormComponentProps, Theme } from '../types'

const FormItemContextDefined = defineComponent({
  props: FormComponentProps
})

export interface FormItemContext {
  SchemaItem: typeof FormItemContextDefined;
}

export interface ThemeContext {
  theme: ComputedRef<Theme>;
}
