<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { avaList } from '../userinfo/static'
import { agencyList, financeList, userList } from './static/myStatic'
import { useUserInfoStore } from '~/store/userInfo'
import { getVipLogo } from '~/static/vipIconList'
import CustomizeDialog from '~/components/customizeDialog.vue'
// component
import bgImage from '~/components/bgImage.vue'
import RefreshAmount from '~/components/refreshAmount.vue'
// static
// hooks
import routerBackHook from '~/hooks/routerBackHooks'

import { memberMsgNumRequest } from '~/api/index'

// 背景图
import bgSrc1 from '~/assets/images/my/letter.png?preset=full'
import bgSrc2 from '~/assets/images/my/set.png?preset=full'
// import bgSrc3 from '~/assets/images/my/revise.png?preset=full'
import bgSrc4 from '~/assets/images/my/avatar/avatar-0.png?preset=full'
import bgSrc6 from '~/assets/images/public/greyRight.png?preset=full'
import bgSrc7 from '~/assets/images/public/user.png?preset=full'
import bgSrc8 from '~/assets/images/public/money.png?preset=full'

const { downloadUrl } = $(storeToRefs(useAppStore()))
const { token, centerAmount, userInfo } = storeToRefs(useUserInfoStore())
const { goTo } = routerBackHook()
const { openPop } = usePop()
const letterCount = ref(0) // 站内信未读数量
const bankAndVirtual = ref({
  bank: 0,
  virtual: 0,
})

const getLetterCount = () => {
  if (!token.value)
    return
  memberMsgNumRequest().then((res: any) => {
    if (res.status)
      letterCount.value = res.data
  })
}
getLetterCount()
const dialogs = ref({
  visible: false,
  content: '您还未绑定任何提现账户，请先绑定',
})
const onConFirm = () => {
  goTo('/my/account-manage')
}

const goWhere = (item: any) => {
  if (token.value) {
    if (item.path === '/my/recharge') {
      if (userInfo.value.real_name === '') {
        // dialogs.value = {
        //   visible: true,
        //   content: '您还未填写真实姓名，请先绑定！',
        //   page: '个人资料',
        //   path: '/userinfo',
        // }
        openPop()
        return true
      }
      else {
        goTo(item.path)
      }
    }

    else if (item.path === '/my/withdraw') {
      if (!bankAndVirtual.value.bank && !bankAndVirtual.value.virtual) {
        dialogs.value = {
          visible: true,
          content: '您还未绑定任何提现账户，请先绑定',
        }
        return true
      }
      else {
        goTo(item.path)
      }
    }

    if (item.path === 'download')
      location.href = downloadUrl || ''

    else goTo(item.path)
  }
  else {
    if (item.path === 'download')
      location.href = downloadUrl || ''

    else goTo('/entry/login')
  }
}
// 圆形进度条
const currentRate = computed(() => {
  let val = 100
  const rate = 100 / 7
  if (userInfo.value.birth === '0')
    val -= rate
  if (userInfo.value.email === '')
    val -= rate
  if (userInfo.value.avatar === '0')
    val -= rate
  if (userInfo.value.qq === '')
    val -= rate
  if (userInfo.value.real_name === '')
    val -= rate
  if (userInfo.value.wechat === '')
    val -= rate
  if (userInfo.value.address === '')
    val -= rate - 0.1

  return val
})

const getBankAndVirtual = () => {
  if (token.value) {
    getMyBankListRequest().then((res: any) => {
      if (res.status)
        bankAndVirtual.value.bank = res.data ? res.data.length : 0
    })
    getDigitalListRequest().then((res: any) => {
      if (res.status)
        bankAndVirtual.value.virtual = res.data ? res.data.length : 0
    })
  }
}
getBankAndVirtual()
</script>

