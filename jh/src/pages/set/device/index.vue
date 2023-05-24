<script lang="ts" setup>
import { computed, ref } from 'vue'
// import dayjs from 'dayjs'
import Header from '~/components/Header.vue'
import getDeviceInfo from '~/utils/getDeviceInfo'
import { useUserInfoStore } from '~/store/userInfo'
import { getIp } from '~/utils/deviceUtil'
const info: any = ref({})
getDeviceInfo().then((res: any) => {
  info.value = res
})
const userInfoStor = useUserInfoStore()
const username = computed(() => userInfoStor.userInfo.username)
const hostname = window.location.hostname
// const time = dayjs().format('HH:mm:ss DD/MM/YYYY')
// const git = version;
const ip = ref('')
getIp().then((res: any) => {
  ip.value = res.loc + res.ip
})
</script>

<template>
  <div class="cent-bg">
    <Header title="设备信息" />
    <div class="device_content cent-top ">
      <div class="mask">
        <div class="device-info deep-color-container">
          <p>
            <span>会员账号</span>
            <span>{{ username }}</span>
          </p>
          <p>
            <span>登录类型</span>
            <span>H5</span>
          </p>
          <p>
            <span>IP地址</span>
            <span>{{ ip }}</span>
          </p>
          <p>
            <span>网络类型</span>
            <span>{{ info.netWork }} </span>
          </p>

          <p>
            <span>浏览器版本</span>
            <span>{{ info.browser_type }} {{ info.browser_version }}</span>
          </p>
          <p>
            <span>域名</span>
            <span>{{ hostname }}</span>
          </p>
          <p>
            <span>时区</span>
            
            <span>&nbsp;{{ info.zone }}</span>
          </p>
          <p>
            <span>网页版</span>
            <span>1.0.0</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

 <style lang="scss" scoped>
 .device_content{
    .device-info {
    padding: 0 18px;
    p {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #F1F1F1;
      font-size: 14px;
      span:first-child {
        font-size: 14px;
        font-family: AppleSystemUIFontBold;
      }

      &:last-child {
        border: none;

      }
    span:nth-child(2){
        font-size: 11px;
        color: #868686;
      }
    }
}
.device {
height: 100%;
// background-color: #1e1110;
color: #fff;
}

 }
 </style>
