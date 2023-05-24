<script lang="ts" setup>
import LoginComponent from './components/login.vue'
import RegisterComponent from './components/register.vue'
import RegisterNotice from './components/registerNotice.vue'

// import useM3u8 from '~/hooks/useM3u8'

import logoItemBg from '~/assets/images/entry/entryLoge.png?preset=full'
// import logoItemThumb from '~/assets/images/entry/entryLoge.png??preset=thumbnail&src'
import loginBackItemBg from '~/assets/images/entry/loginBack.png?preset=full'
// import loginBackItemThumb from '~/assets/images/entry/loginBack.png??preset=thumbnail&src'
import registerBackItemBg from '~/assets/images/entry/registerBack.png?preset=full'
// import registerBackItemThumb from '~/assets/images/entry/registerBack.png??preset=thumbnail&src'

import imgSrc1 from '~/assets/images/entry/loginBg.png?preset=full'
const bgImg2 = `url(${getSupportImage(imgSrc1)})`
const dragState = dragStateStore()

const route = useRoute()
const router = useRouter()
// 视频使用hls
const LOGIN_VIDEO_URL = 'https://jy-prod.obs.cn-south-1.myhuaweicloud.com/jy/m3u8/pc.m3u8'
const { videoRef } = useM3u8(LOGIN_VIDEO_URL)
const pathName = route.params.pathName
const no_ad = route.query.no_ad ?? '0' // no_ad=1代表跳过广告

const entryRef: any = ref(null)
const entryList = [
  {
    name: 'login',
    component: LoginComponent,
    key: 1,
  },
  {
    name: 'register',
    component: RegisterComponent,
    key: 2,
  },
]
const registerNoticeVisible = ref(false) // 默认显示注册协议
const registerIdSmsCode = ref(true) // 注册是否是需要短信验证码 true 需要 false 不需要
const browserSupport = ref(true) // 浏览器是否支持
const loginBackRef: any = ref(null)

const goToTab = (num: number) => { // 点击左右用的
  let styleStr = ''
  let pathStr = ''
  if (num === 1) {
    styleStr = 'translateX(-50%)'
    pathStr = '/entry/register'
  }
  else {
    styleStr = 'translateX(0)'
    pathStr = '/entry/login'
  }
  entryRef.value.style.transform = styleStr
  router.replace({
    path: pathStr,
    query: {
      ...route.query,
    },
  })
}

const getMemberRiskSms = () => {
  memberRiskSmsRequest().then((res: any) => {
    if (res.status)
      registerIdSmsCode.value = !!res.data
  })
}

onMounted(() => {
  switch (pathName) {
    case 'login':
      break
    case 'register':
      // 半小时内不显示
      // console.log(new Date().getTime(), '========{}{}{}======', (Local.getItem('registerNoticeVisible')?.time || 0))
      if (new Date().getTime() - (Local.getItem('registerNoticeVisible')?.time || 0) > 1000 * 60 * 30)
        registerNoticeVisible.value = true

      entryRef.value.style.transform = 'translateX(-50%)'
      break
    default: // 错误路由重制到注册页
      router.replace({
        path: '/entry/register',
        query: {
          ...route.query,
        },
      })
      entryRef.value.style.transform = 'translateX(-50%)'
      break
  }

  router.beforeEach((to, from, next) => {
    if (to.path === '/entry/register') {
      if (new Date().getTime() - (Local.getItem('registerNoticeVisible')?.time || 0) > 1000 * 60 * 30)
        registerNoticeVisible.value = true
    }

    next()
  })

  getMemberRiskSms()

  // // 检测手机型号
  const u = navigator.userAgent.toLowerCase()
  // 检测是否支持视频播放器自带浏览器 MiuiBrowser
  if (u.includes('heytapbrowser') || u.includes('vivobrowser') || u.includes('miuibrowser') || u.indexOf('baidu') > 0 || u.indexOf('UCBrowser') > 0 || u.indexOf('se') > 0 || u.indexOf('quark') > 0) {
    console.log('不支持视频播放器')
    browserSupport.value = false
  }
  // 不需要展示聊天室浮窗
  dragState.setIsShowDrag(false)
})

