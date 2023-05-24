<script setup lang='ts' name="application">
const data = [
  {
    title: '一、优惠活动如何申请？',
    content: [
      '登录账号后点击优惠活动页面，选择相应的优惠活动。',
    ],
  },
  {
    title: '二、返水、返点何时派发？',
    content: [
      '返水及返点无需申请，皆由系统自动派发。',
      '返水佣金将会于次日中午北京时间12点后派发至您的账户；返点则会实时派发至您的账户。',
      '只需1倍流水即可提现（不限游戏平台）。详情请查询代理页面或联系在线客服咨询。',
    ],
  },
  {
    title: '三、优惠申请成功后一直没有收到彩金怎么办？',
    content: [
      '如果您的优惠申请成功后没有在指定时间收到彩金。请您联系在线客服咨询。',
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
