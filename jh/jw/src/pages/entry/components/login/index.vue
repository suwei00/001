<script setup lang='ts' name="login">
import passwordImg from '~/assets/images/entry/login/password.png?preset=full'
import usernameImg from '~/assets/images/entry/login/username.png?preset=full'
import logoImg from '~/assets/images/entry/logo.png?preset=full'
import lookImg from '~/assets/images/entry/login/look.png?preset=full'
import serviceImg from '~/assets/images/entry/login/service.png?preset=full'

let device_no = $ref('')
getDeviceInfo().then((res: any) => {
  device_no = res.webrtcid
})

const appStore = useAppStore()
const router = useRouter()
const rememberPassword = $(useStorage('rememberPassword', true))
let usr = $(useStorage('usr', ''))
let pwd = $(useStorage('pwd', ''))

const { errorMessage: usernameErrMsg, value: username, handleChange: handleUsernameChange, setErrors: setUserErrors, validate: validateUsername } = $(useField<string>('username', (value) => {
  if (!value || !value.trim())
    return '账号不能为空'
  if (!userNameRegx.test(value))
    return '账号为字母开头，5-14位英文字母与数字组成'
  return true
}, {
  initialValue: usr,
}))
const { errorMessage: passwordErrMsg, value: password, handleChange: handlePasswordChange, setErrors: setPasswordErrors, validate: validatePassword } = $(useField<string>('password', (value) => {
  if (!value || !value.trim())
    return '密码不能为空'
  if (!passwordRegx.test(value))
    return '8-20位英文字母与数字组成'
  return true
}, {
  initialValue: decode(pwd),
}))

// 失焦之后验证
const handleBlurValidate = (name: string) => {
  switch (name) {
    case 'username':
      if (!username)
        setUserErrors('')
      break
    case 'password':
      if (!password)
        setPasswordErrors('')
      break

    default:
      break
  }
}
// 禁用登录按钮
const disabled = computed(() => {
  return !username || !password || !!usernameErrMsg || !!passwordErrMsg
})
// 登录请求
const { run: loginReq, loading } = useRequest(() => loginApi({ password, username, device_no }), {
  manual: true,
  loadingKeep: 1000,
  onSuccess(res) {
    pwd = rememberPassword ? encode(password) : ''
    usr = username
    appStore.setToken(res)
    router.push('/')
  },
})
</script>

<template>
  <div class="login">
    <img :src="getSupportImage(logoImg)" ml-37px w-231px>
    <div class="input-wrapper">
      <div class="item">
        <el-input
          v-model.trim="username" clearable autocomplete="new-password" placeholder="账号" maxlength="14"

          @input="username = username" @change="handleUsernameChange"
          @focus="(validateUsername as any)" @blur="handleBlurValidate('username')"
        >
          <template #prefix>
            <jl-image :src="usernameImg" w-24px h-24px />
          </template>
        </el-input>
        <div validate-error pl-10px>
          {{ usernameErrMsg }}
        </div>
      </div>
      <div class="item">
        <jl-password-input
          v-model.trim="password" maxlength="20" autocomplete="new-password" placeholder="密码"
          @input="password = password.replace(/[^0-9a-zA-Z]/g, '')" @keyup.enter="loginReq"
          @change="handlePasswordChange" @focus="(validatePassword as any)" @blur="handleBlurValidate('password')"
        >
          <template #prefix>
            <jl-image :src="passwordImg" w-24px h-24px />
          </template>
        </jl-password-input>
        <div validate-error pl-10px>
          {{ passwordErrMsg }}
        </div>
      </div>
    </div>

    <div class="tip-box">
      <el-checkbox v-model="rememberPassword" label="记住密码" size="large" />
      <span @click="router.push('/forget')">忘记密码？</span>
    </div>
    <jl-button :disabled="disabled" class="btn" :loading="loading" w-100px lh-42px h-42px @click="loginReq">
      登录
    </jl-button>
    <p class="question">
      还没有账号？<span @click="router.push('/entry/register')">极速注册</span>
    </p>
    <div class="more">
      <span cursor-pointer @click="appStore.openService">
        <jl-image :src="serviceImg" mr-6px w-22px h-20px />
        联系客服
      </span>
      <span @click="router.push('/')">
        <jl-image :src="lookImg" mr-6px w-22px h-20px />
        先去逛逛
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/pages/entry/index.scss' as *;

.login {
  .input-wrapper {
    display: flex;
    flex-direction: column;
    padding-top: 30px;

  }

  .tip-box {
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    :deep(.el-checkbox__label) {
      font-size: 15px;
      line-height: 20px;
      color: #fff;
    }
    :deep(.el-checkbox__input.is-checked .el-checkbox__inner){
      background-color: #597EF7;
      border-color: #597EF7;
    }
    span {
      color: #fff;
      font-size: 15px;
      line-height: 20px;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>
