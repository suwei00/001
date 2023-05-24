<script setup lang="ts">
import { ref, computed, inject, onBeforeUnmount, onMounted, onBeforeUpdate } from 'vue';
import PersonalTitle from '../components/personal-title/index.vue';
import WalletCenter from '../components/wallet-center/index.vue';
import FinancePopup from '../components/finance-popup/index.vue';
import { CgIcon, CgContainer, CgContainerHead, CgRadio, CgDivider, CgAmountInput, CgButton, CgMaintain, CgTab } from '@/components/cg-template-2';
import FirstWithdrawDialog from './first-withdraw-dialog.vue';
import UsdtWithdraw from './usdt-withdraw.vue';

import { formatNumberToCurrency } from '@/utils/format';
import { timeStampToVietnam } from '@/utils/time';
import { pullAt, toNumber } from 'lodash';
import APIs from '@/http/blue-apis';
import Toast from '@/components/cg-template-2/toast';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { useAppStore } from '@/store-pinia';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useWebNotification } from '@vueuse/core';
import { getCustomerServeUrl } from '@/utils/common';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call';
import { useLoading } from '@/hooks/useLoading';
import bus from '@/mixins/bus';

const Dialog = new CgDialogClass();
const router = useRouter();
const appStore = useAppStore();
const userStore = userInfoStateStore();
const { userInfo, usdtCardList } = storeToRefs(userStore);
const reloadPage = inject<() => void>('reloadPage');
const { startLoading, closeLoading } = useLoading();

// 是否展开
const expand = ref(false);

// 银行卡列表获取
const isBankCardExpand = ref(false);
const handleBankCardExpand = () => {
  if (bankCardList.value.length < 2) return;
  isBankCardExpand.value = !isBankCardExpand.value;
};
const bankCardList = ref<any[]>([]);
const bankCardIndex = ref(0);

const activeTabIndex = ref('1');
const navList = computed(() => [
  { value: '1', name: `Rút tiền bằng thẻ ngân hàng (${bankCardList.value.length}/5)` },
  { value: '2', name: `RÚT TIỀN BẰNG USDT (${usdtCardList.value.length}/5)` }
]);

// 提交提现时查询银行卡列表并判断更新对应银行卡的状态
const updateBankState = (id: string) => {
  return new Promise((resolve, reject) => {
    APIs.getBanksCardList()
      .then(res => {
        if (res && res.length) {
          const tmp = res.filter(r => r.id === id)[0];
          for (let j = 0; j < bankCardList.value.length; j++) {
            const b = bankCardList.value[j];
            if (b.id === id) {
              b.state = tmp ? tmp.state : b.state;
              if (+b.state !== 1) {
                Toast('Tài Khoản Đã Bị Vô Hiệu Hoá');
                reject();
                return;
              }
            }
          }
        }
        resolve(true);
      })
      .catch(() => {
        resolve(true);
      });
  });
};

const getBankList = () => {
  APIs.getBanksCardList().then(res => {
    if (res) {
      bankCardList.value = res;

      // 将上次使用的银行卡排到第一位
      const usedID = localStorage.getItem('USEDBANKSW');
      if (usedID) {
        const lastBankIndex = bankCardList.value.findIndex(item => item.bank_id === usedID);
        if (lastBankIndex > -1) {
          bankCardList.value.unshift(pullAt(bankCardList.value, lastBankIndex)[0]);
        } else {
          localStorage.removeItem('USEDBANKSW');
        }
      }

      // 检查银行是否维护
      const ids = bankCardList.value.map(d => d.bank_id);
      if (ids.length > 0) {
        APIs.getBanksMaintainList({ id: ids.join(',') }).then(res => {
          bankCardList.value = bankCardList.value.map(bank => {
            return { ...bank, maintain: res[bank.bank_id] };
          });

          const index = bankCardList.value.findIndex((item: any) => {
            return item.maintain === '1';
          });
          if (index > -1) {
            bankCardIndex.value = index;
          }
        });
      }
    }
  });
};
getBankList();

// 选择银行卡
const currentBankCard = computed(() => bankCardList.value[bankCardIndex.value]);
const onChooseBank = (index: number) => {
  bankCardIndex.value = index;
  handleBankCardExpand();
};

