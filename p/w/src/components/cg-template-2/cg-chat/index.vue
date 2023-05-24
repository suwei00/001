<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useDraggable, useWindowSize } from '@vueuse/core';
import { useChat } from './useChat';
import { CgIcon } from '@/components/cg-template-2';

const cgChat = ref<HTMLElement | null>(null);
const { chatStatus, chatUrl, chatClick, changeChatStatus, changeScreen, width, height, chatIconMoveStartTime, chatIconMoveEndTime } = useChat({
  width: [82, 400, 560],
  height: [82, 680, 950]
});
const isDragging = ref(false);
const { width: windowWidth, height: widthHeight } = useWindowSize();

const { x, y } = useDraggable(cgChat, {
  initialValue: { x: windowWidth.value - width.value, y: widthHeight.value - 200 },
  onStart() {
    // console.log('onStart');
    document.body.style.overflow = 'hidden';
    chatIconMoveStartTime.value = new Date().getTime();
    isDragging.value = true;
  },
  onEnd() {
    // console.log('onEnd');
    document.body.style.overflow = 'auto';
    chatIconMoveEndTime.value = new Date().getTime();
    isDragging.value = false;
  }
});

watch([x, y], () => {
  if (x.value <= 0) x.value = 0;
  if (y.value <= 0) y.value = 0;
  if (x.value > windowWidth.value - width.value) x.value = windowWidth.value - width.value;
  if (y.value > widthHeight.value - height.value) y.value = widthHeight.value - height.value;
});

const style = computed(() => {
  return {
    width: `${width.value}px`,
    height: `${height.value}px`,
    left: `${x.value}px`,
    top: `${y.value}px`
  };
});

watch(chatStatus, val => {
  if (val) {
    const chatPosition = localStorage.getItem('chatPosition');
    if (chatPosition) {
      const { x: x1, y: y1 } = JSON.parse(chatPosition);
      x.value = x1;
      y.value = y1;
    } else {
      x.value = windowWidth.value / 2 - width.value / 2;
      y.value = widthHeight.value / 2 - height.value / 2;
    }
  } else {
    localStorage.setItem('chatPosition', JSON.stringify({ x: x.value, y: y.value }));
  }
});
</script>

<template>
  <teleport to="body">
    <div ref="cgChat" class="cg-chat" :class="{ 'is-open': chatStatus }" :style="style" @contextmenu.prevent.stop="null" @click="chatClick(true)">
      <div class="cg-head-content" v-if="chatStatus">
        <div class="cg-chat-header">
          <div class="cg-chat-header-left">
            <cg-icon width="30" name="i_chat_logo" />
          </div>
          <span class="chat-title">PHÒNG CHAT</span>
          <div class="cg-chat-header-right">
            <cg-icon width="24" name="i_chat_scale" @click="changeScreen()" />
            <cg-icon width="24" name="i_chat_close" @click.stop="chatClick(false)" class="close" />
          </div>
        </div>
        <div class="cg-chat-content" @click.stop>
          <iframe :src="chatUrl" frameborder="0" width="100%" height="100%"></iframe>
          <div class="zzc" v-if="isDragging"></div>
        </div>
      </div>
      <div v-else class="cg-chat-icon" @contextmenu.prevent.stop="null">
        <app-image class="c-img img_shadow" src="/chat.png" />
        <div class="zzc" v-if="isDragging"></div>
      </div>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
.cg-chat {
  position: fixed;
  z-index: 2012;
  cursor: pointer;

  &.is-open {
    width: 400px;
    height: 200px;
  }

  .cg-head-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    box-shadow: 0px 6px 12px var(--cg-shadow-color1);
    border-radius: 12px;
    overflow: hidden;
  }

  .cg-chat-icon {
    position: absolute;
    .c-img {
      // 禁止图片拖动
      user-select: none;
    }
  }

  .cg-chat-header {
    height: 48px;
    background: var(--cg-gradient-white-blue-head);
    display: flex;
    align-items: center;

    .cg-chat-header-left {
      display: flex;
      padding-left: 16px;
    }

    .chat-title {
      padding-left: 11px;
      font: var(--cg-font-text7);
      color: var(--cg-color-blue12);
    }

    .cg-chat-header-right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      padding-right: 16px;

      .close {
        margin-left: 10px;
      }
    }
  }

  .cg-chat-content {
    flex: 1;
    height: 0;
    position: relative;
  }
}

.zzc {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
