<script setup lang='ts' name=''>
import { onMounted, computed, inject } from 'vue'
import { CgContainer, CgContainerHead, CgIcon, CgDivider, CgAmount, CgButton } from '@/components/cg-template-2'
import { useCountDown } from '@vant/use';
import { newCopy } from '@/utils/common';
import { toThousands, mul } from '@/utils/format';

interface Props {
  payType: string
  amount: string
  orderId: string
  promo_discount: string
}
defineProps<Props>()
const reloadPage = inject<() => void>('reloadPage');

const { current, start, reset } = useCountDown({
  time: 30 * 60 * 1000,
  onFinish() {
    reloadPage?.();
    reset();
  }
})
const textArr = [
  'Quý khách vui lòng <span style="color:var(--cg-color-red);font-weight:700;">chọn đúng mệnh giá và nhà mạng</span> của thẻ nạp để được xử lý lên điểm nhanh nhất.',
  'Vui lòng <span style="color:var(--cg-color-red);font-weight:700;">điền mã số thẻ và mã số seri chính xác</span> để không bị chậm trễ lên điểm.',
  'Vui lòng hoàn tất thanh toán trong thời gian hiệu lực, tối đa thời gian 30 phút.',
  'Mọi thắc mắc về vấn đề nạp tiền, xin vui lòng liên hệ CSKH để được hỗ trợ.',
  'Nếu chưa nắm rõ quy trình nạp tiền, quý khách vui lòng tham khảo hướng dẫn nạp hoặc liên hệ CSKH để được hỗ trợ.',
]

onMounted(() => {
  start()
})
</script>
<template>
  <cg-container margin="0,0,30,0" radius="8" type="smallContainer">
    <template #content>
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
      <div class="info-item">
        <label>Hình Thức Thanh Toán:</label>
        <span>{{ payType }}</span>
      </div>
      <div class="info-item">
        <label>Số Tiền Thanh Toán:</label>
        <span>
          <CgAmount weight="700" size="15" :segmentation="true" color="blue12" :amount="`${amount}000`" />
        </span>
        <CgIcon class="copy" width="24" name="i_copy_square" @click="newCopy(`${amount}000`)" />
      </div>
      <div class="info-item">
        <label>Số Đơn:</label>
        <span>{{ orderId }}</span>
        <CgIcon class="copy" width="24" name="i_copy_square" @click="newCopy(orderId)" />
      </div>
      <div class="info-item">
        <label>{{ + promo_discount > 0 ? 'Khuyến Mãi Nạp Tiền' : 'Phí Xử Lý' }}:</label>
        <span>{{ toThousands(mul(`${(+promo_discount / 100)}`, `${amount}000`)) }}</span>
      </div>
    </template>
  </cg-container>
  <!-- 提示语 -->
  <CgContainer padding="0,22,22,22" radius="8" type="smallContainer">
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
  name: 'ThreePartyInfo'
}
</script>

<style lang='scss' scoped>
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
  padding: 0 18px 0 23px;

  label {
    width: 225px;
    font-size: var(--cg-font-15);
  }

  span {
    flex: 1;
  }

  &:nth-of-type(odd) {
    background-color: var(--cg-color-white5);
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

.copy {
  cursor: pointer;
}
</style>