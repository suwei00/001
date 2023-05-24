<script setup lang="ts"></script>
<template>
  <cg-nav-header fixed left-arrow title="Thông báo" placeholder />
  <div class="notice">
    <!-- 有数据时 -->
    <div class="notice_item">
      <div>
        <cg-avatar icon="avatar_notice" />
      </div>
      <div class="content">
        为了提供更优质的服务和体验,9月11日至9月25日,我刊进行网站系统升级维护。由此给您带来的不便,敬请谅解。
        <cg-time color="5" :time="1631328000000" class="time" />
      </div>
    </div>
    <div class="notice_item" v-for="i in 5">
      <div>
        <cg-avatar icon="avatar_notice" />
      </div>
      <div class="content">
        [退群提示]xx群xx成员退出了群组，请注意！
        <cg-time color="5" :time="1631328000000" class="time" />
      </div>
    </div>
    <!-- 无数据时 -->
    <cg-empty />
  </div>
</template>
<style lang="scss" scoped>
.notice {
  padding: 4px 24px;

  &_item {
    display: flex;
    margin-top: 28px;
  }

  .content {
    position: relative;
    width: 516px;
    padding: 12px 20px;
    margin-left: 16px;
    line-height: 37px !important;
    color: var(--cg-color-text-3);
    font: var(--cg-font-6);
    border: 1px solid var(--cg-color-bg-10);
    background-color: var(--cg-color-bg-white);
    border-radius: 16px;
    text-align: justify;

    .time {
      position: absolute;
      bottom: 12px;
      right: 20px;
    }
  }

}
</style>