// 获取进行中的 订单详情
const isWithdrawing = ref(false);
const withdrawDetail = ref({
  amount: 0,
  bid: '',
  created_at: 0,
  id: '',
  state: 0
});
function getWithdrawDetail() {
  APIs.memberWithdrawProcessing().then(res => {
    if (res) {
      withdrawDetail.value = res;
      if (res.id) {
        isWithdrawing.value = true;
      }
    }
  });
}

// 取款
const min = 10;
const withdrawAmount = ref('');
const withdrawTips = computed(() => {
  if (!withdrawAmount.value) return '';
  const val = toNumber(withdrawAmount.value);
  if (val < min) return 'Vui lòng dựa vào phạm vi hạn mức nhập số tiền chính xác';
  if (val > toNumber(userInfo.value.balance)) return 'Số dư ví tiền chính không đủ';
});
// 选择最大金额
const max = computed(() => userInfo.value.balance.split('.')[0]);
const onMaxAmount = () => {
  withdrawAmount.value = userInfo.value.balance.split('.')[0];
};
const dispatchWithdraw = (querys: any) => {
  startLoading();
  // 检查提现银行是否正在维护
  const bankID = currentBankCard.value.bank_id;
  updateBankState(currentBankCard.value.id)
    .then(() => {
      APIs.getBanksMaintainList({ id: bankID })
        .then(res => {
          // 正常
          if (res[bankID] === '1') {
            const params = {
              bid: currentBankCard.value.id, // 银行卡ID
              amount: Number(withdrawAmount.value), // 金额
              ...querys
            };
            APIs.withdraw(params)
              .then((res: any) => {
                Toast('Thực Hiện Thành Công');
                getWithdrawDetail();

                // 本地保存请求成功的银行ID
                localStorage.setItem('USEDBANKSW', currentBankCard.value.bank_id);
                userStore.RefreshBalance();
              })
              .catch((err: any) => {
                // 第一笔提款
                if (err === '1273') {
                  Dialog.showDialog({
                    template: 'tmp2',
                    title: 'SỐ ĐIỆN THOẠI XÁC NHẬN',
                    customComponent: FirstWithdrawDialog,
                    btns: 0,
                    props: {
                      onOk(querys: any) {
                        dispatchWithdraw(querys);
                      },
                      close: () => Dialog.closeDialog()
                    }
                  });
                }
              })
              .finally(() => {
                closeLoading();
              });
          }
          // 维护
          else if (res[bankID] === '0') {
            closeLoading();
            Toast('Ngân Hàng Đang Bảo Trì, Vui Lòng Chọn Hoặc Liên Kiết Ngân Hàng Khác');
            reloadPage?.();
          }
        })
        .catch(() => {
          closeLoading();
        });
    })
    .catch(() => {
      closeLoading();
    });
};

// 监听mqtt取款消息
const Dialog2 = new CgDialogClass();
const handleNatsWithdrawals = ({ status, amount, ts }: any) => {
  // 失败和成功的业务逻辑
  const operate = (chromeNoticeClick?: boolean) => {
    if (chromeNoticeClick) {
      Dialog2.closeDialog();
      window.focus();
    }
    if (status === 'success') {
      router.push('/');
    } else {
      reloadPage?.();
    }
  };

  // mqtt充值弹窗
  userStore.RefreshBalance();
  Dialog2.showDialog({
    template: 'tmp2',
    customComponent: FinancePopup,
    btns: status === 'success' ? 1 : 2,
    cancelText: status === 'success' ? '' : 'Tôi Đã Hiểu',
    confirmText: status === 'success' ? 'XÁC NHẬN' : 'CSKH',
    props: { status, type: 'withdraw', amount, time: ts },
    onOk() {
      if (status === 'failed') {
        const t = setTimeout(() => {
          window.open(getCustomerServeUrl(), '_blank');
          clearTimeout(t);
        }, 10);
      }
      reloadPage?.();
    },
    onCancel() {
      reloadPage?.();
    }
  });

  const body = (status === 'success' ? 'Rút Tiền Thành Công' : 'Rút Tiền Không Thành Công ').toUpperCase();
  const { isSupported, show, onClick } = useWebNotification({
    body,
    dir: 'auto',
    lang: 'en',
    renotify: true,
    tag: 'test'
  });
  if (isSupported) {
    show();
  }
  // chorme 通知点击
  onClick.on(() => operate(true));
};
// 流水详情
const goToDetail = () => {
  router.push({
    path: '/withdraw/detail'
  });
};

