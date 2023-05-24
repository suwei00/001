<script setup lang='ts'>
import { ref, nextTick, computed, onMounted } from 'vue';
import APIs from '@/http/blue-apis';
import CgForm, { type FormItem } from '@/components/cg-template-2/cg-form'
import { CgHeader, CgList, CgContainer, CgEmpty, CgAmount, CgIcon, CgTime } from '@/components/cg-template-2';
import { useOption } from '@/hooks/useOption';
import { colorFilter, timeFilter } from '@/utils/format';
import { useRouter } from 'vue-router'
import { timeToVietnamBlue } from '@/utils/time';
import { transformTimeFormData } from '@/utils/common';

const router = useRouter();
const formData = ref<any>({
  flag: '271',// 交易类型
  ty: '1',// 时间
  channel_id: '0',// 充值方式
});
const { option: flagList, transform: flagTransform } = useOption('flagList');
const { option: stateFlag, transform: stateFlagTransform } = useOption('stateFlag');
const { transform: walletNameTransform } = useOption(APIs.getVenueWalletList, 'wallet_name', 'id', ['game_type']);
// 充值方式选项，仅在存款选项页面展示，取款和红利不展示
const { option: depositChannelOption, transform: depositChannelOptionTransform } = useOption(async () => {
  return APIs.getTradeChannel().then(res => {
    const arr = res.map((k: any) => {
      return { label: k.name, value: k.id + '' };
    });
    arr.unshift({ label: 'Toàn Bộ', value: '0' });
    return arr;
  });
});
const { option: timeFlag } = useOption('timeFlag');

const options = computed<FormItem[]>(() => {
  const list = [
    {
      label: 'Loại Giao Dịch',
      value: 'flag',
      type: 'select',
      modelValue: formData.value.flag,
      placeholder: 'Xin vui lòng chọn',
      options: flagList.value,
    },
    {
      label: 'Thời Gian',
      value: 'ty',
      type: 'timeSelect',
      modelValue: '1',
      placeholder: 'Xin vui lòng chọn',
      options: timeFlag.value,
    }
  ];
  const channelOpt = {
    label: 'Phương Thức Nạp Tiền',
    value: 'channel_id',
    type: 'select',
    modelValue: formData.value.channel_id,
    placeholder: 'Xin vui lòng chọn',
    options: depositChannelOption.value,
  }
  if (formData.value.flag === '271') {
    list.splice(2, 0, channelOpt);
  }
  return list;
});
const listRef = ref<typeof CgList | null>();
const submit = (data: any) => {
  if (data.flag !== '271') {
    data.channel_id = '';
  }
  formData.value = {
    ...transformTimeFormData(data, 'ty'),
  };
  nextTick(() => {
    listRef.value?.onRefresh();
  })
}
const queryData = ref({});
const cgFormRef = ref<typeof CgForm | null>();
// 查看详情
const queryDetail = (item: any) => {
  queryData.value = {
    id: item.id,
    flag: item.flag,
    amount: item.amount,
    bill_no: item.bill_no,
    created_at: item.created_at,
    state: item.state,
    remark: item.remark,
    platform_id: item.platform_id,
    channel_id: item.channel_id,
  };
  router.push({
    path: `/transaction/detail`,
    query: {
      ...queryData.value
    }
  });

}
interface MapItem {
  time: string;
  children: any[];
}

