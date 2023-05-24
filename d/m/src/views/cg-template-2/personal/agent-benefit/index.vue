<script setup lang="ts">
import { ref, reactive, computed, toRef, watchEffect } from 'vue';
import { CgAmount, CgDivider, CgIcon, CgProgress, CgButton, CgContainer } from '@/components/cg-template-2';
import PersonalTitle from '../components/personal-title/index.vue';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { storeToRefs } from 'pinia';
import { floor } from 'lodash';
import { multiply } from 'cg-utils';
import { useRouter } from "vue-router";
import { APIs } from '@/http';
import { getVipConfigList } from '@/http/APIs';




const userInfoStore = userInfoStateStore();
const { userInfo, letterCount } = storeToRefs(userInfoStore);
const formattedrate = computed(() => {
    if (userInfo.value.level === 10) {
        return 1;
    }
    if (Number(userInfo.value.now) > 0 && Number(userInfo.value.next) > 0) {
        const currate = floor(userInfo.value.now / userInfo.value.next, 2);
        return currate >= 1 ? 1 : currate;
    }
    return 0;
});
const refreshOrDetail = () => {
    console.log('刷新或者查看金额');
};
const router = useRouter()
const showLoginpwd = (val: string) => {
    if (val == 'na') {
        router.push('/personal/deposit')
    } else if (val == 'tr') {
        router.push('/')
    }
};
const dataList = ref<any>([])
const getMemberAgentList = () => {
    APIs.getVipConfigList({}).then((res: any) => {
        if (res) {
            dataList.value = res.data;
        }
    })
}
getMemberAgentList()



</script>
<template>
    <div class="personal-benefit">
        <PersonalTitle title="ĐẶC QUYỀN VIP"></PersonalTitle>
        <div class="benfit-main">
            <div class="main-left">
                <div class="mainleft-top">
                    <div class="top-content">
                        <span v-if="userInfo.level >= 10">Chúc Mừng Bạn Đã Thăng Cấp Cao Nhất!</span>
                        <span v-else-if="formattedrate >= 1">Chúc Mừng Bạn Đã Thăng Cấp (Tự Động Sau 02:00 Giờ)</span>
                        <span v-else>Số Tiền Cần Nạp Để Thăng Cấp</span>
                        <span class="money-tip" v-if="userInfo.level < 10 && formattedrate < 1">
                            <cg-amount size="15" weight="700" :amount="userInfo.now" :isClick="true" :segmentation="false"
                                @callBack="refreshOrDetail" suffix="K" padding="0" :precision="0"></cg-amount>
                            <span class="line">/</span>
                            <cg-amount size="15" weight="700" :amount="userInfo.next" :isClick="true" :segmentation="false"
                                @callBack="refreshOrDetail" suffix="K" padding="0" :precision="0"></cg-amount>
                        </span>
                    </div>
                    <div>
                        <span class="vip-score">{{ multiply(formattedrate, 100) }}%</span>
                    </div>
                </div>
                <cg-divider color="--cg-color-blue8" />
                <div class="mainleft-bom">
                    <cg-icon :name="`i_vip${userInfo.level || 1}`" width="56" />
                    <div class="progress-box">
                        <cg-progress height="16" :rate="(formattedrate * 1000) / 10" position="none"
                            :round="false"></cg-progress>
                    </div>
                    <cg-icon v-if="userInfo.level < 10"
                        :name="`i_vip${userInfo.next_level > 0 ? userInfo.next_level : userInfo.level + 1}`" width="56"
                        :style="`filter: opacity(${0.3 + formattedrate * 0.7});margin-left:16px`" />
                </div>

            </div>
            <div class="main-right">
                <cg-button whiteStyle width="180" height="38" @click="$event => showLoginpwd('na')">NẠP TIỀN
                    NGAY</cg-button>
                <cg-button width="180" height="38" @click="$event => showLoginpwd('tr')">TRỞ VỀ ĐẶT CƯỢC</cg-button>

            </div>
        </div>
        <cg-divider :margin="'26px 0 24px 0'" />
        <div class="benfit-bom">
            <CgContainer padding="0">
                <template #content>
                    <div class="container-row">
                        <el-row class="title-container">
                            <el-col :span="6">
                                <div class="text-title">CẤP VIP </div>
                                <cg-divider :color="'--cg-color-blue8'" />
                            </el-col>
                            <el-col :span="6">
                                <div class="text-title flex">
                                    <cg-divider :color="'--cg-color-blue8'" :direction="'vertical'" />
                                    <div class="flex-1">MỨC TIỀN NẠP</div>
                                </div>
                                <cg-divider :color="'--cg-color-blue8'" />
                            </el-col>
                            <el-col :span="6">
                                <div class="text-title flex">
                                    <cg-divider :color="'--cg-color-blue8'" :direction="'vertical'" />
                                    <div class="flex-1">PHẦN THƯỞNG THĂNG CẤP</div>
                                </div>
                                <cg-divider :color="'--cg-color-blue8'" />
                            </el-col>
                            <el-col :span="6">
                                <div class="text-title flex">
                                    <cg-divider :color="'--cg-color-blue8'" :direction="'vertical'" />
                                    <div class="flex-1">KHUYẾN MÃI SINH NHẬT</div>
                                </div>
                                <cg-divider :color="'--cg-color-blue8'" />
                            </el-col>

                        </el-row>
                        <el-row v-for="item in dataList">
                            <el-col :span="6">
                                <div class="text">VIP{{ item.level }}</div>
                            </el-col>
                            <el-col :span="6">
                                <div class="text flex">
                                    <cg-divider :color="'--cg-color-blue8'" :direction="'vertical'" />
                                    <div class="flex-1">
                                        <cg-amount :amount="item.upgrade_deposit" :weight="400" :segmentation="true"
                                            suffix="K"></cg-amount>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="text flex">
                                    <cg-divider :color="'--cg-color-blue8'" :direction="'vertical'" />
                                    <div class="flex-1">
                                        <cg-amount :amount="item.upgrade_gift" :weight="400" :segmentation="true"
                                            suffix="K"></cg-amount>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="text flex">
                                    <cg-divider :color="'--cg-color-blue8'" :direction="'vertical'" />
                                    <div class="flex-1">
                                        <cg-amount :amount="item.birth_gift" :weight="400" :segmentation="true"
                                            suffix="K"></cg-amount>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </template>
            </CgContainer>
        </div>

    </div>
