<script lang="ts" setup>
import { Toast } from 'vant'
import useRouterBack from '~/hooks/routerBackHooks'
import amountHooks from '~/hooks/amountHooks'
// component
import Header from '~/components/Header.vue'
import bgImage from '~/components/bgImage.vue'
import InputErr from '~/components/customizeInputErr.vue'
import CustomizeInput from '~/components/customizeInput.vue'
// 背景图
import bgSrc3 from '~/assets/images/my/toRight.png?preset=full'
import bgSrc2 from '~/assets/images/my/active.png?preset=full'
const activeBgImg = `url(${getSupportImage(bgSrc2)})`
const { goTo } = useRouterBack()
const amountList = [100, 500, 1000, 5000, 10000, 50000]
const { totalAmount } = amountHooks()
const route = useRoute()

// 1:转出余额宝 2:转入余额宝
const config = computed(() => route.query.type === '1' ? { title: '转出余额宝', moneyText: '可转出金额', inputTitle: '转出金额', placeText: '请输入转出金额', btnText: '确认转出' } : { title: '转入余额宝', moneyText: '可转入金额', placeText: '请输入转入金额', inputTitle: '转入金额', btnText: '确认转入' })
const { venueTransfer, loading, centerAmount } = amountHooks()
const amount: any = ref(null)
const params = ref({
  password: '',
})
const verifyTip = ref({
  amount: '',
  password: '',
})

const visibit = ref(false)

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
    case 'password':
      if (newVal === '' || newVal === undefined || newVal === null)
        verifyTip.value[name] = '安全密码不能为空'

      else if (!isPhoneVirtualCode(newVal))
        verifyTip.value[name] = '安全密码格式不正确'
      else verifyTip.value[name] = ''

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

const onSelectAmount = (val: number) => {
  amount.value = val
}
// 点击全部金额
const onMaxAmount = () => {
  amount.value = reserveDecimal(centerAmount.value)
}
const disabled = computed(() => {
  if (['', null, undefined].includes(amount.value))
    return true

  if (['', null, undefined].includes(params.value.password))
    return true

  // if (venueWalletLeft.value === venueWalletList.value[0].value) {
  //   // 代表中心钱包
  //   if (Number(amount.value) > Number(centerAmount.value))
  //     return true
  // }
  // else {
  //   const pid = venueWalletLeft.value
  //   const itemWallet = venueWallet.value.filter((item: any) => item.wallet_id === pid)[0] ?? {}
  //   const nowAmount = itemWallet.amount ?? 0

  if (Number(amount.value) > Number(centerAmount.value))
    return true
  // }
})

const submit = () => {
  const ty = 1
  const pid = ''
  // if (venueWalletLeft.value === venueWalletList.value[0].value) {
  //   // 代表中心钱包
  //   ty = 1
  //   pid = venueWalletRight.value
  // }
  // else {
  //   ty = 2
  //   pid = venueWalletLeft.value
  // }

  const nowAmount: any = 0
  // if (ty === 1) {
  //   nowAmount = centerAmount.value
  // }
  // else {
  //   const itemWallet = venueWallet.value.filter((item: any) => item.wallet_id === pid)[0] ?? {}
  //   nowAmount = itemWallet.amount ?? 0
  // }

  if (Number(nowAmount) < Number(amount.value))
    return Toast('转账金额不能大于转出账户余额')

  venueTransfer(pid, ty, amount.value, () => {
    if (ty === 1)
      Toast('转入成功')

    else
      Toast('场馆转出成功')
  })
  params.value.password = ''
  amount.value = ''
}
</script>

