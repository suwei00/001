<script lang="ts" setup>
// component
import Header from '~/components/Header.vue'
import showHeader from '~/utils/show-header'
const { isShowHeader } = showHeader()
</script>

<template>
  <div class="help_guide cent-bg">
    <Header v-if="isShowHeader" title="提现" /> <div class="helplist  cent-top">
      <h5 class="mgt-40">
        一、如何提现？
      </h5> <p class="pd-l">
        登录久赢账号——点击网站首页上方会员账号——我的钱包点击“提现”按钮——进入提现页面。
      </p> <h5 class="subtitle">
        1. 银行卡提现
      </h5> <p class="pd-l">
        1) 第一次提现请先绑定银行卡，绑定银行卡步骤：
      </p> <p class="pd-l">
        登录久赢账号——个人中心——账户管理——银行卡管理——绑定银行卡。
      </p> <p class="pd-l">
        2)绑定完成后在提现金额输入框输入金额，点击【立即提现】。
      </p> <h5 class="subtitle">
        2. 数字货币提现
      </h5> <div class="pd-l  ">
        1)登录久赢账号——进入个人中心——账户管理——数字货币管理——绑定数字货币地址。 2)绑定完成后在提现金额输入框输入需要提现的人民币金额，系统会自动转换为对应的数字货币数量。核实无误后，点击【立即提现】。
      </div> <h5 class="subtitle">
        添加虚拟币地址需要注意：
      </h5> <p class="pd-l">
        1. 协议模式与数字货币地址相对应，否则会导致无法到账。<br> 2. 数字货币地址需要填写正确，请仔细核对，否则会导致无法到账。
      </p> <h5 class="mgt-40">
        二、可以使用别人的银行卡进行提现吗？
      </h5> <p class="pd-l">
        为了确保客户的账户资金安全，提现需要使用账号本人的银行卡才可以进行提现哦，且提现银行卡姓名必须与注册姓名一致。
      </p> <h5 class="mgt-40">
        三、申请提现需要注意些什么？
      </h5> <p class="pd-l">
        1. 绑定的银行卡姓名需与久赢账号的注册姓名一致。<br> 2. 绑定的银行卡信息需要正确。<br> 3. 若您未申请任何红利优惠，投注满一倍流水即可申请提现。<br> 4. 若申请了红利，则需要满足优惠活动写明的有效投注额要求。<br> 5. 全天24小时都可进行提现申请。<br> 6. 如忘记安全密码，请及时联系在线客服咨询。<br>
      </p> <h5 class="mgt-40">
        四、游戏账户里有钱为什么无法提现？
      </h5> <p class="pd-l">
        有可能您在对应游戏参加了优惠活动，游戏金额锁定。有任何疑问可以联系在线客服为您核查！
      </p> <h5 class="mgt-40">
        五、会员可以绑定多张银行卡吗？
      </h5> <p class="pd-l">
        会员最多可以绑定5张银行卡进行提现操作，在个人中心选择“我的钱包”，按步骤添加银行卡即可。
      </p> <h5 class="mgt-40">
        六、提现为什么还需要审核？
      </h5> <p class="pd-l">
        提现审核是相关部门在给您办理提现之前的一个简单的核实步骤，是为了确保客户资金安全，需要核实相关信息，若给您带来不便敬请谅解。
      </p> <h5 class="mgt-40">
        七、提现流水要求
      </h5> <p class="pd-l">
        会员只要达到提现流水要求，即可随时申请提现。比如，您存100元，在该笔充值后，您累计投注达到100元的提现流水，即可办理提现！
      </p> <p class="pd-l">
        温馨提示：若会员有领取其他优惠，必须达到相对应的有效流水才能办理提现哦！
      </p> <h5 class="mgt-40">
        八、我的流水还差多少？
      </h5> <p class="pd-l">
        首先确认自己是否有申请优惠活动，若有，需找到对应优惠活动查看所需流水，再点击个人中心——投注记录查看流水；若否，只需达到充值金额的1倍流水即可。
      </p> <p class="pd-l">
        若无法确认自己所需流水倍数，可直接联系在线客服进行咨询。
      </p> <h5 class="mgt-40">
        九、提现支持的银行
      </h5> <p class="pd-l">
        现为您提供15家取款银行：中国银行、工商银行、建设银行、交通银行、农业银行、招商银行、桂林银行、平安银行、华夏银行、 广东发展银行、邮政储蓄银行、中信银行、兴业银行、上海浦发银行、光大银行。系统不定时会有所调整，具体还请您以添加银行卡时提供的银行为准。
      </p> <h5 class="mgt-40">
        十、提现输入金额无法提交申请？
      </h5> <p class="pd-l">
        1. 金额是否从场馆成功转出至中心钱包。<br> 2. 若提示"您有订单尚未核实成功"请联系在线客服进行咨询。
      </p> <h5 class="mgt-40">
        十一、提现到账时间？
      </h5> <p class="pd-l">
        会员提现一般5分钟内到账，如果30分钟还未到账可以联系在线客服为您核查！
      </p> <h5 class="mgt-40">
        十二、提现未到账，怎么办？
      </h5> <p class="pd-l">
        正常情况下5分钟以内即可到账，若有延迟，一般是网络波动、风控审核等，耐心等待片刻即可，若30分钟以后未到账可以联系在线客服，同时提供以下信息：
      </p> <p class="pd-l">
        1）会员账号。<br> 2）提现时间。<br> 3）提现金额。<br>
      </p>
    </div>
  </div>
</template>

 <style lang="scss" scoped>
 @import '~/styles/help.scss'; .help_guide{ overflow: scroll; height: 100%; }
</style>
