<script lang="ts" setup>
import search from '@image/chat/search.png?preset=full'
import closure from '@image/chat/closure.png?preset=full'
import content from '@image/chat/contentBg.png?preset=full'
import image from '@image/chat/image.png?preset=full'
import send from '@image/chat/send.png?preset=full'
import emoji from '@image/chat/emoji.png?preset=full'
import notice from '@image/chat/notice.png?preset=full'
import close from '@image/my/close.png?preset=full'
import sendGrey from '@image/chat/send_grey.png?preset=full'
import { throttle } from 'lodash-es'
import { useScroll } from '@vueuse/core'
import handleUploadImg from '../../hooks/uploadImg'
const router = useRouter()

const { gid, friend_uid, name: NAME, avatar: AVATAR, is_group: isGroup } = JSON.parse(sessionStorage.getItem('CHAT_DATA') || '{}')
const chatState = chatStateStore()
const { memberList, atList, isManage, aite_user } = storeToRefs(chatState)
const contentBg = getImageUrl(content)
const closeUrl = getSupportImage(close)
const noticeUrl = getSupportImage(notice)
const searchUrl = getSupportImage(search)
const imageUrl = getSupportImage(image)
const sendUrl = getSupportImage(send)
const sendGreyUrl = getSupportImage(sendGrey)
const emojiUrl = getSupportImage(emoji)
const searchTop = ref(96)
// const searchList = ref<Array<ChatT.ChatType>>([])
const isSearch = ref(false)
const viewEmoji = ref(false)
const searchValue = ref()
const inputText = ref('')
const imgMsg = ref()
const imgViewUrl = ref()
const keyword = ref()
const chatContentRef = ref()

const sendFinish = () => {
  viewEmoji.value = false
}

const reductionName = (text: string) => {
  if (aite_user.value.length) {
    const names: Array<any> = []
    aite_user.value.forEach((item) => {
      const active: any = memberList.value.find(x => x.uid === item)
      names.push(active.username)
    })
    names.forEach((item) => {
      text = text.replace(/(@{)([^}]*)(})/, `@[${item}]`)
    })
    return text
  }
  else {
    return text
  }
}

