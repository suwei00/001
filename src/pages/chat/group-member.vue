<script setup lang='ts' name='group-member'>
import chatBanImg from '@icon/chat-ban.png?preset=full'
import minusImg from '@icon/black-close.png?preset=full'
import checkImg from '@icon/check-icon.png?preset=full'
import uncheckImg from '@icon/uncheck-icon.png?preset=full'

const checkIcon = getSupportImage(checkImg)
const uncheckIcon = getSupportImage(uncheckImg)

const { uid } = $(storeToRefs(useUserStore()))
// 群成员列表使用类型
enum MemberListType {
  check = '0', // 查看更多成员
  silence = '1', // 禁言管理
  kick = '2', // 踢出
  manage = '3', // 群管理员
}
const type = $(useRouteQuery('type'))
const gid = $(useRouteQuery('gid', ''))
const role = $(useRouteQuery('role'))
const isCheck = $computed(() => type === MemberListType.check)
const isSilence = $computed(() => type === MemberListType.silence)
const isKick = $computed(() => type === MemberListType.kick)
const isEditManage = $computed(() => type === MemberListType.manage)
// 是否群主
const isManage = $computed(() => role === '4')
// 是否管理员
// const isAdmin = $computed(() => role === '2')

// 选中的数组
let checked = $ref<Friends.NewFriendItem[]>([])

// 搜索栏
const searchRef = ref()
let searchValue = $ref('')
// 数据
let dataList = $ref<Friends.NewFriendItem[]>([])
let page = $ref(1)
let total = $ref(0)
let finished = $ref(false)
const { run, loading } = $(useRequest(() => getGroupMemberLis({ gid, page, pagesize: 500 }), {
  onSuccess(res) {
    searchValue = ''
    searchRef.value.clearData()

    total = res.t ? res.t : total
    res.d.forEach((item) => {
      dataList.push(item)
    })
    if (dataList.length >= total)
      finished = true

    if (!finished) {
      page += 1
      run()
    }

    if (isEditManage)
      checked = dataList.filter(d => d.state === '2') ?? []
  },

}))
const pullRefreshHandler = () => {
  searchValue = ''
  searchRef.value.clearData()
  page = 1
  finished = false
  checked = []
  dataList = []
  run()
}
const groupMemberList = $computed(() => dataList.filter((d: any) => d.nick_name.includes(searchValue)))
// 页面title
const title = $computed(() => isEditManage ? '群管理员' : `群成员(${total === 0 ? '..' : total})`)
// 操作勾选
const toggle = (item: Friends.NewFriendItem) => {
  // 查看群成员
  if (isCheck) {
    return
  }
  // 设置管理员
  else if (isEditManage) {
    if (item.uid === uid)
      return
  }
  // 群主踢人
  else if (isKick && isManage) {
    if (item.uid === uid)
      return
  }
  // 管理员踢人
  else if (isKick) {
    if (item.uid === uid || item.state === '2' || item.state === '4')
      return
  }
  // 群主禁言、解禁
  else if (isSilence && isManage) {
    if (item.uid === uid)
      return
  }
  // 管理员禁言、解禁
  else if (isSilence) {
    if (item.uid === uid || item.state === '2' || item.state === '4')
      return
  }

  const index = checked.findIndex(d => d.username === item.username)
  if (index > -1)
    checked.splice(index, 1)

  else
    checked.push(item)
}
const isChecked = (username: string) => {
  return checked.some(d => d.username === username)
}
const btnsDisabled = $computed(() => checked.length === 0)

// 提交时的数据
const usernames = $computed(() => checked.map(d => d.username).join(','))
const uids = $computed(() => checked.map(d => d.uid).join(','))
const nickNames = $computed(() => checked.map(d => d.nick_name).join(','))
// 解禁0 禁言1
const setMute = (mute: '0' | '1') => {
  setGroupMemberMute({ gid, uid: uids, mute }).then(() => {
    showToast('设置成功')
    pullRefreshHandler()
  })
}
// 解禁
const unSilenceHandler = () => {
  cgDialog({
    title: '解除禁言',
    content: '确定要将下列成员解除禁言么？',
    content2: nickNames,
    onOk() {
      setMute('0')
    },
  })
}
// 禁言
const silenceHandler = () => {
  cgDialog({
    title: '成员禁言',
    content: '确定要将下列成员禁言吗？',
    content2: nickNames,
    onOk() {
      setMute('1')
    },
  })
}
// 踢出
const kickOut = () => {
  cgDialog({
    title: '踢出聊天室',
    content: '确定要将下列成员踢出聊天室吗？',
    content2: nickNames,
    onOk() {
      kickGroupMemberOut({ gid, uid: uids }).then(() => {
        showToast('设置成功')
        pullRefreshHandler()
      })
    },
  })
}
// 设置群管理员
const { run: setManage } = useRequest(() => setGroupAdmin({ gid, usernames }), {
  manual: true,
  onSuccess() {
    showToast('设置成功')
    pullRefreshHandler()
  },
})
</script>

