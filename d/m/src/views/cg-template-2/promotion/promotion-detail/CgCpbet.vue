<template>
  <div class="promotion-detail">
    <div class="banner" :style="{ backgroundImage: `url(${banner})` }"></div>
    <div class="details">
      <app-image :src="rule1" is-google-cloud />
      <CgButton @click="handleApply" :disabled="btnDisabled" style="margin-bottom: 30px;" center width="300">{{
        btnText
      }}</CgButton>
      <app-image v-for="r in rules" :src="r" :key="r" is-google-cloud />
    </div>
  </div>
</template>

<script setup lang="ts" >
import { inject, computed, ref } from 'vue';
import { useDetail } from './useDetail'
import { CgButton } from '@/components/cg-template-2'
import { useAppStore } from '@/store-pinia'
import { userInfoStateStore } from '@/store-pinia/userInfo'
import { storeToRefs } from 'pinia';
import APIs from '@/http/blue-apis';
import { LogInAndRegister } from '@/utils/logIn';
import CGCpBetDialog from './components/cgcpbet-dialog.vue'
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call'

const Dialog = new CgDialogClass()
const flag = inject('flag') as string;
const id = inject('id') as string;
const { isLogin } = storeToRefs(useAppStore())
const userStore = userInfoStateStore()

const { banner, details } = useDetail(id, flag);
const rule1 = computed(() => details.value[0] || '')
const rules = computed(() => details.value.slice(1) || '')

// 按钮置灰
const btnDisabled = ref(false)
// 已领取：Đã Nhận ｜｜ 立即申请：NHẬN NGAY
const btnText = ref('NHẬN NGAY')
const changeBtnState = (state: string) => {
  switch (state) {
    // 未达标
    case '1':
      btnDisabled.value = true
      break;
    // 已达标
    case '2':
      btnDisabled.value = false
      break;
    // 已领取
    case '3':
      btnDisabled.value = true
      btnText.value = 'Đã Nhận'
      break;
    default:
      break;
  }
}
// 查询前日是否有满足要求的投注
if (isLogin.value) {
  APIs.checkPromoCGcpbet().then((res: any) => {
    changeBtnState(res)
  }).catch((err: any) => { console.error(err); })
}

// 点击领取
const handleApply = () => {
  if (!isLogin.value) {
    LogInAndRegister('LogIn')
    return;
  }
  APIs.getPromotionApply({ id, flag: 'cgcpbet', bonus_type: 1 }).then((res: any) => {
    Dialog.showDialog({
      template: 'tmp3',
      customComponent: CGCpBetDialog,
      props: { amount: res.match(/\d+K/)[0], close: () => Dialog.closeDialog() }
    })
    userStore.RefreshBalance()
    changeBtnState('3')
  });
}
</script>

<style lang="scss" scoped>
.promotion-detail {
  width: 100%;
  padding-bottom: 81px;

  .banner {
    margin: 0 auto;
    max-width: 1920px;
    min-width: 1200px;
    height: 550px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;
  }

  .details {
    width: 1200px;
    margin: 0 auto;

    img {
      display: block;
      margin-bottom: 30px;
    }
  }
}
</style>