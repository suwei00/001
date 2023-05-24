<script setup lang='ts'>
import PersonalTitle from '../components/personal-title/index.vue'
import CgPayInfo from './cg-pay-info.vue'
import OfflineInfo from './offline-info.vue'
import ThreePartyInfo from './three-party-info.vue'
import DepositTutorial from './deposit-tutorial.vue'
import FinancePopup from '../components/finance-popup/index.vue'
import { CgIcon, CgRadio, CgDivider, CgButton, CgAmountInput, CgContainer, CgEmpty, CgInput } from '@/components/cg-template-2'
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call'

import APIs from '@/http/blue-apis';
import { useWebNotification } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { userInfoStateStore } from '@/store-pinia/userInfo'
import { ref, computed, inject } from 'vue';
import { getCustomerServeUrl } from '@/utils/common';
import { toThousands } from '@/utils/format'
import { toNumber } from 'lodash';
import useBus from '@/hooks/useBus';
import _ from 'lodash';
import { useRequest } from 'vue-request';
import { useLoading } from '@/hooks/useLoading'

import type { PayRes, OfflinePayRes } from './types'

const userStore = userInfoStateStore()
const router = useRouter();
const reloadPage = inject<() => void>('reloadPage');
const Dialog = new CgDialogClass()
const { startLoading, closeLoading } = useLoading()

// 读取保存的最近使用的充值方式
const saveInfo = JSON.parse(localStorage.getItem('saveInfo') ?? '{}')

// 充值教程
const openTutorial = () => {
  Dialog.showDialog({
    template: 'tmp3',
    customComponent: DepositTutorial,
    closeOnClickOverlay: true,
    props: { currentTypeId: curPayTypeId.value, close: () => Dialog.closeDialog() }
  })
}

// 当前选中的付款方式index
const activeIndex = ref(saveInfo.activeIndex || 0);
// 当前选中的渠道index
const currentTunnelIndex = ref(saveInfo.currentTunnelIndex || 0);
// 当前支付方式id
const curPayType = computed(() => payTypes.value[activeIndex.value])
const curPayTypeId = computed(() => curPayType.value?.id);
const isOffline = computed(() => curPayTypeId.value === '9') // 是否offline
const isTheCao = computed(() => curPayTypeId.value === '15') // 是否刮刮卡

// 支付方式
const { data: payList } = useRequest(APIs.getFinanceCate, {
  onSuccess(res) {
    res.sort((a, b) => a.sort - b.sort);
    if (res.length - 1 < saveInfo.activeIndex) {
      localStorage.removeItem('saveInfo')
      activeIndex.value = 0
      currentTunnelIndex.value = 0
    }
    getCurrentPayTunnel(res[activeIndex.value].id)
  }
});
const payTypes = computed(() => {
  if (payList.value) {
    return payList.value.map((item) => {
      const discountVisible = item.promo_state === '1' && item.promo_discount !== '0'
      return { discountVisible, ...item }
    })
  }
  return []
});

// 当前的通道列表
const currentPayData = ref<any>([])
// 获取通道
const getCurrentPayTunnel = (id: string) => {
  startLoading()
  APIs.getFinanceTunnelById({ id })
    .then((res) => {
      currentPayData.value = _.sortBy(res, ['sort'])
    }).finally(() => { closeLoading() })
}
// 切换支付渠道
const handleTunnelChange = (index: number) => {
  currentTunnelIndex.value = index;
  amountIndex.value = null
};
// 当前选中的支付渠道信息
const currentTunnel = computed(() => {
  if (!currentPayData.value) return undefined;
  if (isOffline.value) return currentPayData.value[0]
  return currentPayData.value[currentTunnelIndex.value];
});
// 当前选中渠道对应的最大值，最小值
const depositLimit = computed(() =>
  currentTunnel.value
    ? {
      min: currentTunnel.value.fmin,
      max: currentTunnel.value.fmax
    }
    : { min: '', max: '' }
);
// 当前支付渠道id
const tunnelId = computed(() => currentTunnel.value?.id ?? '');
// 输入框自定义金额
const customAmount = ref('');
// 判断金额是否合法，存款金额是否在最小和最大值之间
const validateAmount = computed(() => {
  const amt = parseFloat(customAmount.value);
  return amt >= parseFloat(depositLimit.value.min) && amt <= parseFloat(depositLimit.value.max);
});

