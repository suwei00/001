<template>
  <teleport to="#App">
    <transition name="fade-toast" mode="out-in" appear @after-leave="handleAfterLeave">
      <div v-if="show" @click="show = false" class="error-list txt-c">
        <h3 class="fs-16">{{ useIn8.plat_list.fail }}</h3>
        <ul>
          <li v-for="i in list" :key="i.id">
            <span>{{ i.name }}</span> ：<span>{{ formatNumToCurrency2Decimal(i.amount) }}</span>
          </li>
        </ul>
        <p class="fs-12">{{ useIn8.plat_list.tip }}</p>
      </div>
    </transition>
  </teleport>
</template>
<script>
import { formatNumToCurrency2Decimal } from '@/utils/format';
import { defineComponent, reactive, toRefs, onMounted, watch } from 'vue';
const useIn8 = require(`@/language/${globalConfig.LANG}`);
export default defineComponent({
  name: 'app-error-list',
  props: {
    list: {
      type: Array,
      default: []
    },
    duration: {
      type: Number,
      default: 2000
    }
  },
  setup(props) {
    const state = reactive({
      show: true,
      timer: null,
      closed: false
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
    const handleAfterLeave = currentElement => {
      if (currentElement && currentElement.parentNode) {
        currentElement.parentNode.removeChild(currentElement);
      }
    };
    onMounted(() => {
      startTimer();
    });
    watch(
      () => state.closed,
      newVal => {
        if (newVal) {
          state.show = false;
        }
      }
    );
    return {
      formatNumToCurrency2Decimal,
      handleAfterLeave,
      ...toRefs(state),
      close,
      useIn8
    };
  }
});
</script>
<style lang="scss" scoped>
.error-list {
  width: 293px;
  background: var(--cg-color-black3);
  border-radius: var(--cg-border-button-radius);
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  padding: 21px 40px 26px;
  color: var(--cg-color-white);

  h3 {
    color: var(--cg-color-red);
  }

  ul {
    margin: 5px 0 12px;
  }
}

.fade-toast-enter-active,
.fade-toast-leave-active {
  transition: all 0.3s ease-out;
}

.fade-toast-enter-from {
  top: 15%;
  opacity: 0;
}

.fade-toast-leave-to {
  top: 15%;
  opacity: 0;
}
</style>
