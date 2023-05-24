<script setup lang='ts' name="wallet">
import addBankImg from '@images/personal/wallet/add-bank.png?preset=full'
import digitalImg from '@images/personal/wallet/add-digital.png?preset=full'
import depositIcon from '@icons/personal/finance/deposit-hover.svg'
import transferIcon from '@icons/personal/finance/transfer-hover.svg'
import withdrawIcon from '@icons/personal/finance/withdraw-hover.svg'

const financeList = [{
  label: '充值',
  icon: depositIcon,
  path: '/personal/deposit',
}, {
  label: '转账',
  icon: transferIcon,
  path: '/personal/transfer',
}, {
  label: '提现',
  icon: withdrawIcon,
  path: '/personal/withdraw',
}]

const typeList = [{
  label: '银行卡管理',
  value: 1,
}, {
  label: '数字货币管理',
  value: 2,
}]
// query传递的提现方式 bank | digital
const withdrawType = $(useRouteQuery<'bank' | 'digital'>('type', 'bank'))
const type = $ref(withdrawType === 'bank' ? 1 : 2)
const router = useRouter()
// 获取我的银行卡列表
const { data: myBankList } = useRequest(getMyBankList)
// 获取我的数字货币列表
const { data: myDigitalList } = useRequest(getDigitalList)
const direction = ref(true)
const handleChange = (index: number) => {
  direction.value = index > type
}

// 弹窗
const userStore = useUserStore()
const { haveWithdrawPwd, realName } = $(storeToRefs(userStore))
const dialogRef = ref()
const addSomething = (type: string) => {
  if (!haveWithdrawPwd) {
    dialogRef.value.open()
    return
  }

  switch (type) {
    case 'bank':
      router.push('/personal/add-bank')
      break
    case 'digital':
      router.push('/personal/add-digital')
      break
    default:
      break
  }
}
const onConfirm = () => { router.push('/personal/user-info') }

// 真实姓名弹窗可见性
let realNameVisible = $ref(false)
// 处理提现点击事件
const handleItemClick = (item: any) => {
  if (item.path === '/personal/deposit' && !realName)
    return realNameVisible = true

  router.push(item.path)
}
</script>

<template>
  <div class="wallet">
    <personal-title title="我的钱包" hider-border />
    <div class="wallet-inner">
      <div class="wallet-header">
        <!-- 中心钱包和锁定钱包 -->
        <div class="center-wallet-wrapper">
          <center-wallet mr="20px" :split="false" />
        </div>
        <ul class="finance">
          <li v-for="item in financeList " :key="item.label" class="btn " @click="handleItemClick(item)">
            <img v-if="item.label === '充值'" :src="item.icon" class="scale12" w-33px h-32px>
            <img v-else :src="item.icon" class="scale12" w-39px h-32px>
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </div>
      <!-- 场馆钱包 -->
      <venue-wallet margin-left="19.5px" />
    </div>
    <div class="card-list">
      <div class="tabs-wrapper">
        <jl-tabs v-model="type" :list="typeList" @change="handleChange" />
        <transition mode="out-in" :name="type === 1 ? 'slide-right' : 'slide-left'">
          <!-- 银行卡列表 -->
          <div v-if="type === 1" :key="1" class="card-list">
            <div class="title">
              卡片数量&nbsp;&nbsp;({{ myBankList?.length ?? 0 }}/5)
            </div>
            <!-- <list-transition direction="btt" :delay-interval="200" appear tag="div" class="bank-wrapper"> -->
            <div class="bank-wrapper">
              <bank-card
                v-for="(item, index) in myBankList" :key="item.id" :data-index="index" :data="item"
                class="bank-item"
              />
              <div
                v-if="(myBankList?.length ?? 0) < 5" :data-index="myDigitalList?.length ?? 0" class="add-bank"
                @click="addSomething('bank')"
              >
                <jl-image :src="addBankImg" w-28px h-28px />
                <span class="bank">添加银行卡</span>
              </div>
            </div>
            <!-- </list-transition> -->
          </div>
          <!-- 数字货币列表 -->
          <div v-else :key="2" class="digital-list">
            <div class="title">
              卡片数量&nbsp;&nbsp;({{ myDigitalList?.length ?? 0 }}/5)
            </div>
            <!-- <list-transition direction="btt" :delay-interval="200" appear tag="div" class="bank-wrapper"> -->
            <div class="bank-wrapper">
              <digital-card
                v-for="(item, index) in (myDigitalList ?? [])" :key="item.id" :data-index="index"
                :data="item" class="bank-item"
              />
              <div
                v-if="(myDigitalList?.length ?? 0) < 5" :data-index="myDigitalList?.length ?? 0" class="add-bank"
                @click="addSomething('digital')"
              >
                <jl-image :src="digitalImg" w-28px h-28px />
                <span class="digital">添加数字货币地址</span>
              </div>
            </div>
            <!-- </list-transition> -->
          </div>
        </transition>
      </div>
    </div>
    <!-- 弹窗 -->
    <dialog-add-bank ref="dialogRef" @confirm="onConfirm" />
    <!-- 未绑定真实姓名弹窗 -->
    <realname-modal v-if="realNameVisible" v-model="realNameVisible" />
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

@include transition-slide-left();
@include transition-slide-right();

.wallet {
  @include pageCard;

  .wallet-inner {
    border: 1px solid #EBEBEB;
    padding: 19px 19px 14px;
    border-radius: 6px;

    .wallet-header {
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .center-wallet-wrapper {
        flex: 1;
        padding-right: 20px;
      }

      .finance {
        border-radius: 6px;
        height: 90px;
        width: 290px;
        border: 1px solid #EBEBEB;
        display: flex;
        align-items: center;
        padding: 0 40px;
        justify-content: space-between;

        li {
          display: flex;
          flex-direction: column;
          align-items: center;
          user-select: none;
          cursor: pointer;

          span {
            font-size: 15px;
            font-family: $jl-font;
            margin-top: 5px;
            color: $color-black-primary;
          }
        }
      }
    }

  }

  .tabs-wrapper {
    padding: 20px 0;

    .title {
      padding-top: 20px;
      font-size: 15px;
      line-height: 20px;
      padding-bottom: 10px;
      color: $color-black-primary;
      text-align: left;
    }
  }

  .bank-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin-left: -19px;

    .bank-item {
      margin-left: 19px;
      margin-top: 19px;
    }

    .add-bank {
      cursor: pointer;
      width: 320px;
      height: 136px;
      border-radius: 6px;
      border: 1px solid $border-color;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 19px;
      margin-top: 19px;

      span {
        font-size: 15px;
        color: $color-primary-second;
        padding-left: 10px;

        &.bank {
          color: $color-primary-second;
        }

        &.digital {
          color: rgba(22, 177, 139, 1);
        }
      }
    }
  }

}
</style>

<route lang="yaml">
meta:
  layout: main
  personal: true
  auth: true
</route>

