<script setup lang="ts">
import { computed, ref } from 'vue';
import WalletCenter from '../wallet-center/index.vue';
import { CgSwitch, CgHeader, CgIcon } from '@/components/cg-template-2';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import APIs from '@/http/blue-apis';
import bus from '@/utils/bus';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';
import SelfTransfer from '../wallet-center/self-transfer.vue';

const Dialog = new CgDialogClass();
const router = useRouter();
const userStore = userInfoStateStore();
// 是否开启假免转
const fadeAuto = computed(() => userStore.userInfo.automatic === 1);

// 是否展开
const expand = ref(false);
const walletInnerRef = ref();

const switchHandler = () => {
  // 关闭拦截
  if (fadeAuto.value) {
    Dialog.showDialog({
      template: 'tmp1',
      tmp1Content:
        'Sau Khi Tắt Chuyển Khoản Tự Động, Bạn Cần Thao Tác Thủ Công Đối Với Ví Tiền Sảnh, Xác Nhận Tắt Chuyển Khoản Tự Động?',
      onOk() {
        APIs.setAutomaticTransfer({ state: 2 }).then(() => {
          Toast('Chuyển Khoản Tự Động Đã Tắt');
          userStore.getUserInfo();
        });
      }
    });
  } else {
    // 开启拦截
    Dialog.showDialog({
      template: 'tmp1',
      tmp1Content:
        'Sau Khi Bật Chuyển Khoản Tự Động, Không Cần Thao Tác Thủ Công Đối Với Ví Tiền Sảnh',
      onOk() {
        bus.emit('recover', true);
      }
    });
  }
};

// 开启免转
const openHandler = () => {
  APIs.setAutomaticTransfer({ state: 1 }).then(() => {
    Toast('Chuyển Khoản Tự Động Đã Bật');
    userStore.getUserInfo();
  });
};

const expandClick = () => {
  expand.value = !expand.value;
  const { height } = walletInnerRef.value.getBoundingClientRect();
  console.log(height);
  // if (expand.value) {

  // }
}
</script>
<template>
  <div class="transfer">
    <CgHeader>
      CHUYỂN KHOẢN
      <template #actions>
        <cg-icon width="52" name="i_caption" @click="router.push('/help?category=1&subclass=4')" />
      </template>
    </CgHeader>

    <!-- 免转开关 -->
    <div class="fade-auto">
      <label>CHUYỂN KHOẢN TỰ ĐỘNG </label>
      <cg-switch @click="switchHandler" v-model="fadeAuto" />
    </div>

    <!-- 钱包中心 -->
    <div class="wallet-wrapper" :class="{ 'expand': expand, 'height-auto': fadeAuto ? true : false }">
      <div ref="walletInnerRef" class="inner">
        <WalletCenter isTransfer @setAutomaticTransfer="openHandler" />
      </div>
    </div>

    <!-- 转账页面 -->
    <div v-if="!fadeAuto" class="panel-wrapper">
      <div class="expand-block">
        <div class="expand-btn" @click="expandClick">
          <span>{{ expand ? 'Ẩn Bớt' : 'Hiện Thêm' }}</span>
          <cg-icon width="16" :name="`i_${expand ? 'up' : 'down'}`" />
        </div>
      </div>

      <div class="body">
        <SelfTransfer />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Transfer'
};
</script>

<style lang="scss" scoped>
.transfer {
  color: var(--cg-color-black1);
  padding-bottom: 100px;
  .wallet-wrapper {
    height: 640px;
    overflow: hidden;
    transition: all ease-in-out 0.35s;
    &.expand {
      height: 2200px;
    }
    &.height-auto {
      height: auto;
    }
  }

  .panel-wrapper {
    position: relative;
    z-index: 1;
    background-color: var(--cg-color-blue16);

    .expand-block {
      width: 100%;
      height: 44px;
      background-image: var(--cg-wallet-expand);
      border-radius: 0 0 var(--cg-border-radius) var(--cg-border-radius);
      border-bottom: 2px solid var(--cg-color-blue18);
      font: var(--cg-font-text2);
      display: flex;
      justify-content: center;
      margin-bottom: 40px;

      .expand-btn {
        width: 196px;
        height: 58px;
        background-image: var(--cg-wallet-expand);
        border-radius: 0 0 var(--cg-border-radius) var(--cg-border-radius);
        border-bottom: 2px solid var(--cg-color-blue18);
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          margin-right: 7px;
        }
      }
    }
  }

  .fade-auto {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    background: linear-gradient(180deg, var(--cg-color-blue12) 0%, var(--cg-color-white) 100%);
    box-shadow: 0px 8px 8px var(--cg-color-blue12);

    label {
      font: var(--cg-font-text1);
      color: var(--cg-color-blue1);
    }
  }
}
</style>
