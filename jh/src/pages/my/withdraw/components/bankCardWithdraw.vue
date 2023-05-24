<script lang="ts" setup>
// utils
import { } from '~/utils/validate'
// components
import { Toast } from 'vant'
import InputErr from '~/components/customizeInputErr.vue'
import CustomizeInput from '~/components/customizeInput.vue'
import CustomizeSelect from '~/components/customizeSelect.vue'
const selectList = ref([])

const loading = ref(false)

const record = ref({
  fmax: '0',
  fmin: '0',
})

const params = ref({
  bid: '',
  ty: '1',
  amount: '',
  password: '',
})

const verifyTip = ref({
  bid: '',
  amount: '',
  password: '',
})

const disabled = computed(() => {
  return !(Object.values(params.value).every(item => item) && Object.values(verifyTip.value).every(item => !item))
})

const bankName = (id: string) => {
  const bankList = storeToRefs(useAppStore()).bankList.value ?? []
  const bank = bankList.filter((item: any) => item.value === Number(id))
  if (bank.length)
    return bank[0].label
  else
    return ''
}
const visibit = ref(false)
const verifyParams = (newVal: any, name: string) => {
  switch (name) {
    case 'bid':
      if (newVal === '' || newVal === undefined || newVal === null)
        verifyTip.value[name] = '请选择提现账户'
      else
        verifyTip.value[name] = ''

      break
    case 'amount':
      if (Number(newVal) < Number(record.value.fmin) || Number(newVal) > Number(record.value.fmax))
        visibit.value = true

      else visibit.value = false

      if (newVal === '' || newVal === undefined || newVal === null) {
        verifyTip.value[name] = '提现金额不能为空'
        visibit.value = false
      }

      else {
        verifyTip.value[name] = ''
      }

      break

    case 'password':
      if (newVal === '' || newVal === undefined || newVal === null)
        verifyTip.value[name] = '安全密码不能为空'

      else if (!isPhoneVirtualCode(newVal))
        verifyTip.value[name] = '安全密码格式不正确'
      else verifyTip.value[name] = ''

      break
    default:
      console.log('没有这个参数,我的哥~')
      break
  }
}

const submit = () => {
  loading.value = true

  financeWithdrawRequest({
    ...params.value,
  }).then((res) => {
    if (res.status) {
      if (res.status === true)
        Toast('提现申请提交成功，请在3-5分钟后查询是否到账')
    }
    params.value.password = ''
    params.value.amount = ''
  }).finally(() => {
    loading.value = false
  })
}

const getUserBankList = () => {
  getMyBankListRequest().then((res: any) => {
    if (res.status) {
      const list = res.data ?? []
      list.map((item: any) => {
        item.value = item.id
        item.label = `${bankName(item.bank_id)} ${item.bank_card}`
        return item
      })
      selectList.value = list
      params.value.bid = list[0].value ?? ''
    }
  })

  financeWithdrawRangeRequest({ t: '15' }).then((res: any) => {
    if (res.status)
      record.value.fmax = res.data.fmax ?? '0'
    record.value.fmin = res.data.fmin ?? '0'
  })
}
getUserBankList()
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
                />
              </template>
            </InputErr>
          </div>
        </li>
        <li>
          <div class="label">
            提现金额：
          </div>
          <div class="content">
            <div class="add_err">
              <div v-show="visibit" class="amount_err" v-html="`提现金额必须在${record.fmin}与${record.fmax}之间`" />
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
                  autocomplete="new-password"
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
        loading-text="提现中..." @click="submit()"
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
          .amount_err{
            bottom: -20px;
          }
        }
        .w_with {
          :deep(.customizeSelectBtnValue) {
            width: 100% !important;
          }}
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
