<script setup lang="ts" name="download">
import QrcodeVue from 'qrcode.vue'
import banner from '~/assets/images/download/banner.png?preset=full'
import bannerThumb from '~/assets/images/download/banner.png?preset=thumbnail&src'
import bg from '~/assets/images/download/bg.png?preset=full'
import title from '~/assets/images/download/title.png?preset=full'

// 获取app下载地址
// const { data } = $(useRequest(getAppDownloadUrl))
// const codeUrl = computed(() => `${data?.url}?t=${new Date().getTime()}`)

const codeUrl = computed(() => {
  if (import.meta.env.PROD) {
    const hostname = window.location.hostname
    const http = window.location.protocol
    const port = window.location.port

    return `${http}//app.${hostname.replace('www.', '')}${port ? `:${port}` : ''}`
  }
  else {
    return 'http://app.jlcs001.com/'
  }
})
</script>

<template>
  <div :style="getBackgroundImgObj(bg)" class="download">
    <div class="body">
      <jl-image :src="banner" :thumb="bannerThumb" w-700px h-694px />
      <div class="right">
        <img class="title" :src="getSupportImage(title)" alt="">
        <div class="code-box">
          <div class="code">
            <QrcodeVue id="qrCodenew" :value="codeUrl" :size="186" foreground="#3F5263" />
          </div>
          <div class="des" text-left>
            <h3>高效便捷 极致体验</h3>
            <p>业界版面最精美，让您尽情畅玩。最丰富彩票玩法，还有真人娱乐、海量体育赛事、棋牌、电子、捕鱼、电竞，最新最全娱乐项目尽在掌中！</p>
            <h6>快来扫码下载ＡＰＰ，即刻拥有！</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.download {
  width: 100%;
  padding: 56px 0 50px;
  background-size: cover;
  background-position: center center;
}

.body {
  width: 1281px;
  margin: 0 auto;
  display: flex;
}

.right {
  width: 581px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 151px;

  .title {
    height: 80.44px;
    margin-bottom: 34px;
  }

  .code-box {
    display: flex;
    align-items: center;
    justify-content: center;

    .code {
      width: 206px;
      height: 206px;
      padding: 10px;
      background: linear-gradient(180deg, #FFFFFF 0%, #F0F0F0 100%);
      box-shadow: 0px 9px 21px 1px rgba(0, 0, 0, 0.16);
      border-radius: 10px;
      margin-right: 26px;
    }
  }

  h3 {
    font-size: 38px;
    font-family: $jl-font;
    font-weight: 600;
    color: #515B7C;
    margin-bottom: 17px;
  }

  p {
    font-size: 18px;
    font-family: $jl-font;
    font-weight: 400;
    color: #333333;
    margin-bottom: 18px;
    text-align: left;
    line-height: 24px;
  }

  h6 {
    font-size: 22px;
    font-family: $jl-font;
    font-weight: 400;
    color: #333333;
  }

  button {
    width: 131px;
    height: 42px;
    background-size: 100% 100%;
    color: #fff;
    transition: all 0.5s ease;
    box-shadow: 0px 2px 5px 4px rgba(86, 122, 254, 0.3);
    border-radius: 50px;
    &:hover{
        scale: 1.1;
      }
  }
}
</style>

<route lang="yaml">
meta:
  layout: main
</route>
