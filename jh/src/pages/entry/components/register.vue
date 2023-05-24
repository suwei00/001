<script lang="ts" setup>
import EntryInput from './entryInput.vue'
import CustomizeInput from '~/components/customizeInput.vue'
import BgImage from '~/components/bgImage.vue'
import { isPassword, isPhone, isUserName } from '~/utils/validate'
import getDeviceInfo from '~/utils/getDeviceInfo'

import 'vant/lib/toast/index.css'
import imgSrc1 from '~/assets/images/entry/register/invite.png?preset=full'
import imgSrc2 from '~/assets/images/entry/register/account.png?preset=full'
import imgSrc3 from '~/assets/images/entry/register/pass.png?preset=full'
import imgSrc4 from '~/assets/images/entry/register/phone.png?preset=full'
import imgSrc5 from '~/assets/images/entry/register/code.png?preset=full'
import signsIcon from '~/assets/images/entry/register/signs.png?preset=full'
import entryCsItemBg from '~/assets/images/entry/entryCs.png?preset=full'
import entryCsItemThumb from '~/assets/images/entry/entryCs.png??preset=thumbnail&src'
import entryHomeItemBg from '~/assets/images/entry/entryHome.png?preset=full'
import entryHomeItemThumb from '~/assets/images/entry/entryHome.png??preset=thumbnail&src'

interface Props {
  showCode: boolean
}
const props = withDefaults(defineProps<Props>(), {
  showCode: true,
})

// const emit = defineEmits(['goLogin'])
const { setToken, getMemberInfo } = useUserInfoStore()
const router = useRouter()
const route = useRoute()
const { id }: any = route.query

onMounted(() => {
  console.log('register mounted', route.query)
  if (id)
    sessionStorage.setItem('link_id', id)
})

const params = ref({
  code: '',
  username: '',
  password: '',
  confirmPassword: '',
  phone: '',
  verify_code: '',
  ts: '',
  sid: '',
  link_id: id ?? sessionStorage.getItem('link_id') ?? '',
  reg_url: window.location.href,
  device_no: '',
})

const verifyTip = ref({
  code: '',
  username: '',
  password: '',
  confirmPassword: '',
  phone: '',
  verify_code: '',
})

const loading = ref(false)
const preventLoding = ref(false) // 防止重复发送验证码
const sendCodeLoding = ref(false)
const sendTheVerificationCode = ref(false)

const isNeedCode = ref(true) // 注册是否是需要邀请码 true 需要 false 不需要
const getCodeRequest = () => {
  memberCodeRequest().then((res: any) => {
    if (res.status)
      isNeedCode.value = res.data
  })
}
getCodeRequest()

// const disabled = computed(() => {
//   const { showCode } = props
//   if (params.value.password !== params.value.confirmPassword)
//     return true

//   // params.value 排除 code
//   const newParams = JSON.parse(JSON.stringify(params.value))
//   if (isNeedCode.value === false)
//     delete newParams.code

//   //
//   delete newParams.ts
//   delete newParams.sid
//   delete newParams.link_id
//   if (!showCode)
//     delete newParams.verify_code

//   return !(Object.values(newParams).every(item => item) && Object.values(verifyTip.value).every(item => !item))
// })

