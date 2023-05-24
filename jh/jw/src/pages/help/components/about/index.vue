<script setup lang='ts' name="about">
// 123
</script>

<template>
  <div class="box">
    <div class="question">
      <h3>一、关于我们</h3>
      <ol class="details" ml-18px>
        <li>久赢拥有菲律宾政府竞猜委员会（PAGCOR）、欧洲马耳他（MGA）和英国博彩委员会（GAMBLING COMMISSION）颁发的合法执照。注册于英属维尔京群岛（BVI），是受国际行业协会认可的合法公司。</li>
        <li>一直以来我们秉承用户至上的原则，务实经营的理念，聚集优秀的高素质人才资源与业界高质量精英团队合作，致力于打造彩票精品,竭诚为每一位用户奉献全方位的极致体验和高端的游戏享受。久赢与业界知名的博彩产品供应商如AsiaGaming、BBIN、IM等拥有良好的深度合作关系，提供最优质的赛事、真人娱乐场以及几百款小游戏，并不断的开发高质量的娱乐新品。</li>
        <li>全年365天，久赢每一天与您同在，为您提供7x24小时全天候在线客服咨询服务。同时我们拥有经验丰富，水平一流的技术团队，为网站的安全稳定保驾护航，为产品与服务的创新提供源源不断的动力。</li>
      </ol>
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
  list-style: decimal;
  line-height: 28px;
  li{
    &:nth-of-type(1){
      margin-left: -3px;
      padding-left: 3px;
    }
  }
}
</style>
