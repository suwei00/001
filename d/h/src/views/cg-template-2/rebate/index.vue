<script setup lang="ts">
import { CgHeader, CgContainer, CgContainerHead } from '@/components/cg-template-2';
import { useMemRebate } from './useMemRebate';

const { refundRatesData, commissionRatesData } = useMemRebate();
</script>
<template>
  <!-- <div class="rebate">
    <CgHeader> TỶ LỆ HOÀN TRẢ </CgHeader>
    <section>
      <div class="blue-table">
        <h3>TỶ LỆ HOÀN TRẢ</h3>
        <ul class="table">
          <li class="title">
            <div>LOẠI TRÒ CHƠI</div>
            <div>TỶ LỆ HOA HỒNG</div>
          </li>
          <li v-for="item in refundRatesData" :key="item.label" class="item">
            <div class="">{{ item.label }}</div>
            <div class="value">{{ item.value }}</div>
          </li>
        </ul>
      </div>

      <div class="blue-table">
        <h3>TỶ LỆ HOA HỒNG</h3>
        <ul class="table">
          <li class="title">
            <div>LOẠI TRÒ CHƠI</div>
            <div>TỶ LỆ HOA HỒNG</div>
          </li>
          <li v-for="item in commissionRatesData" :key="item.label" class="item">
            <div class="">{{ item.label }}</div>
              <div class="value">{{ item.value }}</div>
            </li>
          </ul>
        </div>
      </section>
    </div> -->

  <div class="rebate">
    <CgHeader> TỶ LỆ HOÀN TRẢ </CgHeader>
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
// .rebate {
//   padding: 0 30px 100px 30px;
// }

// .blue-table {
//   font: var(--cg-font-text9);
//   line-height: 28px;
//   text-align: center;
//   color: var(--cg-color-black1);

//   h3 {
//     font: var(--cg-font-text1);
//     line-height: 24px;
//     color: var(--cg-color-blue1);
//     padding-top: 24px;
//     padding-bottom: 26px;
//     text-align: left;
//   }

//   .table {
//     background: var(--cg-color-white);
//     border: 2px solid var(--cg-color-blue11);
//     box-shadow: 0px 8px 8px var(--cg-color-blue12);
//     border-radius: 16px;
//     position: relative;
//     overflow: hidden;

//     &::before {
//       content: '';
//       width: 1px;
//       background-color: var(--cg-color-white1);
//       height: 100%;
//       left: 50%;
//       position: absolute;
//       top: 0;
//     }

//     li {
//       height: 80px;
//       line-height: 80px;
//       text-align: center;
//       position: relative;

//       &:first-child {
//         background: linear-gradient(180deg, var(--cg-color-white) 0%, var(--cg-color-white1) 100%);
//       }

//       >div {
//         width: 50%;
//         display: inline-block;
//         // height: 100%;
//         line-height: 80px;
//       }

//       &.item::after {
//         // margin: 0 20px;
//         // border-bottom: 1px solid var(--cg-color-blue11);
//         height: 1px;
//         width: calc(100% - 40px);
//         content: '';
//         position: absolute;
//         left: 20px;
//         bottom: 0;
//         background-color: var(--cg-color-blue11);
//       }

//       &:last-child::after {
//         border-bottom: 0;
//         background-color: transparent;
//       }
//     }

//     .title {
//       font: var(--cg-font-text8);
//       color: var(--cg-color-black1);
//     }

//     .value {
//       font: var(--cg-font-text6);
//       color: var(--cg-color-blue1);
//     }
//   }
// }

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
    border-right: 1px solid var(--cg-color-blue11);

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
    border-right: 1px solid var(--cg-color-blue11);
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
}</style>
