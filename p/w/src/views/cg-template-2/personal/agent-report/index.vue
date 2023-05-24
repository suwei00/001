<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { CgButton, CgAmount, CgTime, CgSelect, CgTimeSwitch, CgInput, CgContainer, CgDivider, CgBreadcrumb, CgIcon, CgContainerHead, CgStyleDate } from '@/components/cg-template-2';
import PersonalTitle from '../components/personal-title/index.vue';
import { useOption } from '@/hooks/useOption';
import { getMyProfit } from '@/http/blue-apis';
import { useRouter } from 'vue-router';
import { useLoading } from '@/hooks/useLoading';

const router = useRouter();
const { startLoading, closeLoading } = useLoading();

const agentList = ref([
  { label: 'SỐ TIỀN ĐẶT CƯỢC', value: 0, field: 'bet_amount', des: '投注金额', title: '', flag: '5' },
  { label: 'SỐ TIỀN TRÚNG THƯỞNG', value: 0, field: 'win_amount', des: '中奖金额', flag: '6' },
  { label: 'SỐ TIỀN NẠP', value: 0, field: 'deposit', des: '存款金额', flag: '7' },
  { label: 'SỐ TIỀN RÚT', value: 0, field: 'withdraw', des: '提现金额', flag: '8' },
  { label: 'SỐ NGƯỜI ĐẶT CƯỢC', value: 0, field: 'bet_mem_count', des: '投注人数', suffix: '', flag: '1' },
  { label: 'SỐ NGƯỜI NẠP ĐẦU', value: 0, field: 'first_deposit_count', des: '首存人数', suffix: '', flag: '3' },
  { label: 'SỐ NGƯỜI ĐĂNG KÝ', value: 0, field: 'regist_count', des: '注册人数', suffix: '', flag: '2' },
  { label: 'SỐ HỘI VIÊN CẤP DƯỚI', value: 0, field: 'mem_count', des: '下级人数', suffix: '', flag: '4' },
  // { label: 'HOÀN TRẢ ĐẠI LÝ', value: 0, field: 'rebate', des: '代理返水' },
  { label: 'HOÀN TRẢ TỔ ĐỘI', value: 0, field: 'team_rebate', des: '团队返水', flag: '9' },
  { label: 'HOA HỒNG TỔ ĐỘI', value: 0, field: 'cg_rebate', des: '团队返点', flag: '10' },
  { label: 'THẮNG THUA', value: 0, field: 'net_amount', des: '输赢', flag: '11' },
  { label: 'TIỀN KHUYẾN MÃI', value: 0, field: 'dividend_amount', des: '彩金', flag: '274' },
  { label: 'SỐ DƯ TỔ ĐỘI', value: 0, field: 'balance_total', des: '团队余额', flag: '13' },
  { label: 'LỢI NHUẬN RÒNG', value: 0, field: 'profit', des: '盈利', flag: '14' }
]);
const show = ref('0'); // 展示状态
const formData = ref<any>({
  username: '', // 代理账号
  ty: '1' // 时间
});

const curDate = ref({
  ty: '1'
});

const getList = () => {
  startLoading();
  getMyProfit({ ...formData.value, ...curDate.value })
    .then((res: any) => {
      if (res.names && show.value == '1') {
        nameList.value = res.names;
      } else {
        nameList.value = [];
      }
      agentList.value.forEach((item: any) => {
        item.value = res[item.field];
      });
      closeLoading();
    })
    .catch(() => {
      closeLoading();
    });
};
// 展示状态
const { option: isShowFlag } = useOption('isShowFlag');
const onSearch = () => {
  currentName.value = formData.value.username;
  getList();
};

onMounted(() => {
  getList();
});

