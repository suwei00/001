<script lang="ts" setup>
import { Toast } from 'vant'
import Header from '~/components/Header.vue'
import Customer from '~/components/bottomService.vue'
// utils
import { isPhone, isPhoneVirtualCode } from '~/utils/validate'
const { getMemberInfo } = useUserInfoStore()
const { openLoading, closeLoading } = useLoading()
const router = useRouter()
const params = ref({
  password: '',
  confirmPassword: '',
  phone: '',
})
const errorText = ref()
const verifyParams = (newVal: any, name: string) => {
  switch (name) {
    case 'password':
      if (newVal.length < 6)
        errorText.value = '请正确输入安全密码'
      else if (!isPhoneVirtualCode(newVal))
        errorText.value = '您输入的密码有误，请重新输入'
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
    case 'phone':
      if (newVal.length < 11)
        errorText.value = '请正确输入手机号'
      else if (!isPhone(newVal))
        errorText.value = '手机号格式不正确'
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
  if (params.value.phone.length < 11)
    return true
  return false
})
// 修改密码
const changePassword = (): void => {
  openLoading()
  resetSafePasswordRequest({
    password: params.value.password,
    phone: params.value.phone,
  }).then((res: any) => {
    if (res.status && res.data) {
      if (res.status === true) {
        Toast('设置成功')
        getMemberInfo()
        router.replace('/set')
      }
    }
    closeLoading()
  })
}
</script>

<template>
  <div class="cent-bg">
    <div class="email ">
      <Header title="找回安全密码" />
      <div class="pub-top email_cont">
        
        <div class="errorTips">
          <span>{{ errorText }}</span>
        </div>
        <div class="fromItemMain ptd">
          <p class="label">
            新的安全密码
          </p>
          <div class="value">
            <CustomizeInput
              v-model="params.password" :maxlength="6" input-type="password" placeholder="请输入安全密码" :eye="true"
              :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'password'); callback(); }"
              :on-blur="(newVal: any) => { verifyParams(newVal, 'password') }"
            />
          </div>
        </div>
        <div class="fromItemMain ptd">
          <p class="label">
            确认新的安全密码
          </p>
          <div class="value">
            <CustomizeInput
              v-model="params.confirmPassword" :maxlength="6" input-type="password" placeholder="请再次输入安全密码" :eye="true"
              :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'confirmPassword'); callback(); }"
              :on-blur="(newVal: any) => { verifyParams(newVal, 'confirmPassword') }"
            />
          </div>
        </div>
        <div class="fromItemMain ptd">
          <p class="label">
            手机号码
          </p>
          <div class="value">
            <CustomizeInput
              v-model="params.phone" input-type="number" placeholder="请输入您的手机号码" :maxlength="11"
              :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'phone'); callback(); }"
              :on-blur="(newVal: any) => { verifyParams(newVal, 'phone') }"
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
        找回安全密码
      </van-button>
      <Customer />
    </div>
  </div>
</template>

<style lang="scss" scoped>
 @import '~/styles/pub_main.scss';
</style>

