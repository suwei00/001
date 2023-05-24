<script setup lang='ts' name="game-type">
const data = [
  {
    title: '一、娱乐场包含哪些游戏类型？',
    content: [
      '久赢游戏多样丰富，除了热门的CG彩票外，还有真人、体育、棋牌、电子、捕鱼、电竞。各种各样的游戏类型供您选择。',
    ],
  },
  {
    title: '二、如何获取游戏玩法？',
    content: [
      '各项游戏的详细玩法都可以在每个游戏场馆中获取。若还有任何游戏玩法的问题，请联系在线客服咨询。',
    ],
  },
  {
    title: '三、游戏出错或有纠纷的情况下我该怎么办？',
    content: [
      '若有任何游戏方面的问题，请您联系在线客服咨询，并提供以下信息：',
      '1. 您的久赢账号。',
      '2. 游戏详情，包括：游戏名称、投注编号、投注内容、金额和时间。',
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
  line-height: 1.8;
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
