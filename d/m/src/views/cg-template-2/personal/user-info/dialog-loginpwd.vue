<script setup lang="ts">
import { ref, computed } from 'vue';
import { CgInput, CgButton, CgIcon } from '@/components/cg-template-2';
import { useForm, useShowCountdown } from './useInfoHooks';
import Toast from '@/components/cg-template-2/toast';
import { useLoading } from '@/hooks/useLoading';
import { useRequest } from 'vue-request';
import { smsOnlineCode, updateLoginPwd } from '@/http/blue-apis';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store-pinia';
import { LogInAndRegister } from '@/utils/logIn';
const appStore = useAppStore();

const props = defineProps<{ close: () => void }>();

const useIn8 = require(`@/language/${globalConfig.LANG}`);
const userStore = userInfoStateStore();
const router = useRouter();

const isFormValid = computed(() => {
  if (formdata.oldPwd && formdata.newPwd && formdata.confirmPwd && formdata.verifyCode && formdata.verifyCode.length === 4 && formdata.newPwd === formdata.confirmPwd) {
    return true;
  }
  return false;
});

// 校验重复输入新密码
const validateRepass = (rule: string, value: string, callback: (arg?: any) => void) => {
  // let b = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(value)
  // if (!b) {
  //   callback(new Error('Phải là sự kết hợp của 8-20 chữ cái Tiếng Anh và số'));
  // } else
  if (formdata.newPwd !== '' && value !== formdata.newPwd) {
    callback(new Error('Mật khẩu 2 lần xác nhận không giống nhau'));
  } else {
    callback();
    // formref.value.validate()
    if (formdata.newPwd) formref.value.validateField('newPwd', (msg: any) => {});
  }
};

const validateCode = (rule: string, value: string, callback: (arg?: any) => void) => {
  let b = /^[0-9]{4}$/.test(value);
  if (!b) {
    callback(new Error('Vui lòng nhập 4 số mã xác nhận'));
  } else {
    callback();
  }
};

const validateOldpass = (rule: string, value: string, callback: (arg?: any) => void) => {
  let b = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(value);
  if (!b) {
    callback(new Error('Phải là sự kết hợp của 8-20 chữ cái Tiếng Anh và số'));
  } else {
    callback();
  }
};

// 校验重复输入新密码
const validateNewpass = (rule: string, value: string, callback: (arg?: any) => void) => {
  let b = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(value);
  if (!b) {
    callback(new Error('Phải là sự kết hợp của 8-20 chữ cái Tiếng Anh và số'));
  } else if (formdata.confirmPwd !== '' && value !== formdata.confirmPwd) {
    // callback(new Error('Mật khẩu 2 lần xác nhận không giống nhau'));
    if (formdata.confirmPwd) formref.value.validateField('confirmPwd', (msg: any) => {});
  } else {
    callback();
    if (formdata.confirmPwd) formref.value.validateField('confirmPwd', (msg: any) => {});
  }
};

const { formref, formdata, rules, validForm, resetForm } = useForm([
  {
    key: 'oldPwd',
    label: 'Mật Khẩu Cũ',
    value: '',
    rule: [
      // {
      //   required: true,
      //   trigger: 'blur',
      //   message: 'Phải là sự kết hợp của 8-20 chữ cái Tiếng Anh và số'
      // }
      // {
      //   pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/,
      //   message: 'Phải là sự kết hợp của 8-20 chữ cái Tiếng Anh và số', // 'Mật khẩu cũ sai', //
      //   trigger: 'change',
      // }
      { validator: validateOldpass, trigger: 'change' }
    ]
  },
  {
    key: 'newPwd',
    label: 'Mật Khẩu Mới',
    value: '',
    rule: [
      // {
      //   required: true,
      //   trigger: 'blur',
      //   message: 'Phải là sự kết hợp của 8-20 chữ cái Tiếng Anh và số'
      // }
      { validator: validateNewpass, trigger: 'change' }
    ]
  },
  {
    key: 'confirmPwd',
    label: 'Xác Nhận Mật Khẩu Mới',
    value: '',
    rule: [
      // {
      //   required: true,
      //   trigger: 'blur',
      //   message: 'Vui lòng đảm bảo đồng nhất với mật khẩu'
      // },
      { validator: validateRepass, trigger: 'change' }
    ]
  },
  {
    key: 'verifyCode',
    label: 'Mã Xác Nhận',
    value: '',
    rule: [
      // {
      //   required: true,
      //   trigger: 'blur',
      //   message: 'Vui lòng nhập 4 số mã xác nhận'
      // }
      // {
      //   pattern: /^[0-9]{4}$/,
      //   message: 'Vui lòng nhập 4 số mã xác nhận',
      //   trigger: 'change',
      // }
      { validator: validateCode, trigger: 'change' }
    ]
  }
]);

