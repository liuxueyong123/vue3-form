import { defineComponent, ref } from 'vue'
import { createUseStyles } from 'vue-jss'
import MonacoEditor from './components/MonacoEditor'
import SchemaForm from './lib'
import { SchemaType, Schema } from './lib/types'

const formValues = {
  name: 'Liu Xueyong',
  age: 22
}
const schema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    name: {
      type: SchemaType.STRING
    },
    age: {
      type: SchemaType.NUMBER
    }
  },
  required: ['name', 'age']
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
          <SchemaForm class={classes.rightContent} schema={schemaValue} value={formValues} onChange={onFormChange} />
        </div>
      )
    }
  }
})
