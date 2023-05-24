<script setup lang='ts'>
// import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import VIP1 from '@image/vip/VIP1.png?preset=full'
import VIP2 from '@image/vip/VIP2.png?preset=full'
import VIP3 from '@image/vip/VIP3.png?preset=full'
import VIP4 from '@image/vip/VIP4.png?preset=full'
import VIP5 from '@image/vip/VIP5.png?preset=full'
import VIP6 from '@image/vip/VIP6.png?preset=full'
import VIP7 from '@image/vip/VIP7.png?preset=full'
import VIP8 from '@image/vip/VIP8.png?preset=full'
import VIP9 from '@image/vip/VIP9.png?preset=full'
import VIP10 from '@image/vip/VIP10.png?preset=full'
import subsHe from '@image/chat/subs_he.png?preset=full'
import subsMe from '@image/chat/subs_me.png?preset=full'
import { throttle } from 'lodash-es'
import { useScroll } from '@vueuse/core'
import Event from '@/utils/event.js'

const { isGroup, gid } = defineProps<{ isGroup: string; gid: string }>()
const chatState = chatStateStore()
const { canAddNewFriend } = $(storeToRefs(useUserStore()))

const router = useRouter()

const { historyList, isManage } = storeToRefs(chatState)
const VIPUrl1 = getSupportImage(VIP1)
const VIPUrl2 = getSupportImage(VIP2)
const VIPUrl3 = getSupportImage(VIP3)
const VIPUrl4 = getSupportImage(VIP4)
const VIPUrl5 = getSupportImage(VIP5)
const VIPUrl6 = getSupportImage(VIP6)
const VIPUrl7 = getSupportImage(VIP7)
const VIPUrl8 = getSupportImage(VIP8)
const VIPUrl9 = getSupportImage(VIP9)
const VIPUrl10 = getSupportImage(VIP10)
const ScrollerRef = ref()

const posId = ref()
const levelList = [VIPUrl1, VIPUrl2, VIPUrl3, VIPUrl4, VIPUrl5, VIPUrl6, VIPUrl7, VIPUrl8, VIPUrl9, VIPUrl10]
const isVisible = ref(true)
const theFirstTime = ref(true)

const stopPage = ref(false)

const io = new IntersectionObserver((entries) => {
  isVisible.value = entries[0].intersectionRatio > 0
}, {
  root: document.getElementById('msgRef'),
})

const { directions } = useScroll(ScrollerRef, { behavior: 'smooth' })
const { top: toTop, bottom: toBottom } = toRefs(directions)

const setScrollTop = () => {
  const _msgRef: any = document.getElementById('msgRef')
  setTimeout(() => {
    const atLast = historyList.value[historyList.value.length - 1]
    if (isVisible.value || theFirstTime.value || atLast?.is_own === 1) {
      stopPage.value = true
      _msgRef.scrollTop = _msgRef.scrollHeight
      setTimeout(() => {
        stopPage.value = false
      }, 100)
    }
  }, 10)
}

watch(() => historyList.value, (newval, oldVal) => {
  const _msgRef: any = document.getElementById('msgRef')
  if (theFirstTime.value) {
    setScrollTop()
    setTimeout(() => {
      theFirstTime.value = false
    }, 500)
  }
  else if (_msgRef.scrollTop < 1 && !stopPage.value) {
    _msgRef.scrollTop = 1
  }
  else if (newval.length) {
    stopPage.value = false
  }

  if (posId.value) {
    if (newval.length > oldVal.length) {
      setTimeout(() => {
        const _msgRef: any = document.getElementById('msgRef')
        if (_msgRef.scrollTop < 1) {
          _msgRef.scrollTop = (document.getElementById(posId.value)?.offsetTop || 0) + 20
          posId.value = ''
        }
        else {
          posId.value = ''
        }
      }, 100)
    }
    else {
      posId.value = ''
    }
  }

  setTimeout(() => {
    const sgRef: any = document.getElementById(newval[newval.length - 1].ts)
    io.observe(sgRef)
  }, 500)
})

const UpData = () => {
  const params: any = { pagesize: 50, ud: 'u' }
  if (historyList.value.length) {
    posId.value = historyList.value[0].ts
    params.ts = historyList.value[0].ts
  }

  if (isGroup)
    params.gid = gid
  else
    params.chat_id = gid

  chatState.GetChatHistoryList(params)
}

const DownData = () => {
  const params: any = { pagesize: 50, ud: 'd' }
  if (historyList.value.length)
    params.ts = historyList.value[historyList.value.length - 1].ts

  if (isGroup)
    params.gid = gid
  else
    params.chat_id = gid

  chatState.GetChatHistoryList(params)
}

const throttleUpData = throttle(UpData, 500, { leading: true, trailing: false })
const throttleDownData = throttle(DownData, 5000, { leading: true, trailing: false })

const onScroll = (e: any) => {
  if (stopPage.value)
    return
  const _msgRef: any = document.getElementById('msgRef')
  const _height = _msgRef.scrollHeight - _msgRef.offsetHeight
  if (toTop.value && e.target.scrollTop < 500)
    throttleUpData()
  else if (toBottom.value && _height - e.target.scrollTop < 10)
    throttleDownData()
}

