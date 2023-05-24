<script setup lang='ts' name="wallet-item">
import { ElMessage } from 'element-plus'

interface itemProps {
  enable: boolean
  id: string
  name: string
  wallet_id: string
  wallet_name: string
  game_type: number
  maintained: number
  flags: number
  state: number
  seq: number
  share_wallet: number
}
interface Props {
  data: itemProps
  marginLeft?: string
}
const props = withDefaults(defineProps<Props>(), { marginLeft: '0px' })
const { data: item } = $(toRefs(props))
const userStore = useUserStore()
const appStore = useAppStore()
const route = useRoute()
const { venueWalletIds } = $(storeToRefs(appStore))

// 用户中心钱包余额
const { runGetUserBalance } = $(storeToRefs(userStore))
let isMounted = $ref(true)
// 是否是维护中
const maintaining = $computed(() => !item.enable)

const isReady = computed(() => isMounted && !maintaining)

// 获取场馆钱包余额
const { data: itemBalance, loading: getBalanceLoading, run: runGetVenueWallet } = $(useRequest(() => getVenueWallet(item.wallet_id), {
  loadingKeep: 1000,
  ready: isReady,
  onSuccess(val) {
    if (gt(toNumber(val), 0))
      venueWalletIds.add(item.wallet_id)
    if (eq(toNumber(val), 0))
      venueWalletIds.delete(item.wallet_id)
  },
}))
// 一键转入
const { run: runTransfer, loading: transferLoading } = $(useRequest(() => transfer({ pid: item.wallet_id, ty: 1 }), {
  manual: true,
  loadingKeep: 800,
  onSuccess(data) {
    // 获取用户中心钱包余额
    runGetUserBalance()
    // 获取场馆钱包余额
    runGetVenueWallet()
  },
  onError(err) {
    ElMessage.error(err.message)
  },
}))
// 监听钱包更新
emitter.on('updateWalletItem', (pid) => {
  /*
   更新条件
   1.当前钱包在页面上已经加载
   2.当前场馆id和传入的场馆id相同或者是更新全部(pid==='all')
   3.当前钱包不是维护中
   */
  if (isMounted && (pid === item.wallet_id || pid === 'all') && !maintaining)
    runGetVenueWallet()
})

onBeforeUnmount(() => { isMounted = false })
</script>

<template>
  <div v-card class="wallet-item" :style="{ marginLeft }" shadow-card>
    <div class="card-header">
      <div class="title">
        {{ item.wallet_name }}
      </div>
      <div class="icon-wrapper">
        <transition appear mode="out-in">
          <i v-if="getBalanceLoading || transferLoading" class="i-common-refresh refresh-loading" w-12px h-12px />
          <template v-else>
            <button
              v-if="route.name !== 'personal-withdraw'" :disabled="maintaining" w-60px h-24px lh-23px jl-plain-btn class="!rounded-12px"
              @click="runTransfer"
            >
              一键转入
            </button>
          </template>
        </transition>
      </div>
    </div>
    <div class=" rmb">
      <transition mode="out-in">
        <span v-if="maintaining" class="maintaining">维护中</span>
        <jl-count v-else-if="itemBalance && +itemBalance > 0" class="num" :value="+(itemBalance ?? 0)" />
        <span v-else>0.00</span>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wallet-item {
  width: 225px;
  height: 90px;
  border: 1px solid #DFEAF6;
  border-radius: 6px;
  color: $color-black-primary;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 10px 15px 18px;
  margin-top: 20px;
  transition: all .3s;

  &:hover {
    transform: scale(1.05);
  }
  .jl-plain-btn:disabled, [jl-plain-btn=""]:disabled {
    border-color: #BBBEC0 !important;
    color: #BBBEC0 !important;
  }
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      font-size: 12px;
      line-height: 17px;
    }

    .btn {
      width: 60px;
      height: 24px;
      line-height: 24px;
      border-radius: 12px;
      border: 1px solid $color-primary-second;
      color: $color-primary-second;
      font-size: 12px;
      cursor: pointer;
    }

  }

  .icon-wrapper {
    height: 24px;
  }

  .rmb {
    font-family: $jl-font;
    font-size: 18px;
    line-height: 25px;
    text-align: left;
    font-weight: bold;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity .5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
