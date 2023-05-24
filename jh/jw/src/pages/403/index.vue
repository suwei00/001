<script setup lang="ts" name="error403">
import bg from '@images/error/bg.png?preset=full'
import banner from '@images/error/banner.png?preset=full'
import bannerThumb from '@images/error/banner.png?preset=thumbnail&src'
import logo from '@images/error/logo.png?preset=full'

const router = useRouter()
const ip = ref('')
getIp().then((res: any) => {
  ip.value = res.loc + res.ip
})
const serviceUrl = 'http://www.baidu.com'
const openKefu = () => {
  window.open(serviceUrl)
}
</script>

<template>
  <main :style="getBackgroundImgObj(bg)">
    <section>
      <div class="left" mr-111px>
        <jl-image :src="banner" :thumb="bannerThumb" w-579px h-750px />
      </div>
      <div class="right">
        <img :src="getSupportImage(logo)" w-296px mb-36px cursor-pointer @click="router.push('/')">
        <h4 mb-30px>
          访问限制
        </h4>
        <div class="text" text-left mb-30px>
          <p>您的IP来自：<span>{{ ip }}</span></p>
          <p>
            尊敬的用户：<br>
            很抱歉，您所在的地区已经被禁止访问我们的平台，给您造成的不便，
            敬请谅解！如有任何疑问，请联系24小时在线客服，我们将竭诚为您服务。
          </p>
        </div>
        <button @click="openKefu">
          联系在线客服
        </button>
      </div>
    </section>
  </main>
</template>

  <style lang="scss" scoped>
  main {
      width: 100%;
      height: 100vh;
      background-size: 100% 100%;
      padding-top: 126px;
  }

  section {
      width: 1276px;
      margin: 0 auto;
      display: flex;

      .right {
          width: 586px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-top: 178px;
          font-size: 18px;

          h4 {
              font-size: 48px;
              font-family: $jl-font;
              font-weight: 500;
              color: #597EF7;
          }

          .text {
              color: #5B5E6B;
              p{
                  line-height: 2;
                  span{
                      color: #597EF7;
                  }
              }
          }

          button {
              width: 162px;
              height: 54px;
              background: linear-gradient(90deg, #82A6FF, #256EF5);
              border-radius: 6px;
              color: #fff;
          }
      }
  }
  </style>

