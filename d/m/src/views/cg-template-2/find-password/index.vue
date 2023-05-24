<script setup lang="ts">
import { reactive, ref, Ref } from 'vue';
import { CgButton, CgInput, CgIcon, CgContainer } from '@/components/cg-template-2';
import { usrRegexp, phoneRegexp, pwdRegexp } from '@/utils/validate';
import Toast from '@template-components/toast';
import APIs from '@/http/blue-apis';
import { LogInAndRegister } from '@/utils/logIn';
import { useRouter } from 'vue-router';
import { goToServeUrl } from '@/utils/helpers';

const router = useRouter();
const form_dom: Ref<any> = ref(null);
const form_dom2: Ref<any> = ref(null);
const countdown = ref(300); // 倒计时
const btnDisabled = ref<boolean>(false);
const imgSrc = ref('1');
let timer: any = null;
const formdata = ref({
  username: '',
  tel: ''
});
const formdata2 = ref({
  pwd: '', // 新密码
  reset_pwd: '', // 确认密码
  code: '', // 验证码
  sid: '',
  ts: ''
});
// 步骤一
const setpOne = () => {
  form_dom.value.validate((valid: boolean) => {
    if (valid) {
      const obj = {
        username: formdata.value.username.toLowerCase(),
        phone: '0' + formdata.value.tel.replace(/(\s)/g, '')
      };
      APIs.checkMemberPhone(obj).then((res: any) => {
        if (res) {
          imgSrc.value = '2';
        }
      });
    }
  });
};
// 步骤二
const setpTwo = () => {
  const params = {
    username: formdata.value.username.toLowerCase(),
    phone: '0' + formdata.value.tel.replace(/(\s)/g, ''),
    code: formdata2.value.code,
    sid: formdata2.value.sid,
    ts: formdata2.value.ts,
    password: formdata2.value.reset_pwd
  };
  form_dom2.value.validate((valid: boolean) => {
    if (valid) {
      if (!btnDisabled.value) {
        Toast('Vui Lòng Lấy Mã Xác Minh Trước');
        return;
      }
      APIs.forgetPassword(params).then((res: any) => {
        if (res) {
          imgSrc.value = '3';
        }
      });
    }
  });
};
const timeLeave = () => {
  if (countdown.value === 0) {
    clearTimeout(timer);
    countdown.value = 300;
    btnDisabled.value = false;
    return false;
  }
  countdown.value--;
};
const getCode = () => {
  const params = {
    tel: '0' + formdata.value.tel.replace(/(\s)/g, ''),
    username: formdata.value.username.toLowerCase(),
    flag: 'text',
    ty: '2'
  };

  timer = setInterval(timeLeave, 1000);
  APIs.sendOfflineSms(params as any)
    .then((res: any) => {
      Toast('Gửi Mã Xác Minh Thành Công');
      btnDisabled.value = true;
      formdata2.value.sid = res.split(':')[0];
      formdata2.value.ts = res.split(':')[1];
    })
    .catch((err: any) => {
      console.error('err', err);
    });
};

const validatePhone = (rule: any, value: any, callback: any) => {
  console.error('valuevaluevaluevaluevalue', value);
  if (value === '') {
    callback(new Error('Phải là sự kết hợp của 5-14 chữ cái Tiếng Anh và số, bắt đầu bằng chữ cái'));
  } else if (!phoneRegexp.test(value.replace(/(\s)/g, ''))) {
    callback(new Error('Vui lòng nhập 9 chữ số, không bắt đầu bằng số 0'));
  } else {
    callback();
  }
};

/**
 * 表单验证
 *
 */

