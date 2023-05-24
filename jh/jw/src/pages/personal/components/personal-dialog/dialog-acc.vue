<script setup lang='ts' name="dialog-acc">
import { ElMessage } from 'element-plus'

const form = reactive({ old: '', password: '', repassword: '' })
const {
  isOpen,
  open,
  close,
  oldRef,
  oldShow,
  passwordRef,
  pwdShow,
  rePasswordRef,
  rPwdShow,
  showPwd,
  disabledBtn,
} = usePersonalDialog(form)

// 注销登录
const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const handleLogout = () => {
  appStore.$reset()
  appStore.clearToken()
  userStore.$reset()
  localStorage.removeItem('closeActivityPopup')
  router.push('/entry/login')
}

const { run: runUpdatePassword, loading } = useRequest(
  () => updatePassword({ old: form.old, password: form.password, ty: 1 }),
  {
    manual: true,
    onSuccess() {
      ElMessage.success('修改成功！')
      handleLogout()
    },
    onError() {
      close()
    },
  },
)

// 校验
const isPwd = computed(() => {
  if (!form.password)
    return true
  return passwordRegx.test(form.password)
})
const isPwdSame = computed(() => {
  if (!form.repassword)
    return true
  return form.password === form.repassword
})
// 按钮开关
watchEffect(() => {
  if (form.old && isPwd.value && form.repassword && isPwdSame.value)
    disabledBtn.value = false

  else
    disabledBtn.value = true
})

// 忘记密码
// function goForget() {
//   close()
//   const t = setTimeout(() => {
//     router.push('/forget')
//     clearTimeout(t)
//   }, 10)
// }

// 暴露
defineExpose({
  open,
})
</script>

<template>
  <personal-dialog v-if="isOpen" title="修改账户密码">
    <template #right>
      <div class="right" @click="close">
        <img src="@icons/personal/finance/close-icon.svg" alt="">
      </div>
    </template>
    <template #body>
      <div class="item">
        <label>原密码</label>
        <input
          ref="oldRef" v-model="form.old"
          type="password"
          maxlength="20"
          placeholder="请输入原密码" autocomplete="new-password" @input="form.old = form.old.replace(/[^0-9a-zA-Z]/g, '')"
        >
        <div class="icon" @click="showPwd('old')">
          <img v-show="oldShow" src="@icons/personal/finance/eye-open.svg" alt="eye1">
          <img v-show="!oldShow" src="@icons/personal/finance/eye-close.svg" alt="eye2">
        </div>
      </div>
      <div class="item">
        <label>新密码</label>
        <input
          ref="passwordRef" v-model="form.password" type="password" placeholder="请输入新密码" autocomplete="new-password"
          maxlength="20"
          @input="form.password = form.password.replace(/[^0-9a-zA-Z]/g, '')"
        >
        <span v-show="!isPwd" class="error">请输入8-20位英文字母与数字</span>
        <div class="icon" @click="showPwd('password')">
          <img v-show="pwdShow" src="@icons/personal/finance/eye-open.svg" alt="eye1">
          <img v-show="!pwdShow" src="@icons/personal/finance/eye-close.svg" alt="eye2">
        </div>
      </div>
      <div class="item">
        <label>确认新密码</label>
        <input
          ref="rePasswordRef" v-model="form.repassword" type="password" placeholder="请再次输入新密码" autocomplete="new-password"
          maxlength="20"
          @input="form.repassword = form.repassword.replace(/[^0-9a-zA-Z]/g, '')"
        >
        <span v-show="!isPwdSame" class="error">密码不一致，请重新输入</span>
        <div class="icon" @click="showPwd('rePassword')">
          <img v-show="rPwdShow" src="@icons/personal/finance/eye-open.svg" alt="eye1">
          <img v-show="!rPwdShow" src="@icons/personal/finance/eye-close.svg" alt="eye2">
        </div>
      </div>
      <button mb-15px :disabled="disabledBtn" :class="{ disabled: disabledBtn }" @click="runUpdatePassword">
        <i v-if="loading" class="i-common-btn-loading" mr-5px w-18px h-18px :class="{ 'refresh-loading': loading }" />
        确认
      </button>
      <!-- <div class="forget">
        <span @click="goForget">忘记密码？</span>
      </div> -->
    </template>
  </personal-dialog>
</template>

<style lang='scss' scoped>
.right {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  padding: 5px;

  img {
    width: 14px;
    height: 14px;
  }
}

.item {
  margin-top: 26px;
  display: flex;
  flex-direction: column;
  position: relative;

  label {
    font-size: 15px;
    font-family: $jl-font;
    font-weight: 400;
    margin-bottom: 6px;
  }

  input {
    width: 450px;
    height: 40px;
    background: #FFFFFF;
    border-radius: 6px;
    border: 1px solid #C5C5C5;
    padding: 10px 14px;

    &::-webkit-input-placeholder {
      color: #94A6B7;
    }
  }

  .error {
    color: red;
    position: absolute;
    bottom: -18px;
    font-size: 11px;
  }

  .icon {
    cursor: pointer;
    position: absolute;
    right: 9px;
    bottom: 6px;
    padding: 10px 5px;
  }
}

button {
  width: 450px;
  height: 50px;
  background: #597EF7;
  color: #fff;
  border-radius: 6px;
  font-size: 18px;
  margin-top: 50px;
}

.disabled {
  background-color: #8E8E8E;
}

.forget {
  text-align: center;
  font: normal normal normal 15px/21px $jl-font;
  color: #597EF7;
  opacity: 1;

  span {
    cursor: pointer;
  }
}
</style>
