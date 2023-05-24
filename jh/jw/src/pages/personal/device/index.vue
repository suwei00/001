<script setup lang='ts' name="device">
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const userName = computed(() => userInfo.value?.username)

const ip = ref('')
getIp().then((res: any) => {
  ip.value = res.loc + res.ip
})
const domain = window.location.host.replace(/(www|web)\./, '')

const browser = reactive<{ browser_type?: string; browser_version?: string; zone?: string ;netWork?: string }>({})
getDeviceInfo().then((res: any) => {
  browser.browser_type = res.browser_type
  browser.browser_version = res.browser_version
  browser.zone = res.zone
  browser.netWork = res.netWork
})

const info = computed(() => [
  { label: '会员帐户', value: userName.value },
  { label: '登录类型', value: 'Web' },
  { label: 'IP地址', value: ip.value },
  { label: '网络类型', value: browser.netWork },
  { label: '浏览器版本', value: `${browser.browser_type}(${browser.browser_version})` },
  { label: '域名', value: domain },
  { label: '时区', value: browser.zone },
  { label: '网页版', value: '暂未设置版本号' },
])
</script>

<template>
  <div class="device">
    <personal-title title="设备信息" />
    <div class="list">
      <ul>
        <li v-for="(item, index) in info" :key="index">
          <div class="label">
            {{ item.label }}
          </div>
          <div class="value" text-left pl-32px>
            {{ item.value }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

.device {
  @include pageCard;

  .list {
  padding-top: 20px;
    display: flex;

    ul {
      border: 1px solid #D2D7E3;
      display: inline-block;
      li {
        line-height: 40px;
        display: flex;
        width: 450px;
        color: $color-black-primary;
      &+li{
        border-top: 1px solid #D2D7E3;
      }
        .label {
          background-color: #F7F9FD;
          font-size: 15px;
          font-family: $jl-font;
          font-weight: 600;

          width: 150px;
          border-right: 1px solid #D2D7E3;
        }

        .value {
          font-size: 15px;
          width: 300px;
        }
      }
    }
  }
}
</style>

<route lang="yaml">
meta:
  layout: main
  personal: true
  auth: true
</route>
