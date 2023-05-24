<script setup lang='ts'>
import { ref, computed } from 'vue';
import {
    CgContainer,
    CgDivider,
} from '@/components/cg-template-2';
interface Props {
    row: any;
}
const props = defineProps<Props>()
const dataList = ref<any[]>([
    {
        title: 'Casino',
        value: 'zr',
    },
    {
        title: 'Thể Thao',
        value: 'ty',
    },
    {
        title: 'Lô Đề',
        value: 'cp',
    },
    {
        title: 'Nổ Hũ',
        value: 'dz',
    },
    {
        title: 'Game Bài',
        value: 'qp',
    },
    {
        title: 'Bắn Cá',
        value: 'by',
    },
    {
        title: 'Đá Gà',
        value: 'fc',
    },
    {
        title: 'E-Sports',
        value: 'dj',
    },
    {
        title: 'Mini Game',
        value: 'mn',
    }
])
const dataListLottery = ref<any[]>([
    {
        title: 'Lô Đề Truyền Thống',
        value: 'cg_official_rebate',
    },
    {
        title: 'Lô Đề Nhanh',
        value: 'cg_high_rebate',
    },
])
const newDataList = computed(() => {
    return dataList.value.map((item) => {
        return {
            ...item,
            value: props.row[item.value],
        }
    })
})
const newDataListLottery = computed(() => {
    return dataListLottery.value.map((item) => {
        return {
            ...item,
            value: props.row[item.value],
        }
    })
})
</script>
<template>
    <p class="label">TỶ LỆ HOÀN TRẢ</p>
    <CgContainer padding="0">
        <template #content>
            <div class="container">
                <el-row class="title-container">
                    <el-col :span="12">
                        <div class="text-title">LOẠI TRÒ CHƠI</div>
                        <cg-divider :color="'--cg-color-blue8'" />
                    </el-col>
                    <el-col :span="12">
                        <div class="text-title flex">
                            <cg-divider :color="'--cg-color-blue8'" :direction="'vertical'" />
                            <div class="flex-1">TỶ LỆ HOÀN TRẢ</div>
                        </div>
                        <cg-divider :color="'--cg-color-blue8'" />
                    </el-col>
                </el-row>
                <el-row v-for="item in newDataList">
                    <el-col :span="12">
                        <div class="text">{{ item.title }}</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="text flex">
                            <cg-divider :color="'--cg-color-blue8'" :direction="'vertical'" />
                            <div class="flex-1">{{ item.value }}%</div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </template>
    </CgContainer>
    <p class="label label-two">TỶ LỆ HOA HỒNG</p>
    <CgContainer padding="0">
        <template #content>
            <div class="container-two">
                <el-row class="title-container">
                    <el-col :span="12">
                        <div class="text-title">LOẠI TRÒ CHƠI</div>
                        <cg-divider :color="'--cg-color-blue8'" />
                    </el-col>
                    <el-col :span="12">
                        <div class="text-title flex">
                            <cg-divider :color="'--cg-color-blue8'" :direction="'vertical'" />
                            <div class="flex-1">TỶ LỆ HOA HỒNG</div>
                        </div>
                        <cg-divider :color="'--cg-color-blue8'" />
                    </el-col>
                </el-row>
                <el-row v-for="item in newDataListLottery">
                    <el-col :span="12">
                        <div class="text">{{ item.title }}</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="text flex">
                            <cg-divider :color="'--cg-color-blue8'" :direction="'vertical'" />
                            <div class="flex-1">{{ item.value }}</div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </template>
    </CgContainer>
</template>
<script lang='ts'>
export default {
    name: 'RebateDetail',
}
</script>

<style lang='scss' scoped>
.text {
    color: var(--cg-color-grey1);
    font: var(--cg-font-text);
    text-align: center;
    height: 50px;
    line-height: 50px;
}

.text-title {
    color: var(--cg-color-grey1);
    font: var(--cg-font-text1);
    text-align: center;
    height: 50px;
    line-height: 50px !important;
}

.container {
    .el-row:nth-child(odd) {
        background: var(--cg-color-blue18);
    }
}

.container-two {
    .el-row:nth-child(even) {
        background: var(--cg-color-blue18);
    }
}

.title-container {
    background-color: var(--cg-color-white5) !important;
}

.label {
    margin-bottom: 6px;
    color: var(--cg-color-grey1);
    font: var(--cg-font-text);
}

.label-two {
    margin-top: 24px;
}
</style>