const verifyParams = async (newVal: any, name: string) => {
  const { showCode } = props

  if (name === 'username') {
    if (['', null, undefined].includes(newVal))
      return verifyTip.value[name] = '账号为字母开头，5-14位英文字母与数字组成'
    else if (!isUserName(newVal) && newVal.length)
      return verifyTip.value[name] = '账号为字母开头，5-14位英文字母与数字组成'

    verifyTip.value[name] = ''

    if (isUserName(newVal) && newVal.length) {
      const res: any = await checkMemberUsernameRequest(newVal).catch(err => err)
      if (!res.status)
        verifyTip.value[name] = '该账号已被注册'
    }
  }

  switch (name) {
    case 'code':
      if (['', null, undefined].includes(newVal))
        verifyTip.value[name] = '请输入6-8位数字邀请码'
      else if (newVal.length < 6 || newVal.length > 8)
        verifyTip.value[name] = '请输入6-8位数字邀请码'
      else
        verifyTip.value[name] = ''

      return
    case 'password':
      if (['', null, undefined].includes(newVal)) {
        // console.log(params.value.confirmPassword, '[[[[[1]]]]]', newVal)
        verifyTip.value[name] = '请输入8-20位英文字母与数字'
        if (params.value.confirmPassword.length && params.value.confirmPassword !== newVal)
          verifyTip.value.confirmPassword = '两次密码输入不一致'
        else
          verifyTip.value.confirmPassword = ''
      }
      else if (!isPassword(newVal) && newVal.length) {
        // console.log(params.value.confirmPassword, '[[[[[2]]]]]', newVal)
        verifyTip.value[name] = '请输入8-20位英文字母与数字'
        if (params.value.confirmPassword.length && params.value.confirmPassword !== newVal)
          verifyTip.value.confirmPassword = '两次密码输入不一致'
        else
          verifyTip.value.confirmPassword = ''
      }
      else {
        if (params.value.confirmPassword.length && params.value.confirmPassword !== newVal) {
          verifyTip.value[name] = ''
          verifyTip.value.confirmPassword = '两次密码输入不一致'
        }
        else {
          verifyTip.value[name] = ''
          verifyTip.value.confirmPassword = ''
        }
        // console.log(params.value.confirmPassword, '[[[[[3]]]]]', newVal, isPassword(newVal))
      }

      return
    case 'confirmPassword':
      if (['', null, undefined].includes(newVal))
        verifyTip.value[name] = '请确认密码'

      else if (params.value.password !== newVal)
        verifyTip.value[name] = '两次密码输入不一致'
      else
        verifyTip.value[name] = ''

      return
    case 'phone':
      if (['', null, undefined].includes(newVal))
        verifyTip.value[name] = '请输入手机号'

      else if (!isPhone(newVal) && newVal.length)
        verifyTip.value[name] = '手机号格式错误，请重新输入'
      else
        verifyTip.value[name] = ''

      return
    case 'verify_code':
      if (['', null, undefined].includes(newVal))
        verifyTip.value[name] = '请输入验证码'

      else if (!isPhoneVirtualCode(newVal) && newVal.length && showCode)
        verifyTip.value[name] = '请输入六位数验证码'
      else
        verifyTip.value[name] = ''

      return
    default:
      console.log('没有这个参数,我的哥~')
  }
}

const verifyParamsBlur = async (newVal: any, name: string) => {
  switch (name) {
    case 'code':
      if (['', null, undefined].includes(newVal))
        verifyTip.value[name] = ''
      break
    case 'username':
      if (['', null, undefined].includes(newVal))
        verifyTip.value[name] = ''
      break
    case 'password':
      if (['', null, undefined].includes(newVal))
        verifyTip.value[name] = ''
      break
    case 'confirmPassword':
      if (['', null, undefined].includes(newVal))
        verifyTip.value[name] = ''
      break
    case 'phone':
      if (['', null, undefined].includes(newVal))
        verifyTip.value[name] = ''
      break
    case 'verify_code':
      if (['', null, undefined].includes(newVal))
        verifyTip.value[name] = ''
      break
    default:
      break
  }
}

const sendCode = () => {
  if (preventLoding.value || sendCodeLoding.value)
    return
  if (!isUserName(params.value.username))
    return verifyTip.value.username = '账号为字母开头，5-14位英文字母与数字组成'
  if (!isPhone(params.value.phone))
    return verifyTip.value.phone = '手机号格式错误，请重新输入'

  preventLoding.value = true
  smsOfflineRequest({
    username: params.value.username.toLowerCase(),
    tel: params.value.phone,
    flag: 'text',
    ty: 1,
  }).then((res: any) => {
    if (res.status) {
      sendTheVerificationCode.value = true
      sendCodeLoding.value = true
      const sendCodeRes = res.data ?? ':'
      const [sid, ts] = sendCodeRes.split(':')
      params.value.sid = sid
      params.value.ts = ts
      setTimeout(() => {
        sendTheVerificationCode.value = false
      }, 3000)
    }
  }).finally(() => {
    preventLoding.value = false
  })
}

const onFinish = () => {
  sendCodeLoding.value = false
}

const verifyBySubmit = (): boolean => {
  const { showCode } = props

  if (isNeedCode.value === true) {
    verifyParams(params.value.code, 'code')
    if (verifyTip.value.code)
      return true
  }

  verifyParams(params.value.username, 'username')
  if (verifyTip.value.username)
    return true

  verifyParams(params.value.password, 'password')
  if (verifyTip.value.password)
    return true

  verifyParams(params.value.confirmPassword, 'confirmPassword')
  if (verifyTip.value.confirmPassword)
    return true

  verifyParams(params.value.phone, 'phone')
  if (verifyTip.value.phone)
    return true

  if (showCode) {
    verifyParams(params.value.verify_code, 'verify_code')
    if (verifyTip.value.verify_code)
      return true
  }

  return false
}

