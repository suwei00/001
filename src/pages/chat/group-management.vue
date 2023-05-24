<script lang="ts" setup name="group-management">
import jian from '../../assets/image/chat/jian.png?preset=full'

const router = useRouter()
const jianUrl = getSupportImage(jian)
const avatarUrl = $(useRouteQuery('avatarUrl'))
const groupName = $(useRouteQuery('groupName'))
const pops = $ref({
  visible: false,
  popType: '',
})
const faNumber = (types: string) => {
  pops.popType = types
  pops.visible = true
}
const gid = $(useRouteQuery('gid', ''))
const role = $(useRouteQuery('state'))

const route = useRoute()
const records = {
  state: route.query.state ?? '', // state// 该用户在该群的角色 1 普通成员 2 管理员 3 退群 4 群主
}
const { wordLimit, frequency } = storeToRefs(useUserStore())
// goTo群管理员
const goToMenber = () => {
  if (records.state === '2')
    return showToast('您暂无权限，请联系群主修改')

  router.push({ path: '/chat/group-member', query: { type: '3', gid, role } })
}
// 清空全部成员聊天记录
const clearToChat = () => {
  if (records.state === '2')
    return showToast('您暂无权限，请联系群主修改')

  cgDialog({
    title: '清空全部聊天记录',
    content: '该操作不可逆，是否执行此操作',
    cancelText: '再想想',
    confirmText: '确定',
    onOk() {
      GroupHistoryCleanRequest({ gid }).then(() => {
        showToast('操作成功')
      })
    },
  })
}
</script>

<template>
  <ChatHeader :title="groupName" :is-back="true" />
  <!-- 头像 -->
  <div class="group-list list-bg group-first margin-b">
    <div class="group-left">
      <div>{{ groupName }}</div>
    </div>
    <div class="group-middle flex avatar-m">
      <cg-avatar :src="avatarUrl" size="large" />
    </div>
  </div>

  <!-- 发言频率 -->
  <div class="group-list list-bg group-other br-top" @click="faNumber('setSpeak')">
    <div class="group-left">
      <div>发言频率</div>
    </div>
    <div class="group-middle flex">
      <span class="group-span">每{{ frequency }}秒内1次</span>
    </div>
    <div class="group-right flex">
      <img class="righ_icon" :src="jianUrl" alt="">
    </div>
  </div>
  <!-- 发言字数限制 -->
  <div class="group-list list-bg group-other margin-b" @click="faNumber('setNumber')">
    <div class="group-left">
      <div>发言字数限制</div>
    </div>
    <div class="group-middle flex">
      <span class="group-span">单次{{ wordLimit }}字</span>
    </div>
    <div class="group-right flex">
      <img class="righ_icon" :src="jianUrl" alt="">
    </div>
  </div>
  <!-- 群管理员 -->
  <div class="group-list list-bg group-other br-top" @click="goToMenber()">
    <div class="group-left">
      <div>群管理员</div>
    </div>
    <div class="group-right flex">
      <img class="righ_icon" :src="jianUrl" alt="">
    </div>
  </div>
  <!-- 禁言管理 -->
  <div class="group-list list-bg group-other" @click="router.push({ path: '/chat/group-member', query: { type: '1', gid, role } })">
    <div class="group-left">
      <div>禁言管理</div>
    </div>
    <div class="group-right flex">
      <img class="righ_icon" :src="jianUrl" alt="">
    </div>
  </div>
  <!-- 清空全部成员聊天记录 -->
  <div class="group-list list-bg group-other" @click="clearToChat">
    <div class="group-left">
      <div class="clear-chat">
        清空全部成员聊天记录
      </div>
    </div>
  </div>
  <!-- 底部弹窗 -->
  <pop-up-bottom v-model="pops.visible" :pop-type="pops.popType" />
</template>

<style lang="scss" scoped>
.margin-b {
  margin-bottom: $size16;
}

.group-list {
  padding: 0 $size16;
  display: flex;
  align-items: center;
}

.group-first {
  height: $size68;
}

.group-other {
  height: $size44;
}

.group-left {
  flex: 1;
  font-size: $size14;
  color: $color-gray-2;
}

.group-middle {
  margin-right: $size16;

  img {
    width: $size50;
    height: $size50;
    border-radius: 50%;
    border: 2px solid $color-blue-1;
  }

  .group-span {
    margin-left: $size8;
    font-size: $size14;
    color: $color-gray-3;
  }
}

.clear-chat {
  color: $color-red-2 !important;
}
.avatar-m{
  margin-right: 0 !important;
}
</style>
