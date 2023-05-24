<script setup lang="ts">
import {
  CgIcon,
  CgContainer,
  CgContainerHead,
  CgRadio,
  CgEmpty,
  CgField,
  CgButton,
  CgDivider,
} from '@/components/cg-template-2';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toNumber } from 'lodash';
import axios from 'axios';
import APIs from '@/http/blue-apis';
import { useRequest } from 'vue-request';
import { useLoading } from '@/hooks/useLoading';
import { formatNumberToCurrencyWithoutK } from '@/utils/format'

type PayType = {
  id: string;
  name: string;
  sort: number;
  promo_state: string;
  promo_discount: string;
};
type Tunnel = {
  id: string;
  bank: {
    bank_id: string;
    id: string;
    code: string;
    sort: number;
    name: string;
  }[];
  fmin: string;
  fmax: string;
  amount_list: string;
  sort: string;
  payment_name: string;
};

// 保存银行短名称
axios('https://dl-sg.td22t5f.com/lang/error/bank.json').then(res => {
  if (res.status === 200) {
    sessionStorage.setItem('BankShortName', JSON.stringify(res.data));
  }
});

const { startLoading, closeLoading } = useLoading();
const router = useRouter();
const emit = defineEmits(['title'])
emit('title', 'NẠP TIỀN')

// 金额
const amount = ref('');
// 判断金额是否合法，存款金额是否在最小和最大值之间
const validateAmount = computed(() => {
  const amt = parseFloat(amount.value);
  return amt >= parseFloat(depositLimit.value.min) && amt <= parseFloat(depositLimit.value.max);
});
// 存款按钮是否禁用
const disablePay = computed(() => {
  // 金额不合法，禁用
  if (!validateAmount.value) return true;
  return false;
});
const amountInputHandler = (e: InputEvent) => {
  const value = parseFloat((e.target as HTMLInputElement).value);
  if (value > parseFloat(depositLimit.value.max)) {
    amount.value = depositLimit.value.max
  }
}

// 读取最近使用的支付方式
const saveInfo = JSON.parse(localStorage.getItem('saveInfo') ?? '{}')

// 获取支付方式
const { data: payTypeListData } = useRequest(APIs.getFinanceCate, {
  onSuccess(res) {
    if (res.length - 1 < saveInfo.currentPayTypeIndex) {
      localStorage.removeItem('saveInfo')
      currentPayTypeIndex.value = 0
      currentTunnelIndex.value = 0
    }
    if (res.length) {
      res.sort((a, b) => a.sort - b.sort);
      getTunnel(res[currentPayTypeIndex.value].id, true);
    }
  }
});
const payTypeList = computed(() => {
  if (payTypeListData.value) {
    return payTypeListData.value.map((item) => {
      const discountVisible = item.promo_state === '1' && item.promo_discount !== '0'
      return { discountVisible, ...item }
    })
  }
  return []
});
// 当前的支付方式
const currentPayTypeIndex = ref(saveInfo.currentPayTypeIndex || 0)
const currentPayType = computed(() => payTypeList.value[currentPayTypeIndex.value])
const currentPayTypeId = computed(() => currentPayType.value.id)
// 是否线下支付
const isOffline = computed(() => currentPayType.value?.id === '9');
// 是否刮刮卡
const isTheCao = computed(() => currentPayType.value?.id === '15')

// 当前的渠道
const showSelectTunnel = ref(false);
// 渠道列表
const tunnelList = ref<any[]>([]);
// 线下支付银行列表
const offlineBanks = computed(() => tunnelList.value[0]?.bank ?? [])
const currentTunnelIndex = ref(saveInfo.currentTunnelIndex || 0)
const currentTunnel = computed(() => {
  if (!tunnelList.value) return undefined;
  if (isOffline.value) return tunnelList.value[0]
  return tunnelList.value[currentTunnelIndex.value];
})

