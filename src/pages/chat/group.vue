<script lang="ts" setup>
import avatReduce from '../../assets/image/chat/avat-reduce.png?preset=full'
import jian from '../../assets/image/chat/jian.png?preset=full'
import avatAdd from '../../assets/image/chat/avat-add.png?preset=full'
const { setGroupAnnouncement, setGroupIntroduction, setWordLimit, setFrequency } = useUserStore()
const { groupAnnouncement, groupIntroduction } = storeToRefs(useUserStore())
const router = useRouter()
const addUrl = getSupportImage(avatAdd)
const reduceUrl = getSupportImage(avatReduce)
const jianUrl = getSupportImage(jian)
const gid = $(useRouteQuery('gid', ''))

const showDialog = () => {
  cgDialog({
    title: '解散该群',
    content: '您是否需要解散该群，解散不可撤销',
    cancelText: '暂不解散',
    confirmText: '解散',
    onOk() {
      useRequest(() => GroupDeleteRequest({ gid }), {
        onSuccess() {
          showToast('操作成功')
          router.push('/')
        },
      })
    },
  })
}
const quitGroup = () => {
  cgDialog({
    title: '温馨提示',
    content: '退出后不会再收到此群的消息',
    cancelText: '取消',
    confirmText: '确定',
    onOk() {
      useRequest(() => MemberDeleteGroupRequest({ gid }), {
        onSuccess() {
          showToast('退出成功')
          router.push('/')
        },
      })
    },
  })
}
let avatorData = $ref<ChatT.GroupDetailParamResult>()
const avatorList = $computed(() => {
  if (avatorData?.state === '1')
    return avatorData.d.filter(d => d.state !== '1')

  return avatorData?.d
})

const interceptName = (name: string) => {
  return name.length > 3 ? `${name.slice(0, 3)}...` : name
}
// 是否是群主
const isManage = $computed(() => avatorData?.state === '4')
// 是否是管理员
const isAdmin = $computed(() => avatorData?.state === '2')
const loding = ref(true)
onMounted(() => {
  loding.value = true
  getGroupDetailRequest({ gid }).then((res) => {
    if (res) {
      avatorData = res
      setGroupAnnouncement(res.announcement ?? '')
      setGroupIntroduction(res.introduction ?? '')
      setWordLimit(res.word_limit.toString() ?? '')
      setFrequency(res.frequency.toString() ?? '')
      nextTick(() => {
        loding.value = false
      })
    }
  })
})
</script>

<!-- 群详情主页 -->
<template>
  <ChatHeader :title="avatorData?.name" :is-back="true" />
  <div v-if="!loding" class="char_group">
    <div class="second-list list-bg br-top br-bottom">
      <div class="first-list-left">
        <cg-avatar :src="avatorData?.avatar" size="large" />
      </div>
      <div class="first-list-right">
        <div class="chat-title">
          <div class="chat-name">
            {{ avatorData?.name }}
          </div>
        </div>
        <div class="chat-content">
          群号：{{ avatorData?.id }}
        </div>
      </div>
    </div>
    <div v-show="avatorList?.length" class="group_avatar br-top br-bottom">
      <div class="avatar_list flex jc-s ai-c fdr-r fw-w">
        <div v-for="(item, index) in avatorList" :key="index" class="pos-r">
          <div v-if="(index < 10)" class=" avatar_item flex fdr-c">
            <cg-avatar :src="item.avatar" width="36px" class="avatar_img" />
            <div class="avatar_name">
              {{ interceptName(item.nick_name) }}
            </div>
          </div>
          <!--  state// 该用户在该群的角色 1 普通成员 2 管理员 3 退群 4 群主 -->
          <div v-if="item.state === '4'" class="tag_lord pub_tag">
            群主
          </div>
          <!-- 管理 -->
          <div v-if="item.state === '2' && index < 10" class="tag_manage pub_tag">
            管理
          </div>
        </div>
        <img v-show="isAdmin || isManage" class="add_img" :src="addUrl" @click="router.push({ path: '/chat/group-invite', query: { gid } })">
        <img v-show="isAdmin || isManage" class="add_img" :src="reduceUrl" @click="router.push({ path: '/chat/group-member', query: { type: '2', gid, role: avatorData?.state } })">
      </div>
      <div v-show="isAdmin || isManage" class="avat_more" @click="router.push({ path: '/chat/group-member', query: { type: '0', gid, role: avatorData?.state } })">
        查看更多群成员
      </div>
    </div>
    <div class="group_infolist ">
      <ul>
        <!-- 群管理  -->
        <li v-show="isAdmin || isManage" class="flex ai-c jc-sb br-top br-bottom" @click="router.push({ path: '/chat/group-management', query: { avatarUrl: avatorData?.avatar, groupName: avatorData?.name, state: avatorData?.state, gid, frequency: avatorData?.frequency, word_limit: avatorData?.word_limit } })">
          <div class="left_text">
            群管理
          </div>
          <img class="righ_icon" :src="jianUrl">
        </li>
        <!-- 群公告 -->
        <li
          class="flex ai-c jc-sb grop-announcement  br-bottom"
          @click="router.push({ path: '/chat/group-introduction', query: { type: 1, state: avatorData?.state, gid } })"
        >
          <div class="left_text">
            <div class="group_tit">
              群公告
            </div>
            <div class="group_cont three_lines">
              {{ groupAnnouncement }}
            </div>
          </div>
          <img class="righ_icon" :src="jianUrl">
        </li>
        <!-- 群介绍 -->
        <li
          class="flex ai-c jc-sb grop-announcement br-bottom"
          @click="router.push({ path: '/chat/group-introduction', query: { type: 2, state: avatorData?.state, gid } })"
        >
          <div class="left_text">
            <div class="group_tit">
              群介绍
            </div>
            <div class="group_cont three_lines">
              {{ groupIntroduction }}
            </div>
          </div>
          <img class="righ_icon" :src="jianUrl">
        </li>
      </ul>
    </div>

    <div class="group_disband pub_btn" :class="isManage ? '' : 'exit_group'" @click="isManage ? showDialog() : quitGroup()">
      <van-button type="primary" block>
        {{ isManage ? '解散' : '退出群聊' }}
      </van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.char_group {
  padding-top: 18px;
}

