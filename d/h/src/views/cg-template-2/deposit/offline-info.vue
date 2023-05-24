<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { CgIcon, CgContainer, CgDivider, CgAmount, CgButton } from '@/components/cg-template-2';
import { newCopy } from '@/utils/common';
import { Toast } from 'vant'
import APIs from '@/http/blue-apis';
import { formatBankCard } from '@/utils/format'
import axios from 'axios'
import download from 'downloadjs';

const emit = defineEmits(['title'])
emit('title', 'NẠP TIỀN')

const offlineData = JSON.parse(sessionStorage.getItem('offlineData') ?? '{}')

const qrUrl = ref('')
const getOfflinePayCode = () => {
  APIs.getOfflinePayQrCode({ bid: offlineData.bid, amount: offlineData.amount, code: offlineData.manualRemark })
    .then((res) => {
      qrUrl.value = res.qr
    })
}

// 下载二维码
const onDownload = async () => {
  const urls = qrUrl.value ?? '';
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

const copy = (str: string) => {
  newCopy(str)
  Toast('Sao chép thành công')
}

const textArr = [
  `Vui lòng lúc mở App ngân hàng, quét mã QR chuyển khoản. Mỗi lần nạp tiền vui lòng lấy mã QR mới nhất. <span style="color:var(--cg-color-red2);font-weight:700;">Vui lòng không sửa đổi số tiền và nội dung chuyển khoản!</span>`,
  '<span style="color:var(--cg-color-red2);font-weight:700;">1 nội dung chuyển khoản chỉ sử dụng được 1 lần duy nhất.</span>',
  `Nếu quý khách không thể sử dụng quét mã chuyển khoản, vui lòng sử dụng App ngân hàng chuyển khoản nhất định phải sao chép tên ngân hàng, số tài khoản ngân hàng, số tiền, mã nạp tiền, đồng thời xác nhận họ tên chính xác sau đó tiến hành chuyển khoản!`,
  `Quý khách vui lòng truy cập trang chủ để nhận thông tin chuyển khoản trên trang, vui lòng không tin tưởng nhận thông tin chuyển khoản từ bất kỳ cá nhân nào (cho dù là đại lý cấp trên của bạn).`,
  `Quá 2 phút quý khách chưa nhận được tiền vào tài khoản, xin vui lòng liên hệ ngay CSKH để được xử lý ngay.`
]

onMounted(() => {
  getOfflinePayCode()
})
</script>
<template>
  <div class='offline-info'>
    <div class="body">
      <CgContainer margin="0,0,24,0" padding="48,53,32">
        <div class="code">
          <template v-if="qrUrl">
            <img :src="qrUrl" alt="">
          </template>
          <template v-else>
            <CgIcon width="580" name="i_no_code" />
            <span>Đang Lấy Mã QR···</span>
          </template>
        </div>
        <CgButton width="580" :disabled="!qrUrl" @click="onDownload">NHẤN ĐỂ LƯU MÃ</CgButton>
      </CgContainer>
      <!-- 订单信息 -->
      <CgContainer margin="0,0,24,0">
        <div class="info-item">
          <label>Ngân Hàng Nhận:</label>
          <span>{{ offlineData.name }}</span>
          <div style="width: var(--cg-px-46);">
            <CgIcon width="46" name="i_copy" @click="copy(offlineData.name)" />
          </div>
        </div>
        <div class="info-item">
          <label>Họ Tên:</label>
          <span>{{ offlineData.realname }}</span>
          <div style="width: var(--cg-px-46);">
          </div>
        </div>
        <div class="info-item">
          <label>Tài Khoản Nhận:</label>
          <span>{{ formatBankCard(offlineData.cardNo) }}</span>
          <div style="width: var(--cg-px-46);">
            <CgIcon width="46" name="i_copy" @click="copy(offlineData.cardNo)" />
          </div>
        </div>
        <div class="info-item">
          <label>Số Tiền Thanh Toán:</label>
          <span>
            <CgAmount weight="700" size="32" segmentation color="blue1" :amount="`${offlineData.amount}000`" />
          </span>
          <div style="width: var(--cg-px-46);">
            <CgIcon width="46" name="i_copy" @click="copy(`${offlineData.amount}000`)" />
          </div>
        </div>
        <div class="info-item">
          <label>Nội Dung Chuyển Khoản:</label>
          <span>{{ offlineData.manualRemark }}</span>
          <div style="width: var(--cg-px-46);">
            <CgIcon width="46" name="i_copy" @click="copy(offlineData.manualRemark)" />
          </div>
        </div>
      </CgContainer>

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
  name: 'OfflineInfo'
}
</script>

<style lang='scss' scoped>
.offline-info {
  .body {
    padding: 24px 32px 100px;

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
        width: 580px;
        height: 580px;
        object-fit: contain;
      }

      span {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        display: block;
        width: 100%;
        text-align: center;
      }
    }

    .info-item {
      font: var(--cg-font-text9);
      height: 80px;
      display: flex;
      align-items: center;
      padding: 0 20px;

      span {
        flex: 1;
        text-align: right;
        margin-right: 21px;
        font: var(--cg-font-h4);
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