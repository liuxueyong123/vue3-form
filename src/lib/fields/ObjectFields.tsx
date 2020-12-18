import { defineComponent } from 'vue'
import { FormComponentProps } from '../types'
import { useFormItemContext } from '../context'
// import { isObject } from '../utils'

export default defineComponent({
  name: 'ObjectField',
  props: FormComponentProps,
  setup (props) {
    const { SchemaItem } = useFormItemContext()

    const handleChange = (key: string, v: any) => {
      // const value: any = isObject(props.value) ? props.value : {}
      const value: any = props.value ? props.value : {}
      value[key] = v
      props.onChange(value)
    }

    return () => {
      // const properties = props.schema.properties && isObject(props.schema.properties) ? props.schema.properties : {}
      // const value: any = isObject(props.value) ? props.value : {}
      const properties = props.schema.properties ? props.schema.properties : {}
      const value: any = props.value ? props.value : {}

      return Object.keys(properties).map((key, index) => <SchemaItem schema={properties[key]} value={value[key]} onChange={(v) => handleChange(key, v)} key={index} />)
    }
  }
})
