<script setup lang='ts' name="bind-modals">
const router = useRouter()
const route = useRoute()
// 没有绑定任何提现账户弹窗可见性
let noBindAccountVisible = $ref(false)
// 没有绑定任何意银行卡弹窗可见性
let noBindBankVisible = $ref(false)
// 没有绑定任何数字货币弹窗可见性
let noBindDigitalVisible = $ref(false)

// 倒计时时间
// const NO_BIND_ACCOUNT_COUNTDOWN = 3
// // 没有绑定任何提现账户弹窗倒计时
// const { start, current: noBindAccountCountDown, reset, pause } = $(useCountDown({
//   time: (NO_BIND_ACCOUNT_COUNTDOWN + 1) * 1000,
//   onFinish: () => {
//     // 关闭所有弹窗
//     noBindAccountVisible = false
//     noBindBankVisible = false
//     noBindDigitalVisible = false

//     if (route.path !== '/personal/wallet')
//       router.push('/personal/wallet')
//   },
// }))
// 提现 bank没有绑定任何银行卡 digital没有绑定任何数字货币 all没有绑定任何提现账户
const handleWithdraw = (val: 'bank' | 'digital' | '') => {
  // 没有绑定任何提现账户
  if (!val)
    noBindAccountVisible = true
  // 没有绑定任何银行卡
  if (val === 'bank')
    noBindBankVisible = true
  // 没有绑定任何数字货币
  if (val === 'digital')
    noBindDigitalVisible = true
  // 重置倒计时
  // reset((NO_BIND_ACCOUNT_COUNTDOWN + 1) * 1000)
  // 开始倒计时
  // return start()
}
// 点击关闭没有绑定任何提现账户弹窗
const handleClose = () => {
  // 重置倒计时
  // reset()
  noBindAccountVisible = false
  noBindBankVisible = false
  noBindDigitalVisible = false
}
// 点击确定
const handleConfirm = (type: string) => {
  noBindAccountVisible = false
  noBindBankVisible = false
  noBindDigitalVisible = false
  // 暂停倒计时
  // pause()
  if (route.path !== '/personal/wallet')
    router.push(`/personal/wallet?type=${type}`)
}
// 监听提现点击
emitter.on('doWithdraw', handleWithdraw)

onUnmounted(() => {
  // 页面卸载时移除监听
  emitter.off('doWithdraw')
})
</script>

<template>
  <!-- 未绑定任何提现账户 -->
  <el-dialog
    v-model="noBindAccountVisible" :show-close="false" width="550px" align-center
    @click="noBindAccountVisible = false"
  >
    <template #header>
      <div class="jl-dialog-header">
        <h3 class="title">
          温馨提示
        </h3>
        <i i-common-close w-14px h-14px @click="handleClose" />
      </div>
    </template>
    <div pt-34px pb-50px>
      <p text-15px lh-20px color-black-primary>
        您还未绑定任何提现账户，请先绑定！
      </p>
      <!-- <div text-15px lh-18px>
        <span text-13px color-color-primary-second>{{ noBindAccountCountDown.seconds }}s</span>自动跳转我的钱包
      </div> -->
    </div>
    <template #footer>
      <jl-button lh-50px h-50px w-450px @click="handleConfirm('bank')">
        立即绑定
      </jl-button>
    </template>
  </el-dialog>
  <!-- 未绑定银行卡 -->
  <el-dialog
    v-model="noBindBankVisible" :show-close="false" width="550px" align-center
    @click="noBindAccountVisible = false"
  >
    <template #header>
      <div class="jl-dialog-header">
        <h3 class="title">
          温馨提示
        </h3>
        <i i-common-close w-14px h-14px @click="handleClose" />
      </div>
    </template>
    <div pt-34px pb-50px>
      <p text-15px lh-20px color-black-primary>
        您还未绑定任何银行卡账户，请先绑定！
      </p>
      <!-- <div text-15px lh-18px>
        <span text-13px color-color-primary-second>{{ noBindAccountCountDown.seconds }}s</span>自动跳转我的钱包
      </div> -->
    </div>
    <template #footer>
      <jl-button lh-50px h-50px w-450px @click="handleConfirm('bank')">
        立即绑定
      </jl-button>
    </template>
  </el-dialog>
  <!-- 未绑定数字币账户 -->
  <el-dialog
    v-model="noBindDigitalVisible" :show-close="false" width="550px" align-center
    @click="noBindDigitalVisible = false"
  >
    <template #header>
      <div class="jl-dialog-header">
        <h3 class="title">
          温馨提示
        </h3>
        <i i-common-close w-14px h-14px @click="handleClose" />
      </div>
    </template>
    <div pt-34px pb-50px>
      <p text-15px lh-20px color-black-primary>
        您还未绑定任何数字币账户，请先绑定！
      </p>
      <!-- <div text-15px lh-18px>
        <span text-13px color-color-primary-second>{{ noBindAccountCountDown.seconds }}s</span>自动跳转我的钱包
      </div> -->
    </div>
    <template #footer>
      <jl-button lh-50px h-50px w-450px @click="handleConfirm('digital')">
        立即绑定
      </jl-button>
    </template>
  </el-dialog>
</template>
