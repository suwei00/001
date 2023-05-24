<script setup lang='ts' name="deposit">
const data = [
  {
    title: '一、如何充值？',
    content: '充值前请先登录久赢账号——充值——选择充值方式。',
  },
  {
    title: '二、充值方式',
    rules: [
      {
        des: '银行转账',
        rule: [
          '1. 登录久赢账号——个人中心——充值——银行转账。',
          '2. 登录个人网上银行——转账汇款——复制收款信息——输入转账金额——转账完成。',
          '3. 填到对应的表单——填写充值金额——填写充值人姓名——点击【立即充值】——充值完成。',
        ],
      },
      {
        des: '数字货币-USDT',
        rule: [
          '1. 登录久赢账号——个人中心——充值——数字货币——USDT充值。',
          '2. 登录USDT账号——转账汇款——复制收款信息——输入USDT数量——转账完成。',
          '3. 填到对应的表单——填写USDT数量——填写区块链交易ID——上传交易截图——点击【立即充值】——充值完成。',
        ],
      },
      {
        des: '数字货币-OKpay/GOpay',
        rule: [
          '1. 登录久赢账号——个人中心——充值——数字货币——OKpay/GOpay数字货币。',
          '2. 输入充值金额——点击【立即充值】——完成付款——充值完成。',
        ],
      },
      {
        des: '微信/支付宝支付',
        rule: [
          '1. 登录久赢账号——个人中心——充值——微信/支付宝——任一充值通道。',
          '2. 输入充值金额——点击【立即充值】——完成付款——充值完成。',
        ],
      },
    ],
  },
  {
    title: '三、充值常见问题',
    rules: [
      {
        des: '1. 没有网银如何充值？',
        rule: ['强烈推荐使用数字货币充值，充值秒到账，资金安全无忧，也可以选择微信支付或支付宝充值，多种充值方式可供您选择。'],
      },
      {
        des: '2. 充值至旧的银行卡账户怎么办？',
        rule: ['每次充值前请登录官网获取最新的银行卡账户，存至旧的银行卡账户将导致充值无法到账。'],
      },
      {
        des: '3. 充值一般多久到账？',
        rule: ['我们在收到您的款项后1-5分钟内完成处理，如超过5分钟可联系在线客服咨询。'],
      },
    ],
  },
]
</script>

<template>
  <div class="box">
    <div v-for="(d, i1) in data" :key="i1" class="question">
      <h3>{{ d.title }}</h3>
      <p v-if="d.content">
        {{ d.content }}
      </p>
      <div v-for="(r, i2) in d.rules" v-show="d.rules" :key="i2" class="rules">
        <h6>{{ r.des }}</h6>
        <p class="details">
          <span v-for="(detail, i3) in r.rule" :key="i3">{{ detail }}</span>
        </p>
      </div>
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
  }

  .rules {
    h6 {
      font-family: $jl-font;
      font-weight: 600;
      margin-bottom: 6px;
    }

    .details {
      display: flex;
      flex-direction: column;
      margin-bottom: 12px;
    }
  }
}
</style>

