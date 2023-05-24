<script setup lang='ts'>
import { CgIcon, CgContainer, CgDivider, CgAmount, CgButton, CgContainerHead } from '@/components/cg-template-2';
import { newCopy } from '@/utils/common';
import { Toast } from 'vant'
import { useCountDown } from '@vant/use';
import { computed, onMounted } from 'vue'
import axios from 'axios'
import download from 'downloadjs';
import { useRouter } from 'vue-router'
import { formatBankCard } from '@/utils/format'

const router = useRouter()
const emit = defineEmits(['title'])
emit('title', 'NẠP TIỀN')

const BankShortName = JSON.parse(sessionStorage.getItem('BankShortName') ?? '[]')
const CGPAYData = JSON.parse(sessionStorage.getItem('CGPAYData') ?? '{}')
const payType = CGPAYData.payType // 支付方式
const amount = `${CGPAYData.amount}000` // 金额
const expireTime = CGPAYData.expireTime // 过期时间
const bankName = BankShortName.find((b: any) => b?.bank_code === CGPAYData?.bank_code)?.short_name // 银行名称

const isQrBank = payType === '8'
const isMoMo = payType === '1'
const isZalo = payType === '2'
const isViettelPay = payType === '6'
// 注意事项
const textArr = computed(() => {
  if (isQrBank) {
    return [ // 其他 有二维码
      'Vui lòng lúc mở App ngân hàng, quét mã QR chuyển khoản. Mỗi lần nạp tiền vui lòng lấy mã QR mới nhất.<br/><span style="color:var(--cg-color-red2);font-weight:700;">Vui lòng không sửa đổi số tiền và nội dung chuyển khoản!</span>',
      '<span style="color:var(--cg-color-red2);font-weight:700;">1 nội dung chuyển khoản chỉ sử dụng được 1 lần duy nhất.</span>',
      'Nếu quý khách không thể sử dụng quét mã chuyển khoản, vui lòng sử dụng App ngân hàng chuyển khoản nhất định phải sao chép tên ngân hàng, số tài khoản ngân hàng, số tiền, mã nạp tiền, đồng thời xác nhận họ tên chính xác sau đó tiến hành chuyển khoản!',
      'Quý khách vui lòng truy cập trang chủ để nhận thông tin chuyển khoản trên trang, vui lòng không tin tưởng nhận thông tin chuyển khoản từ bất kỳ cá nhân nào (cho dù là đại lý cấp trên của bạn).',
      'Quá 2 phút quý khách chưa nhận được tiền vào tài khoản, xin vui lòng liên hệ ngay CSKH để được xử lý ngay.',
    ]
  } else if (isMoMo) {
    return [ // momo
      `Vui lòng mở App MoMo, quét mã QR chuyển khoản. Mỗi lần nạp tiền vui lòng lấy mã QR mới nhất.<br/><span style="color:var(--cg-color-red2);font-weight:700;">Vui lòng không sửa đổi số tiền và nội dung chuyển khoản!</span>`,
      '<span style="color:var(--cg-color-red2);font-weight:700;">1 nội dung chuyển khoản chỉ sử dụng được 1 lần duy nhất.</span>',
      'Quý khách vui lòng truy cập trang chủ để nhận thông tin chuyển khoản trên trang, vui lòng không tin tưởng nhận thông tin chuyển khoản từ bất kỳ cá nhân nào (cho dù là đại lý cấp trên của bạn).',
      'Quá 2 phút quý khách chưa nhận được tiền vào tài khoản, xin vui lòng liên hệ ngay CSKH để được xử lý ngay.',
    ]
  }
  else if (isZalo) {
    return [ // zalo
      'Vui lòng mở App Zalo Pay, quét mã QR. Mỗi lần nạp tiền vui lòng lấy mã QR mới nhất.<br/><span style="color:var(--cg-color-red2);font-weight:700;">Vui lòng không sửa đổi số tiền và nội dung chuyển khoản!</span>',
      '<span style="color:var(--cg-color-red2);font-weight:700;">1 nội dung chuyển khoản chỉ sử dụng được 1 lần duy nhất.</span>',
      'Quý khách vui lòng truy cập trang chủ để nhận thông tin chuyển khoản trên trang, vui lòng không tin tưởng nhận thông tin chuyển khoản từ bất kỳ cá nhân nào (cho dù là đại lý cấp trên của bạn).',
      'Quá 2 phút quý khách chưa nhận được tiền vào tài khoản, xin vui lòng liên hệ ngay CSKH để được xử lý ngay.',
    ]
  }
  else if (isViettelPay) {
    return [ // viettelpay
      'Vui lòng mở App ViettelPay, quét mã QR chuyển khoản. Mỗi lần nạp tiền vui lòng lấy mã QR mới nhất.<br/><span style="color:var(--cg-color-red2);font-weight:700;">Vui lòng không sửa đổi số tiền và nội dung chuyển khoản! </span>',
      '<span style="color:var(--cg-color-red2);font-weight:700;">1 nội dung chuyển khoản chỉ sử dụng được 1 lần duy nhất.</span>',
      'Quý khách vui lòng truy cập trang chủ để nhận thông tin chuyển khoản trên trang, vui lòng không tin tưởng nhận thông tin chuyển khoản từ bất kỳ cá nhân nào (cho dù là đại lý cấp trên của bạn).',
      'Quá 2 phút quý khách chưa nhận được tiền vào tài khoản, xin vui lòng liên hệ ngay CSKH để được xử lý ngay.',
    ]
  }
  else return []
})

