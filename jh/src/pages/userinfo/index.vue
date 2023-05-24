<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { avaList } from './static'
import Header from '~/components/Header.vue'
import bgImage from '~/components/bgImage.vue'
// 背景图
import bghui from '~/assets/images/public/minGreyRight.png?preset=full'
import finish from '~/assets/images/my/selectAva.png?preset=full'
import { useUserInfoStore } from '~/store/userInfo'
import bgSrc3 from '~/assets/images/my/revise.png?preset=full'
// finish
// 第三方ui

import 'vant/lib/popup/index.css'
import { Circle, Toast } from 'vant'
import dayjs from 'dayjs'
const { openLoading, closeLoading } = useLoading()
const router = useRouter()
const visibit = ref(false)
const { getMemberInfo } = useUserInfoStore()
const { userInfo } = storeToRefs(useUserInfoStore())
const showData = ref(false)
const goPage = (value: string, url: string): void => {
  if (value)
    return
  router.push({ path: url, query: { from: 'userInfo' } })
}

// 圆形进度条
const currentRate = computed(() => {
  let val = 100
  const rate = 100 / 7
  if (userInfo.value.birth === '0')
    val -= rate
  if (userInfo.value.email === '')
    val -= rate
  if (userInfo.value.avatar === '0')
    val -= rate
  if (userInfo.value.qq === '')
    val -= rate
  if (userInfo.value.real_name === '')
    val -= rate
  if (userInfo.value.wechat === '')
    val -= rate
  if (userInfo.value.address === '')
    val -= rate - 0.1

  return val
})

const activeImageID: any = computed(() => userInfo.value.avatar || '1')

const selectImage = (id: any) => {
  openLoading()
  setAvatorRequest({
    id: Number(id.replace('ava', '')),
  }).then((res: any) => {
    if (res.status && res.data) {
      getMemberInfo()
      Toast('设置成功')
      visibit.value = false
    }
    closeLoading()
  })
}
// 点击头像
const popAvatarList = (item: any) => {
  visibit.value = true
}
// 点击提交
const quitAvarat = () => {
  visibit.value = false
}

const showPopData = (item: any) => {
  showData.value = true
}
const dialogs = ref({
  visible: false,
  content: '',
})
const formta_date = ref<any>(new Date(1990, 1, 1))
const minDate = new Date(1920, 1, 1)
const maxDate = new Date()
const formtadate = (type: any, val: any) => {
  if (type === 'year')
    return `${val}年`

  if (type === 'month')
    return `${val}月`

  if (type === 'day')
    return `${val}日`

  return val
}

// 性别、出生日期修改
const onCancelDate = (): void => {
  showData.value = false
}
const onConfirmDate = (val: string): void => {
  // 判断是否满18岁
  formta_date.value = dayjs(+val).format('YYYY-MM-DD')
  showData.value = false
  dialogs.value.visible = true
  dialogs.value.content = `您当前提交的出生日期是${formta_date.value}，提交后不可修改，确认提交？`
}
const onConFirm = () => {
  openLoading()
  bindAddressRequest({
    birth: formta_date.value,
  }).then((res: any) => {
    if (res.status && res.data) {
      userInfo.value.birth = formta_date.value
      getMemberInfo()
      // Toast('设置成功')
      showData.value = false
    }
    closeLoading()
  })
}
</script>

