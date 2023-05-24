<script setup lang='ts'>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { CgContainer, CgIcon, CgDivider, CgAmount } from '@/components/cg-template-2'
import { newCopy } from '@/utils/common';
import { formatBankCard } from '@/utils/format'
import APIs from '@/http/blue-apis';
import { useRequest } from 'vue-request';

import type { OfflinePayRes } from './types'

interface Props {
  data: OfflinePayRes | null
  amount: string,
  bid: string
}
const props = defineProps<Props>()

const { data: codeData, run } = useRequest(() => APIs.getOfflinePayQrCode({ bid: props.bid, amount: props.amount ?? '', code: props.data?.manualRemark ?? '' }), {
  manual: true,
  onSuccess() { clearInterval(timer) }
})
const textArr = [
  `Vui lòng lúc mở App ngân hàng, quét mã QR chuyển khoản. Mỗi lần nạp tiền vui lòng lấy mã QR mới nhất. <span style="color:var(--cg-color-red);font-weight:700;">Vui lòng không sửa đổi số tiền và nội dung chuyển khoản!</span>`,
  '<span style="color:var(--cg-color-red);font-weight:700;">1 nội dung chuyển khoản chỉ sử dụng được 1 lần duy nhất.</span>',
  `Nếu quý khách không thể sử dụng quét mã chuyển khoản, vui lòng sử dụng App ngân hàng chuyển khoản nhất định phải sao chép tên ngân hàng, số tài khoản ngân hàng, số tiền, mã nạp tiền, đồng thời xác nhận họ tên chính xác sau đó tiến hành chuyển khoản!`,
  `Quý khách vui lòng truy cập trang chủ để nhận thông tin chuyển khoản trên trang, vui lòng không tin tưởng nhận thông tin chuyển khoản từ bất kỳ cá nhân nào (cho dù là đại lý cấp trên của bạn).`,
  `Quá 2 phút quý khách chưa nhận được tiền vào tài khoản, xin vui lòng liên hệ ngay CSKH để được xử lý ngay.`
]
const dots = ref('···')
let timer: any;
const makeLoading = () => {
  timer = setInterval(() => {
    if (dots.value === '···') {
      dots.value = '·'
    } else {
      dots.value += '·'
    }
  }, 500)
}
onMounted(() => {
  run()
  makeLoading()
})
onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>
<template>
  <cg-container margin="0,0,30,0" radius="8" type="smallContainer">
    <template #content>
      <div class="part1">
        <div class="qr-code-box">
          <div class="no-code" v-if="!codeData?.qr">
            <CgIcon width="200" name="i_no_code" />
            <div class="span">Đang Lấy Mã QR{{ dots }}</div>
          </div>
          <img v-else :src="codeData.qr" alt="">
        </div>
        <div class="info-box">
          <!-- 银行 -->
          <div class="info-item">
            <label>Ngân Hàng Nhận:</label>
            <span>{{ data?.name }}</span>
            <CgIcon class="copy" width="24" name="i_copy_square" @click="newCopy(data?.name ?? '')" />
          </div>
          <!-- 名 -->
          <div class="info-item">
            <label>Họ Tên:</label>
            <span>{{ data?.realname }}</span>
          </div>
          <!-- 卡号 -->
          <div class="info-item">
            <label>Tài Khoản Nhận:</label>
            <span>{{ formatBankCard(data?.cardNo ?? '') }}</span>
            <CgIcon class="copy" width="24" name="i_copy_square" @click="newCopy(data?.cardNo ?? '')" />
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
            <span>{{ data?.manualRemark }}</span>
            <CgIcon class="copy" width="24" name="i_copy_square" @click="newCopy(data?.manualRemark ?? '')" />
          </div>
        </div>
      </div>
    </template>
  </cg-container>

  <!-- offline提示语 -->
  <CgContainer margin="30,0,20,0" padding="0,22,22,22" radius="8" type="smallContainer">
    <template #content>
      <div class="tips-text">
        <div class="head">
          <CgIcon style="margin-right:10.8px ;" width="24.2" name="i_path" />
          <span>Những điều lưu ý</span>
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
  name: 'OfflinePay'
}
</script>

<style lang='scss' scoped>
.copy {
  cursor: pointer;
}

.part1 {
  display: flex;


  .qr-code-box {
    width: 209px;
    height: 209px;
    padding: 4.5px;
    border-right: 1px solid var(--cg-color-blue8);

    img {
      width: 100%;
    }

    .no-code {
      position: relative;
      width: 100%;

      .span {
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: 200px;
        text-align: center;
        line-height: 200px;
      }
    }
  }

  .info-box {
    flex: 1;

    .info-item {
      height: 42px;
      display: flex;
      align-items: center;
      padding: 0 20px;

      label {
        width: 210px;
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

.tips-text {
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