// 存款按钮是否禁用
const disablePay = computed(() => {
  // 金额不合法，禁用
  if (!validateAmount.value) return true;
  return false;
});
// 刮刮卡时选择快捷金额
const amountIndex = ref<null | number>(null)
const amountList = computed(() => {
  if (currentTunnel.value && currentTunnel.value.amount_list) {
    return currentTunnel.value.amount_list.split(',');
  }
  return [];
})
const chooseAmount = (index: number) => {
  amountIndex.value = index
  customAmount.value = amountList.value[index]
}

// 切换支付方式
const switchPay = (index: number) => {
  customAmount.value = '';
  amountIndex.value = null
  activeIndex.value = index;
  currentTunnelIndex.value = 0;
  currentPayData.value = []
  showPayDetail.value = false;
  getCurrentPayTunnel(curPayType.value?.id)
};

// 是否显示订单详情
const showPayDetail = ref(false);
const payDetailType = ref('')
const offlinePayData = ref<OfflinePayRes | null>(null)
// 线下支付
const offlineBanks = computed(() => isOffline.value ? currentPayData.value[0]?.bank : [])
const offlineCurrentBank = computed(() => offlineBanks.value.length ? offlineBanks.value[currentTunnelIndex.value] : {})
const { run: offlinePay } = useRequest(() => APIs.FinaceManualPay({ amount: toNumber(customAmount.value), id: tunnelId.value, bid: offlineCurrentBank.value.id }), {
  manual: true,
  onSuccess(res) {
    offlinePayData.value = res
    showPayDetail.value = true
    payDetailType.value = 'offline'

    // 保存最近使用的充值方式
    const saveInfo = {
      activeIndex: activeIndex.value,
      currentTunnelIndex: currentTunnelIndex.value
    }
    localStorage.setItem('saveInfo', JSON.stringify(saveInfo));
  },
  onAfter() {
    closeLoading()
    window.scrollTo && window.scrollTo({ top: 0, behavior: "smooth" })
  }
});
// 订单id
const orderId = ref('');
// CG支付
const cgPayData = ref<PayRes | null>(null);
// 默认存款
const { run: pay } = useRequest(() => APIs.FinacePay({ amount: toNumber(customAmount.value), id: tunnelId.value }), {
  manual: true,
  onSuccess(res) {
    cgPayData.value = null
    showPayDetail.value = true;
    if (res.useLink === '0') {
      // 第三方支付
      orderId.value = res.id;
      payDetailType.value = 'three-party'
      //  使用定时器，目的是解决safari不跳转的问题
      setTimeout(() => {
        window.open(res.url, '_blank');
      }, 100);
    }
    // CG支付
    if (res.useLink === '1' && res.qr_code) {
      payDetailType.value = 'cg-pay'
      cgPayData.value = res;
    }

    // 保存最近使用的充值方式
    const saveInfo = {
      activeIndex: activeIndex.value,
      currentTunnelIndex: currentTunnelIndex.value
    }
    localStorage.setItem('saveInfo', JSON.stringify(saveInfo));
  },
  onAfter() {
    closeLoading()
    window.scrollTo && window.scrollTo({ top: 0, behavior: "smooth" })
  }
});

// 存款操作
const depositHandler = async () => {
  startLoading()
  if (isOffline.value) {
    offlinePay();
    return
  }
  pay();
};

