<script setup lang='ts' name="bank-transfer">
import { ElMessage } from 'element-plus'
const { id } = defineProps<{ id: string }>()
const appStore = useAppStore()
const { data: channels } = $(useRequest(() => getChannels(id)))
const note = $computed(() => get(head(channels), 'note'))
const channelId = $computed(() => get(head(channels), 'id'))
const hasChannelId = computed(() => !!channelId)
const { data: info } = $(useRequest(() => getPayBank(channelId!), {
  ready: hasChannelId,
}))

const min = $computed(() => get(info, 'min', 0))
const max = $computed(() => get(info, 'max', 0))
// 是否开启手动输入
const flags = $computed(() => channels ? channels[0].flags : 0)
// 当前选中的快捷金额index
let amountIndex = $ref(-1)
const currentAmountList = $computed(() => {
  if (!channels)
    return []
  return channels[0].amount_list === '' ? [] : channels[0].amount_list.split(',').map(item => ({ label: item, value: item }))
})
const bankId = $computed(() => info?.id)

// 充值金额
const { errorMessage: amountErrMsg, value: amount, setValue: setAmount, setErrors: setAmountErrors } = $(useField<string>('amount', (value) => {
  if (!value || !value.trim())
    return '充值金额不能为空'
  if (!positiveNumberRegx.test(value))
    return '金额格式不对'
  if (Number(value) < min! || Number(value) > max!)
    return `充值金额必须在${min}与${max}之间`
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

const checkAmount = $computed(() => {
  if (!amount)
    return true
  return +amount >= min && +amount <= max
})

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
const { run, loading } = useRequest(() => financePayOffline({ amount, name, id: bankId! }), {
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
  return !amount || !name || !!nameErrMsg || !checkAmount || !!amountErrMsg
})

// 弹窗提醒
financePopup('deposit', '16')
</script>

<template>
  <div class="bank-transfer">
    <div flex justify-between>
      <div>
        <div class="tip-title" data-number="1">
          <h4 class="subtitle">
            请转账到以下银行账户：
          </h4>
          <span>单笔最低 <span class="color-color-error">{{ min }}</span> 元，最高 <span class="color-color-error">{{ max }}</span> 元</span>
        </div>
        <bank-info :data="info" />
      </div>
      <div>
        <div class="instruction2-title">
          充值说明
        </div>
        <div class="instruction2" v-html="filterXSS(note ?? '')" />
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
          {{ flags === 2 ? '固定金额' : '充值金额' }}
        </h5>
        <personal-tabs
          v-if="currentAmountList?.length > 0" key="currentAmountList" v-model="amountIndex" mb-15px
          :list="currentAmountList" class="tunnels"
        >
          <template #tab="{ item, active }">
            <div
              class="tunnel-item" :class="{ 'font-jl-font-bold color-color-primary-second': active }" w-146px h-60px
              leading-60px @click="chooseAmount(item.value)"
            >
              <span>￥{{ item.label }}</span>
            </div>
          </template>
        </personal-tabs>

        <div class="field-wrapper" flex>
          <div v-if="flags === 2" class="form-item" mr-32px>
            <label>充值金额：</label>
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
            <label>充值人姓名：</label>
            <el-input v-model.trim="name" placeholder="请输入转账人真实姓名" style="width:312.5px" @blur="handleBlurValidate('name')" />
            <div validate-error pl-90px>
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

.bank-transfer {
  font-size: 15px;

  color: $color-black-primary;
  line-height: 21px;

  .bank-card {
    width: 404px;
    padding: 16px 16px 20px 20px;
    background: linear-gradient(136deg, #FFFFFF 0%, #FAFCFE 79%, #F5FAFD 83%, #F4F9FC 100%);
    box-shadow: 0px 10px 10px 1px rgba(208, 217, 225, 0.22);
    border-radius: 6px 6px 6px 6px;
    opacity: 1;
    border: 1px solid #DFEAF6;

    .card-item {
      display: flex;
      align-items: center;

      &+.card-item {
        padding-top: 22px;
      }

      .bank-info {
        padding: 0 32px 0 8px;
        margin-left: 9px;
        border-radius: 6px;
        height: 35px;
        box-shadow: 0px 2px 8px 1px rgba(86, 122, 254, 0.3);
        border: 2px solid $color-primary-second;
        background-size: 23px 23px;
        background-repeat: no-repeat;
        background-position: right -1px bottom -1px;
        display: flex;
        align-items: center;

        span {
          font-size: 13px;
          position: relative;
          line-height: 30px;
          color: $text-primary;
          display: flex;
          align-items: center;

          i {
            /* margin-left: 5px; */
            margin-right: 7px;
            width: 18px;
            display: block;
            background-color: $color-primary-second;
            height: 18px;
            border-radius: 50%;
            opacity: 0.8;
            border: 3px solid #FFFFFF;
            outline: 1px solid #9AA4C2;
          }
        }

      }

      .label {
        font-size: 13px;
        font-family: $jl-font;
        font-weight: 400;
        color: $color-black-primary;
        line-height: 21px;
      }

      span {
        font-size: 13px;
        padding-left: 10px;
        font-family: $jl-font;
        font-weight: bold;
        color: $color-black-primary;
      }
    }
  }
  .color-color-error{
    padding-left: 0;
  }
}
</style>
