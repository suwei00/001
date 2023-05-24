<script setup lang='ts'>
import { computed, ref } from 'vue'
import { CgHeader, CgIcon, CgContainer, CgContainerHead, CgAmount, CgDivider } from '@/components/cg-template-2';
import WalletCenter from '../wallet-center/index.vue'
import { useRouter } from 'vue-router'
import { userInfoStateStore } from '@/store-pinia/userInfo'
import { toNumber } from 'lodash'

const router = useRouter()
const userStore = userInfoStateStore()
const totalVenueAmount = ref(0)
const total = computed(() => toNumber(userStore.userInfo.balance) + toNumber(userStore.userInfo.lock_amount) + totalVenueAmount.value)

const updateTotalVenueAmount = (val: number) => {
  totalVenueAmount.value = val
}
const menus = [
  { id: 1, name: 'NẠP TIỀN', icon: 'i_h_wallet', path: '/deposit' },
  { id: 2, name: 'CHUYỂN <br /> KHOẢN', icon: 'i_h_change', path: '/transfer' },
  { id: 3, name: 'RÚT TIỀN', icon: 'i_h_withdraw', path: '/withdraw' },
  { id: 4, name: 'LIÊN KẾT <br /> RÚT TIỀN', icon: 'i_h_bank', path: '/banks' },
]
const goTo = (path: string) => {
  router.push(path)
}
</script>
<template>
  <div class="my-wallet">
    <CgHeader>
      VÍ TIỀN CỦA TÔI
      <template #actions>
        <cg-icon width="52" name="i_details" @click="router.push('/transaction')" />
      </template>
    </CgHeader>

    <div class="body">
      <CgContainer>
        <CgContainerHead height="80">
          <template #left>
            <span class="title">TỔNG TÀI SẢN</span>
          </template>
        </CgContainerHead>
        <div class="actions">
          <div class="amount">
            <CgIcon class="icon" width="56" name="i_amount" />
            <CgAmount suffix="K" segmentation :amount="total" size="36" weight="700" color="red4" />
          </div>
          <CgDivider style="width:var(--cg-px-562);margin: 0 auto;" />
          <div class="route">
            <div class="item" v-for="item in menus" :key="item.id" @click="goTo(item.path)">
              <cg-icon width="72" :name="item.icon" />
              <span v-html="item.name" />
            </div>
          </div>
        </div>
      </CgContainer>
    </div>

    <!-- 钱包中心 -->
    <WalletCenter @totalVenueAmount="updateTotalVenueAmount" isMyWallet :showTitle="false" small
      :showTransfer="false" />
  </div>

</template>
<script lang='ts'>
export default {
  name: 'MyWallet'
}
</script>

<style lang='scss' scoped>
.my-wallet {
  padding: 21px 0 100px;

  .body {
    padding: 0 32px;
  }

  .title {
    padding-left: 28px;
    font: var(--cg-font-text1);
  }

  .actions {
    height: 308px;

    .amount {
      height: 118px;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon {
        margin-right: 4px;
        transform: translateY(4px);
      }
    }

    .route {
      display: flex;
      justify-content: space-around;
      padding-top: 24px;

      .item {
        width: 140px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        font: var(--cg-font-text4);

        span {
          margin-top: 8px;
        }
      }
    }
  }
}
</style>