<script setup lang="ts">
import { CloseDialog } from '@/utils/logIn';
import router from '@/router';
import { ClosePawDialog } from '@/mixins/pawError';
import { goToServeUrl } from '@/utils/helpers';

defineProps<{ num: number; type: string }>();

const forgetPassword = () => {
  CloseDialog();
  ClosePawDialog();
  router.push('/find-password');
};

const goCSKH = () => {
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
    <span class="pointer" @click="goCSKH">CSKH</span> Hoặc
    <span class="pointer" @click="forgetPassword">Đặt Lại Mật Khẩu </span>
  </div>
</template>

<style lang="scss" scoped>
.error_num {
  text-align: center;
  color: var(--cg-color-grey1);
  font: var(--cg-font-text);
  .err {
    font: var(--cg-font-text1);
    color: var(--cg-color-red);
    padding-left: 6px;
  }
}

.kefu {
  font: var(--cg-font-text);
  color: var(--cg-color-grey1);
  text-align: center;
  span {
    color: var(--cg-color-blue12);
  }
}
</style>
