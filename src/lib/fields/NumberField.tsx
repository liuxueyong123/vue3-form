import { defineComponent } from 'vue'
import { createUseStyles } from 'vue-jss'
import { FormComponentProps } from '../types'

const useStyles = createUseStyles({
  input: {
    height: '40px'
  }
})

export default defineComponent({
  name: 'NumberField',
  props: FormComponentProps,
  setup (props) {
    const classesRef = useStyles()

    const handleChange = (e: any) => {
      if (e.target.value === undefined) {
        props.onChange(0)
      }
      props.onChange(Number(e.target.value))
    }

    return () => {
      const classes = classesRef.value

      return <input class={classes.input} type="number" value={props.value as number} onInput={handleChange} />
    }
  }
})
