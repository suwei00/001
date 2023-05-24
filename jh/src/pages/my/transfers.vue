<script lang="ts" setup>
import { Toast } from 'vant'
import AmountExhibit from './components/amountExhibit.vue'
import amountHooks from '~/hooks/amountHooks'
// component
import Header from '~/components/Header.vue'
import bgImage from '~/components/bgImage.vue'
import Sc from '~/components/sc.vue'
import CustomizeInput from '~/components/customizeInput.vue'
import CustomizeSelect from '~/components/customizeSelect.vue'

// 背景图
// import bgSrc1 from '~/assets/images/my/ask.png?preset=full'
import bgSrc2 from '~/assets/images/my/active.png?preset=full'
import bgSrc3 from '~/assets/images/my/toRight.png?preset=full'

const { oneClickTrunLoadingClose, oneClickTrunLoadingOpen } = useUserInfoStore()
const { sadfasfNum } = storeToRefs(useUserInfoStore())
const router = useRouter()
const activeBgImg = `url(${getSupportImage(bgSrc2)})`
const isChecked = ref(false)
const amountList = [100, 500, 1000, 2000, 5000]

const { venueWallet, venueTransfer, loading, centerAmount } = amountHooks()
const venueWalletList = computed(() => {
  let list = [
    {
      label: '中心钱包',
      value: '99999999',
      wallet_id: '99999999',
    },
  ]
  list = [...list, ...venueWallet.value]

  return list.map((item: any) => {
    return {
      ...item,
      label: item.label,
      value: item.wallet_id,
    }
  })
})

const venueWalletLeft = ref(venueWalletList.value.filter((item: any) => !item.maintain)[0].value)
const venueWalletRight = ref(venueWalletList.value.filter((item: any) => !item.maintain)[1].value)

const venueWalletListLeft = computed(() => {
  const value = venueWalletRight.value === '99999999' ? venueWalletRight.value : ''
  return venueWalletList.value.filter((item: any) => item.value !== value && !item.maintain)
})
const venueWalletListRight = computed(() => {
  const value = venueWalletLeft.value === '99999999' ? venueWalletLeft.value : ''
  return venueWalletList.value.filter((item: any) => item.value !== value && !item.maintain)
})

const amount: any = ref(null)
const verifyTip = ref({
  amount: '',
})
const visibit = ref(false)

// const goTutorial = () => {
//   console.log('教程')
// }

// 转账金额不能大于转出账户余额
const verifyParams = async (newVal: any, name: string) => {
  switch (name) {
    case 'amount':
      if (['', null, undefined].includes(newVal))
        verifyTip.value[name] = '转账金额不能为空'
      else if (Number(newVal) <= 0)
        verifyTip.value[name] = '转账金额不能为0'
      else verifyTip.value[name] = ''

      if (Number(newVal) > Number(centerAmount.value) && Number(newVal) !== 0)
        visibit.value = true
      else
        visibit.value = false

      break
  }
}

const verifyParamsBlur = async (newVal: any, name: string) => {
  switch (name) {
    case 'amount':
      verifyTip.value[name] = ''
      visibit.value = false
      break
  }
}

const onSelectAmountLeft = (value: any) => {
  if (value !== venueWalletList.value[0].value && venueWalletRight.value !== venueWalletList.value[0].value)
    venueWalletRight.value = venueWalletList.value[0].value

  console.log(venueWalletLeft.value, venueWalletRight.value, 'onSelectAmountLeft')
}

const onSelectAmountRight = (value: any) => {
  if (value !== venueWalletList.value[0].value && venueWalletLeft.value !== venueWalletList.value[0].value)
    venueWalletLeft.value = venueWalletList.value[0].value

  console.log(venueWalletLeft.value, venueWalletRight.value, 'onSelectAmountRight')
}

