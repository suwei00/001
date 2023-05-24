<script setup lang="ts">
import { CgHeader, CgContainer,CgContainerHead, CgIcon, CgButton ,CgAmount,CgProgress,CgDivider} from '@/components/cg-template-2';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { storeToRefs } from 'pinia';
import { ref, computed, onActivated } from 'vue';
import { floor } from 'lodash';
import { multiply } from 'cg-utils';
import { APIs } from '@/http';
import { getVipConfigList } from '@/http/APIs';
import { useRouter } from "vue-router";




const userInfoStore = userInfoStateStore();
const { userInfo, refreshLoading } = storeToRefs(userInfoStore);
const formattedrate = computed(() => {
  if (userInfo.value.level === 10) {
    return 1;
  }
  if (Number(userInfo.value.now) > 0 && Number(userInfo.value.next) > 0) {
    const currate = floor((userInfo.value.now) / (userInfo.value.next), 2);
    return currate >= 1 ? 1 : currate;
  }
  return 0;
});
const refreshOrDetail = () => {
    console.log('刷新或者查看金额');
};

  const dataList = ref<any>([])
const getMemberAgentList = () => {
    APIs.getVipConfigList({}).then((res: any) => {
        if (res) {
            dataList.value = res.data;
            console.log(res.data,'777777')
        }
    })
}
getMemberAgentList()
const router = useRouter()
const showLoginpwd = (val: string) => {
    if (val == 'na') {
        router.push('/')
    } else if (val == 'tr') {
      router.push('/deposit/index')
    }
};



</script>
<template>
  <div class="benefit">
    <CgHeader> PHÚC LỢI VIP </CgHeader>
    <div class="benefit-content">
      <div>
      <cg-container :style="'margin-bottom:var(--cg-px-8)'">
      <div class="vip-info" :class="[userInfo.level >= 10 ? 'level-ten' : (formattedrate >= 1 ? 'has-pro rate-full' : 'has-pro rate-normal')]">
        <div class="vip-money">
          <template v-if="userInfo.level >= 10">
              <!-- <app-image :src="`/icon/i_vip${userInfo.level}.png`" class="vipimg margin-y" /> -->
              <p class="nopadding sign">Chúc Mừng Bạn Đã Thăng Cấp Cao Nhất!</p>
            </template>
            <template v-else-if="formattedrate >= 1">
              <p class="bold-sign sign">Chúc Mừng Bạn Đã Thăng Cấp</p>
              <p class="blue-sign nopadding sign">(Tự Động Sau 02:00 Giờ)</p>
            </template>
            <template v-else>
              <p class="sign">Số Tiền Cần Nạp Để Thăng Cấp </p>
              <p class="money">
                <cg-amount size="28" weight="700" :amount="userInfo.now" :segmentation="false" suffix="K" padding="0"
                  :precision="0"></cg-amount>
                <span class="line">/</span>
                <cg-amount size="28" weight="700" :amount="userInfo.next" :segmentation="false" suffix="K" padding="0"
                  :precision="0"></cg-amount>
              </p>
            </template>
        </div>
        <div v-if="userInfo.level < 10" class="vip-bar">
          <app-image :src="`/icon/i_vip${+userInfo.level || '1'}.png`" class="vipimg" />
          <div class="flex-1 mid">
            <cg-progress :rate="multiply(formattedrate, 100)" position="center" :height="40" :round="false"></cg-progress>
          </div>
          <app-image :src="`/icon/i_vip${userInfo.next_level > 0 ? userInfo.next_level : (+userInfo.level) + 1}.png`" class="vipimg"
            :style="`filter: opacity(${0.3 + formattedrate * 0.7})`" />
        </div>
      </div>
      <div class="dash-divider"></div>
      <div class="benfit-bom">
        <CgContainer padding="0">
      <table cellspacing="0">
        <tr>
          <th class="th-box">
            <div>CẤP VIP</div>
          </th>
          <th>
            <div>MỨC TIỀN NẠP</div>
          </th>
          <th>
            <div>PHẦN THƯỞNG THĂNG CẤP</div>
          </th>
          <th>
            <div>KHUYẾN MÃI SINH NHẬT</div>
          </th>
        </tr>
        <tr v-for="item in dataList" :key="item.label" class="item">
          <td>
            <div class="key_name">
              VIP{{item.level}}
            </div>
          </td>
          <td>
            <div class="key_name">
              <cg-amount :amount="item.upgrade_deposit" :weight="400" :segmentation="true" suffix="K"></cg-amount>
            </div>
          </td>
          <td>
            <div class="key_name">
              <cg-amount :amount="item.upgrade_gift" :weight="400" :segmentation="true" suffix="K"></cg-amount>
            </div>
          </td>
          <td>
            <div class="key_name">
              <cg-amount :amount="item.birth_gift" :weight="400" :segmentation="true" suffix="K"></cg-amount>
            </div>
          </td>
        </tr>
      </table>
    </CgContainer>
      </div>
      </cg-container>
     </div>
      <div class="button-box">
         <CgButton width="686" @click="$event => showLoginpwd('na')">TRỞ VỀ ĐẶT CƯỢC</CgButton>
         <CgButton  width="686" whiteStyle @click="$event => showLoginpwd('tr')">NẠP TIỀN NGAY</CgButton>
      </div>
    </div>
  </div>
  