const { startLoading, closeLoading } = useLoading();

const { allseconds, counting, startCount } = useShowCountdown(300 * 1000);

const params = {
  flag: 'text',
  ty: '3'
};

const mailSid = ref('0');

const getCode = () => {
  startLoading();
  run();
};

const { data, run } = useRequest(() => smsOnlineCode(params), {
  manual: true,
  onSuccess: (res: any) => {
    mailSid.value = res;
    startCount();
    closeLoading();
    Toast('Gửi Mã Xác Minh Thành Công');
  },
  onError: err => {
    closeLoading();
  },
  onAfter() {
    closeLoading();
  }
});

const {
  data: updateData,
  loading: loadingSub,
  run: updatePwd
} = useRequest(updateLoginPwd, {
  manual: true,
  onSuccess: res => {
    Toast(useIn8.updatepwd_suc);
    props.close();
    appStore.logout();
    LogInAndRegister('LogIn');
  }
});

const submitForm = async () => {
  const { oldPwd, newPwd, confirmPwd, verifyCode } = formdata;
  let sid: any = '';
  let ts: any = '';
  if (mailSid.value != '0' && mailSid.value) {
    sid = mailSid.value.split(':')[0];
    ts = mailSid.value.split(':')[1];
  } else {
    Toast('Vui Lòng Lấy Mã Xác Minh Trước');
    return;
  }
  if (!counting.value) {
    Toast('Vui Lòng Lấy Mã Xác Minh Trước');
    return;
  }
  const paramsSub = {
    old: oldPwd,
    password: newPwd,
    reset_password: confirmPwd,
    sid: sid,
    ts: ts,
    code: verifyCode,
    ty: '1'
  };
  if (!oldPwd || !newPwd || !confirmPwd || !verifyCode) {
    Toast('Vui Lòng Điền Thông Tin');
    return;
  }
  if (newPwd != confirmPwd) {
    Toast('Hai Lần Mật Khẩu Không Đồng Nhất');
    return;
  }
  if (oldPwd == newPwd) {
    Toast('Mật Khẩu Mới Không Được Cùng Mật Khẩu Cũ Đồng Nhất');
    return;
  }
  if (validForm()) {
    await updatePwd(paramsSub);
  }
};
</script>

