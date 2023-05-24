<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { CgHeader, CgField, CgButton } from '@/components/cg-template-2';
import VerifyCodeVue from '../user-info/verify-code.vue';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call';

const Dialog = new CgDialogClass();

const router = useRouter();

const formdata = ref({
  bindname: '',
  protocol: 'TRC20',
  address: ''
});

const bindnameref = ref();
const addressref = ref();

const showEditDialog = () => {
  Dialog.showDialog({
    template: 'tmp2',
    customComponent: VerifyCodeVue,
    title: 'SỐ ĐIỆN THOẠI XÁC NHẬN',
    btns: 0,
    props: { data: {}, close: () => Dialog.closeDialog() },
  });
}
</script>

<template>
  <div>
    <CgHeader> THÊM ĐỊA CHỈ USDT </CgHeader>
    <section class="">
      <ul class="form-ul">
        <li>
          <span class="label">Biệt Danh Địa Chỉ</span>
          <cg-field
            v-model="formdata.bindname"
            ref="bindnameref"
            type="text"
            :width="686"
            maxlength="200"
            placeholder="Biệt Danh Địa Chỉ"
            :clear="true"
          ></cg-field>
        </li>
        <li>
          <span class="label">Giao Thức USDT</span>
          <cg-field
            v-model="formdata.protocol"
            disabled
            type="text"
            :width="686"
            maxlength="200"
          ></cg-field>
        </li>
        <li>
          <span class="label">Số Điện Thoại</span>
          <cg-field
            v-model="formdata.address"
            ref="addressref"
            type="text"
            :width="686"
            maxlength="600"
            placeholder="Vui lòng nhập địa chỉ USDT "
            :clear="true"
          ></cg-field>
        </li>
      </ul>
      <cg-button width="686" height="88" center @click="showEditDialog">XÁC NHẬN</cg-button>
      <div class="bot-desc">
        Vì sự an toàn của bạn, thông tin không thể được sửa đổi sau khi xác nhận. Nếu bạn cần trợ
        giúp, vui lòng liên hệ <a @click.prevent="() => router.push('/customer-service')">CSKH</a>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AddUsdt'
};
</script>

<style lang="scss" scoped>
.form-ul {
  padding: 20px 32px;
  background-color: var(--cg-color-white);
  margin-bottom: 32px;
  border-bottom: 2px solid var(--cg-color-white1);
  :deep(.error_text) {
    font: var(--cg-font-text2);
    line-height: 26px;
    color: var(--cg-color-red2);
  }
}
.label {
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
  color: var(--cg-color-black1);
  font: var(--cg-font-text7);
}
.bot-desc {
  padding: 32px 114px;
  font: var(--cg-font-text3);
  line-height: 30px;
  text-align: center;
  color: var(--cg-color-black1);
  a {
    text-decoration: underline;
    color: var(--cg-color-blue1);
  }
}
</style>