const sendGroupMethod = (isImg: boolean) => {
  const param: ChatT.AendSmgParam = { gid }
  if (isImg) {
    param.img = imgViewUrl.value
    param.content = reductionName(imgMsg.value)
    if (aite_user.value.length)
      param.aite_user = aite_user.value.join(',')
  }
  else {
    const Div = document.createElement('div')
    Div.innerHTML = inputText.value.replace(/\<span style=\"color:#597EF7\"\>/g, '{').replace(/<\/span>/g, '}').replace(/&nbsp;/g, ' ')
    param.content = reductionName(Div.innerText)
    if (aite_user.value.length)
      param.aite_user = aite_user.value.join(',')
  }
  useRequest(() => sendGroupPublish(param), {
    onSuccess() {
      inputText.value = ''
      imgMsg.value = ''
      imgViewUrl.value = ''
      sendFinish()
      chatState.SetAiteUser([])
    },
  })
}

const sendFriendMethod = (isImg: boolean) => {
  const param: ChatT.AendSmgParam = { chat_id: gid }
  if (isImg) {
    param.img = imgViewUrl.value
    param.content = imgMsg.value
  }
  else {
    const Div = document.createElement('div')
    Div.innerHTML = inputText.value
    param.content = Div.innerText
  }
  useRequest(() => sendPersonalPublish(param), {
    onSuccess() {
      inputText.value = ''
      imgMsg.value = ''
      imgViewUrl.value = ''
      sendFinish()
      chatState.SetAiteUser([])
    },
  })
}

const sendMsg = throttle(() => {
  const Div = document.createElement('div')
  Div.innerHTML = inputText.value
  const value = Div.innerText.trim()
  inputText.value = inputText.value.replace(/&nbsp;/g, ' ').trim()
  if (!value)
    return showToast('消息不能为空')
  if (isGroup)
    sendGroupMethod(false)
  else
    sendFriendMethod(false)
}, 1000, {
  leading: true,
  trailing: false,
})

const enterSendMsg = (val: string) => {
  const Div = document.createElement('div')
  Div.innerHTML = val
  const value = Div.innerText.trim()
  const _val = val.replace(/&nbsp;/g, ' ').trim()
  if (!value)
    return showToast('消息不能为空')
  inputText.value = _val
  if (isGroup)
    sendGroupMethod(false)
  else
    sendFriendMethod(false)
}

const globalLoading = ref(false)
const afterRead = async (data: any) => {
  if (globalLoading.value)
    return
  try {
    globalLoading.value = true
    handleUploadImg(data.file).then((res: any) => {
      imgViewUrl.value = res
    })
    const Div = document.createElement('div')
    Div.innerHTML = inputText.value.replace(/\<span style=\"color:#597EF7\"\>/g, '{').replace(/<\/span>/g, '}').replace(/&nbsp;/g, ' ')
    imgMsg.value = Div.innerText
    globalLoading.value = false
  }
  catch (error) {
    globalLoading.value = false
  }
}

const sendImgMsg = () => {
  imgMsg.value = imgMsg.value.trim()
  if (isGroup)
    sendGroupMethod(true)
  else
    sendFriendMethod(true)
}

const onClose = () => {
  imgMsg.value = ''
  imgViewUrl.value = ''
}

const setViewEmoji = () => {
  viewEmoji.value = !viewEmoji.value
}

const changeInputText = (val: any) => {
  inputText.value = inputText.value + val
}

const controller = ref()
const searchFn = (param: any) => {
  controller.value = new AbortController()
  if (isGroup)
    return getChatHistory(param, controller.value.signal)
  else
    return getChatMemberHistory(param, controller.value.signal)
}

let mergeList: any = []

const { data, run: searchRun, loading: searchloding, mutate }: any = useRequest(param => searchFn(param), {
  manual: true,
  throttleInterval: 500,
  loadingKeep: 1000,
})

const searchList: any = computed(() => {
  mergeList = mergeList.concat(data.value?.d || [])
  return mergeList
})
const sum = computed(() => data.value?.t)

const searchHandler = () => {
  if (!searchValue.value)
    return

  mergeList = []
  if (isGroup)
    searchRun({ gid, pagesize: 50, ud: 'u', keyword: searchValue.value })
  else
    searchRun({ chat_id: gid, pagesize: 50, ud: 'u', keyword: searchValue.value })

  keyword.value = searchValue.value
}

const closureSearch = () => {
  // 取消请求
  if (isSearch.value && searchloding.value)
    controller.value.abort()

  isSearch.value = !isSearch.value
  // searchValue.value = ''
  // keyword.value = ''
  // mergeList = []
  mutate({ d: [], t: 0 })
  setTimeout(() => {
    searchTop.value = document.getElementById('ChatHeaderRef')?.offsetHeight || 96
  }, 50)
}

const onSearch = (item: ChatT.ChatType) => {
  isSearch.value = false
  // mergeList = []
  // keyword.value = ''
  chatContentRef.value.jumpAtIndex(new Date(item.ts).getTime(), item.ts)
}

const onAtClick = () => {
  const atId = atList.value.shift() || ''
  readMemberSmg({ ts: atId, gid, type: isGroup ? 0 : 1 })
  chatContentRef.value.jumpAtIndex(Number(atId.slice(0, 13)), atId)
}

const beforeRead = (file: any) => {
  const maxSize = 10 * 1024 * 1024
  const imageList = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp']
  if (!imageList.includes(file.type)) {
    showToast('请上传 jpeg、png、webp 格式图片')
    return false
  }
  if (file.size > maxSize) {
    showToast('发送的图片大小不得超过10M')
    return false
  }
  return true
}

const goDetail = () => {
  console.error('跳转详情')
  chatState.CacheChatHistoryList()
  router.push(isGroup ? `/chat/group?gid=${gid}` : `/friends/friend-remark?friend_uid=${friend_uid}`)
}

const heightCalculate = computed(() => {
  const leg = searchList.value.length
  return `${(leg * 54 > 240 ? 240 : leg * 54) / 37.5}rem`
})

const searchRef = ref()
const { directions } = useScroll(searchRef, { behavior: 'smooth' })
const { bottom: toBottom } = toRefs(directions)

const onScroll = (e: any) => {
  const _SearchRef: any = document.getElementById('searchRef')
  const _height = _SearchRef.scrollHeight - _SearchRef.offsetHeight
  const leg = searchList.value.length
  if (toBottom && sum.value > leg && _height - e.target.scrollTop < 5) {
    const ts = searchList.value[leg - 1].ts
    if (isGroup)
      searchRun({ gid, pagesize: 50, ud: 'u', keyword: keyword.value, ts })
    else
      searchRun({ chat_id: gid, pagesize: 50, ud: 'u', keyword: keyword.value, ts })
  }
}

const chatLoading = ref(true)
onMounted(async () => {
  chatLoading.value = true
  if (isGroup) {
    await chatState.GetGroupAnnouncement({ gid })
    await chatState.GetGroupMemberList({ gid })
    await chatState.GetChatHistoryList({ gid, pagesize: 50, ud: 'u' })
  }
  else {
    await chatState.GetChatHistoryList({ chat_id: gid, pagesize: 50, ud: 'u' })
  }

  chatLoading.value = false
  sendFinish()
})

// window.onresize = () => {
//   console.log('innerHeight', window.innerHeight)
//   nextTick(() => {
//     document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`)
//   })
// }
</script>

<template>
  <div class="chat_def_amin" flex flex-col>
    <GlobalLoading v-if="globalLoading" />
    <ChatHeader id="ChatHeaderRef" ref="ChatHeaderRef" :title="NAME" :is-close="true">
      <template #actions>
        <img class="search" :src="searchUrl" @click="closureSearch">
      </template>
      <template #leading>
        <cg-avatar
          :src="AVATAR" size="mini"
          @click="goDetail"
        />
      </template>
      <template v-if="isSearch" #bottom>
        <div class="search_content" flex items-center>
          <van-search
            v-model="searchValue"
            maxlength="20" class="search_input" placeholder="搜索" background="transparent" p-2
            w-323px @search="searchHandler"
          />
          <img class="search" :src="getSupportImage(closure)" @click="closureSearch">
        </div>
      </template>
    </ChatHeader>
    <div
      v-if="isSearch"
      id="searchRef"
      ref="searchRef"
      class="search_list"
      :class="{ search_list_h: isSearch }"
      :style="{ top: `${searchTop}px`, height: heightCalculate }"
      @scroll="onScroll"
    >
      <div v-for="item in searchList" :key="item.t" class="search_list_item" @click="onSearch(item)">
        <cg-avatar :src="item.avatar" size="small" />
        <div class="search_name">
          <p>{{ nameDesensitization(item.name, isManage) }}</p>
          <p class="search_c" v-html="unescapeSearch(item.c, keyword)" />
        </div>
        <div class="time">
          {{ setTimeView(item.t) }}
        </div>
      </div>
    </div>
    <van-notice-bar
      v-if="!isSearch && isGroup"
      scrollable h-25px background="#FFFFFF" color="#7F89A7"
      :text="chatState.announcement || '暂无公告'"
    >
      <template #left-icon>
        <img w-18px h-15px :src="noticeUrl">
      </template>
    </van-notice-bar>
    <div class="chat_content" @click="(viewEmoji = false)">
      <cg-loading v-if="chatLoading || isSearch && searchloding" />
      <chat-content ref="chatContentRef" :is-group="isGroup" :gid="gid" />
      <div v-if="atList.length" class="at" @click="onAtClick">
        @
      </div>
    </div>
    <div class="chat_footer" flex items-end>
      <van-uploader accept="image/png, image/jpeg, image/webp" :after-read="afterRead" :before-read="beforeRead">
        <img class="chat_icon" :src="imageUrl">
      </van-uploader>
      <cg-editor
        v-model="inputText" son-class="editor_main" :is-group="isGroup" placeholder="请输入内容"
        :member-list="memberList" :height="15" @change="enterSendMsg"
      >
        <template #button>
          <img class="chat_icon" :src="emojiUrl" @click="setViewEmoji">
        </template>
      </cg-editor>
      <img class="chat_icon" :src="sendUrl" @click="sendMsg">
    </div>
    <div v-if="imgViewUrl" class="img_view">
      <img class="close" :src="closeUrl" @click="onClose">
      <div class="view_img">
        <img :src="showImgType(imgViewUrl)" alt="">
      </div>
      <div flex>
        <van-field v-model="imgMsg" class="img_input" placeholder="添加描述" />
        <img w-34px h-34px :src="sendGreyUrl" @click="sendImgMsg">
      </div>
    </div>
    <div v-if="viewEmoji">
      <cg-emoji @change="changeInputText" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat_def_amin{
  width: 100%;
  // height: var(--viewport-height);
  height: 100%;
}

.van_loading {
  position: fixed;
  width: 100%;
  height: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba($color: #000000, $alpha: .4);
  z-index: 999;
  overflow: hidden;
}
.search {
  width: $size20;
  height: $size20;
}

.loading_img {
  width: 100%;
  transform: rotateX(180deg);
}

.search_list {
  position: fixed;
  z-index: 88;
  width: 100%;
  height: 0px;
  background-color: $color-white-1;
  box-shadow: 0px 1px 10px $color-gray-1;
  transition: height 0.4s;
  overflow-x: hidden;
  overflow-y: auto;

  .search_name {
    flex: 1;
    margin-left: 10px;
    overflow: hidden;

    p {
      font-weight: 600;
    }

    .search_c {
      height: 19px;
      font-weight: 400;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

    }
  }

  &_item {
    font-size: $size14;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 1.44rem;
    padding: 0 16px;

    &:hover,
    &:active {
      background-color: $color-white-4;
    }

    .time {
      position: relative;
      font-size: $size12;
      color: $color-gray-3;
      transform: scale(0.834);
      transform-origin: bottom right;
      bottom: -10px;
    }
  }

}

.search_list_h {
  height: 240px;
}

.chat_icon {
  width: 34px;
  height: 34px;
}

.search_content {
  padding: 0 0 8px 8px;

  .search_input {
    padding: 0;
    padding-right: 12px;
    border-radius: 4px;
  }
}

.chat_content {
  position: relative;
  flex: 1;
  background-image: v-bind(contentBg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 6px 0;
  overflow: hidden;

  &:deep(.vue-recycle-scroller__item-view) {
    padding: 0 16px;
  }

  .at{
    position: absolute;
    top: 16px;
    right: 16px;
    font-size: $size16;
    color: $color-blue-1;
    font-weight: 600;
  }
}

.chat_footer {
  position: relative;
  min-height: 50px;
  background-color: $color-white-2;
  box-shadow: 0px 0px 20px $color-gray-1;
  padding: 8px;
  display: flex;
  align-items: center;

  &:deep(.van-uploader) {
    width: 40px;
    height: 40px;
    .van-uploader__wrapper,.van-uploader__input-wrapper{
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &:deep(.van-uploader__input){
    width: 40px;
    height: 40px;
  }

  .chat_input {
    min-height: 34px;
    padding: 0;
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid $color-gray-9;

    &:deep(.van-cell__value) {
      min-height: 34px;
    }

    &:deep(.van-field__body) {
      min-height: 34px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end !important;
    }

    &:deep(.van-field__button) {
      height: 34px;
    }

    &:deep(.van-field__control) {
      min-height: 34px !important;
      padding: 8px 0px 8px 10px;
      line-height: $size18;
      font-size: $size14 ;

      &::-webkit-scrollbar {
        display: none;
        /* Chrome Safari */
      }
    }
  }
}

.member_list {
  width: 100%;
  height: 0px;
  position: absolute;
  left: 0;
  background-color: $color-white-1;
  box-shadow: 0px 0px 20px $color-gray-1;
  transition: height 0.4s;
  overflow-y: auto;

  &_item {
    height: 54px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    font-size: $size14;
    color: $color-gray-2;
    font-weight: 600;

    &>span {
      padding-left: 10px;
    }

    &:hover {
      background-color: $color-white-4;
    }
  }
}

.member_list_h {
  height: 240px;
}

.img_view {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: $col_black_1;
  display: flex;
  flex-direction: column;
  z-index: 99;

  .close {
    width: 18px;
    height: 18px;
    position: absolute;
    top: 18px;
    right: 16px;
  }

  .view_img {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;

    &>img {
      max-width: 100%;
    }
  }

  .input_cont {
    display: flex;
  }

  .img_main {
    width: 34px;
    height: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .img_input {
    height: 34px;
    width: 318px;
    background: #FFFFFF;
    border: 1px solid #D6D7EC;
    border-radius: 30px;
    margin-left: 16px;
    margin-bottom: 8px;
    padding: 4px 12px;
  }
}
</style>

