<script setup lang='ts' name='group-invite'>
import checkImg from '@icon/check-icon.png?preset=full'
import uncheckImg from '@icon/uncheck-icon.png?preset=full'

const checkIcon = getSupportImage(checkImg)
const uncheckIcon = getSupportImage(uncheckImg)

const gid = $(useRouteQuery('gid', ''))

const searchValue = $ref('')
// 是否全选
let isSelectAll = $ref(false)
let checked = $ref<Friends.FriendItem[]>([])
const { data, run: runGetFriendList, loading } = $(useRequest(() => getFriendList({ gid }), {
  onSuccess() {
    isSelectAll = false
    checked = []
  },
}))
const dataArr = $computed(() => {
  if (data?.d)
    return data.d.filter(d => d.nick_name.includes(searchValue))

  return []
})
const toggle = (item: Friends.FriendItem) => {
  const index = checked.findIndex(d => d.friend_name === item.friend_name)
  if (index > -1)
    checked.splice(index, 1)

  else
    checked.push(item)
}
const isChecked = (friend_name: string) => {
  return checked.some(d => d.friend_name === friend_name)
}

// 点击全选
const selectAll = () => {
  isSelectAll = !isSelectAll
  if (isSelectAll)
    checked = data!.d.map(d => d)

  else
    checked = []
}

// 邀请按钮
const btnsDisabled = $computed(() => checked.length === 0)
const friendIds = $computed(() => checked.map(d => d.friend_uid).join(','))
const { run: runAddNewGroupMember } = useRequest(() => addNewGroupMember({ gid, friend_uids: friendIds }), {
  manual: true,
  onSuccess() {
    showToast('邀请成功')
    runGetFriendList()
  },
})
</script>

<template>
  <div class="group-invite">
    <ChatHeader title="邀请成员">
      <template #actions>
        <div class="select_all" @click="selectAll">
          {{ isSelectAll ? '取消' : '全选' }}
        </div>
      </template>
      <template #bottom>
        <cg-search v-model="searchValue" />
      </template>
    </ChatHeader>
    <cg-loading v-show="loading" />
    <ul class="friends-item head">
      <li pl-14px>
        账号
      </li>
      <li>VIP等级</li>
      <li flex pr-16px>
        <span flex-1>上级</span>
        <span pl-14px />
      </li>
    </ul>
    <div class="content">
      <van-pull-refresh v-model="loading" style="height:100%;" @refresh="runGetFriendList">
        <van-checkbox-group ref="checkboxGroup" v-model="checked" icon-size="14px" mb-30px>
          <div v-for="(item) in dataArr" :key="item.friend_uid" class="friends-item member" @click="toggle(item)">
            <div class="item-left">
              <p>{{ item.nick_name ? item.nick_name : item.friend_name }}</p>
            </div>
            <div class="item-mid">
              <cg-vip :level="item.level" width="69px" />
            </div>
            <div class="item-right">
              <span flex-1 text-center>{{ item.parent_name }}</span>
              <img
                w-14px h-14px class="img-icon"
                :src=" isChecked(item.friend_name) ? checkIcon : uncheckIcon"
              >
            </div>
          </div>
        </van-checkbox-group>
      </van-pull-refresh>
    </div>
    <!-- 按钮 -->
    <button class="type1" :disabled="btnsDisabled" @click="runAddNewGroupMember">
      邀请进群
    </button>
  </div>
</template>

<style lang='scss' scoped>
.select_all{
  font-size:14px;
  color: $color-white-1;
}
.search_content {
  padding:0 0 8px 8px;

  .search_input {
    padding:0;
    padding-right: 12px;
    border-radius: 4px;
  }
}
.group-invite {
    display: flex;
    flex-direction: column;
    height: var(--viewport-height);

    .content {
        flex: 1;
        height: 0;
        background-color: $color-gray-4;
        overflow: auto;
    }
}

.head {
    height: 44px;
    margin-bottom: 16px;
    font-size: $size14;
    font-weight: 600;
    color: $color-gray-2;
    padding-left: 0;

    li {
        flex-grow: 1;
        text-align: center;
    }
}

.member {
    padding-left: 0;
}

.item-left,
.item-mid,
.item-right {
    width: 33.33%;
    display: flex;
}

.item-left {
    align-items: center;
    justify-content: center;
    padding-left: 14px;
    p{
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      text-align:center ;
    }
}

.item-mid {
    justify-content: center;
}

.item-right {
    justify-content: space-between;
    padding-right: 16px;
    align-items: center;
}

.checkbox-wrapper {
    width: 14px;
    height: 14px;
    border-radius: 3px;
    overflow: hidden;
}

button {
    width: 330px;
    height: 40px;
    border-width: 1px;
    border-style: solid;
    border-radius: 6px;
    display: block;
    margin: 10px auto 10px;
    font-size: $size16;
    font-weight: 600;
}
.type1{
    background-color: $color-blue-1;
    border-color: $color-blue-1;
    color: $color-white-1;
    &:disabled{
        background-color: $color-gray-11;
        border-color: $color-gray-11;
        color: $color-gray-10;
    }
}
</style>
