<script setup lang='ts' name="service">
const appStore = useAppStore()
</script>

<template>
  <div class="box">
    <h3>在线客服</h3>
    <p>我们的客服人员持续秉持着尽心尽责的服务态度，<span @click="appStore.openService">在线客服</span>全天24小时为您提供一对一的咨询和帮助。</p>
  </div>
</template>

<style lang='scss' scoped>
.box {
  text-align: left;
  padding: 39px 29px 81px 30px;
  font-size: 15px;
  color: #333;
}

h3 {
  font-size: 16px;
  font-family: $jl-font;
  font-weight: 600;
  color: #597EF7;
  margin-bottom: 6px;
}

p {
  line-height: 28px;
}

span {
  cursor: pointer;
  color: #597EF7;
  text-decoration: underline;
}
</style>
