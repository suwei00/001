<script lang="ts" setup>
// component
import Header from '~/components/Header.vue'
import showHeader from '~/utils/show-header'
const { isShowHeader } = showHeader()
</script>

<template>
   <div class="help_guide cent-bg">
    <Header v-if="isShowHeader" title="优惠申请" /> <div class="helplist  cent-top">
      <h5 class="mgt-40">
        一、优惠活动如何申请？
      </h5> <p class="pd-l">
        登录账号后点击优惠活动页面，选择相应的优惠活动。
      </p> <h5 class="mgt-40">
        二、返水、返点何时派发？
      </h5> <p class="pd-l">
        返水及返点无需申请，皆由系统自动派发。 返水佣金将会于次日中午北京时间12点后派发至您的账户；返点则会实时派发至您的账户。 只需1倍流水即可提现（不限游戏平台）。详情请查询代理页面或联系在线客服咨询。
      </p> <h5 class="mgt-40">
        三、优惠申请成功后一直没有收到彩金怎么办？
      </h5> <p class="pd-l">
        如果您的优惠申请成功后没有在指定时间收到彩金。请您联系在线客服咨询。
      </p>
    </div>
  </div>
</template>

 <style lang="scss" scoped>
 @import '~/styles/help.scss';
</style>
