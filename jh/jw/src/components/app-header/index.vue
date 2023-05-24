<script setup lang='ts' name="app-header">
import activityIcon from '@icons/header/activity.svg'
import agencyIcon from '@icons/header/agency.svg'
import downloadIcon from '@icons/header/download.svg'
import depositIcon from '@icons/personal/finance/deposit-hover.svg'
import transferIcon from '@icons/personal/finance/transfer-hover.svg'
import withdrawIcon from '@icons/personal/finance/withdraw-hover.svg'
import rmbIcon from '@icons/common/rmb.svg'
import logoGif from '~/assets/images/header/logo.gif'
import Vip1Img from '~/assets/images/header/VIP1.png?preset=full'
import Vip2Img from '~/assets/images/header/VIP2.png?preset=full'
import Vip3Img from '~/assets/images/header/VIP3.png?preset=full'
import Vip4Img from '~/assets/images/header/VIP4.png?preset=full'
import Vip5Img from '~/assets/images/header/VIP5.png?preset=full'
import Vip6Img from '~/assets/images/header/VIP6.png?preset=full'
import Vip7Img from '~/assets/images/header/VIP7.png?preset=full'
import Vip8Img from '~/assets/images/header/VIP8.png?preset=full'
import Vip9Img from '~/assets/images/header/VIP9.png?preset=full'
import Vip10Img from '~/assets/images/header/VIP10.png?preset=full'
import loginImg from '~/assets/images/header/login.png?preset=full'
import registerImg from '~/assets/images/header/register.png?preset=full'

interface Item {
  path: string
  icon: string
  title: string
}
const btnList: Item[] = [{
  path: '/activity',
  icon: activityIcon,
  title: '活动',
}, {
  path: '/agency',
  icon: agencyIcon,
  title: '代理',
}, {
  path: '/download',
  icon: downloadIcon,
  title: '下载',
}]
const financeList: Item[] = [{
  path: '/personal/deposit',
  icon: depositIcon,
  title: '充值',
}, {
  path: '/personal/transfer',
  icon: transferIcon,
  title: '转账',
}, {
  path: '/personal/withdraw',
  icon: withdrawIcon,
  title: '提现',
}]
const router = useRouter()
const route = useRoute()
const routeName = $computed(() => route.name)
const appStore = useAppStore()
const { isLogged } = $(storeToRefs(appStore))
const { showFooter } = storeToRefs(appStore)
const userStore = useUserStore()
const { username, balance, level, balanceLoading, msgNum, realName } = $(storeToRefs(userStore))
// 登录用户名
const loginUsername = $ref('')
// 登录密码
const password = $ref('')
// 获取vip等级图片
const vipImg = computed(() => {
  switch (level) {
    case 1:
      return Vip1Img
    case 2:
      return Vip2Img
    case 3:
      return Vip3Img
    case 4:
      return Vip4Img
    case 5:
      return Vip5Img
    case 6:
      return Vip6Img
    case 7:
      return Vip7Img
    case 8:
      return Vip8Img
    case 9:
      return Vip9Img
    case 10:
      return Vip10Img
    default:
      return Vip1Img
  }
})

// 注销登录
const handleLogout = () => {
  appStore.$reset()
  appStore.clearToken()
  userStore.$reset()
  localStorage.removeItem('closeActivityPopup')
  router.push('/entry/login')
}

// 登录请求
const { run: loginReq } = useRequest(() => loginApi({ password, username: loginUsername! }), {
  manual: true,
  onSuccess(res) {
    appStore.setToken(res)
    router.push('/')
  },
})

// 真实姓名弹窗可见性
let realNameVisible = $ref(false)
// 处理提现点击事件
const handleItemClick = (item: Item) => {
  if (item.path === '/personal/withdraw')
    return publicHandleToWithdraw()

  if (item.path === '/personal/deposit' && !realName)
    return realNameVisible = true

  router.push(item.path)
}
// 是否显示编辑头像
let showEditAvatar = $ref(false)
// 编辑头像
const handleAvatarEdit = () => {
  showEditAvatar = true
}

// 监听彩票下注成功刷新余额
const messageHandler: (this: Window, ev: MessageEvent<any>) => any = ({ data }) => {
  if (data.action === 'getUserBalance')
    userStore.runGetUserBalance()
  else if (data.action === 'jili-token')
    handleLogout()
  else if (data.action === 'jili-hide-footer' && routeName === 'cg-lottery')
    showFooter.value = false
  else if (data.action === 'jili-show-footer')
    showFooter.value = true
}
watch($$(routeName), () => {
  if (routeName !== 'cg-lottery')
    showFooter.value = true
})
useEventListener(window, 'message', messageHandler)
</script>