// 当前选中的银行
const currentBank = ref();
const currentTunnelId = computed(() =>
  isOffline.value ? currentBank.value?.id : currentTunnel.value?.id
);
// 当前选中渠道对应的最大值，最小值
const depositLimit = computed(() =>
  currentTunnel.value
    ? {
      min: currentTunnel.value.fmin,
      max: currentTunnel.value.fmax
    }
    : { min: '', max: '' }
);
// 获取渠道
const getTunnel = (id: string, isInit?: boolean) => {
  startLoading()
  APIs.getFinanceTunnelById({ id })
    .then(res => {
      if (res.length - 1 < saveInfo.currentTunnelIndex && isInit) {
        localStorage.removeItem('saveInfo')
        currentTunnelIndex.value = 0
      }
      res.sort((a, b) => +a.sort - +b.sort);
      res.forEach((item, index) => {
        res[index].payment_name = `Kênh ${index + 1}-${item.payment_name}`;
      });
      tunnelList.value = res;
      // 线下支付
      if (isOffline.value) {
        currentBank.value = res[0].bank[0];
      }
    })
    .catch(() => {
      currentTunnelIndex.value = 0;
    }).finally(() => { closeLoading() })
};

// 切换支付方式
const switchPayType = ({ index }: { index: number, item: any }) => {
  currentTunnelIndex.value = 0
  currentPayTypeIndex.value = index;
  amount.value = '';
  amountIndex.value = null
  getTunnel(currentPayTypeId.value);
};
// 选择渠道
const switchTunnel = ({ item }: { index: number, item: any }) => {
  // const index = tunnelList.value.findIndex((t) => t.id === item.id)
  // currentTunnelIndex.value = index > -1 ? index : 0

  if (isOffline.value) {
    currentBank.value = item
  }

  // showSelectTunnel.value = false;
};

// 刮刮卡时选择快捷金额
const amountIndex = ref<null | number>(null)
const amountList = computed(() => {
  if (currentTunnel.value && currentTunnel.value.amount_list) {
    return currentTunnel.value.amount_list.split(',');
  }
  return [];
})
const chooseAmount = ({ index, item }: { index: number, item: any }) => {
  amountIndex.value = index
  amount.value = item
}

// 线下支付
const { run: offlinePay } = useRequest(
  () =>
    APIs.FinaceManualPay({
      amount: toNumber(amount.value),
      id: currentTunnel.value?.id ?? '',
      bid: currentBank.value.id
    }),
  {
    manual: true,
    onBefore() { startLoading() },
    onSuccess(res) {
      const offlineData = { ...res, amount: amount.value, bid: currentBank.value.id }
      sessionStorage.setItem('offlineData', JSON.stringify(offlineData))

      // 保存最近使用支付方式
      const saveInfo = {
        currentPayTypeIndex: currentPayTypeIndex.value,
        currentTunnelIndex: currentTunnelIndex.value
      }
      localStorage.setItem('saveInfo', JSON.stringify(saveInfo))

      router.push('/deposit/offline-info')
    },
    onAfter() {
      closeLoading()
    }
  }
);

// 默认存款
const { run: pay } = useRequest(
  () => APIs.FinacePay({ amount: toNumber(amount.value), id: currentTunnel.value?.id ?? '' }),
  {
    manual: true,
    onBefore() { startLoading() },
    onSuccess(res) {
      // 第三方支付
      if (res.useLink === '0') {
        const threePartyPayData = {
          ...res,
          amount: amount.value,
          discountVisible: currentPayType.value?.discountVisible,
          promo_discount: currentPayType.value?.promo_discount,
          payType: currentPayType.value?.name,
          expireTime: new Date().getTime() + 1800000
        }
        sessionStorage.setItem('threePartyPayData', JSON.stringify(threePartyPayData))
        router.push('/deposit/threeparty-info')

        const t = setTimeout(() => {
          window.open(res.url, '_blank');
          clearTimeout(t)
        }, 100);
      }
      // CG支付
      else if (res.useLink === '1' && res.qr_code) {
        const CGPAYData = {
          ...res,
          payType: currentPayTypeId.value,
          amount: amount.value,
          expireTime: new Date().getTime() + 600000
        }
        sessionStorage.setItem('CGPAYData', JSON.stringify(CGPAYData))
        router.push('/deposit/cgpay-info')
      }

      // 保存最近使用支付方式
      const saveInfo = {
        currentPayTypeIndex: currentPayTypeIndex.value,
        currentTunnelIndex: currentTunnelIndex.value
      }
      localStorage.setItem('saveInfo', JSON.stringify(saveInfo))
    },
    onAfter() {
      closeLoading()
    }
  }
);