const transformListData = (data: any) => {

  const list: MapItem[] = [];

  // 根据created_at排序
  data.sort((a: any, b: any) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  // 按照天数分组
  data.forEach((item: any) => {
    const date = timeToVietnamBlue(+item.created_at, 'YYYY-MM-DD');
    const index = list.findIndex((t) => t.time === date);
    if (index === -1) {
      list.push({
        time: date,
        children: [item],
      });
    } else {
      list[index].children.push(item);
    }
  });
  return list;
}
const selectChange = (field: any, data: string) => {
  if (typeof data !== 'string') {
    formData.value = {
      ...transformTimeFormData(data, 'ty'),
    };
  } else {
    formData.value[field] = data;
  }
  if (formData.value.flag !== '271') {
    formData.value.channel_id = '';
  }
  nextTick(() => {
    listRef.value?.onRefresh();
  })
}
</script>
<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" v-show="Component" />
    <div class='transcation cg-list-container' v-show="!Component">
      <CgHeader>
        LỊCH SỬ GIAO DỊCH
      </CgHeader>
      <div class="container">
        <CgForm ref="cgFormRef" :options="options" :label-width="184" @submit="submit" @select-change="selectChange" />

        <CgList ref="listRef" :options="options" :list-api="APIs.getTradeRecord" :form-data="formData">
          <template #empty>
            <cg-empty :margin-top="80">
              <template #buttonText>
                <div class="deposit" @click="router.push('/deposit/index')">NẠP TIỀN NGAY</div>
              </template>
            </cg-empty>
          </template>
          <template #default="{ data }">
            <template v-for="parentItem in transformListData(data)">
              <div class="time-split">
                NGÀY&nbsp;{{ parentItem.time.split('-')[2] }}&nbsp;THÁNG&nbsp;{{ parentItem.time.split('-')[1] }}
              </div>
              <div class="list-item" v-for="item in parentItem.children" :key="item.created_at"
                @click="queryDetail(item)">
                <cg-container :is-shadow="true" padding="20">
                  <div class="flex-middle">
                    <div>
                      <cg-icon :name="`i_${item.flag}`" :width="68" />
                    </div>
                    <div class="flex-1 middle">
                      <div class="flex jc-sb">
                        <div class="flag">{{ flagTransform(item.flag) }}</div>
                        <div class="state" :style="{ color: colorFilter(item.state) }">{{ stateFlagTransform(item.state)
                        }}
                        </div>
                      </div>
                      <div class="platform" v-if="item.flag == '273'">
                        <div v-if="[181, 183, 185].includes(item.transfer_type)">
                          <span>Ví Tiền Chính</span><span class="label">&nbsp;>&nbsp;</span>
                          <span>{{ walletNameTransform(item.platform_id) }}</span>
                        </div>
                        <div v-else>
                          <span>{{ walletNameTransform(item.platform_id) }}</span><span class="label">&nbsp;>&nbsp;</span>
                          <span>Ví Tiền Chính</span>
                        </div>
                      </div>
                      <div class="empty" v-if="item.flag != '273'"></div>
                      <div class="flex">
                        <div class="time flex"><span>Thời Gian:&nbsp;</span> <cg-time :time="+item.created_at"
                            :color="'var(--cg-color-gray)'" :size="'var(--cg-font-22)'" /></div>
                        <cg-amount :amount="item.amount" :suffix="'K'" :color="'blue1'" :size="'24'" :weight="700"
                          :precision="(item.flag == '276' || item.flag == '275') ? 2 : 0" :segmentation="true" />
                      </div>
                    </div>
                    <div class="flex-middle">
                      <cg-icon name="i_arrowright" :width="16" />
                    </div>
                  </div>
                </cg-container>
              </div>
            </template>

          </template>
        </CgList>

      </div>
    </div>
  </router-view>
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

.list-item {
  margin-top: 24px;

  .time {
    flex: 1;
    color: var(--cg-color-gray);
    font: var(--cg-font-text4);
  }

  .flag {
    font: var(--cg-font-text8);
  }

  .state {
    font: var(--cg-font-text3);
  }

  .middle {
    padding: 0 20px
  }

  .empty {
    height: 15px;
  }

  .platform {
    height: 46px;
    line-height: 46px !important;
    font: var(--cg-font-text4);

    .label {
      color: var(--cg-color-blue1);
      font: var(--cg-font-text9);
    }
  }
}

.deposit {
  font: var(--cg-font-text3);
  color: var(--cg-color-blue1);
  text-decoration: underline;
}

.time-split {
  font: var(--cg-font-text7);
  margin-top: 24px;
}
</style>