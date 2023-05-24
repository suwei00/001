<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useWindowSize, useDraggable } from '@vueuse/core';
import { useDragStore } from '@/store-pinia/drag';
import { CgIcon } from '@/components/cg-template-2';
import { useAppStore } from '@/store-pinia';
import { storeToRefs } from 'pinia';
import router from '@/router';
import { DownloadAppDialog } from '@/mixins/AppDownload';

const { width: windowWidth, height: widthHeight } = useWindowSize();
const dragState = useDragStore();
const { showChat } = storeToRefs(dragState);
const appStore = useAppStore();
const { token } = storeToRefs(appStore);
const emit = defineEmits(['clike', 'onDrag']);

const props = defineProps<{
  ballY: number;
  iconName: string;
}>();

const closureRef = ref();
const chatRef = ref();
const moveIn = ref(false);
const active = ref(false);
const chatIconMoveStartTime = ref<number>(0);
const chatIconMoveEndTime = ref<number>(0);
const ballWidth = 60;
const timeout = ref();

const { x, y, style } = useDraggable(chatRef, {
  initialValue: { x: windowWidth.value - ballWidth, y: widthHeight.value - props.ballY - 160 },
  onStart() {
    timeout.value = setTimeout(() => {
      active.value = true;
    }, 200);
    chatIconMoveStartTime.value = new Date().getTime();
  },
  onMove() {
    if (closureRef.value) {
      const _closureRef = closureRef.value.getBoundingClientRect();
      moveIn.value = y.value > _closureRef.top && x.value > _closureRef.left;
    }
  },
  onEnd() {
    clearTimeout(timeout.value);
    active.value = false;
    moveIn.value = false;
    chatIconMoveEndTime.value = new Date().getTime();
    if (closureRef.value) {
      const _closureRef = closureRef.value.getBoundingClientRect();
      if (y.value > _closureRef.top && x.value > _closureRef.left) emit('onDrag', false);
    }

    // if (x.value > windowWidth.value / 2)
    //   x.value = windowWidth.value - 60
    // else
    //   x.value = 10
  }
});

// 小球范围限制
watch([x, y], () => {
  if (x.value <= 0) x.value = 0;
  if (y.value <= 84) y.value = 84;
  if (x.value > windowWidth.value - ballWidth) x.value = windowWidth.value - ballWidth;
  if (y.value > widthHeight.value - ballWidth) y.value = widthHeight.value - ballWidth;
});

// 判断是不是点击
const isChatIconClick = computed(() => {
  if (!chatIconMoveStartTime.value || !chatIconMoveEndTime.value) return false;
  return (
    chatIconMoveEndTime.value > chatIconMoveStartTime.value &&
    chatIconMoveEndTime.value - chatIconMoveStartTime.value < 200
  );
});

const openChat = () => {
  if (isChatIconClick.value) {
    DownloadAppDialog(() => {
      if (token.value) {
        emit('clike', !showChat.value);
      } else {
        router.push('/entry/login');
      }
    });
  }
};
</script>
<template>
  <div
    ref="chatRef"
    style="touch-action: none"
    class="drag_img_active"
    :style="style"
    @mousedown.prevent.stop="null"
    @touchstart.prevent.stop="null"
    @touchend.prevent.stop="openChat"
  >
    <app-image class="drag_img" :src="iconName" />
  </div>
  <div v-if="active" ref="closureRef" class="closure" :class="{ closure_move: moveIn }">
    <div class="closure_con">
      <CgIcon class="closure_icon" width="72" name="i_chat_close" />
      <div class="closure_text">Tắt Cửa Sổ Nổi</div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ChatDrag'
};
</script>

<style lang="scss" scoped>
.drag_img {
  width: 100px;
  pointer-events: none;
  border-radius: 50%;
  filter: var(--cg-img-shadow);
}

.drag_img_opacity {
  position: fixed;
  opacity: 0.7;
  z-index: 9999;
  transition: left 0.2s;
}

.drag_img_active {
  position: fixed;
  z-index: 1998;
  animation: jelly 0.5s;
}

.closure {
  position: fixed;
  right: -250px;
  bottom: -250px;
  background-image: var(--cg-chat-drag);
  border-radius: 50%;
  width: 500px;
  height: 500px;
  z-index: 9998;
  transition: all 0.2s;

  .closure_con {
    position: fixed;
    right: 26.6px;
    bottom: 22px;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 170px;

    .closure_icon {
      margin-bottom: 16px;
    }

    .closure_text {
      font: var(--cg-font-text10);
      color: var(--cg-color-white);
    }
  }
}

.closure_move {
  width: 510px;
  height: 510px;
}

@keyframes jelly {
  0%,
  100% {
    transform: scale(1, 1);
  }

  33% {
    transform: scale(0.9, 1.1);
  }

  66% {
    transform: scale(1.1, 0.9);
  }
}
</style>
