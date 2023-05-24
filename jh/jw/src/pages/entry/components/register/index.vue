<script setup lang='ts' name="register">
import passwordImg from '~/assets/images/entry/login/password.png?preset=full'
import usernameImg from '~/assets/images/entry/login/username.png?preset=full'
import phoneImg from '~/assets/images/entry/register/phone.png?preset=full'
import invitationCodeImg from '~/assets/images/entry/register/invitationCode.png?preset=full'
import verifyCodeImg from '~/assets/images/entry/register/verifyCode.png?preset=full'
import lookImg from '~/assets/images/entry/login/look.png?preset=full'
import serviceImg from '~/assets/images/entry/login/service.png?preset=full'
import logoImg from '~/assets/images/entry/logo.png?preset=full'
import toastIcon from '~/assets/images/entry/toast-icon.png?preset=full'

let device_no = $ref('')
getDeviceInfo().then((res: any) => {
  device_no = res.webrtcid
})

// 注册须知倒计时时间 秒
const READ_COUNTDOWN_TIME = 10
// 验证码倒计时时间 秒
const VERIFY_COUNTDOWN_TIME = 60
const appStore = useAppStore()
const router = useRouter()
const { query } = useRoute()

// 邀请码是否必填后台配置
const { data: isNeedInviteCode } = $(useRequest(checkNeedInviteCode))

// 邀请码输入框
const {
  errorMessage: codeErrMsg,
  value: code,
  setValue: setCode,
  handleChange: handleCodeChange,
  setErrors: setCodeErrors,
  validate: validateCode,
} = $(useField<string>('code', async (value) => {
  if (!value || !value.trim())
    return '请输入6-8位数字邀请码'
  if (!inviteCodeRegx.test(value))
    return '请输入6-8位数字邀请码'
  return true
}))

// 是否阅读了注册须知
let hasRead = $ref(query.no_ad === '1')

// 过滤掉不是数字的字符
const {
  errorMessage: usernameErrMsg,
  value: username,
  setValue: setUsername,
  handleChange: handleUsernameChange,
  setErrors: setUserErrors,
  validate: validateUsername,
} = $(useField<string>('username', async (value) => {
  try {
    if (!value || !value.trim())
      return '账号为字母开头，5-14位英文字母与数字组成'
    if (!userNameRegx.test(value))
      return '账号为字母开头，5-14位英文字母与数字组成'
    await checkMemberUsername(value)
    return true
  }
  catch (e) {
    return '该账号已被注册'
  }
}))
const {
  errorMessage: passwordErrMsg,
  value: password,
  setValue: setPassword,
  setErrors: setPasswordErrors,
  validate: validatePassword,
} = $(useField<string>('password', (value) => {
  if (!value || !value.trim())
    return '请输入8-20位英文字母与数字'
  if (!passwordRegx.test(value))
    return '请输入8-20位英文字母与数字'
  return true
}, {
  initialValue: '',
}))
const {
  errorMessage: repeatPasswordErrMsg,
  value: repeatPassword,
  handleChange: handleRepeatPasswordChange,
  setErrors: setRepeatPasswordErrors,
  validate: validateRepeatPassword,
} = $(useField<string>('repeatPassword', (value) => {
  if (!value || !value.trim())
    return '请确认密码'
  if (value !== password)
    return '两次密码输入不一致'
  return true
}, {
  initialValue: '',
}))
// 密码输入更新后，校验重复密码
watch($$(password), () => {
  if (repeatPassword)
    validateRepeatPassword()
})
const {
  errorMessage: phoneErrMsg,
  value: phone,
  setValue: setPhone,
  handleChange: handlePhoneChange,
  setErrors: setPhoneErrors,
  validate: validatePhone,
} = $(useField<string>('phone', (value) => {
  if (!value || !value.trim())
    return '请输入手机号'
  if (!phoneRegx.test(value))
    return '手机号格式错误，请重新输入'
  return true
}))
const {
  errorMessage: verifyCodeErrMsg,
  value: verify_code,
  handleChange: handleVerifyCodeChange,
  setErrors: setVerifyCodeErrors,
  validate: validateVerCode,
} = $(useField<string>('verify_code', (value) => {
  if (!value || !value.trim())
    return '请输入验证码'
  if (!verifyCodeRegx.test(value))
    return '请输入六位数验证码'
  return true
}))
// 失焦之后验证,清空错误信息
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
    case 'repeatPassword':
      if (!repeatPassword)
        setRepeatPasswordErrors('')
      break
    case 'phone':
      if (!phone)
        setPhoneErrors('')
      break
    case 'verify_code':
      if (!verify_code)
        setVerifyCodeErrors('')
      break
    case 'code':
      if (!code)
        setCodeErrors('')
      break
    default:
      break
  }
}

