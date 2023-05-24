<script setup lang='ts' name="bank-withdraw">
import { ElMessage } from 'element-plus'

const { note } = defineProps<{
  note?: string
}>()
// 银行卡提现
const appStore = useAppStore()
const userStore = useUserStore()
const { myBankList, allBankList } = $(storeToRefs(appStore))
let bid = $ref('')
watch($$(myBankList), (newValue) => {
  // 在提现页面刷新时
  if (newValue)
    bid = newValue[0].id
})
// 拼名字
const getBankName = (id: string) => {
  if (allBankList)
    return allBankList.filter(b => b.id === +id)[0].name
}
// 最大最小额
const { data: minMaxData } = $(useRequest(() => getWithdrawMinMax({ t: '15' })))
const min = $computed(() => minMaxData?.fmin ?? 0)
const max = $computed(() => minMaxData?.fmax ?? 0)

// 安全密码
const { errorMessage: passwordErrMsg, value: password, setValue: setPwd } = $(useField<string>('password', (value) => {
  if (!value || !value.trim())
    return true
  if (value.length !== 6)
    return '请正确输入安全密码'
  return true
}))
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

// 禁用按钮
const disabled = $computed(() => {
  return !password || !amount || !bid || !!passwordErrMsg || !!amountErrMsg
})

// 提现
const { run, loading } = $(useRequest(() => financeWithdraw({ amount, bid, password, ty: '1' }), {
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
}))

// 控制小眼睛
const { showEye, openEye, elPasswordRef, clickEye } = useWithdrawEye()
// 解决浏览器自动填充提现金额问题
const amountReadonly = $ref(true)

// 弹窗提醒
financePopup('withdraw', '999')

onMounted(() => {
  // 从其他页面跳转进来时
  if (myBankList?.length)
    bid = myBankList[0].id
})
</script>

<template>
  <div class="bank-withdraw">
    <template v-if="myBankList?.length && allBankList?.length">
      <div class="field-item">
        <div personal-subtitle-horizontal w-80px>
          提现账户：
        </div>
        <el-select v-model="bid" style="width:320px">
          <el-option
            v-for="item in myBankList" :key="item.id" :label="`${getBankName(item.bank_id)}${item.bank_card}`"
            :value="item.id"
          />
        </el-select>
      </div>
      <div class="validate-wrapper">
        <div class="field-item">
          <div personal-subtitle-horizontal w-80px>
            提现金额：
          </div>
          <el-input
            v-model="amount" :readonly="amountReadonly" style="width:320px" placeholder="请输入您要提现的整数金额"
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
      <div class="instruction" v-html="filterXSS(note ?? '')" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

.bank-withdraw {
  .field-item {
    display: flex;
    padding-top: 20px;
  }
}
</style>
