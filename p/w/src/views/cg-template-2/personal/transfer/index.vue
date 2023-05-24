<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import PersonalTitle from '../components/personal-title/index.vue';
import WalletCenter from '../components/wallet-center/index.vue';
import { CgSwitch, CgIcon } from '@/components/cg-template-2';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import APIs from '@/http/blue-apis';
import bus from '@/mixins/bus';
import Toast from '@/components/cg-template-2/toast';
import SelfTransfer from '../components/wallet-center/self-transfer.vue';

const Dialog = new CgDialogClass();

const userStore = userInfoStateStore();
// 是否开启假免转
const fadeAuto = computed(() => userStore.userInfo.automatic === 1);

// 是否展开
const expand = ref(false);

const switchHandler = () => {
  // 关闭拦截
  if (fadeAuto.value) {
    Dialog.showDialog({
      template: 'tmp1',
      tmp1Content: 'Sau Khi Tắt Chuyển Khoản Tự Động, Bạn Cần Thao Tác Thủ Công Đối Với Ví Tiền Sảnh, Xác Nhận Tắt Chuyển Khoản Tự Động?',
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
      tmp1Content: 'Sau Khi Bật Chuyển Khoản Tự Động, Không Cần Thao Tác Thủ Công Đối Với Ví Tiền Sảnh',
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

onMounted(() => {
  userStore.RefreshBalance();
});
</script>
<template>
  <div class="transfer">
    <personal-title title="CHUYỂN KHOẢN" description="Ví Tiền Các Sảnh Trò Chơi Không Thể Chuyển Khoản Trực Tiếp Cho Nhau">
      <template #right>
        <div class="right">
          <span style="margin-right: 10px">Chuyển Khoản Tự Động</span>
          <cg-switch @click="switchHandler" v-model="fadeAuto" />
        </div>
      </template>
    </personal-title>
    <WalletCenter isTransfer @setAutomaticTransfer="openHandler" />

    <div v-if="!fadeAuto" class="panel-wrapper" :class="{ expand }">
      <!-- 展开、收起 -->
      <div class="expand-wrapper">
        <app-image src="/withdraw/expand.png" />
        <div @click="expand = !expand" class="expand-btn">
          {{ expand ? 'Ẩn Bớt' : 'Hiện Thêm' }}
          <cg-icon style="margin-left: 6px" width="11.43" :name="`i_expand_${expand ? 'up' : 'down'}`" />
        </div>
      </div>
      <SelfTransfer />
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Transfer'
};
</script>

<style lang="scss" scoped>
.right {
  display: flex;
  align-items: center;
  font: var(--cg-font-text6);
  color: var(--cg-color-grey1);
}

.panel-wrapper {
  width: 940px;
  transform: translateY(-426px) translateX(-30px);
  transition: all ease-in-out .35s;
  background-color: var(--cg-color-white);
  // min-height: 350px;
  padding-bottom: 70px;
  border-radius: var(--cg-border-outer-radius);
  z-index: 15;
  position: relative;

  .expand-wrapper {
    position: relative;
    width: 946px;
    transform: translateX(-3px);

    .expand-btn {
      display: flex;
      align-items: center;
      position: absolute;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      cursor: pointer;
    }
  }
}

.expand {
  transform: translateY(16px) translateX(-30px);
  padding-bottom: 50px;
}

</style>
