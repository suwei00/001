<script setup lang='ts' name='delete-dialog'>
const { des } = defineProps<{ des: string }>()
defineEmits(['comfirm', 'cancel'])
</script>

<template>
  <!-- 删除弹窗 -->
  <div class="dialog-tip">
    <div class="body">
      <div class="title" mb-34px>
        <div class="left">
          <h5>温馨提示</h5>
        </div>
        <div class="right" @click="$emit('cancel')">
          <img src="@icons/personal/finance/close-icon.svg" alt="">
        </div>
      </div>
      <p w-330px>
        {{ des }}
      </p>
      <button @click="$emit('comfirm')">
        确认
      </button>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.dialog-tip {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: hsl(0, 0%, 0%, 0.3);
  z-index: 2000;
  color: #333;

  .body {
    width: 550px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 10px 80px 1px rgba(0, 0, 0, 0.05);
    padding: 42px 50px 58px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .title {
      text-align: left;
      position: relative;

      h5 {
        font-size: 18px;
        font-family: $jl-font;
        font-weight: 600;
      }

      .right {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        padding: 5px;

        img {
          width: 14px;
          height: 14px;
        }
      }
    }

    p {
      text-align: center;
      margin: 0 auto 50px;
      font-size: 15px;
      font-family: $jl-font;
      font-weight: 400;
      color: #333333;
    }

    button {
      width: 450px;
      height: 50px;
      background: #597EF7;
      color: #fff;
      border-radius: 6px;
      font-size: 18px;
    }
  }
}
</style>
