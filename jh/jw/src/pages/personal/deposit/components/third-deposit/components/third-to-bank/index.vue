<script setup lang='ts' name="third-underline">
import { ElMessage } from 'element-plus'
// 支付宝转银行卡,微信转银行卡
import type { F } from 'ts-toolbelt'
import type { ArrElement } from '../../../../../../../api/type'
type itemProps = ArrElement<Awaited<F.Return<typeof getChannels>>>
interface Props {
  data: itemProps
}
const { data } = defineProps<Props>()
// 线下通道
const appStore = useAppStore()
const { data: info } = $(useRequest(() => getPayBank(data?.id)))
const min = $computed(() => info?.min ?? 0)
const max = $computed(() => info?.max ?? 0)
// 当前选中的快捷金额index
let amountIndex = $ref(-1)
const currentAmountList = $computed(() => {
  if (!data)
    return []
  return data.amount_list === '' ? [] : data.amount_list.split(',').map(item => ({ label: item, value: item }))
})

// 充值金额
const { errorMessage: amountErrMsg, value: amount, setValue: setAmount, setErrors: setAmountErrors } = $(useField<string>('amount', (value) => {
  if (!value || !value.trim())
    return '充值金额不能为空'
  if (!positiveNumberRegx.test(value))
    return '金额格式不对'
  if (+value < min || +value > max)
    return `充值金额必须在${min}-${max}之间`
  return true
}))
const chooseAmount = (m: string | number) => {
  setAmount(m.toString())
}
// 手动输入与固定金额联动
const inputHandler = (amount: string) => {
  setAmount(toFixAmount(amount))
  amountIndex = currentAmountList.findIndex(c => c.value === amount)
}

// 充值人姓名
const { errorMessage: nameErrMsg, value: name, setValue, setErrors: setNameErrors } = $(useField<string>('username', (value) => {
  if (!value || !value.trim())
    return '充值人姓名不能为空'
  return true
}))

// 失焦之后验证,清空错误信息
const handleBlurValidate = (type: string) => {
  switch (type) {
    case 'amount':
      if (!amount)
        setAmountErrors('')
      break
    case 'name':
      if (!name)
        setNameErrors('')
      break
    default:
      break
  }
}

// 银行卡充值
const { run, loading } = useRequest(() => financePayOffline({ amount, name, id: info?.id as string }), {
  manual: true,
  loadingKeep: 1000,
  debounceInterval: 300,
  onSuccess: () => {
    ElMessage.success('订单提交成功，我们将在5分钟内为您添加额度')
    amountIndex = -1
    setAmount('')
    setValue('')
    const t = setTimeout(() => {
      setAmountErrors('')
      setNameErrors('')
      clearTimeout(t)
    }, 0)
  },
})
// 禁用充值按钮
const disabled = $computed(() => {
  return !amount || !name || !!amountErrMsg || !!nameErrMsg
})

// 弹窗提醒
// financePopup('deposit', data?.id)
</script>

<template>
  <div class="third-underline">
    <div flex justify-between>
      <div>
        <div class="tip-title" data-number="1">
          <h4 class="subtitle">
            请转账到以下银行账户：
          </h4>
          <span>单笔最低 <span class="color-color-error">{{ info?.min }}</span> 元，最高 <span class="color-color-error">{{ info?.max }}</span> 元</span>
        </div>
        <bank-info :data="info" />
      </div>
      <div>
        <div class="instruction2-title">
          充值说明
        </div>
        <div class="instruction2" v-html="filterXSS(data.note ?? '')" />
      </div>
    </div>

    <div class="tip-title" data-number="2">
      <h4 class="subtitle">
        请认真填写您的转账信息：
      </h4>
      <span>请务必转账后再提交订单，否则无法及时查到您的款项！</span>
    </div>
    <div class="form !pt-0px">
      <div flex flex-col items-start ml-54px mt-20px>
        <h5 v-if="currentAmountList?.length > 0" mb-15px>
          {{ data.flags === 2 ? '固定金额' : '充值金额' }}
        </h5>
        <personal-tabs
          v-if="currentAmountList?.length > 0"
          key="currentAmountList" v-model="amountIndex" mb-15px
          :list="currentAmountList" class="tunnels"
        >
          <template #tab="{ item, active }">
            <div
              class="tunnel-item" :class="{ 'font-jl-font-bold color-color-primary-second': active }"
              w-146px h-60px leading-60px
              @click="chooseAmount(item.value)"
            >
              <span>￥{{ item.label }}</span>
            </div>
          </template>
        </personal-tabs>

        <div class="field-wrapper" flex>
          <div v-if="data.flags === 2" class="form-item" mr-32px>
            <label text-15px>充值金额：</label>
            <el-input
              v-model.trim="amount"
              :placeholder="`请输入充值金额${min}-${max}`"
              style="width:312.5px"
              @input="inputHandler"
              @blur="handleBlurValidate('amount')"
            >
              <template #suffix>
                <span style="color:#333">元</span>
              </template>
            </el-input>
            <div validate-error pl-75px>
              {{ amountErrMsg }}
            </div>
          </div>
          <div class="form-item">
            <label text-15px>充值人姓名：</label>
            <el-input v-model.trim="name" placeholder="请输入转账人真实姓名" style="width:312.5px" @blur="handleBlurValidate('name')" />
            <div validate-error pl-91px>
              {{ nameErrMsg }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="submit-box">
      <jl-button lh-50px h-50px :disabled="disabled" :loading="loading" w-400px @click="run">
        立即充值
      </jl-button>
      <div class="tip-message">
        <span>充值如遇到任何问题，请联系<a online-service-link @click="appStore.openService">在线客服</a>。</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;
.color-color-error{
  padding-left: 0 !important;
}
</style>
