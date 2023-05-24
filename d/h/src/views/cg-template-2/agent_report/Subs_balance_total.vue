<script setup lang='ts'>
import { ref, nextTick, computed } from 'vue';
import {
  CgTime,
  CgAmount,
  CgField,
  CgSelect,
  CgList,
  CgTable,
} from '@/components/cg-template-2';
import APIs from '@/http/blue-apis';
import { useOption } from '@/hooks/useOption';
import { useRouter } from 'vue-router'

const router = useRouter();
const { option: agentBalanceTotalSort } = useOption('agentBalanceTotalSort');

const props = defineProps<{
  dataList?: any,
}>()
const formData = ref({
  username: props.dataList.username,// 用户名
  flag: props.dataList.flag,
  sort: '',// 排序
  is_asc: '',// 排序
  sort_field: '',// 排序字段
});
const columns = ref([
  {
    title: 'Tài Khoản<br/>Hội Viên',
    field: 'username',
  },
  {
    title: 'Đại Lý<br/>Cấp Trên',
    field: 'parent_name',
  },
  {
    title: 'Số Dư',
    field: 'balance_total',
  },
  {
    title: 'Lần Đăng<br/>Nhập Cuối',
    field: 'last_login_at'
  }
])
const listRef = ref<typeof CgList | null>();
const tableData = computed(() => {
  return {
    username: formData.value.username,// 用户名
    flag: formData.value.flag,
    is_asc: formData.value.is_asc,// 排序
    sort_field: formData.value.sort_field,// 排序字段
  }
})
const onSearch = () => {
  console.error('data', formData.value)
  if (formData.value.sort) {
    formData.value.sort.split('|').forEach((item: any, index: number) => {
      if (index === 1) {
        formData.value.sort_field = item
      }
      if (index === 2) {
        formData.value.is_asc = item
      }
    })
  }
  console.error('newdata', formData.value)
  nextTick(() => {
    listRef.value?.onRefresh();
  })
}
const dataListDetail = ref({});
const goToSubItem = (item: any) => {
  dataListDetail.value = {
    username: item.username,
  };
  router.push({
    name: 'AgentReportSubTotalBalance',
    query: {
      ...dataListDetail.value
    }
  })
};
const onSort = (data: any) => {
    if(data !== undefined && data.value){
        formData.value.sort = data.value
        data.value.split('|').forEach((item: any, index: number) => {
            if (index === 1) {
                formData.value.sort_field = item
            }
            if (index === 2) {
                formData.value.is_asc = item
            }
        })
    }else{
        formData.value.sort = ''
        formData.value.sort_field = ''
        formData.value.is_asc = ''
    }
    nextTick(() => {
        listRef.value?.onRefresh();
    })
}
</script>
<template>
  <div class="sub cg-list-container">
    <div class="input-container">
      <div class="time-sort">
        <cg-select rowKey="value" showLabelKey="label" :data="agentBalanceTotalSort" v-model="formData.sort"
          selectLeftText="HỦY BỎ" selectRightText="XÁC NHẬN" @on-ok="onSort">
          <template #item="{ data }">
            <div>
              {{ data.label }}
            </div>
          </template>
        </cg-select>
      </div>
      <div class="username">
        <cg-field rightText="TÌM KIẾM" v-model.lowercase="formData.username" type="text" @butClick="onSearch" :clear="true" maxlength="14"
          placeholder="Vui lòng nhập tài khoản">
        </cg-field>
      </div>
    </div>
    <CgList ref="listRef" :list-api="APIs.getAgencySub" :form-data="tableData">
      <template #default="{ data }">
        <CgTable :columns="columns" :table-data="data">
          <template #username="{ row }">
            <div class="select" @click="goToSubItem(row)">
              {{ row.username }}
            </div>
          </template>
          <template #balance_total="{ row }">
            <cg-amount :amount="row.balance_total" :segmentation="true" suffix="K" padding="0"></cg-amount>
          </template>
          <template #last_login_at="{ row }">
            <cg-time :time="row.last_login_at" :align="'center'" />
          </template>
        </CgTable>
      </template>
    </CgList>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'TradeMinutiae'
}
</script>

<style lang='scss' scoped>
.sub {
  padding: 24px 32px;
}

.input-container {
  margin-bottom: 24px;
}

.time-sort {
  display: flex;
  margin-bottom: 24px;

  .time {
    width: 218px;
  }

  .sort {
    flex: 1;
    margin-left: 24px;
  }
}

.select {
  padding-left: 10px;
  color: var(--cg-color-blue1);
  text-decoration: underline;
}
</style>