// 监听mqtt存款消息
const Dialog2 = new CgDialogClass()
const handleMqttDeposit = ({ status, amount, ts }: any) => {
  // 失败和成功的业务逻辑
  const operate = (chromeNoticeClick?: boolean) => {
    // 如果是从消息中心点击的，则关闭弹窗
    if (chromeNoticeClick) {
      Dialog2.closeDialog()
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
    props: { status, type: 'deposit', amount, time: ts },
    onOk() {
      if (status === 'failed') {
        const t = setTimeout(() => {
          window.open(getCustomerServeUrl(), '_blank')
          clearTimeout(t)
        }, 10);
      }
      reloadPage?.();
    },
    onCancel() {
      reloadPage?.();
    }
  })

  const body = status === 'success' ? 'NẠP TIỀN THÀNH CÔNG' : 'NẠP TIỀN KHÔNG THÀNH CÔNG ';
  const { isSupported, show, onClick } = useWebNotification({
    body,
    dir: 'auto',
    lang: 'en',
    renotify: false,
    tag: 'test'
  });
  if (isSupported) {
    show();
  }
  // chorme 通知点击
  onClick.on(() => operate(true));
};
useBus('deposit', handleMqttDeposit);
</script>
<template>
  <div class="deposit">
    <personal-title title="Nạp Tiền" description="Số Tiền Nạp Sẽ Được Chuyển Vào Ví Tiền Chính">
      <template #right>
        <div @click="openTutorial" class="tutorial">
          <span>Hướng Dẫn Nạp Tiền</span>
          <cg-icon class="tutorial-icon" width="30" name="i_question" />
        </div>
      </template>
    </personal-title>
    <template v-if="payTypes.length">
      <!-- 支付方式 -->
      <div class="pay-type">
        <label class="title">Hình thức thanh toán</label>
        <cg-radio v-slot="{ data }" v-model="activeIndex" :list="payTypes" type="payType" @onChoose="switchPay">
          <div class="pay-type-item">
            <cg-icon style="margin-bottom: 10px;" width="40" :name="`i_paytype_${data.id}`" />
            <span>{{ data.name }}</span>
          </div>
        </cg-radio>
      </div>
      <!-- 订单信息 -->
      <section v-if="showPayDetail">
        <cg-pay-info v-if="payDetailType === 'cg-pay'" :data="cgPayData" :payType="curPayTypeId"
          :amount="customAmount" />
        <OfflineInfo v-else-if="payDetailType === 'offline'" :data="offlinePayData" :amount="customAmount"
          :bid="offlineCurrentBank.id" />
        <three-party-info v-else-if="payDetailType === 'three-party'"
          :promo_discount="payTypes[activeIndex].promo_discount" :orderId="orderId"
          :payType="payTypes[activeIndex].name" :amount="customAmount" />
      </section>
      <template v-else>
        <!-- 通道 -->
        <div class="pay-tunnel">
          <label class="title">KÊNH NẠP TIỀN</label>
          <!-- 线下支付展示银行卡 -->
          <cg-radio v-if="isOffline" v-slot="{ data }" v-model="currentTunnelIndex" :list="offlineBanks ?? []"
            type="offline" @onChoose="handleTunnelChange">
            <div class="offline-item">
              <img class="bank-logo" :src="data.logo" alt="">
              {{ data.banklcard_name }}
            </div>
          </cg-radio>
          <!-- 其他通道 -->
          <cg-radio v-else v-slot="{ data, index }" v-model="currentTunnelIndex" :list="currentPayData ?? []"
            type="tunnel" @onChoose="handleTunnelChange">
            {{ `Kênh ${index + 1}-${data.payment_name}` }}
          </cg-radio>
        </div>
        <cg-divider margin="0 0 14px 0" />
        <!-- 支付 -->
        <div class="pay-info">

          <div v-if="curPayType.name.toLowerCase() === 'usdt'" class="usdt-pay-info">
            <div class="input-info">
              <cg-container shadow width="292" height="292" radius="8" padding="10,10,10,10"></cg-container>
              <div class="right">
                <label class="title">Số tiền nạp</label>
                <cg-amount-input style="margin-right: 10px;" v-model="customAmount" :maxLength="8" showMoney
                  :maxAmount="depositLimit.max" :precision="0"
                  :placeholder="`Vui lòng nhập số tiền cần nạp (${depositLimit.min}-${depositLimit.max})K`" />
                <div class="info">
                  <p><span>*</span>Giao Thức USDT: <strong>TRC20</strong></p>
                  <p><span>*</span>Tỷ Giá Nạp Tiền: <strong>1USDT≈ 23.57</strong></p>
                  <p><span>*</span>Số Lượng USDT: <em>0USDT</em><cg-icon name="i_copy_square" width="24" /></p>
                  <p><span>*</span>Vui lòng không sửa đổi số tiền nạp. Số tiền lên điểm sẽ căn cứ vào số tiền thực tế chuyển khoản làm chuẩn</p>
                </div>
                <ul class="form-ul">
                  <li class="item">
                    <div class="label">Địa Chỉ Chuyển Khoản</div>
                    <div class="fake-input">TEEPp2X4EH9E2fhwEDtfLdTRnH6ULWBpXJ<cg-icon class="suffix" name="i_copy_square" width="24" /></div>
                  </li>
                  <li class="item">
                    <div class="label"><span>*</span>ID Giao Dịch</div>
                    <div class="flex-1">
                      <cg-input class="input-box" maxlength="200" placeholder="Vui Lòng Điền ID Giao Dịch" />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="btn">
              <cg-button :disabled="disablePay" @click="depositHandler" width="300">
                Nạp tiền ngay
              </cg-button>
            </div>
            <cg-container shadow width="880" height="222" radius="8" padding="18,20,18,20">
              <template #content>
                <h3 class="warn-title">
                  <cg-icon name="i_path" width="24" />
                  Những điều lưu ý
                </h3>
                <cg-divider />
                <div class="warn-desc">
                  <p>1. Vui lòng không tin tưởng địa chỉ do bất kỳ cá nhân nào cung cấp, vui lòng lấy địa chỉ hoặc quét mã tiến hành nạp tiền trên trang chủ.</p>
                  <p>2. Vui lòng sử dụng chính xác Kênh giao dịch và Giao thức thanh toán (link địa chỉ) để thanh toán bằng tiền ảo.</p>
                  <p>3. Vui lòng sử dụng kênh nạp tiền ảo <strong>USDT-TRC20</strong>, các loại tiền ảo khác không khả dụng.</p>
                  <p>4. Không nạp tiền vào bất kỳ địa chỉ nào ngoại trừ <strong>USDT-TRC20</strong>, nếu không tiền sẽ không được trả lại.</p>
                </div>
              </template>
            </cg-container>
          </div>
          
          <template v-else>
            <label class="title">Số tiền nạp</label>
            <cg-radio v-if="isTheCao" @onChoose="chooseAmount" type="money" v-model="amountIndex" :list="amountList"
              v-slot="{ data }">
              {{ data }}K
            </cg-radio>
            <cg-amount-input v-else style="margin-right: 10px;" v-model="customAmount" :maxLength="8" showMoney
              :maxAmount="depositLimit.max" :precision="0"
              :placeholder="`Vui lòng nhập số tiền cần nạp (${depositLimit.min}-${depositLimit.max})K`" />
            <!-- 存款金额范围提示 -->
            <div class="pay-warn" v-show="+customAmount && !validateAmount">
              Vui lòng nhập chính xác số tiền nạp {{
                depositLimit.max.length > 8 ? `(Tối thiểu từ ${depositLimit.min}K)` :
                  `(${depositLimit.min}-${depositLimit.max})K`
              }}
            </div>
            <div class="tips">
              <p v-show="isTheCao"><span>＊</span>{{ `${customAmount ? customAmount : '1'}K=${customAmount ?
              toThousands(`${customAmount}000`) : '1,000'
              }` }}đ
              </p>
              <p><span>＊</span>Vui lòng không sửa đổi số tiền nạp. Số tiền lên điểm sẽ căn cứ vào số tiền thực tế chuyển
                khoản làm chuẩn
              </p>
            </div>
            <cg-button :disabled="disablePay" @click="depositHandler" width="300">
              Nạp tiền ngay
            </cg-button>
            <p class="cs-kh">Nạp tiền có vấn đề? Liên hệ <a target="_blank" :href="getCustomerServeUrl()">CSKH</a></p>
          </template>
        </div>
      </template>
    </template>
    <!-- 无支付方式 -->
    <cg-empty v-else>
      <div class="myCenter-nodata-text">
        <p>Hiện chưa có kênh nạp tiền,</p>
        <p>nếu quý khách gặp vấn đề khi nạp tiền,</p>
        <p class="cs-kh">vui lòng liên hệ <a :href="getCustomerServeUrl()" target="_blank">CSKH</a> xử lý.</p>
      </div>
    </cg-empty>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'Deposit'
}
</script>

