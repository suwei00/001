<script setup lang='ts'>
import { computed, ref } from 'vue';
import APIs from '@/http/blue-apis';
import { CgHeader, CgContainer, CgDivider, CgAmount, CgIcon, CgTime, CgContainerHead, CgButton, CgList, CgEmpty } from '@/components/cg-template-2';
import { useRouter } from 'vue-router'
import { useOption } from '@/hooks/useOption';
const router = useRouter();
const listRef = ref<typeof CgList | null>();
const { transform: flowingDetailTransform } = useOption('flowingDetail');
const flowNum = computed(() => listRef.value?.agg.un_fish_flow_amount)
const tableData = ref();

</script>
<template>
    <div class='withdraw_detail cg-list-container'>
        <CgHeader>
            CHI TIẾT TIỀN CƯỢC YÊU CẦU
        </CgHeader>
        <div class="container">
            <cg-container :is-shadow="true">
                <CgContainerHead height="80" padding="24">
                    <template #left>
                        TỔNG TỀN CƯỢC YÊU CẦU
                    </template>
                </CgContainerHead>
                <div class="withdraw_bottom flex  fdr-c  ">
                    <CgAmount color="blue1" weight="700" size="48" segmentation suffix="K" :amount="flowNum" :precision="3"/>
                    <CgDivider margin="12px 0px 16px 0px" />
                    <CgButton width="100%" @click="router.push('/')" v-if="tableData?.length">ĐẶT CƯỢC NGAY</CgButton>
                    <CgButton width="100%" @click="router.back" v-else> RÚT TIỀN NGAY</CgButton>

                </div>
            </cg-container>
        </div>
        <CgList ref="listRef" :list-api="APIs.getFlowDetail" @changeData="(data) => tableData = data">
            <template #empty>
                <cg-empty bth-text="Hiện không có dữ liệu" :margin-top="80"></cg-empty>
            </template>
            <template #default="{ data }">
                <div class="list-item" v-for="item in data">
                    <cg-container :padding="'0,20,20,20'" :is-shadow="true">
                        <div class="item flex_flowname">
                            <!-- 类型 -->
                            <div v-if="item.ty === '3'" class="water_type"> {{ item.title }}</div>
                            <div v-else>{{ flowingDetailTransform(item.ty) }}</div>
                            <!-- 入款金额 -->
                            <div>
                                <cg-amount :amount="item.ty != '1' ? item.reward_amount : item.amount"
                                    :segmentation="true" suffix="K" padding="0" :precision="3"></cg-amount>
                            </div>
                        </div>
                        <div class="item">
                            <div>Ví Tiền</div>
                            <div>{{ item.wallet_name }}</div>
                        </div>
                        <div class="item">
                            <div>Tiền Cược Yêu Cầu</div>
                            <div>
                                <cg-amount :amount="item.flow_amount" :segmentation="true" suffix="K" padding="0"
                                    :precision="3"></cg-amount>
                            </div>
                        </div>
                        <div class="item">
                            <div>Tiền Cược Chưa Hoàn Thành</div>
                            <div>
                                <cg-amount :amount="item.unfinished_amount" color='red2' :segmentation="true"
                                    suffix="K" padding="0" :precision="3"></cg-amount>
                            </div>
                        </div>
                        <div class="item">
                            <div>Thời Gian Tiền Vào</div>
                            <div><cg-time :time="item.created_at" :align="'right'" :font="'var(--cg-font-text3)'"
                                    :size="'24'" :color="'var(--cg-color-black1)'" /></div>
                        </div>
                    </cg-container>
                </div>
            </template>
        </CgList>
    </div>
</template>
<script lang='ts'>
export default {
    name: 'withdrawDetail'
}
</script>

<style lang='scss' scoped>
.withdraw_detail {
    padding: 24px 34px;

    .withdraw_bottom {
        padding: 20px 20px 32px 20px;
        text-align: center;
    }

    .list-item {
        margin: 24px 0;

        .flex_flowname {
            .water_type {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }

        .item {
            display: flex;
            font: var(--cg-font-text3);
            align-items: center;
            margin-top: 18px;

            >div {
                // min-height: 44px;
                display: flex;
                align-items: center;
                justify-content: flex-end;

            }

            >div:nth-of-type(2) {
                margin-left: 62px;
                flex: 1;
                text-align: right;
            }
        }
    }
}
</style>