<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useDraggable, useWindowSize } from '@vueuse/core';
import { useChat } from './useChat';

const cgChat = ref<HTMLElement | null>(null);
const width = 82;
const height = 82;
const { chatClick, chatIconMoveStartTime, chatIconMoveEndTime } = useChat();
const isDragging = ref(false);
const { width: windowWidth, height: widthHeight } = useWindowSize();

const { x, y } = useDraggable(cgChat, {
  initialValue: { x: windowWidth.value - width, y: widthHeight.value - 300 },
  onStart() {
    document.body.style.overflow = 'hidden';
    chatIconMoveStartTime.value = new Date().getTime();
    isDragging.value = true;
  },
  onEnd() {
    document.body.style.overflow = 'auto';
    chatIconMoveEndTime.value = new Date().getTime();
    isDragging.value = false;
  }
});

watch([x, y], () => {
  if (x.value <= 0) x.value = 0;
  if (y.value <= 0) y.value = 0;
  if (x.value > windowWidth.value - width) x.value = windowWidth.value - width;
  if (y.value > widthHeight.value - height) y.value = widthHeight.value - height;
});

const style = computed(() => {
  return {
    width: `${width}px`,
    height: `${height}px`,
    left: `${x.value}px`,
    top: `${y.value}px`
  };
});
</script>

<template>
  <teleport to="body">
    <div ref="cgChat" class="cg-chat" :style="style" @contextmenu.prevent.stop="null" @click="chatClick">
      <div class="cg-chat-icon" @contextmenu.prevent.stop="null">
        <app-image class="c-img img_shadow" src="/webp/i_game_drag.webp" />
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
