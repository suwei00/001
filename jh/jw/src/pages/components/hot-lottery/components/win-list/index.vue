<script setup lang='ts' name="win-list">
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'

const { data } = $(useRequest(getWinnerList))
const list = $computed(() => {
  if (!data?.length)
    return []
  return data.map((item) => {
    // 第4位和第5位是用*号代替的
    const name = `${item.name.slice(0, 2)}***${item.name.slice(-1)}`
    // 1(pk10) 2(快三) 3(时时彩) 4(11选5) 5(28)
    const list = [
      { name: 'PK10', value: '1' },
      { name: '快3', value: '2' },
      { name: '时时彩', value: '3' },
      { name: '11选5', value: '4' },
      { name: '幸运28', value: '5' },
      { name: '六合彩', value: '6' },
    ]
    const type = list.find(o => o.value === `${item.type}`)?.name
    return {
      ...item,
      type,
      name,
    }
  })
})

const { getAvatarById } = useAvatar()

// 高度根据11选5的个数调整
const appStore = useAppStore()
const { numOfLL5 } = $(storeToRefs(appStore))
</script>

<template>
  <div class="win-list" :style="{ height: `${316 - (numOfLL5 * 41)}px` }">
    <div class="title">
      中奖信息
    </div>
    <ul class="list">
      <Vue3SeamlessScroll hover :list="list" class="scroll">
        <li v-for="item in list" :key="item.name">
          <img
            :src="getAvatarById(item.avatar)"
            class="avatar"
          >
          <p>
            <span class="username">{{ item.name }}&nbsp;</span>在{{ item.type }}&nbsp;喜中&nbsp;<span class="money">￥{{
              item.amount }}</span>
          </p>
        </li>
      </Vue3SeamlessScroll>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.win-list {
  margin-top: 16px;
  width: 360px;
  background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 16%, #FFFFFF 90%, #F2F7FB 100%);
  box-shadow: 0px 2px 4px 1px rgba(86, 122, 254, 0.3);
  border-radius: 6px 6px 6px 6px;
  padding: 0 15px 20px;
  // height: 316px;
  overflow: hidden;

  .title {
    font-size: 15px;
    text-align: left;
    font-family: $jl-font;
    font-weight: bold;
    color: $color-black-primary;
    height: 50px;
    line-height: 50px;
  }

  .list {
    overflow: hidden;

    li {
      display: flex;
      height: 50px;
      border-top: 1px solid $border-color;
      align-items: center;
      font-size: 13px;

      .avatar {
        margin-right: 10px;
        box-shadow: 0px 2px 4px 1px rgba(86, 122, 254, 0.3);
        width: 38px;
        height: 38px;
        background-size: contain;
        border-radius: 50%;
        overflow: hidden;
      }

      .username {
        color: $color-primary;
      }

      .money {
        color: $color-primary;

      }
    }
  }
}
</style>
