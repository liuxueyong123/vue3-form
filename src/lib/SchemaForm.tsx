import { defineComponent, provide } from 'vue'
import { FormComponentProps } from './types'
import SchemaItem from './SchemaItem'
import { FormItemContext } from './context'

const context = {
  SchemaItem: SchemaItem
}

export default defineComponent({
  name: 'SchemaForm',
  props: FormComponentProps,
  setup (props) {
    provide(FormItemContext, context)

    return () => {
      return <SchemaItem {...props} />
    }
  }
})
