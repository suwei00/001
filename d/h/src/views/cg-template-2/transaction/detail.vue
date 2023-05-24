<script setup lang='ts'>
import { ref, nextTick } from 'vue';
import APIs from '@/http/blue-apis';
import { CgHeader, CgContainer, CgDivider, CgAmount, CgIcon, CgTime } from '@/components/cg-template-2';
import { useOption } from '@/hooks/useOption';
import { colorFilter } from '@/utils/format';
import { useRouter } from 'vue-router'
import { newCopy } from '@/utils/common';
import { Toast } from 'vant';

const router = useRouter();
const { transform: flagTransform } = useOption('flagList');
const { transform: stateFlagTransform } = useOption('stateFlag');
const { transform: walletNameTransform } = useOption(APIs.getVenueWalletList, 'wallet_name', 'id', ['game_type'])
const { option: depositChannelOption, transform: depositChannelOptionTransform } = useOption(async () => {
  return APIs.getTradeChannel().then(res => {
    const arr = res.map((k: any) => {
      return { label: k.name, value: k.id + '' };
    });
    arr.unshift({ label: 'Toàn Bộ', value: '0' });
    return arr;
  });
});
const dataList = ref(
    {
        id: router.currentRoute.value.query.id,
        flag: router.currentRoute.value.query.flag,
        amount: router.currentRoute.value.query.amount,
        bill_no: router.currentRoute.value.query.bill_no,
        created_at: router.currentRoute.value.query.created_at,
        state: router.currentRoute.value.query.state,
        remark: router.currentRoute.value.query.remark,
        platform_id: router.currentRoute.value.query.platform_id,
        channel_id: router.currentRoute.value.query.channel_id,
    });
const handleCopy = (v: string) => {
    newCopy(v);
    Toast('Sao Chép Thành Công');
};
</script>
<template>
    <div class='transcation'>
        <CgHeader>
            LỊCH SỬ GIAO DỊCH
        </CgHeader>
        <div class="container">
            <cg-container :is-shadow="true" :padding="'20'">
                <div class="amount">
                    <cg-amount :amount="dataList.amount" :suffix="'K'" :color="'blue1'" :size="'48'" :weight="700"
                        :precision="(dataList.flag == '276' || dataList.flag == '275') ? 2 : 0" :segmentation="true" />
                </div>
                <cg-divider :color="'var(--cg-color-blue11)'" />
                <div class="list first">
                    <div>Loại Giao Dịch</div>
                    <div class="flex-1">{{ flagTransform(dataList.flag) }}</div>
                </div>
                <div class="list" v-if="dataList.flag == '273'">
                    <!-- 转入账户 -->
                    <div>Chuyển Ra Tài Khoản</div>
                    <div class="flex-1">
                        <div v-if="[181, 183, 185].includes(dataList.state)">
                            <span>{{ walletNameTransform(dataList.platform_id) }}</span>
                        </div>
                        <div v-else>
                            <span>Ví Tiền Chính</span>
                        </div>
                    </div>
                </div>
                <div class="list" v-if="dataList.flag == '273'">
                    <!-- 转出账户 -->
                    <div>Chuyển Vào Tài Khoản</div>
                    <div class="flex-1">
                        <div v-if="[181, 183, 185].includes(dataList.state)">
                            <span>Ví Tiền Chính</span>
                        </div>
                        <div v-else>
                            <span>{{ walletNameTransform(dataList.platform_id) }}</span>
                        </div>
                    </div>
                </div>
                <div class="list">
                    <div>Mã Giao Dịch</div>
                    <div class="flex-1 flex ai-c">
                        <span class="flex-1">{{ dataList.bill_no }}</span>&nbsp;
                        <cg-icon name="i_copy" :width="36" @click="handleCopy(dataList.bill_no)" />
                    </div>
                </div>
                <div v-if="dataList.flag == '271'" class="list">
                    <div>Phương Thức Nạp Tiền</div>
                    <div class="flex-1 flex ai-c">
                      <div class="flex-1">{{ depositChannelOptionTransform(dataList.channel_id) }}</div>
                    </div>
                </div>
                <div class="list">
                    <div>Thời Gian</div>
                    <div class="flex-1"><cg-time :time="+dataList.created_at" :size="'var(--cg-font-24)'" :align="'right'" />
                    </div>
                </div>
                <div class="list">
                    <div>Trạng Thái</div>
                    <div class="flex-1" :style="{ color: colorFilter(Number(dataList.state)) }">
                        {{ stateFlagTransform(dataList.state) }}
                    </div>
                </div>
                <div class="list last">
                    <div>Ghi Chú</div>
                    <div class="flex-1" v-html="dataList.remark"></div>
                </div>
            </cg-container>
            <p class="tips">Cần giúp đỡ, vui lòng liên hệ <span @click="router.push('/customer-service')">CSKH</span> giải
                quyết</p>
        </div>
    </div>
</template>
<script lang='ts'>
export default {
    name: 'TransactionDetail'
}
</script>

<style lang='scss' scoped>
.container {
    padding: 24px 32px;
}

.amount {
    text-align: center;
    line-height: 1;
    padding-bottom: 20px;
}

.list {
    display: flex;
    font: var(--cg-font-text3);
    align-items: center;

    .flex-1 {
        text-align: right;
    }

    >div {
        line-height: 44px;
    }

    img {
        background: transparent;
    }
}

.first {
    margin-top: 10px
}

.last {
    width: 100%;
    margin-bottom: -10px;
    justify-content: space-between;
    align-items: flex-start;
    .flex-1 {
      max-width: 60%;
    }
}

.tips {
    font: var(--cg-font-text5);
    text-align: center;
    margin-top: 32px;

    span {
        color: var(--cg-color-blue1);
        text-decoration: underline;
    }
}
</style>