const validatePwd = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Phải là sự kết hợp của 8-20 chữ cái Tiếng Anh và số'));
  } else if (!pwdRegexp.test(value)) {
    callback(new Error('Phải là sự kết hợp của 8-20 chữ cái Tiếng Anh và số'));
  } else {
    if (formdata2.value.reset_pwd !== '') {
      if (!form_dom2.value) return;
      form_dom2.value.validateField('reset_pwd', () => null);
    }

    callback();
  }
};
const validateResetPwd = (rule: any, value: any, callback: any) => {
  if (value !== formdata2.value.pwd) {
    callback(new Error('Mật khẩu 2 lần xác nhận không giống nhau'));
  } else {
    callback();
  }
};

const validateCode = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Vui lòng nhập 4 số mã xác nhận'));
  } else if (!/^[0-9]{4}$/.test(value)) {
    callback(new Error('Vui lòng nhập 4 số mã xác nhận'));
  } else {
    callback();
  }
};
const rules = reactive<any>({
  pwd: [{ validator: validatePwd, trigger: 'change' }],
  reset_pwd: [{ validator: validateResetPwd, trigger: 'change' }],
  code: [{ validator: validateCode, trigger: 'change' }]
});

const rules1 = reactive<any>({
  tel: [{ validator: validatePhone, trigger: 'change' }]
});
const stepThree = () => {
  router.push('/');
  LogInAndRegister('LogIn');
};
</script>

<template>
  <div class="find-password">
    <CgContainer type="parent" padding="20" radius="12" :height="660">
      <template #content>
        <div class="right">
          <cg-icon width="24" name="i_grey_close" @click="$router.push('/')" />
        </div>
        <div class="container">
          <div class="img-box">
            <app-image :src="`/step${imgSrc}.png`" />
          </div>
          <div v-if="imgSrc == '1'" class="star">
            <div class="star-empty"></div>
            <el-form :model="formdata" ref="form_dom" label-width="180px" :rules="rules1" label-position="left">
              <!-- 用户名 -->
              <el-form-item
                label="Tên Đăng Nhập"
                prop="username"
                :rules="[
                  { required: true, message: 'Phải là sự kết hợp của 5-14 chữ cái Tiếng Anh và số, bắt đầu bằng chữ cái', trigger: ['change'] },
                  { pattern: usrRegexp, message: 'Phải là sự kết hợp của 5-14 chữ cái Tiếng Anh và số, bắt đầu bằng chữ cái', trigger: ['change'] }
                ]"
              >
                <cg-input
                  :limit="/[^a-z0-9A-Z]/g"
                  class="input-box"
                  placeholder="Vui lòng nhập tên người dùng"
                  type="text"
                  maxlength="14"
                  v-model.lowercase="formdata.username"
                  :clear="true"
                  @input="formdata.username = formdata.username.replace(/[^\da-zA-Z]/g, '')"
                />
              </el-form-item>
              <div class="empty"></div>
              <!-- 电话号码 -->
              <el-form-item label="Số Điện Thoại" prop="tel">
                <cg-input class="input-box" maxlength="11" :split="true" :limit="/[^\d]/g" v-model="formdata.tel" :clear="true" placeholder="Vui lòng nhập số điện thoại" type="text">
                  <template #prefix>
                    <div class="prefix">
                      <!-- <cg-icon class="h_full flex-middle" :width="24" name="i_phone" /> -->
                      <div>+84</div>
                    </div>
                  </template>
                </cg-input>
              </el-form-item>
            </el-form>
            <div class="btn"><cg-button :width="300" @click="setpOne()">BƯỚC TIẾP THEO</cg-button></div>
          </div>
          <div v-if="imgSrc == '2'">
            <el-form :model="formdata2" ref="form_dom2" :rules="rules" label-width="180px" label-position="left">
              <!-- 新密码 -->
              <el-form-item label="Mật Khẩu Mới" prop="pwd">
                <cg-input class="input-box" placeholder="Vui lòng nhập mật khẩu mới" type="password" :clear="true" maxlength="20" v-model="formdata2.pwd" />
              </el-form-item>
              <div class="empty"></div>
              <!-- 确认新密码 -->
              <el-form-item label="Xác Nhận Mật Khẩu Mới" prop="reset_pwd">
                <cg-input class="input-box" maxlength="20" v-model="formdata2.reset_pwd" :clear="true" placeholder="Vui lòng nhập lại mật khẩu mới" type="password" />
              </el-form-item>
              <div class="empty"></div>
              <!-- 验证码 -->
              <el-form-item label="Mã Xác Nhận" prop="code">
                <div class="code-container">
                  <div class="flex-1">
                    <cg-input class="input-box" maxlength="4" v-model="formdata2.code" :clear="true" placeholder="Vui lòng nhập mã xác nhận" type="number" />
                  </div>
                  <cg-button whiteStyle :width="180" :disabled="btnDisabled" :height="40" :font-size="15" class="code-btn" @click.prevent="getCode">{{
                    btnDisabled ? countdown + 'GIÂY' : 'LẤY MÃ XÁC NHẬN'
                  }}</cg-button>
                </div>
              </el-form-item>
            </el-form>
            <p class="red-tips">＊Vui lòng sử dụng lưu lượng di động để nhận mã xác nhận. Cố gắng tránh sử dụng WiFi</p>
            <div class="btn"><cg-button :width="300" @click="setpTwo()">BƯỚC TIẾP THEO</cg-button></div>
          </div>
          <div v-if="imgSrc == '3'">
            <CgContainer type="smallContainer" padding="30" radius="8" border="1">
              <template #content>
                <div class="done">
                  <app-image src="/done.png" class="img-size" />
                  <p>Bạn Đã Đổi Mật Khẩu Thành Công</p>
                </div>
              </template>
            </CgContainer>
            <div class="btn"><cg-button :width="300" @click="stepThree()">TRỞ VỀ ĐĂNG NHẬP</cg-button></div>
          </div>
          <p class="tips" v-if="imgSrc != '3'">
            Nếu người dùng chưa liên kết số điện thoại, vui lòng liên hệ
            <span @click="goToServeUrl">CSKH</span> để được hỗ trợ.
          </p>
        </div>
      </template>
    </CgContainer>
  </div>
