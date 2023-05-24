<script setup lang='ts'>
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call'
import TransferWait from './transfer-wait.vue'
import ToastError from '@/components/cg-template-2/cg-error-list';
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useI18n } from 'vue-i18n';
import { uniqBy, find, cloneDeep } from 'lodash'
import APIs from '@/http/blue-apis';
import Toast from '@/components/cg-template-2/toast';
import { userInfoStateStore } from '@/store-pinia/userInfo'
import { CgContainer, CgContainerHead, CgDivider, CgMaintain, CgIcon, CgButton, CgRefresh, CgAmount } from '@/components/cg-template-2'
import { useLoading } from '@/hooks/useLoading'
import bus from '@/mixins/bus';

interface Wallet {
  [key: string]: any;
  id: string;
  name: string;
  seq: number;
  amount: string;
  flags: number;
  maintained: number;
  wallet_id: string;
  wallet_name: string;
}
interface Props {
  showTransfer?: boolean // 是否展示转入转出按钮
  isWithdraw?: boolean // 是否提现页面
  isTransfer?: boolean
}
const emit = defineEmits(['setAutomaticTransfer'])
const props = withDefaults(defineProps<Props>(), { showTransfer: true })
const Dialog = new CgDialogClass()
const { startLoading, closeLoading } = useLoading()

const { t } = useI18n();
const userStore = userInfoStateStore()
// 是否开启假免转
const fadeAuto = computed(() => userStore.userInfo.automatic === 1)
//  中心钱包余额
const balance = computed(() => userStore.userInfo.balance)
const lock_amount = computed(() => userStore.userInfo.lock_amount)

// 场馆钱包
const wallets = ref<Wallet[]>([]);
// 根据场馆ID获取余额
const getBalanceByPlatId = (i: Wallet) => {
  if (i.wallet_id) {
    return new Promise((resolve, reject) => {
      APIs.getBalanceByVenueId(i.wallet_id).then((res) => {
        wallets.value.forEach(item => {
          if (item.wallet_id === i.wallet_id) {
            item.amount = res
          }
        })
        resolve(res)
      }).catch(() => reject())
    })

  }
};
const isCompleteCheckBlance = ref(false)
// 获取场馆列表
const getPlatList = () => {
  startLoading()
  APIs.getVenueWalletList().then((res) => {
    // 处理维护状态 共享钱包任意一个不是维护则为开启状态
    const arr = []
    for (let i = 0; i < res.length; i++) {
      if (res[i].share_wallet === 0) {
        const enable = res[i].maintained !== 2
        arr.push({ ...res[i], enable })
      }
      else {
        const enable = res.filter(item => item.wallet_id === res[i].wallet_id).some(item => item.maintained !== 2)
        arr.push({ ...res[i], enable })
      }
    }
    wallets.value = uniqBy(arr.map((w) => ({ ...w, amount: '0' })), 'wallet_id').filter((i: any) => i.flags === 3)

    const requestList = wallets.value.map((w) => getBalanceByPlatId(w))
    Promise.allSettled(requestList).then(() => {
      isCompleteCheckBlance.value = true
      closeLoading()
      userStore.setWallets(wallets.value);
    })
  }).catch(() => { closeLoading() })
};

const transfer = (params: { ty: 1 | 2; pid: string }): void => {
  const { ty, pid } = params;
  APIs.transfer({ ty, pid }).then(res => {
    Toast(t('transfer.succes'));
    const item = find(wallets.value, o => o.wallet_id === pid);
    if (item) getBalanceByPlatId(item);
    userStore.RefreshBalance()
  });
};
// 一键转入
const oneKeyTransfer = (wallet_id: string) => {
  if (Number(balance.value) < 1) {
    Toast(t('transfer.dyy'));
    return;
  }
  transfer({ pid: wallet_id, ty: 1 });
};
// 一键转出
const oneKeyOutTransfer = (item: any) => {
  const { amount, wallet_id: pid } = item;
  if (Number(amount) < 1) {
    Toast(t('transfer.dyy'));
    return;
  }
  transfer({ pid, ty: 2 });
};

// 中心钱包
const cyclicCall = async (list: Array<any>, needEmit?: boolean) => {
  const _list = cloneDeep(list)
  const current = _list.shift()
  APIs.transferAll({ pid: current.id, ty: 2 })
    .then(() => {
      getBalanceByPlatId(current);
    })
    .catch(() => {
      errList.value.push(current)
    })
    .finally(() => {
      if (_list.length === 0) {
        userStore.RefreshBalance();
        Dialog.closeDialog()
        if (needEmit) {
          emit('setAutomaticTransfer')
        }
        if (!errList.value.length) {
          Toast(t('plat_list.succes'));
        } else {
          ToastError(errList.value);
        }
      } else {
        cyclicCall(_list)
      }
    })
}

