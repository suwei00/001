<script setup lang="ts">
import { ref, computed } from 'vue';
import { CgHeader, CgField, CgDivider, CgButton } from '@/components/cg-template-2';
import { memberZalo } from '@/http/blue-apis';
import { Toast } from 'vant';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { useRouter } from 'vue-router';

const router = useRouter();

const userInfoStore = userInfoStateStore();

const zalopattern = /^(?!0)\d{9}$/;
const isZalo = computed(() => zalopattern.test(formdata.value.zalo));

const formdata = ref({
  zalo: ''
});

const zaloref = ref();

const updateZalo = async () => {
  const res = await memberZalo({ zalo: formdata.value.zalo });
  Toast('Liên Kết Thành Công');
  userInfoStore.getUserInfo();
  router.go(-1);
  return true;
};

const submitZalo = () => {
  const valid = zaloref.value && zaloref.value.validate();
  if (valid) {
    updateZalo();
  }
}

</script>
<template>
  <div class="zalo-info">
    <CgHeader>ZALO</CgHeader>
    <section>
      <ul class="form-ul">
        <li>
          <span class="label">ZALO</span>
          <cg-field v-model="formdata.zalo" ref="zaloref" type="number" :width="686" maxlength="9"
            placeholder="Liên kết số điện thoại ZALO" :pattern="zalopattern" :clear="true"
            message="Vui lòng nhập 9 chữ số, không bắt đầu bằng số 0" autocomplete="'false'"></cg-field>
        </li>
      </ul>
      <cg-button :disabled="!isZalo" width="686" height="88" center @click="submitZalo">XÁC NHẬN</cg-button>
      <div class="bot-desc">
        Vì sự an toàn của bạn, thông tin không thể được sửa đổi sau khi xác nhận. Nếu bạn cần trợ
        giúp, vui lòng liên hệ <a @click.prevent="() => router.push('/customer-service')">CSKH</a>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Zalo'
};
</script>

<style lang="scss" scoped>
:deep(.error_text) {
  font: var(--cg-font-text2);
  line-height: 26px;
  color: var(--cg-color-red2);
}

.form-ul {
  padding: 20px 32px;
  background-color: var(--cg-color-white);
  margin-bottom: 32px;
  border-bottom: 2px solid var(--cg-color-white1);
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
