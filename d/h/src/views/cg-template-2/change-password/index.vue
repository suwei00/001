<script lang="ts" setup>
import { CgDivider, CgButton, CgHeader, CgField } from '@/components/cg-template-2';
import { ref } from 'vue';
import APIs from '@/http/blue-apis';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store-pinia';
const appStore = useAppStore();
const router = useRouter();
const formData = ref({
  old: '', // 旧密码
  password: '', // 新密码
  reset_password: '', // 确认密码
  sid: '',
  ts: '',
  code: ''
});
const oldRef = ref();
const passwordRef = ref();
const resetPasswordRef = ref();
const codeRef = ref();
const pswSame = ref(false);
const countdown = ref(300); // 倒计时
const btnDisabled = ref<boolean>(false);
let timer: any = null;
const validatePwas = () => {
  if (formData.value.reset_password) {
    pswSame.value = formData.value.reset_password !== formData.value.password;
    resetPasswordRef.value.setValidate(formData.value.reset_password !== formData.value.password);
  }
};
const changePassword = () => {
  const userValidate = oldRef.value.validate();
  const passwordValidate = passwordRef.value.validate();
  const codeValidate = codeRef.value.validate();
  if (formData.value.reset_password !== formData.value.password) {
    pswSame.value = true;
    resetPasswordRef.value.setValidate(true);
    return;
  }
  if (!userValidate || !passwordValidate || !codeValidate) {
    return;
  }
  if (!btnDisabled.value) {
    Toast('Vui Lòng Lấy Mã Xác Minh Trước');
    return;
  }
  const params = {
    old: formData.value.old,
    password: formData.value.password,
    reset_password: formData.value.reset_password,
    sid: formData.value.sid,
    ts: formData.value.ts,
    code: formData.value.code,
    ty: '1'
  };
  APIs.updateLoginPwd(params).then((res: any) => {
    if (res) {
      Toast('Thay Đổi Thành Công, Vui Lòng Đăng Nhập Lại');
      appStore.logout();
      // router.push({ path: '/entry/login' });
    }
  });
};
const timeLeave = () => {
  if (countdown.value === 0) {
    clearTimeout(timer);
    console.log('验证码为：123456');
    countdown.value = 300;
    btnDisabled.value = false;
    return false;
  }
  countdown.value--;
};
const getCode = () => {
  const params = {
    flag: 'text',
    ty: '3'
  };
  APIs.smsOnlineCode(params).then((res: any) => {
    console.error('res----->', res);
    Toast('Gửi Mã Xác Minh Thành Công');
    btnDisabled.value = true;
    formData.value.sid = res.split(':')[0];
    formData.value.ts = res.split(':')[1];
    timer = setInterval(timeLeave, 1000);
  });
};
</script>

<template>
  <cg-header> SỬA ĐỔI MẬT KHẨU ĐĂNG NHẬP </cg-header>
  <div class="change-password">
    <div>
      <div class="white-container">
        <cg-divider color="var(--cg-color-white)" />
        <p class="red-tips">
          <span>Giữ thói quen thay đổi mật khẩu định kỳ, tài khoản của bạn sẽ an toàn hơn</span>
        </p>
        <span class="label">Mật Khẩu Cũ</span>
        <cg-field v-model="formData.old" type="password" :width="686" maxlength="20"
          placeholder="Vui lòng nhập mật khẩu cũ" :pattern="/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/" :clear="true"
          message="Phải là sự kết hợp của 8-20 chữ cái Tiếng Anh và số" ref="oldRef"></cg-field>
        <span class="label">Mật Khẩu Mới</span>
        <cg-field v-model="formData.password" type="password" :width="686" maxlength="20"
          placeholder="Vui lòng nhập mật khẩu mới" :pattern="/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/"
          @input="validatePwas" message="Phải là sự kết hợp của 8-20 chữ cái Tiếng Anh và số" ref="passwordRef"
          :clear="true"></cg-field>
        <span class="label">Xác Nhận Mật Khẩu Mới</span>
        <cg-field v-model="formData.reset_password" type="password" :width="686" maxlength="20"
          placeholder="Vui lòng nhập lại mật khẩu mới" ref="resetPasswordRef" @input="validatePwas"
          :pattern="/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/" message="Mật khẩu 2 lần xác nhận không giống nhau"
          :clear="true"></cg-field>
        <span class="label">Mã Xác Nhận</span>
        <div class="code">
          <cg-field v-model="formData.code" type="number" maxlength="4" placeholder="Vui lòng nhập mã xác nhận"
            :clear="true" ref="codeRef" :pattern="/^[0-9]{4}$/" message="Vui lòng nhập 4 số mã xác nhận"></cg-field>

          <div>
            <cg-button whiteStyle :width="178" :height="80" class="code-btn" :border-radius="'16'" :disabled="btnDisabled"
              @click.prevent="getCode">{{ btnDisabled ? countdown + ' GIÂY' : 'LẤY MÃ XÁC NHẬN' }}</cg-button>
          </div>
        </div>
        <p class="red-tips">
          ＊Vui lòng sử dụng lưu lượng di động để nhận mã xác nhận. Cố gắng tránh sử dụng WiFi
        </p>
        <cg-divider color="var(--cg-color-white)" />
      </div>
      <cg-divider color="var(--cg-color-white1)" />
      <cg-button type="primary" :width="686" :center="true" class="btn" @click="changePassword">
        XÁC NHẬN THAY ĐỔI</cg-button>
    </div>
    <!-- <p class="red-tips">
                                                        ＊Vui lòng sử dụng lưu lượng di động để nhận mã xác nhận. Cố gắng tránh sử dụng WiFi
                                                      </p>
                                                      <cg-divider color="var(--cg-color-white)" /> -->
  </div>
  <!-- <cg-divider color="var(--cg-color-white1)" />
                                                    <cg-button type="primary" :width="686" :center="true" class="btn" @click="changePassword">
                                                      XÁC NHẬN THAY ĐỔI
                                                    </cg-button> -->
</template>
<script lang="ts">
export default {
  name: 'ChangePassword'
};
</script>

<style lang="scss" scoped>
.change-password {
  :deep(.error_text) {
    color: var(--cg-color-red2);
    font: var(--cg-font-text2);
  }
}

.white-container {
  padding: 0 32px 20px 32px;
  background: var(--cg-color-white);
}

.btn {
  margin-top: 32px;
}

.label {
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
  color: var(--cg-color-black1);
  font: var(--cg-font-text7);
}


.code {
  display: flex;
  align-items: flex-start;

  .code-btn {
    padding: 0 20px !important;
    margin-left: 20px;
    font: var(--cg-font-text8);
  }
}

.red-tips {
  margin: 20px 0 0 0;
  color: var(--cg-color-red2);
  font: var(--cg-font-text2);
  line-height: 32px;

  span {
    color: var(--cg-color-black1);
  }
}

.message {
  color: var(--cg-color-red2);
  font: var(--cg-font-text2);
}
</style>
