<script setup lang='ts' name="withdraw">
const typeList = $ref([{
  label: '银行卡提现',
  value: 1,
  id: '45',
}, {
  label: '数字货币提现',
  value: 2,
  id: '25',
}])
// query传递的提现方式 bank | digital
const withdrawType = $(useRouteQuery<'bank' | 'digital'>('type', 'bank'))
const userStore = useUserStore()
const { balanceLoading } = $(storeToRefs(userStore))
const appStore = useAppStore()
const { isBindBank, isBindDigital } = $(storeToRefs(appStore))
const type = $ref(withdrawType === 'bank' ? 1 : 2)
const { data: withdrawList } = $(useRequest(getWithdrawTypes))
const list = $computed(() => {
  if (!withdrawList?.length)
    return []

  // 根据后台配置的提现方式提供
  return typeList.filter((item) => {
    return withdrawList.findIndex((w: any) => w.id === item.id) > -1
  }).map((item) => {
    const o = withdrawList.find(o => o.id === item.id)
    return { ...item, ...o }
  })
})
const note = $computed(() => {
  const item = list.find(item => item.value === type)
  return item?.note
})
// tab切换之前处理禁止切换tab
const handleBeforeChange = (val: number, item: any) => {
  // 将要切换到银行卡提现，但是没有绑定银行卡
  if (item.value === 1 && !isBindBank) {
    // 触发没有绑定银行卡的提示弹窗
    emitter.emit('doWithdraw', 'bank')
    return false
  }
  // 将要切换到数字货币提现，但是没有绑定数字货币
  if (item.value === 2 && !isBindDigital) {
    // 触发没有绑定数字货币的提示弹窗
    emitter.emit('doWithdraw', 'digital')
    return false
  }
  return true
}

// 刷新中心钱包、所有场馆钱包余额
const refreshAllBalance = () => {
  if (!balanceLoading) {
    userStore.runGetUserBalance()
    emitter.emit('updateWalletItem', 'all')
  }
}
</script>

<template>
  <div class="withdraw">
    <personal-title title="提现" />
    <p personal-subtitle>
      钱包金额 <i
        class="i-common-refresh" :class="{ 'refresh-loading': balanceLoading }" ml-7px
        w-12px h-12px @click="refreshAllBalance"
      />
    </p>
    <center-wallet />
    <venue-wallet margin-left="33px" />
    <p personal-subtitle>
      提现方式
    </p>
    <transition>
      <jl-tabs v-if="withdrawList?.length" v-model="type" :list="list as any" :before-change="handleBeforeChange" />
    </transition>
    <transition mode="out-in" :name="type === 1 ? 'slide-right' : 'slide-left'">
      <withdraw-bank v-if="type === 1" :note="note" />
      <withdraw-digital v-else :note="note" />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;
@include transition-slide-left;
@include transition-slide-right;

.withdraw {
  @include pageCard;
  overflow: hidden;
}
</style>

<route lang="yaml">
meta:
  layout: main
  personal: true
  auth: true
</route>
