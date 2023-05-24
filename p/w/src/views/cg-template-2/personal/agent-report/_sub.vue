<script setup lang='ts'>
import { ref, computed } from 'vue';
import {
    CgButton,
    CgEmpty,
    CgAmount,
    CgTime,
    CgTable,
    CgSelect,
    CgTimeSwitch,
    CgIcon,
    CgInput,
    CgStyleDate,
    type CgTableColumns,
} from '@/components/cg-template-2';
import { useVModel } from '@vueuse/core';
import PersonalTitle from '../components/personal-title/index.vue'
import { useRequest } from 'vue-request';
import { useOption } from '@/hooks/useOption';
import APIs from '@/http/blue-apis';
const props = defineProps<{
    dataList?: any,
    modelValue: boolean;
}>()
const emit = defineEmits(['update:modelValue']);
const isShow = useVModel(props, 'modelValue', emit);
const columns1 = ref<CgTableColumns[]>([
    {
        title: 'Tài Khoản Hội Viên',
        field: 'username',
        align: 'left'
    },
    {
        title: 'Đại Lý Cấp Trên',
        field: 'parent_name',
        align: 'left'
    },
    {
        title: 'Số Đơn Đặt Cược',
        field: 'bet_count',
        isSort: true
    },
    {
        title: 'Số Tiền Đặt Cược',
        field: 'bet_amount',
        isSort: true
    }
]);
const columns2 = ref<CgTableColumns[]>([
    {
        title: 'Tài Khoản Hội Viên',
        field: 'username',
        align: 'left'
    },
    {
        title: 'Đại Lý Cấp Trên',
        field: 'parent_name',
        align: 'left'
    },
    {
        title: 'Mã Tài Khoản Giới Thiệu',
        field: 'parent_name',
        isSort: true
    },
    {
        title: 'Thời Gian Đăng Ký',
        field: 'created_at',
        isSort: true
    }
]);
const columns3 = ref<CgTableColumns[]>([
    {
        title: 'Tài Khoản Hội Viên',
        field: 'username',
        align: 'left'
    },
    {
        title: 'Đại Lý Cấp Trên',
        field: 'parent_name',
        align: 'left'
    },
    {
        title: 'Số Tiền Nạp',
        field: 'first_deposit_amount',
        isSort: true
    },
    {
        title: 'Thời Gian Nạp Tiền',
        field: 'first_deposit_at',
        isSort: true
    }
]);
const columns4 = ref<CgTableColumns[]>([
    {
        title: 'Tài Khoản Hội Viên',
        field: 'username',
        align: 'left'
    },
    {
        title: 'Đại Lý Cấp Trên',
        field: 'parent_name',
        align: 'left'
    },
    {
        title: 'Số Hội Viên Cấp Dưới',
        field: 'mem_count',
        isSort: true
    }
]);
const columns5 = ref<CgTableColumns[]>([
    {
        title: 'Tài Khoản Hội Viên',
        field: 'username',
        align: 'left'
    },
    {
        title: 'Đại Lý Cấp Trên',
        field: 'parent_name',
        align: 'left'
    },
    {
        title: 'Số Đơn Đặt Cược',
        field: 'bet_count',
        isSort: true
    },
    {
        title: 'Số Tiền Đặt Cược',
        field: 'bet_amount',
        isSort: true
    }
]);
const columns6 = ref<CgTableColumns[]>([
    {
        title: 'Tài Khoản Hội Viên',
        field: 'username',
        align: 'left'
    },
    {
        title: 'Đại Lý Cấp Trên',
        field: 'parent_name',
        align: 'left'
    },
    {
        title: 'Số Đơn Đặt Cược',
        field: 'bet_count',
        isSort: true
    },
    {
        title: 'Số Tiền Trúng Thưởng',
        field: 'win_amount',
        isSort: true
    }
]);
const columns7 = ref<CgTableColumns[]>([
    {
        title: 'Tài Khoản Hội Viên',
        field: 'username',
        align: 'left'
    },
    {
        title: 'Đại Lý Cấp Trên',
        field: 'parent_name',
        align: 'left'
    },
    {
        title: 'Số Đơn Nạp Tiền',
        field: 'deposit_count',
        isSort: true
    },
    {
        title: 'Số Tiền Nạp',
        field: 'deposit_amount',
        isSort: true
    }
]);
const columns8 = ref<CgTableColumns[]>([
    {
        title: 'Tài Khoản Hội Viên',
        field: 'username',
        align: 'left'
    },
    {
        title: 'Đại Lý Cấp Trên',
        field: 'parent_name',
        align: 'left'
    },
    {
        title: 'Số Đơn Rút Tiền',
        field: 'withdrawal_count',
        isSort: true
    },
    {
        title: 'Số Tiền Rút',
        field: 'withdrawal_amount',
        isSort: true
    }
]);
const columns9 = ref<CgTableColumns[]>([
    {
        title: 'Tài Khoản Hội Viên',
        field: 'username',
        align: 'left'
    },
    {
        title: 'Đại Lý Cấp Trên',
        field: 'parent_name',
        align: 'left'
    },
    {
        title: 'Tiền Hoàn Trả',
        field: 'rebate_amount',
        isSort: true
    }
]);
const columns10 = ref<CgTableColumns[]>([
    {
        title: 'Tài Khoản Hội Viên',
        field: 'username',
        align: 'left'
    },
    {
        title: 'Đại Lý Cấp Trên',
        field: 'parent_name',
        align: 'left'
    },
    {
        title: 'Tiền Hoa Hồng',
        field: 'cg_rebate',
        isSort: true
    }
]);
const columns11 = ref<CgTableColumns[]>([
    {
        title: 'Tài Khoản Hội Viên',
        field: 'username',
        align: 'left'
    },
    {
        title: 'Đại Lý Cấp Trên',
        field: 'parent_name',
        align: 'left'
    },
    {
        title: 'Thắng Thua',
        field: 'company_net_amount',
        isSort: true
    }
]);
const columns13 = ref<CgTableColumns[]>([
    {
        title: 'Tài Khoản Hội Viên',
        field: 'username',
        align: 'left'
    },
    {
        title: 'Đại Lý Cấp Trên',
        field: 'parent_name',
        align: 'left'
    },
    {
        title: 'Số Dư',
        field: 'balance_total',
        isSort: true
    },
    {
        title: 'Thời Gian Đăng Nhập Gần Đây',
        field: 'last_login_at'
    }
]);
const columns14 = ref<CgTableColumns[]>([
    {
        title: 'Tài Khoản Hội Viên',
        field: 'username',
        align: 'left'
    },
    {
        title: 'Đại Lý Cấp Trên',
        field: 'parent_name',
        align: 'left'
    },
    {
        title: 'Lợi Nhuận',
        field: 'profit',
        isSort: true
    },
    {
        title: 'Thời Gian Đăng Nhập Gần Đây',
        field: 'last_login_at',
        align: 'left'
    }
]);
const columns274 = ref<CgTableColumns[]>([
    {
        title: 'Tài Khoản Hội Viên',
        field: 'username',
        align: 'left'
    },
    {
        title: 'Đại Lý Cấp Trên',
        field: 'parent_name',
        align: 'left'
    },
    {
        title: 'Tiền Khuyến Mại',
        field: 'amount',
        isSort: true
    },
    {
        title: 'Thời Gian Phát Thưởng',
        field: 'created_at',
        align: 'left'
    }
]);
const formData = ref({
    username: '',// 用户名
});

