<script setup lang='ts' name='entry'>
const { type } = defineProps<{ type: 'login' | 'register' }>()
// 登录视频地址
const LOGIN_VIDEO_URL = 'https://jy-prod.obs.cn-south-1.myhuaweicloud.com/jy/m3u8/pc.m3u8'
const { videoRef } = useM3u8(LOGIN_VIDEO_URL)
</script>

<template>
  <div class="entry">
    <video ref="videoRef" class="bg-video" loop muted autoplay />
    <div class="inner">
      <transition appear :name="type === 'register' ? 'slide-right' : 'slide-left'" mode="out-in">
        <login v-if="type === 'login'" />
        <register v-else />
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.entry {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: $color-black-primary;
  position: relative;
  .bg-video{
    left: 50%;
    min-height: 100%;
    min-width: 100%;
    -o-object-fit: fill!important;
    object-fit: fill!important;
    position: fixed;
    top: 50%;
    transform: translate3d(-50%,-50%,0);
  }

  .inner {
    position: absolute;
    width: 300px;

  }
}
</style>

<style lang="scss">
  .el-input__clear {
  svg {
    font-size: 16px;
    color: #efefef;
  }

}
</style>
