<script lang="ts" setup>
// component
import Header from '~/components/Header.vue'
import showHeader from '~/utils/show-header'
const { isShowHeader } = showHeader()
</script>

<template>
   <div class="help_guide cent-bg">
    <Header v-if="isShowHeader" title="防劫持教程" /> <div class="helplist cent-top">
      <p class="pd-l">
        <br> 1.连接到WI-FI网络，才能更改设备的DNS设置。<br> 2.首选DNS服务器8.8.8.8。<br> 备用DNS服务器114.114.114.114。<br>
      </p> <h5 class="mgt-40">
        一、电脑端防劫持教程
      </h5> <p class="pd-l">
        1.点击开始，选择控制面板。<br> 2.选择网络和Internet。<br> 3.在网络和共享中心的点击查看网络状态和任务。<br> 4.点击本地连接。<br> 5.点击属性。<br> 6.选择Internet协议版本(TCP/IPV4)，点击进入属性。<br> 7.选择使用下面的DNS服务器地址(E)，并修改：<br> &nbsp;&nbsp;首选DNS服务器(P)：8.8.8.8。<br> &nbsp;&nbsp;备用DNS服务器(A)：114.114.114.114。<br> 8.点击确定完成DNS设置。<br>
      </p> <h5 class="mgt-40">
        二、移动端防劫持教程
      </h5> <p class="pd-l">
        1.点击连接的Wi-Fi网络找到配置DNS。<br> 2.选择使用下面的DNS服务器地址，并修改：<br> &nbsp;&nbsp;首选DNS服务器(P)：8.8.8.8。<br> &nbsp;&nbsp;备用DNS服务器(A)：114.114.114.114。<br> 3.点击储存完成DNS设置。<br>
      </p>
    </div>
  </div>
</template>

 <style lang="scss" scoped>
 @import '~/styles/help.scss';
</style>