<template>
  <div class="group-member">
    <ChatHeader :title="title">
      <template #bottom>
        <cg-search ref="searchRef" v-model="searchValue" :disabled="!finished" />
      </template>
    </ChatHeader>
    <cg-loading v-show="loading" />
    <!-- 群管理员 -->
    <div v-show="isEditManage && checked.length > 0" class="manage-list">
      <div v-for="item in checked" :key="item.uid" class="manage-item">
        <cg-avatar size="small" :src="item.avatar" />
        <img v-show="item.uid !== uid" class="minus" :src="getSupportImage(minusImg)" alt="" @click="toggle(item)">
      </div>
    </div>
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
      <van-pull-refresh v-model="loading" style="height:100%;" @refresh="pullRefreshHandler">
        <!-- <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          loading-text=" "
          @load="onLoadHandler"
        > -->
        <div v-for="(item) in groupMemberList" :key="item.uid" class="friends-item member" @click="toggle(item)">
          <div class="item-left" :style="isEditManage ? 'justify-content: center;' : ''">
            <div v-if="!isEditManage" w-20px mr-6px>
              <img v-show="item.mute === '1'" block :src="getSupportImage(chatBanImg)" alt="" w-20px>
            </div>
            <p>{{ item.nick_name }}</p>
          </div>
          <div class="item-mid">
            <cg-vip :level="item.level" width="69px" />
          </div>
          <div class="item-right">
            <span flex-1 text-center>{{ item.parent_name }}</span>
            <template v-if="!isCheck">
              <!-- 设置管理员 -->
              <template v-if="isEditManage">
                <img
                  v-show="item.uid !== uid" w-14px h-14px class="img-icon"
                  :src=" isChecked(item.username) ? checkIcon : uncheckIcon"
                >
              </template>
              <!-- 群主踢人 -->
              <template v-else-if="isKick && isManage">
                <img
                  v-show="item.uid !== uid" w-14px h-14px class="img-icon"
                  :src=" isChecked(item.username) ? checkIcon : uncheckIcon"
                >
              </template>
              <!-- 管理员踢人 -->
              <template v-else-if="isKick">
                <img
                  v-show="item.uid !== uid && item.state !== '2' && item.state !== '4'" w-14px h-14px class="img-icon"
                  :src=" isChecked(item.username) ? checkIcon : uncheckIcon"
                >
              </template>
              <!-- 群主禁言、解禁 -->
              <template v-else-if="isSilence && isManage">
                <img
                  v-show="item.uid !== uid" w-14px h-14px class="img-icon"
                  :src=" isChecked(item.username) ? checkIcon : uncheckIcon"
                >
              </template>
              <!-- 管理员禁言、解禁 -->
              <template v-else-if="isSilence">
                <img
                  v-show="item.uid !== uid && item.state !== '2' && item.state !== '4'" w-14px h-14px class="img-icon"
                  :src=" isChecked(item.username) ? checkIcon : uncheckIcon"
                >
              </template>
            </template>
          </div>
        </div>
        <!-- </van-list> -->
      </van-pull-refresh>
    </div>
    <!-- 按钮 -->
    <template v-if="!isCheck">
      <template v-if="isSilence">
        <button class="type1" :disabled="btnsDisabled" @click="silenceHandler">
          禁言
        </button>
        <button class="type2" :disabled="btnsDisabled" @click="unSilenceHandler">
          解禁
        </button>
      </template>
      <button v-else-if="isKick" class="type3" :disabled="btnsDisabled" @click="kickOut">
        踢出
      </button>
      <button v-else-if="isEditManage" class="type1" :disabled="btnsDisabled" @click="setManage">
        设为群管理员
      </button>
    </template>
  </div>
</template>

<style lang='scss' scoped>
.group-member {
    display: flex;
    flex-direction: column;
    height: var(--viewport-height);

    .content {
        flex: 1;
        height: 0;
        background-color: $color-gray-4;
        overflow: auto;
        // padding-bottom: 100px;
    }
}
.manage-list{
  width: 375px;
  padding: 7px 16px;
  display: flex;
  overflow: auto;
  .manage-item{
    position: relative;
    margin-right: 13px;
    .minus{
      width: 14px;
      height: 14px;
      border-radius: 50%;
      display: block;
      position: absolute;
      right: -8px;
      top: 0;
    }
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
.type2{
    // background-color: $color-white-1;
    border-color: $color-blue-1;
    color: $color-blue-1;
    margin: 0 auto 10px;
    &:disabled{
        color: $color-gray-11;
        border-color: $color-gray-11;

    }
}
.type3{
    // background-color: $color-white-1;
    border-color: $color-red-4;
    color: $color-red-4;
    &:disabled{
        color: $color-gray-11;
        border-color: $color-gray-11;
    }
}
</style>
