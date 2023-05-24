<script lang="ts" setup>
import { CgHeader, CgContainer, CgIcon, CgButton, CgTab } from '@/components/cg-template-2';
import { ref, computed } from 'vue';
import { useAppStore } from '@/store-pinia';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call';
import router from '@/router';
import APIs from '@/http/blue-apis';
import { useLoading } from '@/hooks/useLoading';
import { storeToRefs } from 'pinia';
import UsdtList from './usdt-list.vue';

const { startLoading, closeLoading } = useLoading();

const appStore = useAppStore();
const userInfoStore = userInfoStateStore();
const { usdtCardList } = storeToRefs(userInfoStore);
const Dialog = new CgDialogClass();

// 获取我的银行卡列表
const myBankList: any = ref([]);
const getbankList = () => {
  startLoading();
  APIs.getBanksCardList().then((res: any) => {
    closeLoading();
      myBankList.value = res ?? [];
      localStorage.setItem('onlyOnce', myBankList.value.length);
      const _shuaxin = localStorage.getItem('onlyPop');
      if (myBankList.value.length === 1 && _shuaxin === 'true') {
        localStorage.removeItem('onlyPop');
        fitPop();
      }
  }).finally(() => { closeLoading() })
};
getbankList();
// 只绑定一张卡有弹窗
const fitPop = () => {
  Dialog.showDialog({
    template: 'tmp1',
    title: 'LƯU Ý',
    tmp1Content:
      'Liên Kết Thành Công, Khuyến Nghị Quý Khách Liên Kết Thêm Thẻ Ngân Hàng Khác Để Sử Dụng Dự Bị Nhằm Nâng Cao Hiệu Quả Rút Tiền Mỗi Khi Ngân Hàng Bảo Trì!',
    confirmText: 'LIÊN KẾT',
    cancelText: 'BỎ QUA',
    onOk: () => {
      router.push('/banks/add');
    }
  });
};

const activeTabIndex = ref('1');
const navList = computed(() => [
  { label: `THẺ RÚT TIỀN (${ myBankList.value.length }/5)`, value: '1' },
  { label: `Quản Lý USDT (${ usdtCardList.value.length }/1)`, value: '2' }
]);

const changeTab = () => {
  //
};

userInfoStore.getUsdtCardList();
</script>

<template>
  <div class="bet">
    <CgHeader> LIÊN KẾT RÚT TIỀN </CgHeader>
    <!-- <div class="card-tab">
      <cg-tab v-model="activeTabIndex" :list="navList" @on-tab="changeTab" average></cg-tab>
    </div> -->
    <div v-if="activeTabIndex === '1'">
      <div class="banks_list" v-if="myBankList.length">
        <CgContainer padding="20">
          <ul class="flex fdr-c fw-w">
            <li
              class="bank_item"
              v-for="(bk, index) in myBankList"
              :key="index + bk.bank_card"
              :data-index="index"
              :class="[{ 'black-card': bk.state != 1 }]"
            >
              <div class="bank-title flex">
                <div>{{ appStore.getBankNameById(bk.bank_id) }}</div>
              </div>
              <div class="flex ai-fe jc-sb bank-text">
                <div class="bank-info flex-1">
                  <span>{{ bk.realname }}</span>
                  <p>{{ bk.bank_card.replace(/\*+/g, '*') }}</p>
                </div>
                <div class="bank-img">
                  <img :src="appStore.getBankLogoByBankId(bk.bank_id)" alt="" class="bank_logo" />
                </div>
              </div>
            </li>
          </ul>
        </CgContainer>
      </div>
      <div class="flex-middle" v-else>
        <app-image class="bank_no" src="/personal/bank_no.png" />
      </div>
      <div class="flex-middle add-bank-btn" v-if="myBankList.length < 5">
        <cg-button width="686" class="flex-middle" @click="$router.push('/banks/add')">
          <cg-icon width="26" name="i_jia" class="icon_ji"></cg-icon>
          LIÊN KẾT NGÂN HÀNG ({{ myBankList?.length ?? 0 }}/5)
        </cg-button>
      </div>
      <p class="customer_service" v-if="myBankList.length >= 5">
        Thẻ ngân hàng có thể liên kết đã đạt giới hạn, nếu cần thay đổi hãy liên hệ 
        <a @click.prevent="() => router.push('/customer-service')">CSKH</a>
      </p>
    </div>

    <div v-else>
      <usdt-list />
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'banks'
};
</script>

<style lang="scss" scoped>
.bet {
  padding: 24px 32px;
}

.bg_li {
  justify-content: center !important;

  :deep(.pub_content) {
    background-color: var(--cg-color-blue11);
  }

  .no_more {
    margin-top: 19px;

    .no_more_img {
      height: 82px;
      width: 82px;
    }
  }
}

.bank_add {
  margin-top: 30px;

  .tips {
    color: var(--cg-color-red);
    font: var(--cg-font-text6);
    line-height: 15px;
    margin-top: 8px;
  }

  .add-bank-btn {
    margin-top: 18px;

    :deep(.icon_ji) {
      display: inline-block;
      margin-right: 10px;
    }
  }

  :deep(.el-form-item) {
    margin-bottom: 25px;
  }

  :deep(.el-form-item__label) {
    font: var(--cg-font-text);
    color: var(--cg-color-grey1);
    line-height: 40px;
  }
}

.bank_item {
  @include webp($base-img-dir + 'personal/bank_bg.png');
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  height: 284px;
  overflow: hidden;
  width: 100%;
  margin-bottom: 20px;
  border-radius: var(--cg-border-radius);

  &:last-child {
    margin-bottom: 0px;
  }

  &.black-card {
    @include webp($base-img-dir + 'personal/errbank.png');
    background-size: cover;

    .bank-img {
      filter: grayscale(1);
    }
  }

  .bank-title {
    font: var(--cg-font-h4);
    color: var(--cg-color-white);
    text-shadow: var(--cg-bank-shadow);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &.black-card {
    opacity: 0.5;
  }

  .bank-text {
    height: 96px;
  }

  .bank-del {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  .bank-info {
    padding: 0 14px 0 14px;
    margin-top: 14px;
    font: var(--cg-font-text8);
    color: var(--cg-color-white);

    p {
      margin-top: 10px;
    }
  }

  .bank-img {
    width: 210px;
    height: 96px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.bank_no {
  margin: 104px 0 80px 0;
  height: 280px;
}

.add-bank-btn {
  margin-top: 18px;

  :deep(.icon_ji) {
    display: inline-block;
    margin-right: 10px;
  }
}

.card-tab {
  padding-bottom: 24px;
}
</style>
