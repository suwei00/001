<script setup lang='ts' name="transfer">
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const { balanceLoading, balance, runGetUserBalance } = $(storeToRefs(userStore))
const leftVal = $ref<string>('')
const rightVal = $ref<string>('')
const appStore = useAppStore()
const { venueWalletIds } = $(storeToRefs(appStore))

// 中心钱包id，前端自定义的
const CENTER_WALLET_ID = '0000'
// 根据左右选中值判断转入转出 0无效 1转入 2转出
const ty = $computed(() => {
  if (!leftVal || !rightVal)
    return null
  return leftVal === CENTER_WALLET_ID ? 1 : 2
})
// 场馆id
const pid = $computed(() => {
  if (!leftVal || !rightVal)
    return ''
  return leftVal === CENTER_WALLET_ID ? rightVal : leftVal
})
// 转出到中心钱包才请求选中的场馆钱包余额
const isReady = computed(() => ty === 2)
// 获取选中的场馆钱包余额
const { data: selectedWalletBalance, run: runGetVenueWallet } = $(useRequest(() => getVenueWallet(pid), {
  refreshDeps: $$([pid]),
  ready: isReady,
  onSuccess(val) {
    if (gt(toNumber(val), 0))
      venueWalletIds.add(pid)
    if (eq(toNumber(val), 0))
      venueWalletIds.delete(pid)
  },
}))
// 最大金额,转入时，最大金额为中心钱包余额，转出时，最大金额为选中的场馆钱包余额
const maxAmount = $computed(() => {
  if (!ty)
    return 0
  return ty === 1 ? balance : (selectedWalletBalance ?? 0)
})

// 转账金额
const { errorMessage: amountErrMsg, value: amount, setValue, setErrors, handleChange: handleAmountChange } = $(useField<string>('amount', (value, b) => {
  if (!value || !value.trim())
    return '转账金额不能为空'
  if (!positiveNumberRegx.test(value))
    return '金额格式不对'
  if (+value > maxAmount)
    return '转账金额不能大于转出账户余额'
  return true
}, {
  initialValue: '',
}))
// 失焦之后验证,清空错误信息
const handleBlurValidate = () => {
  if (!amount)
    setErrors('')
}

// 转账
const moneyRef = ref()
const { run, loading } = $(useRequest(() => transfer({ pid, ty: ty!, amount: +amount }), {
  manual: true,
  loadingKeep: 1000,
  debounceInterval: 300,
  onSuccess(data) {
    ElMessage.success(ty === 1 ? '场馆转入成功' : '场馆转出成功')
    setValue('')
    const t = setTimeout(() => {
      setErrors('')
      clearTimeout(t)
    }, 0)
    moneyRef.value.clearMoney()
    // 获取用户中心钱包余额
    runGetUserBalance()
    // 获取选中的场馆钱包余额
    runGetVenueWallet()
    //  获取场馆钱包余额(通知场馆钱包更新)
    emitter.emit('updateWalletItem', pid)
  },
  // onError() {
  //   if (isLogged)
  //     ElMessage.error(ty === 1 ? '场馆转入失败' : '场馆转出失败')
  // },
}))

// 刷新中心钱包、所有场馆钱包余额
const refreshAllBalance = () => {
  if (!balanceLoading) {
    userStore.runGetUserBalance()
    emitter.emit('updateWalletItem', 'all')
  }
}
// 禁用转账按钮
const disabled = computed(() => {
  return !ty || !pid || !(+amount) || !!amountErrMsg
})
</script>

<template>
  <div class="transfer">
    <personal-title title="转账" />
    <p personal-subtitle>
      钱包金额 <i
        class="i-common-refresh" :class="{ 'refresh-loading': balanceLoading }" ml-7px
        h-12px w-12px @click="refreshAllBalance"
      />
    </p>
    <!-- 中心钱包 -->
    <center-wallet />
    <!-- 场馆钱包 -->
    <venue-wallet margin-left="33px" />
    <!-- 转账 -->
    <wallet-transfer v-model:leftVal="leftVal" v-model:rightVal="rightVal" />
    <p personal-subtitle>
      转账金额
    </p>
    <!-- 自定义金额 -->
    <money-input
      ref="moneyRef"
      v-model="amount"
      :max="maxAmount"
      @focus="handleAmountChange"
      @blur="handleBlurValidate"
    />
    <div validate-error pb-8px>
      {{ amountErrMsg }}
    </div>
    <div class="submit-box">
      <jl-button lh-50px h-50px :disabled="disabled" :loading="loading" w-400px @click="run">
        立即转账
      </jl-button>
      <div class="tip-message">
        <span>转账如遇到任何问题，请联系<a online-service-link @click="appStore.openService">在线客服</a>。</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

.transfer {
  @include pageCard;
  text-align: left;
}
</style>

<route lang="yaml">
meta:
  layout: main
  personal: true
  auth: true
</route>
