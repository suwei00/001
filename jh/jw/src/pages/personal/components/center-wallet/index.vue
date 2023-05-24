<script setup lang='ts' name="center-wallet">
import { ElMessage } from 'element-plus'
// 中心钱包和锁定钱包
interface Props {
  split?: boolean // 是否分离中心钱包和锁定钱包,用于区分不用样式
  mr?: string
}
const { split = true } = defineProps<Props>()
const userStore = useUserStore()
const { userBalance, runGetUserBalance } = $(storeToRefs(userStore))
const appStore = useAppStore()
const { platList, venueWalletIds } = $(storeToRefs(appStore))
// 沙漏弹窗可见性
let waitModalVisible = $ref(false)

const myWalletList = computed(() => [{
  label: '中心钱包',
  key: 'center',
  icon: 'i-personal-wallet-center',
  path: '/personal/deposit',
  value: userBalance?.balance ?? 0,
}, {
  label: '锁定钱包',
  key: 'look',
  icon: 'i-personal-wallet-look',
  path: '/personal/transfer',
  value: userBalance?.lock_amount ?? 0,
}])

// 转账，一键回收使用了转账接口
const { runAsync: runAsyncTransfer, loading } = $(useRequest(transfer, {
  manual: true,
  loadingKeep: 800,
  onError(err) {
    if (err.message === '请求频繁')
      return
    ElMessage.error(err.message)
  },
  onSuccess(data, [{ pid }]) {
    emitter.emit('updateWalletItem', pid)
  },
}))

// 获取所有场馆钱包余额
const getAllVenueWallet = async () => {
  const filterItems = platList.filter(item => !(item.maintained !== 1 && item.share_wallet === 0))
  filterItems.forEach((item) => {
    getVenueWallet(item.wallet_id).then((data) => {
      if (gt(toNumber(data), 0))
        venueWalletIds.add(item.wallet_id)
      if (eq(toNumber(data), 0))
        venueWalletIds.delete(item.wallet_id)
    }).catch((err) => {
      console.log('🚀 ~ file: index.vue ~ line 57 ~ getAllVenueWallet ~ err', err)
    })
  })
}
// 一件回收
const handleRecycle = async () => {
  try {
    // 没有场馆钱包有余额
    if (venueWalletIds.size === 0)
      return ElMessage.error('场馆钱包余额不足，暂无可回收余额')
    waitModalVisible = true
    // 递归转账
    const transferAll = async (ids: Set<string>) => {
      const id = ids.values().next().value
      if (!id)
        return runGetUserBalance()

      await runAsyncTransfer({ pid: id, ty: 2 })
      ids.delete(id)
      await transferAll(ids)
    }
    await transferAll(venueWalletIds)
  }
  catch (err) {
    console.error(err)
  }
  finally {
    waitModalVisible = false
  }
}
watchEffect(() => {
  if (platList.length)
    getAllVenueWallet()
})
</script>

<template>
  <ul class="center-wallet" :class="{ split }">
    <li v-for="item in myWalletList" :key="item.label">
      <div class="info">
        <i :class="item.icon" />
        <div class="detail">
          <p class="label">
            {{ item.label }}
          </p>
          <p class="rmb">
            <jl-count :value="+(item.value)" class="num" />
          </p>
        </div>
      </div>
      <template v-if="item.key === 'center'">
        <transition mode="out-in">
          <i
            v-if="loading" mr-20px class="i-common-refresh" :class="{ 'refresh-loading': loading }" ml-7px
            @click="userStore.runGetUserBalance"
          />
          <button v-else class="btn" :style="{ marginRight: mr }" @click="handleRecycle">
            一键回收
          </button>
        </transition>
      </template>
    </li>
  </ul>
  <!-- 沙漏等待弹窗 -->
  <wait-modal v-if="waitModalVisible" v-model="waitModalVisible" />
</template>

<style lang="scss" scoped>
.center-wallet {
  height: 90px;
  border-radius: 6px;
  border: 1px solid $border-color;
  padding: 15px 25px;
  display: flex;
  align-items: center;

  li {
    display: flex;
    width: 50%;
    justify-content: space-between;

    &:first-child {
      border-right: 1px solid $border-color;
    }

    &:last-child {
      padding-left: 25px;
    }

    .info {
      display: flex;
      align-items: center;

      .detail {
        padding-left: 11px;

        .label {
          color: $color-black-primary;
          font-size: 13px;
          line-height: 16px;
          text-align: left;
        }

        .rmb {
          line-height: 24px;
          text-align: left;

          span {
            color: $color-black-primary;
            font-size: 13px;
          }

          .num {
            color: $color-black-basic;
            font-size: 24px;
            font-family: $jl-font;
            font-weight: bold;

          }
        }
      }
    }

    .btn {
      height: 28px;
      width: 80px;
      line-height: 28px;
      font-size: 13px;
      color: #fff;
      margin-left: auto;
      border-radius: 50px;
      cursor: pointer;
      user-select: none;
      background-color: $color-primary-second;
    }
  }
}

.split {
  padding: 0;
  justify-content: space-between;
  border: 1px solid transparent;
  align-items: stretch;

  li {
    padding: 15px 15px 15px 25px;
    border: 1px solid $border-color;
    width: calc((100% - 30px)/2);
    border-radius: 6px;
  }
}
</style>

