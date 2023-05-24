<script setup lang='ts' name="login-popup">
import closeImg from '@images/home/emergency/close.png?preset=full'

const { goLogin } = defineProps<{ goLogin: any }>()
const { popupRef, bodyRef, close } = usePublicPopup()
const confirm = () => {
  close()
  const t = setTimeout(() => {
    goLogin()
    clearTimeout(t)
  }, 10)
}
</script>

<template>
  <div ref="popupRef" class="login-popup">
    <div ref="bodyRef" class="body">
      <div class="title">
        <h4>温馨提示</h4>
        <div class="close" p-5px @click="close">
          <img :src="getSupportImage(closeImg)" alt="" h-14px>
        </div>
      </div>
      <div class="content">
        <p mb-33px>
          请先登录账号，才能了解更多
        </p>
        <button @click="confirm">
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.login-popup {
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
  border-radius: 10px;
  box-shadow: 0px 10px 80px 1px rgba(0, 0, 0, 0.05);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
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
.content{
  background-color: #fff;
  padding-top: 34px;
  padding-bottom: 53px;
}

button {
  width: 450px;
  height: 50px;
  color: #fff;
  border-radius: 6px;
  background-color: #597EF7;
  font-size: 18px;
}
</style>

