<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import {
  CgMaintain,
  CgHeader,
  CgIcon,
  CgContainer,
  CgRadio,
  CgButton,
  CgAmount,
  CgDivider,
  CgField,
  CgTab,
} from '@/components/cg-template-2';
import WalletCenter from '../wallet-center/index.vue';
import FirstWithdrawDialog from './first-withdraw.vue';
import UsdtWithdraw from './usdt-withdraw.vue';
import APIs from '@/http/blue-apis';
import { useAppStore } from '@/store-pinia';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { toNumber, pullAt } from 'lodash';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call';
import { Toast } from 'vant';
import { timeToVietnam } from '@/utils/time';
import { newCopy } from '@/utils/common';
import { useLoading } from '@/hooks/useLoading';
import { useRouter } from 'vue-router';
import { formatNumberToCurrencyWithoutK } from '@/utils/format';

type BankItem = {
  id: string;
  uid: string;
  username: string;
  bank_address: string;
  bank_id: string;
  bank_branch_name: string;
  state: number;
  bank_card_hash: string;
  created_at: string;
  realname: string;
  bank_card: string;
  maintain?: string;
};

// 是否展开
const expand = ref(false);

const router = useRouter();
const { startLoading, closeLoading } = useLoading();
const Dialog = new CgDialogClass();
const appStore = useAppStore();
const userStore = userInfoStateStore();
const userInfo = computed(() => userStore.userInfo);
const usdtCardList = computed(() => userStore.usdtCardList);

// 银行卡列表获取
const bankCardList = ref<BankItem[]>([]);
const bankCardIndex = ref(0);
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
const isBankCardExpand = ref(false);
const handleBankCardExpand = () => {
  if (bankCardList.value.length < 2) return
  isBankCardExpand.value = !isBankCardExpand.value
}
const currentBankCard = computed(() => bankCardList.value[bankCardIndex.value])
const onChooseBank = ({ index }: { index: number, item: any }) => {
  if (bankCardList.value[index].maintain === '0') return
  bankCardIndex.value = index
  handleBankCardExpand()
}

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
const copy = (str: string) => {
  newCopy(str);
  Toast('Sao chép thành công');
};

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
const onMaxAmount = () => {
  withdrawAmount.value = userInfo.value.balance.split('.')[0] + 'K';
};

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
          });
      }
      // 维护
      else if (res[bankID] === '0') {
        Toast('Ngân Hàng Đang Bảo Trì, Vui Lòng Chọn Hoặc Liên Kiết Ngân Hàng Khác');
        getBankList();
      }
    })
    .finally(() => {
      closeLoading();
    });
  })
  .catch(() => {
    closeLoading();
  });
};

// 这垃圾vscode💀
const clearStar = (a: string) => {
  return a?.replace(/\*+/g, '*');
};

// 添加银行卡
const goAddBank = () => {
  router.push('/banks');
};

// 回车失去焦点
const cgFieldRef = ref();
const enterHandler = () => {
  cgFieldRef.value.blur();
};
// 流水详情
const goToDetail = () => {
  router.push({
    path: '/withdraw/detail'
  });
};

onMounted(() => {
  userStore.getUsdtCardList();
  getWithdrawDetail();
});

const fieldfocused = ref(false);
const fieldFocus = () => {
  fieldfocused.value = true;
}

const fieldBlur = () => {
  setTimeout(() => {
    fieldfocused.value = false;
  }, 350);
}

const getRightTet = () => {
  if (!withdrawAmount.value && fieldfocused.value) {
    return 'TOÀN BỘ SỐ TIỀN';
  } else {
    return '';
  }
}

const activeTabIndex = ref('1');
const navList = computed(() => [
  { label: ` THẺ NGÂN HÀNG (${ bankCardList.value.length }/5)`, value: '1' },
  { label: `USDT (${ usdtCardList.value.length }/1)`, value: '2' }
]);

const changeTab = () => {
  //
};