// 复制信息
const handleCopy = (v: string) => {
  newCopy(v);
  Toast('Sao chép thành công');
};

// 下载二维码
const onDownload = async () => {
  const urls = CGPAYData.qr_code ?? '';
  // 下载图片
  const res = await axios.get(urls, {
    responseType: 'blob'
  });
  const blob = new Blob([res.data], {
    type: 'image/png'
  });
  download(blob, `${Math.floor(Math.random() * 10000000)}.png`, 'image/png');

  Toast('Mã QR chỉ có hiệu lực cho lần chuyển khoản này, khi chuyển khoản lần nữa quý khách vui lòng làm mới mã QR！');
}

// 返回并清除数据
const clearCGPAYData = () => {
  router.back()
  const t = setTimeout(() => {
    sessionStorage.removeItem('CGPAYData')
    clearTimeout(t)
  }, 100);
}

// 倒计时
const { current, start, reset } = useCountDown({
  time: 0,
  onFinish() {
    clearCGPAYData()
  }
})

onMounted(() => {
  const time = expireTime - new Date().getTime()
  if (time <= 0) return clearCGPAYData()
  reset(time)
  start()
})
</script>
<template>
  <div class='cgpay-info'>
    <div class="body">
      <template v-if="isQrBank">
        <CgContainer margin="0,0,24,0" class="qrbank-box">
          <div class="left">
            <div class="left-item">
              <label>Ngân Hàng Nhận:</label>
              <div class="info">
                <span>{{ bankName }}</span>
                <CgIcon width="46" name="i_copy" @click="handleCopy(bankName)" />
              </div>
            </div>
            <div class="left-item">
              <label>Họ Tên:</label>
              <div class="info">
                <span style="word-break: break-all;">{{ CGPAYData.card_holder }}</span>
                <div style="width: var(--cg-px-58);"></div>
              </div>
            </div>
            <div class="left-item">
              <label>Tài Khoản Nhận:</label>
              <div class="info">
                <span style="letter-spacing: -1px;">{{ formatBankCard(CGPAYData.account ?? '') }}</span>
                <CgIcon width="46" name="i_copy" @click="handleCopy(CGPAYData.account)" />
              </div>
            </div>
            <div class="left-item">
              <label>Số Tiền Thanh Toán:</label>
              <div class="info">
                <CgAmount weight="700" size="32" segmentation color="blue1" :amount="amount" />
                <CgIcon width="46" name="i_copy" @click="handleCopy(amount)" />
              </div>
            </div>
            <div class="left-item">
              <label>Nội Dung Chuyển Khoản:</label>
              <div class="info">
                <span>{{ CGPAYData.pay_code }}</span>
                <CgIcon width="46" name="i_copy" @click="handleCopy(CGPAYData.pay_code)" />
              </div>
            </div>
          </div>
          <div class="right">
            <div class="count-down-box">
              <CgIcon width="92" name="i_clock" />
              <div class="count-down">
                <label class="uppercase">Thời gian</label>
                <span>{{ current.minutes < 10 ? `0${current.minutes}` : current.minutes }}:{{
                  current.seconds < 10 ?
                    `0${current.seconds}` : current.seconds
                }}</span>
              </div>
            </div>
            <div class="code-box">
              <img class="qr" :src="CGPAYData.qr_code" alt="">
              <app-image class="logos" src="/finance/qrinfo-img1.png" />
            </div>
            <CgButton center width="256" @click="onDownload">NHẤN ĐỂ<br />
              LƯU MÃ</CgButton>
          </div>
        </CgContainer>
      </template>
      <template v-else>
        <CgContainer margin="0,0,24,0" padding="48,53,32">
          <div class="code">
            <img :src="CGPAYData.qr_code" alt="">
          </div>
          <CgButton width="580" @click="onDownload">NHẤN ĐỂ LƯU MÃ</CgButton>
        </CgContainer>
        <!-- 订单信息 -->
        <CgContainer margin="0,0,24,0">
          <CgContainerHead height="124">
            <template #center>
              <div class="count-down-box">
                <CgIcon width="92" name="i_clock" />
                <div class="count-down">
                  <label class="uppercase">Thời gian</label>
                  <span>{{ current.minutes < 10 ? `0${current.minutes}` : current.minutes }}:{{
                    current.seconds < 10 ?
                      `0${current.seconds}` : current.seconds
                  }}</span>
                </div>
              </div>
            </template>
          </CgContainerHead>
          <div class="info-item">
            <label>Ngân Hàng Nhận:</label>
            <span>{{ bankName }}</span>
            <div style="width: var(--cg-px-46);">
              <CgIcon width="46" name="i_copy" @click="handleCopy(bankName)" />
            </div>
          </div>
          <div class="info-item" style="align-items: flex-start;">
            <label>Họ Tên:</label>
            <div class="card-holder-box">
              <div class="card-holder">{{ CGPAYData.card_holder }}</div>
            </div>
            <div style="width: var(--cg-px-46);"></div>
          </div>
          <div class="info-item">
            <label>Tài Khoản Nhận:</label>
            <span>{{ formatBankCard(CGPAYData.account ?? '') }}</span>
            <div style="width: var(--cg-px-46);">
              <CgIcon width="46" name="i_copy" @click="handleCopy(CGPAYData.account)" />
            </div>
          </div>
          <div class="info-item">
            <label>Số Tiền Thanh Toán:</label>
            <span>
              <CgAmount weight="700" size="32" segmentation color="blue1" :amount="amount" />
            </span>
            <div style="width: var(--cg-px-46);">
              <CgIcon width="46" name="i_copy" @click="handleCopy(amount)" />
            </div>
          </div>
          <div class="info-item">
            <label>Nội Dung Chuyển Khoản:</label>
            <span>{{ CGPAYData.pay_code }}</span>
            <div style="width: var(--cg-px-46);">
              <CgIcon width="46" name="i_copy" @click="handleCopy(CGPAYData.pay_code)" />
            </div>
          </div>
        </CgContainer>
      </template>

      <!-- 注意事项 -->
      <CgContainer padding="0,22,20">
        <div class="title">
          <CgIcon width="42" name="i_path" />
          <span>NHỮNG ĐIỀU LƯU Ý</span>
        </div>
        <CgDivider />
        <ol>
          <li v-for="t, i in textArr" :key="i" v-html="t"></li>
        </ol>
      </CgContainer>
    </div>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'CGPayInfo'
}
</script>