const tabChanged = (e: any) => {
  if (+e === 2) {
    if (!bankCardList.value || !bankCardList.value.length) {
      Dialog.showDialog({
        title: 'LƯU Ý',
        template: 'tmp1',
        tmp1Content: 'Vui Lòng Liên Kết Thẻ Ngân Hàng Trước',
        showClose: false,
        btns: 1,
        onOk: () => {
          router.push('/personal/banks?index=1');
        }
      });
    }
  }
};

onMounted(() => {
  bus.on('withdrawals', handleNatsWithdrawals);
  getWithdrawDetail();

  userStore.getUsdtCardList();
});
onBeforeUnmount(() => {
  bus.off('withdrawals');
});
</script>
<template>
  <div class="withdraw">
    <personal-title title="RÚT TIỀN" description="Mỗi Đơn Rút Tiền Chỉ Tốn Từ 3 -15 Phút. Nếu Quá 30 Phút Mà Tài Khoản Của Bạn Chưa Nhận Được Tiền, Vui Lòng Liên Hệ CSKH Để Kiểm Tra" />
    <WalletCenter isWithdraw :show-transfer="false" />

    <!-- 操作 -->
    <div class="panel-wrapper" :class="{ expand }">
      <!-- 展开、收起 -->
      <div class="expand-wrapper">
        <app-image src="/withdraw/expand.png" />
        <div @click="expand = !expand" class="expand-btn">
          {{ expand ? 'Ẩn Bớt' : 'Hiện Thêm' }}
          <cg-icon style="margin-left: 6px" width="11.43" :name="`i_expand_${expand ? 'up' : 'down'}`" />
        </div>
      </div>

      <!-- 提款 -->
      <section class="main">
        <template v-if="!isWithdrawing">
          <!-- <span class="title">THẺ NGÂN HÀNG（{{ bankCardList.length }}/5）</span> -->
          <!-- <div class="tab-box">
            <cg-tab padding="0" v-model="activeTabIndex" :list="navList" @on-change="tabChanged"></cg-tab>
          </div> -->
          <div class="tabs-content">
            <Transition name="custom-classes" enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
              <div v-show="activeTabIndex === '1'" class="tab-slider">
                <!-- 银行卡列表 -->
                <CgContainer v-if="bankCardList.length" padding="6,7" radius="8" type="smallContainer">
                  <template #content>
                    <!-- 当前选中的 -->
                    <div v-if="!isBankCardExpand" class="bank-item-wrapper" :class="{ pointer: bankCardList.length > 1 }" @click="handleBankCardExpand">
                      <div class="bank-item">
                        <div class="bank-logo">
                          <img :src="appStore.getBankLogoByBankId(currentBankCard.bank_id)" alt="" />
                        </div>
                        <div class="bank-info">
                          <div class="bank-name">
                            {{ appStore.getBankNameById(currentBankCard.bank_id) }}
                          </div>
                          <div style="text-align: right">
                            <span>{{ currentBankCard.realname }}</span
                            ><br />
                            <span>{{ currentBankCard.bank_card?.replace(/\*+/g, '*') }}</span>
                          </div>
                        </div>

                        <!-- usdt 只有停用没有维护状态 -->
                        <!-- 停用 -->
                        <!-- <cg-maintain v-if="+currentBankCard.state === 2" type="bankstop" />
                        <template v-else> -->
                          <!-- 维护 -->
                          <cg-maintain v-if="currentBankCard.maintain === '0'" type="bank" />
                        <!-- </template> -->
                        <!-- 展开更多银行 -->
                        <CgIcon v-show="bankCardList.length > 1" class="more-banks" width="18.27" name="i_arrow_down" />
                      </div>
                    </div>
                    <!-- 下拉框 -->
                    <CgRadio v-else type="bank" v-model="bankCardIndex" :list="isBankCardExpand ? bankCardList : bankCardList.slice(0, 1)" @onChoose="onChooseBank" v-slot="{ data, index }">
                      <div class="bank-item">
                        <div class="bank-logo">
                          <img :src="appStore.getBankLogoByBankId(data.bank_id)" alt="" />
                        </div>
                        <div class="bank-info">
                          <div class="bank-name">
                            {{ appStore.getBankNameById(data.bank_id) }}
                          </div>
                          <div style="text-align: right">
                            <span>{{ data.realname }}</span
                            ><br />
                            <span>{{ data.bank_card?.replace(/\*+/g, '*') }}</span>
                          </div>
                        </div>

                        <!-- 银行卡停用 -->
                        <!-- <cg-maintain v-if="+data.state === 2" type="bankstop" />
                        <template v-else> -->
                          <!-- usdt 只有停用没有维护状态 -->
                          <!-- 非停用状态展示维护 -->
                          <cg-maintain v-if="data.maintain === '0'" type="bank" />
                        <!-- </template> -->
                        <!-- 展开更多银行 -->
                        <CgIcon v-show="bankCardList.length > 1 && index === 0" @click="handleBankCardExpand" class="more-banks" width="18.27" name="i_arrow_up" />
                      </div>
                    </CgRadio>
                    <div v-show="isBankCardExpand && bankCardList.length < 5" class="new-bank" @click="$router.push('/personal/banks')">
                      <span class="plus">+</span>
                      Liên kết ngân hàng
                    </div>
                  </template>
                </CgContainer>
                <!-- 添加银行卡 小于2张银行卡时 -->
                <CgContainer v-if="bankCardList.length < 2" margin="7,0,0,0" height="80" padding="6,7" radius="8" type="smallContainer">
                  <template #content>
                    <div class="new-bank" @click="$router.push('/personal/banks')">
                      <span class="plus">+</span>
                      {{
                        bankCardList.length === 0
                          ? 'Liên kết ngân hàng'
                          : `VUI LÒNG LIÊN KẾT THÊM THẺ NGÂN HÀNG, RÚT TIỀN SẼ
                                      THUẬN TIỆN HƠN`
                      }}
                    </div>
                  </template>
                </CgContainer>
                <!-- 没有银行卡 -->
                <p v-if="bankCardList.length === 0" class="no-card-tip">
                  <span>＊</span>Bạn chưa liên kết thẻ ngân hàng, vì sự an toàn tiền của bạn, khi liên kết thẻ ngân hàng, cần điền thông tin cá nhân của bạn
                </p>
                <template v-if="bankCardList.length > 0">
                  <CgDivider margin="16px 0" />
                  <div class="add_amountdetail flex">
                    <CgAmountInput @onRight="onMaxAmount" showMoney isRight placeholder="Số tiền rút thấp nhất 10K VND" inputWidth="500px" v-model="withdrawAmount" :maxAmount="max" :precision="0" />
                    <!-- 流水详情 -->
                    <div class="flowing_water flex-middle" @click="goToDetail()">
                      <cg-icon name="i_flow_water" width="30"></cg-icon>
                      Chi Tiết Tiền Cược Yêu Cầu
                    </div>
                  </div>
                  <span class="withdrawTips">{{ withdrawTips }}</span>
                  <cg-button style="margin-top: 30px" width="300" :disabled="!withdrawAmount || !!withdrawTips" @click="dispatchWithdraw">RÚT TIỀN</cg-button>
                </template>
              </div>
            </Transition>
            <Transition name="custom-classes" enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
              <div v-show="activeTabIndex === '2'" class="tab-slider">
                <usdt-withdraw />
              </div>
            </Transition>
          </div>
        </template>
        <!-- 提款详情 -->
        <template v-else>
          <span class="title">Chi tiết rút tiền</span>
          <CgContainer type="smallContainer" radius="8">
            <template #content>
              <CgContainerHead height="70">
                <template #center>
                  <div class="flex fdr-c ai-c">
                    <span class="detail-title">Bạn có một đơn rút tiền đang trong quá trình giải quyết. Vui lòng chờ đợi</span>
                    <span class="detail-amount">{{ formatNumberToCurrency(`${withdrawDetail.amount}`, '') }}</span>
                  </div>
                </template>
              </CgContainerHead>
              <div style="margin: 30px">
                <CgContainer radius="8">
                  <template #content>
                    <div class="detail-item">
                      <label>Loại Giao Dịch</label>
                      <span>Rút Tiền</span>
                    </div>
                    <!-- 状态 -->
                    <div class="detail-item">
                      <label>Trạng Thái</label>
                      <span class="capitalize" style="color: var(--cg-color-orange); font-weight: 700">{{ $t(`state.T${withdrawDetail.state}`) }}</span>
                    </div>
                    <div class="detail-item">
                      <label>Thời Gian Giao Dịch</label>
                      <span>{{ timeStampToVietnam(withdrawDetail.created_at * 1000) }}</span>
                    </div>
                    <div class="detail-item">
                      <label>Số Đơn</label>
                      <span>{{ withdrawDetail.id }}</span>
                    </div>
                  </template>
                </CgContainer>
              </div>
            </template>
          </CgContainer>
        </template>
      </section>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Withdraw'
};
</script>

