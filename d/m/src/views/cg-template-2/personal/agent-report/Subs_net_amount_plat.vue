<script setup lang='ts'>
import { ref, nextTick } from 'vue';
import {
    CgButton,
    CgAmount,
    CgContainer,
    CgTimeSwitch,
    CgIcon,
    CgStyleDate,
} from '@/components/cg-template-2';
import { getReportSubPlat } from '@/http/blue-apis';
import PersonalTitle from '../components/personal-title/index.vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const formData = ref({
    username: router.currentRoute.value.query.username,// 用户名
    ty: router.currentRoute.value.query.ty,// 时间类型
});
const curDate = ref({
    ty: router.currentRoute.value.query.ty,// 时间类型
    start_time: router.currentRoute.value.query.start_time,
    end_time: router.currentRoute.value.query.end_time,
});
const dataList = ref({});
const getList = () => {
    getReportSubPlat({ ...formData.value, ...curDate.value } as any).then((res: any) => {
        if (res.d) {
            dataList.value = res.d;
        }
    });
};
const onSearch = () => {
    getList();
};
getList();
</script>
<template>
    <div class="sub">
        <personal-title title="Báo Biểu Đại Lý" description="" />
        <div class="flex ai-c point" @click="router.back">
            <cg-icon width="12" name="i_back" />
            <span class="tip">{{ 'Chi Tiết Thắng Thua'.toUpperCase() }}</span>
        </div>
        <div class="search-header">
            <div class="flex-1 flex ai-c">
                <span class="select-label">Thời Gian</span>
                <!-- <cg-time-switch v-model="formData.ty" class="select-width mgr-25" /> -->
                <cg-style-date topFix leftFix v-model="curDate" class="select-width mgr-25" :width="350"
                    @change="onSearch()" />
            </div>
            <div class="search-button">
                <cg-button mini :width="110" :height="40" :font-size="15" @click="onSearch()">TÌM
                    KIẾM</cg-button>
            </div>
        </div>
        <div class="list-container">
            <CgContainer type='smallContainer' padding="" radius="12" v-for="item in dataList" :key="item">
                <template #content>
                    <div class="list-item">
                        <div class="amount">
                            <p class="jump-txt">{{ item.name }}</p>
                            <cg-amount :amount="item.amount" :segmentation="true" suffix="K" :size="17"
                                :color="'var(--cg-color-grey1)'" :weight="700" :precision="2"></cg-amount>
                        </div>
                    </div>
                </template>
            </CgContainer>
        </div>
    </div>
</template>
<script lang='ts'>
export default {
    name: 'SubsNetAmountPlat'
}
</script>

<style lang='scss' scoped>
.search-header {
    display: flex;
    margin-bottom: 23px;
    margin-top: 13px;
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
    width: 350px;
    display: inline-block;
}

.mgr-25 {
    margin-right: 25px;
}

.tip {
    margin-left: 10px;
    font: var(--cg-font-text2);
    color: var(--cg-color-grey1);
}

.point {
    cursor: pointer;
}

.list-container {
    display: flex;
    flex-wrap: wrap;
    gap: 19px;


    .list-item {
        width: 203px;
        height: 64px;
    }


    ::v-deep(.pub_small_container) {
        overflow: hidden;
    }

    .amount {
        padding-top: 1px;
        font: var(--cg-font-text2);
        color: var(--cg-color-grey1);
        text-align: center;
        line-height: 20px;
    }

    .jump-txt {
        padding-top: 14px;
        text-align: center;
        font: var(--cg-font-text5);
        color: var(--cg-color-blue12);
        line-height: 15px;
    }
}
</style>