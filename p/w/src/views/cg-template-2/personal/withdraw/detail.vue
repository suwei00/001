<script setup lang='ts'>
import PersonalTitle from '../components/personal-title/index.vue';
import { ref, computed } from 'vue';
import {
    CgTable, type CgTableColumns,
    CgIcon, CgButton, CgContainer, CgAmount, CgTime, CgEmpty,
} from '@/components/cg-template-2';
import { useRouter } from 'vue-router'
import APIs from '@/http/blue-apis';
import { useOption } from '@/hooks/useOption';
const router = useRouter();
const cgTableRef = ref<typeof CgTable | null>();
const columns = ref<CgTableColumns[]>([
    {
        title: 'Thời Gian <br/>Tền Vào',
        field: 'created_at',
        align: 'left'
    },
    {
        title: 'Loại Hình',
        field: 'title',
        width: '150',
        align: 'left'
    },
    {
        title: 'Ví Tiền',
        field: 'wallet_name',
        width: '120',
    },
    {
        title: 'Tiền Vào',
        field: 'amount',
    },

    {
        title: 'Tiền Cược <br/>Yêu Cầu',
        field: 'flow_amount',
    },
    {
        title: 'Tiền Cược<br/> Đã Hợp Lệ',
        field: 'finished_amount',
    },
    {
        title: 'Tiền Cược <br/>Cần Hoàn Hhành',
        field: 'unfinished_amount',
        align: 'left',
        width: '140',
    }
]);
// const { transform: flowingDetailTransform } = useOption('flowingDetail');
const flowNum = computed(() => cgTableRef.value?.agg.un_fish_flow_amount)
const tableData = ref();
</script>
<template>
    <div class='withdraw_detail'>
        <personal-title title="RÚT TIỀN"
            description="Mỗi Đơn Rút Tiền Chỉ Tốn Từ 3 -15 Phút. Nếu Quá 30 Phút Mà Tài Khoản Của Bạn Chưa Nhận Được Tiền, Vui Lòng Liên Hệ CSKH Để Kiểm Tra" />
        <div class="flex ai-c crs-p" @click="$router.back()">
            <cg-icon width="12" name="i_back" />
            <span class="tip">CHI TIẾT TIỀN CƯỢC YÊU CẦU</span>
        </div>
        <CgContainer margin="12,0,16,0" padding="11,16,11,21" radius="8">
            <template #content>
                <div class="flex ai-c jc-sb">
                    <div class="flex ai-c jc-c">
                        <span class="total_m"> TỔNG TIỀN CƯỢC YÊU CẦU:</span>
                        <cg-amount size="17" weight="700" :amount="flowNum" :segmentation="true" color="blue12" suffix="K"
                            :precision="3"></cg-amount>
                    </div>
                    <div>
                        <CgButton @click="router.push('/')" center width="171" height="38" v-if="tableData?.length">
                            ĐẶT CƯỢC NGAY
                        </CgButton>
                        <CgButton @click="router.back" center width="171" height="38" v-else>
                            RÚT TIỀN NGAY
                        </CgButton>
                    </div>
                </div>
            </template>
        </CgContainer>
        <CgTable ref="cgTableRef" :columns="columns" :list-api="APIs.getFlowDetail"
            @changeData="(data) => tableData = data.d">
            <template #empty>
                <cg-empty bth-text="Đặt cược ngay" />
            </template>
            <template #created_at="{ row }">
                <cg-time :time="row.created_at" :is-two-line="true" />
            </template>
            <template #title="{ row }">
                <div>{{ row.title }}</div>
            </template>
            <template #wallet_name="{ row }">
                <div class="center">
                    {{ row.wallet_name }}
                </div>
            </template>
            <template #amount="{ row }">
                <div class="left">
                    <cg-amount :amount="row.ty != '1' ? row.reward_amount : row.amount" :segmentation="true" suffix="K"
                        :precision="3"></cg-amount>
                </div>
            </template>

            <template #flow_amount="{ row }">
                <div class="center">
                    <cg-amount :amount="row.flow_amount" :segmentation="true" suffix="K" :precision="3"></cg-amount>
                </div>
            </template>
            <template #finished_amount="{ row }">
                <div class="center">
                    <cg-amount :amount="row.finished_amount" :segmentation="true" suffix="K" :precision="3"></cg-amount>
                </div>
            </template>
            <template #unfinished_amount="{ row }">
                <div class="center">
                    <cg-amount :amount="row.unfinished_amount" :color="'red'" :segmentation="true" suffix="K"
                        :precision="3"></cg-amount>
                </div>
            </template>
        </CgTable>
    </div>
</template>

<script lang="ts">
export default {
    name: 'WithdrawDetail'
};
</script>
<style lang='scss' scoped>
.withdraw_detail {
    .tip {
        margin-left: 10px;
        font: var(--cg-font-text2);
        color: var(--cg-color-grey1);
    }

    .total_m {
        color: var(--cg-color-grey1);
        font: var(--cg-font-text4);
        margin-right: 4px;
    }

    :deep(.el-table) {
        td {
            >div {
                word-wrap: break-word;
                word-break: keep-all;
            }
        }

    }
}
</style>