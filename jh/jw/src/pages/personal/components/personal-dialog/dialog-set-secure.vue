<script setup lang='ts' name="dialog-setSecure">
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const form = reactive({ password: '', repassword: '' })
const { isOpen, open, close, passwordRef, pwdShow, rePasswordRef, rPwdShow, showPwd, disabledBtn } = usePersonalDialog(form)

const { run: runUpdatePassword, loading } = useRequest(
  () => updatePassword({ password: form.password, ty: 2 }),
  {
    manual: true,
    onSuccess() {
      ElMessage.success('设置成功！')
      userStore.runGetUserInfo()
      close()
    },
    onError() {
      close()
    },
  },
)
// 校验
const isSecurePwd = computed(() => {
  if (!form.password)
    return true

  else
    return verifyCodeRegx.test(form.password)
})
const isPwdSame = computed(() => {
  if (!form.repassword)
    return true
  return form.password === form.repassword
})
// 按钮开关
watchEffect(() => {
  if (form.repassword && isSecurePwd.value && isPwdSame.value)
    disabledBtn.value = false

  else
    disabledBtn.value = true
})

// 暴露
defineExpose({
  open,
})
</script>

<template>
  <personal-dialog v-if="isOpen" title="安全密码" des="安全密码作为提现的重要凭证，请牢记您的安全密码">
    <template #right>
      <div class="right" @click="close">
        <img src="@icons/personal/finance/close-icon.svg" alt="">
      </div>
    </template>
    <template #body>
      <div class="item">
        <label>安全密码</label>
        <input
          ref="passwordRef"
          v-model="form.password"
          type="password"
          placeholder="请输入6位数字安全密码"
          autocomplete="new-password"
          maxlength="6"
          @input="form.password = form.password.replace(/[^0-9]/g, '')"
        >
        <span v-show="!isSecurePwd" class="error">安全密码仅限6位数字</span>
        <div class="icon" @click="showPwd('password')">
          <img v-if="pwdShow" src="@icons/personal/finance/eye-open.svg">
          <img v-else src="@icons/personal/finance/eye-close.svg">
        </div>
      </div>
      <div class="item">
        <label>确认安全密码</label>
        <input
          ref="rePasswordRef"
          v-model="form.repassword"
          type="password"
          placeholder="请再次输入6位数字安全密码"
          autocomplete="new-password"
          maxlength="6"
          @input="form.repassword = form.repassword.replace(/[^0-9]/g, '')"
        >
        <span v-show="!isPwdSame" class="error">请保持两次输入的安全密码一致</span>
        <div class="icon" @click="showPwd('rePassword')">
          <img v-if="rPwdShow" src="@icons/personal/finance/eye-open.svg">
          <img v-else src="@icons/personal/finance/eye-close.svg">
        </div>
      </div>
      <button mb-15px :disabled="disabledBtn" :class="{ disabled: disabledBtn }" @click="runUpdatePassword">
        <i v-if="loading" class="i-common-btn-loading" mr-5px w-18px h-18px :class="{ 'refresh-loading': loading }" />
        确认
      </button>
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
</style>
