<script lang="ts" setup>
import Header from '~/components/Header.vue'
import Customer from '~/components/bottomService.vue'
import 'vant/lib/dialog/index.css'
import { useUserInfoStore } from '~/store/userInfo'
import { isEmail } from '~/utils/validate'
import CustomizeDialog from '~/components/customizeDialog.vue'
const { getMemberInfo } = useUserInfoStore()
const { openLoading, closeLoading } = useLoading()

const router = useRouter()
// bindEmail
const params: any = ref({
  email: '',
})
const errorText = ref()

const verifyParams = (newVal: any, name: string) => {
  switch (name) {
    case 'email':
      if (!isEmail(newVal) && params.value[name].length)
        errorText.value = '请正确输入邮箱号码'
      else
        errorText.value = ''
      break
  }
}
const disabled = computed(() => {
  if (!isEmail(params.value.email))
    return true

  return false
})
const dialogs = ref({
  visible: false,
  content: '',
})
const onConFirm = () => {
  openLoading()
  bindEmailRequest(params.value).then((res: any) => {
    if (res.status && res.data) {
      getMemberInfo()
      router.replace('/userinfo')
    }
    closeLoading()
  })
}
const subEmail = () => {
  dialogs.value.visible = true
  dialogs.value.content = `您当前提交的Email是${params.value.email}，提交后不可修改，确认提交？`
}
</script>

<template>
  <div class="cent-bg">
    <div class="email ">
      <Header title="电子邮箱">
        <template #headRight>
          <van-button
            class="headright" :disabled="disabled" :class="disabled === false ? 'active_tit' : ''"
            loading-type="spinner"
            loading-text="加载中..." @click="subEmail()"
          >
            完成
          </van-button>
        </template>
      </Header>
      <div class="pub-top email_cont">
        

        <div class="errorTips">
          <span>{{ errorText }}</span>
        </div>

        <div class="fromItemMain">
          <p class="label">
            电子邮箱
          </p>
          <div class="value">
            <CustomizeInput
              v-model="params.email" input-type="email" placeholder="请输入您的Email地址"
              :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'email'); callback(); }"
              :maxlength="30"
              :on-blur="(newVal: any) => { verifyParams(newVal, 'email') }"
            />
          </div>
        </div>
      </div>
    </div>
    
    
    <CustomizeDialog
      v-model="dialogs.visible"
      title="温馨提示"
      :content="dialogs.content"
      cancel-text="取消"
      confirm-text="确定"
      @confirm="onConFirm()"
    />
    <Customer :type="true" />
  </div>
</template>

<style lang="scss" scoped>
@import '~/styles/pub_main.scss';
  </style>
