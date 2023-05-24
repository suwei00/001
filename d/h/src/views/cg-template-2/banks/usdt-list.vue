<script setup lang="ts">
import { CgButton, CgIcon, CgContainer } from '@/components/cg-template-2';
import { storeToRefs } from 'pinia';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import router from '@/router';

const userInfoStore = userInfoStateStore();
const { usdtCardList } = storeToRefs(userInfoStore);
</script>

<template>
  <div>
    <section v-if="usdtCardList && usdtCardList.length">
      <ul class="card-list">
        <li class="item" v-for="card in usdtCardList">
          <div class="card-item">
            <div class="inner">
              <div class="bindname">{{ card.bindname }}</div>
              <div class="protocol">{{ card.protocol }}</div>
              <div class="address">{{ card.address }}</div>
            </div>
          </div>
        </li>
      </ul>
      <p class="customer_service">Thẻ ngân hàng có thể liên kết đã đạt giới hạn, nếu cần thay đổi hãy liên hệ 
        <a @click.prevent="() => router.push('/customer-service')">CSKH</a></p>
    </section>
    <section v-else class="no-usdt">
        <div class="usdt-no-image"><app-image src="/personal/usdt_no.png" /></div>
        <div class="flex-middle add-bank-btn">
          <cg-button width="686" class="flex-middle" @click="$router.push('/banks/add-usdt')">
            <cg-icon width="26" name="i_jia" class="icon_ji"></cg-icon>
            THÊM ĐỊA CHỈ USDT
          </cg-button>
        </div>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UsdtList'
};
</script>

<style lang="scss" scoped>
.usdt-no-image {
  padding: 104px 0 80px;
  text-align: center;
  img {
    width: 280px;
    vertical-align: top;
  }
}
.add-bank-btn {
  padding-top: 18px;

  :deep(.icon_ji) {
    display: inline-block;
    margin-right: 10px;
  }
}
.customer_service {
  font: var(--cg-font-text3);
  line-height: 30px;
  text-align: center;
  color: var(--cg-color-grey6);
  a {
    color: var(--cg-color-blue1);
    text-decoration: underline;
  }
}

.card-list {
  .item {
    padding-bottom: 32px;
    .card-item {
      width: 686px;
      height: 316px;
      background-image: url(link($base-img-dir + 'personal/card_bg.png'));
      background-size: 100% 100%;
      padding: 20px;
      color: var(--cg-color-white);
      .inner {
        background-image: url(link($base-img-dir + 'personal/usdt_bg.png'));
        background-size: 100% 100%;
        height: 100%;
        line-height: 38px;
        padding-left: 42px;
        .bindname {
          font: var(--cg-font-h4);
          text-shadow: 0px 2.3px 2.3px rgba(0, 0, 0, 0.2);
          padding-top: 40px;
        }
        .protocol {
          font: var(--cg-font-text9);
          text-shadow: 0px 2.3px 2.3px rgba(0, 0, 0, 0.2);
          padding-top: 106px;
        }
        .address {
          font: var(--cg-font-text9);
          text-shadow: 0px 2.3px 2.3px rgba(0, 0, 0, 0.2);
          padding-top: 4px;
        }
      }
    }
  }
}
</style>