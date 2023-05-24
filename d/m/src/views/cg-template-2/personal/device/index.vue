<script setup lang='ts'>
import { ref } from 'vue';
import {
  CgContainer,
  CgDivider,
} from '@/components/cg-template-2';
import PersonalTitle from '../components/personal-title/index.vue';
import { storeToRefs } from 'pinia';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { getIp } from '@/utils/deviceUtil';
import getDeviceInfo from '@/utils/getDeviceInfo';
import { getTimeStampToDay, timeStampToVietnam } from '@/utils/time';
const userInfoStore = userInfoStateStore();
const { userInfo } = storeToRefs(userInfoStore);
const webVersion = globalConfig.VERSION;
const domain = window.location.host.replace(/(www|web)\./, '');
const time = ref(new Date().valueOf());
const ip = ref('');
const browser = ref({});
getIp().then(res => {
  ip.value = res.loc + ' ' + res.ip;
});
getDeviceInfo().then((res: any) => {
  browser.value = res;
});
</script>
<template>
  <personal-title title="THÔNG TIN THIẾT BỊ" description="" />
  <div class="device">
    <CgContainer padding="0">
      <template #content>
        <div class="container flex">
          <div class="device-name">
            <div class="txt flex">
              <span class="flex-1">Tài Khoản Thành Viên</span>
              <cg-divider :color="'--cg-color-blue8'" :direction="'vertical'" />
            </div>
            <cg-divider :color="'--cg-color-blue8'" />
            <div class="txt flex">
              <span class="flex-1">Cổng Đăng Nhập</span>
              <cg-divider :color="'--cg-color-blue8'" :direction="'vertical'" />
            </div>
            <cg-divider :color="'--cg-color-blue8'" />
            <div class="txt flex">
              <span class="flex-1">Địa Chỉ IP</span>
              <cg-divider :color="'--cg-color-blue8'" :direction="'vertical'" />
            </div>
            <cg-divider :color="'--cg-color-blue8'" />
            <!-- <div class="txt flex">
              <span class="flex-1">Loại Mạng</span>
              <cg-divider :color="'--cg-color-blue8'" :direction="'vertical'" />
            </div>
            <cg-divider :color="'--cg-color-blue8'" /> -->
            <!-- <div class="txt flex">
              <span class="flex-1">Phiên Bản Trình Duyệt</span>
              <cg-divider :color="'--cg-color-blue8'" :direction="'vertical'" />
            </div> -->
            <!-- <cg-divider :color="'--cg-color-blue8'" /> -->
            <div class="txt flex">
              <span class="flex-1">Tên Miền</span>
              <cg-divider :color="'--cg-color-blue8'" :direction="'vertical'" />
            </div>
            <cg-divider :color="'--cg-color-blue8'" />
            <div class="txt flex">
              <span class="flex-1">Múi Giờ</span>
              <cg-divider :color="'--cg-color-blue8'" :direction="'vertical'" />
            </div>
            <cg-divider :color="'--cg-color-blue8'" />
            <div class="txt flex">
              <span class="flex-1">Phiên Bản Web</span>
              <cg-divider :color="'--cg-color-blue8'" :direction="'vertical'" />
            </div>
          </div>
          <div class="device-detail flex-1">
            <div class="txt">{{ userInfo.username }}</div>
            <cg-divider :color="'--cg-color-blue8'" />
            <div class="txt">Web</div>
            <cg-divider :color="'--cg-color-blue8'" />
            <div class="txt">{{ ip }}</div>
            <cg-divider :color="'--cg-color-blue8'" />
            <!-- <div class="txt">{{ browser.netWork }}</div>
            <cg-divider :color="'--cg-color-blue8'" /> -->
            <!-- <div class="txt">{{ browser.browser_type }}({{ browser.browser_version }})</div> -->
            <!-- <cg-divider :color="'--cg-color-blue8'" /> -->
            <div class="txt">{{ domain.toUpperCase() }}</div>
            <cg-divider :color="'--cg-color-blue8'" />
            <div class="txt">{{ timeStampToVietnam(time) }}&nbsp;UTC+7
              <!-- {{ getTimeStampToDay(time) }}&nbsp; -->
            </div>
            <cg-divider :color="'--cg-color-blue8'" />
            <div class="txt">{{ webVersion }}</div>
          </div>
        </div>
      </template>
    </CgContainer>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'Device'
}
</script>

<style lang='scss' scoped>
.device {
  width: 560px;
}

.txt {
  height: 50px;
  padding-left: 24px;
}

.device-name {
  width: 200px;
  color: var(--cg-color-grey1);
  font: var(--cg-font-text1);
  text-align: left;
  background: var(--cg-color-white8);
  line-height: 50px;
}

.device-detail {
  color: var(--cg-color-grey1);
  font: var(--cg-font-text);
  text-align: left;
  line-height: 50px;
}
</style>