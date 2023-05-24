<script lang="ts" setup>
// component
import OnlinePay from './components/onlinePay.vue' // 线上支付
import OfflinePay from './components/offlinePay.vue' // 线下支付
import BankCardPay from './components/bankCardPay.vue' // 银行卡支付
import Header from '~/components/Header.vue'
import bgImage from '~/components/bgImage.vue'

// 背景图
import bgSrc1 from '~/assets/images/my/ask.png?preset=full'
import bgSrc2 from '~/assets/images/my/active.png?preset=full'
import bgSrc3 from '~/assets/images/my/accountManage/wx.png?preset=full'
import bgSrc4 from '~/assets/images/my/accountManage/three.png?preset=full'
import bgSrc5 from '~/assets/images/my/accountManage/zfb.png?preset=full'
import bgSrc6 from '~/assets/images/my/accountManage/usdt.png?preset=full'
// import bgSrc7 from '~/assets/images/my/accountManage/three.png?preset=full'
import bgSrc8 from '~/assets/images/my/accountManage/cup.png?preset=full'
import bgSrc9 from '~/assets/images/my/accountManage/qq.png?preset=full'
import bgSrc10 from '~/assets/images/my/accountManage/up.png?preset=full'
import useRouterBack from '~/hooks/routerBackHooks'

const activeBgImg = `url(${getSupportImage(bgSrc2)})`
const { goTo } = useRouterBack()
const selectPayList: any = ref([])
const selectChannel: any = ref([])
// loading 引入
const { openLoading, closeLoading } = useLoading()
const record: any = ref({
  factory_id: '',
})
const params = ref({
  id: '', // 支付id
  channelId: '',
  icon: '',
  name: '',
})

const onAisle = (item: any, payId?: string) => {
  if (payId)
    params.value.id = payId

  params.value.channelId = item.id ?? ''
  params.value.name = item.name ?? ''
  record.value = item
  // 16  银行卡转账 21 支付宝转银行卡 22 微信转银行卡
  if (item.id === '16') {
  //  弹窗提醒
    financePopup('deposit', item.id ?? '')
  }
}

const initGetChannels = (payId: string) => {
  if (['', null, undefined].includes(payId))
    return
  getChannelsRequest(payId).then((res: any) => {
    if (res.status) {
      selectChannel.value = res.data ?? []
      if (selectChannel.value.length > 0)
        onAisle(selectChannel.value[0], payId)
    }
  })
}

const onSelect = (item: any) => {
  const _id = item.value ?? ''
  params.value.icon = item.icon
  if (![undefined, null, ''].includes(_id))
    initGetChannels(_id)
}

const init = () => {
  openLoading()
  getPayTypesRequest().then((res: any) => {
    let list: any = []
    if (res.status) {
      closeLoading()
      list = res.data ?? []
      list.forEach((item: any) => {
        item.value = item[0] ?? '' // 【'1'=微信、'2'=支付宝】【'45'=银行卡】【'25'=数字货币🪙】
        item.label = item[1] ?? ''
        switch (item.value) {
          case '1':
            item.icon = bgSrc3
            break
          case '2':
            item.icon = bgSrc5
            break
          case '3':
            item.icon = bgSrc8
            break
          case '8':
            item.icon = bgSrc9
            break
          case '45':
            item.icon = bgSrc4
            break
          case '25':
            item.icon = bgSrc6
            break
          case '51':
            item.icon = bgSrc10
            break
          default:
            item.icon = bgSrc4
            break
        }
      })
    }
    const _id = list[0].value ?? ''
    selectPayList.value = list
    if (![undefined, null, ''].includes(_id))
      initGetChannels(_id)
  })
}

init()
</script>

