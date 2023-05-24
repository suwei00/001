<script setup lang='ts' name='plus-friends'>
const router = useRouter()

let dataArr = $ref<Friends.NewFriendItem[]>([])
const chat_id = $ref('')
const { run, loading } = useRequest(() => searchNewFriend({ chat_id }), {
  manual: true,
  onSuccess(res) {
    dataArr = res
  },
})
const checkDetail = (item: Friends.NewFriendItem) => {
  sessionStorage.setItem('NewFriendData', JSON.stringify(item))
  router.push('/friends/friend-info')
}
</script>

<template>
  <ChatHeader title="添加好友">
    <template #bottom>
      <cg-search v-model="chat_id" placeholder="请输入要添加好友的久聊ID" @search="run" />
    </template>
  </ChatHeader>
  <!-- main -->
  <cg-loading v-show="loading" />
  <div v-for="item in dataArr" v-show="!loading" :key="item.uid" class="friends-item" @click="checkDetail(item)">
    <cg-avatar :src="item.avatar" size="small" mr-8px />
    {{ item.username }}
  </div>
</template>

<style lang='scss' scoped>
.search_content {
  padding:0 0 8px 8px;

  .search_input {
    padding:0;
    padding-right: 12px;
    border-radius: 4px;
  }
}
</style>
