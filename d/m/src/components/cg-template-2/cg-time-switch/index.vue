<script setup lang="ts">
import dayjs from 'dayjs';
import { onMounted, ref, watch } from 'vue';
import { getDate } from '@/utils/date-map';
import CgTimeSwitch from './index.d';
interface Props extends CgTimeSwitch.Props {
    modelValue: any;
    formatValue?: [string, string] | null;
}
const props = withDefaults(defineProps<Props>(), {

})
const flag = ref<string | undefined>('1');
const formatValue = ref<Array<any>>([dayjs().locale('vi').startOf('day'), dayjs().locale('vi')]);
// //1今天2昨天3本月4上月7本周8上周
const timeListData = [
    { label: 'Hôm Nay', id: '1', zh: '今天', name: 'today' },
    { label: 'Hôm Qua', id: '2', zh: '昨天', name: 'yesterday' },
    { label: 'Tuần Này', id: '7', zh: '本周', name: 'thisWeek' },
    { label: 'Tuần Trước', id: '8', zh: '上周', name: 'lastWeek' },
    { label: 'Tháng Này', id: '3', zh: '本月', name: 'thisMonth' },
    { label: 'Tháng Trước', id: '4', zh: '上月', name: 'lastMonth' }
];
const emit = defineEmits(['update:modelValue', 'update:formatValue', 'onChange']);


const onChange = (value: any) => {
    if (isNaN(props.modelValue)) {
        const typeStr: any = timeListData.find(a => a.id === value)?.name;
        const start_time = getDate(typeStr)[0].format('YYYY-MM-DD HH:mm:ss');
        const end_time = getDate(typeStr)[1].format('YYYY-MM-DD HH:mm:ss');
        formatValue.value = [start_time, end_time];
        emit('update:formatValue', formatValue.value);
        emit('update:modelValue', typeStr);
    } else {
        emit('update:modelValue', value);
    }
    emit('onChange');
};

const setUpdate = () => {
    if (isNaN(props.modelValue)) {
        flag.value = timeListData.find(a => a.name === props.modelValue)?.id;
        const start_time = getDate(props.modelValue)[0].format('YYYY-MM-DD HH:mm:ss');
        const end_time = getDate(props.modelValue)[1].format('YYYY-MM-DD HH:mm:ss');
        formatValue.value = [start_time, end_time];
        emit('update:formatValue', formatValue.value);
    } else {
        flag.value = props.modelValue;
    }
};

watch(
    () => props.modelValue,
    () => {
        setUpdate();
    }
);

onMounted(() => {
    setUpdate();
});
</script>
<template>
    <el-select :placeholder="$t('p_choose')" v-model="flag" @change="onChange">
        <el-option :key="item.id" v-for="item in timeListData" :label="item.label" :value="item.id" />
    </el-select>
</template>
  

<style lang="scss" scoped></style>
  