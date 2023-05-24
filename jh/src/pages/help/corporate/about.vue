<script lang="ts" setup>
// component
import Header from '~/components/Header.vue'
import showHeader from '~/utils/show-header'
const { isShowHeader } = showHeader()
</script>

<template>
  <div class="help_guide cent-bg">
    <Header v-if="isShowHeader" title="关于我们" /> <div class="helplist  cent-top">
      <h5 class="mgt-40">
        一、关于我们
      </h5> <div class="pd-l">
        <p class="suo">
          1. 久赢拥有菲律宾政府竞猜委员会（PAGCOR）、欧洲马耳他（MGA）和英国博彩委员会（GAMBLING COMMISSION）颁发的合法执照。注册于英属维尔京群岛（BVI），是受国际行业协会认可的合法公司。<br>
        </p> <p class="suo">
          2. 一直以来我们秉承用户至上的原则，务实经营的理念，聚集优秀的高素质人才资源与业界高质量精英团队合作，致力于打造彩票精品，竭诚为每一位用户奉献全方位的极致体验和高端的游戏享受。久赢与业界知名的博彩产品供应商如AsiaGaming、BBIN、IM等拥有良好的深度合作关系，提供最优质的赛事、真人娱乐场以及几百款小游戏，并不断的开发高质量的娱乐新品。<br>
        </p> <p class="suo">
          3. 全年365天，久赢每一天与您同在，为您提供7x24小时全天候在线客服咨询服务。同时我们拥有经验丰富，水平一流的技术团队，为网站的安全稳定保驾护航，为产品与服务的创新提供源源不断的动力。
        </p>
      </div>
    </div>
  </div>
</template>

 <style lang="scss" scoped>
 @import '~/styles/help.scss';
</style>
