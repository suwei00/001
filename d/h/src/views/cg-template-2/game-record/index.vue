<script setup lang='ts'>
import { ref, nextTick, watch, computed } from 'vue';
import APIs from '@/http/blue-apis';
import CgForm, { type FormItem } from '@/components/cg-template-2/cg-form'
import { CgHeader, CgList, CgAmount, CgContainer, CgTime, CgEmpty } from '@/components/cg-template-2';
import { useOption } from '@/hooks/useOption';
import { getSortFormData, transformTimeFormData } from '@/utils/common';

const formData = ref({
  flag: '-1',// 交易类型
  game_type: '2',// 游戏类型
  platform_id: '',// 平台id
  date_flag: '1',// 时间类型
  player_name: '',// 玩家账号
  agency_name: '',// 代理账号
  sort: '',//排序
});
const { option: gameType, } = useOption('gameType');
const { option: listDataGame, transform: platformIdTransfer } = useOption(APIs.getVenueWalletList, 'name', 'id', ['game_type'])
const { option: gameStateOption, transform: gameStateTransform } = useOption('gameStateOption');
const { option: gameRecordOption } = useOption('gameRecordOption');
const { transform: stateFlagTransform } = useOption('stateFlag');
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
      modelValue: '',
      placeholder: 'Xin vui lòng chọn',
      options: currentGameList.value,
    },
    {
      label: 'Trạng Thái<br/>Đặt Cược',
      value: 'flag',
      type: 'select',
      modelValue: '-1',
      placeholder: 'Chọn Phương Thức Nạp Tiền',
      options: gameStateOption.value,
    },
    {
      label: 'Thời Gian',
      value: 'date_flag',
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
      options: gameRecordOption.value,
    },
    {
      label: 'Tài Khoản<br/>Hội Viên',
      value: 'player_name',
      type: 'field',
      modelValue: '',
      lowercase: true,
      placeholder: 'Vui lòng nhập tài khoản'
    },
    {
      label: 'Tài Khoản Đại Lý',
      value: 'agency_name',
      type: 'field',
      modelValue: '',
      lowercase: true,
      placeholder: 'Vui lòng nhập tài khoản đại lý'
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
  const newData = transformTimeFormData(data, 'date_flag');
  formData.value = {
    ...getSortFormData(newData),
  };
  nextTick(() => {
    listRef.value?.onRefresh();
  })
}
const cgFormRef = ref<typeof CgForm | null>();

const selectChange = (field: any, data: string) => {
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
  formData.value = {
    ...getSortFormData(formData.value),
  };
  nextTick(() => {
    listRef.value?.onRefresh();
  })
}
</script>
<template>
  <div class='transcation cg-list-container'>
    <CgHeader>THÔNG TIN ĐẶT CƯỢC</CgHeader>
    <div class="container">
      <CgForm ref="cgFormRef" :options="options" :label-width="184" @submit="submit" @select-change="selectChange" />
      <div class="empty"></div>
      <CgList ref="listRef" :options="options" :list-api="APIs.getBetDetail" :form-data="formData">
        <template #empty>
          <cg-empty bth-text="Hiện không có dữ liệu" :margin-top="50"></cg-empty>
        </template>
        <template #default="{ data }">
          <div class="list-item" v-for="item in data">
            <cg-container :padding="'10,20'">
              <div class="item">
                <div>Tài Khoản</div>
                <div>{{ item.name }}</div>
              </div>
              <div class="item">
                <div>Số Kỳ Đặt Cược</div>
                <div>{{ item.bill_no }}</div>
              </div>
              <div class="item">
                <div>Sảnh</div>
                <div>{{ platformIdTransfer(item.api_types) }}</div>
              </div>
              <div class="item">
                <div>Trò Chơi</div>
                <div>{{ item.game_name }}</div>
              </div>
              <div class="item">
                <div>Số Tiền Đặt Cược Hợp Lệ</div>
                <div>
                  <cg-amount :amount="item.valid_bet_amount" :segmentation="true" suffix="K" :precision="2"></cg-amount>
                </div>
              </div>
              <div class="item">
                <div>Thắng Thua</div>
                <div>
                  <cg-amount :amount="item.net_amount"
                    :color="item.net_amount != 0 ? item.net_amount < 0 ? 'red2' : 'blue1' : 'black1'" :segmentation="true"
                    suffix="K" :precision="2"></cg-amount>
                </div>
              </div>

              <div class="item">
                <div>Thời Gian Đặt Cược</div>
                <div>
                  <cg-time :time="item.bet_time" :align="'right'" :font="'var(--cg-font-text3)'" :size="'24'"
                    :color="'var(--cg-color-black1)'" />
                </div>
              </div>
              <div class="item">
                <div>Trạng Thái Đặt Cược </div>
                <div>{{ gameStateTransform(item.flag) }}</div>
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
  name: 'GameRecord',
}
</script>

<style lang='scss' scoped>
.container {
  padding: 24px 32px;
}


.empty {
  height: 24px;
}

.list-item {
  margin-bottom: 24px;
}

.item {
  display: flex;
  font: var(--cg-font-text3);
  align-items: center;

  >div {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  >div:nth-of-type(2) {
    flex: 1;
    text-align: right;
  }
}
</style>