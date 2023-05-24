<script setup lang='ts'>
import { ref } from 'vue';
import { CgHeader, CgSelect, CgField, CgContainer, CgContainerHead, CgAmount, CgFold, CgBreadcrumb, CgTimeSelect } from '@/components/cg-template-2';
import { useOption } from '@/hooks/useOption';
import { getMyProfit } from '@/http/blue-apis';
import { useRouter } from 'vue-router'
import { useLoading } from '@/hooks/useLoading';
import { useTimeSelect } from '@/hooks/useTimeSelect'
import { transformTimeFormData } from '@/utils/common';

const typeName = 'ty';
const { startLoading, closeLoading } = useLoading();
const { timeForm, timeChange, rightBtnClick } = useTimeSelect(typeName);
const router = useRouter();
const formData = ref({
  username: '',// 代理账号
  ty: '1'// 时间
});
const agentList = ref([
  { label: 'SỐ TIỀN ĐẶT CƯỢC', value: 0, field: 'bet_amount', des: '投注金额', title: '', flag: '5' },
  { label: 'SỐ TIỀN TRÚNG\nTHƯỞNG', value: 0, field: 'win_amount', des: '中奖金额', flag: '6' },
  { label: 'SỐ TIỀN NẠP', value: 0, field: 'deposit', des: '存款金额', flag: '7' },
  { label: 'SỐ TIỀN RÚT', value: 0, field: 'withdraw', des: '提现金额', flag: '8' },
  { label: 'SỐ NGƯỜI ĐẶT CƯỢC', value: 0, field: 'bet_mem_count', des: '投注人数', suffix: '', flag: '1' },
  { label: 'SỐ NGƯỜI NẠP ĐẦU', value: 0, field: 'first_deposit_count', des: '首存人数', suffix: '', flag: '3' },
  { label: 'SỐ NGƯỜI ĐĂNG KÝ', value: 0, field: 'regist_count', des: '注册人数', suffix: '', flag: '2' },
  { label: 'SỐ HỘI VIÊN\nCẤP DƯỚI', value: 0, field: 'mem_count', des: '下级人数', suffix: '', flag: '4' },
  { label: 'HOÀN TRẢ TỔ ĐỘI', value: 0, field: 'team_rebate', des: '团队返水', flag: '9' },
  { label: 'HOA HỒNG TỔ ĐỘI', value: 0, field: 'cg_rebate', des: '团队返点', flag: '10' },
  { label: 'THẮNG THUA', value: 0, field: 'net_amount', des: '输赢', flag: '11' },
  { label: 'TIỀN KHUYẾN MÃI', value: 0, field: 'dividend_amount', des: '彩金', flag: '274' },
  { label: 'SỐ DƯ TỔ ĐỘI', value: 0, field: 'balance_total', des: '团队余额', flag: '13' },
  { label: 'LỢI NHUẬN RÒNG', value: 0, field: 'profit', des: '盈利', flag: '14' }
]);
const { option: timeFlag } = useOption('timeFlag');
const names = ref<string[]>([]);//用户名列表
const currentName = ref('');
const isOpen = ref(false);
const getList = () => {
  startLoading();
  formData.value = {
    username: formData.value.username,
    ...transformTimeFormData(timeForm, 'ty')
  };
  getMyProfit(formData.value).then((res: any) => {
    names.value = res.names || [];
    agentList.value.forEach((item: any) => {
      item.value = res[item.field];
    });
    closeLoading();
  }).catch(() => {
    closeLoading();
  });
};
const onSearch = () => {
  getList();
};
getList();
const dataList = ref({});

const objToSearch = (obj: any) => {
  const params = new URLSearchParams(obj);
  return params.toString();
};

const goToSub = (item: any) => {
  dataList.value = {
    ...item,
    tySub: timeForm[typeName],
    username: formData.value.username
  };

  router.push({
    path: `/agent_report/sub/${objToSearch(dataList.value)}`,
  });
};
const changeCurrentName = (name: string) => {
  formData.value.username = name;
  getList();
}