// 存款操作
const depositHandler = () => {
  if (isOffline.value) {
    offlinePay();
    return;
  }
  pay();
};

// 回车失去焦点
const cgFieldRef = ref()
const enterHandler = () => {
  cgFieldRef.value.blur()
}

// thechaoTips
const theChaoTips = computed(() => {
  return `${amount.value ? amount.value : '1'}K=${amount.value ? formatNumberToCurrencyWithoutK(`${amount.value}000`) : '1,000'}đ`
})
// pay-warn
const payWarn = computed(() => {
  return depositLimit.value.max.length > 8 ? `(Tối thiểu từ ${depositLimit.value.min}K)` :
    `(${depositLimit.value.min}-${depositLimit.value.max})K`
})

// 快捷金额、输入金额开关
enum MONEYSWITCH {
  Input = '1',
  Fast = '2',
  Both = '3',
}
type FAST_MONEY = '1' | '2' | '3';
const fastMoney = ref<MONEYSWITCH>(MONEYSWITCH.Input);

</script>
<template>
  <div class="deposit-index">
    <div class="body">
      <template v-if="payTypeList.length">
        <!-- 支付方式 -->
        <CgContainer margin="0,0,24,0">
          <CgContainerHead height="80">
            <template #left>
              <span style="padding-left: var(--cg-px-24)"> HÌNH THỨC THANH TOÁN </span>
            </template>
          </CgContainerHead>
          <div class="pay-type">
            <CgRadio @onChoose="switchPayType" v-model="currentPayTypeIndex" type="payType" :list="payTypeList ?? []"
              v-slot="{ data }">
              <div class="flex ai-c fdr-c">
                <CgIcon style="margin-bottom: var(--cg-px-6)" width="74" :name="`i_paytype_${data.id}`" />
                <span>{{ data.name }}</span>
              </div>
            </CgRadio>
          </div>
        </CgContainer>

        <!-- 渠道 -->
        <CgContainer class="tunnel" margin="0,0,24,0" padding="24">
          <h6>KÊNH NẠP TIỀN</h6>
          <CgRadio @onChoose="switchTunnel" type="tunnel" v-model="currentTunnelIndex"
            :list="isOffline ? offlineBanks : tunnelList" v-slot="{ data }">
            <div v-if="isOffline" class="offline-item">
              <img :src="data.logo">
              <span>{{ data.banklcard_name }}</span>
            </div>
            <div v-else class="flex ai-c">
              {{ data.payment_name }}
            </div>
          </CgRadio>
          <!-- <CgSelect @on-ok="switchTunnel" v-model="currentTunnelId" rowKey="id" :defaultShow="false"
              :data="isOffline ? offlineBanks : tunnelList" selectLeftText="HỦY BỎ" selectRightText="XÁC NHẬN"
              type="tunnel">
              <template #tunnel>
                <div v-if="isOffline" class="current-bank">
                  <img :src="currentBank?.logo" alt="bank-logo">
                  <span>{{ currentBank?.banklcard_name }}</span>
                </div>
                <div class="currentTname" v-else>{{ currentTunnel?.payment_name }}</div>
              </template>
              <template #item="{ data }">
                <div v-if="isOffline" class="bank">
                  <img class="bank-logo" :src="data.logo" alt="bank-logo" />
                  <span>{{ data.banklcard_name }}</span>
                </div>
                <div v-else class="tunnel-item">
                  <span>{{ data.payment_name }}</span>
                </div>
              </template>
            </CgSelect> -->
        </CgContainer>

        <!-- 充值  -->
        <CgContainer class="pay-amount" padding="24">
          <h6>SỐ TIỀN NẠP</h6>
          <!-- 快捷金额 -->
          <CgRadio v-if="isTheCao" @onChoose="chooseAmount" type="money" v-model="amountIndex" :list="amountList"
            v-slot="{ data }">
            <div>{{ data }}K</div>
          </CgRadio>
          <!-- 自定义金额输入框 -->
          <CgField v-else ref="cgFieldRef" v-model="amount" :limit="/^[0]\d*$/g" :isMoney="true" type="digit" :showK="true" @keyup.enter="enterHandler"
            @input="amountInputHandler"
            :placeholder="`Vui lòng nhập số tiền cần nạp (${depositLimit.min}-${depositLimit.max})K`">
            <template #left>
              <cg-icon width="52" name="i_amount" />
            </template>
            <template #right>
              <div class="show-money" v-show="amount">
                ={{ formatNumberToCurrencyWithoutK(`${amount}000`) }}đ
              </div>
            </template>
          </CgField>
          <!-- 存款金额范围提示 -->
          <div class="pay-warn" v-show="+amount && !validateAmount">
            Vui lòng nhập chính xác số tiền nạp {{payWarn}}
          </div>

          <p v-if="isTheCao" class="theChaoTips"><span>＊ </span>{{ theChaoTips }}</p>

          <!-- 仅 usdt 充值 展示 -->
          <div v-if="currentPayType.name.toLowerCase() === 'usdt'" class="usdt-rate-info">
            <p>Tỷ Giá Nạp Tiền: <strong>1USDT≈ 23.57</strong></p>
            <p>Số Lượng USDT: <em>0USDT</em><CgIcon width="46" name="i_copy" @click="" /></p>
          </div>

          <p>
            <span>＊</span> Vui lòng không sửa đổi số tiền nạp. Số tiền lên điểm sẽ căn cứ vào số tiền thực tế chuyển
            khoản làm chuẩn
          </p>
        </CgContainer>

        <!-- 仅 usdt 充值 展示 -->
        <div v-if="currentPayType.name.toLowerCase() === 'usdt'">
          <cg-container shadow width="686" height="1086" radius="16" padding="20,24,20,24" margin="24,0,0,0">
            <div class="usdt-info">
              <div class="qr-image"><app-image src="/avatars/avatar-9.png" /></div>
              <ul class="form-ul">
                <li class="item">
                  <div class="label">GIAO THỨC USDT</div>
                  <div class="fake-input">TRC20</div>
                </li>
                <li class="item">
                  <div class="label">ĐỊA CHỈ CHUYỂN KHOẢN</div>
                  <div class="fake-input">TEEPp2X4EH9E2fhwEDtfLdTRnH6ULWBpXJ<CgIcon width="46" name="i_copy" @click="" /></div>
                </li>
                <li class="item">
                  <div class="label"><span>*</span>ID GIAO DỊCH</div>
                  <cg-field
                    ref=""
                    type="text"
                    :width="640"
                    maxlength="200"
                    placeholder="Vui Lòng Điền ID Giao Dịch"
                    :clear="true"
                  ></cg-field>
                </li>
              </ul>
            </div>
          </cg-container>
        </div>

        <div class="btn-wrap">
          <CgButton :disabled="disablePay" width="686" @click="depositHandler">NẠP TIỀN NGAY</CgButton>
        </div>
        <div class="kefu">Nạp tiền có vấn đề? Liên hệ <span @click="router.push('/customer-service')">CSKH</span></div>

        <!-- 仅 usdt 充值 展示 -->
        <div v-if="currentPayType.name.toLowerCase() === 'usdt'" class="usdt-tip">
          <cg-container shadow width="686" height="482" radius="16" padding="0,20,0,20">
            <div>
              <h3 class="warn-title">
                <cg-icon name="i_path" width="24" />
                Những điều lưu ý
              </h3>
              <cg-divider />
              <div class="warn-desc">
                <p><span>1. </span>Vui lòng không tin tưởng địa chỉ do bất kỳ cá nhân nào cung cấp, vui lòng lấy địa chỉ hoặc quét mã tiến hành nạp tiền trên trang chủ.</p>
                <p><span>2. </span>Vui lòng sử dụng chính xác Kênh giao dịch và Giao thức thanh toán (link địa chỉ) để thanh toán bằng tiền ảo.</p>
                <p><span>3. </span>Vui lòng sử dụng kênh nạp tiền ảo <strong>USDT-TRC20</strong>,<br /> các loại tiền ảo khác không khả dụng.</p>
                <p><span>4. </span>Không nạp tiền vào bất kỳ địa chỉ nào ngoại trừ <br /><strong>USDT-TRC20</strong>, nếu không tiền sẽ không được trả lại.</p>
              </div>
            </div>
          </cg-container>
        </div>

      </template>
      <!-- 无数据 -->
      <CgEmpty marginTop="280" v-else>
        Hiện chưa có kênh nạp tiền,<br />
        nếu quý khách gặp vấn đề khi nạp tiền,<br />
        vui lòng liên hệ <span class="cskh" @click="router.push('/customer-service')">CSKH</span> xử lý
      </CgEmpty>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'DepositIndex'
};
</script>

