<script lang="ts" setup>
import { useUserInfoStore } from '~/store/userInfo'
import routerBackHook from '~/hooks/routerBackHooks'
import { getVipLogo } from '~/static/vipIconList'
import RefreshAmount from '~/components/refreshAmount.vue'

import bg1 from '~/assets/images/home/recharge.png'
import bg2 from '~/assets/images/home/transfer.png'
import bg3 from '~/assets/images/home/withdraw.png'
import bg4 from '~/assets/images/home/cs.png'
import bg5 from '~/assets/images/home/download.png'
import bg6 from '~/assets/images/public/user.png'
import bg7 from '~/assets/images/public/money.png'
// 客服
import { goTocustomerService } from '~/utils/customerService'

const { downloadUrl } = $(storeToRefs(useAppStore()))
const { userInfo, centerAmount, token } = storeToRefs(useUserInfoStore())
const { goTo } = routerBackHook()
const { openPop } = usePop()

const bankAndVirtual = ref({
  bank: 0,
  virtual: 0,
})
const fastEntryList = token.value
  ? [{
      title: '充值',
      icon: bg1,
      path: '/my/recharge',
    },
    {
      title: '转账',
      icon: bg2,
      path: '/my/transfers',
    },
    {
      title: '提现',
      icon: bg3,
      path: '/my/withdraw',
    },
    {
      title: '客服',
      icon: bg4,
      path: 'customer',
    },
    ]
  : [
      {
        title: '下载',
        icon: bg5,
        path: 'download',
      },
      {
        title: '充值',
        icon: bg1,
      },
      {
        title: '提现',
        icon: bg3,
      },
      {
        title: '客服',
        icon: bg4,
        path: 'customer',
      },
    ]
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
    else if (item.path === 'customer') { goTocustomerService() }
    else { goTo(item.path) }
  }
  else {
    if (item.path === 'customer')
      goTocustomerService()
    else if (item.path === 'download')
      location.href = downloadUrl || ''
    else goTo('/entry/login')
  }
}
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
  <div class="fastEntryWarp">
    <div class="userInfo">
      <div v-if="token" class="loginOn">
        <div class="loginOnName">
          <img loading="lazy" class="icon" :src="bg6">
          <span>{{ userInfo.username }}</span>

          <img loading="lazy" class="vip" :src="getSupportImage(getVipLogo(String(userInfo.level)) as any)">
        </div>
        <p class="loginOnAmount">
          <img loading="lazy" class="icon" :src="bg7">
          <span>{{ reserveDecimal(centerAmount !== '' ? centerAmount : '0') }}</span>
          <RefreshAmount w="12px" h="12px" />
        </p>
      </div>
      <div v-else class="loginOff">
        <p class="loginOffTip">
          您尚未登录
        </p>
        <p class="loginOffBtn" @click="goWhere({ path: '/entry/login' })">
          <span>登录</span>/<span>注册</span>后查看
        </p>
      </div>
    </div>
    <ol>
      <li v-for="(item, index) in fastEntryList" :key="index" @click="goWhere(item)">
        <img loading="lazy" class="icon" :src="item.icon">
        <span>{{ item.title }}</span>
      </li>
    </ol>
  </div>
  <CustomizeDialog v-model="dialogs.visible" :content="dialogs.content" confirm-text="立即绑定" @confirm="onConFirm()" />
</template>

<style lang="scss">
.fastEntryWarp {
  width: 100%;
  min-height: 79px;
  padding: 0 18px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;

  .userInfo {
    .loginOn {
      .loginOnName {
        font-size: 12px;
        line-height: 16px;
        display: flex;
        padding-top: 24px;
        align-items: center;
        justify-content: left;
        .icon{
          width: 16px;
          height: 16px;
          display: block;
          background-size: 100%;
          background-position: center;
          background-repeat: no-repeat;
          margin-right: 6px;
        }

        span {
          margin-right: 5px;
          color: #464B55;
        }

        .vip {
          display: block;
          width: 56px;
          height: 20px;
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
        }
      }

      .loginOnAmount {
        display: flex;
        align-items: center;
        padding-top: 6px;

        .icon{
          width: 16px;
          height: 16px;
          display: block;
          background-size: 100%;
          background-position: center;
          background-repeat: no-repeat;
          margin-right: 3px;
        }
        span{
          font-size: 16px;
          font-weight: 800;
          color: #000000;
          line-height: 22px;
          margin-right: 8px;
        }
      }

      .notloginOnAmount {
        font-size: 16px;
        font-weight: 800;
        color: #5C7EF6;
        line-height: 22px;
        padding-top: 6px;
      }
    }

    .loginOff {
      .loginOffTip {
        font-size: 12px;
        line-height: 16px;
        padding-top: 25px;
      }

      .loginOffBtn {
        font-size: 16px;
        color: #5c7ef6;
        line-height: 22.5px;
        padding-top: 5px;
      }
    }
  }

  ol {
    display: flex;
    padding-top: 13px;

    li {
      margin-right: 9px;
      display: flex;
      flex-direction: column;
      align-items: center;

      &:last-child {
        margin-right: 0;
      }

      img {
        width: 35px;
        height: 35px;
        display: block;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
      }

      span {
        padding-top: 4px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #66799f;
        line-height: 16px;
      }
    }
  }
}
</style>
