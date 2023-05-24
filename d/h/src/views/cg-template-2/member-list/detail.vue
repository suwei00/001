<script setup lang="ts">
import { reactive, ref } from 'vue';
import { CgHeader, CgContainer, CgContainerHead } from '@/components/cg-template-2';
import { useRouter } from 'vue-router'
import { floor } from 'lodash';
import { useOption } from '@/hooks/useOption';
const router = useRouter();
const dataList = ref({});
const refundRatesData = reactive(useOption('refundRates', 'key').option.value);
const commissionRatesData = reactive(useOption('commissionRates', 'key').option.value);
if (router.currentRoute.value.query) {
  dataList.value = router.currentRoute.value.query;
  console.error('dataList.value', dataList.value);
  refundRatesData.forEach(item => {
    item.value = dataList.value[item.key] + '%';
  });
  commissionRatesData.forEach(item => {
    item.value = floor(Number(dataList.value[item.key]), 2).toFixed(2);
  });
}
</script>
<template>
  <div class="rebate">
    <CgHeader>TỶ LỆ HOÀN TRẢ</CgHeader>
    <div class="table_title">TỶ LỆ HOÀN TRẢ</div>
    <CgContainer padding="0">
      <table cellspacing="0">
        <tr>
          <th>
            <cg-container-head>
              <template #center>LOẠI TRÒ CHƠI</template>
            </cg-container-head>
          </th>
          <th>
            <cg-container-head>
              <template #center>TỶ LỆ HOÀN TRẢ</template>
            </cg-container-head>
          </th>
        </tr>
        <tr v-for="item in refundRatesData" :key="item.label" class="item">
          <td>
            <div class="key_name">
              {{ item.label }}
            </div>
          </td>
          <td>
            <div class="td_select">
              {{ item.value }}
            </div>
          </td>
        </tr>
      </table>
    </CgContainer>

    <div class="table_title">TỶ LỆ HOA HỒNG</div>
    <CgContainer padding="0">
      <table cellspacing="0">
        <tr>
          <th>
            <cg-container-head>
              <template #center>LOẠI TRÒ CHƠI</template>
            </cg-container-head>
          </th>
          <th>
            <cg-container-head>
              <template #center>TỶ LỆ HOA HỒNG</template>
            </cg-container-head>
          </th>
        </tr>
        <tr v-for="item in commissionRatesData" :key="item.label" class="item">
          <td>
            <div class="key_name">
              {{ item.label }}
            </div>
          </td>
          <td>
            <div class="td_select">
              {{ item.value }}
            </div>
          </td>
        </tr>
      </table>
    </CgContainer>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Rebate'
};
</script>

<style lang="scss" scoped>
.rebate {
  padding: 0 32px 32px 32px;
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
    height: 80px;
    line-height: 80px;
    color: var(--cg-color-black1);
    font: var(--cg-font-text9);
    text-align: center;
    border-right: 1px solid var(--cg-color-white1);
    width: 50%;

    &:last-child {
      border-right: 0;
    }

    .key_name {
      margin: 0 0 0 20px;
      padding-right: 20px;
      height: 80px;
      line-height: 80px;
      border-bottom: 1px solid var(--cg-color-white1);

    }

    .td_select {
      height: 80px;
      line-height: 80px;
      border-bottom: 1px solid var(--cg-color-white1);
      color: var(--cg-color-blue1);
      margin-right: 20px;
      padding-left: 20px;
    }

    :deep(.el-input__suffix) {
      left: 50px;
      top: -2px;
    }

  }
}
</style>
