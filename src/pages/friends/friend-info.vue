<script setup lang='ts' name='friend-info'>
const router = useRouter()
const str = useStorage('NewFriendData', '', sessionStorage)
const data: Friends.NewFriendItem & ChatT.ChatType = $computed(() => JSON.parse(str.value))
const { run, loading } = useRequest(() => addNewFriend({ chat_id: data.chat_id }), {
  manual: true,
  onSuccess() {
    showToast('添加成功')
    router.push('/friends')
  },
})
</script>

<template>
  <ChatHeader title="个人信息" mb-17px />
  <cg-loading v-if="loading" />
  <template v-else>
    <div class="friends-item info">
      <cg-avatar :src="data.avatar" size="large" mr-8px />
      <ul>
        <li font-semibold>
          {{ data.username }}
        </li>
        <cg-vip :level="data.level || data.v" width="71px" />
      </ul>
    </div>
    <button @click="run">
      添加好友
    </button>
  </template>
</template>

<style lang='scss' scoped>
.info{
    height: 68px;
}
button {
    display: block;
    width: 330px;
    height: 40px;
    margin: 36px auto 0;
    background: $color-blue-1;
    border-radius: 6px;
    font-size: $size16;
    font-weight: 600;
    color: $color-white-1;
}
</style>
