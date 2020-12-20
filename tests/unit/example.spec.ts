import { shallowMount } from '@vue/test-utils'
import { defineComponent, h, PropType } from 'vue'

const HelloWorld = defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup (props) {
    return () => {
      return h('div', props.msg)
    }
  }
})

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld as any, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
