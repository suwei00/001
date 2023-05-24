<script setup lang='ts' name="lottery">
// 123
</script>

<template>
  <div class="box">
    <ol class="details" ml-18px>
      <li>市面上最热门的CG彩票有众多玩法，如快3、PK10、时时彩、六合彩、11选5、幸运28等，全部您最爱的彩种通通都有！</li>
      <li>彩票的玩法说明、走势图可以在每个彩票玩法页面中获取。若还有任何彩票玩法的问题，请联系在线客服咨询。</li>
      <li>投注完成后，移动端点击右上角倒计时处查看“我的投注”及“我的追号”详情。PC端可在投注页面右侧查看“我的投注”及“我的追号”，点击“更多”可以看到更多详情。</li>
      <li>投注成功后，系统将自动从您的账户余额扣除对应的投注金额，如果中奖，奖金会自动添加到您的账户余额。您也可以进入＂我的账户＂——＂彩票记录＂中查看您的账户投注明细。</li>
    </ol>
  </div>
</template>

<style lang='scss' scoped>
.box {
    text-align: left;
    padding: 39px 29px 81px 30px;
}
p {
    line-height: 28px;
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
