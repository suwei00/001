<script setup lang='ts'>
import { ref, nextTick, computed } from 'vue';
import {
    CgTime,
    CgAmount,
    CgField,
    CgSelect,
    CgList,
    CgTable,
    CgTimeSelect
} from '@/components/cg-template-2';
import APIs from '@/http/blue-apis';
import { useOption } from '@/hooks/useOption';
import { useTimeSelect } from '@/hooks/useTimeSelect';
import { transformTimeFormData } from '@/utils/common';

const props = defineProps<{
    dataList?: any,
}>()
const typeName = 'ty';
const { option: timeFlag } = useOption('timeFlag');
const { timeForm, timeChange, rightBtnClick } = useTimeSelect(typeName, props.dataList.tySub);
const formData = ref({
    username: props.dataList.username,// 用户名
    ...transformTimeFormData(timeForm, typeName),
    flag: props.dataList.flag,
});
const columns = ref([
    {
        title: 'Tài Khoản<br/>Hội Viên',
        field: 'username',
    },
    {
        title: 'Đại Lý<br/>Cấp Trên',
        field: 'parent_name',
    },
    {
        title: 'Mã Tài Khoản<br/>Giới Thiệu',
        field: 'parent_name',
    },
    {
        title: 'Thời Gian<br/>Đăng Ký',
        field: 'created_at',
    }
])
const listRef = ref<typeof CgList | null>();
const onSearch = () => {
    nextTick(() => {
        listRef.value?.onRefresh();
    })
}
const onSearchRight = (data: any) => {
    rightBtnClick()
    nextTick(() => {
        listRef.value?.onRefresh();
    })
}
</script>
<template>
    <div class="sub cg-list-container">
        <div class="input-container">
            <div class="time-sort">
                <div class="time">
                    <cg-select rowKey="value" :key="timeForm[typeName]" showLabelKey="label" :data="timeFlag"
                        v-model="timeForm[typeName]" selectLeftText="HỦY BỎ" selectRightText="XÁC NHẬN"
                        @on-ok="onSearchRight">
                        <template #content>
                            <div style="width: 100%">
                                <CgTimeSelect v-model:type="timeForm[typeName]" v-model:start_time="timeForm.start_time"
                                    v-model:end_time="timeForm.end_time" @change="timeChange" />
                            </div>
                        </template>
                    </cg-select>
                </div>
                <div class="sort">
                    <cg-field rightText="TÌM KIẾM" v-model.lowercase="formData.username" type="text" @butClick="onSearch" :clear="true" maxlength="14"
                        placeholder="Vui lòng nhập tài khoản">
                    </cg-field>
                </div>
            </div>
        </div>
        <CgList ref="listRef" :list-api="APIs.getAgencySub" :form-data="formData">
            <template #default="{ data }">
                <CgTable :columns="columns" :table-data="data">
                    <template #created_at="{ row }">
                        <cg-time :time="row.created_at" :align="'center'" />
                    </template>
                </CgTable>
            </template>
        </CgList>
    </div>
</template>
<script lang='ts'>
export default {
    name: 'TradeMinutiae'
}
</script>

<style lang='scss' scoped>
.sub {
    padding: 24px 32px;

    :deep(.cg-container-head:nth-of-type(3)) {
        .cg_default {
            padding: 0 4px 0 0 !important;
        }

    }
}

.input-container {
    margin-bottom: 24px;
}

.time-sort {
    display: flex;
    margin-bottom: 24px;

    .time {
        width: 218px;
    }

    .sort {
        flex: 1;
        margin-left: 24px;
    }
}
</style>