<style lang='scss' scoped>
.cgpay-info {
  .body {
    padding: 24px 32px 100px;

    .qrbank-box {
      display: flex;

      .left {
        width: 406px;

        .left-item {
          display: flex;
          flex-direction: column;
          padding: 20px 12px 14px 20px;

          label {
            font: var(--cg-font-text9);
          }

          .info {
            flex: 1;
            font: var(--cg-font-h4);
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          &:nth-of-type(even) {
            background-color: var(--cg-color-blue16);
          }
        }
      }

      .right {
        width: 280px;
        border-left: 1px solid var(--cg-color-blue11);
        padding-bottom: 20px;
        display: flex;
        flex-direction: column;

        .code-box {
          margin-bottom: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;

          .qr {
            width: 268px;
            height: 268px;
            object-fit: contain;
          }

          .logos {
            height: 34px;
            margin-top: 7px;
          }
        }

        .count-down-box {
          height: 124px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

      }
    }



    .code {
      width: 580px;
      height: 580px;
      position: relative;
      font: var(--cg-font-text11);
      margin-bottom: 32px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        object-fit: contain;
        width: 580px;
        height: 580px;
      }
    }

    .count-down-box {
      display: flex;
      align-items: center;
      font: var(--cg-font-text4);

      .count-down {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 16px;
        width: 123px;

        span {
          font: var(--cg-font-special);
          color: var(--cg-color-blue1);
        }
      }
    }

    .info-item {
      font: var(--cg-font-text9);
      display: flex;
      align-items: center;
      padding: 16px 20px 18px;

      span {
        flex: 1;
        text-align: right;
        margin-right: 18px;
        font: var(--cg-font-h4);
      }

      .card-holder-box {
        margin-left: 119px;
        margin-right: 18px;
        flex: 1;
        font: var(--cg-font-h4);
        display: flex;
        justify-content: flex-end;
        word-break: break-all;

        .card-holder {
          text-align: left;
        }
      }

      &:nth-of-type(even) {
        background-color: var(--cg-color-blue16);
      }
    }

    .title {
      height: 78px;
      display: flex;
      align-items: center;
      justify-content: center;
      font: var(--cg-font-h4);
      color: var(--cg-color-red2);

      span {
        margin-left: 12px;
      }
    }

    ol {
      width: 100%;
      list-style: decimal;
      margin-top: 24px;
      padding-left: 30px;
      font: var(--cg-font-text3);

      li {
        margin-bottom: 20px;

        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>