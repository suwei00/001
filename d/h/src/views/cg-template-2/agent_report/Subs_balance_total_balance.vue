<script setup lang='ts'>
import { ref } from 'vue';
import {
    CgAmount,
    CgContainer,
    CgHeader,
    CgContainerHead
} from '@/components/cg-template-2';
import { getAgencyReportSubBalance } from '@/http/blue-apis';
import { useRouter } from 'vue-router'

const router = useRouter();

const formData = ref({
    username: router.currentRoute.value.query.username,// 用户名
});
const dataList = ref({});
const getList = () => {
    getAgencyReportSubBalance(formData.value as any).then((res: any) => {
        if (res.d) {
            dataList.value = res.d;
            dataList.value.sort((a: any, b: any) => {
                return a.seq - b.seq;
            })
        }
    });
};
getList();
</script>
<template>
    <div class="sub">
        <CgHeader>CHI TIẾT SỐ DƯ</CgHeader>
        <div class="list-container">
            <div class="list-itme" v-for="item in dataList" :key="item">
                <cg-container padding="0">
                    <CgContainerHead padding="0" height="60">
                        <template #center>
                            <span class="amount">{{ item.name }}</span>
                        </template>
                    </CgContainerHead>
                    <div class="label">
                        <cg-amount :amount="item.amount" :segmentation="true" suffix="K" :size="24" :color="'blue1'"
                            :weight="700" :precision="0"></cg-amount>
                    </div>
                </cg-container>
            </div>
        </div>
    </div>
</template>
<script lang='ts'>
export default {
    name: 'SubsNetAmountPlat'
}
</script>

<style lang='scss' scoped>
.sub {
    padding: 24px 32px;
}

.list-container {
    display: grid;
    grid-template-columns: 214px 214px 214px;
    grid-template-rows: 134px 134px 134px;
    grid-row-gap: 22px;
    grid-column-gap: 22px;
}

.list-itme {
    width: 214px;
    height: 134px;
    .amount {
        font: var(--cg-font-text8);
        color: var(--cg-color-black1);
        text-align: center;
    }

    .label {
        height: 70px;
        line-height: 70px;
        text-align: center;
    }
}
:deep(.cg_default){
    padding: 0 !important;
}
</style>