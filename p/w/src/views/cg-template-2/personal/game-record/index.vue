<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { CgButton, CgEmpty, CgAmount, CgTime, CgTable, CgSelect, CgTimeSwitch, CgInput, CgStyleDate, type CgTableColumns } from '@/components/cg-template-2';
import PersonalTitle from '../components/personal-title/index.vue';
import { useOption } from '@/hooks/useOption';
import APIs from '@/http/blue-apis';
const formData = ref({
  flag: '-1', // 交易类型
  game_type: '2', // 游戏类型
  platform_id: '', // 平台id
  date_flag: '1', // 时间类型
  player_name: '', // 玩家账号
  agency_name: '', // 代理账号
  is_asc: '', // 排序
  sort_field: '' // 排序字段
});
const curDate = ref({
  ty: '1'
});
const tableName = ref('Mã Giao Dịch'); // 表格名称

const { option: gameStateOption, transform: gameStateTransform } = useOption('gameStateOption');
const { option: gameType } = useOption('gameType');
const { option: listDataGame, transform: platformIdTransfer } = useOption(APIs.getVenueWalletList, 'name', 'id', ['game_type']);
const tableFormData = computed(() => {
  return {
    ...formData.value,
    ...curDate.value,
    date_flag: curDate.value.ty
  };
});
const currentGameList = computed(() => [{ label: 'Toàn Bộ', value: '' }].concat((listDataGame.value || []).filter((o: any) => o.game_type == formData.value.game_type) ?? []));
// 如果game_type发生改变，平台id也要清空
watch(
  () => formData.value.game_type,
  () => {
    formData.value.platform_id = '';
    tableName.value = formData.value.game_type == '5' ? 'Số Kỳ Đặt Cược' : 'Mã Giao Dịch';
  }
);
const columns = ref<CgTableColumns[]>([
  {
    title: 'Tài Khoản',
    field: 'name',
    width: '90',
    align: 'left'
  },
  {
    title: 'Số Kỳ<br/>Đặt Cược', // 如果game_type是5，这里要显示“Số Kỳ Đặt Cược”，其他显示Mã Giao Dịch
    field: 'bill_no',
    width: '120',
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
    width: '100',
    align: 'left'
  },
  {
    title: 'Số Tiền Đặt<br/>Cược Hợp Lệ',
    field: 'valid_bet_amount',
    isSort: true,
    width: '130',
    align: 'left'
  },
  {
    title: 'Thắng Thua',
    field: 'net_amount',
    isSort: true
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
const cgTableRef = ref<typeof CgTable | null>();
const sort = (sort_field: any, is_asc: any) => {
  formData.value.sort_field = sort_field;
  formData.value.is_asc = is_asc;
  nextTick(() => {
    cgTableRef.value?.getListData(1);
  });
};
const selectChange = () => {
  nextTick(() => {
    cgTableRef.value?.getListData(1);
  });
};
</script>
<template>
  <div class="game-record">
    <personal-title title="THÔNG TIN ĐẶT CƯỢC" />
    <div class="search-header">
      <div class="flex-1">
        <div class="flex ai-c">
          <span class="select-label">Loại Trò Chơi</span>
          <cg-select v-model="formData.game_type" :placeholder="$t('p_choose')" :options="gameType" class="select-width" @change="selectChange" />
          <span class="select-label second">Sảnh</span>
          <cg-select v-model="formData.platform_id" :placeholder="$t('p_choose')" :options="currentGameList" class="select-width" @change="selectChange" />
        </div>
        <div class="second-line flex ai-c">
          <span class="select-label third">Thời Gian</span>
          <!-- <cg-time-switch v-model="formData.date_flag" class="select-width" /> -->
          <cg-style-date v-model="curDate" topFix leftFix class="select-width" :width="278" @change="selectChange" />
          <span class="select-label four">Trạng Thái<br />Đặt Cược</span>
          <cg-select v-model="formData.flag" :placeholder="$t('p_choose')" :options="gameStateOption" class="select-width" @change="selectChange" />
        </div>
        <div class="second-line flex ai-c">
          <span class="select-label five">Tài Khoản Hội Viên</span>
          <cg-input :clear="true" v-model.lowercase="formData.player_name" placeholder="Vui lòng nhập tài khoản" class="select-width" />
          <span class="select-label six">Tài Khoản Đại Lý</span>
          <cg-input :clear="true" v-model.lowercase="formData.agency_name" placeholder="Vui lòng nhập tài khoản đại lý" class="select-width" />
        </div>
      </div>
      <div class="search-button">
        <cg-button mini :width="110" :height="40" :font-size="15" @click="$refs.cgTableRef.getListData(1)">TÌM KIẾM</cg-button>
      </div>
    </div>
    <CgTable ref="cgTableRef" :form-data="tableFormData" @sort="sort" :columns="columns" :list-api="APIs.getBetDetail">
      <template #empty>
        <cg-empty bth-text="Đặt cược ngay" />
      </template>
      <template #api_types="{ row }">
        <span>{{ platformIdTransfer(row.api_types) }}</span>
      </template>
      <template #valid_bet_amount="{ row }">
        <div class="center">
          <cg-amount :amount="row.valid_bet_amount" :segmentation="true" suffix="K" padding="0" :precision="2"></cg-amount>
        </div>
      </template>
      <template #net_amount="{ row }">
        <div class="center">
          <cg-amount
            :amount="row.net_amount"
            :color="row.net_amount != 0 ? (row.net_amount < 0 ? 'red' : 'blue12') : 'grey1'"
            :segmentation="true"
            :suffix="`${row.net_amount != 0 ? 'K' : ''}`"
            padding="0"
            :precision="2"
          ></cg-amount>
        </div>
      </template>
      <template #bet_time="{ row }">
        <cg-time :time="row.bet_time" :is-two-line="true" />
      </template>
      <template #flag="{ row }">
        <span>
          {{ gameStateTransform(row.flag) }}
        </span>
      </template>
    </CgTable>
  </div>
</template>
<script lang="ts">
export default {
  name: 'GameRecord'
};
</script>

<style lang="scss" scoped>
.game-record {
  .second {
    width: 89px;
    padding-left: 16px;
  }

  .third {
    width: 90px;
    display: flex;
    align-items: center;
  }

  .four {
    width: 89px;
    padding-left: 16px;
  }

  .five {
    width: 90px;
  }

  .six {
    width: 89px;
    padding-left: 16px;
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
  width: 278px !important;
}

.mgl-22 {
  margin-left: 20px;
}

.second-line {
  margin-top: 12px;
  display: flex;
}

.center {
  text-align: center;
}
</style>