<template>
  <div class="myWarp">
    <div class="myHead">
      <span class="f_eig">我的</span>

      <div v-if="token" class="myHeadRight">
        <div class="letterWarp">
          <bgImage :image="bgSrc1" class="letter_icon" @click="goWhere({ path: '/my/letter' })" />
          <span v-if="letterCount > 0" class="letterCount">{{ letterCount > 99 ? 99 : letterCount }}</span>
        </div>
        <bgImage :image="bgSrc2" @click="goWhere({ path: '/set' })" />
      </div>
    </div>

    <div class="myMain">
      <div v-if="token" class="myInfo" @click="goWhere({ path: '/userinfo' })">
        <div class="myInfoContent">
          <div class="cricleProress">
            <van-circle
              :current-rate="currentRate" class="my_circle" :speed="100" :stroke-width="60" color="#4F73F6"
              stroke-linecap="butt"
            >
              <div class="myInfoAvatarWarp default_img" :class="{ myInfoAvatarWarpLogin: token }">
                <template v-for="(item, index) in avaList" :key="index">
                  <bgImage v-if="`ava${userInfo.avatar}` === String(index)" :image="item" class="myInfoAvatar" />
                </template>
              </div>
            </van-circle>
          </div>
          <div v-if="token" class="myInfos">
            <div class="myInfoName">
              <bgImage :image="bgSrc7" />
              <span>{{ userInfo.username }}</span>
            </div>
            <bgImage :image="getVipLogo(String(userInfo.level))" class="myInfoVip" />
          </div>
        </div>
        <bgImage :image="bgSrc6" class="myInfoArrow" />
      </div>

      <div v-else class="myInfo" @click="goTo('/entry/login')">
        <div class="myInfoContent">
          <div class="myInfoAvatarWarp " :class="{ myInfoAvatarWarpLogin: token }">
            <bgImage :image="bgSrc4" class="myInfoAvatar" />
          </div>
          <div class="myInfos">
            <div class="myInfosNoLogin">
              点击<span>登录</span>/<span>注册</span>
            </div>
          </div>
        </div>
        <bgImage :image="bgSrc6" class="myInfoArrow" />
      </div>

      <div class="myWallet">
        <div class="myWalletTop">
          <div class="myWalletTopL">
            <p>账户余额</p>
            <div v-if="token" class="myWalletTopMoney">
              <bgImage :image="bgSrc8" />
              <span>{{ reserveDecimal(centerAmount) }}</span>
              <RefreshAmount w="12px" h="12px" />
            </div>
            <div v-else class="myWalletTopNoMoney" @click="goTo('/entry/login')">
              登录后查看
            </div>
          </div>

          <ul class="myWalletTopR">
            <li v-for="(item, index) in financeList" :key="index" @click="goWhere(item)">
              <div class="shadowWarp">
                <bgImage :image="item.icon" />
              </div>
              <span>{{ item.label }}</span>
            </li>
          </ul>
        </div>

        <div class="myFast">
          <ol>
            <li v-for="(item, index) in userList" :key="index" @click="goWhere(item)">
              <div class="shadowWarp">
                <bgImage :image="item.icon" />
              </div>
              <span>{{ item.label }}</span>
            </li>
          </ol>
        </div>
      </div>

      <div class="myList">
        <ol v-for="(item, index) in agencyList" :key="index">
          <li v-for="(item2, index2) in item" :key="index2" @click="goWhere(item2)">
            <bgImage :image="item2.icon" class="myListIcon" />
            <p>{{ item2.label }}</p>
            <bgImage :image="bgSrc6" class="strong" />
          </li>
        </ol>
      </div>
    </div>

    <CustomizeDialog v-model="dialogs.visible" :content="dialogs.content" confirm-text="立即绑定" @confirm="onConFirm()" />
  </div>
</template>

