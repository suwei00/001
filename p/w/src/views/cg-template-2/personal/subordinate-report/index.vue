<script setup lang='ts'>
import { ref, computed } from 'vue';
import {
  CgButton,
  CgEmpty,
  CgAmount,
  CgContainer,
  CgTable,
  CgSelect,
  CgTimeSwitch,
  CgBreadcrumb,
  CgIcon,
  CgDivider,
  CgStyleDate,
  type CgTableColumns,
} from '@/components/cg-template-2';
import { storeToRefs } from 'pinia';
import PersonalTitle from '../components/personal-title/index.vue'
import { useOption } from '@/hooks/useOption';
import APIs from '@/http/blue-apis';
import { nextTick } from 'process';
import { userInfoStateStore } from '@/store-pinia/userInfo';
const userInfoStore = userInfoStateStore();
const { userInfo } = storeToRefs(userInfoStore);
const columns = ref<CgTableColumns[]>([
  {
    title: 'Tài Khoản',
    field: 'username',
    align: 'left'
  },
  {
    title: 'Loại Tài<br/>Khoản',
    field: 'lvl',
    align: 'left',
    width: '75',
  },
  {
    title: 'Số Tiền<br/>Đặt Cược',
    field: 'bet_amount',
    isSort: true,
    width: '94',
    align: 'left',
  },
  {
    title: 'Số Tiền<br/>Trúng Thưởng ',
    field: 'win_amount',
    isSort: true,
    width: '132',
    align: 'left',
  },
  {
    title: 'Tiền Hoa<br/>Hồng',
    field: 'cg_rebate',
    isSort: true,
    width: '88',
    align: 'left',
  },
  {
    title: 'Tiền Hoàn<br/>Trả',
    field: 'rebate',
    isSort: true,
    width: '97',
    align: 'left',
  },
  {
    title: 'Tiền<br/>Khuyến Mãi',
    field: 'dividend_amount',
    isSort: true,
    width: '109',
    align: 'left',
  },
  {
    title: 'Số Người<br/>Đặt Cược ',
    field: 'bet_mem_count',
    isSort: true,
    width: '94',
    align: 'left',
  },
  {
    title: 'Lợi Nhuận',
    field: 'profit',
    isSort: true,
    width: '103',
    align: 'left',
  }
]);
const formData = ref({
  ty: '1',//时间类型
  is_asc: '',// 排序
  sort_field: '',// 排序字段
  player_name: '',//用户名
});
const curDate = ref({
  ty: '1',//时间类型
});
const currentName = ref('');//当前用户名
const nameList = ref<string[]>([]);//用户名列表
const show = ref('0');//是否显示
const { option: isShowFlag } = useOption('isShowFlag');
const tableFormData = computed(() => {
  return {
    ...formData.value,
    ...curDate.value,
  }
});
const cgTableRef = ref<typeof CgTable | null>();
const sort = (sort_field: any, is_asc: any) => {
  if (sort_field == 'rebate') {
    sort_field = 'rebate_amount';
  } else if (sort_field == 'profit') {
    sort_field = 'company_revenue';
  } else {
    sort_field = sort_field;
  }
  formData.value.sort_field = sort_field;
  formData.value.is_asc = is_asc;
  nextTick(() => {
    cgTableRef.value?.getListData(1);
  })
};
const changeTable = (data: any) => {
  if (data.names?.length > 0 && show.value == '1') {
    nameList.value = data.names;
    currentName.value = data.names[data.names.length - 1];
  } else {
    nameList.value = [];
  }
}

