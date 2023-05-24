<script setup lang='ts' name='transfer-out'>
const userStore = useUserStore()
const { userBalance, runGetUserBalance } = $(storeToRefs(userStore))
// 最大金额
const maxAmount = $computed(() => userBalance?.balance ?? 0)
// 快捷金额
// 当前选中的快捷金额index
let amountIndex = $ref(-1)
const moneyList = ['100', '500', '1000', '5000', '10000', '50000']
const currentAmountList = $computed(() => moneyList.map(m => ({ value: m, label: m })))
// 余额宝说明
const note = '<p>余额宝说明</p>'

// 转账金额
const { errorMessage: amountErrMsg, value: amount, setValue: setAmount, setErrors: setAmountError } = $(useField<string>('amount', (value, b) => {
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
// 全部金额
const handleMax = () => {
  setAmount(toFixAmount(maxAmount.toString()))
}
// 失焦之后验证,清空错误信息
const handleBlurValidate = () => {
  if (!amount)
    setAmountError('')
}
// 选中快捷金额
const chooseAmount = (m: string | number) => {
  setAmount(m.toString())
}
// 手动输入与固定金额联动
const inputHandler = (amount: string) => {
  setAmount(toFixAmount(amount))
  amountIndex = currentAmountList.findIndex(c => c.value === amount)
}

// 安全密码
const { errorMessage: passwordErrMsg, value: password, setValue: setPwd } = $(useField<string>('password', (value) => {
  if (!value || !value.trim())
    return true
  if (value.length !== 6)
    return '请正确输入安全密码'
  return true
}))
// 控制小眼睛
const { showEye, openEye, elPasswordRef, clickEye } = useWithdrawEye()
// 解决浏览器自动填充提现金额问题
const amountReadonly = $ref(true)

// 禁用按钮
const disabled = $computed(() => {
  return !password || !amount || !!passwordErrMsg || !!amountErrMsg
})
// 转出余额宝
const { run, loading } = $(useRequest(() => financeWithdraw({ amount, bid: '', password, ty: '1' }), {
  manual: true,
  debounceInterval: 300,
  loadingKeep: 1000,
  onSuccess() {
    // 提现成功后刷新中心钱包余额
    setAmount('')
    setPwd('')
    const t = setTimeout(() => {
      setAmountError('')
      clearTimeout(t)
    }, 0)
    ElMessage.success('转出成功')
    runGetUserBalance()
  },
}))
</script>

<template>
  <div text-left>
    <p flex mb-26px>
      <label w-94px mr-16px>中心钱包余额:</label><span>¥ <jl-count :value="+(userBalance?.balance ?? 0)" /></span>
    </p>
    <p flex mb-23px>
      <label w-94px mr-16px>可转出金额:</label><span>¥ <jl-count :value="+(userBalance?.balance ?? 0)" /></span>
    </p>
    <!-- 转出金额 -->
    <div flex items-center mb-32px>
      <label mr-18px>转出金额:</label>
      <div relative mr-16px>
        <div>
          <el-input
            v-model="amount" style="width:320px;" placeholder="请输入转出金额"
            :readonly="amountReadonly" @input="inputHandler" @click="amountReadonly = false"
            @blur="handleBlurValidate"
          >
            <template #suffix>
              <span text-15px font-jl-font color-color-primary-second cursor-pointer @click="handleMax">全部金额
              </span>
            </template>
          </el-input>
        </div>
        <div absolute style="bottom:-23px;" validate-error>
          {{ amountErrMsg }}
        </div>
      </div>
      <label>今日剩余可转出次数：<span color-color-error font-semibold>5</span></label>
    </div>
    <!-- 快捷金额 -->
    <personal-tabs
      key="currentAmountList" v-model="amountIndex" mb-18px
      :list="currentAmountList"
    >
      <template #tab="{ item, active }">
        <div
          :class="{ 'font-jl-font-bold color-color-primary-second': active }" w-146px h-60px text-center
          leading-60px @click="chooseAmount(item.value)"
        >
          <span>￥{{ item.label }}</span>
        </div>
      </template>
    </personal-tabs>
    <!-- 安全密码 -->
    <div flex items-center mb-29px>
      <label mr-18px>安全密码:</label>
      <div relative mr-16px>
        <div>
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
        <div absolute style="bottom:-23px;" validate-error>
          {{ passwordErrMsg }}
        </div>
      </div>
    </div>
    <div class="submit">
      <jl-button lh-50px h-50px :disabled="disabled" :loading="loading" w-402px mr-16px @click="run">
        确认转出
      </jl-button>
      <p>温馨提示：余额宝支持直接提现，<span color-color-primary-second cursor-pointer @click="publicHandleToWithdraw">去提现</span>。</p>
    </div>
    <div mt-27px mb-9px>
      余额宝说明
    </div>
    <div class="instruction" v-html="filterXSS(note ?? '')" />
  </div>
</template>

<style lang='scss' scoped>
.submit{
  display: flex;
  align-items: center;
  color:#94A6B7 ;
}
.instruction{
  width: 690px;
  padding: 11px 8px 15px 12px;
  border-radius: 6px;
  border: 1px solid $border-color;
  text-align: left;
  font-size: 13px;
}
</style>
