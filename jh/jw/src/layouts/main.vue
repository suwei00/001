<script lang="ts" setup name="main-layout">
import bgImg from '@images/personal/personal-bg.png?preset=full'
import avaBoxImg from '@images/personal/avatar-box.png?preset=full'
import depositIcon from '@icons/personal/finance/sdeposit.svg'
import transferIcon from '@icons/personal/finance/stransfer.svg'
import withdrawIcon from '@icons/personal/finance/swithdraw.svg'
import depositIconH from '@icons/personal/finance/sdeposit-hover.svg'
import transferIconH from '@icons/personal/finance/stransfer-hover.svg'
import withdrawIconH from '@icons/personal/finance/swithdraw-hover.svg'
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

interface Item {
  path: string
  icon: string[]
  title: string
  sort: number
}
// 注意，数组里icons的第二项必须有，不能通过第一个生成第二个图标的样式,uno.css不支持
const financeList: Item[] = [{
  icon: [depositIcon, depositIconH],
  path: '/personal/deposit',
  title: '充值',
  sort: -3,
}, {
  icon: [transferIcon, transferIconH],
  path: '/personal/transfer',
  title: '转账',
  sort: -2,
}, {
  icon: [withdrawIcon, withdrawIconH],
  path: '/personal/withdraw',
  title: '提现',
  sort: -1,
}]
const userList: Item[] = [{
  icon: ['i-personal-nav-yuebao-hover', 'i-personal-nav-yuebao-hover'],
  path: '/personal/balance-baby',
  title: '余额宝',
  sort: 1,
}, {
  icon: ['i-personal-nav-user-info-hover', 'i-personal-nav-user-info-hover'],
  path: '/personal/user-info',
  title: '个人信息',
  sort: 1,
},
{
  icon: ['i-personal-nav-lottery-record-hover', 'i-personal-nav-lottery-record-hover'],
  path: '/personal/lottery-record',
  title: '彩票记录',
  sort: 2,
}, {
  icon: ['i-personal-nav-bet-record-hover', 'i-personal-nav-bet-record-hover'],
  path: '/personal/bet-record',
  title: '投注记录',
  sort: 3,
}, {
  icon: ['i-personal-nav-trade-record-hover', 'i-personal-nav-trade-record-hover'],
  path: '/personal/trade-record',
  title: '交易记录',
  sort: 4,
}, {
  icon: ['i-personal-nav-wallet-hover', 'i-personal-nav-wallet-hover'],
  path: '/personal/wallet',
  title: '我的钱包',
  sort: 5,
}, {
  icon: ['i-personal-nav-gain-hover', 'i-personal-nav-gain-hover'],
  path: '/personal/gain',
  title: '我的盈利',
  sort: 6,
}, {
  icon: ['i-personal-nav-device-hover', 'i-personal-nav-device-hover'],
  path: '/personal/device',
  title: '设备信息',
  sort: 7,
}]
const agencyList: Item[] = [{
  icon: ['i-personal-nav-agency-hover', 'i-personal-nav-agency-hover'],
  path: '/personal/agency',
  title: '代理报表',
  sort: 8,
}, {
  icon: ['i-personal-nav-under-hover', 'i-personal-nav-under-hover'],
  path: '/personal/sub-report',
  title: '下级报表',
  sort: 9,
}, {
  icon: ['i-personal-nav-member-hover', 'i-personal-nav-member-hover'],
  path: '/personal/member',
  title: '会员管理',
  sort: 10,
}, {
  icon: ['i-personal-nav-bet-detail-hover', 'i-personal-nav-bet-detail-hover'],
  path: '/personal/bet-detail',
  title: '投注明细',
  sort: 11,
}, {
  icon: ['i-personal-nav-lottery-hover', 'i-personal-nav-lottery-hover'],
  path: '/personal/lottery-detail',
  title: '彩票明细',
  sort: 12,
}, {
  icon: ['i-personal-nav-trade-detail-hover', 'i-personal-nav-trade-detail-hover'],
  path: '/personal/trade-detail',
  title: '交易明细',
  sort: 13,
}, {
  icon: ['i-personal-nav-link-hover', 'i-personal-nav-link-hover'],
  path: '/personal/link',
  title: '营销代理',
  sort: 14,
}]
const router = useRouter()
const { currentRoute } = $(router)
const userStore = useUserStore()
const { balanceLoading, balance, username, realName, level } = storeToRefs(userStore)
const appStore = useAppStore()
const { showFooter } = $(storeToRefs(appStore))

