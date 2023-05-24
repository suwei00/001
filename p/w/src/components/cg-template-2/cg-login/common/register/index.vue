<script setup lang="ts">
import { CgInput, CgIcon, CgButton } from '@/components/cg-template-2';
import Toast from '@/components/cg-template-2/toast';
import APIs from '@/http/blue-apis';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import getDeviceInfo from '@/utils/getDeviceInfo';
import { CloseDialog } from '@/utils/logIn';
import { useCountDown } from '@vant/use';
import { computed, onMounted, reactive, ref, nextTick } from 'vue';
import { useRequest } from 'vue-request';
import bus from '@/mixins/bus';
import router from '@/router';

const props = defineProps<{ swch: boolean }>();
const emit = defineEmits(['update:type', 'update:swch']);
const userInfo = userInfoStateStore();

const invitationRef = ref();
const usernameRef = ref();
const passwordRef = ref();
const rePawordRef = ref();
const phoneRef = ref();
const codeRef = ref();
const invitationCodeStute = ref(true);
const invitationCode: any = ref('');

const isDisabled = ref(true);
const showBtnBox = ref(false);
const user_exist = ref(false);
const phone_exist = ref(false);

const { run: GetNeedcode, data: needcode } = useRequest(APIs.getNeedcode, {
  manual: true,
  initialData: false,
  onSuccess: (data: boolean) => {
    userInfo.setNeedcode(data);
  }
});

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

const Form: any = reactive({
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

const { run } = useRequest((username: string) => APIs.checkUsernameAvailable({ username }), {
  manual: true,
  throttleInterval: 1000,
  onError: (data: any) => {
    user_exist.value = data === '1062';
    usernameRef.value.setValidate(data === '1062');
  }
});
// voice text
const { run: getOfflineSms } = useRequest((username: string, tel: string, flag: string) => APIs.sendOfflineSms({ username, tel: `0${tel.replace(/(\s)/g, '')}`, flag, ty: 1 }), {
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
    localStorage.setItem('REGISTER_STATE', JSON.stringify(registerState));
  },
  onError: (data: any) => {
    phone_exist.value = data === '1050';
    phoneRef.value.setValidate(data === '1050');
  }
});

const { run: headleRegister } = useRequest(data => APIs.register(data), {
  manual: true,
  onSuccess: () => {
    userInfo.getUserInfo();
    CloseDialog();
    bus.emit('show_preferential', true);
    nextTick(() => {
      localStorage.removeItem('REGISTER_STATE');
      router.push('/');
    });
  }
});

const current = computed(() => countDown.current.value);
const codeCurrent = computed(() => Math.floor(codeCountDown.current.value.total / 1000));

const handleSwitch = () => {
  if (props.swch) {
    const userValidate = usernameRef.value.validate();
    const paswValidate = passwordRef.value.validate();
    const phoValidate = phoneRef.value.validate();
    const codeValidate = codeRef.value.validate();

    let invitationValidate = true;
    if (invitationRef.value) {
      invitationValidate = invitationRef.value.validate();
    }
    if (!user_exist.value && !phone_exist.value && userValidate && paswValidate && phoValidate && codeValidate && invitationValidate) {
      if (Form.re_pwd !== Form.password) {
        pswSame.value = true;
        rePawordRef.value.setValidate(true);
      } else {
        const LINK_ID = sessionStorage.getItem('LINK_ID') || '';
        const params = {
          device_no: visitorId.value,
          username: Form.username.toLowerCase(),
          password: Form.password,
          phone: `0${Form.phone.replace(/(\s)/g, '')}`,
          verify_code: Form.verify_code,
          link_id: LINK_ID,
          code: invitationCode.value,
          reg_url: LINK_ID ? `${window.location.href}entry/register?id=${LINK_ID}` : window.location.href,
          sid: registerState.sid,
          ts: registerState.ts
        };
        if (!registerState.sid || !registerState.ts) {
          Toast('Vui Lòng Lấy Mã Xác Minh Trước');
        } else {
          headleRegister(params);
        }
      }
    }
  } else {
    emit('update:swch', true);
  }
};

const getAvailable = () => {
  user_exist.value = false;
  if (!Form.username) return;
  const userValidate = usernameRef.value.validate();
  if (userValidate) {
    run(Form.username);
  }
};

const pswSame = ref(false);

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
  return user_exist.value || !useReg.test(Form.username) || !pswReg.test(Form.password) || !phoReg.test(Form.phone.replace(/(\s)/g, '')) || Form.re_pwd != Form.password;
});

