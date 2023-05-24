<script lang="ts" setup>
/**
 * 本插件基于better-scroll https://better-scroll.github.io/docs/zh-CN/
 * 提供了:
 * 1、下拉刷新
 * 2、上拉加载
 * 3、第一次进入页面的初始化功能
 * 4、实时修改page
 * 5、你也可以当作一个弹性滚动框使用
 *
 * 使用注意事项:
 * 1、使用的外层盒子一定要加 overflow: hidden;
 */
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import PullDown from '@better-scroll/pull-down'
import Pullup from '@better-scroll/pull-up'

import defaultNoDataBg from '~/assets/images/noData/default.png?preset=full'
import BgImage from '~/components/bgImage.vue'
import useBackRouter from '~/hooks/routerBackHooks'
const props = withDefaults(defineProps<Props>(), {
  style: '',
  threshold: 70, // 上拉/下拉刷新的高度
  modelValue: { // 必传参数
    page: 1, // 当前页 回自动为您算出准确页码 注意⚠️： 默认必须是1 并且 我会在init给你一个 resolve ，若请求失败，必须返回一个对象，对象中必须有一个noPass: true。不然page会自动+1。
    size: 0, // 每页条数
    total: 0, // 总条数
  },
  pullDown: true, // 是否开启下拉刷新
  pullUp: true, // 是否开启上拉加载
  firstDownLoad: false, // 是否第一次加载
  pullDownLoadTip: '', // 下拉刷新的提示
  pullUpLoadTip: '', // 上拉加载提示
  pullUpMoreTip: '上拉加载更多', // 上拉加载更多
  pullUpEndTip: '', // 上拉加载结束提示  没有更多数据了
  isNoData: true, // 是否允许显示没有数据的提示
  list: [], // 数据列表  代表有数据，这个一定要返回，不然会报错
  noDataTip: '暂无数据', // 没有数据的提示
  noDataImg: defaultNoDataBg, // 没有数据的图片
  isBtn: false, // 交易记录 充值显示立即充值btn
})

const emit = defineEmits(['update:modelValue', 'init'])
const { goTo } = useBackRouter()
const { openLoading, closeLoading } = useLoading()

BScroll.use(ObserveDOM).use(PullDown).use(Pullup)
let bs: any = null

interface Props {
  style?: string
  threshold?: number
  modelValue?: any
  pullDown?: boolean
  pullUp?: boolean
  firstDownLoad?: boolean
  pullDownLoadTip?: string
  pullUpLoadTip?: string
  pullUpMoreTip?: string
  pullUpEndTip?: string
  isNoData?: boolean
  list: any
  noDataTip?: string
  noDataImg?: any
  isBtn?: boolean

}
// init 返回给当前组建 noPass: true 代表请求失败，不会自动+1；
const { threshold, firstDownLoad, pullDown, pullUp, pullUpMoreTip, pullUpEndTip } = props

let pageCount: number = props.modelValue.page ?? 1
const bsRef = ref(null)
const downLoading = ref(false)
const upLoading = ref(false)
const pullEndTip = ref('')
const isFirst = ref(false) // 是否第一次加载
const { openPop } = usePop()
const { userInfo } = storeToRefs(useUserInfoStore())

const goToRecharge = () => {
  if (userInfo.value.real_name === '')
    openPop()

  else
    goTo('/my/recharge')
}
const pullingDownHandler = (mainResolve: any = null) => {
  if (!pullDown)
    return bs.finishPullDown()

  downLoading.value = true
  openLoading()

  new Promise((resolve) => {
    const { modelValue } = props
    pageCount = 1
    emit('update:modelValue', { ...modelValue, page: pageCount })
    emit('init', resolve, 'down')
  }).then((res: any) => {
    const { modelValue } = props
    const { noPass = false } = res // true: 加载失败，false: 加载成功
    if (!noPass && props.list.length) {
      isFirst.value = true
      pullEndTip.value = pullUpMoreTip

      if ((pageCount * modelValue.size) >= modelValue.total)
        pullEndTip.value = pullUpEndTip
    }
    else {
      pullEndTip.value = ''
    }

    downLoading.value = false
    closeLoading()

    bs.finishPullDown()
    bs.refresh()
    mainResolve && mainResolve()
  }).catch((er) => {
    downLoading.value = false
    closeLoading()

    bs.finishPullDown()
    bs.refresh()
    mainResolve && mainResolve()
  })
}