const activeSort = $computed(() => {
  const uerItem = find(userList, { path: currentRoute.path })
  if (uerItem)
    return uerItem.sort
  const agencyItem = find(agencyList, { path: currentRoute.path })
  if (agencyItem)
    return agencyItem.sort
  const financeItem = find(financeList, { path: currentRoute.path })
  if (financeItem)
    return financeItem.sort
  return 0
})

let slideDirection = $ref('')
// 获取过渡方向
const getDirection = (sort: number) => {
  if (sort > activeSort) {
    if (sort < 0 && activeSort < 0)
      return 'slide-left'
    return 'slide-up'
  }
  else {
    if (sort < 0 && activeSort < 0)
      return 'slide-right'
    return 'slide-down'
  }
}

// 真实姓名弹窗可见性
let realNameVisible = $ref(false)
const handleRouteLinkClick = (item: Item) => {
  if (item.path !== currentRoute.path) {
    // 如果是点击取款，并且
    if (item.path === '/personal/withdraw')
      return publicHandleToWithdraw()

    if (item.path === '/personal/deposit' && !realName.value)
      return realNameVisible = true

    slideDirection = getDirection(item.sort)
    router.push(item.path)
  }
}
// 是否显示编辑头像
let showEditAvatar = $ref(false)
// 编辑头像
const handleAvatarEdit = () => {
  showEditAvatar = true
}

