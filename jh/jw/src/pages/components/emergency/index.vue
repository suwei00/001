<script setup lang='ts' name="emergency">
import icon from '@images/home/emergency/emergency.png?preset=full'
import closeImg from '@images/home/emergency/close.png?preset=full'

const { emergencyLetters } = defineProps<{ emergencyLetters?: {
  content: string
  is_delete: number
  is_read: number
  is_top: number
  is_vip: number
  message_id: string
  send_at: number
  send_name: string
  title: string
  ts: string
  ty: number
}[] }>()
const emit = defineEmits(['onClose'])
const router = useRouter()

let isOpen = $ref(false)
let currentIndex = $ref(0)
const open = () => {
  isOpen = true
  nextTick(() => {
    readUserMsg({ ts: emergencyLetters![0].ts })
  })
}
const onClose = () => {
  isOpen = false
}
const switchMsg = (i: number) => {
  currentIndex = i
  readUserMsg({ ts: emergencyLetters![i].ts })
}
// 关闭
const close = () => {
  onClose()
  emit('onClose')
}
// 查看更多
const checkMore = () => {
  onClose()
  const t = setTimeout(() => {
    router.push('/personal/message')
    clearTimeout(t)
  }, 10)
}

// 暴露
defineExpose({
  open,
})
</script>

<template>
  <div v-if="isOpen" class="emergency">
    <div class="body">
      <div class="title">
        <img :src="getSupportImage(icon)" alt="" h-26px mr-7px>
        <h4>紧急通知</h4>
        <div class="close" p-5px @click="close">
          <img :src="getSupportImage(closeImg)" alt="" h-14px>
        </div>
      </div>
      <div class="content-box">
        <div class="wrapper">
          <div
            class="box"
            :style="{ transform: `translateX(-${475 * currentIndex}px)` }"
          >
            <div v-for="(msg) in emergencyLetters" :key="msg.message_id" w-475px>
              <el-scrollbar always :max-height="emergencyLetters && emergencyLetters.length > 1 ? '105px' : '147px'">
                <p
                  :style="{ height: emergencyLetters && emergencyLetters.length > 1 ? '105px' : '147px' }"
                  v-html="filterXSS(msg.content)"
                />
              </el-scrollbar>
            </div>
          </div>
        </div>
        <ul v-if=" emergencyLetters && emergencyLetters.length > 1" class="dots">
          <li
            v-for="(i) in emergencyLetters?.length" :key="i" :class="{ active: currentIndex === i - 1 }"
            @click="switchMsg(i - 1)"
          />
        </ul>
        <div w-450px flex justify-between>
          <button @click="close">
            我知道了
          </button>
          <button @click="checkMore">
            查看更多
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.emergency {
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

    h4 {
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
  min-height: 302px;
    padding: 34px 24px 0 50px;
    background-color: #fff;

    .wrapper {
        width: 475px;
        overflow: hidden;
        margin-bottom: 30px;

        .box{
            display: flex;
            transition: all 0.35s ease;
        }

        p {
            width: 475px;
            padding-right: 20px;
            font-size: 15px;
            white-space:pre-wrap;
            text-align: left;
        }
    }

    .dots {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;

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

    button {
        width: 215px;
        height: 50px;
        border: 1px solid #597EF7;
        border-radius: 6px;

        &:nth-of-type(1) {
            color: #597EF7;
        }

        &:nth-of-type(2) {
            color: #fff;
            background-color: #597EF7;
        }
    }
}
</style>
