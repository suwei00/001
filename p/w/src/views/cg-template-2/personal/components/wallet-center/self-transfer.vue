<script setup lang='ts'>
import { computed, ref } from 'vue'
import { CgAmountInput, CgIcon, CgButton, CgSelect } from '@/components/cg-template-2'
import { userInfoStateStore } from '@/store-pinia/userInfo'
import { useLoading } from '@/hooks/useLoading'
import APIs from '@/http/blue-apis'
import Toast from '@/components/cg-template-2/toast';
import { useI18n } from 'vue-i18n';
import { find } from 'lodash'

const userStore = userInfoStateStore()
const wallets = computed(() => userStore.wallets);
const { t } = useI18n();

//  中心钱包余额
const balance = computed(() => userStore.userInfo.balance)

const { startLoading, closeLoading } = useLoading()

// 自选转账
const selfTrans = ref({
  w_from: '',
  w_to: ''
});

// 输入框自定义金额
const customAmount = ref('');

// 判断金额是否合法，存款金额是否在最小和最大值之间
const validateAmount = computed(() => {
  const amt = parseFloat(customAmount.value);
  return amt >= parseFloat(transferLimit.value.min) && amt <= parseFloat(transferLimit.value.max);
});

// 转账金额的最大值，最小值
const transferLimit = computed(() => {
  if (!selfTrans.value.w_from && selfTrans.value.w_to) {
    return { min: '1', max: Math.floor(+balance.value) + '' };
  } else if (selfTrans.value.w_from && !selfTrans.value.w_to) {
    return { min: '1', max: wallets.value.filter(f => f.wallet_id === selfTrans.value.w_from)[0].amount + '' };
  } else {
    return { min: '1', max: '0' };
  }
});

// 存款按钮是否禁用
const disablePay = computed(() => {
  // 金额不合法，禁用
  if (!validateAmount.value || isWalletEmpty.value) return true;
  return false;
});

const selfWallets = computed(() => {
  const arr = wallets.value.filter(v => v.enable).map(v => ({label: v.wallet_name, value: v.wallet_id}));
  if (arr && arr.length) {
    selfTrans.value.w_from = '';
    selfTrans.value.w_to = arr[0].value;
  }
  return arr;
});

const isWalletEmpty = computed(() => {
  return !selfWallets.value || selfWallets.value.length === 0;
})

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

// 存款操作
const transferHandler = async () => {
  // 转到中心钱包
  if (selfTrans.value.w_from) {
    oneKeyOutTransfer(wallets.value.filter(i => i.wallet_id === selfTrans.value.w_from)[0] || {});
  } else {
    oneKeyTransfer(selfTrans.value.w_to);
  }
};

const selectChanged = (t: string) => {
  if (t === 'w_from') {
    selfTrans.value.w_to = '';
  } else {
    selfTrans.value.w_from = '';
  }
}

// 根据场馆ID获取余额
const getBalanceByPlatId = (i: any) => {
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

const transfer = (params: { ty: 1 | 2; pid: string }): void => {
  startLoading();
  const { ty, pid } = params;
  APIs.transfer({ ty, pid, amount: +customAmount.value }).then(res => {
    Toast(t('transfer.succes'));
    const item = find(wallets.value, o => o.wallet_id === pid);
    if (item) getBalanceByPlatId(item);
    userStore.RefreshBalance()
  }).finally(() => {
    closeLoading();
    customAmount.value = '';
  });
};

</script>
<template>
  <!-- 自选转账 -->
  <div class="self-trans-amount">
    <div class="self-wallets">
      <cg-select v-model="selfTrans.w_from" :placeholder="'Ví Tiền Chính'" :options="selfWallets" class="special-placeholder select-width" @change="() => selectChanged('w_from')" />
      <app-image class="arrow" src="/icon/i_arrowright_bold.png" width="35" />
      <cg-select v-model="selfTrans.w_to" :disabled="isWalletEmpty" :placeholder="isWalletEmpty ? 'Đang bảo trì...' : 'Ví Tiền Chính'" :options="selfWallets" class="special-placeholder select-width" @change="() => selectChanged('w_to')" />
    </div>
    <p class="desc"><span>＊</span>Không hỗ trợ chuyển khoản giữa các ví tiền sảnh</p>
    <div class="pay-info">
      <label class="title">SỐ TIỀN CHUYỂN KHOẢN</label>
      <cg-amount-input style="margin-right: 10px;" v-model="customAmount" :maxLength="30" :precision="0"
        :maxAmount="transferLimit.max" :placeholder="`Vui lòng nhập số tiền chuyển khoản`" :limit-max="true" />
      <!-- 存款金额范围提示 -->
      <div v-show="+customAmount && !validateAmount" class="pay-warn">
        Số tiền chuyển khoản không được lớn hơn số dư tài khoản
      </div>
      <cg-button :disabled="disablePay" @click="transferHandler" width="300">
        CHUYỂN KHOẢN NGAY
      </cg-button>
    </div>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'SelfTransfer'
}
</script>

<style lang='scss' scoped>
:deep(.special-placeholder) {
  .el-input__inner::placeholder {
    color: var(--cg-color-grey1);
  }
}

.self-trans-amount {
  padding: 30px;
  padding-top: 16px;
  :deep(.el-input.is-disabled .el-input__inner) {
    color: var(--cg-color-grey5);
    background-color: var(--cg-color-blue11);
  }
  :deep(.special-placeholder) {
    .el-input.is-disabled .el-input__inner::placeholder {
      color: var(--cg-color-grey5);
    }
  }
  .self-wallets {
    .select-width {
      width: 210px !important;
    }
    .arrow {
      margin: 0 11px 0 13px;
      vertical-align: middle;
    }
  }
  .desc {
    font: var(--cg-font-text);
    line-height: 17px;
    color: var(--cg-color-grey1);
    padding: 12px 0;
    span {
      color: var(--cg-color-red);
    }
  }
}

.pay-info {
  display: flex;
  flex-direction: column;

  .title {
    padding-top: 18px;
    padding-bottom: 12px;
    font: var(--cg-font-text4);
    line-height: 20px;
    color: var(--cg-color-grey1);
  }

  .pay-warn {
    padding-top: 6px;
    font: var(--cg-font-text6);
    color: var(--cg-color-red);
  }

  .tips {
    margin-top: 12px;
    margin-bottom: 28px;

    p:nth-of-type(1) {
      font-weight: 700;

      span {
        font-weight: 400;
      }
    }

    span {
      color: var(--cg-color-red);
    }
  }
  button {
    margin-top: 30px;
    margin-bottom: 23px;
  }
}
</style>