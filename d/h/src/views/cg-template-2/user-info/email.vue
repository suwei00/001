<script setup lang="ts">
import { ref, computed } from 'vue';
import { CgHeader, CgField, CgDivider, CgButton } from '@/components/cg-template-2';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';
import { useShowCountdown } from './useInfoHooks';
import { useRequest } from 'vue-request';
import { mailOnline, setBildEmail } from '@/http/blue-apis';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { storeToRefs } from 'pinia';
const userInfoStore = userInfoStateStore();
const { userInfo } = storeToRefs(userInfoStore);

const { allseconds, counting, startCount } = useShowCountdown(200 * 1000);

const router = useRouter();

const emailref = ref();
const coderef = ref();

const formdata = ref({
  email: '',
  code: ''
});

const emailpattern = /^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

const emailValid = computed(() => emailpattern.test(formdata.value.email));
const params = computed(() => {
  return {
    mail: formdata.value.email,
    ty: userInfo.value.email ? '2' : '1'
  };
});

const {
  loading,
  run: runEmailCode,
  data
} = useRequest(() => mailOnline(params.value), {
  manual: true,
  onSuccess: (res: any) => {
    //   closeLoading();
    Toast('Gửi Mã Xác Minh Thành Công');
    startCount();
  },
  onError: () => {
    //   closeLoading();
  }
});

const emailBackSid = computed(() => data); // 绑定邮箱发送成功返回id

const submitParams = computed(() => ({
  email: formdata.value.email,
  code: formdata.value.code
}));

const submitForm = async () => {
  const emailvalid = emailref.value.validate();
  // const codevalid = coderef.value.validate();
  if (emailvalid) {
    //  && codevalid
    let sid: any = '';
    let ts: any = '';
    if (emailBackSid.value.value !== '0' && emailBackSid.value.value) {
      sid = emailBackSid.value.value.split(':')[0];
      ts = emailBackSid.value.value.split(':')[1];
    } else {
      Toast('Vui Lòng Lấy Mã Xác Minh Trước');
      return;
    }
    if (!counting.value) {
      Toast('Vui Lòng Lấy Mã Xác Minh Trước');
      return;
    }
    setBildEmail({
      ...submitParams.value,
      sid,
      ts
    }).then(() => {
      Toast('Liên Kết Thành Công');
      userInfoStore.getUserInfo();
      router.go(-1);
    });
  }
};

const { loading: submitLoading, run: submitRun } = useRequest(() => submitForm(), {
  manual: true
});

const getEmailCode = () => {
  if (loading.value) return;
  if (emailref.value && emailref.value.validate()) {
    runEmailCode();
  }
};
</script>
<template>
  <div class="zalo-info">
    <CgHeader>ĐỊA CHỈ EMAIL</CgHeader>
    <section>
      <ul class="form-ul">
        <li>
          <span class="label">Tài Khoản Email</span>
          <cg-field
            v-model="formdata.email"
            ref="emailref"
            type="text"
            :width="686"
            maxlength="40"
            placeholder="Vui lòng nhập địa chỉ Email của bạn"
            :pattern="emailpattern"
            message="Vui lòng nhập chính xác địa chỉ Email"
            :clear="true"
          ></cg-field>
        </li>
        <li>
          <span class="label">Mã Xác Nhận Từ Email</span>
          <div class="code">
            <cg-field
              v-model="formdata.code"
              ref="coderef"
              type="number"
              class="code-input"
              maxlength="4"
              :pattern="/^[0-9]{4}$/"
              message="Vui lòng nhập 4 số mã xác nhận"
              placeholder="Vui lòng nhập mã xác nhận"
              :clear="true"
            ></cg-field>
            <div></div>
            <cg-button
              whiteStyle
              :width="200"
              :height="80"
              class="code-btn"
              :border-radius="'16'"
              :disabled="counting || !emailValid"
              @click.prevent="getEmailCode"
              >{{ counting ? allseconds + ' GIÂY' : `LẤY MÃ XÁC NHẬN` }}</cg-button
            >
          </div>
        </li>
      </ul>
      <cg-button :disabled="!emailValid || formdata.code.length !== 4" width="686" height="88" center @click="submitRun">XÁC NHẬN</cg-button>
      <div class="bot-desc">
        Vì sự an toàn của bạn, thông tin không thể được sửa đổi sau khi xác nhận. Nếu bạn cần trợ
        giúp, vui lòng liên hệ <a @click.prevent="() => router.push('/customer-service')">CSKH</a>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Email'
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
.code {
  display: flex;
  align-items: center;

  .code-btn {
    margin-left: 20px;
    font: var(--cg-font-text8);
  }
}
</style>
