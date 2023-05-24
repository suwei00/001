<script setup lang='ts' name="marquee-popup">
// import closeImg from '@images/home/emergency/close.png?preset=full'
import { Vue3Marquee } from 'vue3-marquee'

const { list } = defineProps<{
  list: Array<{
    id: string
    title: string
    content: string
    redirect: number
    redirect_url: string
    state: string
    seq: string
    created_at: number
    created_uid: string
    created_name: string
    updated_at: number
    updated_name: string
    prefix: string
  }>
}>()
let isOpen = $ref(false)
let currentIndex = $ref(0)
const open = (i: number) => {
  isOpen = true
  currentIndex = i
}
const close = () => { isOpen = false }

// 跳转
const router = useRouter()
const goTo = (path: string, id: string) => {
  if (path === 'static')
    router.push({ path: '/activity/stpage', query: { flag: 'static', id } })
  else
    router.push({ path: `/activity/${path}`, query: { flag: path, id } })
}
const { launch } = useLaunch()
const handleItemClick = (item: any) => {
  const { redirect, redirect_url } = item
  const path = redirect_url.split('/')[1]
  const id = redirect_url.split('/')[2]

  switch (redirect) {
    // 站内
    case 1:
      router.push(redirect_url)
      break
      // 站外
    case 2:
      openLink(redirect_url)
      break
      // 场馆
    case 3:
      launch(redirect_url)
      break
      // 活动
    case 4:
      goTo(path, id)
      break
    default:
      break
  }
}

// 暴露
defineExpose({
  open,
})
</script>

<template>
  <div v-if="isOpen" class="marquee-popup">
    <div class="body">
      <div class="title">
        <h4 v-if="list[currentIndex].title.length < 24">
          {{ list[currentIndex].title }}
        </h4>
        <div v-else w-460px overflow-hidden>
          <Vue3Marquee :duration="20" pause-on-hover ml-9px>
            <span class="title-span" whitespace-nowrap v-html="`${filterXSS(list[currentIndex].title)}`" />
          </Vue3Marquee>
        </div>
      </div>
      <div class="content-box">
        <div class="wrapper">
          <div class="box" :style="{ transform: `translateX(-${475 * currentIndex}px)` }">
            <div v-for="(msg) in list" :key="msg.id" w-475px>
              <el-scrollbar always :max-height="list && list.length > 1 ? '126px' : '168px'">
                <p
                  :class="{ 'cursor-pointer': msg.redirect !== 0 }"
                  :style="{ height: list && list.length > 1 ? '126px' : '168px' }"
                  @click="handleItemClick(msg)"
                >
                  {{ msg.content }}
                </p>
              </el-scrollbar>
            </div>
          </div>
        </div>
        <ul v-if=" list && list.length > 1" class="dots">
          <li
            v-for="(i) in list?.length" :key="i" :class="{ active: currentIndex === i - 1 }"
            @click="currentIndex = i - 1"
          />
        </ul>
        <button @click="close">
          我知道了
        </button>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.marquee-popup {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 2000;
    top: 0;
    left: 0;
    background-color: rgb(0, 0, 0, 0.3);
}

.body {
    width: 550px;
    border-radius: 10px;
    box-shadow: 0px 10px 80px 1px rgba(0, 0, 0, 0.05);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 18px;
    overflow: hidden;
}

.title {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 550px;
    height: 48px;
    background: linear-gradient(90deg, #96AEFF 0%, #597EF7 100%);

    h4,.title-span {
        font-size: 18px;
        font-family: $jl-font;
        font-weight: 600;
        color: #FFFFFF;
    }

    .close {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 16px;
        cursor: pointer;
    }
}

.content-box {
    padding: 34px 50px 31px;
    background-color: #fff;

    .wrapper {
        width: 475px;
        overflow: hidden;
        margin-bottom: 26px;

        .box {
            display: flex;
            transition: all 0.35s ease;
        }

        p {
            width: 475px;
            padding-right: 20px;
            font-size: 15px;
            white-space: pre-wrap;
            text-align: left;
        }
    }

    .dots {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 27px;

        li {
            background-clip: content-box;
            box-sizing: content-box;
            margin: 0 7px;
            display: block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            padding: 3px;
            border: 1px solid #fff;
            background-color: #9AA4C2;
            cursor: pointer;
        }

        .active {
            border: 1px solid #597EF7;
            background-color: #597EF7;

        }
    }
    button{
      width: 215px;
      height:50px;
      background: #597EF7FF;
      border-radius: 6px;
      font-size: 18px;
      color: #fff;
    }

}
</style>