<style lang="scss" scoped>
.tabs-content {
  position: relative;
  .tab-slider {
    // position: absolute;
    // top: 0;
    // left: 0;
    // width: 100%;
  }
}
.tab-box {
  padding-bottom: 12px;
}
:deep(.switch) {
  .btn-group {
    width: 100%;
    .active-btn-bg {
      width: 50% !important;
    }
    .btn {
      width: 50%;
    }
  }
}
.withdraw {
  font-size: var(--cg-font-15);
  color: var(--cg-color-grey1);

  .add_amountdetail {
    gap: 12px;
    .flowing_water {
      cursor: pointer;
      gap: 4px;
      color: var(--cg-color-black);
      font: var(--cg-font-text6);
    }
  }

  .panel-wrapper {
    width: 940px;
    transform: translateY(-313px) translateX(-30px);
    transition: all ease-in-out 0.35s;
    background-color: var(--cg-color-white);
    min-height: 350px;
    padding-bottom: 50px;
    border-radius: var(--cg-border-outer-radius);
    z-index: 15;
    position: relative;

    .expand-wrapper {
      position: relative;
      width: 946px;
      transform: translateX(-3px);

      .expand-btn {
        display: flex;
        align-items: center;
        position: absolute;
        top: 16px;
        left: 50%;
        transform: translateX(-50%);
        cursor: pointer;
      }
    }
  }

  .expand {
    transform: translateY(16px) translateX(-30px);
  }

  .main {
    width: 100%;
    padding: 10px 30px 0;

    .title {
      display: block;
      font-size: var(--cg-font-17);
      margin-bottom: 12px;
      text-transform: uppercase;
    }

    .bank-item-wrapper {
      width: 100%;
      height: 68px;
      padding: 0 5px;
      position: relative;
      background: url(link($base-img-dir + '/radios/imgR_a.png')) no-repeat;
      background-size: 100% 100%;
      box-shadow: var(--cg-box-shadow-containter);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: var(--cg-border-button-radius);
    }

    .bank-item {
      width: 100%;
      display: flex;
      position: relative;

      .bank-logo {
        width: 256px;
        height: 60px;
        background-color: var(--cg-color-blue11);
        text-align: center;
        border-radius: 4px;
        margin-right: 12px;
        padding: 5px 0 5px;

        img {
          height: 50px;
        }
      }

      .bank-info {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 53px;

        .bank-name {
          font-weight: 700;
          width: 430px;
        }
      }

      .more-banks {
        position: absolute;
        right: 16.73px;
        top: 23px;
        z-index: 15;
        cursor: pointer;
      }
    }

    .new-bank {
      width: 100%;
      height: 68px;
      border-radius: 8px;
      background-color: var(--cg-color-grey6);
      display: flex;
      align-items: center;
      justify-content: center;
      font: var(--cg-font-text1);
      color: var(--cg-color-blue12);
      text-transform: uppercase;
      cursor: pointer;

      .plus {
        font-size: var(--cg-font-48);
        margin-right: 19px;
      }

      &:hover {
        color: var(--cg-color-blue14);
      }
    }

    .no-card-tip {
      margin-top: 12px;

      span {
        color: var(--cg-color-red);
      }
    }

    .withdrawTips {
      display: inline-block;
      margin-top: 10px;
      color: var(--cg-color-red);
      font-size: var(--cg-font-12);
    }

    // 提款明细
    .detail-title {
      font: var(--cg-font-text);
      margin-bottom: 2px;
      text-transform: uppercase;
    }

    .detail-amount {
      font-size: var(--cg-font-36);
      font-weight: 700;
      color: var(--cg-color-blue12);
    }

    .detail-item {
      height: 42px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      font: var(--cg-font-text);

      &:nth-of-type(even) {
        background-color: var(--cg-color-white5);
      }
    }
  }
}
</style>
