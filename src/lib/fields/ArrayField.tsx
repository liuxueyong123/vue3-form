import { defineComponent, PropType } from 'vue'
import { FormComponentProps, Schema } from '../types'
import { useFormItemContext, useTheme } from '../context'
import { getWidget } from '../theme'
// import { isObject } from '../utils'

const HandlerWrapper = defineComponent({
  name: 'HandlerWrapper',
  props: {
    value: {
      type: Array as PropType<any[]>,
      required: true
    },
    index: {
      type: Number as PropType<number>,
      required: true
    }
  },
  setup (props, { slots }) {
    const handleUp = (index: number) => {
      const value = props.value

      if (index === 0) {
        throw new Error('第一项无法上移')
      }

      [value[index], value[index - 1]] = [value[index - 1], value[index]]
    }

    const handleDown = (index: number) => {
      const value = props.value

      if (index >= value.length - 1) {
        throw new Error('最后一项无法下移')
      }

      [value[index], value[index + 1]] = [value[index + 1], value[index]]
    }

    const handleAdd = (index: number) => {
      const value = props.value
      value.splice(index + 1, 0, undefined)
    }

    const handleDel = (index: number) => {
      const value = props.value
      value.splice(index, 1)
    }

    return () => {
      return (
        <div style={{ display: 'block', width: '100%' }}>
          <button onClick={() => handleUp(props.index)}>上移</button>
          <button onClick={() => handleDown(props.index)}>下移</button>
          <button onClick={() => handleAdd(props.index)}>增加</button>
          <button onClick={() => handleDel(props.index)}>删除</button>
          { slots && slots.default && slots.default()}
          <slot></slot>
        </div>
      )
    }
  }
})

/*
  {
    type: 'array',
    items: [
      {
        type: "number"
      },
      {
        type: "number"
      }
    ]
  }

  {
    type: 'array',
    items:{
      type: "string"
    }
  }

  {
    type: 'array',
    items:{
      type: "string",
      enum: ['red', 'green', 'yellow', 'blue']
    }
  }
*/

export default defineComponent({
  name: 'ObjectField',
  props: FormComponentProps,
  setup (props) {
    const { SchemaItem } = useFormItemContext()

    const handleArrayChange = (index: number, v: any) => {
      const newValue: any[] = JSON.parse(JSON.stringify(props.value))
      newValue[index] = v
      props.onChange(newValue)
    }

    const isArray = Array.isArray(props.schema.items)
    if (isArray) {
      return () => {
        const items: Schema[] = props.schema.items as Schema[]
        const value = props.value as any[]

        return items.map((item, index) => <SchemaItem key={index} schema={item} value={value[index]} onChange={(v) => handleArrayChange(index, v)} />)
      }
    }

    const isHaveEnum = props.schema.items && (props.schema.items as Schema).enum
    if (isHaveEnum) {
      const SelectionWidgetRef = getWidget('SelectionWidget')

      return () => {
        const value = props.value as any[]
        const options = (props.schema.items as Schema).enum as (string | number)[]
        const SelectionWidget = SelectionWidgetRef.value

        return <SelectionWidget options={options} initialValue={value} onChange={(v: any) => props.onChange(v)} />
      }
    } else {
      return () => {
        const value = props.value as any[]
        const items = props.schema.items as Schema

        return value.map((x, index) => (
          <HandlerWrapper index={index} value={value} key={index}>
            <SchemaItem schema={items} value={x} onChange={(v) => handleArrayChange(index, v)} />
          </HandlerWrapper>
        ))
      }
    }
  }
})
