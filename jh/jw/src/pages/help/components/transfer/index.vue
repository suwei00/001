<script setup lang='ts' name="transfer">
// `123
</script>

<template>
  <div class="box">
    <div class="question">
      <h3>一、如何转账？</h3>
      <p>
        <span>1. 登录久赢账号——转账。</span>
        <span>2. 场馆钱包和场馆钱包之间不可以互转。</span>
      </p>
    </div>
    <div class="question">
      <h3>二、提现常见问题</h3>
      <p>
        <span class="des">1. 为什么游戏账户里有钱，却无法提现？</span>
        <span mb-12px>您需要先将资金从游戏场馆钱包转至中心钱包后才能进行提现操作。</span>
        <span class="des">2. 转账没有成功，但是钱却没了怎么办？</span>
        <span>转账时请先退出游戏平台再操作；如转账掉单，请联系在线客服查询补单。</span>
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

  h3 {
    font-size: 16px;
    font-family: $jl-font;
    font-weight: 600;
    color: #597EF7;
    margin-bottom: 6px;
  }

  p {
    line-height: 28px;
    display: flex;
    flex-direction: column;
  }
}

.des {
  font-family: $jl-font;
  font-weight: 600;
  margin-bottom: 6px;
}
</style>