// 倒计时是否结束
let countdownFinish = $ref(false)
if (sessionStorage.getItem('YESIKNOW')) {
  const t = sessionStorage.getItem('YESIKNOW')
  if ((new Date().getTime() - +t!) / 1000 / 60 < 30)
    // countdownFinish = true
    hasRead = true
}
const { current: readCurrent, start: startReadCountdown } = $(useCountDown({
  time: READ_COUNTDOWN_TIME * 1000,
  onFinish: () => {
    countdownFinish = true
    // 保存时间，半小时内不再需要倒计时
    sessionStorage.setItem('YESIKNOW', JSON.stringify(new Date().getTime()))
  },
}))
// 注册协议按钮文本
const readCountdownText = computed(() => {
  return countdownFinish ? '我知道了' : `${readCurrent.seconds + 1}s`
})
// 倒计时
const { reset, current: sendCodeCurrent, start: startCodeCountdown } = $(useCountDown({
  time: VERIFY_COUNTDOWN_TIME * 1000,
  onFinish: () => {
    reset()
  },
}))
// 验证码按钮文本
const sendCodeText = $computed(() => {
  const totalSeconds = Math.floor(sendCodeCurrent.total / 1000)
  return totalSeconds !== VERIFY_COUNTDOWN_TIME ? `${totalSeconds}s` : '获取验证码'
})

let showToast = $ref(false)
const { run: runSendCode, data: sendCodeRes } = $(useRequest(() => sendOfflineSms({ flag: 'text', tel: phone, ty: 1, username }), {
  manual: true,
  debounceInterval: 300,
  onSuccess() {
    showToast = true
    const t = setTimeout(() => {
      showToast = false
      clearTimeout(t)
    }, 3000)
    // 发送验证码成功后开始倒计时
    startCodeCountdown()
  },
}))
// 获取sid和ts
const sidTsObj = $computed(() => {
  if (!sendCodeRes)
    return { ts: '', sid: '' }
  const [sid, ts] = sendCodeRes.split(':')
  return { sid, ts }
})
// 登录请求
const { run: loginReq } = useRequest(() => loginApi({ password, username }), {
  manual: true,
  onSuccess(res) {
    appStore.setToken(res)
    router.push('/')
  },
})
// 查询注册是否需要验证码
const { data: isNeedCode } = $(useRequest(checkRegisterCode))

// 如果通过邀请码打开，保存注册链接让会员可以先去逛一逛，注册成功之后删除
// console.log('注册==========>', window.location.href, query.id)
let link_id = $ref(query.id as string)
if (query.id)
  sessionStorage.setItem('InviteId', query.id as string)

else if (sessionStorage.getItem('InviteId'))
  link_id = sessionStorage.getItem('InviteId') ?? ''

// 注册请求
const { run: runRegister, loading } = useRequest(
  () => registerApi({
    username,
    password,
    code,
    phone,
    verify_code,
    reg_url: window.location.href,
    link_id,
    ...sidTsObj,
    device_no,
  }),
  {
    manual: true,
    loadingKeep: 1000,
    onSuccess() {
      // 注册成功后自动登录
      sessionStorage.removeItem('InviteId')
      clearWTF()
      loginReq()
    },
  })