<template>
  <div class="myWarp">
    <Header title="充值">
      <template #headRight>
        <div class="tutorial" @click=" goTo('recharge/tutorial', { channelId: params.channelId })">
          教程
          <bgImage :image="bgSrc1" />
        </div>
      </template>
    </Header>
    <div class="payMethodWarp">
      <p class="title">
        支付方式
      </p>
      <ol grid grid-cols-4 gap-7px>
        <li
          v-for="(item, index) in selectPayList" :key="index" :class="{ active: item.value === params.id }"
          @click="onSelect(item)"
        >
          <bgImage :image="item.icon" />
          <p>{{ item.label }}</p>
        </li>
      </ol>
    </div>

    <div v-if="selectChannel.length > 1" class="methodWarp">
      <p class="title">
        充值通道
      </p>
      <ol grid grid-cols-3 gap-x-19px gap-y-15px>
        <li
          v-for="(item, index) in selectChannel" :key="index" class="li3" :class="{ active: item.id === params.channelId }"
          @click="onAisle(item)"
        >
          {{ item.name }}
        </li>
      </ol>
    </div>

    <div v-if="['45'].includes(params.id) || (['1', '2'].includes(params.id) && ['9'].includes(record.factory_id))" class="implementWarp">
      <BankCardPay :record="{ ...record, payId: params.id, channelId: params.channelId }" />
    </div>
    <div v-else-if="['1', '2'].includes(params.id)" class="implementWarp">
      <OnlinePay :record="{ ...record, payId: params.id, channelId: params.channelId }" />
    </div>
    <div v-else-if="['25'].includes(params.id)" class="implementWarp">
      <OfflinePay :record="{ ...record, payId: params.id, channelId: params.channelId }" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.myWarp {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  color: #000000;
  background: #F5F5F9;

  .tutorial {
    font-size: 11px;
    line-height: 15px;
    height: 15px;
    display: flex;
    align-items: center;

   img{
      width: 10px;
      height: 10px;
      margin-left: 5px;
    }
  }

  .payMethodWarp {
    margin-top: 10px;
    width: 100%;
    background-color: #fff;
    padding: 0 18px;
    border-bottom:10px solid #f8f8f8;
    .title {
      width: 100%;
      height: 36px;
      font-weight: 800;
      color: #414656;
      display: flex;
      align-items: center;
    }

    ol {
      width: 100%;
      padding-bottom: 10px;

      li {
        width: 79px;
        height: 71px;
        border-radius: 6px;
        border: 1px solid #F1F1F1;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

       img{
          width: 25px;
          height: 25px;
          margin-top: 12px;
        }

        p {
          width: 100%;
          margin-top: 2px;
          font-size: 10px;
          line-height: 14px;
          text-align: center;
        }

        &.active {
          overflow: hidden;
          border: 1px solid #4080FF;

          &::after {
            content: ' ';
            width: 18px;
            height: 16px;
            position: absolute;
            right: -1px;
            bottom: -1px;
            background-image: v-bind(activeBgImg);
            background-size: 100%;
            background-repeat: no-repeat;
            background-position: center;
          }
        }
      }
    }
  }

  .methodWarp {
      width: 100%;
      padding: 0 18px;
      background: #fff;
      margin-top: 10px;

      .title {
        width: 100%;
        height: 36px;
        font-weight: 800;
        color: #414656;
        display: flex;
        align-items: center;
      }

      ol {
        width: 100%;
        padding: 5px 0;

        li {
          border-radius: 6px;
          border: 1px solid #979797;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;

          &.li3 {
            width: 100px;
            height: 30px;
          }

          &.li4 {
            width: 69px;
            height: 30px;
          }

          p {
            width: 100%;
            font-size: 10px;
            line-height: 14px;
            text-align: center;
          }

          &.active {
            border: 1px solid #4080FF;

            &::after {
              content: ' ';
              width: 18px;
              height: 16px;
              position: absolute;
              right: -1px;
              bottom: -1px;
              background-image: v-bind(activeBgImg);
              background-size: 100%;
              background-repeat: no-repeat;
              background-position: center;
            }
          }
        }
      }
    }

  .implementWarp {
    width: 100%;
  }
}
</style>
