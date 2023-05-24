<script lang="ts" setup>
import TotalAmountExhibit from './components/totalAmountExhibit.vue'
import VenueAmountExhibit from './components/venueAmountExhibit.vue'
import useRouterBack from '~/hooks/routerBackHooks'
// component
import bgImage from '~/components/bgImage.vue'
import RefreshAmount from '~/components/refreshAmount.vue'
// hooks
import amountHooks from '~/hooks/amountHooks'

// 背景图
import bgSrc1 from '~/assets/images/my/walletHeadBg.png?preset=full'
import bgSrc2 from '~/assets/images/my/walletBarBg.png?preset=full'
import bgSrc3 from '~/assets/images/public/whiteLeft.png?preset=full'
import bgSrc4 from '~/assets/images/my/oddDown.png?preset=full'
import bgSrc5 from '~/assets/images/my/oddUp.png?preset=full'

import bgSrc6 from '~/assets/images/my/recharge.png?preset=full'
import bgSrc7 from '~/assets/images/my/transfer.png?preset=full'
import bgSrc8 from '~/assets/images/my/withdraw.png?preset=full'
import bgSrc9 from '~/assets/images/my/accountManage.png?preset=full'

const bgImg1 = `url(${getSupportImage(bgSrc1)})`
const bgImg2 = `url(${getSupportImage(bgSrc2)})`

const { goBack, goTo } = useRouterBack()
const { totalAmount } = amountHooks()
const { openPop } = usePop()
const { userInfo } = storeToRefs(useUserInfoStore())

const fastList = [
  {
    label: '充值',
    path: '/my/recharge',
    icon: bgSrc6,
  },
  {
    label: '转账',
    path: '/my/transfers',
    icon: bgSrc7,
  },
  {
    label: '提现',
    path: '/my/withdraw',
    icon: bgSrc8,
  },
  {
    label: '账户管理',
    path: '/my/account-manage',
    icon: bgSrc9,
  },
]

const putVisible = ref(false)

const onPut = () => {
  putVisible.value = !putVisible.value
}
const goWhere = (item: any) => {
  if (item.path === '/my/recharge') {
    if (userInfo.value.real_name === '')
      openPop()
    else
      goTo(item.path)
  }
  else {
    goTo(item.path)
  }
}
</script>

<template>
  <div class="walletWarp">
    <div class="head">
      <div class="headL" @click="goBack()">
        <bgImage :image="bgSrc3" />
      </div>
      <span>我的钱包</span>
      <div class="headR" @click="goTo('/my/trade-record')">
        交易记录
      </div>
    </div>
    <div class="countAmount">
      <div class="countAmountTitle">
        总余额（元）
      </div>
      <div class="countAmountNum">
        <span>{{ reserveDecimal(totalAmount) }}</span>
        <RefreshAmount type="2" refresh-type="2" />
      </div>
    </div>
    <div class="walletMainWarp">
      <div class="walletMain">
        <div class="walletMainTitle">
          <p>钱包明细（元）</p>
        </div>
        <div class="walletMainCenter">
          <TotalAmountExhibit />
        </div>
        <ul class="walletMainFast">
          <li v-for="(item, index) in fastList" :key="index" @click="goWhere(item)">
            <bgImage :image="item.icon" />
            <span>{{ item.label }}</span>
          </li>
        </ul>
        <div class="walletMainVenueWarp">
          <div class="walletMainVenue">
            <div class="walletMainVenueHead">
              <span class="title">场馆余额</span>
              <div class="icons" @click="onPut()">
                <span v-show="!putVisible">展开明细</span>
                <span v-show="putVisible">收起明细</span>
                <bgImage v-show="!putVisible" :image="bgSrc4" />
                <bgImage v-show="putVisible" :image="bgSrc5" />
              </div>
            </div>
            <div class="putVisibleHide" :class="putVisible ? 'putVisibleShow' : ''">
              <VenueAmountExhibit />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.walletWarp {
  width: 100%;
  height: 100%;
  background-color: #F5F5F9;
  background-image: v-bind(bgImg1);
  background-size: 100%;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;

  .head {
    width: 100%;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-size: 13px;
    font-weight: 800;
    position: fixed;
    left: 0;
    top: 0;

    .headL {
      position: absolute;
      left: 21px;
      top: 0;
      height: 100%;
      display: flex;
      align-items: center;

     img{
        width: 11px;
        height: 19px;
      }
    }

    .headR {
      position: absolute;
      right: 19px;
      top: 0;
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 12px;
    }
  }

  .countAmount {
    width: 100%;
    min-height: 133px;
    padding: 62px 35px 0 35px;
    color: #FFFFFF;

    .countAmountTitle {
      width: 100%;
      font-size: 14px;
      height: 20px;
      line-height: 20px;
      margin-bottom: 4px;
    }

    .countAmountNum {
      font-size: 25px;
      font-weight: 800;
      line-height: 35px;
      width: 100%;
      height: 35px;
      display: flex;
      align-items: center;

      span {
        margin-right: 10px;
      }
    }
  }

  .walletMainWarp {
    width: 100%;
    height: 100%;
    padding: 0 16px 16px 16px;
    overflow-y: auto;

    .walletMain {
      width: 100%;
      min-height: 260px;
      background-color: #FFFFFF;
      border-radius: 10px;
      overflow: hidden;
      padding-bottom: 15px;

      .walletMainTitle {
        width: 100%;
        height: 40px;
        padding: 0 13px;
        display: flex;
        align-items: center;
        color: #FFFFFF;
        font-size: 15px;
        line-height: 15px;
        background-image: v-bind(bgImg2);
        background-size: 100%;
        background-repeat: no-repeat;

        p {
          display: flex;
          align-items: center;

          &::before {
            display: block;
            content: ' ';
            width: 2px;
            height: 16px;
            background: #FFFFFF;
            border-radius: 2px;
            margin-right: 6px;
          }
        }
      }

      .walletMainCenter {
        width: 100%;
        height: 88px;
        padding: 0 10px;
        display: flex;
        align-items: center;
      }

      .walletMainFast {
        width: 100%;
        height: 82px;
        padding: 0 10px;
        display: flex;
        justify-content: space-around;

        li {
          width: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #4080FF;

         img{
            width: 32px;
            height: 32px;
            margin-bottom: 15px;
          }
        }
      }

      .walletMainVenueWarp {
        width: 100%;
        padding: 0 10px;

        .walletMainVenue {
          width: 100%;
          background: rgba(235, 235, 235, 0.45);
          border-radius: 4px;
          overflow: hidden;

          .walletMainVenueHead {
            width: 100%;
            min-height: 39px;
            padding: 0 11px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #5E76A2;

            .title {
              font-size: 14px;
              line-height: 14px;
            }

            .icons {
              display: flex;
              align-items: center;

             img{
                width: 12px;
                height: 16px;
                margin-left: 4px;
              }
            }
          }
        }
      }
    }
  }
}

.putVisibleHide {
  width: 100%;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s;
}

.putVisibleShow {
  max-height: 500px;
}
</style>
