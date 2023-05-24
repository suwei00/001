<script setup lang="ts" name="egame">
import bgImg from '@images/home/main-bg.png?preset=full'
import egameBgImg from '@images/egame/egame-bg.png?preset=full'
import leftBg from '@images/egame/left.png?preset=full'
import rightBg from '@images/egame/right.png?preset=full'
import middleBg from '@images/egame/middle.png?preset=full'
const imgLeft = getImageUrl(leftBg)
const imgMiddle = getImageUrl(middleBg)
const imgRight = getImageUrl(rightBg)
const { close } = useLoading()
// 关闭全局loading
close()
const { data: bonus, mutate } = $(useRequest(getBonusPool))
const changeJackpot = () => mutate(`${Number(bonus) + random(25, 300)}`)
useIntervalFn(changeJackpot, 2000)
const val = $computed(() => {
  if (!bonus)
    return ''
  return `${toNumber(bonus) + random(25, 300, true)}`
})
</script>

<template>
  <div :style="getBackgroundImgObj(bgImg)" class="home">
    <div :style="getBackgroundImgObj(egameBgImg)" game-list-container class="egame">
      <div class="flip-wrapper">
        <flip v-if="bonus" :value="val" class="flip" />
        <div v-if="val" class="imgAll">
          <div class="left" />
          <div class="middle" />
          <div class="right" />
        </div>
      </div>
      <game-list key="egame" flag="egame" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  background-size: cover;
  background-repeat: repeat-y;
}
.egame {
  position: relative;

  .flip-wrapper {
    position: relative;
    padding-left: 40px;
    padding-right: 40px;
    height: 177px;
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 313px;
    left: 50%;
    transform: translateX(-50%);
    &::before{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('~@images/egame/egame-bg.png');
      background-position: center;

    }
    .flip {
      transform: translateY(-10%)
    }
    .imgAll{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      display: flex;
      .left{
        width: 50px;
        height: 177px;
        background-image: v-bind(imgLeft);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: right;
        transform: translateX(0.5px);
      }
      .right{
        width: 50px;
        height: 177px;
        background-image:v-bind(imgRight);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: left;
        transform: translateX(-0.5px);
      }
      .middle{
        flex: 1;
        height: 177px;
        background-image:v-bind(imgMiddle);
        background-size: contain;
        background-repeat: repeat-x;
        background-position: center;
      }
    }
  }
}
</style>

<route lang="yaml">
meta:
  layout: main
  key: egame
</route>
