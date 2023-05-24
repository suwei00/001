<script setup lang="ts">
import { useCountDown } from '@vant/use';
import { computed, ref, onMounted, reactive } from 'vue';
import { CgIcon, CgField, CgButton } from '@cg-template-2-components/index';
import getDeviceInfo from '@/utils/getDeviceInfo';
import { useRoute, useRouter } from 'vue-router';
import APIs from '@/http/blue-apis';
import { useRequest } from 'vue-request';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { Toast } from 'vant';
import { useLoading } from '@/hooks/useLoading';
import { useAppStore } from '@/store-pinia';
import { DownloadAppDialog } from '@/mixins/AppDownload';
const { startLoading, closeLoading } = useLoading();

const router = useRouter();
const route = useRoute();

const userInfo = userInfoStateStore();
const appStore = useAppStore();

const state = ref('init');
const isDisabled = ref(false);
const visitorId = ref();
const pswSame = ref(false);
const showBtnBox = ref(false);
const user_exist = ref(false);
const phone_exist = ref(false);

const invitationRef = ref();
const usernameRef = ref();
const passwordRef = ref();
const rePawordRef = ref();
const phoneRef = ref();
const codeRef = ref();
const invitationCodeStute = ref(true);
const invitationCode: any = ref('');

const countDown = useCountDown({
  time: 0,
  onFinish: () => {
    localStorage.setItem('YZ_TIME', new Date().getTime().toString());
    isDisabled.value = false;
    countDown.reset();
  }
});

const codeCountDown = useCountDown({
  time: 0,
  onFinish: () => {
    showBtnBox.value = true;
    codeCountDown.reset();
  }
});

const current = computed(() => countDown.current.value);
const codeCurrent = computed(() => Math.floor(codeCountDown.current.value.total / 1000));

const Form = reactive({
  username: '',
  password: '',
  phone: '',
  verify_code: '',
  re_pwd: ''
});

const registerState = reactive({
  sid: '',
  ts: ''
});

const { run: GetNeedcode, data: needcode } = useRequest(APIs.getNeedcode, {
  manual: true,
  initialData: false
});

const { run: headleRegister } = useRequest(data => APIs.register(data), {
  manual: true,
  onSuccess: () => {
    userInfo.getUserInfo();
    appStore.getBankTree();
    localStorage.removeItem('REGISTER_STATE');
    router.push('/home');
  },
  onAfter: () => {
    closeLoading();
  }
});

const submitRegister = () => {
  const userValidate = usernameRef.value.validate();
  const paswValidate = passwordRef.value.validate();
  const phoValidate = phoneRef.value.validate();
  const codeValidate = codeRef.value.validate();
  let invitationValidate = true;
  if (invitationRef.value) {
    invitationValidate = invitationRef.value.validate();
  }
  if (
    !user_exist.value &&
    !phone_exist.value &&
    userValidate &&
    paswValidate &&
    phoValidate &&
    codeValidate &&
    invitationValidate
  ) {
    if (Form.re_pwd !== Form.password) {
      pswSame.value = true;
      rePawordRef.value.setValidate(true);
    } else {
      const params = {
        device_no: visitorId.value,
        username: Form.username,
        password: Form.password,
        phone: `0${Form.phone.replace(/(\s)/g, '')}`,
        verify_code: Form.verify_code,
        link_id: sessionStorage.getItem('LINK_ID') || '',
        code: invitationCode.value,
        reg_url: window.location.href,
        sid: registerState.sid,
        ts: registerState.ts
      };
      if (!registerState.sid || !registerState.ts) {
        Toast('Vui Lòng Lấy Mã Xác Minh Trước');
      } else {
        startLoading();
        headleRegister(params);
      }
    }
  }
};

const handleSwitch = () => {
  if (state.value === 'init') {
    state.value = 'register';
  } else {
    submitRegister();
  }
};

const goPath = (path: string) => {
  router.push(path);
};

const { run } = useRequest((username: string) => APIs.checkUsernameAvailable({ username }), {
  manual: true,
  throttleInterval: 1000,
  onError: (data: any) => {
    user_exist.value = data === '1062';
    usernameRef.value.setValidate(data === '1062');
  }
});