<template>
  <PopRealName />
  <div class="personal_user_info cent-bg">
    <Header title="个人资料" />
    <div class="personal_content">
      <div class="myinfo">
        <p class="avatar_tit">
          个人头像
        </p>
        <div class="myinfo_content flex ">
          <van-circle
            :current-rate="currentRate"
            class="my_circle"
            :speed="100"
            :stroke-width="60"
            color="#4F73F6"
            stroke-linecap="butt"
          >
            <div class="myinfo_avatar_warp" @click="popAvatarList">
              <template v-for="(item, index) in avaList" :key="index">
                <bgImage
                  v-if="`ava${activeImageID}` === String(index)"
                  :image="item" class="avaimg"
                />
              </template>
              <bgImage :image="bgSrc3" class="info_updata" />
            </div>
          </van-circle>
        </div>
      </div>
      <van-popup v-model:show="visibit" position="bottom">
        <div class="change_ava">
          <ol class="flex">
            <template v-for="(item, index) in avaList">
              <li v-if="'ava0' !== String(index)" :key="index" :class="{ active: `ava${activeImageID}` === String(index) }" @click="selectImage(index)">
                <bgImage :image="item" class="avaimg" />
                <bgImage v-if="`ava${activeImageID}` === String(index)" :image="finish" class="finshimg" />
              </li>
            </template>
          </ol>
          <div class="graydiv">
            r
          </div>
          <div class="avatar_foot" @click="quitAvarat">
            <button>
              取消
            </button>
          </div>
        </div>
      </van-popup>
      <div class="infor_list">
        <ul>
          <li>
            <p class="infor_title">
              账号
            </p>
            <div class="flex ai-c jc-sb">
              <div class="infor_text">
                {{ userInfo.username }}
              </div>
            </div>
          </li>
          <li>
            <p class="infor_title">
              手机号码
            </p>
            <div class="flex ai-c jc-sb">
              <div class="infor_text">
                {{ userInfo.phone }}
              </div>
            </div>
          </li>
          <li @click="goPage(userInfo.real_name, 'userinfo/real-name')">
            <p class="infor_title">
              <span class="info_xin">*</span>
              真实姓名
            </p>
            <div class="flex ai-c jc-sb">
              <div class="infor_text ">
                {{ userInfo.real_name ? userInfo.real_name : "姓名需要与银行卡保持一致，否则无法提现" }}
              </div>
              <bgImage v-if="!userInfo.real_name" :image="bghui" class="strong" />
            </div>
          </li>
          <li @click="goPage(userInfo.qq, 'userinfo/qq')">
            <p class="infor_title">
              QQ号码
            </p>
            <div class="flex ai-c jc-sb">
              <div class="infor_text ">
                {{ userInfo.qq ? userInfo.qq : "请输入您的QQ号码（选填）" }}
              </div>
              <bgImage v-if="!userInfo.qq" :image="bghui" class="strong" />
            </div>
          </li>
          <li @click="goPage(userInfo.wechat, 'userinfo/wechat')">
            <p class="infor_title">
              微信号码
            </p>
            <div class="flex ai-c jc-sb">
              <div class="infor_text ">
                {{ userInfo.wechat ? userInfo.wechat : "请输入您的微信号码（选填）" }}
              </div>

              <bgImage v-if="!userInfo.wechat" :image="bghui" class="strong" />
            </div>
          </li>
          <li @click="goPage(userInfo.email, 'userinfo/email')">
            <p class="infor_title">
              电子邮箱
            </p>
            <div class="flex ai-c jc-sb">
              <div class="infor_text  ">
                {{ userInfo.email ? userInfo.email : '请输入您的Email地址（选填）' }}
              </div>
              <bgImage v-if="!userInfo.email " :image="bghui" class="strong" />
            </div>
          </li>

          <li v-if="userInfo.birth === '0'" @click="showPopData">
            <p class="infor_title">
              出生日期
            </p>
            <div class="flex ai-c jc-sb">
              <div class="infor_text">
                请选择您的出生日期（选填）
              </div>
              <bgImage :image="bghui" class="strong" />
            </div>
          </li>
          <li v-else>
            <p class="infor_title">
              出生日期
            </p>
            <div class="flex ai-c jc-sb">
              <div class="infor_text">
                {{ dayjs.unix(userInfo.birth ? +userInfo.birth : 0).format('YYYY-MM-DD') }}
              </div>
            </div>
          </li>
          <li @click="goPage(userInfo.address, 'userinfo/address')">
            <p class="infor_title">
              收货地址
            </p>
            <div class="flex ai-c jc-sb">
              <div class="infor_text  ">
                {{ userInfo.address === '' ? '请输入您的详细地址，将有机会收获大奖（选填）' : userInfo.address }}
              </div>
              <bgImage v-if="!userInfo.address" :image="bghui" class="strong" />
            </div>
          </li>
        </ul>
      </div>
    </div>
    
    <van-popup v-model:show="showData" position="bottom">
      <van-datetime-picker
        v-model="formta_date"
        type="date"
        :columns-order="['year', 'month', 'day']"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formtadate"
        @confirm="onConfirmDate"
        @cancel="onCancelDate"
      />
    </van-popup>
    
    
    <CustomizeDialog
      v-model="dialogs.visible"
      title="温馨提示"
      :content="dialogs.content"
      cancel-text="取消"
      confirm-text="确定"
      @confirm="onConFirm()"
    />
  </div>
</template>

  <style lang="scss" scoped>
    @import '~/styles/userinfo.scss';
    .my_circle{
    height:60.3px;
    width: 60.6px;
  }
  :deep(.van-ellipsis){
    line-height: 40px;
  }
  </style>
