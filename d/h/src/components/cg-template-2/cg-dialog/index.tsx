import { defineComponent, ref } from 'vue'
import { Popup } from 'vant'

export default defineComponent({
  name: 'CgDialog',
  emits: ['closed'],
  props: {
    closeOnClickOverlay: {
      type: Boolean,
      default: false
    },
    showOverlay: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { slots, emit }) {
    const visible = ref(true)
    const closed = () => {
      emit('closed')
    }

    return () => {
      return (
        <Popup
          // overlay={props.showOverlay}
          v-model={[visible.value, 'show']}
          close-on-click-overlay={props.closeOnClickOverlay}
          overlay-style={{ background: props.showOverlay ? '' : 'transparent' }}
          onClosed={closed}
          zIndex="2000"
        >
          {slots.default?.()}
        </Popup>
      )
    }
  }
})