<style lang="scss" scoped>
.deposit-index {
  .body {
    padding: 26px 32px 100px;

    .pay-type {
      padding: 20px 23px;
    }

    .tunnel {
      h6 {
        font: var(--cg-font-text1);
        margin-bottom: 24px;
      }

      .offline-item {
        display: flex;
        align-items: center;
        width: 310px;
        padding-left: 16px;

        img {
          width: 140px;
          height: 64px;
          object-fit: contain;
          margin-right: 10px;
        }

        span {
          width: 140px;
          word-wrap: break-word;
        }
      }

      // .tunnel-list {
      //   display: flex;
      //   align-items: center;
      //   height: 100%;

      //   .tunnel-item {
      //     width: 100%;
      //     display: flex;
      //     justify-content: center;
      //   }

      //   .current-bank {
      //     width: 327px;
      //     display: flex;
      //     align-items: center;

      //     img {
      //       width: 140px;
      //       height: 64px;
      //       object-fit: contain;
      //       margin-right: 19px;
      //     }

      //     span {
      //       width: 168px;
      //       word-wrap: break-word;
      //     }
      //   }

      //   .currentTname {
      //     width: 327px;
      //   }

      //   .bank {
      //     width: 100%;
      //     height: 100%;
      //     display: flex;
      //     align-items: center;
      //     padding-left: 152px;

      //     .bank-logo {
      //       height: 64px;
      //       margin-right: 20px;
      //     }
      //   }
      // }
    }



    .pay-amount {
      display: flex;
      flex-direction: column;

      h6 {
        font: var(--cg-font-text1);
        margin-bottom: 24px;
      }

      .show-money {
        position: absolute;
        right: 16px;
      }

      .pay-warn {
        font: var(--cg-font-text2);
        color: var(--cg-color-red2);
        margin-top: 20px;
      }

      p {
        font: var(--cg-font-text2);

        span {
          color: var(--cg-color-red2);
        }

        &:first-of-type {
          margin-top: 20px;
        }
      }

      .theChaoTips {
        font-weight: 700;
        margin-bottom: 10px;

        span {
          font-weight: 400;
        }
      }
    }

    .kefu {
      font: var(--cg-font-text3);
      margin-top: 32px;
      text-align: center;

      span {
        color: var(--cg-color-blue1);
        text-decoration: underline;
      }
    }

    .cskh {
      color: var(--cg-color-blue1);
      text-decoration: underline;
    }
  }
}

