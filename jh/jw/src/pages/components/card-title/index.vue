<script setup lang='ts' name="card-title">
import titleLeft from '@images/home/card-title/title-left.png?preset=full'
import titleRight from '@images/home/card-title/title-right.png?preset=full'
const { title, subTitle } = defineProps<{ title: string; subTitle: string }>()
const titleLeftImg = `url(${getSupportImage(titleLeft)})`
const titleRightImg = `url(${getSupportImage(titleRight)})`
</script>

<template>
  <div class="card-title">
    <div class="inner">
      <div class="title">
        {{ title }}
      </div>
      <div class="sub-title">
        {{ subTitle }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-title {
  display: flex;
  align-items: center;
  &::before,
  &::after {
    content: '';
    width: 500px;
    height: 23px;
    background-repeat: no-repeat;
    background-size: contain;
    display: inline-block;
  }

  &::before {
    background-image: v-bind(titleLeftImg);
  }

  &::after {
    background-image: v-bind(titleRightImg);
  }

  .inner {
    padding: 0 14px;
    width: 300px;

    .title {
      color: $color-primary-second;
      font-size: 36px;
      font-weight: 600;
      line-height: 50px;
      text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    }

    .sub-title {
      color: $text-primary;
      font-size: 17px;
      line-height: 24px;
    }
  }

}
</style>
