<script setup lang='ts' name="withdraw-digital">
import { ElMessage } from 'element-plus'

const { note } = defineProps<{
  note?: string
}>()
// 数字货币提现
const appStore = useAppStore()
const userStore = useUserStore()
// 获取数字钱包列表
const { myDigitalList } = $(storeToRefs(appStore))
let bid = $ref('')
watch($$(myDigitalList), (newValue) => {
  // 在提现页面刷新时
  if (newValue)
    bid = newValue[0].id
})
onMounted(() => {
  // 从其他页面跳转进来时
  if (myDigitalList?.length)
    bid = myDigitalList[0].id
})

// 仅USDT时展示提现汇率和对应数字货币
const isUSDT = $computed(() => myDigitalList?.filter(l => l.id === bid)[0]?.currency === 'USDT')

// 最大最小额
const currentType = $computed(() => myDigitalList?.filter(l => l.id === bid)[0]?.currency ?? '')
const digitalType: { [text: string]: string } = {
  GOpay: '17',
  OKpay: '19',
  USDT: '20',
  TOpay: '23',
}
const { data: minMaxData, run: runGetMinMax } = $(useRequest(
  () => getWithdrawMinMax({ t: digitalType[currentType] }),
  {
    manual: true,
    refreshDeps: [$$(currentType)],
    refreshDepsAction: () => {
      runGetMinMax()
    },
  },
))
const min = $computed(() => minMaxData?.fmin ?? 0)
const max = $computed(() => minMaxData?.fmax ?? 0)

// 提现金额
const { errorMessage: amountErrMsg, value: amount, setValue, setErrors: setAmountError, validate: valiAmount } = $(useField<string>('amount', (value) => {
  if (!value || !value.trim())
    return '提现金额不能为空'
  if (!(+value))
    return '输入内容只能为正整数'
  if (+value < min || +value > max)
    return `提现金额必须在${min}与${max}之间`
  return true
}))
// 失焦之后验证,清空错误信息
const handleBlurValidate = () => {
  if (!amount)
    setAmountError('')
}

// 安全密码
const { errorMessage: passwordErrMsg, value: password, setValue: setPwd } = $(useField<string>('password', (value) => {
  if (!value || !value.trim())
    return true
  if (value.length !== 6)
    return '请正确输入安全密码'
  return true
}))

// 获取Usdt汇率
const { data: usdtRate, run: runGetUsdtRate } = $(useRequest(getUsdtRate))
// 货币数量
const num = $computed(() => {
  if (!amount || !usdtRate)
    return 0
  return toFloat((+amount) / (+usdtRate))
})
// 禁用按钮
const disabled = $computed(() => {
  return !password || !amount || !bid || !!passwordErrMsg || !!amountErrMsg
})
// 提现
const { run, loading } = $(useRequest(
  () => financeWithdraw({
    amount,
    bid,
    password,
    ty: '2',
    rate: isUSDT ? usdtRate : '',
  }), {
    manual: true,
    debounceInterval: 300,
    loadingKeep: 1000,
    onSuccess() {
    // 提现成功后刷新中心钱包余额
      setValue('')
      setPwd('')
      const t = setTimeout(() => {
        setAmountError('')
        clearTimeout(t)
      }, 0)
      ElMessage.success('提现申请提交成功，请在3-5分钟后查询是否到账')
      userStore.runGetUserBalance()
    },
    onError(err) {
      if (err.message === '汇率发生变化')
        runGetUsdtRate()
    },
  }))

// 控制小眼睛
const { showEye, openEye, elPasswordRef, clickEye } = useWithdrawEye()
// 解决浏览器自动填充提现金额问题
const amountReadonly = $ref(true)
</script>

<template>
  <div class="withdraw-digital">
    <template v-if="myDigitalList?.length">
      <div class="field-item">
        <div personal-subtitle-horizontal w-80px>
          提现账户：
        </div>
        <el-select v-model="bid" style="width:320px">
          <el-option v-for="item in myDigitalList" :key="item.id" :label="`${item.wallet_alias}-${item.currency}`" :value="item.id" />
        </el-select>
      </div>
      <div v-show="isUSDT">
        <div class="field-item">
          <div personal-subtitle-horizontal w-80px>
            提现汇率：
          </div>
          <span font-jl-font-bold text-13px color-black-primary font-semibold>{{ usdtRate }}</span>
        </div>
        <div class="field-item">
          <div personal-subtitle-horizontal w-80px>
            货币数量：
          </div>
          <span font-jl-font-bold text-13px color-color-error font-semibold>{{ num }}</span>
        </div>
      </div>
      <div class="validate-wrapper">
        <div class="field-item">
          <div personal-subtitle-horizontal w-80px>
            提现金额：
          </div>
          <el-input
            v-model="amount"
            :readonly="amountReadonly" style="width:320px" placeholder="请输入您要提现的整数金额"
            @input="amount = amount.replace(/^0|[^0-9]/g, '')"
            @focus="(valiAmount as any)"
            @blur="handleBlurValidate"
            @click="amountReadonly = false"
          />
        </div>
        <div validate-error pl-80px>
          {{ amountErrMsg }}
        </div>
      </div>
      <div class="validate-wrapper">
        <div class="field-item !pt-0px">
          <div personal-subtitle-horizontal w-80px>
            安全密码：
          </div>
          <el-input
            ref="elPasswordRef" v-model="password" :type="openEye ? 'text' : 'password'"
            maxlength="6" style="width:320px" placeholder="请输入您的安全密码"
            @input="password = password.replace(/[^0-9]/g, '')"
            @focus="showEye = true"
            @blur="showEye = false"
          >
            <template #suffix>
              <div
                class="icon"
                :style="{ opacity: showEye ? 1 : 0, cursor: showEye ? 'pointer' : '' }"
                py-10px
                px-5px @click="clickEye"
              >
                <img v-show="openEye" src="@icons/personal/finance/eye-open.svg" alt="eye1">
                <img v-show="!openEye" src="@icons/personal/finance/eye-close.svg" alt="eye2">
              </div>
            </template>
          </el-input>
        </div>
        <div validate-error pl-80px>
          {{ passwordErrMsg }}
        </div>
      </div>
      <div class="submit-box">
        <jl-button lh-50px h-50px :disabled="disabled" :loading="loading" w-400px @click="run">
          立即提现
        </jl-button>
        <div class="tip-message">
          <span>提现如遇到任何问题，请联系<a online-service-link @click="appStore.openService">在线客服</a>。</span>
        </div>
      </div>
      <div personal-subtitle>
        提现说明
      </div>
      <div class="instruction" v-html="note" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

.withdraw-digital {
  .field-item {
    display: flex;
    padding-top: 20px;
  }
}
</style>
