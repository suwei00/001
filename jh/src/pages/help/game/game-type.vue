<script lang="ts" setup>
// component
import Header from '~/components/Header.vue'
import showHeader from '~/utils/show-header'
const { isShowHeader } = showHeader()
</script>

<template>
  <div class="help_guide cent-bg">
    <Header v-if="isShowHeader" title="游戏类型" /> <div class="helplist  cent-top">
      <h5 class="mgt-40">
        一、娱乐场包含哪些游戏类型？
      </h5> <p class="pd-l">
        1. 久赢游戏多样丰富，除了热门的CG彩票外，还有真人、体育、 棋牌、电子、捕鱼、电竞。各种各样的游戏类型供您选择。
      </p> <h5 class="mgt-40">
        二、 如何获取游戏玩法？
      </h5> <p class="pd-l ">
        1. 各项游戏的详细玩法都可以在每个游戏场馆中获取。若还有任何游戏玩法的问题，请联系在线客服咨询。
      </p> <h5 class="mgt-40">
        三、游戏出错或有纠纷的情况下我该怎么办？
      </h5> <div class="pd-l">
        若有任何游戏方面的问题，请您联系在线客服咨询，并提供以下信息：<br> 1. 您的久赢账号。<br> 2. 游戏详情，包括：游戏名称、投注编号、投注内容、金额和时间。
      </div>
    </div>
  </div>
</template>

 <style lang="scss" scoped>
 @import '~/styles/help.scss';
</style>