<template>
  <div class="dialog-inner-content">
    <div class="grey-desc">Giữ thói quen thay đổi mật khẩu định kỳ, tài khoản của bạn sẽ an toàn hơn</div>

    <el-form :model="formdata" :rules="rules" ref="formref" label-width="91px" label-position="left">
      <el-form-item label="Mật Khẩu Cũ" prop="oldPwd">
        <cg-input :clear="true" class="input-box" v-model="formdata.oldPwd" placeholder="Vui lòng nhập mật khẩu cũ" type="password" minlength="8" maxlength="20" autocomplete="off"> </cg-input>
      </el-form-item>

      <el-form-item label="Mật Khẩu Mới" prop="newPwd">
        <cg-input :clear="true" class="input-box" v-model="formdata.newPwd" placeholder="Vui lòng nhập mật khẩu mới" type="password" minlength="8" maxlength="20" autocomplete="off"> </cg-input>
      </el-form-item>

      <el-form-item label="Xác Nhận Mật Khẩu Mới" prop="confirmPwd">
        <cg-input :clear="true" class="input-box" v-model="formdata.confirmPwd" placeholder="Vui lòng nhập lại mật khẩu mới" type="password" minlength="8" maxlength="20" autocomplete="off">
        </cg-input>
      </el-form-item>

      <el-form-item label="Mã Xác Nhận" prop="verifyCode">
        <cg-input :clear="true" type="number" v-model="formdata.verifyCode" class="input-box code-input" placeholder="Vui lòng nhập mã xác nhận" maxlength="4" autocomplete="off"></cg-input>
        <div class="extra">
          <cg-button :disabled="counting" :white-style="true" width="146" height="40" :custom-style="true" @click.prevent="getCode">{{
            counting ? `${allseconds} GIÂY` : 'LẤY MÃ XÁC NHẬN'
          }}</cg-button>
        </div>
      </el-form-item>
    </el-form>

    <!-- <div class="cg-form-item">
      <label>Mật Khẩu Cũ</label>
      <cg-input class="input-box" ref="inputsRef" v-model="formdata.abc" :pattern="/\d{4,4}/" placeholder="Vui lòng nhập mật khẩu cũ" type="password">
        <template #suffix>
          <div class="icon-suffix eye-close">
            <cg-icon name="i_eyeclose" width="20" />
          </div>
        </template>
      </cg-input>
    </div> -->

    <!-- <div class="cg-form-item">
      <label>Mật Khẩu Mới</label>
      <cg-input class="input-box" placeholder="Vui lòng nhập mật khẩu mới">
        <template #suffix>
          <div class="icon-suffix eye-close">
            <cg-icon name="i_eyeclose" width="20" />
          </div>
        </template>
      </cg-input>
    </div> -->
    <!-- <div class="cg-form-item">
      <label>Xác Nhận Mật Khẩu Mới</label>
      <cg-input class="input-box" placeholder="Vui lòng nhập lại mật khẩu mới">
        <template #suffix>
          <div class="icon-suffix eye-close">
            <cg-icon name="i_eyeopen" width="20" />
          </div>
        </template>
      </cg-input>
    </div> -->

    <!-- <div class="cg-form-item">
      <label>Mã Xác Nhận</label>
      <cg-input class="input-box" placeholder="Vui lòng nhập mã xác nhận" />
      <div class="extra"><cg-button :white-style="true" width="146" height="40" :custom-style="true" @click="">LẤY MÃ XÁC NHẬN</cg-button></div>
    </div> -->

    <div class="warn-msg">＊Vui lòng sử dụng lưu lượng di động để nhận mã xác nhận, cố gắng tránh sử dụng WiFi</div>
    <div class="btn-box">
      <cg-button :disabled="!isFormValid" small @click="submitForm">XÁC NHẬN</cg-button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DialogLoginpwd'
};
</script>

<style lang="scss" scoped>
.dialog-inner-content {
  font: var(--cg-font-text6);
  color: var(--cg-color-grey1);

  .grey-desc {
    line-height: 15px;
    padding-bottom: 6px;
  }

  a {
    color: var(--cg-color-blue12);
    text-decoration: underline;
    cursor: pointer;
  }
}

:deep(.el-form-item) {
  align-items: center;
  padding: 6px 0px 6px 0;
  .el-input__inner {
    font-size: 13px;
    padding-left: 12px;
    padding-right: 12px;
  }
  &.is-error {
    padding-bottom: 32px;
  }

  .el-form-item__error {
    font: var(--cg-font-text6);
    color: var(--cg-color-red);
    line-height: 11px;
    padding: 0;
    top: auto;
    bottom: -23px;
  }

  .el-form-item__label {
    line-height: 15px;
    padding-right: 0px;
    font-size: 13px;
  }

  .el-form-item__content {
    display: flex;

    .input-box {
      flex: 1;
    }

    .extra {
      padding-left: 6px;

      button {
        font: var(--cg-font-text5);
        line-height: 15px;
      }
    }
  }

  .el-input__suffix {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 40px;
    align-items: center;
    cursor: pointer;
    right: 20px;
  }

  .code-input {
    .el-input__inner {
      padding-right: 0;
    }

    .el-input__suffix {
      right: 5px;
    }
  }
}

.cg-form-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 6px 0;

  label {
    width: 92px;
    line-height: 15px;
    padding-right: 0px;
  }

  .input-box {
    flex: 1;
  }

  .extra {
    padding-left: 6px;

    button {
      font: var(--cg-font-text5);
      line-height: 15px;
    }
  }

  .icon-suffix {
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 10px;
    cursor: pointer;
  }
}

.warn-msg {
  padding-top: 6px;
  font: var(--cg-font-text6);
  line-height: 15px;
  color: var(--cg-color-red);
}

.btn-box {
  padding-top: 24px;
  display: flex;
  justify-content: center;
}
</style>