const currentName = ref('');
const nameList = ref<string[]>([]); //用户名列表
const dataList = ref({});
const goToSub = (item: any) => {
  dataList.value = {
    ...item,
    tySub: curDate.value.ty, // formData.value.ty,
    username: formData.value.username,
    ...curDate.value
  };
  router.push({
    path: `/personal/agent-report/sub`,
    query: {
      ...dataList.value
    }
  });
};
const selectUsername = () => {
  formData.value.username = currentName.value;
  getList();
};
</script>
<template>
  <router-view v-slot="{ Component }">
    <template v-if="Component">
      <component :is="Component" />
    </template>
    <template v-else>
      <div class="agent-record">
        <personal-title title="Báo Biểu Đại Lý" description="" />
        <div class="search-header">
          <div class="flex-middle">
            <span class="select-label">Thời Gian</span>
            <!-- <cg-time-switch v-model="formData.ty" class="time-width" /> -->
            <cg-style-date v-model="curDate" leftFix topFix class="time-width" width="130" @change="onSearch()" />
            <span class="select-label mgl-23">Đại Lý</span>
            <cg-select v-model="show" :placeholder="$t('p_choose')" :options="isShowFlag" class="select-width" @change="onSearch()" />
            <span class="select-label mgl-23">Tài Khoản<br />Hội Viên</span>
            <cg-input v-model.lowercase="formData.username" placeholder="Vui lòng nhập tài khoản" :clear="true" class="input-width" />
          </div>
          <div class="search-button">
            <cg-button mini :width="110" :height="40" :font-size="15" @click="onSearch()">TÌM KIẾM</cg-button>
          </div>
        </div>
        <div class="list-container">
          <CgContainer type="smallContainer" padding="" radius="12" v-for="item in agentList">
            <template #content>
              <div class="list-item">
                <div class="amount">
                  <span v-if="item.field == 'bet_mem_count' || item.field == 'first_deposit_count' || item.field == 'regist_count' || item.field == 'mem_count'">{{ item.value }}</span>

                  <cg-amount
                    :amount="item.value"
                    :segmentation="true"
                    suffix="K"
                    :size="17"
                    :color="'var(--cg-color-grey1)'"
                    :weight="700"
                    :precision="0"
                    v-else-if="item.field == 'dividend_amount' || item.field == 'balance_total' || item.field == 'deposit' || item.field == 'withdraw'"
                  ></cg-amount>
                  <cg-amount :amount="item.value" :segmentation="true" suffix="K" :size="17" :color="'var(--cg-color-grey1)'" :weight="700" :precision="2" v-else></cg-amount>
                </div>
                <cg-container-head :bg="'--cg-gradient-blue1-button'" :height="'35'" class="crs-p" @click="goToSub(item)">
                  <template #center>
                    <span class="jump-txt">{{ item.label }}</span>
                  </template>
                </cg-container-head>
              </div>
            </template>
          </CgContainer>
        </div>
        <div v-if="nameList.length > 0">
          <div class="empty"></div>
          <cg-divider :color="'--cg-color-blue8'" />
          <div class="empty"></div>
          <CgContainer type="smallContainer" padding="" radius="12">
            <template #content>
              <p class="bread-tips">Quan Hệ Đại Lý</p>
              <cg-divider :color="'--cg-color-blue8'" />
              <div class="bread-container">
                <cg-icon width="30" name="i_agent" />：
                <CgBreadcrumb v-model="currentName" v-if="nameList.length" :list="nameList" @click="selectUsername()" />
              </div>
            </template>
          </CgContainer>
        </div>
      </div>
    </template>
  </router-view>
</template>
<script lang="ts">
export default {
  name: 'AgentReport'
};
</script>

<style lang="scss" scoped>
.list-container {
  display: flex;
  flex-wrap: wrap;
  gap: 19px;

  .list-item {
    width: 203px;
    height: 84px;
  }

  ::v-deep(.pub_small_container) {
    overflow: hidden;
  }

  .amount {
    font: var(--cg-font-text2);
    height: 49px;
    line-height: 49px;
    color: var(--cg-color-grey1);
    text-align: center;
  }

  .jump-txt {
    text-align: center;
    font: var(--cg-font-text5);
    color: var(--cg-color-blue12);
    //text-decoration: underline;
    border-bottom: 1px solid var(--cg-color-blue12);
    cursor: pointer;
  }
}

.empty {
  height: 24px;
}

.p-label {
  display: flex;
}

.search-header {
  display: flex;
  margin-bottom: 23px;
  margin-top: 16px;
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
  width: 155px !important;
  display: inline-block;
}

.input-width {
  width: 190px !important;
  display: inline-block;
}

.time-width {
  width: 155px;
}

.mgl-23 {
  margin-left: 23px;
}
</style>