const curDate = ref({
    ty: props.dataList.tySub,
    start_time: props.dataList.start_time,
    end_time: props.dataList.end_time,
});

const tableFormData = computed(() => {
    return {
        // ty: props.dataList.tySub,
        flag: props.dataList.flag,
        ...formData.value,
        ...curDate.value,
    }
});
// 彩金：flag=274
const tableFormData2 = computed(() => {
    return {
        date_flag: curDate.value.ty,// props.dataList.tySub,
        flag: props.dataList.flag,
        ...formData.value,
        ...curDate.value,
    }
});
// 根据tableFormData.flag的值来判断columns的值
const columns = computed(() => {
    if (tableFormData.value.flag == 6) {
        return columns6.value
    } else if (tableFormData.value.flag == 7) {
        return columns7.value
    } else if (tableFormData.value.flag == 8) {
        return columns8.value
    } else if (tableFormData.value.flag == 1) {
        return columns1.value
    } else if (tableFormData.value.flag == 2) {
        return columns2.value
    } else if (tableFormData.value.flag == 3) {
        return columns3.value
    } else if (tableFormData.value.flag == 4) {
        return columns4.value
    } else if (tableFormData.value.flag == 9) {
        return columns9.value
    } else if (tableFormData.value.flag == 10) {
        return columns10.value
    } else if (tableFormData.value.flag == 11) {
        return columns11.value
    } else if (tableFormData.value.flag == 13) {
        return columns13.value
    } else if (tableFormData.value.flag == 14) {
        return columns14.value
    } else if (tableFormData.value.flag == 274) {
        return columns274.value
    }
    else {
        return columns5.value
    }
})
</script>
<template>
    <div class="sub" v-if="isShow">
        <personal-title title="Báo Biểu Đại Lý" description="" />
        <div class="flex ai-c" @click="isShow = false">
            <cg-icon width="12" name="i_back" />
            <span class="tip">{{ props.dataList.label }}</span>
        </div>
        <div class="search-header">
            <div class="flex-1 flex ai-c">
                <span class="select-label" v-if="tableFormData.flag != '13'">Thời Gian</span>
                <!-- <cg-time-switch v-model="tableFormData.ty" class="select-width mgr-25" v-if="tableFormData.flag != '13'" /> -->
                <cg-style-date v-model="curDate" topFix leftFix width="257" class="mgr-25"
                    v-if="tableFormData.flag != '13'" />
                <span class="select-label">Tài Khoản Hội Viên</span>
                <cg-input :clear="true" v-model="formData.username" placeholder="Vui lòng nhập tài khoản" class="select-width" />
            </div>
            <div class="search-button">
                <cg-button mini :width="110" :height="40" :font-size="15" @click="$refs.cgTable.getListData()">TÌM
                    KIẾM</cg-button>
            </div>
        </div>
        <CgTable ref="cgTable" v-if="tableFormData2.flag == '274'" :form-data="tableFormData2" :columns="columns"
            :list-api="APIs.getTradeDetail">
            <template #empty>
                <cg-empty bth-text="Đặt cược ngay">
                    <template #buttonText>
                        <cg-button small :width="160" :font-size="15" class="line-height">ĐẶT CƯỢC NGAY</cg-button>
                    </template>
                </cg-empty>
            </template>
            <template #amount="{ row }">
                <cg-amount :amount="row.amount" :segmentation="true" suffix="K" padding="0" :precision="2"></cg-amount>
            </template>
            <template #created_at="{ row }">
                <cg-time :time="row.created_at" :align="'center'" />
            </template>
        </CgTable>
        <CgTable ref="cgTable" v-else :form-data="tableFormData" :columns="columns" :list-api="APIs.getAgencySub">
            <template #empty>
                <cg-empty bth-text="Đặt cược ngay">
                    <template #buttonText>
                        <cg-button small :width="160" :font-size="15" class="line-height">ĐẶT CƯỢC NGAY</cg-button>
                    </template>
                </cg-empty>
            </template>
            <template #bet_amount="{ row }" v-if="tableFormData.flag == '5'">
                <div class="center">
                    <cg-amount :amount="row.bet_amount" :segmentation="true" suffix="K" padding="0"
                        :precision="2"></cg-amount>
                </div>
            </template>
            <template #win_amount="{ row }" v-if="tableFormData.flag == '6'">
                <div class="center">
                    <cg-amount :amount="row.win_amount" :segmentation="true" suffix="K" padding="0"
                        :precision="2"></cg-amount>
                </div>
            </template>
            <template #deposit_amount="{ row }" v-if="tableFormData.flag == '7'">
                <div class="center">
                    <cg-amount :amount="row.deposit_amount" :segmentation="true" suffix="K" padding="0"
                        :precision="2"></cg-amount>
                </div>
            </template>
            <template #withdrawal_amount="{ row }" v-if="tableFormData.flag == '8'">
                <div class="center">
                    <cg-amount :amount="row.withdrawal_amount" :segmentation="true" suffix="K" padding="0"
                        :precision="2"></cg-amount>
                </div>
            </template>
            <template #bet_amount="{ row }" v-if="tableFormData.flag == '1'">
                <div class="center">
                    <cg-amount :amount="row.bet_amount" :segmentation="true" suffix="K" padding="0"
                        :precision="2"></cg-amount>
                </div>
            </template>
            <template #first_deposit_amount="{ row }" v-if="tableFormData.flag == '3'">
                <cg-amount :amount="row.first_deposit_amount" :segmentation="true" suffix="K" padding="0"
                    :precision="2"></cg-amount>
            </template>
            <template #first_deposit_at="{ row }" v-if="tableFormData.flag == '3'">
                <cg-time :time="row.first_deposit_at" :align="'center'" />
            </template>
            <template #created_at="{ row }" v-if="tableFormData.flag == '2'">
                <cg-time :time="row.created_at" :align="'center'" />
            </template>
            <template #rebate_amount="{ row }" v-if="tableFormData.flag == '9'">
                <cg-amount :amount="row.rebate_amount" :segmentation="true" suffix="K" padding="0"
                    :precision="2"></cg-amount>
            </template>
            <template #cg_rebate="{ row }" v-if="tableFormData.flag == '10'">
                <cg-amount :amount="row.cg_rebate" :segmentation="true" suffix="K" padding="0" :precision="2"></cg-amount>
            </template>
            <template #company_net_amount="{ row }" v-if="tableFormData.flag == '11'">
                <cg-amount :amount="row.company_net_amount" :segmentation="true" suffix="K" padding="0"
                    :precision="2"></cg-amount>
            </template>
            <template #balance_total="{ row }" v-if="tableFormData.flag == '13'">
                <cg-amount :amount="row.balance_total" :segmentation="true" suffix="K" padding="0"
                    :precision="2"></cg-amount>
            </template>
            <template #last_login_at="{ row }" v-if="tableFormData.flag == '13'">
                <cg-time :time="row.last_login_at" :align="'center'" />
            </template>
            <template #profit="{ row }" v-if="tableFormData.flag == '14'">
                <cg-amount :amount="row.profit" :segmentation="true" suffix="K" padding="0" :precision="2"></cg-amount>
            </template>
            <template #last_login_at="{ row }" v-if="tableFormData.flag == '14'">
                <cg-time :time="row.last_login_at" :align="'center'" />
            </template>

        </CgTable>
    </div>
</template>
<script lang='ts'>
export default {
    name: 'TradeMinutiae'
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
    width: 257px;
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
</style>