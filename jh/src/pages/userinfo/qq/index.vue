<script lang="ts" setup>
import CustomizeDialog from '~/components/customizeDialog.vue'
import Header from '~/components/Header.vue'
import Customer from '~/components/bottomService.vue'
import 'vant/lib/dialog/index.css'
import { isQq } from '~/utils/validate'
const { getMemberInfo } = useUserInfoStore()
const { openLoading, closeLoading } = useLoading()

const router = useRouter()
// 绑定qq
const params: any = ref({
  qq: '',
})
const errorText = ref()
const disabled = computed(() => {
  if (params.value.qq.length < 5)
    return true
  else if (!isQq(params.value.qq))
    return true

  return false
})
const verifyParams = (newVal: any, name: string) => {
  switch (name) {
    case 'qq':
      if ((newVal.length < 5 && params.value[name].length))
        errorText.value = '请正确输入QQ号码'
      else
        errorText.value = ''

      break
  }
}
const dialogs = ref({
  visible: false,
  content: '',
})
const onConFirm = () => {
  openLoading()
  bindqqRequest(params.value).then((res: any) => {
    if (res.status && res.data) {
      getMemberInfo()
      router.replace('/userinfo')
    }
    closeLoading()
  })
}
const subEmail = () => {
  dialogs.value.visible = true
  dialogs.value.content = `您当前提交的QQ号码是${params.value.qq}，提交后不可修改，确认提交？`
}
</script>

<template>
  <div class="cent-bg">
    <div class="email ">
      <Header title="QQ号码">
        <template #headRight>
          <van-button
            class="headright" :disabled="disabled" loading-type="spinner" loading-text="加载中..."
            @click="subEmail()"
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
            QQ号码
          </p>
          <div class="value">
            <CustomizeInput
              v-model="params.qq" :maxlength="11"
              input-type="number" placeholder="请输入您的QQ号码"
              :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'qq'); callback(); }"
              :on-blur="(newVal: any) => { verifyParams(newVal, 'qq') }"
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