// 注册按钮禁用
const disabled = computed(() => {
  // 除验证码外，其他字段是否正确
  if (!(userNameRegx.test(username) && passwordRegx.test(password) && password === repeatPassword && phoneRegx.test(phone)))
    return true
  // 如果需要验证码，验证码是否正确
  if (isNeedCode && !verifyCodeRegx.test(verify_code))
    return true
  // 如果需要邀请码，邀请码是否正确
  if (isNeedInviteCode && !inviteCodeRegx.test(code))
    return true
  return false
})
// 发送验证码
const handleSendCode = async () => {
  if (sendCodeText !== '获取验证码')
    return

  if (!username)
    return setUserErrors('账号为字母开头，5-14位英文字母与数字组成')

  const { valid } = await validatePhone()
  // 验证手机号
  if (valid)
    runSendCode()
}

// 产品要求注册输入时保存资料。。
const saveCode = (val: string) => {
  const d = val.replace(/[^0-9]/g, '')
  setCode(d)
  sessionStorage.setItem('whatCode', d)
}
const saveUsername = (val: string) => {
  setUsername(val)
  sessionStorage.setItem('whatUsername', val)
}
const savePassword = (val: string) => {
  const d = val.replace(/[^0-9a-zA-Z]/g, '')
  setPassword(d)
  sessionStorage.setItem('whatPassword', d)
}
const savePhone = (val: string) => {
  const d = val.replace(/[^0-9]/g, '')
  setPhone(d)
  sessionStorage.setItem('whatPhone', d)
}
if (sessionStorage.getItem('whatCode'))
  setCode(sessionStorage.getItem('whatCode') ?? '')
if (sessionStorage.getItem('whatUsername'))
  setUsername(sessionStorage.getItem('whatUsername') ?? '')
if (sessionStorage.getItem('whatPassword'))
  setPassword(sessionStorage.getItem('whatPassword') ?? '')
if (sessionStorage.getItem('whatPhone'))
  setPhone(sessionStorage.getItem('whatPhone') ?? '')

// ------方法接口调用------
// 立即开始倒计时 countdownFinish
if (!countdownFinish)
  startReadCountdown()
</script>

