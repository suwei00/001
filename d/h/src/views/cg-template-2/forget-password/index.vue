<script lang="ts" setup>
import { CgDivider, CgIcon, CgButton, CgHeader, CgField } from '@/components/cg-template-2';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import APIs from '@/http/blue-apis';
import { Toast } from 'vant';
const router = useRouter();
const imgSrc = ref('1');
const formData = ref({
  username: '',
  tel: '',
  pwd: '', // 新密码
  reset_pwd: '', // 确认密码
  code: '', // 验证码
  sid: '',
  ts: ''
});
const usernameRef = ref();
const telRef = ref();
const pwdRef = ref();
const resetPwdRef = ref();
const codeRef = ref();
const pswSame = ref(false);
const countdown = ref(300); // 倒计时
const btnDisabled = ref<boolean>(false);
let timer: any = null;
const stepOne = () => {
  const usernameValidate = usernameRef.value.validate();
  const telValidate = telRef.value.validate();
  console.error('usernameValidate----->', usernameValidate);
  console.error('telValidate----->', telValidate);
  if (!usernameValidate || !telValidate) {
    return;
  }
  const obj = {
    username: formData.value.username.toLowerCase(),
    phone: '0' + formData.value.tel.replace(/(\s)/g, '')
  };
  APIs.checkMemberPhone(obj).then((res: any) => {
    if (res) {
      console.log('验证成功------>');
      imgSrc.value = '2';
    }
  });
};
const validatePwas = () => {
  if (formData.value.reset_pwd) {
    pswSame.value = formData.value.reset_pwd !== formData.value.pwd;
    resetPwdRef.value.setValidate(formData.value.reset_pwd !== formData.value.pwd);
  }
};
const stepTwo = () => {
  const pwdValidate = pwdRef.value.validate();
  const codeValidate = codeRef.value.validate();
  if (formData.value.reset_pwd !== formData.value.pwd) {
    pswSame.value = true;
    resetPwdRef.value.setValidate(true);
    return;
  }
  if (!pwdValidate || !codeValidate) {
    return;
  }
  if (!btnDisabled.value) {
    Toast('Vui Lòng Lấy Mã Xác Minh Trước');
    return;
  }
  const params = {
    username: formData.value.username.toLowerCase(),
    phone: '0' + formData.value.tel.replace(/(\s)/g, ''),
    code: formData.value.code,
    sid: formData.value.sid,
    ts: formData.value.ts,
    password: formData.value.reset_pwd
  };
  APIs.forgetPassword(params).then((res: any) => {
    if (res) {
      imgSrc.value = '3';
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
    tel: '0' + formData.value.tel.replace(/(\s)/g, ''),
    username: formData.value.username.toLowerCase(),
    flag: 'text',
    ty: '2'
  };

  APIs.sendOfflineSms(params as any).then((res: any) => {
    console.error('res----->', res);
    Toast('Gửi Mã Xác Minh Thành Công');
    btnDisabled.value = true;
    formData.value.sid = res.split(':')[0];
    formData.value.ts = res.split(':')[1];
    console.error('res', res);
    timer = setInterval(timeLeave, 1000);
    console.error('formData.value.sid', formData.value.sid);
    console.error('formData.value.ts', formData.value.ts);
  });
};
</script>

<template>
  <cg-header> ĐẶT LẠI MẬT KHẨU </cg-header>
  <div class="forget-password">
    <div class="img-container">
      <app-image :src="`/step${imgSrc}.png`" class="img-size" />
    </div>
    <!-- 步骤一 -->
    <div v-if="imgSrc == '1'">
      <div class="white-container">
        <cg-divider color="var(--cg-color-white)" />
        <span class="label">Tên Đăng Nhập</span>
        <cg-field v-model.lowercase="formData.username" type="text" :width="686" maxlength="14" ref="usernameRef"
          :limit="/[^a-z0-9A-Z]/g"
          :pattern="/^[a-z]{1}[a-z0-9]{4,13}$/" :clear="true"
          message="Phải là sự kết hợp của 5-14 chữ cái Tiếng Anh và số, bắt đầu bằng chữ cái"
          placeholder="Vui lòng nhập tên người dùng"></cg-field>
        <span class="label">Số Điện Thoại</span>
        <cg-field v-model="formData.tel" :width="686" maxlength="11"
          :split="true"
          :limit="/[^\d]/g" ref="telRef" :clear="true"
          :pattern="/^[1-9]{1}[0-9]{8}$/" message="Vui lòng nhập 9 chữ số, không bắt đầu bằng số 0"
          placeholder="Vui lòng liên kết tài khoản số điện thoại">
          <template #left>
            <div class="flex ai-c">
              <span>+84</span>
            </div>
          </template>
        </cg-field>
        <cg-divider color="var(--cg-color-white)" />
      </div>
      <cg-divider color="var(--cg-color-white1)" />
      <cg-button type="primary" :width="686" :center="true" class="btn" @click="stepOne">BƯỚC TIẾP THEO</cg-button>
    </div>
    <!-- 步骤二 -->
    <div v-if="imgSrc == '2'">
      <div class="white-container">
        <cg-divider color="var(--cg-color-white)" />
        <span class="label">Mật Khẩu Mới</span>
        <cg-field v-model="formData.pwd" :limit="/[^a-z0-9A-Z]/g" type="password" :isPasw="true" :width="686" maxlength="20" ref="pwdRef"
          :pattern="/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/"
          message="Phải là sự kết hợp của 8-20 chữ cái Tiếng Anh và số" placeholder="Vui lòng nhập mật khẩu mới"
          @input="validatePwas" :clear="true"></cg-field>
        <span class="label">Xác Nhận Mật Khẩu Mới</span>
        
        <cg-field v-model="formData.reset_pwd" :limit="/[^a-z0-9A-Z]/g" type="password" :isPasw="true" :width="686" maxlength="20"
          placeholder="Vui lòng nhập lại mật khẩu mới" :pattern="/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/"
          @input="validatePwas" message="Mật khẩu 2 lần xác nhận không giống nhau" ref="resetPwdRef"
          :clear="true"></cg-field>
        <span class="label">Mã Xác Nhận</span>
        <div class="code">
          <cg-field v-model="formData.code" type="number" class="code-input" maxlength="4" ref="codeRef"
            :pattern="/^[0-9]{4}$/" message="Vui lòng nhập 4 số mã xác nhận" :clear="true"
            placeholder="Vui lòng nhập mã xác nhận"></cg-field>
          <div>
            <cg-button whiteStyle :width="178" :height="80" class="code-btn" :border-radius="'16'" :disabled="btnDisabled"
              @click.prevent="getCode">{{ btnDisabled ? countdown + 'GIÂY' : `LẤY MÃ XÁC NHẬN` }}</cg-button>
          </div>
        </div>
        <p class="red-tips">
          ＊Vui lòng sử dụng lưu lượng di động để nhận mã xác nhận. Cố gắng tránh sử dụng WiFi
        </p>
        <cg-divider color="var(--cg-color-white)" />
      </div>
      <cg-divider color="var(--cg-color-white1)" />
      <cg-button type="primary" :width="686" :center="true" class="btn" @click="stepTwo">BƯỚC TIẾP THEO</cg-button>
    </div>
    <!-- 步骤三 -->
    <div v-if="imgSrc == '3'">
      <div class="white-container">
        <div class="suc">
          <app-image src="/done.png" />
          <p>Bạn Đã Đổi Mật Khẩu Thành Công</p>
        </div>
        <cg-divider color="var(--cg-color-white)" />
      </div>
      <cg-divider color="var(--cg-color-white1)" />
      <cg-button type="primary" :width="686" :center="true" class="btn" @click="router.push('/entry/login')">TRỞ VỀ ĐĂNG
        NHẬP</cg-button>
    </div>
    <p class="cskh cskh-tips" v-if="imgSrc != '3'">
      Nếu người dùng chưa liên kết số điện thoại, vui lòng liên hệ
      <span @click="router.push('/customer-service')">CSKH</span> để được hỗ trợ
    </p>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ForgetPassword'
};
</script>

<style lang="scss" scoped>
.forget-password {}

.img-container {
  margin-top: 32px;
  margin-bottom: 16px;
  text-align: center;
}

.white-container {
  padding: 0 32px 20px 32px;
  background: var(--cg-color-white);
  font: var(--cg-font-text2);
}

.img-size {
  width: 686px;
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


.cskh {
  width: 636px;
  margin: 0 auto;
  margin-top: 24px;
  text-align: center;
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
}

.suc {
  text-align: center;
  color: var(--cg-color-black1);
  font: var(--cg-font-text6);

  img {
    width: 100px;
    margin-top: 40px;
  }

  p {
    margin-top: 0;
  }
}
</style>
