<script setup lang='ts' name="browser">
const data = [
  {
    title: '一、选择什么样的浏览器才能获得最佳的投注体验？',
    content: [
      '谷歌Chrome',
      '火狐Firefox',
      '强烈建议使用以上浏览器，可有效解决无法访问、被劫持等情况。如果出现任何问题，请您及时联系在线客服咨询。',
    ],
  },
  {
    title: '二、为什么使用版本较低的浏览器会导致投注体验下降和账号不安全？',
    content: [
      '首先，IE6或其他低版本浏览器效率极低，很多比较新颖的动画效果都无法实现加载，导致用户阅读和游戏时效果极差；其次，低版本浏览器安全性较低，黑客很容易利用其进行病毒或木马植入，从而导致你的投注体验和资金受到极大威胁。因此，我们强烈建议您将浏览器升级到最新版本，以此来获得最好的游戏体验和优质服务。',
    ],
  },
  {
    title: '三、我是否需要任何程式或浏览器插件来运行网站？',
    content: [
      '我们网站是不需要通过额外插件进行浏览。不过，一些互动的信息和帮助，例如我们的娱乐场和真人荷官可能需要Flash播放器才能正常显示。浏览器插件是一个添加在浏览器中具有特定功能或服务的软件。一些常见的插件有Java、Flash播放器、Adobe Acrobat、QuickTime和Microsoft Silverlight。',
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