const onSearchRight = (data: any) => {
    rightBtnClick()
    getList();
}
</script>
<template>
  <router-view v-slot="{ Component }">
    <template v-if="Component">
      <component :is="Component" />
    </template>
    <template v-else>
      <div class='agent_report sub'>
        <CgHeader>
          BÁO BIỂU ĐẠI LÝ
        </CgHeader>
        <div class="input-container">
          <div class="time">
            <cg-select rowKey="value" :key="timeForm[typeName]" showLabelKey="label" :data="timeFlag"
              v-model="timeForm[typeName]" placeholder="" selectLeftText="HỦY BỎ" selectRightText="XÁC NHẬN"
              @on-ok="onSearchRight">
              <template #content>
                <div style="width: 100%">
                  <CgTimeSelect v-model:type="timeForm[typeName]" v-model:start_time="timeForm.start_time"
                    v-model:end_time="timeForm.end_time" @change="timeChange" />
                </div>
              </template>
            </cg-select>
          </div>
          <div class="username">
            <cg-field rightText="TÌM KIẾM" v-model.lowercase="formData.username" type="text" @butClick="onSearch" :clear="true" maxlength="14"
              placeholder="Vui lòng nhập tài khoản">
            </cg-field>
          </div>
        </div>
        <app-image src="/bg_line.png" class="bg_line" />
        <div class="list-container">
          <div class="list-itme" v-for="item in agentList" @click="goToSub(item)">
            <cg-container>
              <div class="amount">
                <span
                  v-if="item.field == 'bet_mem_count' || item.field == 'first_deposit_count' || item.field == 'regist_count' || item.field == 'mem_count'">{{
                    item.value }}</span>
                <cg-amount :amount="item.value" :segmentation="true" suffix="K" :size="26" :color="'blue1'" :weight="700"
                  :precision="0"
                  v-else-if="item.field == 'dividend_amount' || item.field == 'balance_total' || item.field == 'deposit' || item.field == 'withdraw'"></cg-amount>
                <cg-amount :amount="item.value" :segmentation="true" suffix="K" :size="26" :color="'blue1'" :weight="700"
                  :precision="2" v-else></cg-amount>
              </div>
              <div class="label">
                <cg-container-head :bg="'--cg-gradient-blue1-button'" :height="'80'" :padding="'0'">
                  <template #center>
                    <span class="jump-txt">{{ item.label }}</span>
                  </template>
                </cg-container-head>
              </div>
            </cg-container>
          </div>
        </div>
        <div class="empty"></div>
        <div v-if="names?.length">
          <CgFold v-model="isOpen" open-text="Hiển Thị Quan Hệ Đại Lý" close-text="Ẩn Quan Hệ Đại Lý">
            <CgBreadcrumb @update:modelValue="changeCurrentName" :list="names" />
          </CgFold>
          <div class="empty"></div>
        </div>
      </div>
    </template>
  </router-view>
</template>
<script lang='ts'>
export default {
  name: 'AgentReport'
}
</script>

<style lang='scss' scoped>
.agent_report {
  padding: 24px 32px;

  :deep(.van-cell) {
    padding-right: 0;
  }

  .bg_line {
    width: 100%;
    margin-top: 24px;
  }
}



.input-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .time {
    width: 218px;
  }

  .username {
    flex: 1;
    margin-left: 20px;
  }
}

:deep(.sheet_item) {
  text-align: center;

  >div {
    width: 100%;
  }
}

.list-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 22px;
  margin-top: 18px;
}

.list-itme {
  width: 213px;
  height: 150px;

  .amount {
    font: var(--cg-font-text7);
    color: var(--cg-color-blue1);
    line-height: 70px;
    text-align: center;
  }

  .label {
    text-align: center;
    height: 80px;
    font: var(--cg-font-text3);

    .jump-txt {
      height: 80px;
      font: var(--cg-font-text3)
    }
  }
}

:deep(.cg-container-head) {
  padding: 0 !important;

  .cg_default {
    padding: 0 5px !important;
  }
}

.empty {
  height: 26px;
}
</style>