.group_avatar {
  background: linear-gradient(180deg, $color-white-1 0%, $color-white-3 65%, $color-white-4 85%, $color-white-5 100%);
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.06);
  padding: 10px 0;

  .avatar_list {
    margin: 0 14px;

    .avatar_item {
      margin-left: 20px;
      margin-bottom: 8px;

      .avatar_img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 1px solid $color-blue-1;
        vertical-align: top;
      }

      .avatar_name {
        font-size: $size9;
        font-weight: 400;
        color: $color-gray-2;
        text-align: center;
        margin-top: 2px;
        // width: 36px;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
      }
    }

    .add_img {
      width: 35px;
      height: 35px;
      margin-left: 20px;
      margin-bottom: 8px;
    }
  }

  .pub_tag {
    color: $color-white-1;
    text-align: center;
    position: absolute;
    top: -4px;
    left: 4px;
    width: 28px;
    height: 16px;
    line-height: 16px;
    border-radius: 3px;
    font-size: $size9;
    font-weight: 400;
  }

  .tag_lord {
    background: $color-red-3;
  }

  .tag_manage {
    background: $color-blue-4;
  }

  .avat_more {
    font-size: $size12;
    font-weight: 400;
    color: $color-gray-2;
    text-align: center;
  }
}

.group_infolist {
  margin-top: 14px;

  ul {
    li {

      padding: 11px 16px 14px 11px;
      background: linear-gradient(180deg, $color-white-1 0%, $color-white-3 65%, $color-white-4 85%, $color-white-5 100%);
      box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.06);

      .left_text {
        font-size: $size14;
        color: $color-gray-2;
        margin-right: 10px;
      }

      .group_cont {
        font-size: $size12;
        font-weight: 400;
        color: $color-gray-3;
        line-height: 15px;
        margin-top: 3px;

      }
    }

    .grop-announcement {
      max-height: 95px;

    }
  }

}

.list-bg {
  background: linear-gradient(180deg, $color-white-1 0%, $color-white-3 65%, $color-white-4 85%, $color-white-5 100%);
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.06);
}

.second-list {
  padding: 0 16px;
  height: 68px;
  display: flex;
  align-items: center;
  margin-bottom: $size16;

  .img-border {
    border: 2px solid $color-blue-1;
  }
}

.first-list-left {
  width: 50px;
  height: 50px;
  margin-right: 8px;
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
  height: 50px;

  .chat-title {
    display: flex;
    justify-content: space-between;
    margin-top: 4px;
    font-size: $size14;

    .chat-name {
      color: $color-gray-2;
      font-weight: 600;
    }

  }

  .chat-content {
    max-width: 270px;
    margin-top: 4px;
    font-size: $size12;
    font-weight: 400;
    color: $color-gray-3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.group_disband {
  padding: 34px 23px;
}
.exit_group{
  :deep(.van-button) {
    height: 40px;
    background: $color-red-4;

  }
}
</style>
