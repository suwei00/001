<script setup lang="ts">
import { downTimeFormat } from '~/utils/time'
interface Props {
  countDownName?: string
  time: number
  format?: string
  start: boolean
}
const props = withDefaults(defineProps<Props>(), {
  countDownName: '', // 倒计时名称, 如果传输了, 则会在本地存储倒计时时间。
  time: 0, // 倒计时时间 *
  format: 'ss', // 倒计时显示方式；默认：ss ；可选：dd:hh:mm:ss
  start: false, // 是否开始倒计时；*  默认开始一定要传false，否则会出现倒计时不准确的情况
})
const emit = defineEmits(['onFinish'])
const router = useRouter()

const { countDownName, time } = props
const pathName = router.currentRoute.value.name

let timer: any = null
const times = ref(time)

const downTimeFn = () => {
  timer = setInterval(() => {
    times.value -= 1000
    if (times.value <= 0) {
      times.value = 0
      clearInterval(timer)
      timer = null
      emit('onFinish')
      if (sessionStorage.getItem(`${countDownName}_downtime`))
        sessionStorage.removeItem(`${countDownName}_downtime`)
    }
  }, 1000)
}

const getLaveTime = (newVal: boolean) => {
  if (newVal) {
    if (countDownName) {
      const currentTime = new Date().getTime()
      if (sessionStorage.getItem(`${countDownName}_downtime`) === null) {
        sessionStorage.setItem(`${countDownName}_downtime`, (currentTime + time).toString())
      }
      else {
        const expectedTime = Number(sessionStorage.getItem(`${countDownName}_downtime`) ?? 0) // 预计时间
        const lastTime = (expectedTime - currentTime) <= 0 ? 0 : (expectedTime - currentTime)
        times.value = lastTime
      }
    }

    downTimeFn()
  }
  else {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    if (sessionStorage.getItem(`${countDownName}_downtime`))
      sessionStorage.removeItem(`${countDownName}_downtime`)
  }
}

onMounted(() => {
  getLaveTime(props.start)
})

watch(() => props.start, (newVal) => {
  getLaveTime(newVal)
})

// 路由 router 离开
router.beforeEach((to, from, next) => {
  if (from.path === pathName) {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    if (sessionStorage.getItem(`${countDownName}_downtime`))
      sessionStorage.removeItem(`${countDownName}_downtime`)
  }
  next()
})
</script>

<template>
  <span>{{ downTimeFormat(times, format) }}</span>
</template>
