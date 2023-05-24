<script setup lang='ts'>
import { ref, computed } from 'vue';
import { CgHeader, CgButton, CgProgress, CgAmount, CgContainer, CgContainerHead } from '@/components/cg-template-2';
import { useAppStore } from '@/store-pinia';
import { storeToRefs } from 'pinia';
import { floor } from 'lodash';
import { multiply } from 'cg-utils';
import { useRouter } from 'vue-router'
import { useLoading } from '@/hooks/useLoading';
import { userInfoStateStore } from '@/store-pinia/userInfo'
import { getVipConfit } from '@/http/blue-apis';

const { startLoading, closeLoading } = useLoading();
const appStore = useAppStore();
const { token } = storeToRefs(appStore);
const userInfoStore = userInfoStateStore();
const { userInfo } = storeToRefs(userInfoStore);
const router = useRouter();
const DataList = ref<any>([]);
const formattedrate = computed(() => {
  if (userInfo.value.level === 10) {
    return 1;
  }
  if (Number(userInfo.value.now) > 0 && Number(userInfo.value.next) > 0) {
    const currate = floor((userInfo.value.now) / (userInfo.value.next), 2);
    return currate >= 1 ? 1 : currate;
  }
  return 0;
});
const getList = () => {
  startLoading();
  getVipConfit().then((res: any) => {
    DataList.value = res;
    closeLoading();
  }).catch(() => {
    closeLoading();
  });
};
getList();
</script>
<template>
    <div class='vip-progress'>
        <CgHeader>PHÚC LỢI VIP</CgHeader>
        <cg-container :style="'margin-bottom:var(--cg-px-32)'">
          <div class="vip-info" :class="[userInfo.level >= 10 ? 'level-ten' : (formattedrate >= 1 ? 'has-pro rate-full' : 'has-pro rate-normal')]">
            <div class="vip-money">
              <template v-if="userInfo.level >= 10">
                  <app-image :src="`/icon/i_vip${userInfo.level}.png`" class="vipimg margin-y" />
                  <p class="nopadding sign">Chúc Mừng Bạn Đã Thăng Cấp Cao Nhất!</p>
                </template>
                <template v-else-if="formattedrate >= 1">
                  <p class="bold-sign sign">Chúc Mừng Bạn Đã Thăng Cấp</p>
                  <p class="blue-sign nopadding sign">(Tự Động Sau 02:00 Giờ)</p>
                </template>
                <template v-else>
                  <p class="sign">Số Tiền Cần Nạp Để Thăng Cấp </p>
                  <p class="money">
                    <cg-amount size="28" weight="700" :amount="userInfo.now" :segmentation="false" suffix="K" padding="0"
                      :precision="0"></cg-amount>
                    <span class="line">/</span>
                    <cg-amount size="28" weight="700" :amount="userInfo.next" :segmentation="false" suffix="K" padding="0"
                      :precision="0"></cg-amount>
                  </p>
                </template>
            </div>
            <div v-if="userInfo.level < 10" class="vip-bar">
              <app-image :src="`/icon/i_vip${+userInfo.level || '1'}.png`" class="vipimg" />
              <div class="flex-1 mid">
                <cg-progress :rate="multiply(formattedrate, 100)" position="center" :height="40" :round="false"></cg-progress>
              </div>
              <app-image :src="`/icon/i_vip${userInfo.next_level > 0 ? userInfo.next_level : (+userInfo.level) + 1}.png`" class="vipimg"
                :style="`filter: opacity(${0.3 + formattedrate * 0.7})`" />
            </div>
          </div>
          <div class="dash-divider"></div>
          <p class="empty2"></p>
          <CgContainer padding="0" :style="'margin:var(--cg-px-0) var(--cg-px-20) var(--cg-px-20) var(--cg-px-20)'">
            <table cellspacing="0">
              <tr>
                <th>
                  <div class="th-title">CẤP VIP</div>
                </th>
                <th>
                  <div class="th-title">MỨC TIỀN<br/>NẠP</div>
                </th>
                <th>
                  <div class="th-title">PHẦN THƯỞNG THĂNG CẤP</div>
                </th>
                <th>
                  <div class="th-title">KHUYẾN MÃI SINH NHẬT</div>
                </th>
              </tr>
              <tr v-for="item in DataList" :key="item.label" class="item">
                <td>
                  <div class="key_name">
                    VIP{{ item.level }}
                  </div>
                </td>
                <td>
                  <div class="td_select">
                    <cg-amount :amount="item.upgrade_deposit" :segmentation="true" suffix="K" padding="0"></cg-amount>
                  </div>
                </td>
                <td>
                  <div class="key_name">
                    <cg-amount :amount="item.upgrade_gift" :segmentation="true" suffix="K" padding="0"></cg-amount>
                  </div>
                </td>
                <td>
                  <div class="td_select">
                    <cg-amount :amount="item.birth_gift" :segmentation="true" suffix="K" padding="0"></cg-amount>
                  </div>
                </td>
              </tr>
            </table>
          </CgContainer>
        </cg-container>
        
        <cg-button type="primary" :width="686" :center="true" @click="router.push('/home')">TRỞ VỀ ĐẶT CƯỢC</cg-button>
        <p class="empty"></p>
        <cg-button whiteStyle :width="686" :center="true" @click="router.push('/deposit/index')">NẠP TIỀN NGAY</cg-button>
    </div>
