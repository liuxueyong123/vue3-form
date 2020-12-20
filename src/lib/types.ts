import { PropType, defineComponent } from 'vue'

enum SchemaType {
  NUMBER = 'number',
  STRING = 'string',
  INTEGER = 'integer',
  BOOLEAN = 'boolean',
  ARRAY = 'array',
  OBJECT = 'object'
}

interface Schema {
  type: SchemaType | string;
  properties?: Record<string, Schema>;
  required?: string[];
  items?: Schema[] | Schema;
  enum?: Array<string | number>;
}

const FormComponentProps = {
  schema: {
    type: Object as PropType<Schema>,
    required: true
  },
  value: {
    required: true
  },
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true
  }
} as const

const commonWidgetProps = {
  initialValue: {
    type: Array as PropType<any[]>,
    required: true
  },
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true
  }
} as const

const selectionWidgetProps = {
  ...commonWidgetProps,
  options: {
    type: Array as PropType<any[]>,
    required: true
  }
} as const

const SelectionWidgetDefined = defineComponent({
  props: selectionWidgetProps
})

type SelectionWidgetComponent = typeof SelectionWidgetDefined

interface Widgets {
  SelectionWidget: SelectionWidgetComponent;
}

interface Theme {
  widgets: Widgets;
}

export {
  SchemaType,
  Schema,
  FormComponentProps,
  selectionWidgetProps,
  Widgets,
  Theme
}