const pullingUpHandler = (mainResolve: any = null) => {
  if (!isFirst.value) {
    bs.finishPullUp()
    return
  }
  const { modelValue } = props
  if ((pageCount * modelValue.size) >= modelValue.total) {
    upLoading.value = false
    closeLoading()
    bs.finishPullUp()
    return
  }
  else {
    pullEndTip.value = pullUpMoreTip
  }

  upLoading.value = true
  openLoading()

  new Promise((resolve) => {
    const { modelValue } = props
    pageCount = pageCount + 1
    emit('update:modelValue', { ...modelValue, page: pageCount })
    emit('init', resolve, 'up')
  }).then((res: any) => {
    const { modelValue } = props
    const { noPass = false } = res // true: 加载失败，false: 加载成功
    if (noPass && pageCount > 1) {
      pageCount = pageCount - 1
      emit('update:modelValue', { ...modelValue, page: pageCount })
    }
    if (!noPass && (pageCount * modelValue.size) >= modelValue.total)
      pullEndTip.value = pullUpEndTip

    upLoading.value = false
    closeLoading()

    bs.finishPullUp()
    bs.refresh()
    mainResolve && mainResolve()
  }).catch((er) => {
    const { modelValue } = props
    if (pageCount > 1) {
      pageCount = pageCount - 1
      emit('update:modelValue', { ...modelValue, page: pageCount })
    }
    upLoading.value = false
    closeLoading()

    bs.finishPullUp()
    bs.refresh()
    mainResolve && mainResolve()
  })
}

onMounted(() => {
  bs = new BScroll('.bScrollWarp', {
    click: true,
    observeDOM: true, // 开启 observe-dom 插件
    pullDownRefresh: (pullDown
      ? {
          threshold,
        }
      : {
          threshold: 0,
        }),
    pullUpLoad: (pullUp
      ? {
          threshold: -threshold,
        }
      : {
          threshold: 0,
        }),
  })

  bs.on('pullingDown', pullingDownHandler)
  if (pullUp)
    bs.on('pullingUp', pullingUpHandler)

  if (firstDownLoad)
    pullingDownHandler()
})

defineExpose({
  down: pullingDownHandler,
  pull: pullingUpHandler,
})
</script>

<template>
  <div ref="bsRef" class="bScrollWarp">
    <div class="bScrollMain" :style="style">
      <div v-show="downLoading" class="bScrollPullDown">
        <slot name="bSDownLoad">
          <div class="pullDownTip">
            {{ pullDownLoadTip }}
          </div>
        </slot>
      </div>
      <div class="bScrollContent">
        <slot name="bSContent" />
        <div v-if="isNoData && !list.length" class="bScrollNoData">
          <div class="bScrollNoDataImg">
            <slot name="noDataImg">
              <BgImage :image="noDataImg" />
            </slot>
          </div>
          <slot name="noDataTip">
            <p class="bScrollNoDataTip">
              {{ noDataTip }}
            </p>
          </slot>
        </div>
      </div>
      <div v-if="isBtn && !list.length" class="go_btn">
        <slot name="BtnClick">
          <van-button class="customizeConfirm" @click="goToRecharge">
            立即充值
          </van-button>
        </slot>
      </div>
      <div v-if="pullUp" class="bScrollPullUp">
        <template v-if="upLoading">
          <slot name="bSUpLoad">
            <div class="pullUpTip">
              {{ pullUpLoadTip }}
            </div>
          </slot>
        </template>
        <template v-else>
          <slot name="bSUpLoadEnd">
            <div class="pullUpTip">
              {{ pullEndTip }}
            </div>
          </slot>
        </template>
      </div>
      
      <slot name="bSAtLast" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bScrollWarp {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .bScrollMain {
    width: 100%;

    .bScrollPullDown {
      width: 100%;
      display: flex;
      justify-content: center;

      .pullDownTip {
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #A5A9B3;
      }
    }

    .bScrollContent {
      width: 100%;

      .bScrollNoData {
        width: 100%;
        padding-top: 91px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .bScrollNoDataImg {
          width: 155px;
          height: 148px;
          img{
            width: 155px;
            height: 148px;
          }
        }

        .bScrollNoDataTip {
          width: 100%;
          padding-top: 31px;
          line-height: 18px;
          text-align: center;
          color: #A5A9B3;
          font-size: 13px;
        }
      }
    }
    .go_btn{
      padding: 33px  18px;
      .customizeConfirm{
        height: 47px;
        background: #597EF7;
        border-radius: 5px;
      }
    }
    .bScrollPullUp {
      width: 100%;
      min-height: 40px;
      display: flex;
      justify-content: center;

      .pullUpTip {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #A5A9B3;
      }
    }
  }
}
</style>