const submit = () => {
  const isVerify = verifyBySubmit()
  if (isVerify)
    return

  loading.value = true
  registerRequest({
    ...params.value,
    username: params.value.username.toLowerCase(),
    password: params.value.password.toLowerCase(),
  }).then((res: any) => {
    if (res.status && res.data) {
      loading.value = true

      loginRequest({
        username: params.value.username.toLowerCase(),
        password: params.value.password.toLowerCase(),
      }).then((res: any) => {
        if (res.status && res.data) {
          setToken(res.data)
          getMemberInfo()

          // Toast('注册成功')
          router.replace('/home')
        }
      }).finally(() => {
        loading.value = false
      })
    }
  }).finally(() => {
    loading.value = false
  })
}

const goToHome = () => {
  router.replace({
    path: '/home',
  })
}

const onService = () => {
  Local.setItem('registerLearn', params.value)
  // console.log(params.value, '<<<<<=====')
}

const info = () => {
  getDeviceInfo().then((res: any) => {
    // console.log(res, '<<<<<<<========')
    params.value.device_no = res.webrtcid
  })
}

router.beforeEach((to, from, next) => {
  // console.log(to.path, '==========', from.path, '<<<<<<<<<=====')
  if (to.path === '/entry/register' || to.path === '/entry/login') {
    params.value = { ...params.value, ...Local.getItem('registerLearn') }
  }
  else {
    Local.removeItem('registerLearn')
    params.value = {
      code: '',
      username: '',
      password: '',
      confirmPassword: '',
      phone: '',
      verify_code: '',
      ts: '',
      sid: '',
      link_id: id ?? sessionStorage.getItem('link_id') ?? '',
      reg_url: window.location.href,
      device_no: '',
    }

    info()
  }

  next()
})
onMounted(() => {
  params.value = { ...params.value, ...Local.getItem('registerLearn') }
  info()
  // console.log('onMounted', router.currentRoute.value.path)
})

const goLogin = () => {
  // console.log(params.value, '11111------<<<<<<=====')
  Local.setItem('registerLearn', params.value)
}

defineExpose({
  goLogin,
})
</script>

