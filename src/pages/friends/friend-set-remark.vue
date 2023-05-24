<script setup lang='ts' name='friend-set-remark'>
const router = useRouter()

const id = $(useRouteQuery('id'))
const nickName = $(useRouteQuery('nick_name'))
const Remark = $(useRouteQuery('remark'))
const friendName = $(useRouteQuery('friend_name', ''))

const nick_name = $ref(nickName?.toString() ?? '')
const remark = $ref(Remark?.toString() ?? '')

const { run } = useRequest(() => chatFriendUpdate({
  friend_uid: id as string,
  nick_name: nick_name || friendName?.toString(),
  remark,
}), {
  manual: true,
  onSuccess() {
    showToast('设置成功')
    router.back()
  },
})
</script>

<template>
  <ChatHeader title="设置备注">
    <template #actions>
      <div class="submit" @click="run">
        完成
      </div>
    </template>
  </ChatHeader>
  <h6 class="friends-sub-title ">
    备注名
  </h6>
  <input v-model="nick_name" type="text">
  <h6 class="friends-sub-title ">
    描述
  </h6>
  <textarea v-model="remark" placeholder="添加更多信息" />
</template>

<style lang='scss' scoped>
.submit{
    font-size: $size14;
    color: $color-white-1;
}
input{
    width: 100%;
    height: 44px;
    display: block;
    padding-left:16px ;
    font-size: $size14;
    box-sizing: border-box;
}
textarea{
    width: 100%;
    height: 147px;
    display: block;
    padding-left:16px ;
    padding-top: 14px;
    font-size: $size14;
    box-sizing: border-box;
    border: none;
    outline: none;
}
</style>
