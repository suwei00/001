<script setup lang="ts">
import { ref, nextTick, computed } from 'vue';
import APIs from '@/http/blue-apis';
import CgForm, { type FormItem } from '@/components/cg-template-2/cg-form';
import {
  CgHeader,
  CgList,
  CgTable,
  CgFold,
  CgBreadcrumb,
  CgIcon,
  CgTime
} from '@/components/cg-template-2';
import { useOption } from '@/hooks/useOption';
import { getSortFormData } from '@/utils/common';
import { useRouter } from 'vue-router';

const userInfoLocalName = localStorage.getItem('USER_NAME') || '';
const router = useRouter();
const formData = ref({
  parent_name: userInfoLocalName, //点击查询下级的用户名
  is_online: '0', //在线状态、
  username: '' //输入框搜索
});
const { option: onlineFlag, transform: onlineFlagTransform } = useOption('onlineFlag');
const { transform: levelTransform } = useOption('vipLevel');
const isOpen = ref(false);
const nameList = ref<string[]>([]); //用户名列表
const options = ref<FormItem[]>([
  {
    label: 'Trạng Thái<br/>Đăng Nhập',
    value: 'is_online',
    type: 'select',
    modelValue: '0',
    placeholder: '',
    options: onlineFlag.value
  },
  {
    label: 'Tài Khoản',
    value: 'username',
    type: 'field',
    modelValue: '',
    lowercase: true,
    placeholder: 'Vui lòng nhập tài khoản'
  }
]);
const currentName = ref('');
const columns = ref([
  {
    title: 'Tài Khoản',
    field: 'username'
  },
  {
    title: 'Cấp Thành<br/>Viên',
    field: 'level'
  },
  {
    title: 'Số Người<br/>Cấp Dưới',
    field: 'user_count'
  },
  {
    title: 'Trạng Thái<br/>Đăng Nhập', //在线状态，当会员在线时显示Online,会员不在线显示最后一次登录时间，显示时间的表示离线状态
    field: 'is_online'
  }
]);
const listRef = ref<typeof CgList | null>();
const submit = (data: any) => {
  currentName.value = '';
  if (data.username === '') {
    formData.value = {
      ...formData.value,
      ...getSortFormData(data),
      parent_name: formData.value.parent_name
    };
  } else {
    formData.value = {
      ...formData.value,
      ...getSortFormData(data),
      parent_name: ''
    };
  }
  nextTick(() => {
    listRef.value?.onRefresh();
  });
};
const cgFormRef = ref<typeof CgForm | null>();
const changeCurrentName = (name: string) => {
  currentName.value = name || '';
  formData.value.parent_name = name || '';
  formData.value.username = '';
  cgFormRef.value?.setFrom('username', '');
  nextTick(() => {
    listRef.value?.onRefresh();
  });
};
const dataListDetail = ref({});
const queryDetail = (row: any) => {
  dataListDetail.value = {
    by: row.by,
    cp: row.cp,
    dj: row.dj,
    dz: row.dz,
    fc: row.fc,
    qp: row.qp,
    ty: row.ty,
    zr: row.zr,
    mn: row.mn,
    cg_high_rebate: row.cg_high_rebate,
    cg_official_rebate: row.cg_official_rebate
  };
  router.push({
    path: `/member-list/detail`,
    query: dataListDetail.value
  });
};
const selectChange = (field: string, data: any) => {
  formData.value[field] = data;
  nextTick(() => {
    listRef.value?.onRefresh();
  })
}
</script>
<template>
  <div class="transcation cg-list-container">
    <CgHeader>DANH SÁCH THÀNH VIÊN</CgHeader>
    <div class="container">
      <CgForm ref="cgFormRef" :options="options" :label-width="184" @submit="submit" @select-change="selectChange"/>
      <div class="empty"></div>

      <CgList ref="listRef" :options="options" :list-api="APIs.getMemberList" :form-data="formData">
        <template #top="{ names }">
          <div v-if="names?.length">
            <CgFold v-model="isOpen" open-text="Hiển Thị Quan Hệ Đại Lý" close-text="Ẩn Quan Hệ Đại Lý">
              <CgBreadcrumb @update:modelValue="changeCurrentName" :list="names" />
            </CgFold>
            <div class="empty"></div>
          </div>
        </template>
        <template #default="{ data }">
          <CgTable :columns="columns" :table-data="data">
            <template #username="{ row }">
              <div class="username" @click="changeCurrentName(row.username)">
                {{ row.username }}
              </div>
            </template>
            <template #level="{ row }">
              <span>{{ levelTransform(row.level) }}</span>
            </template>
            <template #is_online="{ row }">
              <div class="offline" @click="queryDetail(row)">
                <div class="text">
                  <!-- 1在线 2离线 -->
                  <div v-if="row.is_online == 1" class="green">{{ onlineFlagTransform(row.is_online) }}</div>
                  <cg-time v-else :time="row.last_login_at" :is-two-line="true" :align="'center'"
                    :color="'var(--cg-color-gray)'" />
                </div>
                <div class="time">
                  <cg-icon width="32" name="i_search_list" />
                </div>
              </div>
            </template>
          </CgTable>
        </template>
      </CgList>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'MemberList'
};
</script>

<style lang="scss" scoped>
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

:deep(.cg-table_body_item) {
  span:nth-of-type(4) {
    flex: 1.1;
  }
}

.offline {
  display: flex;
  align-items: center;

  .text {
    flex: 1;
  }

  .time {
    padding-right: 6px;
  }


}

.empty {
  height: 24px;
}
</style>
