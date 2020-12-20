import { defineComponent, ref, DefineComponent } from 'vue'
import { createUseStyles } from 'vue-jss'
import MonacoEditor from './components/MonacoEditor'
import SchemaForm, { ThemeProvider } from './lib'
import { SchemaType, Schema } from './lib/types'
import defaultTheme from './lib/theme-default'

const formValues = ['green']
const schema: Schema = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.STRING
    // enum: ['red', 'green', 'yellow', 'blue']
  }
  // properties: {
  //   name: {
  //     type: SchemaType.STRING
  //   },
  //   age: {
  //     type: SchemaType.NUMBER
  //   }
  // },
  // required: ['name', 'age']
}

const toJson = (data: any) => {
  return JSON.stringify(data, null, 2)
}

const useStyles = createUseStyles({
  testWrapper: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  leftContent: {
    flex: '0 0 65%',
    width: '70%'
  },
  rightContent: {
    flex: '0 0 30%',
    width: '30%'
  }
})

export default defineComponent({
  name: 'TestForm',
  setup () {
    const schemaRef = ref<Schema>(schema)
    const formValuesRef = ref(formValues)
    const classesRef = useStyles()

    const schemaChange = (value: string) => {
      try {
        schemaRef.value = JSON.parse(value)
      } catch {}
    }

    const onFormChange = (v: any) => {
      formValuesRef.value = v
    }

    return () => {
      const schemaValue = schemaRef.value
      const formValues = formValuesRef.value
      const classes = classesRef.value

      return (
        <div class={classes.testWrapper}>
          <div class={classes.leftContent}>
            <MonacoEditor name='schema' value={toJson(schemaValue)} onChange={schemaChange} />
            <MonacoEditor name='uiSchema' value={toJson(schemaValue)} onChange={schemaChange} />
            <MonacoEditor name='formValues' value={toJson(formValues)} onChange={() => null} />
          </div>
          <div class={classes.rightContent}>
            <ThemeProvider theme={defaultTheme}>
              <SchemaForm schema={schemaValue} value={formValues} onChange={onFormChange} />
            </ThemeProvider>
          </div>
        </div>
      )
    }
  }
})
