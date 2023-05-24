<script lang="ts" setup>
import bgImage from '~/components/bgImage.vue'
import centerimg from '~/assets/images/error/two.png?preset=full'
import log from '~/assets/images/error/logos.png?preset=full'
import { getIp } from '~/utils/deviceUtil'
import { goTocustomerService } from '~/utils/customerService'

const ip = ref('')

getIp().then((res) => {
  ip.value = res.loc + res.ip
})
</script>

<template>
  <div class="text_four">
    403
  </div>
  <div class="warp">
    <div class="logo">
      <bgImage :image="log" />
      
    </div>
    <div class="three">
      <bgImage :image="centerimg" />
    </div>
    <div class="title">
      访问限制
    </div>
    <div class="content">
      <div class="content-title">
        您的IP来自：{{ ip }}
      </div>
      <div class="content-body">
        <p>尊敬的用户:</p>
        很抱歉，您所在的地区已经被禁止访问我们的平台，给您造成的不便，敬请谅解！如有任何疑问，请联系24小时在线客服，我们将竭诚为您服务。
      </div>
      <div class="content-foot">
        <button @click="goTocustomerService">
          联系在线客服
        </button>
      </div>
      <bgImage :image="log" />
    </div>
  </div>
</template>

<style lang="scss">
.text_four{
  opacity: 0;
}
.warp {
  width: 100%;
  min-height: 100%;
  background: #F3F6FF;
  padding: 30px 20px 0 20px;
  text-align: center;

  .logo {
    width: 168px;
    text-align: center;
    height: 56px;
    margin: 20px auto;
    i{
      width: 168px;
    }
  }

  .title {
    font-size: 20px;
    font-weight: 500;
    color: #597EF7;
  }

  .three {
    height: 273px;
    width: 228px;
    margin: 0 auto;
  }

  .content {
    width: 100%;
    font-family: PingFang SC;
    font-weight: 400;
    color: #000000;
    line-height: 24px;
    margin: 15px auto;

    .content-title {
      text-align: center;

      span {
        color: #597EF7;
      }
    }

    .content-body {
      margin: 15px 0 20px 0;
    }

    .content-foot {
      button {
        width: 98px;
        height: 33px;
        background: linear-gradient(90deg, #82A6FF, #256EF5);
        border-radius: 3px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
      }
    }
  }
}
</style>
