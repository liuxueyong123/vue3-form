import { defineComponent, PropType, onMounted, watchEffect } from 'vue'
import { createUseStyles } from 'vue-jss'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'

const useStyles = createUseStyles({
  monacoEditorWrapper: {
    height: '250px',
    width: '100%'
  },
  title: {
    height: '40px',
    fontSize: '20px',
    lineHeight: '40px',
    textAlign: 'center',
    background: '#f0f0f0'
  },
  monacoEditor: {
    height: '210px',
    background: '#f0f0f0',
    '& .minimap.slider-mouseover': {
      display: 'none'
    },
    '& .decorationsOverviewRuler': {
      display: 'none'
    }
  }
})

export default defineComponent({
  name: 'MonacoEditor',
  props: {
    name: {
      type: String as PropType<string>,
      required: true
    },
    value: {
      type: String as PropType<string>,
      required: true
    },
    onChange: {
      type: Function as PropType<(v: string) => void>,
      required: true
    }
  },
  setup (props) {
    const classesRef = useStyles()
    let monacoInstance: monaco.editor.IStandaloneCodeEditor | null = null

    onMounted(() => {
      monacoInstance = monaco.editor.create(
        document.getElementById(props.name) as HTMLElement,
        {
          value: props.value
        }
      )

      monacoInstance.onDidChangeModelContent(() => {
        const newValue = (monacoInstance as monaco.editor.IStandaloneCodeEditor).getValue()
        props.onChange(newValue)
      })
    })

    watchEffect(() => {
      const value = props.value

      if (monacoInstance && monacoInstance.getValue() !== value) {
        monacoInstance.setValue(value)
      }
    })

    return () => {
      const classes = classesRef.value

      return (
        <div class={classes.monacoEditorWrapper}>
          <div class={classes.title}>{props.name}</div>
          <div id={props.name} class={classes.monacoEditor}></div>
        </div>
      )
    }
  }
})
