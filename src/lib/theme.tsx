import { defineComponent, PropType, provide, computed } from 'vue'
import { THEME_CONTEXT, ThemeContext, useTheme } from './context'
import { Theme, Widgets } from './types'

export default defineComponent({
  name: 'ThemeProvider',
  props: {
    theme: {
      type: Object as PropType<Theme>,
      required: true
    }
  },
  setup (props, { slots }) {
    const themeRef = computed(() => props.theme)
    const context: ThemeContext = {
      theme: themeRef
    }
    provide(THEME_CONTEXT, context)

    return () => {
      return slots.default && slots.default()
    }
  }
})

export const getWidget = (name: keyof Widgets) => {
  const { theme } = useTheme()

  const widget = computed(() => theme.value.widgets[name])

  return widget
}
