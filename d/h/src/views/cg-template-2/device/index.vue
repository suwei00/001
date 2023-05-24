<script lang="ts" setup>
import { ref, onMounted, watchEffect } from 'vue';
import { CgDivider, CgIcon, CgContainer, CgHeader } from '@/components/cg-template-2'
import getDeviceInfo from '@/utils/getDeviceInfo';
import { dayjs } from '@/utils/time';
// import html2canvas from 'html2canvas';
// import { useAppStore } from '@/store-pinia';
import download from 'downloadjs';
import { userInfoStateStore } from '@/store-pinia/userInfo'
import { getTimeStampToDay, timeToVietnamBlue } from '@/utils/time';
import { storeToRefs } from 'pinia';

const userInfoStore = userInfoStateStore()
const { userInfo } = storeToRefs(userInfoStore)
const ip = ref('');
const info = ref({});
const hostname = window.location.hostname;
const time = ref(new Date().valueOf());
const git = globalConfig.VERSION;
getDeviceInfo().then(res => {
    info.value = res;
});
const getIp = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', 'https://www.cloudflare.com/cdn-cgi/trace', true);
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = xhr.response
                    .trim()
                    .split('\n')
                    .reduce((obj: any, pair: any) => {
                        pair = pair.split('=');
                        return (obj[pair[0]] = pair[1]), obj;
                    }, {});
                ip.value = `${data.loc} ${data.ip}`;
            }
        }
    };
};
getIp();
const screensHot = () => { // 截图
    console.log('screen hot')
    const dom: any = document.getElementsByClassName('device')[0] as HTMLImageElement;
    // const canvasDevice = document.querySelector('#canvasDevice') as HTMLCanvasElement;
    // const { width, height } = dom.getBoundingClientRect();

    // html2canvas(dom, {
    //   allowTaint: true,
    //   useCORS: true,
    //   scale: 1,
    //   // canvas: canvasDevice,
    //   // width: width * window.devicePixelRatio,
    //   // height: height * window.devicePixelRatio,
    //   // x: width * window.devicePixelRatio,
    //   // y: height * window.devicePixelRatio,
    // }).then(canvas => {
    //     // canvas to image，download
    //     console.log('canvas ======== ');
    //     const img = canvas.toDataURL('image/png');
    //     console.log(img);
    //     download(img, `device-${dayjs(time.value).format('YYYYMMDDHHmmss')}.png`);

    // }).catch(err => {
    //   console.log('2canvas error = ', err);
    // }).finally(() => {
    //   console.log('finally');
    // });

    (window as any).domtoimage.toPng(document.querySelector('#devicePageId'))
    .then((dataUrl: any) => {
        // const img = new Image();
        // img.src = dataUrl;
        // document.body.appendChild(img);
        download(dataUrl, `device-${dayjs(time.value).format('YYYYMMDDHHmmss')}.png`);
    })
    .catch((err: any) => {
        console.error('oops, something went wrong!', err);
    });
}
</script>

<template>
    <cg-header>
        THÔNG TIN THIẾT BỊ
        <template #actions>
            <button class="right-icon" @click.stop="screensHot">
                <cg-icon name="i_photo" :width="50" />
            </button>
        </template>
    </cg-header>
    <div class="device" id="devicePageId">
        <div class="container-dev" id="deviceConDev">
            <div class="item" id="taiKhon">
                <div>Tài Khoản Thành Viên</div>
                <div id="abcdEFG">{{ userInfo.username }}</div>
            </div>
            <div class="divider"></div>
            <div class="item">
                <div>Cổng Đăng Nhập</div>
                <div>H5</div>
            </div>
            <div class="divider"></div>
            <div class="item">
                <div>Địa Chỉ IP</div>
                <div>{{ ip }}</div>
            </div>
            <div class="divider"></div>
            <div class="item">
                <div>Phiên Bản Hệ Điều Hành Điện Thoại</div>
                <div>{{ info.vs }}</div>
            </div>
            <div class="divider"></div>
            <div class="item">
                <div>Tên Miền</div>
                <div>{{ hostname.toUpperCase() }}</div>
            </div>
            <div class="divider"></div>
            <div class="item">
                <div>Múi Giờ</div>
                <div>{{ timeToVietnamBlue(time) }}&nbsp;UTC+7</div>
            </div>
            <div class="divider"></div>
            <div class="item">
                <div>Phiên Bản Trang Mạng</div>
                <div>{{ git }}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'Device'
}
</script>

<style lang="scss" scoped>
.device {
    padding: 24px 32px;
}
.container-dev {
  padding: 0 20px;
  border: 1px solid var(--cg-color-blue11);
  border-radius: 16px;
  box-shadow: 0px 8px 8px var(--cg-color-blue12);
  background: var(--cg-color-white);
}
.divider {
  background: var(--cg-color-blue13);
  margin: 0px;
  height: 1px;
}
.right-icon {
    margin-top: 15px;
    background-color: transparent;
    outline: none;
}

.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;

    >div:nth-of-type(1) {
        color: var(--cg-color-black1);
        font: var(--cg-font-text7);
    }

    >div:nth-of-type(2) {
        color: var(--cg-color-gray5);
        font: var(--cg-font-text2);
    }
}
.canvas-device {
  position: fixed;
  bottom: -10000px;
  left: -10000px;
  z-index: -999;
}
</style>