</template>
<script lang='ts'>
export default {
    name: 'VipProgress',
}
</script>

<style lang='scss' scoped>
.vip-progress{
  padding: 24px 32px;
  .empty{
    height: 24px;
  }
  .empty2{
    height: 28px;
  }
  .dash-divider {
    border-top: 1px dashed var(--cg-color-blue11);
    margin: 0 32px;
    position: relative;
    &::before, &::after {
      width: 10px;
      height: 10px;
      position: absolute;
      border: 2px solid var(--cg-color-blue11);
      border-radius: 50%;
      content: '';
    }
    &::before {
      top: -8px;
      left: -12px;
    }
    &::after {
      top: -8px;
      right: -12px;
    }
  }
  .vip-amount{
    justify-content: space-between;
    .amount{
      color: var(--cg-color-blue1);
      font-weight: var(--cg-font-text1);
    }
  }
  .vip-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .mid {
      padding: 0 14px;
    }
  }
  .vip-info {
    font: var(--cg-font-text10);
    color: var(--cg-color-black1);
    line-height: 25px;
    padding: 24px 24px 32px;
    &.level-ten {
      padding-top: 20px;
      padding-bottom: 26px;
      .vip-money {
        padding-bottom: 0;
        .vipimg {
          margin: 0;
        }
        .sign {
          color: var(--cg-color-black1);
          font: var(--cg-font-text4);
        }
      }
    }
    &.rate-normal {
      font: var(--cg-font-text4);
    }
    .vip-money {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 16px;
    }
    .blue-sign {
      font: var(--cg-font-text4);
      color: var(--cg-color-blue1);
      line-height: 25px;
    }
    .money {
      font: var(--cg-font-text1);
      line-height: 32px;
      // padding-top: 8px;
      color: var(--cg-color-blue1);
      display: flex;

      .line {
        display: inline-block;
        padding-left: 6px;
        padding-right: 6px;
      }
    }
  }
  .vipimg {
    width: 128px;
    display: block;

    &.margin-y {
      margin: 10px 0;
    }
  }
  .table_title {
    color: var(--cg-color-blue1);
    font: var(--cg-font-text1);
    margin: 25px 0;
  }

  table {
    width: 100%;
  }

  tr {
    th {
      border-right: 1px solid var(--cg-color-white1);

      &:last-child {
        border-right: 0;
      }
    }

    &:last-child {
      td {

        &:last-child,
        &:nth-last-child(2) {
          >div {
            border-bottom: 0;
          }

        }
      }
    }

    td {
      height: 72px;
      line-height: 72px;
      color: var(--cg-color-black1);
      font: var(--cg-font-text9);
      text-align: center;
      border-right: 1px solid var(--cg-color-white1);

      &:last-child {
        border-right: 0;
      }

      .key_name {
        height: 72px;
        line-height: 72px;
        border-bottom: 1px solid var(--cg-color-white1);

      }

      .td_select {
        height: 72px;
        line-height: 72px;
        border-bottom: 1px solid var(--cg-color-white1);
      }

      :deep(.el-input__suffix) {
        left: 50px;
        top: -2px;
      }

    }
    td:nth-of-type(1){
      width: 104px;
    }
    td:nth-of-type(2){
      width: 172px;
    }
    td:nth-of-type(3){
      width: 198px;
    }
  }
  tr:nth-of-type(1){
    height: 80px;
    background: var(--cg-gradient-white-blue);
  }
  .th-title{
    font: var(--cg-font-text10) !important;
  }
}
</style>