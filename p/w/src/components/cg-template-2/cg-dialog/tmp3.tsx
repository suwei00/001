import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Tmp3',
  setup(props, { slots, emit }) {
    return () => {
      return (
        <>
          {slots.default?.()}
        </>
      )
    }
  }
})
