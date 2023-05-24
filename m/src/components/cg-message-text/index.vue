<script setup lang="ts">
interface CGMessageTextProps {

}

withDefaults(defineProps<CGMessageTextProps>(), { })
</script>

<template>
  <div class="msg">
    <div class="msg-self">
      <slot name="msg-self"></slot>
    </div>
    <div class="msg-other">
      <slot></slot>
      <slot name="msg-other"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.msg {
  //display: flex;
  //flex-direction: row-reverse;
  width:  516px;
  padding: 12px 20px;
  margin-bottom: 16px;
  box-sizing: border-box;
  border-radius: 16px;
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 37px;
  color: #323233;
  background: #FFFFFF;
  &-self {
    background: #D7EFFB;
  }
  &-other {
    background: #FFFFFF;
    //border: 1px solid #EBEDF0;
  }
}
</style>
