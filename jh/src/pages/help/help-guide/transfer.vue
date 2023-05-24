<script lang="ts" setup>
// component
import Header from '~/components/Header.vue'
import showHeader from '~/utils/show-header'
const { isShowHeader } = showHeader()
</script>

<template>
   <div class="help_guide cent-bg">
    <Header v-if="isShowHeader" title="转账" /> <div class="helplist  cent-top">
      <h5 class="mgt-40">
        一、如何转账？
      </h5> <p class="pd-l">
        1.登录久赢账号——转账。<br> 2.场馆钱包和场馆钱包之间不可以互转。
      </p> <h5 class="mgt-40">
        二、提现常见问题
      </h5> <h5 class="subtitle">
        1. 为什么游戏账户里有钱，却无法提现？
      </h5> <p class="pd-l">
        您需要先将资金从游戏场馆钱包转至中心钱包后才能进行提现操作。
      </p> <h5 class="subtitle">
        2. 转账没有成功，但是钱却没了怎么办？
      </h5> <p class="pd-l">
        转账时请先退出游戏平台再操作；如转账掉单，请联系在线客服查询补单。
      </p>
    </div>
  </div>
</template>

 <style lang="scss" scoped>
 @import '~/styles/help.scss';
</style>
