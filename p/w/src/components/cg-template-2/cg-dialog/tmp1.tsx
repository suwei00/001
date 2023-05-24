import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Tmp1',
  props: {
    content: String,
  },
  setup(props) {
    return () => {
      return (
        <p class="cg-dialog-temp1-content">{props.content}</p>
      )
    }
  }
})