<template>
  <div class="myWarp">
    <Header :title="config.title">
      <template #headRight>
        <div class="tutorial" @click="goTo('/my/balance-yu/balance-record')">
          余额宝记录
        </div>
      </template>
    </Header>
    <div class="implementWarp">
      <div class="topvenue_turn">
        <div v-show="route.query.type === '2'" class="venueWarp ">
          <div class="turn_money flex fdr-c">
            <p> 中心钱包余额</p>
            <p>￥{{ reserveDecimal(totalAmount) }}</p>
          </div>
          <bgImage :image="bgSrc3" class="venueArrow" />
          <div class="turn_money flex fdr-c">
            <p> 余额宝余额</p>
            <p>￥9,999,999.00</p>
          </div>
        </div>
        <div v-show="route.query.type === '1'" class="venueWarp ">
          <div class="turn_money flex fdr-c">
            <p> 余额宝余额</p>
            <p>￥9,999,999.00</p>
          </div>
          <bgImage :image="bgSrc3" class="venueArrow" />
          <div class="turn_money flex fdr-c">
            <p> 中心钱包余额</p>
            <p>￥{{ reserveDecimal(totalAmount) }}</p>
          </div>
        </div>
        <div class="turn_can">
          {{ config.moneyText }}：<span> ￥{{ reserveDecimal(totalAmount) }}</span>
        </div>
      </div>
      <div class="add_err">
        <div class="turn_num flex ai-c jc-sb">
          <p>{{ config.inputTitle }}</p>
        </div>
        <div v-show="visibit" class="amount_err">
          转账金额不能大于转出账户余额
        </div>
        <div class="amountInputWarp">
          <CustomizeInput
            v-model="amount" color="#000000" input-type="amount1" :placeholder="config.placeText"
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
      <div class="amountWarp">
        <ol>
          <li v-for="(item, index) in amountList" :key="index">
            <div class="amountBtn" :class="Number(amount ?? 0) === item ? 'active' : ''" @click="onSelectAmount(item)">
              <span>¥</span>{{ item }}
            </div>
          </li>
        </ol>
      </div>
    </div>
    <div class="bankCardWithdrawWarp">
      <div class="bankCardWithdrawMain">
        <ol>
          <li>
            <div class="label">
              安全密码：
            </div>
            <div class="content">
              <InputErr :err="verifyTip.password">
                <template #errInput>
                  <CustomizeInput
                    v-model="params.password" autocomplete="new-password" :maxlength="6"
                    input-type="password" :eye="true" color="#000000" placeholder="请输入安全密码"
                    :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'password'); callback(); }"
                    :on-blur="(newVal: any) => { verifyParams(newVal, 'password') }"
                  />
                </template>
              </InputErr>
            </div>
          </li>
        </ol>
      </div>
    </div>
    <div class="footWarp">
      <van-button
        class="customizeConfirm" :disabled="disabled" :loading="loading" loading-type="spinner"
        loading-text="加载中..." @click="submit()"
      >
        {{ config.btnText }}
      </van-button>
      <p v-show="route.query.type === '1'">
        温馨提示：余额宝支持直接提现，<span @click="goTo('/my/withdraw')">去提现</span>。
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add_err {
  border-bottom: 1px solid #F1F1F1;
  margin: 15px 18px 0 18px;

}

.myWarp {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  color: #000000;
  background: #F5F5F9;

  .implementWarp {
    width: 100%;
    margin-top: 10px;
    background-color: #fff;

    .topvenue_turn {
      border-bottom: 10px solid #F5F5F9;
      padding-bottom: 10px;

      .turn_can {
        padding-top: 8px;
        font-size: 12px;
        font-weight: 400;
        color: #515151;
        text-align: center;

        span {
          color: #4080FF;
        }
      }
    }

    .venueWarp {
      width: 100%;
      height: 71px;
      border-bottom: 1px solid #FAFAFA;
      display: flex;
      align-items: center;
      justify-content: center;

      .turn_money {
        text-align: center;
        p {
          font-size: 13px;
          font-weight: 400;
          color: #515151;
        }

        p:last-child {
          font-size: 12px;
          font-weight: 400;
          color: #4080FF;
          margin-top: 4px;
          line-height: 19px;
        }
      }

      .venueArrow {
        width: 41px;
        height: 21px;
        margin: 0 35px;
      }
    }

    .amountWarp {
      width: 100%;
      padding-top: 17px;
      padding-bottom: 10px;

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
      padding: 17px 0px 0 0px;
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
      span{
        color: #4F73F6;
      }
    }
  }
}

.bankCardWithdrawWarp {
  width: 100%;

  .bankCardWithdrawMain {
    width: 100%;
    padding: 0 24px 10px 24px;
    background-color: #fff;

    ol {
      width: 100%;

      li {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;

        .label {
          width: 70px;
          font-size: 11px;
          color: #000000;
          line-height: 11px;
        }

        .content {
          flex: 1;
          width: 100%;
          height: 30px;

          .amount_err {
            bottom: -20px;
          }
        }
      }
    }
  }

  .footWarp {
    width: 100%;
    padding: 25px 18px;
  }

  .tips {
    width: 100%;
    min-height: 20px;
    font-size: 14px;
    color: #848484;
    line-height: 20px;
    margin-top: 15px;
    text-align: center;
  }
}
</style>