// 获取vip等级图片
const vipImg = computed(() => {
  switch (level.value) {
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
</script>

<template>
  <main id="main" h-full class="layout-main">
    <AppHeader />
    <!-- 个人中心的路由 -->
    <div v-if="router.currentRoute.value.meta.personal" :style="getBackgroundImgObj(bgImg)" class="personal-page">
      <div class="personal" pt-80px>
        <div v-if="!router.currentRoute.value.meta.hideNav" class="personal-left">
          <div :style="getBackgroundImgObj(avaBoxImg)" class="user">
            <img v-src="vipImg" loading="lazy" class="vip">
            <jl-avatar class="jl-avatar" w-80px h-80px editable @avatar-edit="handleAvatarEdit" />
            <span class="username">{{ username }}</span>
          </div>
          <div class="nav">
            <div class="balance">
              <span class="title">账户余额：</span>
              <jl-count class="rmb" :value="+(balance ?? 0)" />
              <i
                class="i-common-refresh" :class="{ 'refresh-loading': balanceLoading }" w-12px h-12px
                @click="userStore.runGetUserBalance"
              />
            </div>
            <div class="finance">
              <div
                v-for="item in financeList" :key="item.title" :class="{ active: item.path === currentRoute.path }"
                class="btn" @click="handleRouteLinkClick(item)"
              >
                <img
                  w-56px h-56px
                  transition-all transition-ease transition-duration-300
                  :src="item.path === currentRoute.path ? item.icon[1] : item.icon[0]"
                >
                <img
                  class="iconH" w-56px h-56px
                  transition-all transition-ease transition-duration-300
                  :src="item.icon[1]"
                >
                <span>{{ item.title }}</span>
              </div>
            </div>
            <div class="nav-list">
              <div class="user-list">
                <ul>
                  <li
                    v-for="item in userList" :key="item.title" :class="{ active: currentRoute.path === item.path }"
                    @click="handleRouteLinkClick(item)"
                  >
                    <i :class="[item.path === currentRoute.path ? item.icon[1] : item.icon[0]]" />
                    <span :data-name="item.title">{{ item.title }}</span>
                  </li>
                </ul>
              </div>
              <div class="agency-list">
                <ul>
                  <li
                    v-for="item in agencyList" :key="item.title" :class="{ active: currentRoute.path === item.path }"
                    @click="handleRouteLinkClick(item)"
                  >
                    <i :class="[item.path === currentRoute.path ? item.icon[1] : item.icon[0]]" />
                    <span :data-name="item.title">{{ item.title }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="view-wrapper">
          <router-view v-slot="{ Component }">
            <transition :name="slideDirection" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>
    <!-- 默认页面路由 -->
    <div v-else class="main-page" pt-80px>
      <router-view />
    </div>
    <app-footer v-show="showFooter" />
    <!-- 没有绑定提现方式的全局弹窗 -->
    <bind-modals />
    <!-- 头像编辑 -->
    <avatar-edit v-if="showEditAvatar" v-model="showEditAvatar" />
    <!-- 在线客服 -->
    <online-service />
    <!-- 聊天室 -->
    <chat-icon />
    <!-- 未绑定真实姓名弹窗 -->
    <realname-modal v-if="realNameVisible" v-model="realNameVisible" />
  </main>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

.layout-main {
  background-size: cover;
  @include hideScrollbar;

  .personal-page {
    margin-top: 80px;
    position: relative;
    transition: all .3s;

    .personal {
      width: 1300px;
      padding-top: 20px;
      padding-bottom: 120px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;

      .personal-left {
        width: 220px;

        .user {
          height: 155px;
          width: 100%;
          border-radius: 10px;
          box-shadow: 0 10px 30px 1px rgba(0, 0, 0, 0.0500);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          .jl-avatar{
            box-shadow: 0 8px 20px 1px #3557DCFF;
          }

          .username {
            margin-top: 11px;
            font-family: $jl-font;
            font-weight: bold;
            color: #fff;
            font-size: 15px;
            height: 20px;
            line-height: 20px;
          }
          .vip {
            width: 50px;
            height: 20px;
            background-size: contain;
            background-repeat: no-repeat;
            margin-left: 2px;
            position: absolute;
            right: 40px;
            top: 26px;
            z-index: 3;
          }
        }

        .nav {
          height: calc(100% - 165px);
          margin-top: 10px;
          background: #FFFFFF;
          box-shadow: 0px 10px 30px 1px rgba(0, 0, 0, 0.05);
          border-radius: 10px 10px 10px 10px;

          .balance {
            padding-left: 22px;
            padding-top: 20px;
            display: flex;
            align-items: center;

            .title {
              color: $text-primary;
              font-size: 13px;
              line-height: 18px;
            }

            .rmb {
              padding: 0 8px;
              line-height: 18px;
              color: #3678FE;
              font-family: $jl-font;
              font-weight: bold;
              font-size: 13px;
            }

          }

          .finance {
            padding: 2px 14px 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .btn {
              display: flex;
              flex-direction: column;
              align-items: center;
              cursor: pointer;
              position: relative;

              span {
                color: $text-primary;
                font-size: 13px;
                line-height: 18px;
                transform: translateY(-4px);
              }
              .iconH{
                opacity: 0;
                transition: all .3s;
                position: absolute;
              }

              &.active,
              &:hover {
                transition: all .3s;
                .iconH{
                  opacity: 1;
                }

                span {
                  @apply color-black-basic;
                }
              }
            }
          }

          .nav-list {
            padding-bottom: 30px;

            ul {
              li {
                display: flex;
                align-items: center;
                // justify-content: center;
                padding-left: 61px;
                cursor: pointer;
                transition: all .3s;
                user-select: none;

                span {
                  color: $text-primary;
                  line-height: 46px;
                  font-size: 13px;
                  padding-left: 10px;

                  @include fixBoldShake;
                }

                &.active {
                  background-color: #F3FAFD;
                  position: relative;

                  &::before {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 2px;
                    content: '';
                    height: 100%;
                    background-color: #2F6DFE;
                  }

                  span {
                    color: #3678FF;
                    font-family: $jl-font;
                    font-weight: bold;

                  }
                }
              }

            }

            .user-list {
              padding-bottom: 22px;
            }

            .agency-list {
              padding-top: 22px;
              position: relative;

              &::before {
                content: '';
                position: absolute;
                width: 160px;
                height: 1px;
                background-color: #D2D7E3;
                left: 50%;
                transform: translateX(-50%);
                top: 0;
              }
            }
          }
        }
      }

      .view-wrapper {
        overflow: hidden;
        box-shadow: 0 10px 30px 1px rgba(0, 0, 0, 0.0500);
      }
    }
  }
}

@include fade;
@include transition-slide-up;
@include transition-slide-down;
@include transition-slide-left;
@include transition-slide-right;
</style>

<route lang="yaml">
meta:
  auth: true
</route>
