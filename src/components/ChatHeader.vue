<script lang="ts" setup>
import back from '../assets/image/chat/back.png?preset=full'
import bg from '../assets/image/chat/header-bg.png?preset=full'
import close from '../assets/image/home/close.png?preset=full'
const props = withDefaults(defineProps<{
  title: string
  isBack?: boolean
  isClose?: boolean
}>(), {
  title: '',
  isBack: true,
  isClose: true,
})
const router = useRouter()
const { routeList } = storeToRefs(useAppStore())

const { setVipId } = storeToRefs(useUserStore())

const headerBg = getImageUrl(bg)
const backUrl = getSupportImage(back)

const goBack = () => {
  console.error('回退', routeList.value[routeList.value.length - 1])
  router.push(routeList.value[routeList.value.length - 1])
}

const windowType = sessionStorage.getItem('WINDOW_TYPE')

const closeWindow = () => {
  sessionStorage.removeItem(setVipId.toString())
  window.parent.postMessage(
    {
      action: 'closeWindow',
    },
    '*',
  )
}
</script>

<template>
  <header class="header-container">
    <section class="header">
      <div class="header-left">
        <div v-if="isBack" class="header-left-icon1" @click.stop.prevent="goBack">
          <img class="righ_icon" :src="backUrl" alt="">
        </div>
        <div v-else-if="isClose && windowType !== 'pc'" class="header-left-icon1" @click="closeWindow">
          <img class="close_icon" :src="getSupportImage(close)">
        </div>
        <div class="header-left-icon2">
          <slot name="leading" />
        </div>
      </div>
      <div class="header-title">
        <div>{{ props.title }}</div>
      </div>
      <div class="header-right">
        <div class="header-right-icon">
          <slot name="actions" />
        </div>
      </div>
    </section>
    <section>
      <slot name="bottom" />
    </section>
  </header>
</template>

<style lang="scss" scoped>
.header-container{
  background-image: v-bind(headerBg);
  background-size: 100% auto;
  background-repeat: no-repeat;
}
.header {
    width: 100%;
    display: flex;
    height: $size50;
    line-height: $size50;
    align-items: center;
    .header-title{
      flex: 1;
      width: 0;
      color: $color-white-1;
      font-size: $size18;
      line-height: $size50;
      text-align: center;
      >div{
        // 超出省略
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .header-left{
        min-width: 45px;
        height: 100%;
        display: flex;
        align-items: center;
        .header-left-icon1{
            margin-left: $size14;
            margin-right: $size10;
        }
        .header-left-icon2{
            img{
                width: 35px;
                height: 35px;
                border-radius: 50%;
            }
        }
        >div{
            display: flex;
        }
    }

    .header-right {
        .header-right-icon{
            display: flex;
            justify-content: flex-end;
            min-width: 38px;
            height: 100%;
            margin-right: $size16;
            img{
                width: 17px;
                height: 17px;
            }
        }
    }
    .righ_icon{
        width: $size10;
        height: $size18;
    }

    .close_icon{
        width: 30px;
        height: 30px;
    }
}
</style>