const loginBack = (item: any) => {
  goToTab(item.key)
  loginBackRef.value[1]?.goLogin()
  // console.log(loginBackRef.value[1], '------<<<<<<=====')
}

onBeforeUnmount(() => {
  dragState.setIsShowDrag(true)
})
</script>

<template>
  <div class="entryWarp">
    <video
      v-if="browserSupport" ref="videoRef" class="videoWarp" webkit-playsinline="true" x-webkit-airplay="allow"
      playsinline="true" loop="true" autoplay muted raw-controls="no" controls360="no"
    />
    <i v-if="!browserSupport" v-bg:lazy="{ src: imgSrc1 }" class="bgImg" />

    <div class="entryMain">
      <div class="entryLogoWarp">
        <img loading="lazy" :src="getSupportImage(logoItemBg)">
      </div>
      <div ref="entryRef" class="entryFromcontainer">
        <div v-for="(item, index) in entryList" :key="index" class="entryItemWarp">
          <div class="entryItem" :class="item.key === 2 ? 'entryItemRegister' : ''">
            <div v-if="item.key === 2" class="backBtn" @click="() => { loginBack(item) }">
              <img loading="lazy" :src="getSupportImage(loginBackItemBg)">
              <span>返回登录</span>
            </div>
            <div class="content">
              <template v-if="item.key === 2 && registerNoticeVisible && no_ad !== '1'">
                <RegisterNotice v-model="registerNoticeVisible" />
              </template>
              <template v-else>
                <component
                  :is="item.component" ref="loginBackRef" :show-code="registerIdSmsCode"
                  @go-login="goToTab(2)"
                />
              </template>
            </div>
            <div v-if="item.key === 1" class="backBtn" @click="goToTab(item.key)">
              <img loading="lazy" :src="getSupportImage(registerBackItemBg)">
              <span>注册新用户</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.entryWarp {
  background-image: v-bind(bgImg2);
  overflow-y: auto;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: #fff;
  position: relative;
  overflow-y: auto;

  .videoWarp {
    width: 100%;
    height: 100%;
    object-fit: fill;
    z-index: 1;
  }

  .bgImg {
    display: block;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .entryMain {
    width: 100%;
    min-height: 100%;
    /* padding-top: 83px; */
    position: absolute;
    top: 0;
    left: 0;
    z-index: 300;

    display: flex;
    flex-direction: column;
    justify-content: center;

    .entryLogoWarp {
      width: 100%;
      display: flex;
      justify-content: center;
      height: 57px;
      // padding-top: 3px;
      margin-bottom: 15px;

      img {
        display: block;
        width: 164px;
        // height: 36px;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
      }
    }

    .entryFromcontainer {
      width: 200%;
      display: flex;
      transform: translateX(0);
      transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
      transition-property: transform;
      transition-duration: 500ms;

      .entryItemWarp {
        width: 100%;
        min-height: 370px;
        padding: 0 20px;

        .entryItem {
          width: 100%;
          min-height: 370px;
          display: flex;
          border-radius: 11px;
          overflow: hidden;
          background: rgba(190, 190, 190, 0.5);

          .content {
            flex: 1;
            width: 100%;
            padding: 0 16px 15px 16px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

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
          }

          .backBtn {
            width: 41px;
            min-height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: rgba(0, 0, 0, 0.4);

            img {
              display: block;
              width: 23px;
              height: 23px;
              background-size: 100%;
              background-repeat: no-repeat;
              background-position: center;
            }

            span {
              width: 15px;
              padding-top: 9px;
              font-size: 15px;
              // 文字竖着显示
              writing-mode: vertical-lr;
              writing-mode: tb-lr;
              text-orientation: upright;
              // 上下间隔
              letter-spacing: 6px;
              text-align: center;
              // line-height: 20px;
            }
          }

          &.entryItemRegister {
            background: rgba(0, 0, 0, 0.4);

            .backBtn {
              background: rgba(190, 190, 190, 0.5);
            }
          }
        }
      }
    }
  }
}
</style>
