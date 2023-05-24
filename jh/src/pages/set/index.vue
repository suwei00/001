<script lang="ts" setup>
// component
import Header from '~/components/Header.vue'
import bgImage from '~/components/bgImage.vue'
import routerBackHook from '~/hooks/routerBackHooks'
import { useUserInfoStore } from '~/store/userInfo'
import bghui from '~/assets/images/public/jian.png?preset=full'
// 背景图
import chp from '~/assets/images/set/chap.png?preset=full'
import clp from '~/assets/images/set/setp.png?preset=full'
import devp from '~/assets/images/set/devp.png?preset=full'

const router = useRouter()
const { goTo } = routerBackHook()
const { clearToken, getMemberInfo } = useUserInfoStore()
const { userInfo } = storeToRefs(useUserInfoStore())
const goWhere = (item: any) => {
  goTo(item.path)
}
// 退出
const loginOut = (): void => {
  clearToken()
  router.push('/home')
}

onMounted(() => {
  getMemberInfo()
})
</script>

<template>
  <div class="help_guide cent-bg ">
    <Header title="设置" />
    <div class="setlist cent-top">
      <ul class="mylist_cent">
        <li @click="goWhere({ path: 'set/change-paw' })">
          <div class="list_li">
            <bgImage :image="chp" class="mylist_icon" />
            <p>修改密码</p>
            <bgImage :image="bghui" class="strong" />
          </div>
        </li>
        <li v-if="userInfo.withdraw_pwd === 0" @click="goWhere({ path: 'set/safe-paw' })">
          <div class="list_li">
            <bgImage :image="clp" class="mylist_icon" />
            <p>设置安全密码</p>
            <bgImage :image="bghui" class="strong" />
          </div>
        </li>
        <li v-else @click="goWhere({ path: 'set/safe-paw/change-safepaw' })">
          <div class="list_li">
            <bgImage :image="clp" class="mylist_icon" />
            <p>修改安全密码</p>
            <bgImage :image="bghui" class="strong" />
          </div>
        </li>
        <li @click="goWhere({ path: 'set/device' })">
          <div class="list_li border-no">
            <bgImage :image="devp" class="mylist_icon" />
            <p>设备信息</p>
            <bgImage :image="bghui" class="strong" />
          </div>
        </li>
      </ul>
    </div>
    <div class="txt-c login_quit" @click="loginOut">
      退出
    </div>
  </div>
</template>

    <style lang="scss" scoped>
  @import '~/styles/pub_main.scss';

    .login_quit {
        height: 38px;
        background: #FFFFFF;
        line-height: 38px;

    }
    </style>
