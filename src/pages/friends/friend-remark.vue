<script setup lang='ts' name='friend-remark'>
const router = useRouter()

const friendUid = $(useRouteQuery('friend_uid'))
const { data } = useRequest(() => getFriendDetail({ friend_uid: friendUid ? friendUid?.toString() : '' }))
</script>

<template>
  <ChatHeader title="个人信息" mb-17px />
  <div class="friends-item info" flex justify-between pr-16px>
    <div flex>
      <cg-avatar :src="data?.avatar ?? '0'" size="large" mr-8px />
      <ul>
        <li font-semibold>
          {{ data?.nick_name ? data?.nick_name : data?.friend_name }}
        </li>
        <cg-vip :level="data?.level ?? 1" width="71px" />
      </ul>
    </div>
    <div class="remark-btn" @click="router.push(`/friends/friend-set-remark?id=${data?.friend_uid}&nick_name=${data?.nick_name}&remark=${data?.remark}&friend_name=${data?.friend_name}`)">
      备注
    </div>
  </div>
  <h6 class="friends-sub-title ">
    描述
  </h6>
  <p>
    {{ data?.remark }}
  </p>
</template>

<style lang='scss' scoped>
.info {
    height: 68px;
}

.remark-btn {
    width: 50px;
    height: 26px;
    border-radius: 4px 4px 4px 4px;
    border: 1px solid $color-blue-1;
    font-size: $size14;
    font-weight: 600;
    color: $color-blue-1;
    text-align: center;
    line-height: 24px;
}

p {
    box-sizing: border-box;
    width: 100%;
    min-height: 150px;
    font-size: $size14;
    color: $color-gray-2;
    padding: 14px 16px;
    background-color: $color-white-1;
    border-bottom: 1px solid $color-gray-6;
    white-space: pre-wrap;
}
</style>
