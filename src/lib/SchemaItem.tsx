import { defineComponent } from 'vue'
import { FormComponentProps, SchemaType } from './types'
import StringField from './fields/StringField'
import NumberField from './fields/NumberField'
import ObjectField from './fields/ObjectFields'
import ErrorSchema from './ErrorSchema'

export default defineComponent({
  name: 'SchemaItem',
  props: FormComponentProps,
  setup (props) {
    return () => {
      let Component: any = ErrorSchema

      switch (props.schema.type) {
        case SchemaType.STRING:
          Component = StringField
          break
        case SchemaType.NUMBER:
          Component = NumberField
          break
        case SchemaType.OBJECT:
          Component = ObjectField
          break
        default:
          break
      }

      return (
        <Component {...props} />
      )
    }
  }
})
