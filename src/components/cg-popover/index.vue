<script setup lang='ts'>
import del from '@image/chat/delete.png?preset=full'
import viewIcon from '@image/chat/viewIcon.png?preset=full'
import { useMouseInElement, useWindowSize } from '@vueuse/core'
import { showImagePreview } from 'vant'

const props = withDefaults(defineProps<{
  placement?: any
  isDel: boolean
  gid: string
  ts: string
  isGroup: boolean
  me?: boolean
  imgUrl?: string
}>(), {
  placement: 'bottom-start',
  isDel: false,
  gid: '',
  ts: '',
  isGroup: false,
  me: false,
  imgUrl: '',

})

const chatState = chatStateStore()
const { isManage } = storeToRefs(chatState)

const showPopover = ref(false)

const startDelChatSmg = (params: ChatT.delSmgParam) => {
  if (params.gid) {
    useRequest(() => delGroupSmg(params), {
      onSuccess() {
        chatState.delChatSmg(params.ts)
        showPopover.value = false
      },
    })
  }

  else {
    useRequest(() => delMemberSmg(params), {
      onSuccess() {
        chatState.delChatSmg(params.ts)
        showPopover.value = false
      },
    })
  }
}

const viewImg = () => {
  showImagePreview({ images: [viewImgType(props.imgUrl)], closeable: true })
  showPopover.value = false
}

const onSelect = () => {
  const params: ChatT.delSmgParam = { ts: props.ts }
  if (props.isGroup)
    params.gid = props.gid
  else
    params.chat_id = props.gid

  startDelChatSmg(params)
}

const { y } = useMouseInElement()

const { height } = useWindowSize()

const _placement = ref(props.placement)
watch(() => props.placement, (newval) => {
  _placement.value = newval
})
const openPopover = () => {
  _placement.value = height.value - y.value < 200 ? props.placement === 'bottom-start' ? 'top-start' : 'top-end' : props.placement
}
</script>

<template>
  <van-popover v-if="(isManage && isDel && me && !isGroup) || (isManage && isDel && isGroup)" id="imgPopoverRef" v-model:show="showPopover" :overlay="true" :placement="_placement" @open="openPopover">
    <div v-if="imgUrl" class="delete view" @click="viewImg">
      <span>查看</span>
      <img class="view_icon" :src="getSupportImage(viewIcon)">
    </div>
    <div class="border_d" />
    <div class="delete" @click="onSelect">
      <span>删除</span>
      <img class="delete_icon" :src="getSupportImage(del)">
    </div>
    <template #reference>
      <slot name="content" />
    </template>
  </van-popover>
  <van-popover v-else-if="imgUrl" v-model:show="showPopover" :overlay="true" :placement="_placement">
    <div v-if="imgUrl" class="delete view" @click="viewImg">
      <span>查看</span>
      <img class="view_icon" :src="getSupportImage(viewIcon)">
    </div>
    <template #reference>
      <slot name="content" />
    </template>
  </van-popover>
  <slot v-else name="content" />
</template>

<style lang='scss' scoped>
.delete {
    width: 225px;
    height: 35px;
    background: $color-white-2;
    border-radius: 6px;
    padding:0 16px;
    font-size: $size14;
    color: $color-red-4;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &_icon{
        width: 14px;
        height: 19px;
    }
}

.view{
  color: $color-gray-2;

  &_icon{
        width: 20px;
        height: 20px;
  }
}

.border_d {
  width: 100%;
  height: 0.5px;
  background-color: $color-gray-1;
}
</style>

<style lang='scss'>
.van-popover--light .van-popover__arrow{
    color: $color-white-2;
}
</style>
