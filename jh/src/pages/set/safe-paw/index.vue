<script lang="ts" setup>
import { Toast } from 'vant'
import Header from '~/components/Header.vue'
import Customer from '~/components/bottomService.vue'
// utils
import { isPhoneVirtualCode } from '~/utils/validate'
const { openLoading, closeLoading } = useLoading()
const { getMemberInfo } = useUserInfoStore()
const router = useRouter()
const params = ref({
  oldPassword: '',
  password: '',
  confirmPassword: '',
})
const errorText = ref()
const verifyParams = (newVal: any, name: string) => {
  switch (name) {
    case 'password':
      if (newVal.length < 6)
        errorText.value = '请正确输入安全密码'
      else if (!isPhoneVirtualCode(newVal))
        errorText.value = '您输入的安全密码有误，请重新输入'
      else
        errorText.value = ''

      break
    case 'confirmPassword':
      if (params.value.password !== newVal)
        errorText.value = '请确保两次输入的安全密码一致'
      else if (!isPhoneVirtualCode(newVal))
        errorText.value = '密码格式不正确'
      else
        errorText.value = ''

      break
    default:
      console.log('没有这个参数,我的哥~')
      break
  }
}
const disabled = computed(() => {
  if (params.value.password !== params.value.confirmPassword)
    return true
  if (params.value.password.length < 6 && params.value.confirmPassword.length < 6)
    return true

  if (!isPhoneVirtualCode(params.value.password) && !isPhoneVirtualCode(params.value.confirmPassword))
    return true
  return false
})
// 设置安全密码 ty 1 登录密码 2 安全密码
const changePassword = (): void => {
  openLoading()
  updataPasswordRequest({
    old: params.value.oldPassword,
    password: params.value.password,
    ty: 2,
  }).then((res: any) => {
    if (res.status && res.data)
      Toast('设置成功')
    getMemberInfo()
    router.replace('/set')

    closeLoading()
  })
}
</script>

<template>
  <div class="cent-bg">
    <div class="email ">
      <Header title="设置安全密码" />
      <div class="pub-top email_cont">
        
        <div class="errorTips">
          <span>{{ errorText }}</span>
        </div>
        <div class="fromItemMain ptd">
          <p class="label">
            安全密码
          </p>
          <div class="value">
            <CustomizeInput
              v-model="params.password" :maxlength="6" input-type="password" placeholder="请输入6位数字安全密码" :eye="true"
              :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'password'); callback(); }"
              :on-blur="(newVal: any) => { verifyParams(newVal, 'password') }"
            />
          </div>
        </div>
        <div class="fromItemMain ptd">
          <p class="label">
            确认安全密码
          </p>
          <div class="value">
            <CustomizeInput
              v-model="params.confirmPassword" :maxlength="6" input-type="password" placeholder="请再次输入6位数字安全密码" :eye="true"
              :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'confirmPassword'); callback(); }"
              :on-blur="(newVal: any) => { verifyParams(newVal, 'confirmPassword') }"
            />
          </div>
        </div>
        <p class="scheduleHint" />
      </div>
    </div>
    <div class="submitWarp">
      <van-button
        class="customizeConfirm" :disabled="disabled" loading-type="spinner"
        loading-text="加载中..." @click="changePassword()"
      >
        设置安全密码
      </van-button>
      <Customer />
    </div>
  </div>
</template>

  <style lang="scss" scoped>
      @import '~/styles/pub_main.scss';
  </style>

