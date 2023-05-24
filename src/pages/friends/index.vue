<script setup lang='ts' name='friends'>
import plusFriendsImg from '@icon/plus-friend.png?preset=full'
interface ArrItem { avatar?: string; friend_name?: string; friend_uid?: string; nick_name?: string; group: string; children: any[]; chat_id?: string }

const chatState = chatStateStore()
const { canAddNewFriend } = $(storeToRefs(useUserStore()))
const router = useRouter()

// 搜索栏
const searchValue = $ref('')

/* 🧑‍💻数据处理函数🧑‍💻 */
const groupingData = (data: Friends.FriendItem[]) => {
  // 搜索为空时
  if (data.length === 0)
    return []

  // 根据拼音首字母排序
  const result = sortBy(data.map((d) => {
    return { group: LETTERS.find(l => l === cnchar.spell(d.nick_name ? d.nick_name : d.friend_name).slice(0, 1)[0].toUpperCase()) ?? '#', ...d }
  }), d => d.group)
  // console.log('🎄 ~ file: index.vue:28 ~ result ~ result', result)

  // 根据字母分组分组
  const arr: ArrItem[] = []
  let obj: ArrItem = { group: '', children: [] }
  for (let i = 0; i < result.length; i++) {
    if (i === 0) {
      obj.group = result[i].group
      obj.children.push(result[i])
    }
    else {
      if (result[i].group === obj.group) {
        obj.children.push(result[i])
      }
      else {
        arr.push(obj)
        obj = { group: '', children: [] }
        obj.group = result[i].group
        obj.children.push(result[i])
      }
    }
    if (i === result.length - 1)
      arr.push(obj)
  }

  // 如果第一个是#分类，放到最后
  if (arr[0].group === '#')
    arr.push(arr.shift() ?? { group: '', children: [] })

  // console.log('🎄 ~ file: index.vue:52 ~ groupingData ~ arr', arr)
  return arr
}
// 数据
let dataList = $ref<Friends.FriendItem[]>([])
let page = $ref(1)
let total = $ref(0)
let finished = $ref(false)
const { run, loading } = $(useRequest(() => getFriendList({ page, pagesize: 500 }), {
  onSuccess(res) {
    total = res.t ? res.t : total
    res.d?.forEach((item) => {
      dataList.push(item)
    })
    if (dataList.length >= total)
      finished = true

    if (!finished) {
      page += 1
      run()
    }
  },
}))
const dataArr = $computed(() => {
  if (dataList.length > 0)
    return groupingData(dataList.filter(d => d.nick_name.includes(searchValue)))

  return [{ group: '', children: [] }]
})
const numOfFriend = $computed(() => dataArr.reduce((pre, cur) => pre + cur.children.length, 0))
const pullRefreshHandler = () => {
  page = 1
  finished = false
  dataList = []
  run()
}

// 字母导航
const letterList = $computed(() => {
  const arr = cloneDeep(LETTERS)
  arr.push('#')
  return arr
})

const chatItemClick = (item: ArrItem) => {
  // gid 群id
  // is_group 是否是群聊 true是群聊 false是私聊
  // is_publish ture 是公共群，false是私人群
  chatState.CacheChatHistoryList()
  sessionStorage.setItem('CHAT_DATA', JSON.stringify({ gid: item.chat_id, is_group: false, name: item.nick_name || item.friend_name, avatar: item.avatar, friend_uid: item.friend_uid }))
  router.push({ path: '/chat' })
}

const checkRemark = (item: ArrItem) => {
  router.push(`/friends/friend-remark?friend_uid=${item.friend_uid}`)
}

onMounted(() => {
  // 部分安卓手机虚拟键盘升起导致索引导航被顶上
  const docHeight = document.documentElement.clientHeight
  const el = document.querySelector('.van-index-bar__sidebar') as HTMLElement
  window.onresize = () => {
    if (docHeight > document.documentElement.clientHeight)
      el.style.top = '80%'

    else
      el.style.top = '50%'
  }
})
</script>

<template>
  <FooterLayout>
    <template #header>
      <ChatHeader title="好友" :is-back="false">
        <template #bottom>
          <div ref="searchBoxRef">
            <cg-search v-model="searchValue" mask />
          </div>
        </template>
      </ChatHeader>
    </template>
    <!-- main -->
    <cg-loading v-show="!finished" />
    <div v-if="canAddNewFriend" class="friends-item new-friend" @click="router.push('/friends/plus-friends')">
      <img :src="getSupportImage(plusFriendsImg)" w-40px h-40px mr-8px>
      新的好友
    </div>
    <div v-show="finished" relative flex-1>
      <!-- <van-pull-refresh v-model="loading" flex-1 @refresh="pullRefreshHandler"> -->
      <van-index-bar :index-list="letterList" teleport="body" highlight-color="#597EF7" :sticky="false">
        <div v-for="group in dataArr" :key="group.group">
          <van-index-anchor :index="group.group">
            <template #default>
              <p class="group-name">
                {{ group.group }}
              </p>
            </template>
          </van-index-anchor>
          <div v-for="item in group.children" :key="item.id" class="friends-item" @click.self="chatItemClick(item)">
            <cg-avatar :src="item.avatar" size="small" mr-8px @click.stop="checkRemark(item)" />
            <span>{{ item.nick_name ? item.nick_name : item.friend_name }}</span>
          </div>
        </div>
      </van-index-bar>
      <div v-show="numOfFriend > 0" class="total">
        共{{ numOfFriend }}位好友
      </div>
      <!-- </van-pull-refresh> -->
    </div>
  </FooterLayout>
</template>

<style lang='scss' scoped>
.new-friend {
  font-size: $size14;
  color: $color-blue-1;
  font-weight: 600;
}

.group-name {
  width: 375px;
  height: 25px;
  line-height: 25px;
  background: $color-gray-5;
  font-size: $size14;
  color: $color-gray-3;
  padding-left: 16px;
  box-sizing: border-box;
  border-bottom: 1px solid $color-gray-6;
}

.total {
  width: 375px;
  font-size: $size13;
  color: $color-gray-3;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 30px;
}
</style>
