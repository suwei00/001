<script setup lang='ts'>
import { CgButton } from '@/components/cg-template-2'
import PromotionHeader from './components/promotion-header.vue'
import { inject, computed, ref, } from 'vue';
import { useAppStore } from '@/store-pinia'
import { userInfoStateStore } from '@/store-pinia/userInfo'
import { storeToRefs } from 'pinia';
import { useDetail } from './useDetail'
import APIs from '@/http/blue-apis';
import { useRouter, useRoute } from 'vue-router'
import CGCpBetDialog from './components/cgcpbet-dialog.vue'
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call'
import dayjs from 'dayjs'

const flag = inject('flag') as string;
const id = inject('id') as string;
const route = useRoute();
const { source } = route.query

const { isLogin, isApp } = storeToRefs(useAppStore())
const userStore = userInfoStateStore()
const router = useRouter()
const Dialog = new CgDialogClass()

const { banner, details, title, data } = useDetail(id, flag);
const rule1 = computed(() => details.value[0] || '')
const rules = computed(() => details.value.slice(1) || '')
const isTheEnd = computed(() => data.value?.config.end_time ? dayjs().isAfter(dayjs(data.value?.config.end_time)) : false)

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
  APIs.checkPromoCGcpbet().then((res) => {
    changeBtnState(res)
  }).catch((err: any) => { console.error(err); })
}

// 点击领取
const handleApply = () => {
  // 如果没有登录 跳转登录页
  if (!isLogin.value) {
    if (isApp.value) {
      window.open('yiyappnative://event?type=login', '_self');
      return
    }
    router.push({ path: '/entry/login' });
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
<template>
  <div class='static-page'>
    <PromotionHeader :title="title" />
    <div class="banner" :style="{ backgroundImage: `url(${banner})` }"></div>
    <div class="details">
      <app-image :src="rule1" :key="rule1" is-google-cloud />
      <CgButton v-show="rule1" @click="handleApply" :disabled="isTheEnd || btnDisabled"
        style="margin-top:var(--cg-px-32);margin-bottom:var(--cg-px-32);" center width="498">{{
          btnText
        }}</CgButton>
      <app-image v-for="item in rules" :src="item" :key="item" is-google-cloud />
    </div>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'CgCpbet'
}
</script>

<style lang='scss' scoped>
.static-page {
  .banner {
    width: 100%;
    height: 290px;
    background-size: cover;
    background-position: center;
  }

  .details {
    width: 686px;
    margin: 0 auto;

    img {
      width: 100%;
      display: block;
      margin-bottom: 24px;
    }
  }
}
</style>