const onSelectAmount = (val: number) => {
  amount.value = val
}
const onMaxAmount = () => {
  let crrAmount = '0'
  if (venueWalletLeft.value === venueWalletList.value[0].value)
    crrAmount = centerAmount.value

  else
    crrAmount = venueWallet.value.filter((item: any) => venueWalletLeft.value === item.wallet_id)[0].amount

  amount.value = reserveDecimal(crrAmount, false)
}
const disabled = computed(() => {
  if (['', null, undefined].includes(amount.value))
    return true

  if (venueWalletLeft.value === venueWalletList.value[0].value) {
    // 代表中心钱包
    if (Number(amount.value) > Number(centerAmount.value))
      return true
  }
  else {
    const pid = venueWalletLeft.value
    const itemWallet = venueWallet.value.filter((item: any) => item.wallet_id === pid)[0] ?? {}
    const nowAmount = itemWallet.amount ?? 0

    if (Number(amount.value) > Number(nowAmount))
      return true
  }
})

const submit = () => {
  let ty = 1
  let pid = ''
  if (venueWalletLeft.value === venueWalletList.value[0].value) {
    // 代表中心钱包
    ty = 1
    pid = venueWalletRight.value
  }
  else {
    ty = 2
    pid = venueWalletLeft.value
  }

  let nowAmount: any = 0
  if (ty === 1) {
    nowAmount = centerAmount.value
  }
  else {
    const itemWallet = venueWallet.value.filter((item: any) => item.wallet_id === pid)[0] ?? {}
    nowAmount = itemWallet.amount ?? 0
  }

  // console.log(pid, ty, amount.value, '<<<<++++>>>>>', venueWallet.value, '=======', nowAmount)

  if (Number(nowAmount) < Number(amount.value))
    return Toast('转账金额不能大于转出账户余额')

  venueTransfer(pid, ty, amount.value, () => {
    if (ty === 1)
      Toast('场馆转入成功')

    else
      Toast('场馆转出成功')
  })
  amount.value = ''
}

// 路由 router 离开
router.beforeEach((to, from, next) => {
  console.log(to.path, '========', from.path)
  if (to.path === '/my' && from.path === '/my/transfers') {
    oneClickTrunLoadingOpen()
    if (sadfasfNum.value)
      Toast('部分钱包回收失败，请稍后重试')
  }
  else if (to.path === '/my/transfers' && from.path === '/my') {
    oneClickTrunLoadingClose()
  }

  next()
})
const dialogs = ref({
  visible: false,
  content: '',
  title: '',

})
const changeSwitch = () => {
  if (isChecked.value) {
    dialogs.value = {
      visible: true,
      title: '温馨提示',
      content: '开启自动免转后，无需手动操作各个游戏钱包的金额！',
    }
    // Toast('自动免转已开启')
  }
  else {
    dialogs.value = {
      visible: true,
      title: '温馨提示',
      content: '关闭自动免转后，您将需要手动操作各个游戏钱包的金额，确定关闭自动免转？',
    }
    // Toast('自动免转已关闭')
  }
}
</script>