<template>
  <div class="register">
    <img :src="getSupportImage(logoImg)" ml-37px w-231px>
    <transition mode="out-in">
      <template v-if="hasRead">
        <div class="has-read-wrapper">
          <div class="input-wrapper">
            <div v-if="!!!link_id" class="item">
              <el-input
                v-model.trim="code"
                :placeholder="isNeedInviteCode ? '请输入邀请码' : '邀请码（选填）'"
                maxlength="8"
                @input="saveCode"
                @change="handleCodeChange"
                @focus="(validateCode as any)"
                @blur="handleBlurValidate('code')"
              >
                <template #prefix>
                  <jl-image :src="invitationCodeImg" w-24px h-24px />
                </template>
              </el-input>
              <div validate-error pl-10px>
                {{ codeErrMsg }}
              </div>
            </div>
            <div class="item">
              <el-input
                v-model.trim="username" autocomplete="new-password" clearable placeholder="请输入账号" maxlength="14"
                @input="saveUsername" @focus="(validateUsername as any)" @change="handleUsernameChange"
                @blur="handleBlurValidate('username')"
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
                v-model.trim="password" autocomplete="new-password" placeholder="请输入密码" maxlength="20"
                @focus="(validatePassword as any)" @input="savePassword" @blur="handleBlurValidate('password')"
              >
                <template #prefix>
                  <jl-image :src="passwordImg" w-24px h-24px />
                </template>
              </jl-password-input>
              <div validate-error pl-10px>
                {{ passwordErrMsg }}
              </div>
            </div>
            <div class="item">
              <jl-password-input
                v-model.trim="repeatPassword" maxlength="20" placeholder="请输入密码"
                @input="repeatPassword = repeatPassword.replace(/[^0-9a-zA-Z]/g, '')"
                @focus="(validateRepeatPassword as any)" @change="handleRepeatPasswordChange"
                @blur="handleBlurValidate('repeatPassword')"
              >
                <template #prefix>
                  <jl-image :src="passwordImg" w-24px h-24px />
                </template>
              </jl-password-input>
              <div validate-error pl-10px>
                {{ repeatPasswordErrMsg }}
              </div>
            </div>
            <div class="item">
              <el-input
                v-model.trim="phone" class="phone" placeholder="请输入手机号码" maxlength="11" @input="savePhone"
                @blur="handleBlurValidate('phone')" @focus="(validatePhone as any)" @change="handlePhoneChange"
              >
                <template #prefix>
                  <jl-image :src="phoneImg" w-24px h-24px />
                </template>
                <template v-if="isNeedCode" #append>
                  <span @click="handleSendCode">{{ sendCodeText }}</span>
                </template>
              </el-input>
              <div validate-error pl-10px>
                {{ phoneErrMsg }}
              </div>
            </div>
            <div v-if="isNeedCode" class="item">
              <el-input
                v-model.trim="verify_code" placeholder="验证码" maxlength="6" @change="handleVerifyCodeChange"
                @focus="(validateVerCode as any)" @input="verify_code = verify_code.replace(/[^0-9]/g, '')"
                @blur="handleBlurValidate('verify_code')"
              >
                <template #prefix>
                  <jl-image :src="verifyCodeImg" w-24px h-24px />
                </template>
              </el-input>
              <div validate-error pl-10px>
                {{ verifyCodeErrMsg }}
              </div>
            </div>
          </div>
          <jl-button :disabled="disabled" class="btn" :loading="loading" w-100px lh-42px h-42px @click="runRegister">
            立即注册
          </jl-button>
        </div>
      </template>
      <template v-else>
        <div class="rules">
          <div class="title">
            注册须知
          </div>
          <div class="desc">
            <p>尊敬的会员：</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;欢迎您注册成为久赢娱乐会员，我们有几点提示需要告知您：</p>
            <p>1. 每位会员只允许注册1个账号，请不要重复注册或 者帮下级注册。</p>
            <p>2. 设置账号时请不要包含手机号信息内容。</p>
            <p>3. 充值请自行到官方窗口获取，不要相信任何人 （包括上级代理）给您私发的收款卡号信息。</p>
          </div>
          <div v-show="!countdownFinish" class="warn">
            请认真阅读以上须知后，10s秒后即可开始注册。
          </div>
          <button :disabled="!countdownFinish" class="btn" @click="hasRead = true">
            {{ readCountdownText }}
          </button>
        </div>
      </template>
    </transition>
    <p class="question">
      已有账号？<span @click="router.push('/entry/login')">请登录</span>
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

    <!-- 3秒提示 -->
    <div v-if="showToast" class="toast">
      <img :src="getSupportImage(toastIcon)" alt="">
      <div>
        <h6>接收中···</h6>
        <span>稍后未收到请联系下方客服</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/entry/index.scss' as *;

.toast {
  width: 280px;
  height: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.45);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  animation: fadeIn 3s linear;
  img{
    width: 40px;
    height: 40px;
    margin-right: 15px;
  }
}
@keyframes fadeIn{
  0%{
    opacity: 0;
  }
  20%{
    opacity: 1;
  }
  85%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}

.register {

  .input-wrapper {
    padding: 30px 0;

  }

  .item {
    .phone {
      :deep(.el-input-group__append) {
        background-color: transparent;
        box-shadow: none;
        font-size: 13px;
        color: #fff;
        font-family: $jl-font;
        cursor: pointer;
        user-select: none;
      }

    }
  }

  .rules {
    padding-top: 60px;

    .title {
      font-family: $jl-font;
      font-weight: bold;
      color: $color-primary-second;
      font-size: 24px;
    }

    .desc {
      padding-top: 20px;

      p {
        font-size: 13px;
        text-align: left;
        color: #fff;
        padding-bottom: 20px;
      }

    }

    .warn {
      font-size: 13px;
      color: #ff0000;
      padding-bottom: 45px;
    }

    .btn {
      &[disabled] {
        opacity: 0.5;

      }
    }
  }
}
</style>