</template>
<script lang="ts">
export default {
  name: 'AgentBenefit'
};

</script>
<style lang="scss" scoped>
.benefit-content{
  padding: 24px 36px;
  .vipimg {
  width: 128px;
  display: block;

  &.margin-y {
    margin: 10px 0;
  }
  .button-box{
    width: 100%;
  }
  
}
:deep(.cg-button){
    margin-top: 24px;
  }

  .vip-info {
    font: var(--cg-font-text10);
    color: var(--cg-color-black1);
    line-height: 25px;
    padding: 24px 24px 32px;
    &.level-ten {
      padding-top: 20px;
      padding-bottom: 26px;
      .vip-money {
        padding-bottom: 0;
        .vipimg {
          margin: 0;
        }
        .sign {
          color: var(--cg-color-black1);
          font: var(--cg-font-text4);
        }
      }
    }
    &.rate-normal {
      font: var(--cg-font-text4);
    }
    .vip-money {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 16px;
    }
    .blue-sign {
      font: var(--cg-font-text4);
      color: var(--cg-color-blue1);
      line-height: 25px;
    }
        .money {
          font: var(--cg-font-text1);
          line-height: 32px;
          // padding-top: 8px;
          color: var(--cg-color-blue1);
          display: flex;

          .line {
            display: inline-block;
            padding-left: 6px;
            padding-right: 6px;
          }
        }
  }

  .vip-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .mid {
        padding: 0 14px;
      }
    }
  .benfit-bom {
      padding: 26px 20px 20px 20px;

table {
  width: 100%;
}

tr {
  th {
    border-right: 1px solid var(--cg-color-white1);
    background: linear-gradient(180deg, #FFFFFF 0%, #DEEEFB 100%);
    padding: 8px 10px;
    &:last-child {
      border-right: 0;
    }
  }
  &:last-child {
    td {
      &:last-child,
      &:nth-last-child(2) {
        >div {
          border-bottom: 0;
        }

      }
    }
  }
  td {
    height: 80px;
    line-height: 80px;
    color: var(--cg-color-black1);
    font: var(--cg-font-text9);
    text-align: center;
    border-right: 1px solid var(--cg-color-white1);
    width: 50%;

    &:last-child {
      border-right: 0;
    }

    .key_name {
      height: 80px;
      line-height: 80px;
      border-bottom: 1px solid var(--cg-color-white1);
      text-align: center;
      padding: 0 10px;
    }

    :deep(.el-input__suffix) {
      left: 50px;
      top: -2px;
    }

  }
}

  } 
}

.dash-divider {
  border-top: 1px dashed var(--cg-color-blue11);
  margin: 0 24px;
  position: relative;
  &::before, &::after {
    width: 10px;
    height: 10px;
    position: absolute;
    border: 2px solid var(--cg-color-blue11);
    border-radius: 50%;
    content: '';
  }
  &::before {
    top: -8px;
    left: -12px;
  }
  &::after {
    top: -8px;
    right: -12px;
  }
}

</style>
