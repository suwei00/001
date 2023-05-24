<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue';
import { CgButton, CgEmpty, CgAmount, CgTime, CgTable, CgSelect, CgTimeSwitch, CgInput, CgStyleDate, type CgTableColumns } from '@/components/cg-template-2';
import PersonalTitle from '../components/personal-title/index.vue';
import { useOption } from '@/hooks/useOption';
import APIs from '@/http/blue-apis';
import { colorFilter, colorFilter2 } from '@/utils/format';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call';
const Dialog = new CgDialogClass();
const columns = computed<CgTableColumns[]>(() => {
  const list = [
    {
      title: 'Tài Khoản',
      field: 'username',
      align: 'left'
    },
    {
      title: 'Đại Lý<br/>Cấp Trên',
      field: 'parent_name',
      align: 'left'
    },
    {
      title: 'Số Tiền',
      field: 'amount',
      align: 'center',
      isSort: true
    },
    {
      title: 'Thời Gian',
      field: 'created_at',
      align: 'left'
    },
    {
      title: 'Trạng Thái',
      field: 'state'
    }
    // {
    //   title: 'Ghi Chú ',
    //   field: 'remark',
    //   align: 'left'
    // }
  ];
  // 271
  const obj2 = {
    title: 'Phương Thức<br/>Nạp Tiền',
    field: 'channel_id',
    align: 'left'
  };

  if (formData.value.flag === '271') {
    list.splice(3, 0, obj2);
  }

  return list;
});
const formData = ref({
  flag: '271', // 交易类型
  date_flag: '1', // '1',// 时间类型
  player_name: '', // 玩家账号
  agency_name: '', // 代理账号
  channel_id: '0', // 渠道id
  is_asc: '', // 排序
  sort_field: '', // 排序字段
  start_time: '',
  end_time: ''
});

const curDate = ref({
  ty: '1'
});
//充值方式选项，仅在存款选项页面展示，取款和红利不展示
const { option: depositChannelOption, transform: depositChannelOptionTransform } = useOption(async () => {
  return APIs.getTradeChannel().then(res => {
    const arr = res.map((k: any) => {
      return { label: k.name, value: k.id + '' };
    });
    arr.unshift({ label: 'Toàn Bộ', value: '0' });
    return arr;
  });
});
const { option: tradeTypeOption } = useOption('tradeTypeOption');
const { transform: stateFlagTransform } = useOption('stateFlag');
const tableFormData = computed(() => {
  return {
    ...formData.value,
    ...curDate.value,
    date_flag: curDate.value.ty
  };
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

const showRemark = (row: any) => {
  if (row.remark) {
    Dialog.showDialog({
      template: 'tmp1',
      title: 'GHI CHÚ',
      tmp1Content: row.remark,
      confirmText: 'XÁC NHẬN',
      btns: 1
    });
  }
};

watch(
  () => formData.value.flag,
  val => {
    if (val === '271') {
      formData.value.channel_id = '0';
    } else {
      formData.value.channel_id = '';
    }
  }
);
</script>
<template>
  <div class="game-record">
    <personal-title title="THÔNG TIN GIAO DỊCH" />
    <div class="search-header">
      <div class="flex-1">
        <div class="flex flex ai-c">
          <span class="select-label third">Thời Gian</span>
          <!-- <cg-time-switch v-model="formData.date_flag" class="select-width" /> -->
          <cg-style-date v-model="curDate" topFix leftFix width="273" class="select-width" @change="selectChange" />
          <span class="select-label four">Loại Giao Dịch</span>
          <cg-select v-model="formData.flag" :placeholder="$t('p_choose')" :options="tradeTypeOption" class="select-width" @change="selectChange" />
        </div>
        <div class="flex second-line flex ai-c">
          <span class="select-label five">Tài Khoản Hội Viên</span>
          <cg-input :clear="true" v-model.lowercase="formData.player_name" placeholder="Vui lòng nhập tài khoản" class="select-width" />
          <template v-if="formData.flag == '271'">
            <span class="select-label four">Phương Thức<br />Nạp Tiền</span>
            <cg-select v-model="formData.channel_id" placeholder="" :options="depositChannelOption" class="select-width" @change="selectChange" />
          </template>
        </div>
      </div>
      <div class="search-button">
        <cg-button mini :width="110" :height="40" :font-size="15" @click="$refs.cgTableRef.getListData(1)">TÌM KIẾM</cg-button>
      </div>
    </div>
    <CgTable ref="cgTableRef" :form-data="tableFormData" :columns="columns" @sort="sort" :list-api="APIs.getTradeDetail">
      <template #empty>
        <cg-empty bth-text="Đặt cược ngay" />
      </template>
      <template #state="{ row }">
        <span :style="{ color: colorFilter(row.state) }" :class="[row.remark ? 'has-remark' : '', colorFilter2(row.state)]" @click="() => showRemark(row)">
          {{ stateFlagTransform(row.state) }}
        </span>
      </template>
      <template #amount="{ row }">
        <cg-amount :amount="row.amount" :segmentation="true" suffix="K" padding="0" :precision="0"></cg-amount>
      </template>
      <template #created_at="{ row }">
        <cg-time :time="row.created_at" :is-two-line="true" />
      </template>

      <template #channel_id="{ row }" v-if="formData.flag == '271'">
        <span>
          {{ depositChannelOptionTransform(row.channel_id) }}
        </span>
      </template>
    </CgTable>
  </div>
</template>
<script lang="ts">
export default {
  name: 'TradeRecord'
};
</script>

<style lang="scss" scoped>
.game-record {
  .second {
    width: 67px;
    margin-left: 20px;
    text-align: center;
  }

  .third {
    width: 70px;
    display: flex;
    align-items: center;
  }

  .four {
    width: 99px;
    margin-left: 20px;
    display: flex;
    align-items: center;
  }

  .five {
    width: 70px;
  }

  .six {
    width: 99px;
    margin-left: 20px;
  }
}

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
  width: 273px !important;
}

.second-line {
  margin-top: 12px;
}

.mgl-22 {
  margin-left: 20px;
}

.has-remark {
  // text-decoration: underline;
  cursor: pointer;
  display: inline-block;
  position: relative;
  &::after {
    position: absolute;
    content: '';
    height: 1.5px;
    width: 100%;
    bottom: 0;
    left: 0;
  }
  &.green::after {
    background-color: var(--cg-color-green);
  }
  &.orange::after {
    background-color: var(--cg-color-orange);
  }
  &.red::after {
    background-color: var(--cg-color-red);
  }
}
</style>
