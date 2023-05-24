<script setup lang='ts'>
import { ref, computed, nextTick, watch } from 'vue';
import {
  CgButton,
  CgEmpty,
  CgAmount,
  CgTime,
  CgTable,
  CgSelect,
  CgTimeSwitch,
  CgStyleDate,
  type CgTableColumns,
} from '@/components/cg-template-2';
import PersonalTitle from '../components/personal-title/index.vue'
import { useOption } from '@/hooks/useOption';
import APIs from '@/http/blue-apis';
import { colorFilter, colorFilter2 } from '@/utils/format';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call';
const Dialog = new CgDialogClass();
const switchIndex = ref<string>('today');

const formData = ref<any>({
  flag: '271', // 交易类型
  channel_id: '0' // 充值方式
});
const { option: flagList, transform: flagTransform } = useOption('flagList');
const { option: stateFlag, transform: stateFlagTransform } = useOption('stateFlag');
const { transform: walletNameTransform } = useOption(APIs.getVenueWalletList, 'wallet_name', 'id', ['game_type']);
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
const formatValue = ref<[string, string] | null>(null);
const curDate = ref({
  ty: '1'
});
const tableFormData = computed(() => {
  return {
    ...formData.value,
    // start_time: formatValue.value?.[0] ?? '',
    // end_time: formatValue.value?.[1] ?? '',
    ...curDate.value
  };
});

const columns = computed<CgTableColumns[]>(() => {
  const list = [
    {
      title: 'Mã Giao Dịch',
      field: 'bill_no',
      align: 'left',
      width: 180,
    },
    {
      title: 'Số Tiền',
      field: 'amount'
    },
    {
      title: 'Thời Gian',
      field: 'created_at',
      align: 'left',
      with: 130
    },
    {
      title: 'Trạng Thái',
      field: 'state', //现实交易状态
      align: 'center'
    }
    // {
    //   title: 'Ghi Chú',
    //   field: 'remark',
    //   align: 'left'
    // }
  ];

  // 其他交易类型
  const obj1 = {
    title: 'Loại Giao Dịch',
    field: 'flag'
  };
  // 273
  const obj2 = {
    title: 'Tài Khoản Rút Tiền',
    field: 'platform_id'
  };

  // 271
  const channelCol = {
    title: 'Phương Thức<br/>Nạp Tiền',
    field: 'channel_id',
    align: 'left',
  }

  if (formData.value.flag === '273') {
    list.splice(1, 0, obj2);
  } else {
    list.splice(1, 0, obj1);
  }

  if (formData.value.flag === '271') {
    list.splice(3, 0, channelCol);
  }

  return list;
});
const cgTableRef = ref<typeof CgTable | null>();
const selectChange = () => {
  nextTick(() => {
    // console.log(cgTableRef.value, '99999')
    cgTableRef.value.getListData(1)
  })
}


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
  <div class="trade-record">
    <personal-title title="LỊCH SỬ GIAO DỊCH" description="Chỉ Hiển Thị Lịch Sử Giao Dịch Trong Thời Gian 1 Tháng, Nếu Cần Biết Rõ Hơn Thông Tin Vui Lòng Liên Hệ CSKH Để Được Hỗ Trợ" />

    <div class="search-header" :class="{ 'show-channel': formData.flag === '271' }">
      <div class="flex-1 flex ai-c">
        <span class="select-label">Loại Giao Dịch</span>
        <cg-select v-model="formData.flag" :placeholder="$t('p_choose')" :options="flagList" class="select-width" @change="selectChange" />
        <template v-if="formData.flag === '271'">
          <span class="select-label mgl-25">Phương Thức Nạp Tiền</span>
          <cg-select v-model="formData.channel_id" :placeholder="$t('p_choose')" :options="depositChannelOption" class="select-width" @change="selectChange" />
        </template>
        <span class="select-label mgl-25">Thời Gian</span>
        <!-- <cg-time-switch v-model="switchIndex" v-model:formatValue="formatValue" class="select-width" /> -->
        <cg-style-date v-model="curDate" class="select-width" :width="273" @change="selectChange" />
      </div>
      <div class="search-button">
        <cg-button mini :width="110" :height="40" :font-size="15" @click="$refs.cgTableRef.getListData(1)">TÌM KIẾM</cg-button>
      </div>
    </div>
    <!-- v-if="tableFormData.start_time"  -->
    <CgTable ref="cgTableRef" :form-data="tableFormData" :columns="columns" :list-api="APIs.getTradeRecord">
      <template #empty>
        <cg-empty bth-text="Đặt cược ngay">
          <template #buttonText>
            <cg-button small :width="160" :font-size="15" class="line-height" @click="$router.push('/personal/deposit')">NẠP NGAY</cg-button>
          </template>
        </cg-empty>
      </template>
      <template #bill_no="{ row }">
        <div>{{ row.bill_no }}</div>
      </template>
      <template #amount="{ row }">
        <div class="center">
          <cg-amount :amount="row.amount" :segmentation="true" suffix="K" padding="0" :precision="row.flag == '276' || row.flag == '275' ? 2 : 0"></cg-amount>
        </div>
      </template>
      <template #platform_id="{ row }">
        <div class="center" v-if="row.flag == '273'">
          <div v-if="[181, 183, 185].includes(row.transfer_type)">
            <p>{{ $t('center_wallet') }} -</p>
            <p>{{ walletNameTransform(row.platform_id) }}</p>
          </div>
          <div v-else>
            <p>{{ walletNameTransform(row.platform_id) }} -</p>
            <p>{{ $t('center_wallet') }}</p>
          </div>
        </div>
      </template>

      <template #created_at="{ row }">
        <cg-time :time="row.created_at" :is-two-line="true" />
      </template>
      <template #flag="{ row }">
        <span v-if="row.flag != '273'">{{ flagTransform(row.flag) }}</span>
      </template>
      <template #state="{ row }">
        <span :style="{ color: colorFilter(row.state) }" :class="[row.remark ? 'has-remark' : '', colorFilter2(row.state)]" @click="() => showRemark(row)">{{ stateFlagTransform(row.state) }}</span>
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
  name: 'TradeMinutiae'
};
</script>

<style lang="scss" scoped>
.no-wrap {
  white-space: nowrap;
}
.search-header {
  display: flex;
  margin-bottom: 23px;
  margin-top: 16px;
  &.show-channel {
    .flex-1 {
      .select-width {
        width: 150px !important;
      }
      .select-label {
        vertical-align: middle;
      }
      .select-label:nth-of-type(1) {
        width: 65px;
      }
      .select-label:nth-of-type(2) {
        width: 94px;
      }
      .select-label:nth-of-type(3) {
        width: 67px;
      }
    }
  }
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

.mgl-25 {
  margin-left: 25px;
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
