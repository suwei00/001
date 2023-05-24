<script setup lang="ts">
import { goToServeUrl } from '@/utils/helpers';
import router from '@/router';
import { ClosePawDialog } from '@/mixins/pawError';

defineProps<{ num: number; type: string }>();

const forgetPassword = () => {
  ClosePawDialog();
  router.push('/forget-password');
};

const goServeUrl = () => {
  ClosePawDialog();
  goToServeUrl();
};
</script>

<template>
  <div class="error_num font-11" v-if="type === 'error'">
    Nhập Sai Mật Khẩu, Số Lần Còn Lại: <span class="err">{{ num }}</span>
  </div>
  <div class="kefu" v-if="type === 'kefu'">
    Nhập Sai Mật Khẩu Nhiều Lần, Vui Lòng Liên Hệ
    <span class="pointer" @click="goServeUrl">CSKH</span> Hoặc
    <span class="pointer" @click="forgetPassword">Đặt Lại Mật Khẩu </span>
  </div>
</template>

<style lang="scss" scoped>
.error_num {
  color: var(--cg-color-black1);
  .err {
    font: var(--cg-font-text7);
    color: var(--cg-color-red2);
    padding-left: 6px;
  }
}

.kefu {
  font: var(--cg-font-text2);
  color: var(--cg-color-black1);
  text-align: center;
  span {
    color: var(--cg-color-blue1);
  }
}
</style>
