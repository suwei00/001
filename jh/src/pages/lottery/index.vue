<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useUserInfoStore } from '~/store/userInfo'
import useRouterBack from '~/hooks/routerBackHooks'

import lotteryLoding from '~/assets/images/venue/lotteryLoading.png?preset=full'

const { token } = storeToRefs(useUserInfoStore())
const route = useRoute()
const { category }: any = route.query
const visible = ref(true)

const mode = import.meta.env.MODE ?? 'development'
const cpBase = mode === 'development' ? import.meta.env.VITE_CP_URL : location.origin.replace('h5.', 'h5cp.')

let iframeSrc = ''
if (![undefined, null, ''].includes(category))
  iframeSrc = `${cpBase}?token=${token.value}&category=${category}`
else
  iframeSrc = `${cpBase}?token=${token.value}`

const { goTo } = useRouterBack()
const { clearToken } = useUserInfoStore()

const schedule = ref(0)
let timer: any

const LoadingCompleted = () => {
  clearInterval(timer)
  schedule.value = 100
  const t = setTimeout(() => {
    visible.value = false
    clearTimeout(t)
  }, 100)
}

const renderOnload = () => {
  const timer1 = setInterval(() => {
    schedule.value++
    if (schedule.value >= 99) {
      clearInterval(timer1)
      LoadingCompleted()
    }
  }, 1000)
}

const renderFrame = () => {
  const iframe = document.getElementById('cglottery')
  timer = setInterval(() => {
    schedule.value++
    if (schedule.value > 90)
      clearInterval(timer)
  }, 50)
  iframe!.onload = function () {
    renderOnload()
  }
}

onMounted(() => {
  window.addEventListener('message', (data: any) => {
    switch (data.data.action) {
      case 'outLogin':
        goTo('/entry/login')
        clearToken()
        console.log('outLogin')
        break
      case 'loadingCompleted':
        LoadingCompleted()
        break
      default:
        break
    }
  })
  renderFrame()
})
</script>

<template>
  <div class="lotteryWarp">
    <div v-show="visible" class="loadingWarp">
      <div v-bg:lazy="{ src: lotteryLoding }" class="bgWarp">
        <div class="bgWarpb">
          <p>{{ schedule }}%</p>
          <div class="progressBar">
            <div :style="`width:${schedule}%`" class="progressBarb" />
          </div>
        </div>
      </div>
    </div>
    <div class="lotteryMain">
      <iframe
        v-if="iframeSrc" id="cglottery" allow="clipboard-read; clipboard-write"
        :style="{ height: '100%', width: '100%', opacity: visible ? 0 : 1 }" :src="iframeSrc"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lotteryWarp {
  width: 100%;
  height: 100%;
  position: relative;

  .loadingWarp {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    padding-bottom: 50px;
    background-color: #fff;

    .bgWarp {
      width: 100%;
      height: 100%;
      background-size: 100%;
      background-position: 0 -50px;
      background-repeat: no-repeat;

      .bgWarpb {
        width: 100%;
        padding: 530px 25px 0;

        p {
          width: 100%;
          height: 18px;
          font-weight: 800;
          text-align: right;
        }

        .progressBar {
          width: 100%;
          height: 6px;
          border-radius: 100px;
          overflow: hidden;
          background: #EDEDED;

          .progressBarb {
            height: 100%;
            width: 0;
            background: linear-gradient(90deg, #8AA5FE 0%, #567CF7 100%);
          }
        }
      }
    }
  }

  .lotteryMain {
    width: 100%;
    height: 100%;
  }
}
</style>
