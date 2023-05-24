<script lang="ts" setup>
import entryCsItemBg from '~/assets/images/entry/entryCs.png?preset=full'
// import entryCsItemThumb from '~/assets/images/entry/entryCs.png??preset=thumbnail&src'
import entryHomeItemBg from '~/assets/images/entry/entryHome.png?preset=full'
// import entryHomeItemThumb from '~/assets/images/entry/entryHome.png??preset=thumbnail&src'

import CustomizeCountdown from '~/components/customizeCountdown/index.vue'
const emit = defineEmits(['update:modelValue'])
const router = useRouter()

const disabled = ref(true)
const isOn = ref(false)
const start = computed(() => {
  console.log('router beforeEach', router.currentRoute.value)
  if (router.currentRoute.value.path === '/entry/register')
    return true
  else
    return false
})

const onFinish = () => {
  disabled.value = false
  isOn.value = true

  Local.setItem('registerNoticeVisible', { visible: false, time: new Date().getTime() })
}

const submit = () => {
  emit('update:modelValue', false)
}

const goToHome = () => {
  router.replace({
    path: '/home',
  })
}
</script>

<template>
  <div class="loginWarp">
    <div class="head">
      注册须知
    </div>
    <div class="inputContentWarp">
      <ol>
        <li>
          <div>
            尊敬的会员：
          </div>
        </li>
        <li>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;欢迎您注册成为久赢娱乐会员，我们有几点提示需要告知您：
          </div>
        </li>
        <li>
          <div>1.</div>
          <div>
            每位会员只允许注册1个账号，请不要重复注册或者帮下级注册。
          </div>
        </li>
        <li>
          <div>2.</div>
          <div>
            设置账号时请不要包含手机号信息内容。
          </div>
        </li>
        <li>
          <div>3.</div>
          <div>
            充值请自行到官方窗口获取，不要相信任何人（包括上级代理）给您私发的收款卡号信息。
          </div>
        </li>
      </ol>
      <p v-show="!isOn" class="red">
        请认真阅读以上须知后，10秒后即可开始注册。
      </p>
    </div>
    <div class="submitWarp">
      <van-button class="customizeSubmit" :disabled="disabled" @click="submit()">
        <span v-if="!isOn">
          <CustomizeCountdown v-if="start" :time="10000" :start="start" @on-finish="onFinish()" />s
        </span>
        <span v-else>我知道了</span>
      </van-button>
    </div>

    <ol class="entryFast">
      <li>
        
        <img loading="lazy" :src="getSupportImage(entryCsItemBg) ">
        <Sc sc-label="联系客服" color="#fff" />
      </li>
      <li>
        
        <img loading="lazy" :src="getSupportImage(entryHomeItemBg) ">
        <span @click="goToHome()">先去逛逛</span>
      </li>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
.loginWarp {
  width: 100%;

  .head {
    width: 100%;
    min-height: 24px;
    line-height: 24px;
    padding-top: 21px;
    font-size: 16px;
    text-align: center;
    font-weight: 800;
  }

  .inputContentWarp {
    width: 100%;
    padding-top: 36px;
    font-weight: 800;
    line-height: 16px;

    .red {
      color: #FF0000;
      padding-top: 15px;
      font-weight: 400;
      font-size: 10px;
      line-height: 10px;
    }

    ol {
      li {
        display: flex;
        padding-top: 20px;

        &:first-child {
          padding-top: 0;
        }
      }
    }
  }

  .submitWarp {
    width: 100%;
    padding-top: 30px;
    padding-bottom: 48px;
  }
}

.entryFast {
  width: 100%;
  display: flex;
  justify-content: space-between;

  li {
    display: flex;
    align-items: center;

    img {
      display: block;
      width: 12px;
      height: 12px;
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center;
    }

    span {
      padding-left: 5px;
    }
  }
}
</style>
