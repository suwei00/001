<script setup lang='ts'>
import { onMounted, computed, inject } from 'vue'
import { CgContainer, CgContainerHead, CgIcon, CgDivider, CgAmount } from '@/components/cg-template-2'
import { useCountDown } from '@vant/use';
import { newCopy } from '@/utils/common';
import { formatBankCard } from '@/utils/format'

import type { PayRes } from './types'

interface Props {
  data: PayRes | null
  payType: string
  amount: string
}
const reloadPage = inject<() => void>('reloadPage');
const props = defineProps<Props>()
const BankShortName = JSON.parse(sessionStorage.getItem('BankShortName') ?? '[]')
const bankName = BankShortName.find((b: any) => b.bank_code === props.data?.bank_code)?.short_name // 银行名称

const { current, start, reset } = useCountDown({
  time: 10 * 60 * 1000,
  onFinish() {
    reloadPage?.();
    reset();
  }
})

const isQrBank = props.payType === '8'
const isMoMo = props.payType === '1'
const isZalo = props.payType === '2'
const isViettelPay = props.payType === '6'
// 注意事项
const textArr = computed(() => {
  if (isQrBank) {
    return [ // 其他 有二维码
      'Vui lòng lúc mở App ngân hàng, quét mã QR chuyển khoản. Mỗi lần nạp tiền vui lòng lấy mã QR mới nhất. &nbsp;<span style="color:var(--cg-color-red);font-weight:700;">Vui lòng không sửa đổi số tiền và nội dung chuyển khoản!</span>',
      '<span style="color:var(--cg-color-red);font-weight:700;">1 nội dung chuyển khoản chỉ sử dụng được 1 lần duy nhất.</span>',
      'Nếu quý khách không thể sử dụng quét mã chuyển khoản, vui lòng sử dụng App ngân hàng chuyển khoản nhất định phải sao chép tên ngân hàng, số tài khoản ngân hàng, số tiền, mã nạp tiền, đồng thời xác nhận họ tên chính xác sau đó tiến hành chuyển khoản!',
      'Quý khách vui lòng truy cập trang chủ để nhận thông tin chuyển khoản trên trang, vui lòng không tin tưởng nhận thông tin chuyển khoản từ bất kỳ cá nhân nào (cho dù là đại lý cấp trên của bạn).',
      'Quá 2 phút quý khách chưa nhận được tiền vào tài khoản, xin vui lòng liên hệ ngay CSKH để được xử lý ngay.',
    ]
  } else if (isMoMo) {
    return [ // momo
      `Vui lòng mở App MoMo, quét mã QR chuyển khoản. Mỗi lần nạp tiền vui lòng lấy mã QR mới nhất. &nbsp;<span style="color:var(--cg-color-red);font-weight:700;">Vui lòng không sửa đổi số tiền và nội dung chuyển khoản!</span>`,
      '<span style="color:var(--cg-color-red);font-weight:700;">1 nội dung chuyển khoản chỉ sử dụng được 1 lần duy nhất.</span>',
      'Quý khách vui lòng truy cập trang chủ để nhận thông tin chuyển khoản trên trang, vui lòng không tin tưởng nhận thông tin chuyển khoản từ bất kỳ cá nhân nào (cho dù là đại lý cấp trên của bạn).',
      'Quá 2 phút quý khách chưa nhận được tiền vào tài khoản, xin vui lòng liên hệ ngay CSKH để được xử lý ngay.',
    ]
  }
  else if (isZalo) {
    return [ // zalo
      'Vui lòng mở App Zalo Pay, quét mã QR. Mỗi lần nạp tiền vui lòng lấy mã QR mới nhất. &nbsp;<span style="color:var(--cg-color-red);font-weight:700;">Vui lòng không sửa đổi số tiền và nội dung chuyển khoản!</span>',
      '<span style="color:var(--cg-color-red);font-weight:700;">1 nội dung chuyển khoản chỉ sử dụng được 1 lần duy nhất.</span>',
      'Quý khách vui lòng truy cập trang chủ để nhận thông tin chuyển khoản trên trang, vui lòng không tin tưởng nhận thông tin chuyển khoản từ bất kỳ cá nhân nào (cho dù là đại lý cấp trên của bạn).',
      'Quá 2 phút quý khách chưa nhận được tiền vào tài khoản, xin vui lòng liên hệ ngay CSKH để được xử lý ngay.',
    ]
  }
  else if (isViettelPay) {
    return [ // viettelpay
      'Vui lòng mở App ViettelPay, quét mã QR chuyển khoản. Mỗi lần nạp tiền vui lòng lấy mã QR mới nhất.&nbsp;<span style="color:var(--cg-color-red);font-weight:700;">Vui lòng không sửa đổi số tiền và nội dung chuyển khoản! </span>',
      '<span style="color:var(--cg-color-red);font-weight:700;">1 nội dung chuyển khoản chỉ sử dụng được 1 lần duy nhất.</span>',
      'Quý khách vui lòng truy cập trang chủ để nhận thông tin chuyển khoản trên trang, vui lòng không tin tưởng nhận thông tin chuyển khoản từ bất kỳ cá nhân nào (cho dù là đại lý cấp trên của bạn).',
      'Quá 2 phút quý khách chưa nhận được tiền vào tài khoản, xin vui lòng liên hệ ngay CSKH để được xử lý ngay.',
    ]
  }
  else return []
})

