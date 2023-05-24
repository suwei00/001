import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Tmp2',
  setup(props, { slots, emit }) {
    return () => {
      return (
        <div class="cg-dialog-temp2-content">
          {slots.default?.()}
        </div>
      )
    }
  }
})
