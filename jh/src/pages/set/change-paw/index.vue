<script lang="ts" setup>
import { Toast } from 'vant'
import Header from '~/components/Header.vue'
import Customer from '~/components/bottomService.vue'
// utils
import { isPassword } from '~/utils/validate'
const router = useRouter()
const { clearToken } = useUserInfoStore()
const { openLoading, closeLoading } = useLoading()
const params = ref({
  oldPassword: '',
  password: '',
  confirmPassword: '',
})
const errorText = ref()
const verifyParams = (newVal: any, name: string) => {
  switch (name) {
    case 'oldPassword':
      if (!isPassword(newVal))
        errorText.value = '您输入的密码有误，请重新输入。'
      else
        errorText.value = ''

      break
    case 'password':
      if (params.value.oldPassword.toLowerCase() !== newVal.toLowerCase())
        errorText.value = '新密码不能与旧密码相同。'
      else if (!isPassword(newVal))
        errorText.value = '您输入的密码有误，请重新输入。'
      else
        errorText.value = ''

      break
    case 'confirmPassword':
      if (params.value.password.toLowerCase() !== newVal.toLowerCase())
        errorText.value = '请保持两次输入的新密码保持一致。'
      else if (!isPassword(newVal))
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
  if (params.value.password === '' && params.value.confirmPassword === '' && params.value.oldPassword === '')
    return true
  return false
})
// 提交修改密码
const changePassword = (): void => {
  openLoading()
  updataPasswordRequest({
    old: params.value.oldPassword,
    password: params.value.password,
    ty: 1,
  }).then((res: any) => {
    if (res.status && res.data) {
      if (res.status === true) {
        Toast('修改成功')
        clearToken()
        router.replace('/entry/login')
      }
    }
    closeLoading()
  })
}
</script>

<template>
  <div class="cent-bg">
    <div class="email ">
      <Header title="修改密码" />
      <div class="pub-top email_cont">
        
        <div class="errorTips">
          <span>{{ errorText }}</span>
        </div>
        <div class="fromItemMain ptd">
          <p class="label">
            旧密码
          </p>
          <div class="value">
            <CustomizeInput
              v-model="params.oldPassword" input-type="password" placeholder="请输入旧密码" :eye="true"
              :maxlength="20"
              :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'oldPassword'); callback(); }"
              :on-blur="(newVal: any) => { verifyParams(newVal, 'oldPassword') }"
            />
          </div>
        </div>
        <div class="fromItemMain ptd">
          <p class="label">
            新密码
          </p>
          <div class="value">
            <CustomizeInput
              v-model="params.password" input-type="password" placeholder="请输入新密码" :eye="true"
              :maxlength="20"
              :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'password'); callback(); }"
              :on-blur="(newVal: any) => { verifyParams(newVal, 'password') }"
            />
          </div>
        </div>
        <div class="fromItemMain ptd">
          <p class="label">
            确认新密码
          </p>
          <div class="value">
            <CustomizeInput
              v-model="params.confirmPassword" input-type="password" placeholder="请再次输入新密码"
              :maxlength="20"
              :eye="true"
              :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'confirmPassword'); callback(); }"
              :on-blur="(newVal: any) => { verifyParams(newVal, 'confirmPassword') }"
            />
          </div>
        </div>
      </div>
      <p class="scheduleHint">
        *请避免使用与其他网站相同或容易被他人猜到的密码
      </p>
    </div>
    <div class="submitWarp">
      <van-button
        class="customizeConfirm" :disabled="disabled" loading-type="spinner"
        loading-text="加载中..." @click="changePassword()"
      >
        修改密码
      </van-button>
      <Customer />
    </div>
  </div>
</template>

<style lang="scss" scoped>
    @import '~/styles/pub_main.scss';
</style>
