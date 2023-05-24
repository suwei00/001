<script lang="ts" setup>
import { Toast } from 'vant'
import Header from '~/components/Header.vue'
// utils
import routerBackHook from '~/hooks/routerBackHooks'
import { isPhoneVirtualCode } from '~/utils/validate'
const { goTo } = routerBackHook()
const goWhere = (item: any) => {
  goTo(item.path)
}
const router = useRouter()
const { getMemberInfo } = useUserInfoStore()
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
      if (newVal.length < 6)
        errorText.value = '请正确输入安全密码'
      else if (!isPhoneVirtualCode(newVal))
        errorText.value = '您输入的密码有误，请重新输入'

      else
        errorText.value = ''

      break
    case 'password':
      if (newVal.length < 6)
        errorText.value = '请正确输入安全密码'
      else if (params.value.oldPassword ! === newVal)
        errorText.value = '新密码不能与旧密码相同'
      else if (!isPhoneVirtualCode(newVal))
        errorText.value = '您输入的密码有误，请重新输入'
      else
        errorText.value = ''

      break
    case 'confirmPassword':
      if (params.value.password !== newVal)
        errorText.value = '请保持两次输入的新密码保持一致'
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
  if (params.value.oldPassword.length < 6 && params.value.password.length < 6 && params.value.confirmPassword.length < 6)
    return true

  if (!isPhoneVirtualCode(params.value.password) && !isPhoneVirtualCode(params.value.confirmPassword))
    return true
  return false
})
// 提交修改安全密码
const changePassword = (): void => {
  openLoading()
  updataPasswordRequest({
    old: params.value.oldPassword,
    password: params.value.password,
    ty: 2,
  }).then((res: any) => {
    if (res.status && res.data) {
      if (res.status === true) {
        getMemberInfo()
        Toast('修改成功')
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
      <Header title="修改安全密码" />
      <div class="pub-top email_cont">
        
        <div class="errorTips">
          <span>{{ errorText }}</span>
        </div>
        <div class="fromItemMain ptd">
          <p class="label">
            旧的安全密码
          </p>
          <div class="value">
            <CustomizeInput
              v-model="params.oldPassword" :maxlength="6" input-type="password" placeholder="请输入旧的6位数字安全密码" :eye="true"
              :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'oldPassword'); callback(); }"
              :on-blur="(newVal: any) => { verifyParams(newVal, 'oldPassword') }"
            />
          </div>
        </div>
        <div class="fromItemMain ptd">
          <p class="label">
            新的安全密码
          </p>
          <div class="value">
            <CustomizeInput
              v-model="params.password" :maxlength="6" input-type="password" placeholder="请输入新的6位数字安全密码" :eye="true"
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
        修改安全密码
      </van-button>
      <div class="goforgot" @click="goWhere({ path: 'retrieve' })">
        <button>  忘记安全密码？</button>
      </div>
    </div>
  </div>
</template>

  <style lang="scss" scoped>
      @import '~/styles/pub_main.scss';
  </style>