const changeCurrentName = (name: string) => {
  currentName.value = name || '';
  formData.value.player_name = name || '';
  nextTick(() => {
    cgTableRef.value?.getListData(1);
  })
}
const selectUsername = () => {
  formData.value.player_name = currentName.value;
  nameList.value = [];
  nextTick(() => {
    cgTableRef.value?.getListData(1);
  })
};
const selectChange = () => {
  nextTick(() => {
    cgTableRef.value?.getListData(1)
  })
}
</script>
<template>
  <div class="trade-record">
    <personal-title title="Báo Biểu Cấp Dưới" />
    <div class="search-header">
      <div class="flex-1 flex ai-c">
        <span class="select-label">Thời Gian</span>
        <!-- <cg-time-switch v-model="formData.ty" class="time-width" /> -->
        <cg-style-date v-model="curDate" topFix leftFix class="time-width" :width="300" @change="selectChange" />
        <span class="select-label mgl-23">Đại Lý</span>
        <cg-select v-model="show" :placeholder="$t('p_choose')" :options="isShowFlag" class="select-width"
          @change="selectChange" />
      </div>
      <div class="search-button">
        <cg-button mini :width="110" :height="40" :font-size="15" @click="$refs.cgTableRef.getListData(1)">TÌM
          KIẾM</cg-button>
      </div>
    </div>
    <CgTable ref="cgTableRef" :form-data="tableFormData" @sort="sort" :columns="columns" :list-api="APIs.getUnderReport"
      @change-data="changeTable">
      <template #empty>
        <cg-empty bth-text="Đặt cược ngay" />
      </template>
      <template #username="{ row }">
        <span class="username" @click="changeCurrentName(row.username)">{{ row.username }}</span>
      </template>
      <template #lvl="{ row }">
        <span>Đại lý cấp{{ row.lvl }}</span>
      </template>
      <template #rebate="{ row }">
        <div class="center">
          <cg-amount :amount="row.rebate" :segmentation="true" suffix="K" padding="0" :precision="2"></cg-amount>
        </div>
      </template>
      <template #bet_amount="{ row }">
        <div class="center">
          <cg-amount :amount="row.bet_amount" :segmentation="true" suffix="K" padding="0" :precision="2"></cg-amount>
        </div>
      </template>
      <template #win_amount="{ row }">
        <div class="center">
          <cg-amount :amount="row.win_amount" :segmentation="true" suffix="K" padding="0" :precision="2"></cg-amount>
        </div>
      </template>
      <template #cg_rebate="{ row }">
        <div class="center">
          <cg-amount :amount="row.cg_rebate" :segmentation="true" suffix="K" padding="0" :precision="2"></cg-amount>
        </div>
      </template>
      <template #dividend_amount="{ row }">
        <div class="center">
          <cg-amount :amount="row.dividend_amount" :segmentation="true" suffix="K" padding="0" :precision="2"></cg-amount>
        </div>
      </template>
      <template #bet_mem_count="{ row }">
        <div class="center">
          {{ row.bet_mem_count }}
        </div>
      </template>
      <template #profit="{ row }">
        <div class="center">
          <cg-amount :amount="row.profit" :color="row.profit != 0 ? row.profit < 0 ? 'red' : 'blue12' : 'grey1'"
            :segmentation="true" suffix="K" padding="0" :precision="2"></cg-amount>
        </div>
      </template>

    </CgTable>
    <CgContainer type='smallContainer' padding="" radius="12" v-if="nameList.length > 0">
      <template #content>
        <p class="bread-tips">Quan Hệ Đại Lý</p>
        <cg-divider :color="'--cg-color-blue8'" />
        <div class="bread-container">
          <cg-icon width="30" name="i_agent" />：
          <CgBreadcrumb v-model="currentName" v-if="nameList.length" :list="nameList" @click="selectUsername()" />
        </div>
      </template>
    </CgContainer>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'SubordinateReport',
}
</script>

<style lang='scss' scoped>
.search-header {
  display: flex;
  margin-bottom: 23px;
  margin-top: 16px;
}

.search-button {
  width: 120px;
  display: flex;
  justify-content: right;
}

.line-height {
  line-height: 40px !important;
}

.select-width {
  width: 300px !important;
  display: inline-block !important;
}

.time-width {
  width: 300px !important;
  display: inline-block !important;
}

.mgl-23 {
  margin-left: 23px;
  width: 48px;
}

.username {
  color: var(--cg-color-blue12);
  text-decoration: underline;
  cursor: pointer;
}
</style>