// voice text
const { run: getOfflineSms } = useRequest(
  (username: string, tel: string, flag: string) =>
    APIs.sendOfflineSms({ username, tel: `0${tel}`, flag, ty: 1 }),
  {
    manual: true,
    throttleInterval: 1000,
    onSuccess: (data: any) => {
      showBtnBox.value = false;
      codeCountDown.reset(300 * 1000);
      codeCountDown.start();
      Toast('Gửi Mã Xác Minh Thành Công');
      const [sid, ts] = data.split(':');
      registerState.sid = sid;
      registerState.ts = ts;
      localStorage.setItem('REGISTER_STATE',JSON.stringify(registerState))
    },
    onError: (data: any) => {
      phone_exist.value = data === '1050';
      phoneRef.value.setValidate(data === '1050');
    }
  }
);

const getAvailable = () => {
  user_exist.value = false;
  if (!Form.username) return;
  const userValidate = usernameRef.value.validate();
  if (userValidate) {
    run(Form.username);
  }
};

const validatePwas = () => {
  if (Form.re_pwd) {
    pswSame.value = Form.re_pwd !== Form.password;
    rePawordRef.value.setValidate(Form.re_pwd !== Form.password);
  }
};

const useReg = /^[a-z]{1}[a-z0-9]{4,13}$/;
const pswReg = /^[A-Za-z0-9]{8,20}$/;
const phoReg = /^[1-9]{1}[0-9]{8}$/;
const disabledSendCodeBtn = computed(() => {
  return (
    user_exist.value ||
    !useReg.test(Form.username) ||
    !pswReg.test(Form.password) ||
    !phoReg.test(Form.phone.replace(/(\s)/g, '')) ||
    Form.re_pwd != Form.password
  );
});

onMounted(() => {
  const REGISTER_STATE =  localStorage.getItem('REGISTER_STATE')
  if(REGISTER_STATE){
    const _REGISTER_STATE = JSON.parse(REGISTER_STATE)
    registerState.sid = _REGISTER_STATE.sid;
    registerState.ts = _REGISTER_STATE.ts;
  }

  const _LINK_ID = sessionStorage.getItem('LINK_ID') || route?.query?.id;
  if (_LINK_ID) {
    invitationCodeStute.value = false;
    sessionStorage.setItem('LINK_ID', _LINK_ID.toString());
    DownloadAppDialog(() => {});
  } else {
    GetNeedcode();
  }
  // aSD
  getDeviceInfo().then(res => {
    visitorId.value = res.webrtcid;
  });
  const _time = new Date().getTime();
  const xz_time = localStorage.getItem('YZ_TIME');
  const _c = _time - Number(xz_time);
  if (_c < 1000 * 60 * 30) {
    isDisabled.value = false;
    state.value = 'register';
  } else {
    isDisabled.value = true;
    state.value = 'init';
    countDown.reset(10 * 1000);
    countDown.start();
  }
});
</script>

