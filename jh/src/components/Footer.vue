<script lang="ts" setup>
// 背景图
import bgSrc1 from '~/assets/images/foot/activity-0.png?preset=full'
import bgSrc2 from '~/assets/images/foot/activity-1.png?preset=full'
import bgSrc3 from '~/assets/images/foot/chat-0.png?preset=full'
import bgSrc4 from '~/assets/images/foot/lottery-1.png?preset=full'
import bgSrc5 from '~/assets/images/foot/logo-1.png?preset=full'
import bgSrc55 from '~/assets/images/foot/logo-0.png?preset=full'
import bgSrc6 from '~/assets/images/foot/acting-0.png?preset=full'
import bgSrc7 from '~/assets/images/foot/acting-1.png?preset=full'
import bgSrc8 from '~/assets/images/foot/my-0.png?preset=full'
import bgSrc9 from '~/assets/images/foot/my-1.png?preset=full'
import { useUserInfoStore } from '~/store/userInfo'
const dragState = dragStateStore()

const { token } = storeToRefs(useUserInfoStore())
// const { venueList } = storeToRefs(useAppStore())
const router = useRouter()
const route = useRoute()

const visible = ref(true)

const footList = [
  {
    label: '活动',
    icon: bgSrc1,
    icon1: bgSrc2,
    path: '/activity',
    visible: true,
  },
  {
    label: '聊天',
    icon: bgSrc3,
    icon1: bgSrc3,
    path: '/lottery',
    visible: true,
  },
  {
    label: '首页',
    icon: bgSrc5,
    icon1: bgSrc55,
    path: '/home',
    special: true,
    visible: true,
  },
  {
    label: '代理',
    icon: bgSrc6,
    icon1: bgSrc7,
    path: '/acting',
    visible: true,
  },
  {
    label: '我的',
    icon: bgSrc8,
    icon1: bgSrc9,
    path: '/my',
    visible: true,
  },
]
const currentIndex = ref<number>(2)
const goTo = (pathSrc: any, index: number, query = {}) => {
  currentIndex.value = index
  const filterFrom: any = []
  footList.forEach((item) => {
    filterFrom.push(item.path)
  })

  if (filterFrom.includes(pathSrc)) {
    router.push({
      path: pathSrc,
      query: {
        ...query,
      },
    })
  }
  else {
    router.push({
      path: pathSrc,
      query: {
        from: route.path,
        ...query,
      },
    })
  }
}

router.beforeEach((to, from) => {
  // console.log('to>>>>>', to)
  // console.log('from>>>>>', from)
  const toPath = to.path
  let isToPath = false
  footList.forEach((item: any, index: any) => {
    if (toPath === item.path && item.visible && item.path !== '/lottery') {
      isToPath = true
      currentIndex.value = index
    }
  })
  if (isToPath)
    visible.value = true
  else
    visible.value = false
})

onMounted(() => {
  window.addEventListener('message', (data: any) => {
    if (data?.data?.isShowFooter) {
      const toPath = location.pathname
      let isToPath = false
      footList.forEach((item: any) => {
        if (toPath === item.path && item.visible)
          isToPath = true
      })
      if (isToPath)
        visible.value = true
      else
        visible.value = false
    }
    else if (data?.data?.isShowFooter === false) {
      visible.value = false
    }
  }, false)
})

const bottomNvToPage = (path: string, index: number) => {
  if (!token.value && index === 1) {
    goTo('/entry/login', index)
  }
  else {
    if (path === '/lottery') {
      dragState.setShowChat(true)
      dragState.setIsShowDrag(true)
    }
    // 彩票挂维护后，不能进入购彩大厅
    // const venueLists = venueList.value
    // const list = venueLists.find((item: any) => item.id === 5 && item.l.find((row: any) => row.maintained === 2)) // CG彩票
    // if (list) {
    //   Toast('场馆维护中...')
    //   return
    // }
    // goTo(path, index)

    else { goTo(path, index) }
  }
}
</script>

<template>
  <nav v-if="visible" class="foot">
    <ul>
      <li v-for="(item, index) in footList" :key="index" @click="bottomNvToPage(item.path, index)">
        <div class="icon" :class="item.special ? 'center' : ''">
          <img v-if="currentIndex === index" loading="lazy" :src="getSupportImage(item.icon1)">
          <img v-else loading="lazy" :src="getSupportImage(item.icon)">
        </div>
        <p :class="currentIndex === index ? 'active-color' : ''">
          {{ item.label }}
        </p>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.foot {
  width: 100%;
  height: 78px;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10;

  ul {
    width: 100%;
    height: 68px;
    display: flex;
    margin-top: 18px;
    padding: 0 20px;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 15px 15px 0 0;
    filter: drop-shadow(0 0 1px #fff) drop-shadow(0 0 1px #fff) drop-shadow(0 0 3px #AFBDE1) drop-shadow(0 0 4px #AFBDE1);

    li {
      .icon {
        padding: 2.5px;

        img {
          display: block;
          width: 35px;
          height: 35px;
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: center;
        }

        &.center {
          background-color: #fff;
          margin-top: -10px;
          border-radius: 50%;
          padding: 0 0 1px 0;
          transition: all .35s ease;

          img {
            margin-top: -4px;
            width: 50px;
            height: 50px;
          }
        }
      }

      p {
        font-size: 10px;
        line-height: 14px;
        text-align: center;
      }
    }
  }

  .active-color {
    color: #4F73F6;
    font-weight: 600;
  }
}
</style>
