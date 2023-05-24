<script setup lang='ts'>
import { ref, nextTick } from 'vue';
import {
    CgAmount,
    CgContainer,
    CgIcon,
    CgContainerHead,
    CgDivider, CgMaintain
} from '@/components/cg-template-2';
import { getAgencyReportSubBalance } from '@/http/blue-apis';
import PersonalTitle from '../components/personal-title/index.vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const formData = ref({
    username: router.currentRoute.value.query.username,// 用户名
});
const wallets = ref({});
const getList = () => {
    getAgencyReportSubBalance(formData.value as any).then((res: any) => {
        if (res.d) {
            wallets.value = res.d;
            // wallets根据seq升序排序
            wallets.value.sort((a: any, b: any) => {
                return a.seq - b.seq;
            })
        }
    });
};
getList();
</script>
<template>
    <div class="sub">
        <personal-title title="Báo Biểu Đại Lý" description="" />
        <div class="flex ai-c point" @click="router.back">
            <cg-icon width="12" name="i_back" />
            <span class="tip">{{ 'Chi Tiết Số Dư'.toUpperCase() }}</span>
        </div>
        <div class="venue-wallet">
            <CgContainer v-for="(wallet, index) in wallets" :key="wallet.index" type='smallContainer' radius="12"
                width="205">
                <template #content>
                    <CgContainerHead height="34">
                        <template #center>
                            <span class="venue-name">{{ wallet.name }}</span>
                        </template>
                    </CgContainerHead>
                    <div class="venue-money">
                        <cg-amount :amount="wallet.amount" size="17" weight="700" color="blue12" :segmentation="true"
                            suffix="K" />
                    </div>
                    <!-- <cg-maintain type="wallet" v-if="!wallet.enable" /> -->
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
.tip {
    margin-left: 10px;
    font: var(--cg-font-text2);
    color: var(--cg-color-grey1);
}

.point {
    cursor: pointer;
}

.venue-wallet {
    margin-top: 16px;
    min-height: 400px;
    color: var(--cg-color-grey1);
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 25px 20px;

    .venue-name {
        font-weight: 400;
        font-size: var(--cg-font-15);
    }

    .venue-money {
        height: 47.82px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--cg-color-blue12);
        font: var(--cg-font-text2);
    }

    .transfer-box {
        height: 36px;
        display: flex;

        .in,
        .out {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            font: var(--cg-font-text9);
            cursor: pointer;

            &:hover {
                background: var(--cg-gradient-blue2-button);
                color: var(--cg-color-white);
            }
        }

        .in {
            color: var(--cg-color-blue12);
        }
    }
}
</style>