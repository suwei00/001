<script setup lang='ts'>
import { ref, computed, watch, nextTick } from 'vue';
import APIs from '@/http/blue-apis';
import CgForm, { type FormItem } from '@/components/cg-template-2/cg-form'
import { CgHeader, CgList, CgContainer, CgDivider, CgAmount, CgContainerHead, CgIcon, CgTime, CgEmpty } from '@/components/cg-template-2';
import { useOption } from '@/hooks/useOption';
import { colorTransfer, timeFilter } from '@/utils/format';
import { copy } from '@/utils/common';
import { Toast } from 'vant';
import { getSortFormData, transformTimeFormData } from '@/utils/common';
const formData = ref({
  game_type: '2',// 游戏类型
  platform_id: '',// 平台id
  flag: '',// 投注状态
  ty: '1',// 时间
});
const { option: gameType, } = useOption('gameType');
const { option: listDataGame, transform: listDataGameTransform } = useOption(APIs.getVenueWalletList, 'name', 'id', ['game_type'])

const { option: recordFlag, transform: recordTransform } = useOption('recordFlag');
const { option: timeFlag } = useOption('timeFlag');

const currentGameList = computed(() => {
  const arr = [{ label: 'Toàn Bộ', value: '' }];
  const arr2 = (listDataGame.value || []).filter((o: any) => o.game_type == formData.value.game_type) || [];
  return arr.concat(arr2);
});

const options = computed<FormItem[]>(() => {
  return [
    {
      label: 'Loại Trò Chơi',
      value: 'game_type',
      type: 'select',
      modelValue: '2',
      placeholder: 'Xin vui lòng chọn',
      options: gameType.value,
    },
    {
      label: 'Sảnh',
      value: 'platform_id',
      type: 'select',
      placeholder: 'Xin vui lòng chọn',
      options: currentGameList.value,
    },
    {
      label: 'Trạng Thái<br/>Đặt Cược',
      value: 'flag',
      type: 'select',
      placeholder: 'Xin vui lòng chọn',
      options: recordFlag.value,
    },
    {
      label: 'Thời Gian',
      value: 'ty',
      type: 'timeSelect',
      modelValue: '1',
      placeholder: 'Xin vui lòng chọn',
      options: timeFlag.value,
    }
  ]
})

// 如果game_type发生改变，平台id也要清空
watch(() => formData.value.game_type, () => {
  formData.value.platform_id = '';
});
const listRef = ref<typeof CgList | null>();
const submit = (data: any) => {
  console.error('data', data)
  formData.value = {
    ...transformTimeFormData(data, 'ty'),
  };
  nextTick(() => {
    listRef.value?.onRefresh();
  })
}
const handleCopy = (v: string) => {
  copy(v);
  Toast('Sao Chép Thành Công');
};

const cgFormRef = ref<typeof CgForm | null>();

