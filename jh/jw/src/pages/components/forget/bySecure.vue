<script setup lang='ts' name="bySecure">
import line1 from '@images/forget/line1.png?preset=full'
import line2 from '@images/forget/line2.png?preset=full'

import { ElMessage } from 'element-plus'
import useForget from './useForget'

const appStore = useAppStore()
const {
  step,
  disabledBtn1,
  disabledBtn2,
  username,
  withdraw_pwd,
  password,
  repassword,
  submit,
  counter,
} = useForget(2)

const {
  passwordRef,
  pwdShow,
  rePasswordRef,
  rPwdShow,
  showPwd,
  pwdEye,
  rPwdEye,
} = usePersonalDialog()

const { run: runCheckSecure } = useRequest(() => checkMemberSecure({ username: username.value, password: `${withdraw_pwd.value}` }), {
  manual: true,
  onSuccess(v) {
    if (v)
      step.value = 2
    else
      ElMessage.error('安全密码和用户名不匹配')
  },
})
const eyeClick = (type: string) => {
  switch (type) {
    case 'password':
      showPwd('password')
      passwordRef.value.focus()
      break
    case 'rePassword':
      showPwd('rePassword')
      rePasswordRef.value.focus()
      break

    default:
      break
  }
}

// 按钮开关
watchEffect(() => {
  if (username.value && withdraw_pwd.value)
    disabledBtn1.value = false

  else disabledBtn1.value = true

  if (password.value && repassword.value)
    disabledBtn2.value = false

  else
    disabledBtn2.value = true
})
</script>

<template>
  <div class="bySecure">
    <!-- 步骤 -->
    <div class="steps">
      <img w-159px h-2px :src="step > 1 ? getSupportImage(line2) : getSupportImage(line1)" class="dots1">
      <img w-159px h-2px :src="step > 2 ? getSupportImage(line2) : getSupportImage(line1)" class="dots2">
      <div class="item">
        <span class="cirle" :class="{ active: step > 0 }">1</span>
        <span class="des">身份验证</span>
      </div>
      <div class="item">
        <span class="cirle" :class="{ active: step > 1 }">2</span>
        <span class="des">修改密码</span>
      </div>
      <div class="item">
        <span class="cirle" :class="{ active: step > 2 }">3</span>
        <span class="des">完成</span>
      </div>
    </div>

    <!-- 表单 1 -->
    <div v-if="step === 1" class="form">
      <div class="form-i">
        <label>账号</label>
        <input v-model="username" type="text" placeholder="请输入您的账号" maxlength="14">
      </div>
      <div class="form-i">
        <label>安全密码</label>
        <input
          v-model="withdraw_pwd"
          type="password"
          placeholder="请输入您的安全密码"
          maxlength="6"
          @input="withdraw_pwd = withdraw_pwd.replace(/[^0-9]/g, '')"
        >
      </div>
      <button class="create" :disabled="disabledBtn1" :class="{ dis: disabledBtn1 }" @click="runCheckSecure">
        下一步
      </button>
    </div>

    <!-- 表单 2 -->
    <div v-else-if="step === 2" class="form">
      <div class="form-i">
        <label>新密码</label>
        <input
          ref="passwordRef"
          v-model="password"
          type="password"
          placeholder="8~20位位小写英文字母与数字"
          maxlength="20"
          @focus="pwdEye = true"
          @blur="pwdEye = false"
        >
        <div :style="{ opacity: pwdEye ? 1 : 0, cursor: pwdEye ? 'pointer' : '' }" class="icon" @click="eyeClick('password')">
          <img v-if="pwdShow" src="@icons/personal/finance/eye-open.svg">
          <img v-else src="@icons/personal/finance/eye-close.svg">
        </div>
        <!-- <span v-show="!isPwd" class="error">密码格式错误，请输入8-20位英文字母与数字</span> -->
      </div>
      <div class="form-i">
        <label>确认密码</label>
        <input
          ref="rePasswordRef"
          v-model="repassword"
          type="password"
          placeholder="请再次输入新密码"
          maxlength="20"
          @focus="rPwdEye = true"
          @blur="rPwdEye = false"
        >
        <div :style="{ opacity: rPwdEye ? 1 : 0, cursor: rPwdEye ? 'pointer' : '' }" class="icon" @click="eyeClick('rePassword')">
          <img v-if="rPwdShow" src="@icons/personal/finance/eye-open.svg">
          <img v-else src="@icons/personal/finance/eye-close.svg">
        </div>
        <span class="error">*请避免使用与其他网站相同容易被他人猜到的密码</span>
      </div>
      <button class="create" :disabled="disabledBtn2" :class="{ dis: disabledBtn2 }" @click="submit">
        下一步
      </button>
    </div>

    <!-- 完成 -->
    <div v-else-if="step === 3" class="success">
      <img src="@images/forget/success.png" alt="" h-80px w-80px mb-20px>
      <span>您已成功找回密码</span>
      <button mt-67px mb-75px @click="router.push('/entry/login')">
        返回登录
      </button>
      <h6>
        <span>{{ counter }}s</span>自动返回登录
      </h6>
    </div>

    <!-- 联系客服 -->
    <div class="service">
      <div flex items-center cursor-pointer @click="appStore.openService">
        <img src="@images/forget/service.png" alt="">
        <span>联系客服</span>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.bySecure {
  width: 498px;
  margin: 0 auto;
}

.steps {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 56px;
  position: relative;
  cursor: pointer;

  .dots1,
  .dots2 {
    width: 50%;
    position: absolute;
    top: 35%;
    left: 0;
    transform: translateY(-50%);
    z-index: -1;
  }

  .dots2 {
    left: 50%;
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;

    .cirle {
      display: block;
      width: 60px;
      height: 60px;
      line-height: 58px;
      text-align: center;
      border-radius: 100%;
      background-color: #fff;
      border: 2px solid #616161;
      color: #616161;
      font-size: 24px;
      font-family: $jl-font;
      font-weight: 400;
      margin-bottom: 8px;
    }

    .active {
      color: #fff;
      border-color: #4F73F6;
      background-color: #4F73F6;
    }

    .des {
      font-size: 15px;
      color: #262626;
    }
  }

}

.form {
  .form-i {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding-bottom: 12px;
    border-bottom: 1px solid #D4D4D4;
    margin-bottom: 54px;
    position: relative;

    label {
      width: 127px;
      text-align: left;
      font-size: 18px;
      font-family: $jl-font;
      font-weight: 600;
      color: #262626;
    }
    input{
      width: 65%;
    }

    input:focus {
      border: none;
      outline: none;
    }

    .error {
      // color: red;
      font-size: 13px;
      color: #333;
      position: absolute;
      bottom: -40px;
      left: 0;
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
    width: 497px;
    height: 40px;
    background: #597EF7;
    border-radius: 6px;
    color: #fff;
    margin-bottom: 74px;
    margin-top: 5px;
  }

  .dis {
    background-color: #8E8E8E;
  }
}

.success {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 15px;
    font-family: $jl-font;
    font-weight: 400;
    color: #262626;
  }

  button {
    width: 497px;
    height: 40px;
    background: #597EF7;
    border-radius: 6px;
    color: #fff;
    font-family: $jl-font;
    font-weight: 600;
    font-size: 15px;
  }

  h6 {
    font-size: 13px;
    font-family: $jl-font;
    font-weight: 400;
    color: #282828;

    span {
      color: #597EF7;
    }
  }
}

.service {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 21px;
    height: 20px;
    margin-right: 6px;
  }

  span {
    font-size: 13px;
    font-family: $jl-font;
    font-weight: 400;
    color: #282828;
  }
}
</style>