const amountInputHandler = (e: InputEvent) => {
  const value = parseFloat((e.target as HTMLInputElement).value);
  if (value > parseFloat(userInfo.value.balance)) {
    withdrawAmount.value = userInfo.value.balance.split('.')[0] + 'K';
  }
};
</script>
<template>
  <div class="withdraw">
    <CgHeader>
      RÚT TIỀN
      <template #actions>
        <cg-icon width="52" name="i_caption" @click="router.push('/help?category=1&subclass=3')" />
      </template>
    </CgHeader>

    <!-- 钱包中心 -->
    <div class="wallet-wrapper" :class="{ expand }">
      <WalletCenter isWithdraw :showTitle="false" small :showTransfer="false" />
    </div>

    <!-- 提现页面 -->
    <div class="panel-wrapper">
      <div class="expand-block">
        <div class="expand-btn" @click="expand = !expand">
          <span>{{ expand ? 'Ẩn Bớt' : 'Hiện Thêm' }}</span>
          <cg-icon width="16" :name="`i_${expand ? 'up' : 'down'}`" />
        </div>
      </div>

      <div class="body">
        <template v-if="!isWithdrawing">

          <!-- <div class="card-tab">
            <cg-tab v-model="activeTabIndex" :list="navList" @on-tab="changeTab" average></cg-tab>
          </div> -->

          <div v-if="activeTabIndex === '1'">

            <CgContainer class="body-wrapper" padding="24,20" margin="0,0,24,0">
              <div class="title">
                <span>THẺ NGÂN HÀNG ({{ bankCardList.length }}/5)</span>
                <CgIcon v-if="bankCardList.length > 1" @click="handleBankCardExpand" width="28"
                  :name="`i_arrow${isBankCardExpand ? 'up' : 'down'}`" />
              </div>
              <!-- 未绑定银行卡 -->
              <template v-if="bankCardList.length === 0">
                <div class="add-card" @click="goAddBank">
                  <CgIcon class="icon" width="24" name="i_blue_cross" />
                  LIÊN KẾT NGÂN HÀNG
                </div>
                <div class="tips">
                  <span>＊</span>Bạn chưa liên kết thẻ ngân hàng, vì sự an toàn tiền của bạn, khi liên
                  kết thẻ ngân hàng, cần điền thông tin cá nhân của bạn
                </div>
              </template>
              <!-- 有银行卡 -->
              <template v-if="bankCardList.length">
                <!-- 当前选中的银行卡 -->
                <div v-show="!isBankCardExpand && bankCardIndex !== -1" class="current-bank" @click="handleBankCardExpand">
                  <div class="bank-logo">
                    <img :src="appStore.getBankLogoByBankId(currentBankCard?.bank_id)" alt="" />
                  </div>
                  <div class="bank-name van-multi-ellipsis--l2">
                    {{ appStore.getBankNameById(currentBankCard?.bank_id) }}
                  </div>
                  <div class="bank-card">
                    {{ clearStar(currentBankCard?.bank_card) }}
                  </div>

                  <cg-maintain v-if="+currentBankCard.state === 2" type="bankstop" />
                  <template v-else>
                    <!-- 维护 -->
                    <cg-maintain v-if="currentBankCard.maintain === '0'" type="bank" />
                  </template>
                </div>
                <!-- 银行卡下拉 -->
                <CgRadio v-if="isBankCardExpand" v-model="bankCardIndex" :list="bankCardList" type="bank"
                  @onChoose="onChooseBank" v-slot="{ data }">
                  <div class="bank-item">
                    <div class="bank-logo">
                      <img :src="appStore.getBankLogoByBankId(data.bank_id)" alt="" />
                    </div>
                    <div class="bank-name van-multi-ellipsis--l2">
                      {{ appStore.getBankNameById(data.bank_id) }}
                    </div>
                    <div class="bank-card">
                      {{ clearStar(data.bank_card) }}
                    </div>

                    <cg-maintain v-if="+data.state === 2" type="bankstop" />
                    <template v-else>
                      <!-- usdt 只有停用没有维护状态 -->
                      <!-- 非停用状态展示维护 -->
                      <cg-maintain v-if="data.maintain === '0'" type="bank" />
                    </template>
                  </div>
                </CgRadio>
                <template v-if="
                  bankCardList.length === 1 ? true : bankCardList.length < 5 && isBankCardExpand
                ">
                  <div class="add-card2" @click="goAddBank">
                    <CgIcon class="icon" width="24" name="i_blue_cross" />
                    {{
                      bankCardList.length === 1
                      ? 'VUI LÒNG LIÊN KẾT THÊM THẺ NGÂN HÀNG'
                      : 'LIÊN KẾT NGÂN HÀNG'
                    }}
                  </div>
                </template>
              </template>
            </CgContainer>

            <!-- 取款 -->
            <template v-if="bankCardList.length">
              <CgContainer padding="20" margin="0,0,32,0">
                <div style="margin-bottom: var(--cg-px-20)">
                  <!-- rightTet="TOÀN BỘ SỐ TIỀN" -->
                  <CgField @butClick="onMaxAmount" ref="cgFieldRef" :clear="false"
                    v-model="withdrawAmount" maxlength="13" type="digit" :isMoney="true" :showK="true" @keyup.enter="enterHandler"
                    placeholder="Số tiền rút thấp nhất 10K VND" @focus="fieldFocus" @blur="fieldBlur" @input="amountInputHandler"
                    :rightTet="getRightTet()">
                    <template #left>
                      <cg-icon width="52" name="i_amount" />
                    </template>

                    <template #right>
                      <div class="show-money" v-show="withdrawAmount">
                        ={{ formatNumberToCurrencyWithoutK(`${withdrawAmount}000`) }}đ
                      </div>
                    </template>
                  </CgField>
                </div>
                <p v-show="withdrawTips" class="error-text">{{ withdrawTips }}</p>
                <!-- 全部金额 -->
                <!-- <div class="input-all" v-show="!withdrawAmount" @click="onMaxAmount">TOÀN BỘ SỐ TIỀN</div> -->
                <!-- 流水详情 -->
                <CgDivider />
                <div class="flowing_water" @click="goToDetail()">
                  <div class="left">
                    <cg-icon name="i_flow_water" width="46"></cg-icon>
                    Chi Tiết Tiền Cược Yêu Cầu
                  </div>
                  <cg-icon name="i_right_grey" width="40"></cg-icon>
                </div>
                <div></div>
              </CgContainer>
              <CgButton :disabled="!withdrawAmount || !!withdrawTips" width="686" @click="dispatchWithdraw">RÚT TIỀN
              </CgButton>
            </template>
          </div>

          <div v-if="activeTabIndex === '2'">
            <usdt-withdraw />
          </div>

        </template>
        <template v-else>
          <CgContainer padding="20">
            <div class="top">
              <span>Bạn có một đơn rút tiền đang trong quá trình giải quyết. Vui lòng chờ đợi</span>
              <CgAmount color="blue1" weight="700" size="48" segmentation suffix="K" :amount="withdrawDetail.amount" />
            </div>
            <CgDivider />
            <div class="info-item">
              <label>Loại Giao Dịch</label>
              <span class="capitalize">Rút tiền</span>
            </div>
            <div class="info-item">
              <label>Trạng Thái</label>
              <span class="capitalize" style="color: var(--cg-color-orange)">{{
                $t(`transaction.state.T${withdrawDetail.state}`)
              }}</span>
            </div>
            <div class="info-item">
              <label>Thời Gian Giao Dịch</label>
              <span>{{ timeToVietnam(withdrawDetail.created_at * 1000) }}</span>
            </div>
            <div class="info-item">
              <label>Số đơn</label>
              <span class="flex ai-c">{{ withdrawDetail.id }}
                <CgIcon style="margin-left: var(--cg-px-10)" width="46" name="i_copy" @click="copy(withdrawDetail.id)" />
              </span>
            </div>
          </CgContainer>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Withdraw'
};
</script>

