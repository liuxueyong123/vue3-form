import { inject } from 'vue'
import { FormItemContext, ThemeContext } from './types'
import { FORM_ITEM_CONTEXT, THEME_CONTEXT } from './constant'

export const useFormItemContext = () => {
  const context: FormItemContext | undefined = inject(FORM_ITEM_CONTEXT)

  if (!context) {
    throw new Error('FormItemContext can only be used under SchemaForm')
  }

  return context
}

export const useTheme = () => {
  const context: ThemeContext | undefined = inject(THEME_CONTEXT)

  if (!context) {
    throw new Error('theme can only be used under themeProvider')
  }

  return context
}
