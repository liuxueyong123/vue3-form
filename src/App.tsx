import { defineComponent, ref } from 'vue'
import Ajv from 'ajv'
import ajvLocalize from 'ajv-i18n'

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      test: '123'
    },
    age: {
      type: 'number'
    }
  },
  required: ['name', 'age']
}

const data = {
  name: 'liu xueyong',
  age: 12
}

export default defineComponent({
  setup () {
    const count = ref(1)

    const addCount = () => {
      count.value += 1
    }

    return () => (
      <div>
        <button onClick={addCount}>+</button>
        <div>{count.value}</div>
      </div>
    )
  },
  mounted () {
    const ajv = new Ajv()
    ajv.addKeyword('test', {
      validate: (schema: any, data: any) => {
        console.log(schema, data)
        return true
      }
    })
    const validate = ajv.compile(schema)
    if (validate(data)) {
      console.log('validate success')
    } else {
      ajvLocalize.zh(validate.errors)
      console.log(validate.errors)
    }
  }
})
