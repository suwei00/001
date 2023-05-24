<script setup lang="ts">
import AppImage from '@template-components/app-image/index.vue';
import { timeToVietnam } from '@/utils/time';

interface Props {
  onOk: () => void;
  start: any;
  end: any;
}
defineProps<Props>();
</script>

<template>
  <div class="maintain">
    <app-image class="warning" src="/header/warning.png" alt="maintain" />
    <div class="text">SẢNH GAME SẼ TIẾN HÀNH BẢO TRÌ, QUÝ KHÁCH VUI LÒNG CHUYỂN TRƯỚC SỐ DƯ TRONG VÍ TIỀN SẢNH VÀO VÍ TIỀN CHÍNH!</div>
    <div class="time">Thời Gian Bảo Trì: {{ timeToVietnam(start * 1000).format('DD/MM/YYYY HH:mm:ss') }}~{{ timeToVietnam(end * 1000).format('DD/MM/YYYY HH:mm:ss') }}</div>

    <button class="cg_but but_w" @click="onOk">TÔI ĐÃ HIỂU</button>
  </div>
</template>

<style lang="scss" scoped>
.maintain {
  width: 498px;
  background-color: #140909;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 0 28px 0;

  .warning {
    width: 80px;
    height: 80px;
  }

  .text {
    font-weight: bold;
    font-size: 18px;
    margin-top: 8px;
    font-family: AppleSystemUIFont;
    color: #fcefd5;
    text-align: center;
    width: 350px;
  }

  .time {
    color: white;
    font-size: 12px;
    margin: 12px 0 20px 0;
  }

  .but_w {
    width: 126px;
    height: 40px;
    border-radius: 40px;
    font-size: 14px;
  }
}
</style>
