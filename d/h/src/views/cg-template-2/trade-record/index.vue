<script setup lang='ts'>
import { ref, nextTick, computed } from 'vue';
import APIs from '@/http/blue-apis';
import CgForm, { type FormItem } from '@/components/cg-template-2/cg-form'
import { CgHeader, CgList, CgEmpty, CgAmount, CgContainer, CgTime } from '@/components/cg-template-2';
import { useOption } from '@/hooks/useOption';
import { colorFilter, timeFilter, colorFilter2 } from '@/utils/format';
import { getSortFormData, transformTimeFormData } from '@/utils/common';
import { useRouter } from 'vue-router'
import { userInfoStateStore } from '@/store-pinia/userInfo'
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call'

const Dialog = new CgDialogClass()

const userInfoStore = userInfoStateStore()
const userInfo = userInfoStore.userInfo;
const router = useRouter();
const formData = ref({
    flag: '271',// 交易类型
    date_flag: '1',// 时间类型
    player_name: '',// 玩家账号
    channel_id: '0',// 渠道id 默认全部 全部传 '0'
    sort: '',// 排序
});
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
const { option: tradeRecordTypeOption } = useOption('tradeRecordTypeOption');
const { transform: stateFlagTransform } = useOption('stateFlag');
const { option: timeFlag } = useOption('timeFlag');
const options = computed<FormItem[]>(() => {
    const list = [
        {
            label: 'Loại Giao Dịch',
            value: 'flag',
            type: 'select',
            modelValue: formData.value.flag,
            placeholder: '',
            options: tradeTypeOption.value,
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
            options: tradeRecordTypeOption.value,
        },
        {
            label: 'Tài Khoản Hội Viên',
            value: 'player_name',
            type: 'field',
            modelValue: '',
            lowercase: true,
            placeholder: 'Vui lòng nhập tài khoản'
        }]
    // 271
    const obj2 = {
        label: 'Phương Thức<br/>Nạp Tiền',
        value: 'channel_id',
        type: 'select',
        modelValue: '0',
        placeholder: 'Chọn Phương Thức Nạp Tiền',
        options: depositChannelOption.value,
    }

    if (formData.value.flag === '271') {
        list.splice(2, 0, obj2);
    }

    return list;
})

const listRef = ref<typeof CgList | null>();
const cgFormRef = ref<typeof CgForm | null>();

const submit = (data: any) => {
    if (data.flag !== '271') {
      data.channel_id = '';
    }
    const newData = transformTimeFormData(data, 'date_flag');
    formData.value = {
        ...getSortFormData(newData),
    };
    nextTick(() => {
        listRef.value?.onRefresh();
    })
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
  };
  if (formData.value.flag !== '271') {
    formData.value.channel_id = '';
  }
  nextTick(() => {
    listRef.value?.onRefresh();
  })
}

const showRemark = (item: any) => {
  if (item.remark) {
    Dialog.showDialog({
      template: 'tmp1',
      title: 'GHI CHÚ',
      tmp1Content: item.remark,
      btns: 1,
    })
  }
}
</script>
<template>
    <div class='transcation cg-list-container'>
        <CgHeader>THÔNG TIN GIAO DỊCH</CgHeader>
        <div class="container">
            <CgForm ref="cgFormRef" :options="options" :label-width="184" @submit="submit"
                @selectChange="selectChange" />
            <div class="empty"></div>
            <CgList ref="listRef" :options="options" :list-api="APIs.getTradeDetail" :form-data="formData">
                <template #empty>
                    <cg-empty bth-text="Hiện không có dữ liệu" :margin-top="80"></cg-empty>
                </template>
                <template #default="{ data }">
                    <div class="list-item" v-for="item in data">
                        <cg-container :padding="'10,20'">
                            <div class="item">
                                <div>Tài Khoản</div>
                                <div>{{ item.username }}</div>
                            </div>
                            <div class="item">
                                <div>Đại Lý Cấp Trên</div>
                                <div>{{ item.parent_name }}</div>
                            </div>
                            <div class="item">
                                <div>Số Tiền</div>
                                <div><cg-amount :amount="item.amount" :segmentation="true" suffix="K" padding="0"
                                        :precision="0"></cg-amount></div>
                            </div>
                            <div class="item" v-if="item.flag == '271'">
                                <div>Phương Thức Nạp Tiền</div>
                                <div>{{ depositChannelOptionTransform(item.channel_id) }}</div>
                            </div>
                            <div class="item">
                                <div>Thời Gian</div>
                                <div><cg-time :time="+item.created_at" :align="'right'" :font="'var(--cg-font-text3)'"
                                        :size="'24'" :color="'var(--cg-color-black1)'" /></div>
                            </div>
                            <div class="item">
                                <div>Trạng Thái</div>
                                <div :style="{ color: colorFilter(item.state) }">
                                    <div :class="[item.remark ? 'has-remark': '', colorFilter2(item.state)]" @click="() => showRemark(item)">
                                      {{ stateFlagTransform(item.state) }}
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="item">
                                <div>Ghi Chú</div>
                                <div v-html="item.remark"></div>
                            </div> -->
                        </cg-container>
                    </div>
                </template>
            </CgList>

        </div>
    </div>
</template>
<script lang='ts'>
export default {
    name: 'TradeRecord'
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
.has-remark {
  // text-decoration: underline;
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
  &.red2::after {
    background-color: var(--cg-color-red2);
  }
}
</style>