<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import {
  CgHeader,
  CgContainer,
  CgButton,
  CgContainerHead,
  CgSelect
} from '@/components/cg-template-2';
import { getRabetScale, memberLinkInsert } from '@/http/blue-apis';
import { Toast } from 'vant';
import router from '@/router';
import { useI18n } from 'vue-i18n';
import { useOption } from '@/hooks/useOption';
import { useLoading } from '@/hooks/useLoading';
import { find } from 'lodash';
const { startLoading, closeLoading } = useLoading();
const { t } = useI18n();
const refundRatesData = reactive(useOption('refundRates', 'key').option.value);
const commissionRatesData = reactive(useOption('commissionRates', 'key').option.value);
const getRatesData = (key: string) => {
  return find(refundRatesData, (o: any) => key === o.key)?.label ?? '';
};
const getCommissionRates = (key: string) => {
  return find(commissionRatesData, (o: any) => key === o.key)?.label ?? '';
};
const url = `${globalConfig.IS_PROD ? window.location.origin : 'http://h5.p3nu.com'
  }/entry/register`;
const key1 = ref(['zr', 'ty', 'cp', 'dz', 'qp', 'by', 'fc', 'dj','mn']);
const key2 = ref(['cg_official_rebate', 'cg_high_rebate']);
const default_params = {
  dj: '0',
  dz: '0',
  qp: '0',
  ty: '0',
  zr: '0',
  cp: '0',
  fc: '0',
  by: '0',
  mn: '0',
  cg_official_rebate: '10',
  cg_high_rebate: '10'
};
const params: any = reactive({ ...default_params });
const rebate: any = ref({
  cp: [],
  zr: [],
  ty: [],
  fc: [],
  qp: [],
  dz: [],
  dj: [],
  by: [],
  mn: [],
  cg_official_rebate: [],
  cg_high_rebate: []
});
// 获取平台最高返水
getRabetScale().then((res: any) => {
  if (res) {
    const result = res ?? {};
    if (result.hasOwnProperty('uid')) delete result.uid;
    Object.keys(rebate.value).forEach(key => {
      if (result[key]) {
        let options: any = [];
        if (key2.value.includes(key)) {
          const max = Number(result[key]);
          options = createOptions(max > 9 ? max : 9, 0.05, 2);
          // 返点最小9.0
          params[key as keyof typeof params] = max < 9 ? '9.00' : result[key] ?? '0';
        } else {
          options = createOptions(Number(result[key]) ?? '0.0');
          params[key as keyof typeof params] = result[key] ?? '0.0';
        }
        default_params[key as keyof typeof default_params] = result[key] ?? '0';
        rebate.value[key as keyof typeof rebate.value] = options.map((item: any) => {
          return { value: item.value, label: item.value }
        });
      }
    });
  }
})
const createOptions = (max_rebate: number, decrease: number = 0.1, fixed: number = 1) => {
  let options = [];
  for (let index = fixed == 1 ? 0 : 9; Number(index.toFixed(2)) <= max_rebate; index += decrease) {
    if (fixed != 1) {
    }
    const r = index ? index.toFixed(fixed) : index;
    options.push(+r === 0 ? '0.0' : r.toString());
  }
  options.reverse();
  return options.map(num => {
    return { value: num, label: num };
  });
};

// 添加推广链接
const addMemberLink = () => {
  memberLinkInsert({ ...params, url }).then((res: any) => {
    if (res) {
      Toast('Liên Kết Thành Công');
      router.back();
    }
  })
};
</script>
<template>
  <div class="agent-report-sub">
    <CgHeader>THÊM MỘT LIÊN KẾT</CgHeader>
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
        <tr v-for="key in key1" :key="key">
          <td>
            <div class="key_name">
              {{ getRatesData(key) }}
            </div>
          </td>
          <td>
            <div class="td_select">
              <cg-select type="view" :data="rebate[key]" v-model="params[key]" selectLeftText="HỦY BỎ"
                selectRightText="XÁC NHẬN" selectText="HOÀN TRẢ" @onOk="val => (params[key] = val.label)"
                :viewVlaue="params[key] + '%'">
                <template #item="{ data }">{{ data.label }}%</template>
              </cg-select>
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
        <tr v-for="key in key2" :key="key">
          <td>
            <div class="key_name">
              {{ getCommissionRates(key) }}
            </div>
          </td>
          <td>
            <div class="td_select">
              <cg-select type="view" :data="rebate[key]" v-model="params[key]" selectLeftText="HỦY BỎ"
                selectRightText="XÁC NHẬN" selectText="HOA HỒNG" @onOk="val => (params[key] = val.value)">
              </cg-select>
            </div>
          </td>
        </tr>
      </table>
    </CgContainer>
    <div class="btn_c flex-middle">
      <cg-button width="686" @click="addMemberLink"> LƯU CÀI ĐẶT</cg-button>
    </div>
  </div>
</template>
<style type="text/css" lang="scss" scoped>
.tip {
  margin-left: 10px;
  font: var(--cg-font-text2);
  color: var(--cg-color-grey1);
}

.agent-report-sub {
  padding: 0 32px 32px 32px;
}

.btn_c {
  margin-top: 30px;
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
      border-bottom: 1px solid var(--cg-color-blue11);

    }

    .td_select {
      height: 80px;
      line-height: 80px;
      border-bottom: 1px solid var(--cg-color-blue11);
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
