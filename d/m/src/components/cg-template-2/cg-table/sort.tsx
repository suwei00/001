import { defineComponent, PropType, ref } from "vue";
import { useVModel } from '@vueuse/core'
import './table'

type SortType = '1' | '0' | ''

export default defineComponent({
  name: 'CgTable',
  props: {
    modelValue: {
      type: String as PropType<SortType>,
      default: ''
    },
    value: {
      type: String,
      required: true
    }
  },
  emits: ['sort', 'update:modelValue'],
  setup(props, { emit, slots, expose }) {
    const state = useVModel(props, 'modelValue', emit)

    const sort = () => {
      if (state.value === '') {
        state.value = '1'
      } else if (state.value === '1') {
        state.value = '0'
      } else if (state.value === '0') {
        state.value = ''
      }
    }

    return () => (
      <div class="header_title" onClick={sort}>
        <span v-html={props.value}></span>
        <span class="cg-sort">
          <div class={
            state.value === "" ? 'default' :
              state.value === '1' ? 'default active' : "default"
          }>
          </div>
          <div style="height: 7px"></div>
          <div class={
            state.value === "" ? 'default rotate' :
              state.value === '0' ? 'default rotate active' : "default rotate"
          }></div>
        </span>
      </div>
    )
  }
});