let visitorId = ref();
onMounted(() => {
  const REGISTER_STATE = localStorage.getItem('REGISTER_STATE');
  if (REGISTER_STATE) {
    const _REGISTER_STATE = JSON.parse(REGISTER_STATE);
    registerState.sid = _REGISTER_STATE.sid;
    registerState.ts = _REGISTER_STATE.ts;
  }
  const _LINK_ID = sessionStorage.getItem('LINK_ID');
  if (_LINK_ID) {
    invitationCodeStute.value = false;
  } else {
    GetNeedcode();
  }
  getDeviceInfo().then(res => {
    visitorId.value = res.webrtcid;
  });
  const _time = new Date().getTime();
  const xz_time = localStorage.getItem('YZ_TIME');
  const _c = _time - Number(xz_time);
  if (_c < 1000 * 60 * 30) {
    isDisabled.value = false;
  } else {
    isDisabled.value = true;
    countDown.reset(10 * 1000);
    countDown.start();
  }
});
</script>

<template>
  <div class="register">
    <template v-if="swch">
      <cg-input
        v-if="invitationCodeStute"
        :white="true"
        class="input_item"
        autocomplete="new-password"
        ref="invitationRef"
        maxlength="9"
        v-model="invitationCode"
        :placeholder="needcode ? 'Mã Giới Thiệu（Bắt Buộc）' : 'Mã Giới Thiệu（Không Bắt Buộc）'"
        :pattern="needcode || invitationCode ? /^[a-z0-9A-Z]{6,9}$/ : ''"
        :limit="/[^a-z0-9A-Z]/g"
        type="text"
        :clear="true"
        message="Vui lòng nhập 6-9 chữ số mã giới thiệu"
      >
        <template #prefix>
          <cg-icon class="h_full flex-middle" :width="24" name="i_invitation" />
        </template>
      </cg-input>
      <cg-input
        :clear="true"
        class="input_item"
        ref="usernameRef"
        :pattern="/^[a-z]{1}[a-z0-9]{4,13}$/"
        maxlength="14"
        autocomplete="off"
        :limit="/[^a-z0-9A-Z]/g"
        :message="user_exist ? 'Tên người dùng đã tồn tại' : 'Phải là sự kết hợp của 5-14 chữ cái Tiếng Anh và số, bắt đầu bằng chữ cái'"
        v-model.lowercase="Form.username"
        placeholder="Tên Đăng Nhập"
        @blur="getAvailable"
      >
        <template #prefix>
          <cg-icon class="h_full flex-middle" :width="24" name="i_user" />
        </template>
      </cg-input>

      <cg-input
        :clear="true"
        class="input_item"
        :limit="/[^a-z0-9A-Z]/g"
        :pattern="/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/"
        message="Phải là sự kết hợp của 8-20 chữ cái Tiếng Anh và số"
        maxlength="20"
        ref="passwordRef"
        autocomplete="off"
        @input="validatePwas"
        v-model="Form.password"
        type="password"
        placeholder="Mật Khẩu"
      >
        <template #prefix>
          <cg-icon class="h_full flex-middle" :width="24" name="i_pasw" />
        </template>
      </cg-input>

      <cg-input
        :clear="true"
        class="input_item"
        :limit="/[^a-z0-9A-Z]/g"
        message="Mật khẩu 2 lần xác nhận không giống nhau"
        maxlength="20"
        autocomplete="off"
        ref="rePawordRef"
        v-model="Form.re_pwd"
        @input="validatePwas"
        type="password"
        placeholder="Xác Nhận Mật Khẩu"
      >
        <template #prefix>
          <cg-icon class="h_full flex-middle" :width="24" name="i_pasw" />
        </template>
      </cg-input>
      <cg-input
        :suffixIn="true"
        :clear="true"
        type="text"
        class="input_item"
        :pattern="/^[1-9]{1}[0-9]{8}$/"
        ref="phoneRef"
        :message="phone_exist ? 'Số điện thoại đã tồn tại' : 'Vui lòng nhập 9 chữ số, không bắt đầu bằng số 0'"
        maxlength="11"
        :split="true"
        :limit="/[^\d]/g"
        v-model="Form.phone"
        placeholder="Số Điện Thoại"
      >
        <template #prefix>
          <div class="prefix">
            <cg-icon class="h_full flex-middle" :width="24" name="i_phone" />
            <div>+84</div>
          </div>
        </template>
      </cg-input>
      <div class="safety flex jc-sb" :class="{ safety_cont: showBtnBox }">
        <cg-input
          :clear="true"
          type="text"
          class="input_item"
          :pattern="/^[0-9]{4}$/"
          :limit="/[^\d]/g"
          autocomplete="off"
          ref="codeRef"
          message="Vui lòng nhập 4 số mã xác nhận"
          maxlength="4"
          v-model="Form.verify_code"
          placeholder="Nhập Mã Xác Nhận"
        >
          <template #prefix>
            <cg-icon class="h_full flex-middle" :width="24" name="i_safety" />
          </template>
        </cg-input>
        <cg-button :disabled="disabledSendCodeBtn || codeCurrent > 0" whiteStyle @click="getOfflineSms(Form.username, Form.phone, 'text')"
          >{{ codeCurrent > 0 ? `${codeCurrent} GIÂY` : 'Lấy mã xác nhận' }}
        </cg-button>
        <cg-button v-if="showBtnBox" whiteStyle @click="getOfflineSms(Form.username, Form.phone, 'voice')">XÁC MINH GIỌNG NÓI</cg-button>
      </div>
      <div class="warn">＊Vui lòng sử dụng lưu lượng di động để nhận mã xác nhận, cố gắng tránh sử dụng WiFi</div>
    </template>
    <template v-else>
      <div class="illustrate">
        <p class="title">ĐIỀU CẦN CHÚ Ý KHI ĐĂNG KÝ TÀI KHOẢN</p>
        <div class="desc">
          <p>Lưu ý dành cho hội viên:</p>
          <p class="indentation">Hoan nghênh quý khách đăng ký tài khoản hội viên trên nền tảng <span class="name">P3</span>, chúng tôi có một số điểm lưu ý mong quý khách nắm rõ:</p>
          <p class="flex">
            <span>1. </span>
            <span>Mỗi cá nhân chỉ được đăng ký 1 tài khoản duy nhất, vui lòng không đăng ký lại hoặc giúp hội viên cấp dưới đăng ký tài khoản.</span>
          </p>
          <p class="flex">
            <span>2.</span>
            <span>Tên tài khoản đăng nhập không bao gồm thông tin số điện thoại nhằm bảo mật thông tin cá nhân.</span>
          </p>
          <p class="flex">
            <span>3.</span>
            <span>Nạp tiền vui lòng đăng nhập trang chủ nhận thông tin tài khoản, không tin tưởng bất kỳ ai (kể cả đại lý cấp trên) gửi riêng thông tin tài khoản yêu cầu chuyển tiền.</span>
          </p>
          <p class="flex">
            <span>4.</span>
            <span>Vui lòng liên kết số điện thoại chính chủ, bởi khi thực hiện rút tiền sẽ cần nhận mã xác nhận.</span>
          </p>
        </div>
        <p class="warn" style="margin-top: 14px">Vui lòng đọc kỹ nội dung thông báo, 10s sau có thể tiến hành đăng ký</p>
      </div>
    </template>
    <cg-button class="but" v-if="swch" :disabled="isDisabled" @click="handleSwitch">ĐĂNG KÝ</cg-button>
    <cg-button class="but" v-else :disabled="isDisabled" @click="handleSwitch">{{ current.seconds > 0 ? `${current.seconds} GIÂY` : 'TÔI ĐÃ HIỂU' }}</cg-button>
    <div class="pointer">Đã Có Tài Khoản? <span class="underline" @click="emit('update:type', 'LogIn')">Mời Đăng Nhập</span></div>
  </div>