<template>
  <div class="myWarp">
    <CustomizeDialog v-model="dialogs.visible" :content="dialogs.content" :title="dialogs.title" @confirm="isChecked = !isChecked" />
    <Header title="转账" />
    <!-- <template #headRight>
        <div class="tutorial" @click="goTutorial()">
          教程
          <bgImage :image="bgSrc1" />
        </div>
      </template>
    </Header> -->
    <AmountExhibit :transfer-in="true" :is-on-put="!isChecked" />
    <!-- 自动免转 -->
    <div class="add_autoturn">
      <div class="auto_turn flex ai-c jc-sb">
        自动免转
        <van-switch
          :model-value="isChecked" size="25px" active-color="#4080FF" inactive-color="#E9E9EA"
          @change="changeSwitch"
        />
      </div>
    </div>

    <div v-show="!isChecked" class="implementWarp">
      <div class="venueWarp">
        <div>
          <CustomizeSelect
            v-model="venueWalletLeft" type="2" :list="venueWalletListLeft"
            @confirm="onSelectAmountLeft"
          />
        </div>
        <bgImage :image="bgSrc3" class="venueArrow" />
        <div>
          <CustomizeSelect
            v-model="venueWalletRight" type="2" :list="venueWalletListRight"
            :prohibit-select="venueWalletListRight.length < 1" prohibit-text="场馆钱包维护中" @confirm="onSelectAmountRight"
          />
        </div>
      </div>
      <div class="amountWarp">
        <p class="amountTip">
          场馆内钱包不支持互转
        </p>
        <ol>
          <li v-for="(item, index) in amountList" :key="index">
            <div class="amountBtn" :class="Number(amount ?? 0) === item ? 'active' : ''" @click="onSelectAmount(item)">
              <span>¥</span>{{ item }}
            </div>
          </li>
        </ol>
      </div>
      <div class="add_err">
        <div v-show="visibit" class="amount_err">
          转账金额不能大于转出账户余额
        </div>
        <div class="amountInputWarp">
          <CustomizeInput
            v-model="amount" color="#000000" input-type="amount1" placeholder="¥ 请输入转账金额"
            :on-focus="(oldVal: any) => { verifyParams(oldVal, 'amount') }"
            :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'amount'); callback(); }"
            :on-blur="(newVal: any) => { verifyParamsBlur(newVal, 'amount') }" @on-clear="verifyParams('', 'amount')"
          />

          <span @click="onMaxAmount()">全部金额</span>
        </div>
        <p class="amountInputErr">
          <span>{{ verifyTip.amount }}</span>
        </p>
      </div>
    </div>
    <div class="footWarp">
      <van-button
        v-show="!isChecked" class="customizeConfirm" :disabled="disabled" :loading="loading"
        loading-type="spinner" loading-text="加载中..." @click="submit()"
      >
        立即转账
      </van-button>
      <p>
        转账如遇到任何问题，请联系
        <Sc />。
      </p>
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

  .add_autoturn {
    background-color: #fff;
    padding: 0 18px;
    margin-top: 10px;

    .auto_turn {
      height: 43px;
      border-bottom: 1px solid #FAFAFA;
      font-size: 15px;
      font-weight: 400;
      color: #000000;
    }
  }

  .implementWarp {
    width: 100%;

    background-color: #fff;
    padding: 0 18px;

    .venueWarp {
      width: 100%;
      height: 71px;
      border-bottom: 1px solid #FAFAFA;
      display: flex;
      align-items: center;
      justify-content: center;

      .venueArrow {
        width: 41px;
        height: 21px;
        margin: 0 35px;
      }
    }

    .amountWarp {
      width: 100%;
      padding-bottom: 10px;
      border-bottom: 1px solid #F1F1F1;

      .amountTip {
        width: 100%;
        height: 24px;
        padding: 0 8px;
        margin-bottom: 12px;
        font-size: 10px;
        color: #7D7D7D;
        display: flex;
        align-items: center;
      }

      ol {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        li {
          width: 25%;
          margin-bottom: 10px;
          display: flex;
          justify-content: center;

          .amountBtn {
            width: 69px;
            height: 30px;
            border-radius: 6px;
            border: 1px solid #979797;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            line-height: 14px;
            position: relative;

            span {
              font-size: 11px;
              line-height: 11px;
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
    }

    .amountInputWarp {
      width: 100%;
      height: 48px;
      padding: 20px 8px 0 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        display: block;
        width: 80px;
        color: #414656;
        font-size: 15px;
        line-height: 15px;
        text-align: center;
      }
    }

    .amountInputErr {
      width: 100%;
      height: 20px;
      line-height: 20px;

      font-size: 9px;
      color: #FF0000;
    }
  }

  .footWarp {
    width: 100%;
    padding: 25px 18px;

    p {
      text-align: center;
      font-size: 14px;
      color: #848484;
      line-height: 20px;
      height: 20px;
      margin-top: 15px;
    }
  }
}
</style>
