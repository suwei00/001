<template>
  <div class="qr-container">
    <cg-container radius="16" :is-shadow="false" border="0" width="540">
      <cg-container-head>
        <template #center>
          QR
        </template>
      </cg-container-head>
      <div class="img_cont flex ai-c jc-c">
        <cg-container class="qr_img">
          <div class="content">
            <img class="img" :src="imgUrl" alt="">
          </div>
        </cg-container>
      </div>
      <div class="flex-middle jc-sb footer">
        <cg-button whiteStyle :width="212" :height="64" :font-size="24" @click="closeDialog()">HỦY BỎ</cg-button>
        <cg-button :width="212" :height="64" :font-size="24" @click="downloadBase64Image(imgUrl)">TẢI XUỐNG</cg-button>
      </div>
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
}
</script>

<style lang="scss" scoped>
.qr-container {
  width: 540px;

  .img_cont {
    margin: 40px auto;
  }

  .qr_img {
    width: 300px;
    height: 300px;
  }

  .content {
    text-align: center;
    padding: 10px;
    overflow: hidden;
    background-color: var(--cg-color-red);
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
    padding: 0 46px 40px 46px;
  }
}</style>