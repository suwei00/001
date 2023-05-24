<script setup lang='ts' name="cg-lottery">
import loadingAvi from '@images/cglottery/loading.jpg.avif'
import loadingWebp from '@images/cglottery/loading.jpg.webp'
import loadingJpg from '@images/cglottery/loading.jpg'

const appStore = useAppStore()
const { token } = $(storeToRefs(appStore))
const category = $(useRouteQuery<string>('category', 'hot'))
const url = $(useRouteQuery<string>('url', ''))
const { close } = useLoading()
// 关闭全局loading
close()
// 获取当前域名头部
console.log('output->window.location.host', window.location.host)
console.log('output->location', location)
const cpHost = getCpHost()
const cpUrl = $computed(() => {
  // 开发环境使用vite的里面的彩票地址，生产环境使用拼接的彩票地址
  const u = isDev() ? import.meta.env.VITE_CP_URL : cpHost
  // 首页热门投注跳转过来的
  const time = new Date().getTime()
  if (url)
    return decodeURIComponent(`${u}${url}?${qs.stringify({ t: token, time })}`)
  // nav跳转过来的
  return decodeURIComponent(`${u}?${qs.stringify({ t: token, category, time })}`)
})

let showLoading = $ref(true)
let schedule = $ref(0)
let timer: any
onMounted(() => {
  const iframe = document.getElementById('cglottery')
  timer = setInterval(() => {
    schedule++
    if (schedule > 95)
      clearInterval(timer)
  }, 10)
  iframe!.onload = function () {
    clearInterval(timer)
    schedule = 100
    const t = setTimeout(() => {
      showLoading = false
      clearTimeout(t)
    }, 500)
  }
})
onBeforeUnmount(() => { clearInterval(timer) })
</script>

<template>
  <div class="cg-lottery">
    <div class="lottery-wrapper">
      <div v-if="showLoading" class="loading">
        <picture>
          <source :srcset="loadingAvi" type="image/avif">
          <source :srcset="loadingWebp" type="image/webp">
          <img :src="loadingJpg" alt="list">
        </picture>
        <div class="progress-box">
          <h6>{{ schedule }}%</h6>
          <div class="progress">
            <span :style="{ width: `${schedule}%` }" />
          </div>
        </div>
      </div>
      <iframe
        v-if="token"
        id="cglottery"
        :key="cpUrl"
        :style="{ opacity: showLoading ? 0 : 1 }"
        :src="cpUrl" w-full h-full frameborder="0"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cg-lottery {
  .lottery-wrapper {
    width: 100%;
    // height: 1200px;
    height: 100vh;
    position: relative;
  }
  #cglottery{
    transition: all 0.35s ease;
  }
  .loading{
    width: 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    img{
      width: 100%;
    }
    .progress-box{
      position: absolute;
      bottom: 25%;
      left: 50%;
      transform: translateX(-50%);
      h6{
        font-weight: bolder;
        color: #515B7D;
        margin-bottom: 8px;
        text-align: right;
      }

      .progress{
        width: 600px;
        height: 10px;
        background-color:#E0DDDD ;
        border-radius:20px ;
        overflow: hidden;
        span{
          display: block;
          height: 10px;
          background-color: #597EF7;
          transition: all 0.5s ease;
        }
      }
    }
  }
}
</style>

<route lang="yaml">
meta:
  layout: main
  auth: true
  </route>