<template>
  <teleport to="body">
    <div class="app-header">
      <div class="header-inner">
        <img :src="logoGif" w-199px class="logo" cursor-pointer @click="router.push('/')">
        <jl-nav />
        <ul class="btns-wrapper">
          <li v-for="item in btnList" :key="item.title" @click="handleItemClick(item)">
            <img v-if="item.title === '代理'" :src="item.icon" w-28px h-19px style="margin:2.5px 0">
            <img v-else :src="item.icon" w-24px h-24px>
            <span>{{ item.title }}</span>
          </li>
        </ul>
        <!-- 是否登录 -->
        <transition mode="out-in">
          <div v-if="isLogged" class="logged-wrapper">
            <div class="divide" />
            <ul class="btns-wrapper">
              <li v-for="item in financeList" :key="item.title" @click="handleItemClick(item)">
                <img :src="item.icon" w-24px h-24px>
                <span>{{ item.title }}</span>
              </li>
            </ul>
            <div class="user-info">
              <div class="top">
                <span class="username">{{ username }}</span>
                <img v-src="vipImg" loading="lazy" class="vip">
              </div>
              <div class="bottom" translate-x--5px>
                <img :src="rmbIcon" w-24px h-24px>
                <jl-count class="amount" :value="balance" />
                <i
                  :class="{ 'refresh-loading': balanceLoading }" i-common-refresh ml-8px w-12px h-12px
                  @click="userStore.runGetUserBalance"
                />
              </div>
            </div>
            <jl-avatar w-54px h-54px ml-8px cursor-pointer editable @avatar-edit="handleAvatarEdit" @click="router.push('/personal/user-info')" />
            <div class="operate">
              <div style="position: relative;">
                <i class="message-icon" i-header-message w-34px h-34px @click="router.push('/personal/message')" />
                <span v-show="msgNum" class="num">{{ msgNum && msgNum > 99 ? '99+' : msgNum }}</span>
              </div>

              <i class="icon-logout" i-header-logout w-34px h-34px ml-8px @click="handleLogout" />
            </div>
          </div>
          <div v-else class="no-login-wrapper">
            <el-input
              v-model="loginUsername" maxlength="15" style="width:138px;" placeholder="账号"
              @input="loginUsername = loginUsername.replace(/[^\da-zA-Z]/g, '')"
            />
            <el-input
              v-model="password" maxlength="20" type="password" style="width:138px;margin-left:10px;"
              placeholder="密码" @input="password = password.replace(/[^\da-zA-Z]/g, '')" @keyup.enter="loginReq"
            >
              <template #suffix>
                <span v-if="!password" class="forget" @click="router.push('/forget')">忘记?</span>
              </template>
            </el-input>
            <button :style="getBackgroundImgObj(loginImg)" class="login" @click="loginReq">
              登录
            </button>
            <button :style="getBackgroundImgObj(registerImg)" class="register" @click="router.push('/entry/register')">
              注册
            </button>
          </div>
        </transition>
      </div>
    </div>
    <!-- 头像编辑 -->
    <avatar-edit v-if="showEditAvatar" v-model="showEditAvatar" />
    <!-- 未绑定真实姓名弹窗 -->
    <realname-modal v-if="realNameVisible" v-model="realNameVisible" />
  </teleport>
</template>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  left: 0;
  top: 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 100%;
  min-width: 1400px;
  box-shadow: 0px 8px 16px 1px rgba(31, 47, 60, 0.1000);
  z-index: 1999;
.logo{
  margin-right: 50px;
}
  .header-inner {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .btns-wrapper {
      display: flex;

      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        user-select: none;

        &+li {
          margin-left: 16px;
        }

        img {
          transition: all 0.4s;
        }

        span {
          display: inline-block;
          line-height: 20px;
          color: $text-primary;
          font-size: 15px;
        }
      }

      li:hover{
        img {
          transform: scale(1.2);
        }
      }
    }

    .logged-wrapper {
      display: flex;
      align-items: center;

      .divide {
        height: 30px;
        width: 1px;
        background-color: #D2D7E3;
        margin: 0 15px;
      }

      .operate {
        padding-left: 12px;
        display: flex;
        align-items: center;

        i {
          display: inline-block;
          cursor: pointer;
        }
        .message-icon{
          transform: translateY(2px);
        }

        .num {
          width: 22px;
          height: 22px;
          line-height: 22px;
          background-color: #ED0E0E;
          color: #fff;
          font-size: 12px;
          border-radius: 100%;
          position: absolute;
          top: -6px;
          right: -6px;
          text-align: center;
          scale: 0.82;
        }
      }

      .user-info {
        padding-left: 17px;
        min-width: 130px;

        .top {
          display: flex;
          align-items: center;

          .username {
            font-family: $jl-font;
            font-weight: bold;
            color: $color-black-primary;
            font-size: 13px;
            line-height: 19px;
            height: 19px;
          }

          .vip {
            width: 50px;
            height: 20px;
            background-size: contain;
            background-repeat: no-repeat;
            margin-left: 2px;
          }
        }

        .bottom {
          display: flex;
          align-items: center;
          .amount {
            font-size: 13px;
            line-height: 25px;
            color: $color-primary;
            font-family: $jl-font;
            font-weight: bold;
          }
        }
      }
    }

    .no-login-wrapper {
      padding-left: 35px;
      display: flex;
      align-items: center;

      .el-input {
        margin-top: 0 !important;

        :deep(.el-input__wrapper) {
          // border-color: $border-color;
          // box-shadow: 0 0 0 1px $border-color inset;
          border: none;
          box-shadow: none;
          border-radius: 14px;
          background: #B0B7CE;

          .el-input__inner {
            height: 28px;
            line-height: 28px;
            font-size: 15px;
            color: white;

            &::-webkit-input-placeholder {
              color: #fff;
              font-size: 13px;
              font-family: $jl-font;
            }
          }
        }
      }

      .forget {
        font-size: 11px;
        height: 16px;
        line-height: 16px;
        color: #fff;
        border-left: 1px solid #D3D2D2;
        padding-left: 5px;
        cursor: pointer;
      }

      button {
        background-repeat: no-repeat;
        background-size: contain;
        margin-left: 10px;
        width: 55px;
        height: 28px;
        line-height: 28px;
        font-size: 13px;
        font-family: $jl-font;
        font-weight: bold;
        color: #FFFFFF;
        box-shadow: 0px 2px 5px 1px rgba(86, 122, 254, 0.3);
        border-radius: 20px;

        &.register {
          color: $text-primary;
        }

      }
    }
  }

}
</style>
