<script lang="ts" setup name="ChatHome">
import { RouterLink } from 'vue-router'
import { useSessionStorage } from '@vueuse/core'
import dayjs from 'dayjs'
import { remove } from 'lodash-es'
import add from '../assets/image/chat/add.png?preset=full'
import addFrieds from '../assets/image/chat/add-friend.png?preset=full'
import showNotice from '../components/notice/index.vue' // 公告弹窗

const chatState = chatStateStore()
const { groupList, publishList } = storeToRefs(chatState)
const { canAddNewFriend } = $(storeToRefs(useUserStore()))

const addUrl = getSupportImage(add)
const addFriedsUrl = getSupportImage(addFrieds)
const router = useRouter()

// 现实添加好友气泡
const showAddFriend = ref(false)
const chatItemClick = (item: any) => {
  console.error('is_group', item)
  chatState.CacheChatHistoryList()
  // gid 群id
  // is_group 是否是群聊 true是群聊 false是私聊
  // is_publish ture 是公共群，false是私人群
  sessionStorage.setItem('CHAT_DATA', JSON.stringify({ gid: item.id, is_group: item.is_group, is_publish: item.is_publish, name: item.name, avatar: item.avatar, friend_uid: item.friend_uid }))
  router.push({ path: '/chat' })
}
const showAddFriendPop = () => {
  showAddFriend.value = !showAddFriend.value
}

onActivated(() => {
  chatState.GetChatList()
})

const JumpAddMember = () => {
  showAddFriend.value = false
  router.push({ path: '/friends/plus-friends' })
}
</script>

<template>
  <FooterLayout>
    <template #header>
      <ChatHeader title="聊天" :is-back="false">
        <template #actions>
          <van-popover v-if="canAddNewFriend" v-model:show="showAddFriend" placement="bottom-end">
            <div class="add-friend">
              <div class="add-friend-cont" @click.stop="JumpAddMember">
                <img class="add-img" :src="addFriedsUrl" alt="">
                <div class="add-text">
                  添加好友
                </div>
              </div>
            </div>
            <template #reference>
              <img class="add" :src="addUrl" alt="" @click.stop="showAddFriendPop">
            </template>
          </van-popover>
        </template>
      </ChatHeader>
    </template>
    <div v-if="publishList.length !== 0" class="first-list list-bg" @click="chatItemClick(publishList[0])">
      <div class="first-list-left">
        <cg-avatar :src="publishList[0].avatar" size="large" />
      </div>
      <div class="first-list-right">
        <div class="chat-title">
          <div class="chat-name">
            {{ publishList[0].name }}
          </div>
          <div class="chat-time">
            {{ setTimeView(publishList[0].created_at) }}
          </div>
        </div>
        <div class="read-container">
          <div>
            <div class="elli" :class="publishList[0].unread > 0 ? 'chat-name' : ''" v-html="unescapeHtmlList(publishList[0].noted)" />
          </div>
          <div class="at-content">
            <!--  v-if="publishList[0].remind > 0" -->
            <div v-if="publishList[0].remind > 0" class="at">
              @
            </div>
            <div v-if="publishList[0].unread > 0" class="read-num" :class=" publishList[0].unread < 99 ? 'read-fifty' : 'read-more' ">
              <span v-if="publishList[0].unread > 99">99+</span>
              <span v-else>{{ publishList[0].unread }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="second-list-container">
      <div v-for="(item, index) in groupList" :key="index" class="second-list list-bg" @click="chatItemClick(item)">
        <div class="first-list-left">
          <cg-avatar :src="item.avatar" size="large" />
        </div>
        <div class="first-list-right">
          <div class="chat-title">
            <div class="chat-name">
              {{ item.name }}
            </div>
            <div class="chat-time">
              {{ setTimeView(item.created_at) }}
            </div>
          </div>
          <div class="read-container">
            <div>
              <div class="elli" :class="item.unread > 0 ? 'chat-name' : ''" v-html="unescapeHtmlList(item.noted)" />
            </div>
            <div class="at-content">
              <div v-if="item.remind > 0" class="at">
                @
              </div>
              <div v-if="item.unread > 0" class="read-num" :class=" item.unread < 99 ? 'read-fifty' : 'read-more' ">
                <span v-if="item.unread > 99">99+</span>
                <span v-else>{{ item.unread }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <showNotice />
  </FooterLayout>
</template>

<style lang="scss" scoped>
.add-friend{
    position: absolute;
    width: 132px;
    height: 50px;
    right: -8px;
    top: -12px;
    background: #FFFFFF;
    box-shadow: 0px 5px 10px 1px rgba(81,91,124,0.5);
    border-radius: 6px 6px 6px 6px;
    .add-friend-cont{
      position: relative;
      display: flex;
      height: $size50;
      align-items: center;
      justify-content: center;
      .add-text{
        color: $color-gray-2;
        font-size: $size16;
      }
      .add-img{
        width: 18px;
        height: 18px;
        margin-right: $size8;
      }
    }
    .add-friend-cont:before{
      display:block;
      content:'';
      border-width:8px 6px 8px 6px;
      border-style:solid;
      border-color:transparent transparent $color-white-1 transparent;

      /* 定位 */
      position:absolute;
      right: 12px;
      top: -16px;
    }
  }
.add {
  width: $size20;
  height: $size20;
}
.first-list {
  padding: 19px $size16;
  height: $size68;
  display: flex;
  align-items: center;
  margin-bottom: $size16;
}
.second-list-container{
  >div:nth-of-type(1){
    border-top: $size1 solid $color-blue-3;
  }
}

.first-list-left {
    width: $size50;
    height: $size50;
    margin-right: $size8;
    border-radius: 50%;
    display: flex;
    align-items: center;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .first-list-right {
    flex: 1;
    height: $size50;
    width: 0;
    .chat-title {
      display: flex;
      justify-content: space-between;
      margin-top: $size4;
      font-size: $size14;
      .chat-time {
        color: $color-gray-3;
        font-weight: 400;
      }
    }
    .chat-content {
      margin-top: $size4;
      font-size: $size12;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: $color-gray-3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .chat-name {
    color: $color-gray-2;
    font-size: $size14;
    font-weight: 600;
    font-family: PingFang SC-Semibold, PingFang SC;
  }

  .second-list{
    padding: 0 $size16;
    height: $size68;
    display: flex;
    align-items: center;

  }

    .at-content{
      display: flex;
      align-items: center;
      padding-left: $size20;
      .at{
        margin-right: $size4;
        font-size: $size14;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: $color-blue-1;
        line-height: 0px;
        text-shadow: 0px 2px 3px rgba(0,0,0,0.16);
      }
    }
  .read-container{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: $size4;
      font-size: $size12;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: $color-gray-3;
      >div:nth-of-type(1){
        flex: 1;
        overflow: hidden;
      }
      .elli{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .read-num{
        height: $size20;
        line-height: $size20;
        color: $color-white-1;
        font-size: $size10;
        background-color: $color-blue-1;
        text-align: center;
      }
      .read-fifty{
        width: $size20;
        background-color: $color-blue-1;
        border-radius: 50%;
      }
      .read-more {
        width: $size26;
        border-radius: $size10 $size10 $size10 $size10;
      }
    }
</style>
