<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { CgButton, CgAmount, CgTable, CgTimeSwitch, CgInput, CgStyleDate, type CgTableColumns } from '@/components/cg-template-2';
import APIs from '@/http/blue-apis';
const props = defineProps<{
  dataList?: any;
}>();
const columns = ref<CgTableColumns[]>([
  {
    title: 'Tài Khoản Hội Viên',
    field: 'username'
  },
  {
    title: 'Đại Lý Cấp Trên',
    field: 'parent_name'
  },
  {
    title: 'Tiền Hoàn Trả',
    field: 'rebate_amount',
    isSort: true
  }
]);
const formData = ref({
  username: props.dataList.username, // 用户名
  ty: props.dataList.tySub,
  flag: props.dataList.flag,
  is_asc: '', // 排序
  sort_field: '' // 排序字段
});
const curDate = ref({
  ty: props.dataList.tySub,
  start_time: props.dataList.start_time,
  end_time: props.dataList.end_time
});
const cgTableRef = ref<typeof CgTable | null>();
const sort = (sort_field: any, is_asc: any) => {
  formData.value.sort_field = sort_field;
  formData.value.is_asc = is_asc;
  nextTick(() => {
    cgTableRef.value?.getListData();
  });
};
const selectChange = () => {
  nextTick(() => {
    cgTableRef.value?.getListData(1);
  });
};
</script>
<template>
  <div class="sub">
    <div class="search-header">
      <div class="flex-1 flex ai-c">
        <span class="select-label">Thời Gian</span>
        <!-- <cg-time-switch v-model="formData.ty" class="select-width mgr-25" /> -->
        <cg-style-date v-model="curDate" topFix leftFix class="select-width mgr-25" :width="257" @change="selectChange" />
        <span class="select-label">Tài Khoản Hội Viên</span>
        <cg-input :clear="true" v-model="formData.username" placeholder="Vui lòng nhập tài khoản" class="select-width" />
      </div>
      <div class="search-button">
        <cg-button mini :width="110" :height="40" :font-size="15" @click="$refs.cgTableRef.getListData(1)">TÌM KIẾM</cg-button>
      </div>
    </div>
    <CgTable ref="cgTableRef" @sort="sort" :form-data="{ ...formData, ...curDate }" :columns="columns" :list-api="APIs.getAgencySub">
      <template #rebate_amount="{ row }">
        <cg-amount :amount="row.rebate_amount" :segmentation="true" suffix="K" padding="0" :precision="2"></cg-amount>
      </template>
    </CgTable>
  </div>
</template>
<script lang="ts">
export default {
  name: 'TradeMinutiae'
};
</script>

<style lang="scss" scoped>
.search-header {
  display: flex;
  margin-bottom: 23px;
  margin-top: 13px;
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
  width: 257px;
  display: inline-block;
}

.mgr-25 {
  margin-right: 25px;
}

.tip {
  margin-left: 10px;
  font: var(--cg-font-text2);
  color: var(--cg-color-grey1);
}
</style>