</template>

<style lang="scss" scoped>
.register {
  .illustrate {
    padding: 20px 22px;
    border-radius: 8px;
    border: 1.5px solid var(--cg-color-blue8);
    box-shadow: var(--cg-register-shadow);
    background: var(--cg-color-white);

    .title {
      width: 210px;
      margin: 0 auto 12px;
      color: var(--cg-color-blue5);
      font: var(--cg-font-text3);
    }

    .desc {
      color: var(--cg-color-grey1);
      font: var(--cg-font-text1);
      line-height: 17px;

      .name {
        color: var(--cg-color-blue5);
      }

      p {
        margin-top: 5px;
      }

      .indentation {
        // 缩进两个字符
        text-indent: 1em;
      }
    }
  }

  .warn {
    color: var(--cg-color-red);
    font: var(--cg-font-text6);
  }

  .but {
    margin-top: 12px;
    width: 100%;
    margin-bottom: 12px;
  }

  .pointer {
    text-align: center;
  }

  .input_item {
    margin-bottom: 12px;
    :deep(.el-input__inner) {
      padding-left: 40px;
    }
    :deep(.el-input__prefix) {
      left: 10px;
    }
  }

  .safety {
    .input_item {
      width: 250px;
    }

    :deep(.cg-button) {
      width: 180px;
      height: 40px;
      font: var(--cg-font-text1);
    }
  }

  .safety_cont {
    .input_item {
      width: 200px;
    }

    :deep(.cg-button) {
      width: 110px;
      height: 40px;
      font: var(--cg-font-text1);
      padding: 0 10px;
    }
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
}
</style>