const recoverTime = ref(0);
const errList = ref<Wallet[]>([]);
// 一键回收
const recover = (needEmit?: boolean) => {
  if (Date.now() - recoverTime.value < 15000) {
    Toast('Thao Tác Quá Nhiều Lần, Vui Lòng Thử Lại Sau');
    return;
  }
  recoverTime.value = Date.now();
  errList.value = [];
  const list = wallets.value.filter(i => i.id && Number(i.amount) >= 1 && i.enable);

  if (!list.length) {
    if (needEmit) {
      emit('setAutomaticTransfer')
      return
    }
    Toast('Số Dư Trong Ví Sảnh Game Của Quý Khách Không Đủ, Và Tạm Thời Không Có Số Dư Có Thể Thu Hồi')
    return;
  }

  Dialog.showDialog({
    template: 'tmp2',
    customComponent: TransferWait,
    btns: 1
  })

  cyclicCall(list, needEmit)
};

// 提现页面如果开启自动免转，自动执行回收余额
const stopWatch = watch([fadeAuto, isCompleteCheckBlance], ([f, c], []) => {
  if (props.isWithdraw) {
    if (f && c) {
      recover(false)
    }
  }
})
onMounted(() => {
  getPlatList()
  // 监听转账页面是否开启自动免转
  if (props.isTransfer) {
    bus.on('recover', recover)
  }
})
onBeforeUnmount(() => {
  bus.off('recover', () => { })
  stopWatch()
})
</script>
<template>
  <div class="wallet-center">
    <div class="app-wallet-center">
      <!-- 中心钱包 -->
      <CgContainer radius="8">
        <template #content>
          <div class="wrapper">
            <cg-icon width="56" style="margin-right: 12px;" name="i_main_wallet" />
            <div class="money-box">
              <label>VÍ TIỀN CHÍNH</label>
              <CgAmount weight="700" color="red3" size="20" :amount="balance" segmentation suffix="K" />
            </div>
            <cg-button width="90" mini @click="recover(false)">Thu hồi</cg-button>
          </div>
        </template>
      </CgContainer>
      <!-- 锁定钱包 -->
      <CgContainer radius="8">
        <template #content>
          <div class="wrapper">
            <cg-icon width="56" style="margin-right: 12px;" name="i_lock_wallet" />
            <div class="money-box">
              <label>KHOÁ VÍ TIỀN</label>
              <CgAmount weight="700" color="red3" size="20" :amount="lock_amount" segmentation suffix="K" />
            </div>
            <CgRefresh @click="userStore.RefreshBalance" width="32" />
          </div>
        </template>
      </CgContainer>
    </div>
    <!-- 场馆钱包 -->
    <span class="title" v-show="showTransfer">VÍ TIỀN SẢNH</span>
    <div class="venue-wallet">
      <CgContainer v-for="wallet in wallets" :key="wallet.id" type='smallContainer' radius="12" width="205">
        <template #content>
          <CgContainerHead height="34">
            <template #center>
              <span class="venue-name">{{ wallet.wallet_name }}</span>
            </template>
          </CgContainerHead>
          <div class="venue-money">
            <cg-amount :amount="wallet.amount" size="17" weight="700" color="blue12" segmentation />
          </div>
          <template v-if="showTransfer && !fadeAuto">
            <cg-divider />
            <div class="transfer-box">
              <div class="in" @click="oneKeyTransfer(wallet.id)">CHUYỂN VÀO</div>
              <cg-divider direction="vertical" />
              <div class="out" @click="oneKeyOutTransfer(wallet)">CHUYỂN RA</div>
            </div>
          </template>
          <cg-maintain type="wallet" v-if="!wallet.enable" />
        </template>
      </CgContainer>
    </div>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'WalletCenter'
}
</script>

<style lang='scss' scoped>
.app-wallet-center {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;

  .wrapper {
    width: 430px;
    height: 100px;
    padding: 0 20px 0 17px;
    display: flex;
    align-items: center;

    .money-box {
      display: flex;
      flex-direction: column;
      flex: 1;

      label {
        font-size: var(--cg-font-17);
      }
    }
  }
}

.title {
  color: var(--cg-color-grey1);
  display: block;
  font-size: var(--cg-font-17);
  margin-bottom: 10px;
}

.venue-wallet {
  min-height: 400px;
  color: var(--cg-color-grey1);
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px 20px;

  .venue-name {
    font-weight: 400;
    font-size: var(--cg-font-15);
  }

  .venue-money {
    height: 47.82px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--cg-color-blue12);
    font: var(--cg-font-text2);
  }

  .transfer-box {
    height: 36px;
    display: flex;

    .in,
    .out {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font: var(--cg-font-text9);
      cursor: pointer;

      &:hover {
        background: var(--cg-gradient-blue2-button);
        color: var(--cg-color-white);
      }
    }

    .in {
      color: var(--cg-color-blue12);
    }
  }
}
</style>