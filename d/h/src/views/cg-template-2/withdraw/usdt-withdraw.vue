<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import {
  CgMaintain,
  CgIcon,
  CgContainer,
  CgRadio,
  CgButton,
  CgDivider,
  CgField
} from '@/components/cg-template-2';
import APIs from '@/http/blue-apis';
import { useAppStore } from '@/store-pinia';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { toNumber } from 'lodash';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call';
import { Toast } from 'vant';
import { newCopy } from '@/utils/common';
import { useLoading } from '@/hooks/useLoading';
import { useRouter } from 'vue-router';
import { toTwoDecimalsCurrency } from '@/utils/format';


const router = useRouter();
const { startLoading, closeLoading } = useLoading();
const userStore = userInfoStateStore();
const userInfo = computed(() => userStore.userInfo);
const usdtCardList = computed(() => userStore.usdtCardList);

// 银行卡列表获取
const bankCardIndex = ref(0);

// 选择银行卡
const isBankCardExpand = ref(false);
const handleBankCardExpand = () => {
  if (usdtCardList.value.length < 2) return;
  isBankCardExpand.value = !isBankCardExpand.value;
};
const currentBankCard = computed(() => usdtCardList.value[bankCardIndex.value]);
const onChooseBank = ({ index }: { index: number; item: any }) => {
  if (usdtCardList.value[index].maintain === '0') return;
  bankCardIndex.value = index;
  handleBankCardExpand();
};

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
const dispatchWithdraw = (querys: any) => {
  //
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

const fieldfocused = ref(false);
const fieldFocus = () => {
  fieldfocused.value = true;
};

const fieldBlur = () => {
  setTimeout(() => {
    fieldfocused.value = false;
  }, 350);
};

const getRightTet = () => {
  if (!withdrawAmount.value && fieldfocused.value) {
    return 'TOÀN BỘ SỐ TIỀN';
  } else {
    return '';
  }
};
</script>
<template>
  <div class="usdt-withdraw">
    <div>
      <CgContainer class="body-wrapper" padding="24,20" margin="0,0,24,0">
        <div class="title">
          <span>RÚT TIỀN BẰNG USDT</span>
          <CgIcon
            v-if="usdtCardList.length > 1"
            @click="handleBankCardExpand"
            width="28"
            :name="`i_arrow${isBankCardExpand ? 'up' : 'down'}`"
          />
        </div>
        <!-- 未绑定银行卡 -->
        <template v-if="usdtCardList.length === 0">
          <div class="add-card" @click="goAddBank">
            <CgIcon class="icon" width="24" name="i_blue_cross" />
            THÊM ĐỊA CHỈ USDT
          </div>
          <div class="tips">
            <span>＊</span>Vui lòng liên kết địa chỉ USDT để rút tiền
          </div>
        </template>
        <!-- 有银行卡 -->
        <template v-if="usdtCardList.length">
          <!-- 当前选中的银行卡 -->
          <div
            v-show="!isBankCardExpand && bankCardIndex !== -1"
            class="current-bank"
            @click="handleBankCardExpand"
          >
            <div class="bank-logo">
              <app-image src="/personal/usdt-logo.png" alt="" />
            </div>
            <div class="bank-name van-multi-ellipsis--l2">
              {{ currentBankCard?.bindname }}
            </div>
            <div class="bank-card">
              <div>{{ currentBankCard?.protocol }}</div>
              <div>{{ currentBankCard?.address }}</div>
            </div>

            <cg-maintain v-if="+currentBankCard.state === 2" type="bankstop" />
            <template v-else>
              <!-- 维护 -->
              <cg-maintain v-if="currentBankCard.maintain === '0'" type="bank" />
            </template>
          </div>
          <!-- 银行卡下拉 -->
          <CgRadio
            v-if="isBankCardExpand"
            v-model="bankCardIndex"
            :list="usdtCardList"
            type="bank"
            @onChoose="onChooseBank"
            v-slot="{ data }"
          >
            <div class="bank-item">
              <div class="bank-logo">
                <app-image src="/personal/usdt-logo.png" alt="" />
              </div>
              <div class="bank-name van-multi-ellipsis--l2">
                {{ currentBankCard?.bindname }}
              </div>
              <div class="bank-card">
                <div>{{ currentBankCard?.protocol }}</div>
                <div>{{ currentBankCard?.address }}</div>
              </div>

              <cg-maintain v-if="+data.state === 2" type="bankstop" />
              <template v-else>
                <!-- usdt 只有停用没有维护状态 -->
                <!-- 非停用状态展示维护 -->
                <cg-maintain v-if="data.maintain === '0'" type="bank" />
              </template>
            </div>
          </CgRadio>
          <!-- <template
            v-if="usdtCardList.length === 1 ? true : usdtCardList.length < 5 && isBankCardExpand"
          >
            <div class="add-card2" @click="goAddBank">
              <CgIcon class="icon" width="24" name="i_blue_cross" />
              {{
                usdtCardList.length === 1
                  ? 'VUI LÒNG LIÊN KẾT THÊM THẺ NGÂN HÀNG'
                  : 'LIÊN KẾT NGÂN HÀNG'
              }}
            </div>
          </template> -->
        </template>
      </CgContainer>

      <!-- 取款 -->
      <template v-if="usdtCardList.length">
        <CgContainer padding="20" margin="0,0,32,0">
          <div style="margin-bottom: var(--cg-px-20)">
            <!-- rightTet="TOÀN BỘ SỐ TIỀN" -->
            <CgField
              @butClick="onMaxAmount"
              ref="cgFieldRef"
              :clear="false"
              v-model="withdrawAmount"
              maxlength="13"
              type="digit"
              :isMoney="true"
              :showK="true"
              @keyup.enter="enterHandler"
              placeholder="Số tiền rút thấp nhất 10K VND"
              @focus="fieldFocus"
              @blur="fieldBlur"
              :rightTet="getRightTet()"
            >
              <template #left>
                <cg-icon width="52" name="i_amount" />
              </template>

              <template #right>
                <div class="show-money" v-show="withdrawAmount">
                  ={{ toTwoDecimalsCurrency((+withdrawAmount) * 1000 / (+currentBankCard.rate)) }}U
                </div>
              </template>
            </CgField>
          </div>
          <p v-show="withdrawTips" class="error-text">{{ withdrawTips }}</p>
          <div class="rate-tip">Tỷ Giá Rút Tiền: <strong>1USDT ≈ {{ currentBankCard.rate }}</strong></div>
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
        <CgButton
          :disabled="!withdrawAmount || !!withdrawTips"
          width="686"
          @click="dispatchWithdraw"
          >RÚT TIỀN
        </CgButton>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'UsdtWithdraw'
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
            width: 360px;
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
.rate-tip {
  font: var(--cg-font-text2);
  line-height: 26px;
  padding-bottom: 20px;
  color: var(--cg-color-black1);
}
</style>
