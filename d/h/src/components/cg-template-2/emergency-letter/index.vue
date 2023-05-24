<script setup lang='ts'>
import { CgScrollBar } from '@/components/cg-template-2'
import { timeToVietnam } from '@/utils/time'

defineProps<{
  data: {
    id: string;
    ts: string;
    message_id: string;
    username: string;
    title: string;
    content: string;
    is_top: number;
    is_vip: number;
    ty: number;
    is_read: number;
    send_name: string;
    send_at: number;
    prefix: string;
  }
}>()
</script>
<template>
  <div class="emergency-letter">
    <div class="message">
      <CgScrollBar max-height='576'>
        <div style="white-space:pre-wrap;" v-html="data.content"></div>
      </CgScrollBar>
    </div>
    <h6 class="send-name">{{ data.send_name }}</h6>
    <span class="time">{{ timeToVietnam(data.send_at * 1000) }}</span>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'EmergencyLetter'
}
</script>

<style lang='scss' scoped>
.emergency-letter {
  font: var(--cg-font-text2);

  .message {
    margin-bottom: 20px;
  }

  .send-name {
    font: var(--cg-font-text10);
    margin-bottom: 11px;
  }

  .time {
    font: var(--cg-font-text4);
    color: var(--cg-color-gray);
  }
}
</style>