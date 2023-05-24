<script setup lang='ts'>
import { ref, nextTick } from 'vue';
import APIs from '@/http/blue-apis';
import CgForm, { type FormItem } from '@/components/cg-template-2/cg-form'
import { CgHeader, CgList, CgTable, CgAmount, CgFold, CgBreadcrumb } from '@/components/cg-template-2';
import { useOption } from '@/hooks/useOption';
import { getSortFormData, transformTimeFormData } from '@/utils/common';

const userInfoLocalName = localStorage.getItem('USER_NAME') || '';
const formData = ref({
  ty: '1',//时间类型
  sort: '',//排序
  player_name: '',//玩家名称
});
const { option: subordinateReportSort, transform: flagTransform } = useOption('subordinateReportSort');
const { option: timeFlag } = useOption('timeFlag');
const isOpen = ref(false);
const nameList = ref<string[]>([]);//用户名列表
const options = ref<FormItem[]>([
  {
    label: 'Thời Gian',
    value: 'ty',
    type: 'timeSelect',
    modelValue: '1',
    placeholder: 'Xin vui lòng chọn',
    options: timeFlag.value,
  },
  {
    label: 'Sắp Xếp',
    value: 'sort',
    type: 'select',
    modelValue: '',
    placeholder: 'Xin vui lòng chọn',
    options: subordinateReportSort.value,
  }
])
const currentName = ref('');
const columns = ref([
  {
    title: 'Tài Khoản',
    field: 'username'
  },
  {
    title: 'Nạp Tiền',
    field: 'deposit_amount',
  },
  {
    title: 'Số Tiền<br/>Đặt Cược',
    field: 'bet_amount',
  },
  {
    title: 'Lợi Nhuận',
    field: 'profit',
  }
])
const listRef = ref<typeof CgList | null>();
const submit = (data: any) => {
  const newData = transformTimeFormData(data, 'ty');
  formData.value = {
    ...getSortFormData(newData),
    player_name: currentName.value,
  };
  console.error('submit', formData.value);

  nextTick(() => {
    listRef.value?.onRefresh();
  })
}
const cgFormRef = ref<typeof CgForm | null>();
const changeCurrentName = (name: string) => {
  currentName.value = name || '';
  formData.value.player_name = name || '';
  nextTick(() => {
    listRef.value?.onRefresh();
  })
}
const changeTable = (data: any, names: any) => {
  nameList.value = names.names;
  if (currentName.value == userInfoLocalName) {
    nameList.value = [];
  }
}
const selectChange = (field: string, data: any) => {
  if (typeof data !== 'string') {
    formData.value = {
      ...transformTimeFormData(data, 'ty'),
    };
  } else {
    formData.value[field] = data;
  }
  formData.value = {
    ...getSortFormData(formData.value),
    player_name: currentName.value,
  };
  nextTick(() => {
    listRef.value?.onRefresh();
  })
}
</script>
<template>
  <div class='transcation cg-list-container'>
    <CgHeader>BÁO BIỂU CẤP DƯỚI</CgHeader>
    <div class="container">
      <CgForm ref="cgFormRef" :options="options" :label-width="184" @submit="submit" @select-change="selectChange"/>
      <div class="empty"></div>

      <CgList ref="listRef" :options="options" :list-api="APIs.getUnderReport" :form-data="formData"
        @changeData="changeTable">
        <template #top="{ names }">
          <div v-if="nameList?.length">
            <CgFold v-model="isOpen" open-text="Hiển Thị Quan Hệ Đại Lý" close-text="Ẩn Quan Hệ Đại Lý">
              <CgBreadcrumb @update:modelValue="changeCurrentName" :list="nameList" />
            </CgFold>
            <div class="empty"></div>
          </div>
        </template>
        <template #default="{ data }">
          <CgTable :columns="columns" :table-data="data">
            <template #username="{ row }">
              <div class="username" @click="changeCurrentName(row.username)">{{ row.username }}</div>
            </template>
            <template #deposit_amount="{ row }">
              <cg-amount :amount="row.deposit_amount" :segmentation="true" suffix="K" padding="0"
                :precision="0"></cg-amount>
            </template>
            <template #bet_amount="{ row }">
              <cg-amount :amount="row.bet_amount" :segmentation="true" suffix="K" padding="0" :precision="2"></cg-amount>
            </template>
            <template #profit="{ row }">
              <cg-amount :amount="row.profit" :segmentation="true" suffix="K" padding="0" :precision="2"
                :color="row.profit != 0 ? row.profit < 0 ? 'red2' : 'blue1' : 'black1'"></cg-amount>
            </template>
          </CgTable>
        </template>
      </CgList>
    </div>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'Transaction'
}
</script>

<style lang='scss' scoped>
.container {
  padding: 24px 32px;
}


.username {
  color: var(--cg-color-blue1);
  font: var(--cg-font-text2);
  text-decoration: underline;
  word-wrap: break-word;
  padding-left: 10px;
  text-align: center;
}

.empty {
  height: 24px;
}

.bread {
  position: relative;
}

.card {
  position: relative;
  margin-bottom: 24px;
  margin-top: 24px;
  min-height: 24px;
  background: var(--cg-color-blue16) !important;
}

.no_card {
  position: relative;
  margin-bottom: 24px;
  margin-top: 24px;
}

.show {
  position: absolute;
  left: 182px;
  top: -28px;
  display: flex;
  height: 56px;
  font: var(--cg-font-text4);
  align-items: center;
}

.show-text {
  display: flex;
  align-items: center;
  padding: 13px 40px;
  cursor: pointer;
  transition: .6s;

  >span {
    margin-left: 16px;
  }

  .rotate-icon {
    transform: rotate(180deg);
  }
}



.size1 {
  position: absolute;
  left: -178px;
  width: 152px;
  height: 1px;
}

.size2 {
  position: absolute;
  right: -178px;
  width: 152px;
  height: 1px;
}

.name {
  margin-right: 8px;
}

.label {
  font: var(--cg-font-text8);
}

.bread-content {
  margin-top: 30px;
  padding-bottom: 20px;
}

.tabs {
  margin-top: 4px;
}
</style>