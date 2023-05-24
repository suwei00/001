<template>
  <div class="qr-container">
    <cg-container type='smallContainer' radius="8">
      <template #content>
        <cg-container-head>
          <template #center>
            QR
          </template>
        </cg-container-head>
        <div class="content">
          <img class="img" :src="imgUrl" alt="">
        </div>
        <div class="flex-middle jc-sb footer">
          <cg-button whiteStyle :width="140" :height="40" :font-size="15" @click="closeDialog()">HỦY BỎ</cg-button>
          <cg-button :width="140" :height="40" :font-size="15" @click="downloadBase64Image(imgUrl)">TẢI XUỐNG</cg-button>
        </div>
      </template>
    </cg-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  CgContainerHead,
  CgContainer,
  CgButton
} from '@/components/cg-template-2'
import qrcode from 'qrcode';
import Toast from '@cg-template-2-components/toast';
const props = defineProps<{
  url: string;
  closeDialog: () => void;
}>();

const imgUrl = ref('');
qrcode.toDataURL(props.url, { margin: 0, width: 220 }).then((url: string) => {
  imgUrl.value = url;
})

function downloadBase64Image(base64Data: string, filename: string = `${props.url}.png`) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = base64Data;
  link.click();
  Toast('Lưu Thành Công');
  props.closeDialog();
}
</script>

<style lang="scss" scoped>
.qr-container {
  width: 354px;

  .content {
    width: 220px;
    text-align: center;
    padding: 10px;
    overflow: hidden;
    background-color: var(--cg-color-red);
    margin: 25px auto 30px;
    background: var(--cg-color-white);
    box-shadow: 0px 3px 6px var(--cg-shadow-color1);
    border-radius: 12px;

    .img {
      width: 100%;
      height: 100%;
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      pointer-events: none;
    }
  }

  .footer {
    padding: 0 30px 30px 30px;
  }
}
</style>