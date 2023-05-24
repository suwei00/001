<script setup lang='ts'>
import { ref, nextTick, computed } from 'vue';
import {
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
const { option: agentMemberCountSort } = useOption('agentMemberCountSort');
const { timeForm, timeChange, rightBtnClick } = useTimeSelect(typeName, props.dataList.tySub);
const formData = ref({
    username: props.dataList.username,// 用户名
    flag: props.dataList.flag,
    sort: '',// 排序
    is_asc: '',// 排序
    sort_field: '',// 排序字段
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
        title: 'Số Hội Viên<br/>Cấp Dưới',
        field: 'mem_count',
    }
])
const listRef = ref<typeof CgList | null>();
const tableData = computed(() => {
    return {
        username: formData.value.username,// 用户名
        flag: formData.value.flag,
        is_asc: formData.value.is_asc,// 排序
        sort_field: formData.value.sort_field,// 排序字段
        ...transformTimeFormData(timeForm, typeName)
    }
})
const onSearch = () => {
    if (formData.value.sort) {
        formData.value.sort.split('|').forEach((item: any, index: number) => {
            if (index === 1) {
                formData.value.sort_field = item
            }
            if (index === 2) {
                formData.value.is_asc = item
            }
        })
    }
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
const onSort = (data: any) => {
    if(data !== undefined && data.value){
        formData.value.sort = data.value
        data.value.split('|').forEach((item: any, index: number) => {
            if (index === 1) {
                formData.value.sort_field = item
            }
            if (index === 2) {
                formData.value.is_asc = item
            }
        })
    }else{
        formData.value.sort = ''
        formData.value.sort_field = ''
        formData.value.is_asc = ''
    }
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
                    <cg-select rowKey="value" showLabelKey="label" :data="agentMemberCountSort" v-model="formData.sort"
                        selectLeftText="HỦY BỎ" selectRightText="XÁC NHẬN" @on-ok="onSort">
                        <template #item="{ data }">
                            <div>
                                {{ data.label }}
                            </div>
                        </template>
                    </cg-select>
                </div>
            </div>
            <div class="username">
                <cg-field rightText="TÌM KIẾM" v-model.lowercase="formData.username" type="text" @butClick="onSearch" :clear="true" maxlength="14"
                    placeholder="Vui lòng nhập tài khoản">
                </cg-field>
            </div>
        </div>
        <CgList ref="listRef" :list-api="APIs.getAgencySub" :form-data="tableData">
            <template #default="{ data }">
                <CgTable :columns="columns" :table-data="data"></CgTable>
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