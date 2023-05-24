<script setup lang='ts' name="ah-tutorial">
// 123
</script>

<template>
  <div class="box">
    <div class="question">
      <p class="details">
        <span>1. 连接到WI-FI网络，才能更改设备的DNS设置。</span>
        <span>2. 首选DNS服务器 8.8.8.8。</span>
        <span>3. 不用DNS服务器114.114.114.114。</span>
      </p>
    </div>
    <div class="question">
      <h3>一、电脑端防劫持教程</h3>
      <p class="details">
        <span>1. 点击开始，选择控制面板。</span>
        <span>2. 选择网络和Internet。</span>
        <span>3. 在网络和共享中心的点击查看网络状态和任务。</span>
        <span>4. 点击本地连接。</span>
        <span>5. 点击属性。</span>
        <span>6. 选择Internet协议版本(TCP/IPV4)，点击进入属性。</span>
        <span>7. 选择使用下面的DNS服务器地址(E)，并修改： </span>
        <span ml-18px>首选DNS服务器(P) ：8.8.8.8。</span>
        <span ml-18px>备用DNS服务器(A)：114.114.114.114。</span>
        <span>8. 点击确定完成DNS设置。</span>
      </p>
    </div>
    <div class="question">
      <h3>二、移动端防劫持教程</h3>
      <p class="details">
        <span>1.点击连接的Wi-Fi网络找到配置DNS 。</span>
        <span>2.选择使用下面的DNS服务器地址，并修改： </span>
        <span>首选DNS服务器(P) ：8.8.8.8。</span>
        <span>备用DNS服务器(A)：114.114.114.114。</span>
        <span>3.点击储存完成DNS设置 </span>
      </p>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.box {
  text-align: left;
  padding: 39px 29px 81px 30px;
}

.question {
  font-size: 15px;
  color: #333333;
  margin-bottom: 36px;
}

h3 {
  font-size: 16px;
  font-family: $jl-font;
  font-weight: 600;
  color: #597EF7;
  margin-bottom: 6px;
}

.des {
  font-family: $jl-font;
  font-weight: 600;
  margin-bottom: 6px;
}

p {
  line-height: 28px;
}

h6 {
  font-family: $jl-font;
  font-weight: 600;
  margin-bottom: 6px;
}

.details {
  display: flex;
  flex-direction: column;
}
</style>
