<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import { CgButton, CgEmpty, CgContainer, CgTable, CgSelect, CgBreadcrumb, CgIcon, CgDivider, CgInput, CgTime, type CgTableColumns } from '@/components/cg-template-2';
import PersonalTitle from '../components/personal-title/index.vue';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call';
import { useOption } from '@/hooks/useOption';
import APIs from '@/http/blue-apis';
import RebateDetail from './rebate-detail.vue';

const Dialog = new CgDialogClass();
const columns = ref<CgTableColumns[]>([
  {
    title: 'Tài Khoản', //直属下级会员账号。点击后可查看其直属下级的数据
    field: 'username',
    align: 'left'
  },
  {
    title: 'Cấp Thành Viên', // 成员等级，接口暂时没有这个字段
    field: 'level'
  },
  {
    title: 'Đại Lý Cấp Trên', //上级代理
    field: 'parent_name'
  },
  {
    title: 'Số Người<br/>Cấp Dưới', //下级人数。当前账号的所有下级人数
    field: 'user_count',
    isSort: true
  },
  {
    title: 'Trạng Thái<br/>Đăng Nhập', //在线状态，当会员在线时显示Online,会员不在线显示最后一次登录时间，显示时间的表示离线状态
    field: 'is_online',
    isSort: true
  },
  {
    title: 'Chi Tiết Hoàn Trả ', //返水详情，点击后查看该会员返水/返点
    field: 'aa'
  }
]);
const userInfoLocalName = localStorage.getItem('USER_NAME') || '';
const formData = ref({
  is_asc: '', // 排序
  sort_field: '', // 排序字段
  username: '', // 会员账号
  parent_name: userInfoLocalName //取当前登录账号
});
const currentName = ref(''); //当前用户名
const nameList = ref<string[]>([]); //用户名列表
const show = ref('0'); //是否显示筛选条件
const { option: isShowFlag } = useOption('isShowFlag');
const { transform: onlineFlagTransform } = useOption('onlineFlag');
const { transform: levelTransform } = useOption('vipLevel');
const tableFormData = computed(() => {
  return {
    ...formData.value
  };
});
const queryDetail = (row: any) => {
  Dialog.showDialog({
    template: 'tmp2', // 也可以是tmp2
    showClose: true,
    title: 'TỶ LỆ HOÀN TRẢ',
    btns: 0,
    customComponent: RebateDetail,
    props: {
      row: row
    }
  });
};
const cgTableRef = ref<typeof CgTable | null>();
const sort = (sort_field: any, is_asc: any) => {
  formData.value.sort_field = sort_field;
  formData.value.is_asc = is_asc;
  nextTick(() => {
    cgTableRef.value?.getListData();
  });
};
const changeTable = (data: any) => {
  if (data.names?.length > 0 && show.value == '1') {
    // 把自己账号放在第一个
    nameList.value = data.names;
  } else {
    nameList.value = [];
  }
};

const changeCurrentName = (name: string) => {
  currentName.value = name || '';
  formData.value.parent_name = name || '';
  formData.value.username = '';
  nextTick(() => {
    cgTableRef.value?.getListData(1);
  });
};
const selectUsername = () => {
  formData.value.username = '';
  formData.value.parent_name = currentName.value;
  nameList.value = [];
  nextTick(() => {
    cgTableRef.value?.getListData(1);
  });
};

const getList = () => {
  nameList.value = [];
  if (formData.value.username != '') {
    formData.value.parent_name = '';
  }
  nextTick(() => {
    cgTableRef.value?.getListData(1);
  });
};
</script>
<template>
  <div class="trade-record">
    <personal-title title="DANH SÁCH THÀNH VIÊN" />
    <div class="search-header">
      <div class="flex-1">
        <span class="select-label">Đại Lý</span>
        <cg-select v-model="show" :placeholder="$t('p_choose')" :options="isShowFlag" class="select-width" @change="getList" />
        <span class="select-label two-line">Tài Khoản Hội Viên</span>
        <cg-input :clear="true" v-model.lowercase="formData.username" placeholder="Vui lòng nhập tài khoản" class="select-width" />
      </div>
      <div class="search-button">
        <cg-button mini :width="110" :height="40" :font-size="15" @click="getList">TÌM KIẾM</cg-button>
      </div>
    </div>
    <CgTable ref="cgTableRef" :form-data="tableFormData" @sort="sort" :columns="columns" :list-api="APIs.getMemberList" @change-data="changeTable">
      <template #empty>
        <cg-empty bth-text="Đặt cược ngay" />
      </template>
      <template #username="{ row }">
        <span class="username" @click="changeCurrentName(row.username)">{{ row.username }}</span>
      </template>

      <template #level="{ row }">
        <span>{{ levelTransform(row.level) }}</span>
      </template>
      <template #is_online="{ row }">
        <span class="green" v-if="row.is_online == 1">{{ onlineFlagTransform(row.is_online) }}</span>
        <span v-else>
          <cg-time :time="row.last_login_at" :is-two-line="true" :align="'center'" :color="'var(--cg-color-grey5)'" />
        </span>
      </template>

      <template #aa="{ row }">
        <div class="flex-middle" @click="queryDetail(row)">
          <cg-icon width="15" name="i_detail" />
          <span class="detail">Xem Chi Tiết</span>
        </div>
      </template>
    </CgTable>
    <CgContainer type="smallContainer" padding="" radius="12" v-if="nameList.length > 0">
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
<script lang="ts">
export default {
  name: 'MemberList'
};
</script>

<style lang="scss" scoped>
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

.mgl-23 {
  margin-left: 23px;
}

.two-line {
  margin-left: 23px;
  width: 72px;
  vertical-align: top;
}

.username {
  color: var(--cg-color-blue12);
  text-decoration: underline;
  cursor: pointer;
}

.detail {
  cursor: pointer;
  margin-left: 8px;
  color: var(--cg-color-blue12);
  font: var(--cg-font-text);
  text-decoration: underline;
}
</style>