const positionSearch = (t: string) => {
  stopPage.value = true
  chatState.CacheChatHistoryList()
  if (isGroup)
    chatState.PositionChatHistoryList({ gid, pagesize: 50, ud: 'de', ts: t })
  else
    chatState.PositionChatHistoryList({ chat_id: gid, pagesize: 50, ud: 'de', ts: t })
}

const jumpAtIndex = (time: number, t: string) => {
  const active: any = historyList.value.find((x: any) => new Date(x.ts).getTime() === time)
  if (active)
    document.getElementById(active.id)?.scrollIntoView()
  else
    positionSearch(t)
}

// 过滤没有权限看到的信息
// const viewList = computed((): Array<any> => {
//   if (isManage.value)
//     return historyList.value
//   else
//     return historyList.value.filter(item => item.f !== '2')
// })

const viewList = computed((): Array<any> => historyList.value)

const jumpMemberDetail = (item: ChatT.ChatType) => {
  // 是好友
  if (item.is_friend === 1)
    return router.push(`/friends/friend-remark?friend_uid=${item.uid}`)

  showToast('对方还不是您的好友')
  // // 管理员或群主
  // else if (isManage.value) {
  //   sessionStorage.setItem('NewFriendData', JSON.stringify(item))
  //   router.push('/friends/friend-info')
  // }
  // // 普通用户
  // else if (canAddNewFriend) {
  //   sessionStorage.setItem('NewFriendData', JSON.stringify(item))
  //   router.push('/friends/friend-info')
  // }
}

Event.on('EventSetScrollTop', () => {
  setScrollTop()
})

defineExpose({ jumpAtIndex })
</script>

<template>
  <!-- <DynamicScroller
    id="msgRef"
    ref="ScrollerRef"
    :items="viewList"
    key-field="id"
    :min-item-size="23"
    class="chat_scroller"
    @scroll="onScroll"
  >
    <template #default="{ item, index, active }">
      <DynamicScrollerItem
        :item="item"
        :active="active"
        class="chat_item"
        :class="{ 'justify-start': item.is_own !== 1, 'justify-end': item.is_own === 1 }"
        :size-dependencies="[
          item.c, item.img,
        ]"
        :data-index="index"
      > -->
  <div
    id="msgRef"
    ref="ScrollerRef"
    class="chat_scroller"
    @scroll="onScroll"
  >
    <div v-for="item in viewList" :id="item.id" :key="item.id" class="chat_item" :class="{ 'justify-start': item.is_own !== 1, 'justify-end': item.is_own === 1 }">
      <div v-if="item.f === '1' || item.f === '4'" class="chat">
        <template v-if="item.is_own !== 1">
          <cg-avatar v-if="item.avatar && isGroup" :src="item.avatar" size="mid" class="avatar" @click="jumpMemberDetail(item)" />
          <div class="special_content">
            <div class="special">
              <span class="name">{{ nameDesensitization(item.name || item.sender_name, isManage) }}</span>
              <div v-if="item.state === '4' || item.state === '2'" class="tag" :class="{ tag1: item.state === '2' }">
                <span>{{ item.state === '4' ? '群主' : '管理' }}</span>
              </div>
              <img class="level" :src="levelList[item.v - 1]">
            </div>
            <cg-popover v-if="item.img && item.is_del === 0" :img-url="item.img" :gid="gid" :is-group="isGroup" :ts="item.ts" :is-del="item.is_del === 0">
              <template #content>
                <div class="image img_he_cont">
                  <img class="subs_he" :src="getSupportImage(subsHe)">
                  <img
                    class="img_con" :src="showImgType(item.img)"
                  >
                  <div v-if="item.c" class="img_text chat_html" v-html="unescapeHtml(item.c, item.is_del)" />
                  <div :class="item.c ? 'time_te' : 'img_time'">
                    {{ setTimeView(item.t) }}
                  </div>
                </div>
              </template>
            </cg-popover>
            <cg-popover v-else :gid="gid" :ts="item.ts" :is-group="isGroup" :is-del="item.is_del === 0">
              <template #content>
                <div class="he_cont">
                  <img class="subs_he" :src="getSupportImage(subsHe)">
                  <div class="chat_html">
                    <span v-html="unescapeHtml(item.c, item.is_del)" />
                    <span class="time_vis">{{ setTimeView(item.t) }}</span>
                  </div>
                  <span class="time">{{ setTimeView(item.t) }}</span>
                </div>
              </template>
            </cg-popover>
          </div>
        </template>
        <template v-else>
          <!-- <img v-if="!item.id" class="fail" :src="getSupportImage(fail)"> -->
          <cg-popover v-if="item.img && item.is_del === 0" :img-url="item.img" :ts="item.ts" :gid="gid" :is-group="isGroup" :me="true" placement="bottom-end" :is-del="item.is_del === 0">
            <template #content>
              <div class="image img_cont">
                <img class="subs_me" :src="getSupportImage(subsMe)">
                <img
                  class="img_con" :src="showImgType(item.img)"
                >
                <div v-if="item.c" class="img_text chat_html" v-html="unescapeHtml(item.c, item.is_del)" />
                <span :class="item.c ? 'time_te' : 'img_time'">{{ setTimeView(item.t) }}</span>
              </div>
            </template>
          </cg-popover>
          <cg-popover v-else placement="bottom-end" :ts="item.ts" :is-group="isGroup" :me="true" :gid="gid" :is-del="item.is_del === 0">
            <template #content>
              <div class="i_cont">
                <img class="subs_me" :src="getSupportImage(subsMe)">
                <div class="chat_html">
                  <span v-html="unescapeHtml(item.c, item.is_del)" />
                  <span class="time_vis">{{ setTimeView(item.t) }}</span>
                </div>
                <span class="time">{{ setTimeView(item.t) }}</span>
              </div>
            </template>
          </cg-popover>
        </template>
      </div>
      <div
        v-else class="system"
        :class="{ time_content: item.f === 't' }"
        v-html="unescapeHtml(item.c)"
      />
    </div>
  </div>
  <!-- </DynamicScrollerItem>
    </template>
  </DynamicScroller> -->