<template>
  <div class="register">
    <div class="title" v-if="state !== 'init'">ĐĂNG KÝ</div>
    <div class="content">
      <div class="describe" v-if="state === 'init'">
        <div class="describe_title">ĐIỀU CẦN CHÚ Ý KHI ĐĂNG KÝ TÀI KHOẢN</div>
        <div class="describe_divider"></div>
        <div class="describe_text">
          <div class="big_text">Lưu ý dành cho hội viên:</div>
          <div class="big_text mtb">
                Hoan nghênh quý khách đăng ký tài khoản hội viên trên nền tảng <span>P3</span>,
            chúng tôi có một số điểm lưu ý mong quý khách nắm rõ:
          </div>
          <ul>
            <li>
              <span class="serial">1.</span>
              <span>
                Mỗi cá nhân chỉ được đăng ký 1 tài khoản duy nhất, vui lòng không đăng ký lại hoặc
                giúp hội viên cấp dưới đăng ký tài khoản.
              </span>
            </li>
            <li>
              <span class="serial">2.</span>
              <span>
                Tên tài khoản đăng nhập không bao gồm thông tin số điện thoại nhằm bảo mật thông tin
                cá nhân.
              </span>
            </li>
            <li>
              <span class="serial">3.</span>
              <span>
                Nạp tiền vui lòng đăng nhập trang chủ nhận thông tin tài khoản, không tin tưởng bất
                kỳ ai (kể cả đại lý cấp trên) gửi riêng thông tin tài khoản yêu cầu chuyển tiền.
              </span>
            </li>
            <li>
              <span class="serial">4.</span>
              <span>
                Vui lòng liên kết số điện thoại chính chủ, bởi khi thực hiện rút tiền sẽ cần nhận mã
                xác nhận.
              </span>
            </li>
          </ul>
          <div class="error_text error_text_pj">
            Vui lòng đọc kỹ nội dung thông báo, 10s sau có thể tiến hành đăng ký
          </div>
        </div>
      </div>
      <template v-else>
        <cg-field
          v-if="invitationCodeStute"
          :white="true"
          class="mb28"
          autocomplete="new-password"
          ref="invitationRef"
          maxlength="9"
          v-model="invitationCode"
          :placeholder="needcode ? 'Mã Giới Thiệu（Bắt Buộc）' : 'Mã Giới Thiệu（Không Bắt Buộc）'"
          :pattern="needcode || invitationCode ?/^[a-z0-9A-Z]{6,9}$/ :''"
          :limit="/[^a-z0-9A-Z]/g"
          type="text"
          :clear="true"
          message="Vui lòng nhập 6-9 chữ số mã giới thiệu"
        >
          <template #left>
            <cg-icon width="44" name="i_invitation" />
          </template>
        </cg-field>
        <cg-field
          :white="true"
          class="mb28"
          autocomplete="new-password"
          ref="usernameRef"
          maxlength="14"
          v-model.lowercase="Form.username"
          placeholder="Tên Đăng Nhập"
          :pattern="/^[a-z]{1}[a-z0-9]{4,13}$/"
          :limit="/[^a-z0-9A-Z]/g"
          @blur="getAvailable"
          type="text"
          :clear="true"
          :message="
            user_exist
              ? 'Tên người dùng đã tồn tại'
              : 'Phải là sự kết hợp của 5-14 chữ cái Tiếng Anh và số, bắt đầu bằng chữ cái'
          "
        >
          <template #left>
            <cg-icon width="44" name="i_user" />
          </template>
        </cg-field>

        <cg-field
          :white="true"
          class="mb28"
          autocomplete="new-password"
          ref="passwordRef"
          maxlength="20"
          v-model="Form.password"
          :pattern="/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/"
          :limit="/[^a-z0-9A-Z]/g"
          message="Phải là sự kết hợp của 8-20 chữ cái Tiếng Anh và số"
          placeholder="Mật Khẩu"
          @input="validatePwas"
          type="password"
          :clear="true"
        >
          <template #left>
            <cg-icon width="44" name="i_pasw" />
          </template>
        </cg-field>

        <cg-field
          :white="true"
          class="mb28"
          ref="rePawordRef"
          autocomplete="new-password"
          maxlength="20"
          v-model="Form.re_pwd"
          :limit="/[^a-z0-9A-Z]/g"
          message="Mật khẩu 2 lần xác nhận không giống nhau"
          type="password"
          placeholder="Xác Nhận Mật Khẩu"
          @input="validatePwas"
          :clear="true"
        >
          <template #left>
            <cg-icon width="44" name="i_pasw" />
          </template>
        </cg-field>

        <cg-field
          :white="true"
          class="mb28"
          autocomplete="new-password"
          :pattern="/^[1-9]{1}[0-9]{8}$/"
          ref="phoneRef"
          :message="
            phone_exist
              ? 'Số điện thoại đã tồn tại'
              : 'Vui lòng nhập 9 chữ số, không bắt đầu bằng số 0'
          "
          maxlength="11"
          :split="true"
          :limit="/[^\d]/g"
          v-model="Form.phone"
          placeholder="Số Điện Thoại"
          :clear="true"
        >
          <template #left>
            <div class="flex ai-c">
              <cg-icon width="44" name="i_phone" />
              <span class="phone">+84</span>
            </div>
          </template>
        </cg-field>
        <cg-field
          :white="true"
          class="mb28"
          autocomplete="new-password"
          :pattern="/^[0-9]{4}$/"
          ref="codeRef"
          message="Vui lòng nhập 4 số mã xác nhận"
          maxlength="4"
          v-model="Form.verify_code"
          placeholder="Nhập Mã Xác Nhận"
          :limit="/[^\d]/g"
          :clear="true"
        >
          <template #left>
            <cg-icon width="44" name="i_safety" />
          </template>
        </cg-field>
        <div class="error_text mb28">
          ＊Vui lòng sử dụng lưu lượng di động để nhận mã xác nhận. Cố gắng tránh sử dụng WiFi
        </div>
      </template>

      <div class="w_full mb28" v-if="state !== 'init'" :class="{ safety_cont: showBtnBox }">
        <cg-button
          class="flex-1 w_full"
          :disabled="disabledSendCodeBtn || codeCurrent > 0"
          whiteStyle
          @click="getOfflineSms(Form.username, Form.phone.replace(/(\s)/g, ''), 'text')"
        >
          <span class="cont_span">
            {{ codeCurrent > 0 ? `${codeCurrent} GIÂY` : 'LẤY MÃ XÁC NHẬN' }}
          </span>
        </cg-button>
        <cg-button
          class="flex-1"
          v-if="showBtnBox"
          whiteStyle
          @click="getOfflineSms(Form.username, Form.phone.replace(/(\s)/g, ''), 'voice')"
        >
          XÁC MINH GIỌNG NÓI
        </cg-button>
      </div>

      <cg-button class="w_full mb28" :disabled="isDisabled" @click="handleSwitch">
        {{
          current.seconds > 0
            ? `${current.seconds} GIÂY`
            : state === 'init'
            ? 'TÔI ĐÃ HIỂU'
            : 'ĐĂNG KÝ'
        }}
      </cg-button>
      <div class="pointer">
        Đã Có Tài Khoản?
        <span class="underline" @click="goPath('/entry/login')">Mời Đăng Nhập</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 130px;

  .title {
    font: var(--cg-font-h1);
    color: var(--cg-color-blue1);
    margin-bottom: 50px;
  }

  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 85px;
    font: var(--cg-font-text4);
    color: var(--cg-color-black1);

    .describe {
      margin-top: 48px;
      width: 100%;
      border: 3px solid var(--cg-color-blue11);
      border-radius: var(--cg-border-radius);
      box-shadow: 0px 8px 20px var(--cg-color-grey8);
      background: var(--cg-color-white3);
      padding-top: 24px;
      margin-bottom: 48px;

      &_title {
        text-align: center;
        font: var(--cg-font-h1);
        color: var(--cg-color-blue1);
      }

      &_divider {
        width: 386px;
        height: 2px;
        background: var(--cg-gradient-divider);
        margin: 6px auto 0;
      }

      &_text {
        padding: 20px;

        .big_text {
          font: var(--cg-font-text1);
          line-height: 32px;

          span {
            color: var(--cg-color-blue1);
          }
        }

        .mtb {
          margin: 20px 0 12px;
        }

        ul > li {
          display: flex;
          margin-bottom: 8px;
          line-height: 30px;
          font: var(--cg-font-text10);

          .serial {
            padding-right: 15px;
          }
        }
      }
    }
  }
}

.safety_cont {
  display: flex;
  justify-content: space-between;

  :deep(.cg-button) {
    padding: 0 20px !important;
  }

  :deep(.cg-button):first-child {
    margin-right: 10px;
  }

  :deep(.cg-button):last-child {
    margin-left: 10px;
  }

  .cont_span {
    width: 180px;
    display: block;
    margin: 0 auto;
  }
}

.mb28 {
  margin-bottom: 28px;
}

.phone {
  color: var(--cg-color-black1);
  padding: 0 10px;
}

:deep(.van-field__control) {
  font: var(--cg-font-text9) !important;
}

.error_text_pj {
  margin-top: 20px;
  line-height: 32px;
}
</style>
