<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';

import { CgContainer, CgIcon, CgButton, CgSelect, CgContainerHead } from '@/components/cg-template-2';

import PersonalTitle from '../components/personal-title/index.vue';
import { useRequest } from 'vue-request';
import { getRabetScale, memberLinkInsert } from '@/http/blue-apis';
import Toast from '@/components/cg-template-2/toast';
import { useI18n } from 'vue-i18n';
import router from '@/router/cg-template-2';
import { useLoading } from '@/hooks/useLoading';
import { useOption } from '@/hooks/useOption';
import { find } from 'lodash';
const { startLoading, closeLoading } = useLoading();
const refundRatesData = reactive(useOption('refundRates', 'key').option.value);
const commissionRatesData = reactive(useOption('commissionRates', 'key').option.value);
const getRatesData = (key: string) => {
  return find(refundRatesData, (o: any) => key === o.key)?.label ?? '';
};
const getCommissionRates = (key: string) => {
  return find(commissionRatesData, (o: any) => key === o.key)?.label ?? '';
};

const { t } = useI18n();
// 获取注册url
const url = `${globalConfig.IS_PROD ? window.location.origin : globalConfig.PROXY_API}/entry/register`;
const key1 = ref(['zr', 'ty', 'cp', 'dz','qp', 'by', 'fc', 'dj','mn']);
const key2 = ref(['cg_official_rebate', 'cg_high_rebate']);
const key3 = ref(['qp', 'by', 'fc', 'dj']);
const default_params = { dj: '0', dz: '0', qp: '0', ty: '0', zr: '0', cp: '0', fc: '0', by: '0',mn:'0', cg_official_rebate: '10', cg_high_rebate: '10' };
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
startLoading();
// 获取平台最高返水
getRabetScale().then((res: any) => {
  if (res) {
    closeLoading()
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
          return { value: item.value, label: item.value + '%' }
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
    return { value: num, lable: num }
  });
};

const rebateComputed = computed(() => {
  const newMap: any = {}
  if (rebate.value) {
    Object.keys(rebate.value).forEach(key => {
      newMap[key] = rebate.value[key].map((item: any) => {
        return { value: item.value, label: item.value.replace("%", '') }
      });
    });
  }
  return newMap;
});

//添加推广链接
const addMemberLink = () => {
  startLoading();
  memberLinkInsert({ ...params, url }).then((res: any) => {
    if (res) {
      Toast(t('add_suc'));
      setTimeout(() => {
        closeLoading()
        router.push('/personal/link')
      }, 1000);
    }
  })
};
</script>

<template>
  <div class="agent-report-sub">
    <personal-title title="ĐẠI LÝ MARKETING" description="" />
    <div class="flex ai-c crs-p" @click="$router.back()">
      <cg-icon width="12" name="i_back" />
      <span class="tip">THÊM MỘT LIÊN KẾT</span>
    </div>
    <div class="table_title">TỶ LỆ HOÀN TRẢ</div>
    <ul class="flex ai-c jc-sb top_ul">
      <li>
        <CgContainer padding="0">
          <template #head>
            <table>
              <tr>
                <th>
                  <cg-container-head bg="--cg-color-white5">
                    <template #center>LOẠI TRÒ CHƠI </template>
                  </cg-container-head>
                </th>
                <th>
                  <cg-container-head bg="--cg-color-white5">
                    <template #center>TỶ LỆ HOÀN TRẢ</template>
                  </cg-container-head>
                </th>
              </tr>
            </table>
          </template>
          <template #content>
            <table>
              <tr v-for="key in key1" :key="key">
                <td>
                  {{ getRatesData(key) }}
                </td>
                <td>
                  <div class="td_select">
                    <cg-select v-model="params[key]" :options="rebate[key]">
                      <template #selectItem="{ data }">
                        {{ data.label }}
                      </template>
                    </cg-select>
                  </div>
                </td>
              </tr>
            </table>
          </template>
        </CgContainer>
      </li>
    </ul>
    <div class="table_title">TỶ LỆ HOA HỒNG</div>
    <CgContainer padding="0">
      <template #head>
        <table>
          <tr>
            <th>
              <cg-container-head bg="--cg-color-white5">
                <template #center>LOẠI TRÒ CHƠI </template>
              </cg-container-head>
            </th>
            <th>
              <cg-container-head bg="--cg-color-white5">
                <template #center>TỶ LỆ HOA HỒNG</template>
              </cg-container-head>
            </th>
          </tr>
        </table>
      </template>
      <template #content>
        <table>
          <tr v-for="key in key2" :key="key">
            <td>
              {{ getCommissionRates(key) }}
            </td>
            <td>
              <div class="td_select">
                <cg-select v-model="params[key]" :options="rebateComputed[key]">
                  <template #selectItem="{ data }">
                    {{ data.value }}
                  </template>
                </cg-select>
              </div>
            </td>
          </tr>
        </table>
      </template>
    </CgContainer>
    <div class="btn_c flex-middle">
      <cg-button width="300" @click="addMemberLink"> LƯU CÀI ĐẶT</cg-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tip {
  margin-left: 10px;
  font: var(--cg-font-text2);
  color: var(--cg-color-grey1);
}

.top_ul {
  margin-bottom: 24px;
}

.btn_c {
  margin-top: 30px;
}

.table_title {
  color: var(--cg-color-grey1);
  font: var(--cg-font-text);
  margin: 15px 0 6px 0;
}

tr {
  &:nth-child(2n) {
    background: var(--cg-color-white8);
  }

  th {
    border-right: 1px solid var(--cg-color-blue8);
    border-bottom: 1px solid var(--cg-color-blue8);

    &:last-child {
      border-right: 0;
    }
  }

  td {
    color: var(--cg-color-grey1);
    font: var(--cg-font-text);
    text-align: center;
    border-right: 1px solid var(--cg-color-blue8);

    &:last-child {
      border-right: 0;
    }

    :deep(.el-input__inner) {
      text-align: center;
      border: 0;
      background: transparent;
    }

    :deep(.el-input__suffix) {
      left: 50px;
      top: -2px;
    }

    .td_select {
      margin: 0 auto;
      overflow: hidden;
    }
  }
}

</style>
