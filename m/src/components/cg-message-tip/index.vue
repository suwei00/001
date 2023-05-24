<script setup lang="ts">
interface CGMessageTipProps {
  type?: string
  message: string
  pinned?: boolean
  read?: boolean
}

withDefaults(defineProps<CGMessageTipProps>(), {
  pinned: false,
  read: false,
})
</script>

<template>
  <div class="message-tip">
    <p>{{message}}</p>
<!--    <van-text-ellipsis-->
<!--      :content="message"-->
<!--    />-->
  </div>
</template>

<style lang="scss" scoped>
.message-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0;
  p {
    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    font-size: 28px;
    line-height: 32px;
    text-align: center;
    //padding: 12px 16px;
    padding: 6px 8px;
    width: 409px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    color: #FFFFFF;
  }


}
</style>
