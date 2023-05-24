<script setup lang="ts">
import { computed, ref } from 'vue';
import { CgField, CgIcon, CgButton, CgSelect, CgDivider } from '@/components/cg-template-2'; // , CgInput
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { useLoading } from '@/hooks/useLoading';
import APIs from '@/http/blue-apis';
import { Toast } from 'vant';
import { useI18n } from 'vue-i18n';
import { find } from 'lodash';

const userStore = userInfoStateStore();
const wallets = computed(() => userStore.wallets);
const { t } = useI18n();

//  中心钱包余额
const balance = computed(() => userStore.userInfo.balance);

const { startLoading, closeLoading } = useLoading();

// 自选转账
const selfTrans = ref({
  w_from: '',
  w_to: ''
});

// 输入框自定义金额
const customAmount = ref('');

const cgFieldRef = ref();

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
  if (!validateAmount.value) return true;
  return false;
});

const selfWallets = computed(() => {
  const arr = wallets.value
    .filter(v => v.enable)
    .map(v => ({ label: v.wallet_name, value: v.wallet_id }));
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

const selectChanged = (ty: string, val: any) => {
  if (ty === 'w_from') {
    selfTrans.value.w_from = val.value;
    selfTrans.value.w_to = '';
  } else {
    selfTrans.value.w_from = '';
    selfTrans.value.w_to = val.value;
  }
};

// 根据场馆ID获取余额
const getBalanceByPlatId = (i: any) => {
  if (i.wallet_id) {
    return new Promise((resolve, reject) => {
      APIs.getBalanceByVenueId(i.wallet_id)
        .then(res => {
          wallets.value.forEach(item => {
            if (item.wallet_id === i.wallet_id) {
              item.amount = res;
            }
          });
          resolve(res);
        })
        .catch(() => reject());
    });
  }
};

const transfer = (params: { ty: 1 | 2; pid: string }): void => {
  startLoading();
  const { ty, pid } = params;
  APIs.transfer({ ty, pid, amount: +customAmount.value })
    .then(res => {
      Toast(t('transfer.succes'));
      const item = find(wallets.value, o => o.wallet_id === pid);
      if (item) getBalanceByPlatId(item);
      userStore.RefreshBalance();
    })
    .finally(() => {
      closeLoading();
      customAmount.value = '';
    });
};

const amountInputHandler = (e: InputEvent) => {
  const value = parseFloat((e.target as HTMLInputElement).value);
  if (value > parseFloat(transferLimit.value.max)) {
    customAmount.value = transferLimit.value.max;
  }
};

const enterHandler = () => {
  cgFieldRef.value.blur();
};

</script>
<template>
  <!-- 自选转账 -->
  <div class="self-trans-page">
    <div class="self-trans-amount">
      <div class="self-wallets">
        <div class="select-box">
          <div v-if="!selfTrans.w_from" class="fake-value">Ví Tiền Chính</div>
          <cg-select
            v-model="selfTrans.w_from"
            :placeholder="''"
            selectLeftText="HỦY BỎ"
            selectRightText="XÁC NHẬN"
            rowKey="value"
            :data="selfWallets"
            @on-ok="(val: any) => selectChanged('w_from', val)"
          />
        </div>
        <app-image class="arrow" src="/icon/i_arrowr_bold.png" />
        <div class="select-box" :class="{'no-wallets': !selfWallets || selfWallets.length === 0}">
          <div v-if="!selfTrans.w_to && selfWallets.length" class="fake-value">Ví Tiền Chính</div>
          <cg-select
            v-model="selfTrans.w_to"
            :placeholder="selfWallets.length ? '' : 'Đang bảo trì...'"
            selectLeftText="HỦY BỎ"
            selectRightText="XÁC NHẬN"
            rowKey="value"
            :data="selfWallets"
            @on-ok="(val: any) => selectChanged('w_to', val)"
          />
        </div>
      </div>
      <p class="desc"><span>＊</span>Không hỗ trợ chuyển khoản giữa các ví tiền sảnh</p>
      <div class="pay-info">
        <CgField
          ref="cgFieldRef"
          v-model="customAmount"
          type="digit"
          :isMoney="true"
          :showK="true"
          @keyup.enter="enterHandler"
          @input="amountInputHandler"
          :maxLength="9"
          :placeholder="`Vui lòng nhập số tiền chuyển khoản`"
          :limit="/^0\d*$/g"
        >
          <!-- :pattern="/^[1-9]\d*$/" -->
          <template #left>
            <cg-icon width="52" name="i_amount" />
          </template>
          <!-- <template #right>
              <div class="show-money" v-show="amount">
                ={{ formatNumberToCurrencyWithoutK(`${amount}000`) }}đ
              </div>
            </template> -->
        </CgField>
        <!-- 存款金额范围提示 -->
        <div v-show="+customAmount && !validateAmount" class="pay-warn">
          Số tiền chuyển khoản không được lớn hơn số dư tài khoản
        </div>
      </div>
    </div>
    <CgDivider />
    <cg-button class="btn-bot" :disabled="disablePay || isWalletEmpty" @click="transferHandler" width="686">
      CHUYỂN KHOẢN NGAY
    </cg-button>
  </div>

  <!-- <div>
    <cg-input :value="testNum" placeholder="请输入金额哈哈哈" @input="ninput" />
  </div> -->
</template>
<script lang="ts">
export default {
  name: 'SelfTransfer'
};
</script>

<style lang="scss" scoped>
.self-trans-page {
  button.btn-bot {
    margin: 32px auto 0;
  }
}
.self-trans-amount {
  padding: 20px 32px;
  background-color: var(--cg-color-white);
  .self-wallets {
    display: flex;
    align-items: center;
    .select-box {
      position: relative;
      .fake-value {
        position: absolute;
        width: 100%;
        height: 100%;
        color: var(--cg-color-black1);
        font: var(--cg-font-text1);
        padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
        display: flex;
        justify-content: center;
        flex-direction: column;
      }
      &.no-wallets {
        :deep(.cg_field .van-field__control) {
          font: var(--cg-font-text2) !important;
        }
      }
    }
    .arrow {
      width: 70px;
      height: 40px;
      margin: 0 17px 0 18px;
    }
    :deep(.van-field__control) {
      font: var(--cg-font-text7) !important;
      // &::placeholder {
      //   font: var(--cg-font-text1) !important;
      //   color: var(--cg-color-black1) !important;
      // }
    }
  }
  .desc {
    padding: 20px 0;
    font: var(--cg-font-text2);
    line-height: 30px;
    span {
      color: var(--cg-color-red2);
    }
  }
  .pay-warn {
    padding-top: 20px;
    font: var(--cg-font-text2);
    line-height: 30px;
    color: var(--cg-color-red2);
  }
}
.expand {
  height: 1150px;
}
.panel-wrapper {
  position: relative;
  z-index: 1;
  background-color: var(--cg-color-blue16);

  .expand-block {
    width: 100%;
    height: 44px;
    background-image: var(--cg-wallet-expand);
    border-radius: 0 0 var(--cg-border-radius) var(--cg-border-radius);
    border-bottom: 2px solid var(--cg-color-blue18);
    font: var(--cg-font-text2);
    display: flex;
    justify-content: center;
    margin-bottom: 40px;

    .expand-btn {
      width: 196px;
      height: 58px;
      background-image: var(--cg-wallet-expand);
      border-radius: 0 0 var(--cg-border-radius) var(--cg-border-radius);
      border-bottom: 2px solid var(--cg-color-blue18);
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        margin-right: 7px;
      }
    }
  }

  .body {
    padding: 10px 30px 100px;
  }
}
</style>
