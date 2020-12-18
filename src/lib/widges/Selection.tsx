import { defineComponent, PropType, watch, ref } from 'vue'

export default defineComponent({
  name: 'SelectionWidget',
  props: {
    options: {
      type: Array as PropType<any[]>,
      required: true
    },
    initialValue: {
      type: Array as PropType<any[]>
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true
    }
  },
  setup (props) {
    const initialValueRef = ref(props.initialValue || [])

    watch(initialValueRef, () => {
      props.onChange(initialValueRef.value)
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
