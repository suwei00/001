<script setup lang='ts'>
import msgSrc from '~/assets/images/home/msg.png?preset=full'
import guide1 from '~/assets/images/home/guide1.png?preset=full'
import guide2 from '~/assets/images/home/guide2.png?preset=full'
import closureIcon from '~/assets/images/home/closure_icon.png?preset=full'
import useRouterBack from '~/hooks/routerBackHooks'
const { width: windowWidth, height: widthHeight } = useWindowSize()
const { goTo } = useRouterBack()
const { token } = storeToRefs(useUserInfoStore())
const dragState = dragStateStore()
const { showChat, guideVisible } = storeToRefs(dragState)

const closureRef = ref()
const chatRef = ref()
const moveIn = ref(false)
const active = ref(false)
const chatIconMoveStartTime = ref<number>(0)
const chatIconMoveEndTime = ref<number>(0)
const ballWidth = 60
const timeout = ref()

const { x, y, style } = useDraggable(chatRef, {
  initialValue: { x: windowWidth.value - ballWidth, y: widthHeight.value - ballWidth - 160 },
  onStart() {
    timeout.value = setTimeout(() => {
      active.value = true
    }, 200)
    if (guideVisible.value) {
      dragState.setShowChat(!showChat.value)
      dragState.setGuideVisible(false)
      readTutorialState()
    }
    console.log('asdfasdfasd')
    chatIconMoveStartTime.value = new Date().getTime()
  },
  onMove() {
    if (closureRef.value) {
      const _closureRef = closureRef.value.getBoundingClientRect()
      moveIn.value = y.value > _closureRef.top && x.value > _closureRef.left
    }
  },
  onEnd() {
    clearTimeout(timeout.value)
    active.value = false
    moveIn.value = false
    chatIconMoveEndTime.value = new Date().getTime()
    console.log('21323412341234')
    if (closureRef.value) {
      const _closureRef = closureRef.value.getBoundingClientRect()
      if (y.value > _closureRef.top && x.value > _closureRef.left)
        dragState.setIsShowDrag(false)
    }

    if (x.value > windowWidth.value / 2)
      x.value = windowWidth.value - 60
    else
      x.value = 10
  },
})

// 小球范围限制
watch([x, y], () => {
  if (x.value <= 0)
    x.value = 0
  if (y.value <= 84)
    y.value = 84
  if (x.value > windowWidth.value - ballWidth)
    x.value = windowWidth.value - ballWidth
  if (y.value > widthHeight.value - ballWidth)
    y.value = widthHeight.value - ballWidth
})

// 判断是不是点击
const isChatIconClick = computed(() => {
  if (!chatIconMoveStartTime.value || !chatIconMoveEndTime.value)
    return false
  return chatIconMoveEndTime.value > chatIconMoveStartTime.value && chatIconMoveEndTime.value - chatIconMoveStartTime.value < 200
})

const openChat = () => {
  if (isChatIconClick.value) {
    if (token.value)
      dragState.setShowChat(!showChat.value)
    else goTo('/entry/login')
  }
}
</script>

<template>
  <div ref="chatRef" style="touch-action:none" :class="{ drag_img_opacity: !active, drag_img_active: active }" :style="style" @mousedown.prevent.stop="null" @touchstart.prevent.stop="null" @touchend.prevent.stop="openChat">
    <img class="drag_img" :src="getSupportImage(msgSrc)">
  </div>
  <div v-if="active" ref="closureRef" class="closure" :class="{ closure_move: moveIn }">
    <div class="closure_con">
      <img class="closure_icon" :src="getSupportImage(closureIcon)" alt="">
      <div class="closure_text">
        取消浮窗
      </div>
    </div>
  </div>
  <div v-if="guideVisible" class="drag_main">
    <div class="guide">
      <img class="guide1" :src="getSupportImage(guide1)" alt="">
      <img :style="{ width: '210px', left: `${x - 180}px`, top: `${y - 50}px` }" class="guide2" :src="getSupportImage(guide2)" alt="">
    </div>
  </div>
</template>

<style lang='scss' scoped>
.drag_main{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
.guide{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #333333, $alpha: 0.7);
  z-index: 2400;
  .guide1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
    width: 320px;
  }
  .guide2 {
    position: absolute;
  }
}

.drag_img {
    width: 47px;
    height: 49px;
    pointer-events: none;
}

.drag_img_opacity {
    position: fixed;
    opacity: 0.8;
    z-index: 9999;
    transition: left 0.2s;
}

.drag_img_active {
    position: fixed;
    z-index: 9999;
    animation: jelly 0.5s;
}

.closure {
    position: fixed;
    background-color: #597EF7;
    border-radius: 280px;
    width: 280px;
    height: 280px;
    right: -140px;
    bottom: -140px;
    z-index: 9998;
    transition: all 0.2s;

    .closure_con {
        position: fixed;
        width: 140px;
        height: 140px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        bottom: -20px;
        right: -20px;

        .closure_icon {
            width: 34px;
            height: 34px;
            margin-bottom: 6px;
        }

        .closure_text {
            font-size: 12px;
            font-family: PingFang SC-Semibold, PingFang SC;
            font-weight: 600;
            color: #CAD4FA;
        }
    }
}

.closure_move {
    width: 290px;
    height: 290px;
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

