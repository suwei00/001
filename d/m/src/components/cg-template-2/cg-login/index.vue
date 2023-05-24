<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { CgIcon, CgCarousel } from '@/components/cg-template-2';
import login from './common/login/index.vue';
import register from './common/register/index.vue';
import { CloseDialog, goPath } from '@/utils/logIn';
import CgLogin from './index.d';
import APIs from '@/http/blue-apis';
import { useRequest } from 'vue-request';
import { goToServeUrl, onBannerJump } from '@/utils/helpers';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { storeToRefs } from 'pinia';
const userInfo = userInfoStateStore();

interface Props extends CgLogin.Props {
  type: string;
}

const { needcode } = storeToRefs(userInfo);

const props = defineProps<Props>();
const viewType = ref(props.type);
const isSwitch = ref(false);
const carouselList = ref([]);

useRequest(() => APIs.getBannerByFlags({ flags: viewType.value === 'LogIn' ? 7 : 8 }), {
  refreshDeps: [viewType],
  onSuccess: (data: any) => {
    if (data?.banner) {
      carouselList.value = data.banner;
    }
  }
});

const titleOBJ: any = {
  LogIn: 'ĐĂNG NHẬP ',
  Register: 'ĐĂNG KÝ'
};

const onClick = (item: any) => {
  const { flags } = item;
  onBannerJump(item);
  if (flags === '1') {
    CloseDialog();
  }
};

watch(viewType, val => {
  if (val === 'LogIn') {
    userInfo.setNeedcode(false);
  }
});

onMounted(() => {
  userInfo.setNeedcode(false);
});
</script>

<template>
  <div class="cg_login" :class="{ height76: needcode }">
    <div class="cg_login_left">
      <cg-carousel :list="carouselList" @onClick="onClick" class="carousel--width" />
    </div>
    <div class="cg_login_right flex">
      <cg-icon class="i_close" :width="24" name="i_grey_close" @click="CloseDialog" />
      <app-image class="logo_icon" :src="`/logo/logo1.png`" />
      <div class="login_title" v-if="viewType === 'LogIn' || isSwitch">{{ titleOBJ[viewType] }}</div>
      <div class="flex-1 w_full">
        <login v-if="viewType === 'LogIn'" v-model:type="viewType" />
        <register v-else v-model:type="viewType" v-model:swch="isSwitch" />
      </div>
      <footer class="w_full flex-middle jc-sb">
        <div class="flex-middle pointer" @click="goPath('/')">
          <cg-icon :width="18" class="i_p" name="i_back_home" />
          <span>TRANG CHỦ</span>
        </div>
        <div class="flex-middle pointer" @click="goToServeUrl">
          <cg-icon :width="18" class="i_p" name="i_kefu" />
          <span>CSKH</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cg_login {
  position: relative;
  display: flex;
  width: 1000px;
  min-height: 680px;
  background: var(--cg-white-blue-login);
  border-radius: 12px;
  font: var(--cg-font-text);
  color: var(--cg-color-grey1);
  overflow: hidden;
  &_left {
    width: 500px;
    background-color: var(--cg-color-grey2);
    :deep(.carousel_main .point) {
      bottom: 56px;
    }
  }

  &_right {
    width: 500px;
    padding: 24px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .logo_icon {
    width: 134px;
    // margin-bottom: 18px;
  }

  .login_title {
    font: var(--cg-font-text3);
    color: var(--cg-color-blue5);
    margin-bottom: 12px;
  }

  .i_close {
    position: absolute;
    top: 18px;
    right: 18px;
  }

  .i_p {
    margin-right: 8px;
  }
}

.height76 {
  height: 760px;
}

.carousel--width {
  :deep(.home-banner) {
    height: auto !important;
    width: 100% !important;
  }
}
</style>