</template>

<style lang='scss' scoped>
@mixin content ($color1, $color2, $color3) {
  position: relative;
  max-width: 250px;
  background-color: $color1;
  border: 1px solid $color2;
  border-radius: 6px;
  box-shadow: 0px 3px 6px 1px $color3;
}
.chat_html {
  display: inline-block;
  max-width: 166px;
  word-wrap:break-word;
  word-break:break-all;
}
.chat_scroller{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding:  0 18px;
  scrollbar-width: none ;
  -ms-overflow-style: none ;
  &::-webkit-scrollbar {
      display: none;
  }
}

.chat_item {
  font-size: $size14;
  font-weight: 400;
  display: flex;
  align-items: flex-start;

  .system {
    height: 22px;
    background: $color-white-1;
    border-radius: 12px;
    color: $color-gray-2;
    font-size: $size12;
    border: 1px solid $color-gray-12;
    box-shadow: 0px 3px 6px 1px rgba(165, 167, 208, 0.16);
    padding: 0 10px;
    line-height: 22px;
    margin: 4px auto;
  }

  .time_content {
    font-weight: 600;
  }

  .chat {
    position: relative;
    display: flex;
    align-items: flex-start;
    margin: 10px 0;

    .special_content{
      display: flex;
      align-items: flex-start;
      flex-direction: column;
    }

    .special {
      display: flex;
      align-items: center;
      height: 22px;

      .name {
        font-size: $size13;
        font-weight: 600;
        margin-right: 6px;
      }

      .tag {
        width: 28px;
        height: 16px;
        margin-right: 6px;
        background-color: $color-red-3;
        border-radius: 3px;

        &>span {
          width: 56px;
          height: 32px;
          display: inline-block;
          color: $color-white-1;
          font-size: $size18;
          transform: scale(0.5);
          transform-origin: top left;
          text-align: center;
          line-height: 32px;
        }
      }

      .tag1{
        background-color: $color-blue-4;
      }
    }

    .level {
      width: 57px;
      height: 20px;
    }

    .fail {
      width: 18px;
      height: 18px;
      margin-right: 12px;
      margin-top: 10px;
    }
  }

  .avatar {
    margin-right: 10px;
  }

  .subs_me {
    position: absolute;
    width: 11px;
    height: 10px;
    right: -10.5px;
    top: 4px;
  }

  .subs_he {
    position: absolute;
    width: 11px;
    height: 10px;
    left: -10.5px;
    top: 4px;
  }

  .i_cont {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 8px 12px;
    @include content($col_gre_1, $col_gre_2, rgba(165, 214, 147, 0.16));
  }

  .he_cont {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    padding: 8px 12px;
    @include content($color-white-1, $color-gray-12, rgba(165, 167, 208, 0.16));
  }

  .img_cont {
    @include content($col_gre_1, $col_gre_2, rgba(165, 214, 147, 0.16));
  }

  .img_he_cont {
    @include content($color-white-1, $color-gray-12, rgba(165, 167, 208, 0.16));
  }

  .time {
    position: absolute;
    height: 15px;
    float: right;
    font-size: $size12;
    color: $color-gray-3;
    transform: scale(0.834);
    transform-origin: bottom right;
    bottom: 4px;
    right: 4px;
    white-space: nowrap;
  }

  .time_vis{
    visibility: hidden;
  }

  .time_te {
    position: absolute;
    font-size: $size12;
    color: $color-gray-3;
    transform: scale(0.834);
    bottom: 4px;
    right: 6px;
    white-space: nowrap;
    transform-origin: bottom right;
  }

  .img_con {
    display: block;
    min-width: 50px;
    max-width: 240px;
    border-radius: 6px;
    height: 120px;
  }

  .image {
    padding: 4px;
  }

  .img_time {
    position: absolute;
    font-size: $size12;
    color: $color-white-1;
    transform: scale(0.834);
    right: 10px;
    bottom: 6px;
    white-space: nowrap;

    transform-origin: bottom right;
  }

  .img_text {
    padding: 4px 10px 8px;
    overflow: hidden;
  }

}
</style>
