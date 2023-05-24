<script lang="ts" setup>
// component
import Header from '~/components/Header.vue'
import showHeader from '~/utils/show-header'
const { isShowHeader } = showHeader()
</script>

<template>
   <div class="help_guide cent-bg">
    <Header v-if="isShowHeader" title="充值" /> <div class="helplist  cent-top">
      <h5 class="mgt-40">
        一、如何充值？
      </h5> <p class="pd-l">
        1. 充值前请先登录久赢账号——充值——选择充值方式。
      </p> <h5 class="mgt-40">
        二、充值方式
      </h5> <h5 class="subtitle">
        银行转账
      </h5> <div class="pd-l">
        <p class="suo">
          1. 登录久赢账号——个人中心——充值——银行转账。<br>
        </p> <p class="suo">
          2. 登录个人网上银行——转账汇款——复制收款信息——输入转账金额——转账完成。<br>
        </p> <p class="suo">
          3. 填到对应的表单——填写充值金额——填写充值人姓名——点击【立即充值】——充值完成。
        </p>
      </div> <h5 class="subtitle">
        数字货币-USDT
      </h5> <div class="pd-l">
        <p class="suo">
          1. 登录久赢账号——个人中心——充值——数字货币——USDT充值。
        </p> <p class="suo">
          2. 登录USDT账号——转账汇款——复制收款信息——输入USDT数量——转账完成。
        </p> <p class="suo">
          3. 填到对应的表单——填写USDT数量——填写区块链交易ID——上传交易截图——点击【立即充值】——充值完成。
        </p>
      </div> <h5 class="subtitle">
        数字货币-OKpay/GOpay
      </h5> <div class="pd-l ">
        <p class="suo">
          1. 登录久赢账号——个人中心——充值——数字货币——OKpay/GOpay数字货币。
        </p> <p class="suo">
          2. 输入充值金额——点击【立即充值】——完成付款——充值完成。
        </p>
      </div> <h5 class="subtitle">
        微信/支付宝支付
      </h5> <div class="pd-l">
        <p class="suo">
          1. 登录久赢账号——个人中心——充值——微信/支付宝——任一充值通道。
        </p> <p class="suo">
          2. 输入充值金额——点击【立即充值】——完成付款——充值完成。
        </p>
      </div> <h5 class="mgt-40">
        三、充值常见问题
      </h5> <h5 class="subtitle">
        1. 没有网银如何充值？
      </h5> <p class="pd-l ">
        强烈推荐使用数字货币充值，充值秒到账，资金安全无忧，也可以选择微信支付或支付宝充值，多种充值方式可供您选择。
      </p> <h5 class="subtitle">
        2. 充值至旧的银行卡账户怎么办？
      </h5> <p class="pd-l">
        每次充值前请登录官网获取最新的银行卡账户，存至旧的银行卡账户将导致充值无法到账。
      </p> <h5 class="subtitle">
        3. 充值一般多久到账？
      </h5> <p class="pd-l">
        我们在收到您的款项后1-5分钟内完成处理，如超过5分钟可联系在线客服咨询。
      </p>
    </div>
  </div>
</template>

 <style lang="scss" scoped>
 @import '~/styles/help.scss';
</style>