const selectChange = (field: any, data: any) => {
  if (typeof data !== 'string') {
    formData.value = {
      ...transformTimeFormData(data, 'ty'),
    };
  } else {
    formData.value[field] = data;
  }
  if (field === 'game_type') {
    cgFormRef.value?.setFrom('platform_id', '');
  }
  nextTick(() => {
    listRef.value?.onRefresh();
  })
}
const aggData = ref({
  bet_count: 0,
  valid_bet_amount: 0,
  net_amount: 0,
});
function changeTable(data: any, result: any) {
  console.error('result.agg', result.agg)
  if (result) {
    aggData.value.bet_count = result.t;
    aggData.value.valid_bet_amount = result.agg.valid_bet_amount;
    aggData.value.net_amount = result.agg.net_amount;
  }

}
</script>
<template>
  <div class='bet cg-list-container'>
    <CgHeader>
      LỊCH SỬ ĐẶT CƯỢC
    </CgHeader>
    <div class="container">
      <CgForm ref="cgFormRef" :options="options" :label-width="184" @submit="submit" @select-change="selectChange" />

      <CgList ref="listRef" :options="options" :list-api="APIs.getBetRecord" :form-data="formData"
        @changeData="changeTable">
        <template #empty>
          <cg-empty bth-text="Hiện không có dữ liệu" :margin-top="80"></cg-empty>
        </template>
        <template #default="{ data }">
          <!-- <div>{{ data }}</div> -->
          <!-- 总计 -->
          <div class="sum-container" v-if="aggData.bet_count">
            <CgContainer padding="36,0,36,0">
              <div class="flex sum">
                <div class="sum-one">
                  <p>Số Đơn</p>
                  <p>{{ aggData.bet_count }}</p>
                </div>
                <cg-divider direction="vertical" />
                <div class="flex-1">
                  <p>Tổng Tiền Cược</p>
                  <cg-amount :amount="aggData.valid_bet_amount" :size="26" :weight="700" :color="'blue1'" :suffix="'K'"
                    :precision="2" :segmentation="true" />
                </div>
                <cg-divider direction="vertical" />
                <div class="sum-three">
                  <p>Thắng Thua</p>
                  <cg-amount :amount="aggData.net_amount" :size="26" :weight="700"
                    :color="aggData.net_amount != 0 ? aggData.net_amount < 0 ? 'red2' : 'blue1' : 'black1'" :suffix="'K'"
                    :precision="2" :segmentation="true" />
                </div>
              </div>
            </CgContainer>
          </div>

          <div class="list-item" v-for="item in data">
            <cg-container :is-shadow="true">
              <cg-container-head radius>
                <template #left>
                  <div class="plat">{{ listDataGameTransform(item.api_types) }}</div>
                </template>
              </cg-container-head>
              <div class="detail">
                <div class="game-name">
                  {{ item.game_name }}
                </div>
                <cg-divider />
                <div class="amount">
                  <div class="flex jc-sb">
                    <div>Số Tiền Đặt Cược Hợp Lệ:</div>
                    <cg-amount :amount="item.valid_bet_amount" :suffix="'K'" :precision="2" :segmentation="true" />
                  </div>
                  <div class="flex jc-sb">
                    <div>Thắng Thua:</div>
                    <cg-amount :amount="item.net_amount" :color="colorTransfer(item.net_amount)" :suffix="'K'"
                      :precision="2" :segmentation="true" />
                  </div>
                </div>
                <cg-divider />
                <div class="amount">
                  <div class="flex jc-sb">
                    <div>Số Kỳ Đặt Cược:</div>
                    <div class="flex ai-c">{{ item.bill_no }}&nbsp;
                      <cg-icon name="i_copy" :width="36" @click="handleCopy(item.bill_no)" />
                    </div>
                  </div>
                  <div class="flex jc-sb">
                    <div>Thời Gian Đặt Cược:</div>
                    <div>
                      <cg-time :time="item.bet_time" />
                    </div>
                  </div>
                </div>
              </div>
            </cg-container>
          </div>
        </template>
      </CgList>

    </div>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'Bet'
}
</script>

<style lang='scss' scoped>
.container {
  padding: 24px 32px;
}

.sum-container {
  margin-top: 25px;
}

.sum {
  align-items: center;
  justify-content: center;

  >div {
    min-height: 72px;
    text-align: center;
    word-wrap: break-word;
  }

  >div>p:nth-of-type(1) {
    margin-bottom: 18px;
    font: var(--cg-font-text2);
  }

  >div>p:nth-of-type(2) {
    font: var(--cg-font-text7)
  }
}

.sum-one {
  width: 200px;
}

.sum-three {
  width: 200px;
}

.list-item {
  margin-top: 25px;

  .plat {
    padding-left: 20px;
    font: var(--cg-font-h4);
  }

  .game-name {
    line-height: 64px !important;
    font: var(--cg-font-text7);
  }

  .detail {
    padding: 0 20px;
  }

  .amount {
    padding: 20px 0;
    font: var(--cg-font-text3);

    >div:nth-of-type(2) {
      margin-top: 16px;
    }
  }
}
</style>