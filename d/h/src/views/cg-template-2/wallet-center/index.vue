<script setup lang='ts'>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { CgIcon, CgContainer, CgContainerHead, CgButton, CgDivider, CgAmount, CgMaintain, CgRefresh } from '@/components/cg-template-2';
import { Toast } from 'vant'
import { useI18n } from 'vue-i18n';
import { uniqBy, find, cloneDeep, sumBy, toNumber } from 'lodash'
import APIs from '@/http/blue-apis';
import { userInfoStateStore } from '@/store-pinia/userInfo'
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call'
import TransferWait from '../wallet-center/transfer-wait.vue'
import TransferFail from './transfer-fail.vue'
import bus from '@/utils/bus';
import { useLoading } from '@/hooks/useLoading';

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
  showTitle?: boolean // 是否显示场馆钱包标题
  small?: boolean // 小场馆钱包布局，一行3个
  isMyWallet?: boolean // 是否我的钱包页面
  isTransfer?: boolean
}
const Dialog = new CgDialogClass()
const emit = defineEmits(['setAutomaticTransfer', 'totalVenueAmount'])
const props = withDefaults(defineProps<Props>(), { showTransfer: true, showTitle: true })
const { startLoading, closeLoading } = useLoading();

const { t } = useI18n();
const userStore = userInfoStateStore()
// 是否开启假免转
const fadeAuto = computed(() => userStore.userInfo.automatic === 1)
//  中心钱包余额
const balance = computed(() => userStore.userInfo.balance)
const lock_amount = computed(() => userStore.userInfo.lock_amount)
const totalVenueAmount = computed(() => sumBy(wallets.value, (o: any) => toNumber(o.amount)));

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
// 已完成余额查询
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
    const item = find(wallets.value, (o: any) => o.wallet_id === pid);
    if (item) getBalanceByPlatId(item);
    userStore.RefreshBalance()
  })
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

// 一键回收沙漏⏳弹窗计时，最少500毫秒
const TransferWaitStartTime = ref(0)
// 中心钱包
const cyclicCall = (list: Array<any>, needEmit?: boolean) => {
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

        // 关闭沙漏⏳
        const TransferWaitEndTime = Date.now()
        if (TransferWaitEndTime - TransferWaitStartTime.value < 1000) {
          const t = setTimeout(() => {
            Dialog.closeDialog()
            clearTimeout(t)
          }, 1000 - (TransferWaitEndTime - TransferWaitStartTime.value));
        } else {
          Dialog.closeDialog()
        }

        if (needEmit) {
          emit('setAutomaticTransfer')
        }
        if (!errList.value.length) {
          Toast(t('plat_list.succes'));
        } else {
          Dialog.showDialog({
            template: 'tmp2',
            customComponent: TransferFail,
            btns: 1,
            props: { errList: errList.value }
          })
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
  const list = wallets.value.filter(i => i.id && Number(i.amount) >= 1 && i.enable );

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
  TransferWaitStartTime.value = Date.now()

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
// 我的钱包更新总余额
const stopWatch2 = watch(totalVenueAmount, (a) => {
  if (props.isMyWallet && a) {
    emit('totalVenueAmount', totalVenueAmount.value)
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
  stopWatch2()
})
</script>
<template>
  <div class="wallet-center">
    <!-- 中心钱包 -->
    <CgContainer margin="26,0,0,0">
      <CgContainerHead height="80">
        <template #center>
          <div class="center-wallet-head">
            <div class="flex ai-c">
              <label style="margin-right: var(--cg-px-21);">SỐ TIỀN TRÊN VÍ</label>
              <CgRefresh width="48" height="48" />
            </div>
            <CgButton mini width="132" @click="recover(false)">THU HỒI</CgButton>
          </div>
        </template>
      </CgContainerHead>
      <div class="wallets">
        <div class="center">
          <CgIcon class="icon" width="92" name="i_wallet" />
          <span class="name">VÍ TIỀN CHÍNH</span>
          <CgAmount suffix="K" segmentation :amount="balance" size="28" weight="700" color="red4" />
        </div>
        <CgDivider style="height: var(--cg-px-164);" direction="vertical" />
        <div class="lock">
          <CgIcon class="icon" width="92" name="i_lock_wallet" />
          <span class="name">KHOÁ VÍ TIỀN</span>
          <CgAmount suffix="K" segmentation :amount="lock_amount" size="28" weight="700" color="red4" />
        </div>
      </div>
    </CgContainer>

    <!-- 场馆钱包 -->
    <h6 v-if="showTitle">VÍ TIỀN SẢNH</h6>
    <div class="venue-wallet" :class="{ small }">
      <CgContainer v-for="wallet in wallets" :key="wallet.id">
        <CgContainerHead padding="0" height="60">
          <template #center>
            <span class="venue-name">{{ wallet.wallet_name }}</span>
          </template>
        </CgContainerHead>
        <div class="venue-amount">
          <CgAmount v-if="small" segmentation suffix="K" :amount="wallet.amount" size="24" weight="700" color="blue1" />
          <CgAmount v-else segmentation suffix="K" :amount="wallet.amount" size="28" weight="700" color="blue1" />
        </div>
        <template v-if="showTransfer && !fadeAuto">
          <CgDivider />
          <div class="transfer-box">
            <div class="in" @click="oneKeyTransfer(wallet.id)">CHUYỂN VÀO</div>
            <CgDivider direction="vertical" />
            <div class="out" @click="oneKeyOutTransfer(wallet)">CHUYỂN RA</div>
          </div>
        </template>
        <CgMaintain type="wallet" :small="small" v-if="!wallet.enable" />
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
.wallet-center {
  width: 100%;
  padding: 0 32px;
  .cg-maintain {
    z-index: 1;
  }
  .center-wallet-head {
    width: 682px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
  }

  .wallets {
    width: 100%;
    height: 228px;
    display: flex;
    font: var(--cg-font-text9);
    padding-top: 30px;

    .center,
    .lock {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      .icon {
        margin-bottom: 5px;
      }

      .name {
        margin-bottom: 10px;
      }

    }
  }

  h6 {
    font: var(--cg-font-text1);
    margin-top: 24px;
  }

  .venue-wallet {
    margin-top: 26px;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 24px 22px;

    .venue-name {
      display: block;
      text-align: center;
      font: var(--cg-font-text8);
      white-space: nowrap;
    }

    .venue-amount {
      height: 72px;
      text-align: center;
      line-height: 72px;
    }

    .transfer-box {
      height: 60px;
      display: flex;
      align-items: center;

      .in,
      .out {
        flex: 1;
        font: var(--cg-font-text10);
        text-align: center;
      }

      .in {
        color: var(--cg-color-blue1);
      }
    }
  }

  .small {
    grid-template-columns: repeat(3, 1fr);

    .venue-name {
      font: var(--cg-font-text8);
    }
  }
}
</style>