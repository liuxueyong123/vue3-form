import { defineComponent, provide } from 'vue'
import { FormComponentProps } from './types'
import SchemaItem from './SchemaItem'
import { FORM_ITEM_CONTEXT, FormItemContext } from './context'

export default defineComponent({
  name: 'SchemaForm',
  props: FormComponentProps,
  setup (props) {
    const context: FormItemContext = {
      SchemaItem: SchemaItem
    }

    provide(FORM_ITEM_CONTEXT, context)

    return () => {
      return <SchemaItem {...props} />
    }
  }
})