<style lang="scss" scoped>
.my_circle {
  height: 70px;
  width: 70px;
}
.myWarp {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* padding: 0 16px 70px 16px; */
  color: #5D75A2;

  .myHead {
    width: 100%;
    height: 50px;
    padding-top: 17px;
    text-align: center;
    font-size: 17px;
    line-height: 24px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    background-color: #F3F6FF;
      .f_eig{
        font-weight: 800;
      }
    .myHeadRight {
      position: absolute;
      top: 17px;
      right: 17px;
      display: flex;

      .letterWarp {
        position: relative;
        .letter_icon{
          width: 26px;
        }
        .letterCount {
          position: absolute;
          right: -7px;
          top: -4px;
          width: 14px;
          height: 14px;
          line-height: 9px;
          font-size: 9px;
          text-align: center;
          border-radius: 50%;
          background: $colorRed;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
        }
      }

     img{
        width: 21px;
        height: 21px;
        margin-left: 24px;

        &:first-child {
          margin-left: 0;
        }
      }
    }
  }

  .myMain{
    width: 100%;
    height: 100%;
    padding: 58px 16px 70px 16px;
    overflow-y: auto;
  }

  .myInfo {
    width: 100%;
    height: 88px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 18px;

    .myInfoContent {
      display: flex;

      .cricleProress {
        position: relative;
      }
      .default_img{
        padding: 2px !important;
        background: #F3F6FF !important;
      }
      .myInfoAvatarWarp {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background: #FFFFFF;
        padding: 4px;
        &.myInfoAvatarWarpLogin {
          box-shadow: 0px 0px 8px 0px rgba(68, 102, 229, 0.62);
        }

        .myInfoAvatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
        }

        .strong {
          width: 7px;
          height: 14px;
          position: absolute;
          bottom: 0;
          right: 0;
        }
      }

      .myInfos {
        margin-left: 15px;

        .myInfoName {
          display: flex;
          align-items: center;
          margin-top: 7px;
          min-height: 22px;

         img{
            width: 16px;
            height: 16px;
            margin-right: 5px;
          }

          span {
            font-size: 16px;
            line-height: 22px;
          }
        }

        .myInfoVip {
          width: 56px;
          height: 20px;
          margin-top: 10px;
        }

        .myInfosNoLogin {
          height: 26px;
          line-height: 26px;
          margin-top: 23px;
          font-size: 19px;
        }
      }
    }

    .myInfoArrow {
      width: 7px;
      height: 14px;
    }
  }

  .myWallet {
    width: 100%;
    padding-bottom: 16px;
    position: relative;

    .myWalletTop {
      width: 100%;
      min-height: 90px;
      padding: 0 8px;
      background: linear-gradient(180deg, #FAFBFF 0%, #F1F4FF 52%, #E9ECFA 100%);
      box-shadow: 0px 4px 4px 0px #E6ECF9, inset 0px -11px 20px 0px #E9EDF9;
      border-radius: 8px;
      border: 1px solid #FFFFFF;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: space-between;

      .myWalletTopL {
        padding-top: 22px;

        p {
          font-size: 13px;
          line-height: 18px;
          padding-left: 2px;
        }

        .myWalletTopMoney {
          padding-top: 11px;
          min-height: 28px;
          display: flex;
          align-items: center;

         img{
            width: 20px;
            height: 20px;
            margin-right: 2px;
          }

          span {
            font-size: 17px;
            color: #000000;
            line-height: 24px;
            margin-right: 7px;
            font-weight: 800;
          }
        }

        .myWalletTopNoMoney {
          padding-top: 12px;
          font-size: 17px;
          line-height: 24px;
        }
      }

      .myWalletTopR {
        display: flex;
        padding-top: 12px;

        li {
          min-width: 35px;
          margin-left: 22px;
          display: flex;
          flex-direction: column;
          align-items: center;

          &:first-child {
            margin-left: 0;
          }

         img{
            width: 35px;
            height: 35px;
            margin-bottom: 5px;
          }

          .shadowWarp {
            width: 38px;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 9px;
            background: linear-gradient(180deg, #FBFCFF 0%, #E0E9FF 100%);
            box-shadow: 0px 6px 6px 0px #DEE7FD;
            border: 1px solid #FFFFFF;
            border-radius: 50%;

           img{
              width: 28px;
              height: 28px;
              margin: 0;
            }
          }

          span {
            min-height: 16px;
            line-height: 16px;
          }
        }
      }
    }

    .myFast {
      width: 100%;
      min-height: 178px;
      background: linear-gradient(137deg, #FFFFFF 0%, #FDFDFF 50%, #F6F7FF 100%);
      box-shadow: 0 4px 4px 0 rgba(230, 236, 249, 0.9);
      border-radius: 8px;
      border: 1px solid #FFFFFF;
      display: flex;
      align-items: flex-end;

      ol {
        width: 100%;
        padding-bottom: 11px;
        display: flex;
        justify-content: space-evenly;

        li {
          display: flex;
          flex-direction: column;
          align-items: center;

          .shadowWarp {
            width: 38px;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 9px;
            background: linear-gradient(180deg, #FBFCFF 0%, #E0E9FF 100%);
            box-shadow: 0px 6px 6px 0px #DEE7FD;
            border: 1px solid #FFFFFF;
            border-radius: 50%;

           img{
              width: 25px;
              height: 25px;
            }
          }

          span {
            height: 16px;
            line-height: 16px;
          }
        }
      }
    }
  }

  .myList {
    width: 100%;
    padding-bottom: 38px;

    ol {
      width: 100%;
      padding: 0 20px 0 14px;
      margin-bottom: 10px;

      background: linear-gradient(137deg, #FFFFFF 0%, #FDFDFF 50%, #F6F7FF 100%);
      box-shadow: 0 4px 4px 0 #E6ECF9;
      border-radius: 8px;
      border: 2px solid #FFFFFF;

      li {
        width: 100%;
        min-height: 48px;
        border-bottom: 1px solid #F2F2F2;
        display: flex;
        align-items: center;

        &:last-child {
          border-bottom: none;
        }

        .myListIcon {
          width: 19px;
          height: 19px;
          margin: 0 13px 0 3px;
        }

        p {
          flex: 1;
          width: 100%;
          font-size: 13px;
          line-height: 18px;
        }

        .strong {
          width: 5px;
          height: 9px;
        }
      }
    }
  }
}
</style>
