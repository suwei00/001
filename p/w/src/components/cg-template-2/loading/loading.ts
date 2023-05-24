import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue';
interface LoadingDatas {
  show: boolean;
  closed: boolean;
  timer: NodeJS.Timeout | null;
}
export default defineComponent({
  name: 'loading',
  props: {
    onClose: {
      type: Function
    },
    duration: {
      type: Number,
      default: 15000
    }
  },
  setup(props) {
    const state: LoadingDatas = reactive({
      show: true,
      closed: false,
      timer: null
    });
    const close = () => {
      state.closed = true;
      // 执行关闭回调
      if (typeof props.onClose === 'function') {
        props.onClose(this);
      }
    };
    const startTimer = () => {
      if (props.duration > 0) {
        state.timer = setTimeout(() => {
          if (!state.closed) {
            // 关闭 toast
            close();
          }
        }, props.duration);
      }
    };
    onMounted(() => {
      startTimer();
    });
    const handleAfterLeave = (currentElement: HTMLElement) => {
      if (currentElement && currentElement.parentNode) {
        currentElement.parentNode.removeChild(currentElement);
      }
    };
    watch(
      () => state.closed,
      newVal => {
        if (newVal) {
          state.show = false;
        }
      }
    );
    return {
      handleAfterLeave,
      ...toRefs(state),
      close
    };
  }
});
