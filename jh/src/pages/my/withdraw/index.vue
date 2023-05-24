<script lang="ts" setup>
import { Toast } from 'vant'
// component
import AmountExhibit from '../components/amountExhibit.vue'
import BankCardWithdraw from './components/bankCardWithdraw.vue'
import NumCoinWithdraw from './components/numCoinWithdraw.vue'
import Header from '~/components/Header.vue'
// 背景图
import bgSrc1 from '~/assets/images/my/active.png?preset=full'
import routerBackHook from '~/hooks/routerBackHooks'

const { token, sadfasfNum } = storeToRefs(useUserInfoStore())
const { oneClickTrunLoadingClose, oneClickTrunLoadingOpen } = useUserInfoStore()
const router = useRouter()
const { goTo } = routerBackHook()
const activeBgImg = `url(${getSupportImage(bgSrc1)})`
const selectTypeList = [
  {
    label: '银行卡提现',
    value: 1,
    component: shallowRef(BankCardWithdraw),
    id: '45',
    note: '',
  },
  {
    label: '数字货币提现',
    value: 2,
    component: shallowRef(NumCoinWithdraw),
    id: '25',
    note: '',
  },
]
const nowSelectTypeList: any = ref(selectTypeList)

// 银行卡or 数字货币
const bankAndVirtual = ref({
  bank: 0,
  virtual: 0,
})

const dialogs = ref({
  visible: false,
  content: '您还未绑定任何银行卡账户，请先绑定',

})
const onConFirm = () => {
  goTo('/my/account-manage')
}

const selectType = ref(1)
const onSelect = (item: any) => {
  localStorage.setItem('TAB_ID', selectType.value.toString())
  if (selectType.value === item.value)
    return
  if (selectType.value === 2) {
    if (!bankAndVirtual.value.bank) {
      dialogs.value = {
        visible: true,
        content: '您还未绑定任何银行卡账户，请先绑定',

      }
      return true
    }
    else {
      // 弹窗提醒
      financePopup('withdraw', '999')
    }
  }
  else if (selectType.value === 1) {
    if (!bankAndVirtual.value.virtual) {
      dialogs.value = {
        visible: true,
        content: '您还未绑定任何数字币账户，请先绑定',

      }
      return true
    }
  }
  if (selectType.value === item.value)
    return
  selectType.value = item.value
}
const getBankAndVirtual = () => {
  if (token.value) {
    getMyBankListRequest().then((res: any) => {
      if (res.status)
        bankAndVirtual.value.bank = res.data ? res.data.length : 0
      if (!bankAndVirtual.value.bank)
        selectType.value = 2
    })
    getDigitalListRequest().then((res: any) => {
      if (res.status)
        bankAndVirtual.value.virtual = res.data ? res.data.length : 0
      if (!bankAndVirtual.value.virtual)
        selectType.value = 1
      // 弹窗提醒
      financePopup('withdraw', '999')
    })
  }
}
getBankAndVirtual()

const getwithdrawInfo = () => {
  withdrawInfoRequest().then((res: any) => {
    if (res.status) {
      const resList = res.data ?? []
      const lists: any = []

      resList.forEach((item: any) => {
        const resItem = resList.find((noteItem: any) => noteItem.id === item.id) ?? {}
        const selectItem: any = selectTypeList.find((selectItem: any) => selectItem.id === item.id) ?? {}

        lists.push({
          ...selectItem,
          note: resItem?.note,
        })
      })

      nowSelectTypeList.value = lists
    }
  })
}
getwithdrawInfo()

// 路由 router 离开
router.beforeEach((to, from, next) => {
  console.log(to.path, '========', from.path)
  if (to.path === '/my' && from.path === '/my/withdraw') {
    oneClickTrunLoadingOpen()
    if (sadfasfNum.value)
      Toast('部分钱包回收失败，请稍后重试')
  }
  else if (to.path === '/my/withdraw' && from.path === '/my') {
    oneClickTrunLoadingClose()
  }

  next()
})
</script>

<template>
  <div class="myWarp">
    <Header title="提现" />
    <AmountExhibit />
    <div class="implementWarp">
      <div class="selectTabWarp">
        <p>提现方式</p>
        <ul>
          <li v-for="(item, index) in nowSelectTypeList" :key="index">
            <div class="selectTab" :class="selectType === item.value ? 'active' : ''" @click="onSelect(item)">
              {{ item.label }}
            </div>
          </li>
        </ul>
      </div>
      <div v-for="(item) in nowSelectTypeList" :key="item.value">
        <div v-show="selectType === item.value" class="implementContet">
          <component :is="item.component" />
        </div>
      </div>
    </div>
    <div v-if="nowSelectTypeList.length > 0">
      <div v-for="(item, index) in nowSelectTypeList" :key="index" class="noteWarp">
        <p v-if="selectType === item.value">
          提现说明
        </p>
        <div>
          <div v-if="selectType === item.value" v-html="item.note" />
        </div>
      </div>
    </div>

    <CustomizeDialog v-model="dialogs.visible" :content="dialogs.content" confirm-text="立即绑定" @confirm="onConFirm()" />
  </div>
</template>

<style lang="scss" scoped>
.myWarp {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  color: #000000;
  background: #F5F5F9;

  .implementWarp {
    width: 100%;
    margin-top: 10px;

    .selectTabWarp {
      width: 100%;
      padding: 0 18px;
      background-color: #fff;

      p {
        width: 100%;
        height: 35px;
        display: flex;
        align-items: center;
        padding: 0 8px;
      }

      ul {
        width: 100%;
        padding: 5px 0;
        display: flex;
        border-bottom: 1px solid #E0E0E0;
        flex-wrap: wrap;

        li {
          width: calc(100%/3);
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: center;

          .selectTab {
            width: 100px;
            height: 30px;
            border-radius: 6px;
            border: 1px solid #979797;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            line-height: 11px;
            position: relative;

            &.active {
              // overflow: hidden;
              border: 1px solid #4080FF;

              &::after {
                content: ' ';
                width: 18px;
                height: 16px;
                position: absolute;
                right: -1px;
                bottom: -1px;
                background-image: v-bind(activeBgImg);
                background-size: 100%;
                background-repeat: no-repeat;
                background-position: center;
              }
            }
          }
        }
      }
    }

    .implementContet {
      width: 100%;
    }
  }
  .noteWarp{
    margin-top: 10px;
    padding-left: 14px;
    padding-right: 14px;
    >p {
      font-size: 12px;
      font-weight: bold;
    }
    >div{
      margin-top: 13px;
      line-height: 15px;
    }
  }
}
</style>
