<script lang="ts" setup>
// utils
import { } from '~/utils/validate'
import { Toast } from 'vant'
// components
import InputErr from '~/components/customizeInputErr.vue'
import CustomizeInput from '~/components/customizeInput.vue'
import CustomizeSelect from '~/components/customizeSelect.vue'

const selectList = ref([])

const record = ref({
  currency: '',
  rate: '',
  fmax: '0',
  fmin: '0',
})
const verifyTip = ref({
  bid: '',
  amount: '',
  password: '',
})
const params = ref({
  bid: '',
  ty: '2',
  amount: '',
  password: '',
})

const disabled = computed(() => {
  return !(Object.values(params.value).every(item => item) && Object.values(verifyTip.value).every(item => !item))
})

const loading = ref(false)

const omSelect = (val: any, lab: any, idx: any, item: any) => {
  record.value.currency = item.currency

  const typeObj: any = {
    gopay: '17',
    okpay: '19',
    usdt: '20',
    topay: '23',
  }
  const typeValue = typeObj[record.value.currency.toLowerCase()] ?? ''
  financeWithdrawRangeRequest({ t: typeValue }).then((res: any) => {
    console.log('status1', res?.status)
    if (res?.status) {
      record.value.fmax = res.data.fmax ?? '0'
      record.value.fmin = res.data.fmin ?? '0'
      console.log(res, '<<<<<+=========222', record.value.currency)
    }
  })
}

const verifyParams = (newVal: any, name: string) => {
  switch (name) {
    case 'bid':
      if (newVal === '' || newVal === undefined || newVal === null)
        verifyTip.value[name] = '请选择提现账户'
      else
        verifyTip.value[name] = ''

      break
    case 'amount':
      if (newVal === '' || newVal === undefined || newVal === null)
        verifyTip.value[name] = '提现金额不能为空'
      else if (Number(newVal) < Number(record.value.fmin) || Number(newVal) > Number(record.value.fmax))
        verifyTip.value[name] = `提现金额必须在${record.value.fmin}与${record.value.fmax}之间`
      else
        verifyTip.value[name] = ''

      break

    case 'password':
      if (newVal === '' || newVal === undefined || newVal === null)
        verifyTip.value[name] = '安全密码不能为空'
      else if (!isPhoneVirtualCode(newVal))
        verifyTip.value[name] = '安全密码格式不正确'
      else
        verifyTip.value[name] = ''

      break
    default:
      console.log('没有这个参数,我的哥~')
      break
  }
}

const getRate = () => {
  financeWithdrawRateRequest().then((res: any) => {
    if (res.status)
      record.value.rate = res.data ?? ''
  })
}

const submit = () => {
  if (Number(params.value.amount) < Number(record.value.fmin) || Number(params.value.amount) > Number(record.value.fmax))
    return Toast(`提现金额必须在${record.value.fmin}与${record.value.fmax}之间`)

  loading.value = true

  financeWithdrawRequest({
    ...params.value,
    rate: record.value.rate,
  }).then((res) => {
    if (res.status) {
      if (res.status === true)
        Toast('提现申请提交成功，请在3-5分钟后查询是否到账')
    }
    params.value.password = ''
    params.value.amount = ''
    console.log(res, '-----------')
  }).finally(() => {
    loading.value = false
    getRate()
  })
}

const init = () => {
  getDigitalListRequest().then((res: any) => {
    if (res.status && res.data?.length) {
      const list = res.data ?? []
      list.map((item: any) => {
        item.value = item.id
        item.label = `${item.wallet_alias}-${item.currency}`
        return item
      })
      selectList.value = list
      params.value.bid = list[0]?.value ?? ''
      record.value.currency = list[0]?.currency ?? ''

      const typeObj: any = {
        gopay: '17',
        okpay: '19',
        usdt: '20',
        topay: '23',
      }
      const typeValue = typeObj[record.value.currency.toLowerCase()] ?? ''
      financeWithdrawRangeRequest({ t: typeValue }).then((res: any) => {
        if (res?.status) {
          record.value.fmax = res.data.fmax ?? '0'
          record.value.fmin = res.data.fmin ?? '0'
        }
      })
    }
  })

  financeWithdrawRateRequest().then((res: any) => {
    if (res.status)
      record.value.rate = res.data ?? ''
  })
}
init()
</script>

<template>
  <div class="bankCardWithdrawWarp">
    <div class="bankCardWithdrawMain">
      <ol>
        <li>
          <div class="label">
            提现账户：
          </div>
          <div class="content w_with">
            <InputErr :err="verifyTip.bid">
              <template #errInput>
                <CustomizeSelect
                  v-model="params.bid"
                  :list="selectList"
                  color="#000000"
                  placeholder="请选择提现账户"
                  @confirm="omSelect"
                />
              </template>
            </InputErr>
          </div>
        </li>

        <li v-show="['USDT'].includes(record.currency)">
          <div class="label">
            提现汇率：
          </div>
          <div class="content">
            {{ reserveDecimal(record.rate) }}
          </div>
        </li>

        <li v-show="['USDT'].includes(record.currency)">
          <div class="label">
            货币数量：
          </div>
          <div class="content red_color">
            {{ Number(reserveDecimal(Number(params.amount) / Number(record.rate))) > 0 ? reserveDecimal(Number(params.amount) / Number(record.rate)) : 0 }}
          </div>
        </li>
        <li>
          <div class="label">
            提现金额：
          </div>
          <div class="content">
            <InputErr :err="verifyTip.amount">
              <template #errInput>
                <CustomizeInput
                  v-model="params.amount"
                  :maxlength="9"
                  input-type="number"
                  color="#000000"
                  placeholder="请输入您要提现的整数金额"
                  :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'amount'); callback(); }"
                  :on-blur="(newVal: any) => { verifyParams(newVal, 'amount') }"
                />
              </template>
            </InputErr>
          </div>
        </li>
        <li>
          <div class="label">
            安全密码：
          </div>
          <div class="content">
            <InputErr :err="verifyTip.password">
              <template #errInput>
                <CustomizeInput
                  v-model="params.password"
                  :maxlength="6"
                  input-type="password"
                  :eye="true"
                  color="#000000"
                  placeholder="请输入安全密码"
                  :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'password'); callback(); }"
                  :on-blur="(newVal: any) => { verifyParams(newVal, 'password') }"
                />
              </template>
            </InputErr>
          </div>
        </li>
      </ol>
    </div>
    <div class="footWarp">
      <van-button
        class="customizeConfirm" :disabled="disabled" :loading="loading" loading-type="spinner"
        loading-text="加载中..." @click="submit()"
      >
        立即提现
      </van-button>
      <div class="tips">
        提现如遇到任何问题，请联系<Sc />。
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.z_label){
  font-size: 11px !important;
font-weight: 400 !important;
color: #6D839A !important;
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
          display: flex;
          align-items: center;
        }
        .w_with {
          :deep(.customizeSelectBtnValue) {
            width: 100% !important;
          }}
        .red_color{
        color: #FF0000;
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
