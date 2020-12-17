import { defineComponent } from 'vue'
import { createUseStyles } from 'vue-jss'
import { FormComponentProps } from '../types'

const useStyles = createUseStyles({
  input: {
    height: '40px'
  }
})

export default defineComponent({
  name: 'StringField',
  props: FormComponentProps,
  setup (props) {
    const classesRef = useStyles()

    const handleChange = (e: any) => {
      props.onChange(e.target.value)
    }

    return () => {
      const classes = classesRef.value

      return <input class={classes.input} type="text" value={props.value as string} onInput={handleChange} />
    }
  }
})
