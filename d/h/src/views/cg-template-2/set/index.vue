<script lang="ts" setup>
import { CgDivider, CgIcon, CgButton, CgHeader } from '@/components/cg-template-2';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store-pinia';
const appStore = useAppStore();
const router = useRouter();
</script>

<template>
  <cg-header>CÀI ĐẶT</cg-header>
  <div class="set">
    <div class="list" @click="router.push('/change-password')">
      <div class="text">QUẢN LÝ MẬT KHẨU ĐĂNG NHẬP</div>
      <cg-icon name="i_arrowright" width="16" />
    </div>
    <div class="list" @click="router.push('/device')">
      <div class="text">THÔNG TIN THIẾT BỊ</div>
      <cg-icon name="i_arrowright" width="16" />
    </div>
    <!-- 退出登录 -->
    <cg-button type="primary" :width="686" :center="true" class="btn" @click="appStore.logout">ĐĂNG XUẤT</cg-button>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Set'
};
</script>

<style lang="scss" scoped>
.text {
  color: var(--cg-color-black1);
  font: var(--cg-font-text1);
}

.list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  height: 100px;
  background-color: var(--cg-color-white);
  border-bottom: 1px solid var(--cg-color-blue13);
}

.btn {
  margin-top: 32px;
}
</style>