</template>
<script lang="ts">
export default {
  name: 'BetRecord'
};
</script>

<style lang="scss" scoped>
.find-password {
  width: 1200px;
  height: 660px;
  margin: 20px auto;
  margin-bottom: 80px;

  .right {
    display: flex;
    justify-content: flex-end;
  }

  .cg_icon {
    cursor: pointer;
  }

  .el-form-item__label {
    font: var(--cg-font-text);
  }
}

.container {
  width: 600px;
  margin: 0 auto;
}

.img-box {
  height: 163px;
}

.empty {
  height: 20px;
}

.btn {
  display: flex;
  justify-content: center;
  margin: 30px 0 12px 0;
}

.tips {
  margin: 0 auto;
  width: 398px;
  font: var(--cg-font-text);
  text-align: center;
  color: var(--cg-color-grey1);

  span {
    color: var(--cg-color-blue5);
    text-decoration: underline;
    cursor: pointer;
  }
}

.red-tips {
  margin-top: 16px;
  color: var(--cg-color-red);
  font: var(--cg-font-text6);
}

.img-size {
  width: 60px;
}

.done {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  p {
    margin-top: 6px;
    font: var(--cg-font-text);
    color: var(--cg-color-grey1);
  }
}

.code-container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .code-btn {
    margin-left: 9px;
  }
}

.star {
  position: relative;

  .star-empty {
    position: absolute;
    left: 0;
    right: 0;
    width: 5px;
    height: 150px;
    background-color: var(--cg-color-white);
  }
}
:deep(.el-input--prefix .el-input__inner) {
  padding-left: 50px;
}
:deep(.el-input__prefix) {
  left: 12px;
}
.prefix {
  display: flex;
  width: 54px;
  height: 38px;
  align-items: center;
  justify-content: space-between;
  color: var(--cg-color-grey1);
  font: var(--cg-font-text);
}
</style>
