<script setup lang='ts'>
import { ref, computed, watch, nextTick } from 'vue';
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
const switchIndex = ref<string>('today');

const columns = ref<CgTableColumns[]>([
  {
    title: 'Số Kỳ<br/>Đặt Cược',
    field: 'bill_no',
    align: 'left'
  },
  {
    title: 'Sảnh',
    field: 'api_types',
    align: 'left'
  },
  {
    title: 'Trò Chơi',
    field: 'game_name',
    align: 'left'
  },
  {
    title: 'Số Tiền Đặt<br/>Cược Hợp Lệ',
    field: 'valid_bet_amount',
    align: 'center'
  },
  {
    title: 'Thắng Thua',
    field: 'net_amount'
  },
  {
    title: 'Thời Gian<br/>Đặt Cược',
    field: 'bet_time',
    align: 'left'
  },
  {
    title: 'Trạng Thái<br/>Đặt Cược',
    field: 'flag',
    align: 'left'
  }
]);
const formData = ref({
  game_type: '2',// 游戏类型
  platform_id: '',// 平台id
  flag: '',// 投注状态
});
const curDate = ref({
  ty: '1'
});
const formatValue = ref<[string, string] | null>(null);

const tableFormData = computed(() => {
  return {
    ...formData.value,
    // start_time: formatValue.value?.[0] ?? '',
    // end_time: formatValue.value?.[1] ?? '',
    ...curDate.value,
  }
});
const { option: gameType, } = useOption('gameType');
const { option: listDataGame, transform: platformIdTransfer } = useOption(APIs.getVenueWalletList, 'name', 'id', ['game_type'])
const { option: recordFlag, transform: recordTransform } = useOption('recordFlag');

const currentGameList = computed(() => [{ label: 'Toàn Bộ', value: '' }].concat((listDataGame.value || []).filter((o: any) => o.game_type == formData.value.game_type) ?? []));
// 如果game_type发生改变，平台id也要清空
watch(() => formData.value.game_type, () => {
  formData.value.platform_id = '';
});
const cgTableRef = ref<typeof CgTable | null>();
const selectChange = () => {
  nextTick(() => {
    // console.log(cgTableRef.value, '99999')
    cgTableRef.value.getListData(1)
  })
}
</script>
<template>
  <div class="bet-record">
    <personal-title title="LỊCH SỬ ĐẶT CƯỢC"
      description="Dữ Liệu Của Mỗi Sảnh Trò Chơi Sẽ Bị Chậm Trễ Một Khoảng Thời Gian Nhất Định. Dữ Liệu Chỉ Dùng Để Tham Khảo" />
    <div class="search-header">
      <div class="flex-1">
        <div class="flex ai-c">
          <span class="select-label label-154">Loại Trò Chơi</span>
          <cg-select v-model="formData.game_type" :placeholder="$t('p_choose')" :options="gameType" class="select-width"
            @change="selectChange" />
          <span class="select-label label-78 mgl-22">Sảnh</span>
          <cg-select v-model="formData.platform_id" :placeholder="$t('p_choose')" :options="currentGameList"
            class="select-width" @change="selectChange" />
        </div>
        <div class="select-top flex ai-c">
          <span class="select-label label-154">Trạng Thái Đặt Cược</span>
          <cg-select v-model="formData.flag" :placeholder="$t('p_choose')" :options="recordFlag" class="select-width"
            @change="selectChange" />
          <span class="select-label label-78 mgl-22">Thời Gian</span>
          <!-- <cg-time-switch v-model="switchIndex" v-model:formatValue="formatValue" class="select-width" /> -->
          <cg-style-date v-model="curDate" class="select-width" :width="251" @change="selectChange" />
        </div>
      </div>
      <div class="search-button">
        <cg-button mini :width="110" :font-size="15" :height="40" @click="$refs.cgTableRef.getListData(1)">TÌM
          KIẾM</cg-button>
      </div>
    </div>
    <!-- v-if="tableFormData.start_time" -->
    <CgTable ref="cgTableRef" :form-data="tableFormData" :columns="columns" :list-api="APIs.getBetRecord"
      :summary-fields="['valid_bet_amount', 'net_amount']">
      <template #empty>
        <cg-empty bth-text="Đặt cược ngay">
          <template #buttonText>
            <cg-button small :width="160" :font-size="15" class="line-height" @click="$router.push('/')">ĐẶT CƯỢC
              NGAY</cg-button>
          </template>
        </cg-empty>
      </template>

      <template #api_types="{ row }">
        <div>{{ platformIdTransfer(row.api_types) }}</div>
      </template>
      <template #valid_bet_amount="{ row }">
        <div class="center">
          <cg-amount :amount="row.valid_bet_amount" :segmentation="true" suffix="K" padding="0"
            :precision="2"></cg-amount>
        </div>
      </template>
      <template #net_amount="{ row }">
        <cg-amount :amount="row.net_amount" :color="row.net_amount != 0 ? row.net_amount < 0 ? 'red' : 'blue12' : 'grey1'"
          :segmentation="true" suffix="K" padding="0" :precision="2"></cg-amount>
      </template>
      <template #bet_time="{ row }">
        <cg-time :time="row.bet_time" :is-two-line="true" />
      </template>
      <template #flag="{ row }">
        <span>{{ recordTransform(row.flag) }}</span>
      </template>
    </CgTable>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'BetRecord'
}
</script>

<style lang='scss' scoped>
.search-header {
  display: flex;
  margin-bottom: 23px;
  margin-top: 16px;

  .label-154 {
    width: 142px;
  }

  .mgl-22 {
    margin-left: 22px;
  }

  .label-78 {
    width: 67px;
  }
}

.select-top {
  margin-top: 12px;
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
  width: 251px !important;
  display: inline-block !important;
}

:deep(.el-table__footer-wrapper) {
  margin-top: 0 !important;
}
</style>