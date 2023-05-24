<script setup lang='ts'>
import { ref } from 'vue';
import {
    CgAmount,
    CgContainer,
    CgHeader,
    CgSelect,
    CgTimeSelect
} from '@/components/cg-template-2';
import { getReportSubPlat } from '@/http/blue-apis';
import { useRouter } from 'vue-router'
import { useOption } from '@/hooks/useOption';
import { useLoading } from '@/hooks/useLoading';
import { useTimeSelect } from '@/hooks/useTimeSelect'
import { transformTimeFormData } from '@/utils/common';

const typeName = 'ty';
const { startLoading, closeLoading } = useLoading();
const router = useRouter();
const { timeForm, timeChange, rightBtnClick } = useTimeSelect(typeName, router.currentRoute.value.query.ty);
const { option: timeFlag } = useOption('timeFlag');
const formData = ref({
    username: router.currentRoute.value.query.username,// 用户名
});
const dataList = ref({});
const getList = () => {
    startLoading();
    formData.value = {
        username: formData.value.username,
        ...transformTimeFormData(timeForm, 'ty')
    };
    console.error(formData.value);
    getReportSubPlat(formData.value as any).then((res: any) => {
        if (res.d) {
            dataList.value = res.d;
        }
        closeLoading();
    }).catch(() => {
        closeLoading();
    });
};
getList();
const onSearch = (data: any) => {
    rightBtnClick()
    getList();
}
</script>
<template>
    <div class="sub">
        <CgHeader>
            CHI TIẾT THẮNG THUA
            <template #actions>
                <div class="time">
                    <cg-select rowKey="value" :key="timeForm[typeName]" showLabelKey="label" type="view" :data="timeFlag"
                        v-model="timeForm[typeName]" class="time-width" selectLeftText="HỦY BỎ" selectRightText="XÁC NHẬN"
                        @on-ok="onSearch">
                        <template #content>
                            <div style="width: 100%">
                                <CgTimeSelect v-model:type="timeForm[typeName]" v-model:start_time="timeForm.start_time"
                                    v-model:end_time="timeForm.end_time" @change="timeChange" />
                            </div>
                        </template>
                    </cg-select>
                </div>
            </template>

        </CgHeader>
        <div class="list-container">
            <div class="list-itme" v-for="item in dataList" :key="item">
                <cg-container>
                    <div class="amount">
                        {{ item.name }}
                    </div>
                    <div class="label">
                        <cg-amount :amount="item.amount || '0'" :segmentation="true" suffix="K" :size="26" :color="'black1'"
                            :weight="700" :precision="2"></cg-amount>
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

    >.list-itme:nth-of-type(even) {
        :deep(.cg-container) {
            background: transparent !important;
        }
    }
}

.list-itme {
    width: 214px;
    height: 134px;

    .amount {
        font: var(--cg-font-text7);
        color: var(--cg-color-blue1);
        text-align: center;
    }

    .label {
        margin-top: 12px;
        text-align: center;
    }

    .cg-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}

.time {
    width: 145px;
    text-align: right;
    // 超出隐藏
    overflow: hidden;
    white-space: nowrap;

    :deep(.cg-select) {
        .down {
            margin-right: 0;
            margin-left: 0;
        }

        .view_title {
            position: relative;
            padding-right: 20px;
            justify-content: flex-start !important;

            img {
                position: absolute;
                right: -8px;
                background-color: var(--cg-color-blue16);
            }
        }

        .view_title {
            justify-content: end;
        }
    }
}
</style>