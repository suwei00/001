<script lang="ts" setup>
import Header from '~/components/Header.vue'
import Customer from '~/components/bottomService.vue'
import 'vant/lib/dialog/index.css'
import { useUserInfoStore } from '~/store/userInfo'
import { isRealName } from '~/utils/validate'
import { bindAddressRequest } from '~/api/index'
import CustomizeDialog from '~/components/customizeDialog.vue'
const { getMemberInfo } = useUserInfoStore()
const { openLoading, closeLoading } = useLoading()
const router = useRouter()
const params: any = ref({
  realname: '',
})
const errorText = ref('')
const verifyParams = (newVal: any, name: string) => {
  switch (name) {
    case 'realname':
      if (!isRealName(newVal) && params.value[name].length)
        errorText.value = '请正确输入真实姓名'
      else
        errorText.value = ''
      break
  }
}
const disabled = computed(() => {
  if (params.value.realname.length < 2)
    return true
  if (!isRealName(params.value.realname))
    return true
  return false
})
const dialogs = ref({
  visible: false,
  content: '',
})
const onConFirm = () => {
  openLoading()
  bindAddressRequest(params.value).then((res: any) => {
    if (res.status && res.data) {
      getMemberInfo()
      router.replace('/userinfo')
    }
    closeLoading()
  })
}
const subEmail = () => {
  dialogs.value.visible = true
  dialogs.value.content = `您当前提交的真实姓名是${params.value.realname}，提交后不可修改，确认提交？`
}
</script>

<template>
  <div class="cent-bg">
    <div class="email ">
      <Header title="真实姓名">
        <template #headRight>
          <van-button
            class="headright" :disabled="disabled" loading-type="spinner"
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
            真实姓名
          </p>
          <div class="value">
            <CustomizeInput
              v-model="params.realname" placeholder="姓名需要与银行卡保持一致，否则无法提现"
              :maxlength="30" input-type="realname"
              :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'realname'); callback(); }"
              :on-blur="(newVal: any) => { verifyParams(newVal, 'realname') }"
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