.usdt-tip {
  padding-top: 32px;
  .warn-title {
    font: var(--cg-font-h4);
    color: var(--cg-color-red2);
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }
  .warn-desc {
    font: var(--cg-font-text3);
    line-height: 30px;
    color: var(--cg-color-black1);
    padding-top: 24px;
    p {
      padding-bottom: 20px;
      position: relative;
      padding-left: 38px;
      span {
        position: absolute;
        display: inline-block;
        top: 0;
        left: 0;
      }
      strong {
        color: var(--cg-color-red2);
      }
    }
  }
}
.usdt-rate-info {
  width: fit-content;
  p {
    position: relative;
    margin-top: 20px;
    .cg_icon {
      display: block;
      position: absolute;
      right: 16px;
      top: -10px;
    }
    em, strong {
      font-weight: 700;
    }
    em {
      color: var(--cg-color-blue1);
      font-style: normal;
    }
  }
}
.btn-wrap {
  padding-top: 32px;
}
.usdt-info {
  .qr-image {
    img {
      width: 100%;
    }
  }
  .form-ul {
    .item {
      .label {
        font: var(--cg-font-text1);
        padding: 20px 0;
      }
      .fake-input {
        font: var(--cg-font-text2);
        color: var(--cg-color-black1);
        border: 2px solid #9BD1FD;
        border-radius: 8px;
        padding: 0 20px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>
