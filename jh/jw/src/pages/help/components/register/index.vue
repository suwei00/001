<script setup lang='ts' name="register">
const data = [
  {
    title: '一、如何注册账号？',
    des: '点击网站右上角“注册”的功能键',
    content: `1. 请注意账号由5-14位字母+数字组成（首位不可为数字)，密码为8-20位字母和数字的组合，并请您将密码严格保密。<br/>
              2. 注册前请确保您已满18周岁并已阅读过我们规则与条款。`,
  },
  {
    title: '二、忘记账号怎么办？',
    des: '',
    content: '忘记会员账户名您可以及时联系我们的在线客服，7x24小时为您提供在线服务。',
  },
  {
    title: '三、忘记密码怎么办？',
    des: '',
    content: '在登录页面点击“忘记密码？”进入“更改密码”界面——填写账号和手机号/安全密码——完成身份验证——设置新密码——完成。',
  },
  {
    title: '四、如何更改个人资料信息？',
    des: '',
    content: '客户成功登录后，点击官网首页右上角会员账号进入个人中心，可以在“个人资料”选项中“基本资料”界面修改。有何疑问可以咨询在线客服。',
  },
  {
    title: '五、允许我在久赢投注吗？',
    des: '',
    content: '在浏览和体验本站前，请确保您已年满18岁并同意我们的规则与条款。不同的国家有不同的监管条例，投注前请遵循当地法规与法律。若因上述原因造成的任何损失，久赢官方概不负责。',
  },
]
</script>

<template>
  <div class="box">
    <div v-for="(d, i) in data" :key="i" class="question">
      <h3>{{ d.title }}</h3>
      <span v-if="d.des" class="des">{{ d.des }}</span>
      <p v-html="filterXSS(d.content)" />
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

  .des {
    font-family: $jl-font;
    font-weight: 600;
    margin-bottom: 6px;
  }

  p {
    line-height: 28px;
  }
}
</style>
