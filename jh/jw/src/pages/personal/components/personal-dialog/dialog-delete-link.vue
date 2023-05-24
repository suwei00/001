<script setup lang='ts' name="dialog-delete-link">
import closeImg from '@images/home/emergency/close.png?preset=full'

const emit = defineEmits(['confirm'])
const { isOpen, open, close } = usePersonalDialog()
const confirm = () => {
  close()
  emit('confirm')
}

defineExpose({ open })
</script>

<template>
  <div v-if="isOpen" class="dialog-delete-link">
    <div class="body">
      <div class="title">
        <h4>温馨提示</h4>
        <div class="close" p-5px @click="close">
          <img :src="getSupportImage(closeImg)" alt="" h-14px>
        </div>
      </div>
      <p>
        如删除该邀请码，则之后无法通过该邀请码注册新用户，请您确认是否删除？
      </p>
      <button @click="close">
        取消
      </button>
      <button @click="confirm">
        确定
      </button>
    </div>
  </div>
</template>

<style lang='scss' scoped>
    .dialog-delete-link {
      width: 100vw;
      height: 100vh;
      position: fixed;
      z-index: 2000;
      top: 0;
      left: 0;
      background-color: rgb(0, 0, 0, 0.3);
    }

    .body {
      width: 550px;
      padding-bottom: 53px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0px 10px 80px 1px rgba(0, 0, 0, 0.05);
      position: absolute;
      top: 22%;
      left: 50%;
      transform: translateX(-50%);
      font-size: 15px;
      color: #333;
      overflow: hidden;
    }

    .title {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 550px;
      height: 48px;
      background: linear-gradient(90deg, #96AEFF 0%, #597EF7 100%);

      h4 {
        font-size: 18px;
        font-family: $jl-font;
        font-weight: bold;
        color: #FFFFFF;
      }

      .close {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 16px;
        cursor: pointer;
      }
    }
    p{
        padding: 0 50px;
        color: #333;
        font-size: 15px;
        margin-bottom: 35px;
        margin-top: 34px;
    }

    button {
      width: 215px;
      height: 50px;
      color: #fff;
      border-radius: 6px;
      background-color: #597EF7;
      border: 1px solid #597EF7;
      font-size: 18px;
      &:nth-of-type(1){
        background-color: #fff;
        color: #597EF7;
        margin-right: 20px;
      }
    }
    </style>