<style lang='scss' scoped>
.deposit {
  font-size: var(--cg-font-15);
  color: var(--cg-color-grey1);

  .tutorial {
    display: flex;
    align-items: center;
    color: var(--cg-color-grey1);
    font-size: var(--cg-font-13);
    cursor: pointer;

    span {
      margin-right: 5.62px;
    }

    .tutorial-icon {
      transition: all ease .25s;
    }

    &:hover {
      color: var(--cg-color-blue12);

      .tutorial-icon {
        scale: 1.2;
      }
    }
  }

  .pay-type {
    margin-bottom: 30px;

    .pay-type-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .pay-tunnel {
    margin-bottom: 16px;
    min-height: 87px;

    .offline-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .bank-logo {
        width: 103px;
        height: 47px;
        object-fit: contain;
        margin-bottom: 3px;
      }
    }
  }

  .pay-info {
    display: flex;
    flex-direction: column;

    .title {
      margin-bottom: 12px;
    }

    .pay-warn {
      margin-top: 10px;
      font: var(--cg-font-text8);
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
  }

  .myCenter-nodata-text {
    color: var(--cg-color-grey1);
    font-size: var(--cg-font-13);

    p:nth-of-type(3) {
      margin: 0;
    }
  }
}

.title {
  font-size: var(--cg-font-17);
  text-transform: uppercase;
  display: block;
  margin-bottom: 8px;
}

.copy {
  cursor: pointer;
}


.cs-kh {
  margin-top: 10px;

  a {
    color: var(--cg-color-blue12);
    cursor: pointer;
    text-decoration: underline;
  }
}

.usdt-pay-info {
  padding-bottom: 20px;
  .input-info {
    display: flex;
    gap: 22px;
    justify-content: flex-start;
    .info {
      font: var(--cg-font-text);
      line-height: 17px;
      padding-top: 12px;
      p {
        padding-bottom: 6px;
        position: relative;
        width: fit-content;
        span {
          color: var(--cg-color-red);
        }
        em, strong {
          font-weight: 700;
        }
        em {
          color: var(--cg-color-blue12);
        }
      }
      p:last-child {
        padding-top: 6px;
      }
      .cg_icon {
        display: inline-block;
        position: absolute;
        top: -4px;
        right: -40px;
        cursor: pointer;
      }
    }
  }
  .btn {
    padding: 25px 0 20px 0;
  }
}
.warn-title {
  font: var(--cg-font-text2);
  color: var(--cg-color-red);
  padding-bottom: 18px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.warn-desc {
  font: var(--cg-font-text);
  line-height: 17px;
  color: var(--cg-color-grey1);
  padding-top: 20px;
  p {
    padding-bottom: 12px;
  }
  strong {
    color: var(--cg-color-red);
  }
}
.money-equal {
  font: var(--cg-font-text1);
  padding-top: 12px;
  span {
    color: var(--cg-color-red);
    font-weight: normal;
  }
}
.form-ul {
  padding: 6px 0;
  .item {
    padding: 6px 0;
    font: var(--cg-font-text);
    color: var(--cg-color-grey1);
    display: flex;
    align-items: center;
    .label {
      width: 168px;
      span {
        color: var(--cg-color-red);
      }
    }
    .fake-input {
      flex: 1;
      border-radius: 4px;
      border: 1px solid var(--cg-color-blue8);
      height: 38px;
      line-height: 36px;
      padding: 0 10px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .suffix {
        cursor: pointer;
      }
    }
  }
}
</style>