<template>
  <div class="registerWarp">
    <div class="head">
      注册
    </div>
    <div class="inputContentWarp">
      <EntryInput v-if="!params.link_id" :err="verifyTip.code">
        <template #entryInputIcon>
          <BgImage class="entryInputIcon" :image="imgSrc1" />
        </template>
        <template #entryInput>
          
          <CustomizeInput
            v-model="params.code" :maxlength="8" input-type="number" placeholder-color="#EFEFEF" color="#EFEFEF"
            :placeholder="isNeedCode ? '请输入邀请码' : '邀请码（选填）'" :on-focus="(oldVal: any) => { verifyParams(oldVal, 'code') }"
            :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'code'); callback(); }"
            :on-blur="(newVal: any) => { verifyParamsBlur(newVal, 'code') }" :clear="false"
          />
        </template>
      </EntryInput>

      <EntryInput :err="verifyTip.username">
        <template #entryInputIcon>
          <BgImage class="entryInputIcon" :image="imgSrc2" />
        </template>
        <template #entryInput>
          <CustomizeInput
            v-model="params.username"
            :maxlength="14" input-type="account" placeholder-color="#EFEFEF" color="#EFEFEF"
            placeholder="请输入账号" :on-focus="(oldVal: any) => { verifyParams(oldVal, 'username') }"
            :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'username'); callback(); }"
            :on-blur="(newVal: any) => { verifyParamsBlur(newVal, 'username') }"
          />
        </template>
      </EntryInput>

      <EntryInput :err="verifyTip.password">
        <template #entryInputIcon>
          <BgImage class="entryInputIcon" :image="imgSrc3" />
        </template>
        <template #entryInput>
          <CustomizeInput
            v-model="params.password" :maxlength="20" input-type="password" :eye="true"
            placeholder-color="#EFEFEF" color="#EFEFEF" placeholder="请输入密码"
            :on-focus="(oldVal: any) => { verifyParams(oldVal, 'password') }"
            :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'password'); callback(); }"
            :on-blur="(newVal: any) => { verifyParamsBlur(newVal, 'password') }" :clear="false"
          />
        </template>
      </EntryInput>

      <EntryInput :err="verifyTip.confirmPassword">
        <template #entryInputIcon>
          <BgImage class="entryInputIcon" :image="imgSrc3" />
        </template>
        <template #entryInput>
          <CustomizeInput
            v-model="params.confirmPassword" :maxlength="20" input-type="password" :eye="true"
            placeholder-color="#EFEFEF" color="#EFEFEF" placeholder="请确认密码"
            :on-focus="(oldVal: any) => { verifyParams(oldVal, 'confirmPassword') }"
            :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'confirmPassword'); callback(); }"
            :on-blur="(newVal: any) => { verifyParamsBlur(newVal, 'confirmPassword') }" :clear="false"
          />
        </template>
      </EntryInput>

      <EntryInput :err="verifyTip.phone">
        <template #entryInputIcon>
          <BgImage class="entryInputIcon" :image="imgSrc4" />
        </template>
        <template #entryInput>
          <CustomizeInput
            v-model="params.phone" :maxlength="11" input-type="number" placeholder-color="#EFEFEF" color="#EFEFEF"
            placeholder="请输入手机号码" :on-focus="(oldVal: any) => { verifyParams(oldVal, 'phone') }"
            :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'phone'); callback(); }"
            :on-blur="(newVal: any) => { verifyParamsBlur(newVal, 'phone') }" :clear="false"
          />
        </template>
        <template v-if="showCode" #entryRight>
          <div class="sendCodeWarp" @click="sendCode()">
            <div v-if="!sendCodeLoding" class="sendCodeBtn">
              获取验证码
            </div>
            <div v-else class="sendCode">
              <CustomizeCountdown :time="60000" :start="sendCodeLoding" @on-finish="onFinish()" />s
            </div>
          </div>
        </template>
      </EntryInput>

      <EntryInput v-if="showCode" :err="verifyTip.verify_code">
        <template #entryInputIcon>
          <BgImage class="entryInputIcon" :image="imgSrc5" />
        </template>
        <template #entryInput>
          <CustomizeInput
            v-model="params.verify_code" :maxlength="6" input-type="number" placeholder-color="#EFEFEF" color="#EFEFEF"
            placeholder="验证码" :on-focus="(oldVal: any) => { verifyParams(oldVal, 'verify_code') }"
            :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'verify_code'); callback(); }"
            :on-blur="(newVal: any) => { verifyParamsBlur(newVal, 'verify_code') }" :clear="false"
          />
        </template>
      </EntryInput>
    </div>
    <div class="submitWarp">
      <van-button
        class="customizeSubmit" :loading="loading" loading-type="spinner"
        loading-text="加载中..." @click="submit()"
      >
        立即注册
      </van-button>
    </div>
    <div v-if="sendTheVerificationCode" class="cg__toast">
      <BgImage class="signs_icon" :image="signsIcon" />
      <div class="toast_text">
        <p>接收中···</p>
        <p>稍后未收到请联系下方客服</p>
      </div>
    </div>

    <ol class="entryFast">
      <li>
        
        <img loading="lazy" :src="getSupportImage(entryCsItemBg)">
        <Sc sc-label="联系客服" color="#fff" @on-service="onService()" />
      </li>
      <li>
        
        <img loading="lazy" :src="getSupportImage(entryHomeItemBg)">
        <span @click="goToHome()">先去逛逛</span>
      </li>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
.registerWarp {
  position:relative;
  width: 100%;

  .head {
    width: 100%;
    min-height: 24px;
    line-height: 24px;
    font-size: 16px;
    text-align: center;
    font-weight: 800;
    padding: 21px 0 30px 0;
  }

  .inputContentWarp {
    width: 100%;

    .entryInputIcon {
      display: block;
      width: 100%;
      height: 100%;
      background-size: 100%;
      background-position: center;
      background-repeat: no-repeat;
    }

    .sendCodeWarp {
      min-width: 50px;

      .sendCodeBtn {
        font-size: 10px;
        height: 14px;
        line-height: 14px;
        color: #EFEFEF;
      }

      .sendCode {
        font-size: 13px;
        line-height: 13px;
        text-align: right;
      }
    }
  }

  .submitWarp {
    width: 100%;
    padding: 20px 0 15px 0;
  }
}

.entryFast {
  width: 100%;
  display: flex;
  justify-content: space-between;

  li {
    display: flex;
    align-items: center;

    img {
      display: block;
      width: 12px;
      height: 12px;
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center;
    }

    span {
      padding-left: 5px;
    }
  }
}

.cg__toast{
  display: flex;
  position: absolute;
  align-items: center;
  top: 50%;
  left: 50%;
  transform:translate(-50%,-50%);
  width: 210px;
  height: 61px;
  background: #000000;
  border-radius: 12px;
  opacity: 0.8;
  font-size: 12px;
  color: #ffffff;
  padding: 0px 12px;
  .signs_icon{
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  .toast_text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &>p{
      text-align: center;
      line-height: 18px;
    }
  }
}
</style>
