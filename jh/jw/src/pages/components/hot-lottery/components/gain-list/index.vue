<script setup lang='ts' name="gain-list">
import no1Img from '@images/home/hot-lottery/001.png?preset=full'
import no1Thumb from '@images/home/hot-lottery/001.png?preset=thumbnail&src'
import no2Img from '@images/home/hot-lottery/002.png?preset=full'
import no2Thumb from '@images/home/hot-lottery/002.png?preset=thumbnail&src'
import no3Img from '@images/home/hot-lottery/003.png?preset=full'
import no3Thumb from '@images/home/hot-lottery/003.png?preset=thumbnail&src'
import no4Img from '@images/home/hot-lottery/004.png?preset=full'
import no4Thumb from '@images/home/hot-lottery/004.png?preset=thumbnail&src'

const imgList = [{
  src: no1Img,
  thumb: no1Thumb,
}, {
  src: no2Img,
  thumb: no2Thumb,
}, {
  src: no3Img,
  thumb: no3Thumb,
}, {
  src: no4Img,
  thumb: no4Thumb,
}]
const { getAvatarById } = useAvatar()
const { data } = $(useRequest(getRankList, { onSuccess(res) { res.p.sort((a: any, b: any) => Number(b.profit) - Number(a.profit)) } }))
const list = computed(() => data?.p.map((item: any) => {
  const name = `${item.name.slice(0, 2)}***${item.name.slice(-1)}`
  return {
    ...item, name,
  }
}))

// 昨日盈利榜
</script>

<template>
  <div class="gain-list">
    <div class="title">
      昨日盈利榜
    </div>
    <ul class="list">
      <li v-for="(item, index) in list" :key="item.name">
        <img :src="getAvatarById(item.avatar)" class="avatar">
        <div class="info">
          <p>账号昵称：&nbsp;<span class="name">{{ item.name }}</span></p>
          <p>昨日盈利：&nbsp;<span class="money">￥{{ item.profit }}</span></p>
        </div>
        <img
          v-if="index <= 2" v-src="imgList[index].src"
          loading="lazy" w-36px h-36px
          class="icon"
        >
        <div v-else :style="getBackgroundImgObj(imgList[3].src)" w-36px h-36px class="icon">
          {{ index + 1 }}
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.gain-list {
  width: 360px;
  background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 16%, #FFFFFF 90%, #F2F7FB 100%);
  box-shadow: 0px 2px 4px 1px rgba(86, 122, 254, 0.3);
  border-radius: 6px 6px 6px 6px;
  padding: 0 15px 20px;

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
    height: 148px;
    @include hideScrollbar();

    li {
      display: flex;
      border-top: 1px solid $border-color;
      align-items: center;
      height: 50px;
      line-height: 50px;
      padding-right: 27px;

      .avatar {
        box-shadow: 0px 2px 4px 1px rgba(86, 122, 254, 0.3);
        width: 38px;
        height: 38px;
        background-size: contain;
        border-radius: 50%;
        overflow: hidden;
      }

      .info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-left: 10px;

        p {
          font-size: 13px;
          line-height: 19px;
          color: #464B55;

        }

        .money {
          color: $color-primary;
          font-size: 13px;
        }
      }

      .icon {
        margin-left: auto;
        width: 36px;
        background-size: contain;
        height: 36px;
        line-height: 36px;
        color: #fff;
        font-weight: bolder;
        font-size: 15px;
      }
    }
  }
}
</style>