</template>
<script lang='ts'>
export default {
    name: 'AgentBenefit'
}
</script>

<style lang='scss' scoped>
.personal-benefit {
    .benfit-main {
        display: flex;
        justify-content: space-between;
        margin-bottom: 26px;
        height: 88px;

        .main-left {
            width: 80%;
            background: linear-gradient(180deg, #FFFFFF 0%, #DEEEFB 100%);
            box-shadow: 0px 6px 12px rgba(190, 215, 239, 0.6);
            border-radius: 8px;
            margin-right: 10px;
            box-sizing: border-box;
            padding: 14px 20px 16px 21px;
            border: 2px solid transparent;
            background-clip: padding-box, border-box;
            background-origin: padding-box, border-box;
            background-image: linear-gradient(to right, #fff, #fff), linear-gradient(180deg, #61CEFF, #1B75F0);
        }

        .mainleft-top {
            display: flex;
            justify-content: space-between;
            padding-bottom: 13px;
            height: 30px;

            .top-content {
                color: var(--cg-color-grey1);

                .money-tip {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2px 0 4px 4px;
                    z-index: 1000;

                    .line {
                        font: var(--cg-font-text1);
                        color: var(--cg-color-blue5);
                        display: inline-block;
                        padding: 0 6px;
                    }

                    :deep(.cg_amount) {

                        .pointer,
                        .underline {
                            text-decoration: none;
                            border: 0;
                        }
                    }
                }

            }

            .vip-score {
                color: var(--cg-color-blue12);
                font: var(--cg-font-text1);

            }
        }

        .mainleft-bom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 11px;
            height: 28px;

            .progress-box {
                flex: 1;
                margin-left: 16px;

                :deep(.cg-progress-item) {
                    width: 100% !important;
                }
            }
        }
    }

    .main-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
}

.benfit-bom {
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

    .container-row {
        .el-row:nth-child(odd) {
            background: var(--cg-color-blue18);
        }
    }

    .title-container {
        background-color: var(--cg-color-white5) !important;
    }
}
</style>