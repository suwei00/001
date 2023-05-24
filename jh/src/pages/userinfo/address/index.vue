<script lang="ts" setup>
import Header from '~/components/Header.vue'
import Customer from '~/components/bottomService.vue'
import 'vant/lib/dialog/index.css'
import { useUserInfoStore } from '~/store/userInfo'
import CustomizeDialog from '~/components/customizeDialog.vue'
import CustomizeAreaSelect from '~/components/customizeAreaSelect.vue'

const { openLoading, closeLoading } = useLoading()
const { getMemberInfo } = useUserInfoStore()
const router = useRouter()
const params: any = ref({
  address: '',
  areali: '',
})
const errorText = ref('')
const verifyParams = (newVal: any, name: string) => {
  if (!params.value[name].length)
    errorText.value = '请正确输入收获地址'
  else
    errorText.value = ''
}
const disabled = computed(() => {
  if (!params.value.address || !params.value.areali)
    return true

  return false
})
const dialogs = ref({
  visible: false,
  content: '',
})
const onConFirm = () => {
  openLoading()
  bindAddressRequest({ address: params.value.areali + params.value.address }).then((res: any) => {
    if (res.status && res.data) {
      getMemberInfo()
      router.replace('/userinfo')
    }

    closeLoading()
  })
}
const subEmail = () => {
  dialogs.value.visible = true
  dialogs.value.content = `您当前提交的地址是${params.value.areali}${params.value.address}，提交后不可修改，确认提交？`
}
</script>

<template>
  <div class="cent-bg">
    <div class="email ">
      <Header title="收货地址">
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
        <div class="fromItemMain ptd">
          <p class="label">
            收货地址
          </p>
          <div class="value">
            <!-- <CustomizeInput
              v-model="params.address" placeholder="请输入您的详细地址，将有机会收获大奖"
              :maxlength="30"
              :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'address'); callback(); }"
              :on-blur="(newVal: any) => { verifyParams(newVal, 'address') }"
            /> -->
            <CustomizeAreaSelect v-model="params.areali" placeholder="请选择省/市/区" />
          </div>
        </div>
        <div class="fromItemMain ptd">
          <p class="label">
            详细地址
          </p>
          <div class="value">
            <CustomizeInput
              v-model="params.address" placeholder="请填写详细地址，如道路、小区、单元、门牌"
              :maxlength="30"
              :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'address'); callback(); }"
              :on-blur="(newVal: any) => { verifyParams(newVal, 'address') }"
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
.email_cont{
  padding-bottom: 20px !important;
}
</style>