onMounted(() => {
  start()
})
</script>
<template>
  <cg-container margin="0,0,30,0" radius="8" type="smallContainer">
    <template #content>
      <div class="part1">
        <div class="qr-code-box">
          <img :src="data?.qr_code" alt="">
        </div>
        <div class="info-box">
          <CgContainerHead height="70">
            <template #center>
              <div class="count-down">
                <CgIcon width="58" name="i_clock" />
                <div class="time">
                  <label>Thời gian</label>
                  <span>{{ current.minutes < 10 ? `0${current.minutes}` : current.minutes }}:{{
                    current.seconds < 10 ?
                      `0${current.seconds}` : current.seconds
                  }}</span>
                </div>
              </div>
            </template>
          </CgContainerHead>
          <!-- 银行 -->
          <div class="info-item">
            <label>Ngân Hàng Nhận:</label>
            <span>{{ bankName }}</span>
            <CgIcon class="copy" width="24" name="i_copy_square" @click="newCopy(bankName)" />
          </div>
          <!-- 名 -->
          <div class="info-item">
            <label>Họ Tên:</label>
            <span>{{ data?.card_holder }}</span>
          </div>
          <!-- 卡号 -->
          <div class="info-item">
            <label>Tài Khoản Nhận:</label>
            <span>{{ formatBankCard(data?.account ?? '') }}</span>
            <CgIcon class="copy" width="24" name="i_copy_square" @click="newCopy(data?.account ?? '')" />
          </div>
          <!-- 金额 -->
          <div class="info-item">
            <label>Số Tiền Thanh Toán:</label>
            <span>
              <CgAmount weight="700" :segmentation="true" color="blue12" :amount="`${amount}000`" />
            </span>
            <CgIcon class="copy" width="24" name="i_copy_square" @click="newCopy(`${amount}000`)" />
          </div>
          <!-- 流水号 -->
          <div class="info-item">
            <label>Nội Dung Chuyển Khoản:</label>
            <span>{{ data?.pay_code }}</span>
            <CgIcon class="copy" width="24" name="i_copy_square" @click="newCopy(data?.pay_code ?? '')" />
          </div>
        </div>
      </div>
    </template>
  </cg-container>

  <!-- 提示语 -->
  <CgContainer padding="0,22,22,22" radius="8" type="smallContainer">
    <template #content>
      <div class="part2">
        <div class="head">
          <CgIcon style="margin-right:10.8px ;" width="24.2" name="i_path" />
          <span>NHỮNG ĐIỀU LƯU Ý</span>
        </div>
        <CgDivider margin="0 0 21px 0" />
        <ol>
          <li v-for="t, i in textArr" :key="i" v-html="t"></li>
        </ol>
      </div>
    </template>
  </CgContainer>
</template>
<script lang='ts'>
export default {
  name: 'CgPayInfo'
}
</script>

<style lang='scss' scoped>
.copy {
  cursor: pointer;
}

.part1 {
  display: flex;


  .qr-code-box {
    width: 277px;
    height: 281px;
    padding: 10px;
    border-right: 1px solid var(--cg-color-blue8);

    img {
      width: 100%;
      height: 100%;
    }
  }

  .info-box {
    flex: 1;

    .count-down {
      display: flex;
      align-items: center;

      .time {
        width: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;

        label {
          font-size: var(--cg-font-13);
          font-weight: 400;
          text-transform: uppercase;
        }

        span {
          color: var(--cg-color-blue12);
          font-size: var(--cg-font-36);

        }
      }
    }

    .info-item {
      height: 42px;
      display: flex;
      align-items: center;
      padding: 0 20px;

      label {
        width: 202px;
        font-size: var(--cg-font-15);
      }

      span {
        flex: 1;
      }

      &:nth-of-type(odd) {
        background-color: var(--cg-color-white5);
      }
    }
  }
}

.part2 {
  .head {
    height: 53px;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-size: var(--cg-font-17);
      font-weight: 700;
      color: var(--cg-color-red);
      text-transform: uppercase;
    }
  }

  ol {
    width: 100%;
    list-style: decimal;
    padding-left: 15px;

    li {
      margin-bottom: 10px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
}
</style>