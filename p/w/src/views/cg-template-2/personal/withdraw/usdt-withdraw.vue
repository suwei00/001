<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { toNumber } from 'lodash';
import { CgContainer, CgIcon, CgDivider, CgAmountInput, CgButton, CgMaintain, CgRadio } from '@/components/cg-template-2';
import { userInfoStateStore } from '@/store-pinia/userInfo';

const router = useRouter();
const userInfoStore = userInfoStateStore();
const { usdtCardList, userInfo } = storeToRefs(userInfoStore);

// 银行卡列表获取
const isBankCardExpand = ref(false);
const bankCardIndex = ref(0);
const currentBankCard = computed(() => usdtCardList.value[bankCardIndex.value]);
const handleBankCardExpand = () => {
  if (usdtCardList.value.length < 2) return;
  isBankCardExpand.value = !isBankCardExpand.value;
};
const onChooseBank = (index: number) => {
  bankCardIndex.value = index;
  handleBankCardExpand();
};

const min = 10;
const withdrawAmount = ref('');
const max = computed(() => userInfo.value.balance.split('.')[0]);
const onMaxAmount = () => {
  withdrawAmount.value = userInfo.value.balance.split('.')[0];
};

const dispatchWithdraw = () => {};

// 流水详情
const goToDetail = () => {
  router.push({
    path: '/withdraw/detail'
  });
};

const withdrawTips = computed(() => {
  if (!withdrawAmount.value) return '';
  const val = toNumber(withdrawAmount.value);
  if (val < min) return 'Vui lòng dựa vào phạm vi hạn mức nhập số tiền chính xác';
  if (val > toNumber(userInfo.value.balance)) return 'Số dư ví tiền chính không đủ';
});
</script>

<template>
  <div class="usdt-withdraw">
    <section>
      <template v-if="usdtCardList && usdtCardList.length">
        <!-- 银行卡列表 -->
        <CgContainer padding="6,7" radius="8" type="smallContainer">
          <template #content>
            <!-- 当前选中的 -->
            <div v-if="!isBankCardExpand" class="bank-item-wrapper" :class="{ pointer: usdtCardList.length > 1 }" @click="handleBankCardExpand">
              <div class="bank-item">
                <div class="bank-logo">
                  <app-image :src="'/personal/usdt-logo.png'" alt="" />
                </div>
                <div class="bank-info">
                  <div class="bank-name">Đây là địa chỉ ví của tiền ảoU</div>
                  <div style="text-align: right">
                    <span>{{ currentBankCard.protocol }}</span
                    ><br />
                    <span>{{ currentBankCard.address }}</span>
                  </div>
                </div>

                <!-- usdt 只有停用没有维护状态 -->
                <!-- 停用 -->
                <cg-maintain v-if="+currentBankCard.state === 2" type="bankstop" />
                <template v-else>
                  <!-- 维护 -->
                  <cg-maintain v-if="currentBankCard.maintain === '0'" type="bank" />
                </template>
                <!-- 展开更多银行 -->
                <CgIcon v-show="usdtCardList.length > 1" class="more-banks" width="18.27" name="i_arrow_down" />
              </div>
            </div>
            <!-- 下拉框 -->
            <CgRadio v-else type="bank" v-model="bankCardIndex" :list="isBankCardExpand ? usdtCardList : usdtCardList.slice(0, 1)" @onChoose="onChooseBank" v-slot="{ data, index }">
              <div class="bank-item">
                <div class="bank-logo">
                  <app-image :src="'/personal/usdt-logo.png'" alt="" />
                </div>
                <div class="bank-info">
                  <div class="bank-name">Đây là địa chỉ ví của tiền ảoU</div>
                  <div style="text-align: right">
                    <span>{{ data.bindname }}</span
                    ><br />
                    <span>{{ data.address }}</span>
                  </div>
                </div>

                <!-- 银行卡停用 -->
                <cg-maintain v-if="+data.state === 2" type="bankstop" />
                <template v-else>
                  <!-- usdt 只有停用没有维护状态 -->
                  <!-- 非停用状态展示维护 -->
                  <cg-maintain v-if="data.maintain === '0'" type="bank" />
                </template>
                <!-- 展开更多银行 -->
                <CgIcon v-show="usdtCardList.length > 1 && index === 0" @click="handleBankCardExpand" class="more-banks" width="18.27" name="i_arrow_up" />
              </div>
            </CgRadio>
            <div v-show="isBankCardExpand && usdtCardList.length < 5" class="new-bank" @click="$router.push('/personal/banks')">
              <span class="plus">+</span>
              Liên kết ngân hàng
            </div>
          </template>
        </CgContainer>

        <template v-if="usdtCardList.length > 0">
          <CgDivider margin="16px 0" />
          <div class="add_amountdetail flex">
            <CgAmountInput
              @onRight="onMaxAmount"
              showMoney
              :rate="currentBankCard.rate"
              isRight
              placeholder="Số tiền rút thấp nhất 10K VND"
              inputWidth="500px"
              v-model="withdrawAmount"
              :maxAmount="max"
              :precision="0"
            />
            <!-- 流水详情 -->
            <div class="flowing_water flex-middle" @click="goToDetail()">
              <cg-icon name="i_flow_water" width="30"></cg-icon>
              Chi Tiết Tiền Cược Yêu Cầu
            </div>
          </div>
          <span class="withdrawTips">{{ withdrawTips }}</span>
          <div class="desc-tips">
            Tỷ Giá Rút Tiền: <strong>1USDT ≈ {{ currentBankCard.rate }}</strong>
          </div>
          <cg-button style="margin-top: 30px" width="300" :disabled="!withdrawAmount || !!withdrawTips" @click="dispatchWithdraw">RÚT TIỀN</cg-button>
        </template>
      </template>
      <CgContainer v-else margin="0,0,0,0" height="80" padding="6" radius="8" type="smallContainer">
        <template #content>
          <div class="new-bank" @click="$router.push('/personal/banks?index=2')">
            <cg-icon name="i_blue_plus" width="29"></cg-icon>
            Thêm Địa Chỉ USDT
          </div>
        </template>
      </CgContainer>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UsdtWithdraw'
};
</script>

<style lang="scss" scoped>
.desc-tip {
  font: var(--cg-font-text);
  line-height: 17px;
  color: var(--cg-color-grey1);
}

.add_amountdetail {
  gap: 12px;
}
.withdrawTips {
  display: inline-block;
  margin-top: 10px;
  color: var(--cg-color-red);
  font-size: var(--cg-font-12);
}
.usdt-withdraw {
  height: 300px;
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
  gap: 20px;
  .plus {
    font-size: var(--cg-font-48);
    margin-right: 19px;
  }
  &:hover {
    // color: var(--cg-color-blue14);
  }
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
</style>
