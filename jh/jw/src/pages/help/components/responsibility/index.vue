<script setup lang='ts' name="responsibility">
const data = [
  {
    title: '一、博彩责任',
    content: [
      '久赢是一个提供专业在线网上娱乐城、在线彩票的正规网站。然则我们强烈建议所有玩家都保持一个娱乐的心态来面对所有游戏。将会通过极致的用户体验、颠覆性娱乐产品、超本土化的个性服务来为所有玩家提供一个舒适健康的娱乐环境。 我们希望所有玩家在游戏的同时能及时调整好自己的心态，切勿由于过度沉迷游戏而造成个人经济、事业、家庭等各个方面受到影响。对此，我们强烈建议阁下重新审视自己的行为，明确和调整自己的娱乐心态，重新投入正常的生活和工作中来。',
    ],
  },
  {
    title: '二、超过18岁',
    content: [
      '您必须年满18岁（或在您居住的管辖范围内不被视为未成年人）才可进入此网站。 任何未满18岁的人不得在我们网站注册和投注，我们将以严谨的态度看待和处理此问题。',
    ],
  },
  {
    title: '三、赌博问题防护',
    content: [
      '我们强烈建议您定期审视您的博彩行为，检验自己是否投入过度。如果您遇到相关问题请进行以下行为测试：',
      '1. 有否曾因赌博而耽误工作时间?',
      '2. 赌博有否影响您的声望?',
      '3. 赌博之后，您是否感到自责?阁下有否曾经用赌博所赢得的钱来还债，或者解决财政困难?',
      '4. 赌博有否导致您的抱负及效率减低?',
      '5. 输钱后，您是否感觉您一定要尽快回来赚回您所失去的?',
      '6. 赢钱后，您是否有一种强烈的欲望，回来赢得更多?',
      '7. 您是否时常赌博至分文都用尽?',
      '8. 您是否借钱，作赌博之用?',
      '9. 您是否出卖任何物件，作赌博之用?',
      '10. 您是否不愿意用 “赌本” 来付正常的开支?',
      '11. 赌博是否令您疏忽您自己及您家人的健康快乐?',
      '12. 您是否花比预计更多的时间在赌博上?',
      '13. 您是否以赌博来逃避忧虑及困难?您是否犯罪或考虑犯罪，为赌博筹备资金?',
      '14. 赌博有否令您有睡眠的困难?',
      '15. 围绕您的争执、失望或挫败有否造成赌博的推动力?',
      '16. 您是否为数小时的赌博而有冲动去庆祝好运?',
      '17. 您是否因赌博的结果而自毁或自杀?',
      '若您对7个以上的问题的回答是‘是’，您可能在赌博上存在风险。我们强烈建议您寻求家庭支持或联系在线客服咨询，我们会协助您解决问题。',
    ],
  },
]
</script>

<template>
  <div class="box">
    <div v-for="(item, index) in data" :key="index" class="question">
      <h3>{{ item.title }}</h3>
      <p v-for="(s, i) in item.content" :key="i" class="details">
        <span>{{ s }}</span>
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
}
</style>
