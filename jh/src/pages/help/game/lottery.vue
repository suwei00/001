<script lang="ts" setup>
// component
import Header from '~/components/Header.vue'
import showHeader from '~/utils/show-header'

const { isShowHeader } = showHeader()
</script>

<template>
  <div class="help_guide cent-bg">
    <Header v-if="isShowHeader" title="彩票问题" />
    <div class="helplist  cent-top">
      <br>
      <div class="pd-l">
        <p class="suo">
          1. 市面上最热门的CG彩票有众多玩法，如快3、PK10、时时彩、六合彩、11选5、幸运28等，全部您最爱的彩种通通都有！
        </p>
        <p class="suo">
          2. 彩票的玩法说明、走势图可以在每个彩票玩法页面中获取。若还有任何彩票玩法的问题，请联系在线客服咨询。
        </p>
        <p class="suo">
          3. 投注完成后，移动端点击右上角倒计时处查看“我的投注”及“我的追号”详情。PC端可在投注页面右侧查看“我的投注”及“我的追号”，点击“更多”可以看到更多详情。
        </p>
        <p class="suo">
          4. 投注成功后，系统将自动从您的账户余额扣除对应的投注金额，如果中奖，奖金会自动添加到您的账户余额。您也可以进入＂我的账户＂——＂彩票记录＂中查看您的账户投注明细。
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~/styles/help.scss';
</style>

