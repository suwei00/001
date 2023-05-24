<script lang="ts" setup>
// component
import Header from '~/components/Header.vue'
import showHeader from '~/utils/show-header'
const { isShowHeader } = showHeader()
</script>

<template>
   <div class="help_guide cent-bg">
    <Header v-if="isShowHeader" title="浏览器" /> <div class="helplist  cent-top">
      <h5 class="mgt-40">
        一、选择什么样的浏览器才能获得最佳的投注体验？
      </h5> <p class="pd-l">
        谷歌Chrome<br> 火狐Firefox<br> 强烈建议使用以上浏览器，可有效解决无法访问、被劫持等情况。 如果出现任何问题，请您及时联系在线客服咨询。<br>
      </p> <h5 class="mgt-40">
        二、为什么使用版本较低的浏览器会导致投注体验下降和账号不安全？
      </h5> <p class="pd-l">
        首先，IE6或其他低版本浏览器效率极低，很多比较新颖的动画效果都无法实现加载，导致用户阅读和游戏时效果极差；其次，低版本浏览器安全性较低，黑客很容易利用其进行病毒或木马植入， 从而导致你的投注体验和资金受到极大威胁。因此，我们强烈建议您将浏览器升级到最新版本，以此来获得最好的游戏体验和优质服务。
      </p> <h5 class="mgt-40">
        三、我是否需要任何程式或浏览器插件来运行网站？
      </h5> <p class="pd-l">
        我们网站是不需要通过额外插件进行浏览。不过，一些互动的信息和帮助，例如我们的娱乐场和真人荷官可能需要Flash播放器才能正常显示。浏览器插件是一个添加在浏览器中具有特定功能或服务的软件。一些常见的插件有Java、Flash播放器、 Adobe Acrobat、QuickTime和Microsoft Silverlight。
      </p>
    </div>
  </div>
</template>

 <style lang="scss" scoped>
 @import '~/styles/help.scss';
</style>
