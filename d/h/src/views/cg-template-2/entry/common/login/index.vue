<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { CgIcon, CgField, CgCheckbox, CgButton } from '@cg-template-2-components/index';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { useRouter } from 'vue-router';
import getDeviceInfo from '@/utils/getDeviceInfo';
const userInfo = userInfoStateStore();
const router = useRouter();

const storage = ref(true);

const usernameRef = ref();
const passwordRef = ref();
const Form = reactive({
  username: '',
  password: '',
  device_no:''
});

const handleLogIn = () => {
  const userValidate = usernameRef.value.validate();
  const paswValidate = passwordRef.value.validate();
  if (userValidate && paswValidate) {
    userInfo.handleLogInApi(Form, storage.value);
  }
};

const goPath = (path: string) => {
  router.push(path);
};

onMounted(() => {
  Form.username = localStorage.getItem('USER_NAME') || '';
  Form.password = localStorage.getItem('USER_PAW') || '';
  const MEMORY_PAW = sessionStorage.getItem('MEMORY_PAW');
  if (MEMORY_PAW) {
    storage.value = MEMORY_PAW === 'true';
  }
});

watch(storage, newVal => {
  sessionStorage.setItem('MEMORY_PAW', newVal.toString());
});

const sponsorList = [
  { id: 1, icon: 'i_spr_h', text: 'Real Madrid' },
  { id: 2, icon: 'i_spr_q', text: 'Chelsea' },
  { id: 3, icon: 'i_spr_s', text: 'Inter Milan' }
];

onMounted(()=>{
  getDeviceInfo().then(res => {
    Form.device_no = res.webrtcid;
  });
})
</script>

<template>
  <div class="login">
    <div class="title">ĐĂNG NHẬP</div>
    <div class="sponsor">
      <div class="sponsor_item" v-for="item in sponsorList" :key="item.id">
        <cg-icon width="91" :name="item.icon" />
        <div>{{ item.text }}</div>
      </div>
    </div>
    <div class="sponsor_title">
      <div>Đối Tác Hợp Tác Chính Thức</div>
      <app-image class="decorate" src="/logo/decorate.png" />
    </div>
    <div class="content">
      <cg-field
        :white="true"
        ref="usernameRef"
        maxlength="14"
        :limit="/[^a-z0-9A-Z]/g"
        class="user_name"
        v-model.lowercase="Form.username"
        :pattern="/^[a-z]{1}[a-z0-9]{4,13}$/"
        message="Phải là sự kết hợp của 5-14 chữ cái Tiếng Anh và số, bắt đầu bằng chữ cái"
        type="text"
        placeholder="Tên Đăng Nhập"
        :clear="true"
      >
        <template #left>
          <cg-icon width="44" name="i_user" />
        </template>
      </cg-field>

      <cg-field
        :white="true"
        ref="passwordRef"
        maxlength="20"
        v-model="Form.password"
        :limit="/[^a-z0-9A-Z]/g"
        :pattern="/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/"
        message="Phải là sự kết hợp của 8-20 chữ cái Tiếng Anh và số"
        type="password"
        placeholder="Mật Khẩu"
        :clear="true"
      >
        <template #left>
          <cg-icon width="44" name="i_pasw" />
        </template>
      </cg-field>
      <div class="flex jc-sb memory">
        <cg-checkbox class="pointer" v-model="storage" label="Ghi Nhớ Mật Khẩu" />
        <div class="pointer underline" @click="goPath('/forget-password')">Quên Mật Khẩu?</div>
      </div>
      <cg-button class="w_full" @click="handleLogIn">ĐĂNG NHẬP</cg-button>
      <div class="register pointer">
        Chưa Có Tài Khoản?
        <span class="underline" @click="goPath('/entry/register')">Đăng Ký Ngay</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 178px;

  .title {
    font: var(--cg-font-h1);
    color: var(--cg-color-blue1);
    margin-bottom: 54px;
  }

  .sponsor {
    width: 100%;
    padding: 0 100px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    font: var(--cg-font-text3);
    color: var(--cg-color-black);
    &_item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .cg_icon {
        margin-bottom: 20px;
      }
    }
  }

  .sponsor_title {
    width: 100%;
    padding: 0 85px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font: var(--cg-font-text3);
    color: var(--cg-color-black);

    .decorate {
      width: 100%;
      margin-top: 10px;
      margin-bottom: 26px;
    }
  }

  .content {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 85px;
    font: var(--cg-font-text4);
    color: var(--cg-color-black1);

    .user_name {
      margin-bottom: 28px;
    }

    .memory {
      width: 100%;
      margin-top: 30px;
      margin-bottom: 80px;
    }

    .register {
      margin-top: 28px;
    }

    footer {
      margin-top: 290px;
      font: var(--cg-font-text9);

      .text {
        margin-left: 16px;
      }
    }
  }

  :deep(.van-field__control) {
    font: var(--cg-font-text9) !important;
  }
}
</style>