<style lang="scss" scoped>

.field_tx {
  position: absolute;
  right: 22px;
  width: 120px;
  text-align: center;
  color: var(--cg-color-blue1);
  z-index: 10;
}
.show-money {
  position: absolute;
  right: 16px;
}
.withdraw {
  .wallet-wrapper {
    height: 516px;
    overflow: hidden;
    transition: all ease-in-out 0.35s;
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

      .body-wrapper {
        display: flex;
        flex-direction: column;

        .title {
          font: var(--cg-font-h4);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .add-card,
        .add-card2 {
          width: 646px;
          height: 80px;
          border: 2px solid var(--cg-color-blue11);
          border-radius: var(--cg-border-radius-input);
          font: var(--cg-font-h4);
          color: var(--cg-color-blue1);
          display: flex;
          align-items: center;
          justify-content: center;

          .icon {
            margin-right: 10px;
            margin-top: -5px;
          }
        }

        .add-card2 {
          font: var(--cg-font-text7);
          margin-top: 20px;
        }

        .tips {
          font: var(--cg-font-text3);
          display: flex;
          margin-top: 20px;
          line-height: 32px;

          span {
            color: var(--cg-color-red2);
            margin-right: 5px;
          }
        }

        .current-bank {
          @include webp($base-img-dir + '/finance/type3_active.png');
          display: flex;
          align-items: center;
          padding: 0 8px;
          width: 646px;
          height: 80px;
          background-size: 100% 100%;
          font: var(--cg-font-text3);
          border-radius: var(--cg-border-radius-input);

          .bank-logo {
            width: 140px;
            height: 64px;
            margin-right: 10px;

            img {
              width: 140px;
              height: 64px;
              object-fit: contain;
            }
          }

          .bank-name {
            width: 384px;
            font-weight: 700;
            margin-right: 11px;
          }
        }

        .bank-item {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0 6px;
          border-radius: var(--cg-border-radius-input);

          .bank-logo {
            width: 140px;
            height: 64px;
            margin-right: 10px;

            img {
              width: 140px;
              height: 64px;
              object-fit: contain;
            }
          }

          .bank-name {
            width: 384px;
            font-weight: 700;
            margin-right: 11px;
          }
        }
      }

      .input-all {
        text-align: center;
        color: var(--cg-color-blue1);
        font: var(--cg-font-text2);
      }

      .flowing_water {
        color: var(--cg-color-black1);
        font: var(--cg-font-text2);
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        .left {
          display: flex;
          gap: 10px;
          justify-content: flex-start;
          align-items: center;
        }
      }

      .error-text {
        font: var(--cg-font-text2);
        color: var(--cg-color-red2);
        margin-bottom: 20px;
      }

      .top {
        font: var(--cg-font-text8);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 20px;

        span {
          width: 100%;
          text-align: center;
          display: block;
          margin-bottom: 20px;
        }
      }

      .info-item {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        font: var(--cg-font-text3);

        label {
          text-transform: capitalize;
        }
      }
    }
  }
}

.card-tab {
  padding-bottom: 24px;
}
</style>
