<script setup lang="ts">
import { CgInput, CgIcon, CgButton, CgCheckbox } from '@/components/cg-template-2';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { onMounted, reactive, ref, watch } from 'vue';
import router from '@/router';
import { CloseDialog } from '@/utils/logIn';
import getDeviceInfo from '@/utils/getDeviceInfo';

interface Props {
  type: string;
}
defineProps<Props>();

const emit = defineEmits(['update:type']);

const userInfo = userInfoStateStore();
const usernameRef = ref();
const passwordRef = ref();
const storage = ref(true);

const Form = reactive({
  username: '',
  password: '',
  device_no: ''
});

const handleLogIn = () => {
  const userValidate = usernameRef.value.validate();
  const paswValidate = passwordRef.value.validate();
  if (userValidate && paswValidate) {
    userInfo.handleLogInApi(Form, storage.value);
    router.push('/');
  }
};

const forgetPassword = () => {
  router.push('/find-password');
  CloseDialog();
};
onMounted(() => {
  Form.username = localStorage.getItem('USER_NAME') || '';
  Form.password = localStorage.getItem('USER_PAW') || '';
  const MEMORY_PAW = sessionStorage.getItem('MEMORY_PAW');
  if (MEMORY_PAW) {
    storage.value = MEMORY_PAW === 'true';
  }
  // 获取设备号
  getDeviceInfo().then(res => {
    Form.device_no = res.webrtcid;
  });
});

watch(storage, newVal => {
  sessionStorage.setItem('MEMORY_PAW', newVal.toString());
});
</script>

<template>
  <div class="login">
    <cg-input
      :clear="true"
      :limit="/[^a-z0-9A-Z]/g"
      class="input_item"
      ref="usernameRef"
      :pattern="/^[a-z]{1}[a-z0-9]{4,13}$/"
      maxlength="14"
      message="Phải là sự kết hợp của 5-14 chữ cái Tiếng Anh và số, bắt đầu bằng chữ cái"
      v-model.lowercase="Form.username"
      placeholder="Tên Đăng Nhập"
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
      v-model="Form.password"
      type="password"
      placeholder="Mật Khẩu"
    >
      <template #prefix>
        <cg-icon class="h_full flex-middle" :width="24" name="i_pasw" />
      </template>
    </cg-input>

    <div class="flex jc-sb memory">
      <cg-checkbox class="pointer" v-model="storage" label="Ghi Nhớ Mật Khẩu" />
      <div class="underline pointer" @click="forgetPassword">Quên Mật Khẩu?</div>
    </div>
    <cg-button class="logo_but" @click="handleLogIn">Đăng nhập</cg-button>
    <div class="register pointer">Chưa Có Tài Khoản? <span class="underline" @click="emit('update:type', 'Register')">Đăng Ký Ngay</span></div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  .memory {
    margin-top: 4px;
  }

  .logo_but {
    width: 100%;
    margin-top: 28px;
    margin-bottom: 12px;
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

  .register {
    text-align: center;
  }
}
</style>
