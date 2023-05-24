<script setup lang="ts">
import dayjs from "dayjs";
const VITE_APP_FULL_TIME:string = import.meta.env.VITE_APP_FULL_TIME;

interface CGMessageReplyProps {
  username?: string
  // message?: string
  // replyContent?: string
  time?: number | string
}

withDefaults(defineProps<CGMessageReplyProps>(), {
  time: new Date().getTime()
})
</script>

<template>
  <div class="message_reply">
    <cg-message-text>
      <div class="user">
        <div class="user__name">{{username}}</div>
<!--        <div>{{message}}</div>-->
        <slot name="message"></slot>
      </div>
    </cg-message-text>
    <cg-message-text>
<!--      <div class="reply_content">{{replyContent}}</div>-->
      <slot name="replyContent"></slot>
<!--      <cg-time class="cg-time" :time="time" :format="VITE_APP_FULL_TIME" />-->
    </cg-message-text>
  </div>
</template>

<style lang="scss" scoped>
.cg-time {
  display: flex;
  justify-content: flex-end;
  padding: 18px 12px 0;
}
.message_reply {
  Width: 516px;
  padding: 8px;
  margin: 12px;
  background-color: #ffffff;
  .user {
    padding: 12px;
    background: #EDF4FA;
    mix-blend-mode: normal;
    border-radius: 16px;
    border-left: 8px #1B75F0 solid;


    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    line-height: 30px;
    text-align: justify;
    color: #49545C;

    &__name {
      color: #1B75F0;
      font-weight: 400;
      font-size: 32px;
      line-height: 28px;
    }
  }
  .reply_content {
    font-weight: 400;
    font-size: 32px;
    line-height: 37px;
    text-align: justify;
    color: #323233;
  }
}
</style>
