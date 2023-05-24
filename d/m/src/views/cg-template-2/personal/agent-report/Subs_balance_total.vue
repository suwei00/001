<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { CgButton, CgAmount, CgTime, CgTable, CgInput, type CgTableColumns } from '@/components/cg-template-2';
import APIs from '@/http/blue-apis';
import { useRouter } from 'vue-router';

const router = useRouter();
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
    title: 'Số Dư',
    field: 'balance_total',
    isSort: true
  },
  {
    title: 'Lần Đăng Nhập Cuối',
    field: 'last_login_at'
  }
]);
const formData = ref({
  username: props.dataList.username, // 用户名
  ty: props.dataList.tySub,
  flag: props.dataList.flag,
  is_asc: '', // 排序
  sort_field: '' // 排序字段
});
const cgTableRef = ref<typeof CgTable | null>();
const sort = (sort_field: any, is_asc: any) => {
  formData.value.sort_field = sort_field;
  formData.value.is_asc = is_asc;
  nextTick(() => {
    cgTableRef.value?.getListData();
  });
};
const dataListDetail = ref({});
const goToSubItem = (item: any) => {
  dataListDetail.value = {
    username: item.username
  };
  router.push({
    path: `/personal/agent-report/balance`,
    query: {
      ...dataListDetail.value
    }
  });
};
</script>
<template>
  <div class="sub">
    <div class="search-header">
      <div class="flex-1">
        <span class="select-label">Tài Khoản Hội Viên</span>
        <cg-input :clear="true" v-model="formData.username" placeholder="Vui lòng nhập tài khoản" class="select-width" />
      </div>
      <div class="search-button">
        <cg-button mini :width="110" :height="40" :font-size="15" @click="$refs.cgTableRef.getListData(1)">TÌM KIẾM</cg-button>
      </div>
    </div>
    <CgTable ref="cgTableRef" :form-data="formData" :columns="columns" @sort="sort" :list-api="APIs.getAgencySub">
      <template #username="{ row }">
        <p class="username" @click="goToSubItem(row)">{{ row.username }}</p>
      </template>
      <template #balance_total="{ row }">
        <cg-amount :amount="row.balance_total" :segmentation="true" suffix="K" padding="0" :precision="0"></cg-amount>
      </template>
      <template #last_login_at="{ row }">
        <cg-time :time="row.last_login_at" :align="'center'" />
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

.username {
  color: var(--cg-color-blue12);
  cursor: pointer;
  text-decoration: underline;
}
</style>
