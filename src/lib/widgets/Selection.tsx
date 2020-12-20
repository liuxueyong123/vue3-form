import { defineComponent, watch, ref } from 'vue'
import { selectionWidgetProps } from '../types'

export default defineComponent({
  name: 'SelectionWidget',
  props: selectionWidgetProps,
  setup (props) {
    const initialValueRef = ref(props.initialValue || [])

    watch(initialValueRef, (newV) => {
      if (newV !== props.initialValue) {
        props.onChange(newV)
      }
    })

    watch(props.initialValue, (newV) => {
      if (newV !== initialValueRef.value) {
        initialValueRef.value = newV
      }
    })

    return () => {
      return (
        <select multiple={true} v-model={initialValueRef.value}>
          {
            props.options.map((option, index) => (
              <option value={option} key={index}>{option}</option>
            ))
          }
        </select>
      )
    }
  }
})
