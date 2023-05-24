<script setup lang='ts'>
import { CgIcon, CgContainer, CgDivider, CgAmount, CgContainerHead } from '@/components/cg-template-2';
import { newCopy } from '@/utils/common';
import { Toast } from 'vant'
import { onMounted } from 'vue'
import { useCountDown } from '@vant/use';
import { formatNumberToCurrencyWithoutK } from '@/utils/format'
import { useRouter } from 'vue-router'

const router = useRouter()
const emit = defineEmits(['title'])
emit('title', 'NẠP TIỀN')

const data = JSON.parse(sessionStorage.getItem('threePartyPayData') ?? '{}')

const copy = (str: string) => {
  newCopy(str)
  Toast('Sao chép thành công')
}

const textArr = [
  'Quý khách vui lòng <span style="color:var(--cg-color-red2);font-weight:700;">chọn đúng mệnh giá và nhà mạng</span> của thẻ nạp để được xử lý lên điểm nhanh nhất.',
  'Vui lòng <span style="color:var(--cg-color-red2);font-weight:700;">điền mã số thẻ và mã số seri chính xác</span> để không bị chậm trễ lên điểm.',
  'Vui lòng hoàn tất thanh toán trong thời gian hiệu lực, tối đa thời gian 30 phút.',
  'Mọi thắc mắc về vấn đề nạp tiền, xin vui lòng liên hệ CSKH để được hỗ trợ.',
  'Nếu chưa nắm rõ quy trình nạp tiền, quý khách vui lòng tham khảo hướng dẫn nạp hoặc liên hệ CSKH để được hỗ trợ.',
]

// 倒计时
const { current, start, reset } = useCountDown({
  time: 0,
  onFinish() {
    clearData()
  }
})

// 返回并清除数据
const clearData = () => {
  router.back()
  const t = setTimeout(() => {
    sessionStorage.removeItem('threePartyPayData')
    clearTimeout(t)
  }, 100);
}

onMounted(() => {
  const time = data.expireTime - new Date().getTime()
  if (time <= 0) return clearData()
  reset(time)
  start()
})
</script>
<template>
  <div class='threeparty-info'>
    <div class="body">
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
          <label>Hình Thức Thanh Toán:</label>
          <span>{{ data.payType }}</span>
          <div style="width: var(--cg-px-46);">
          </div>
        </div>
        <div class="info-item">
          <label>Số Tiền Thanh Toán:</label>
          <span>
            <CgAmount weight="700" size="32" segmentation color="blue1" :amount="`${data.amount}000`" />
          </span>
          <div style="width: var(--cg-px-46);">
          </div>
        </div>
        <div class="info-item">
          <label>Số Đơn:</label>
          <span>{{ data.id }}</span>
          <div style="width: var(--cg-px-46);">
            <CgIcon width="46" name="i_copy" @click="copy(data.id)" />
          </div>
        </div>
        <div class="info-item" v-if="data.discountVisible">
          <label>{{ + data.promo_discount > 0 ? 'Khuyến Mãi Nạp Tiền' : 'Phí Xử Lý' }}:</label>
          <span>{{ formatNumberToCurrencyWithoutK((+data.promo_discount / 100) * Number(`${data.amount}000`) + '')
          }}</span>
          <div style="width: var(--cg-px-46);">
          </div>
        </div>
        <div class="info-item">
          <label>Chi Tiết:</label>
          <span>Kiểm Tra Chi Tiết Nạp Tiền</span>
          <div style="width: var(--cg-px-46);" class="flex jc-c">
            <CgIcon shadow width="46" name="i_search_list" @click="router.push('/transaction')" />
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
  name: 'ThreepartyInfo'
}
</script>

<style lang='scss' scoped>
.threeparty-info {
  .body {
    padding: 24px 32px 100px;

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
      height: 80px;
      display: flex;
      align-items: center;
      padding: 0 20px;

      span {
        flex: 1;
        text-align: right;
        margin-right: 18px;
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