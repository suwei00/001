<script lang="ts" setup>
// ahooks
import routerBackHooks from '~/hooks/routerBackHooks'
// component
import CustomizePullDownUp from '~/components/customizePullDownUp.vue'
import bgImage from '~/components/bgImage.vue'
import CustomizeDialog from '~/components/customizeDialog.vue'
// utils
import { getSupportImage } from '~/utils/help'

// 背景图
import bgSrc1 from '~/assets/images/noData/card.png?preset=full'
import bgSrc2 from '~/assets/images/my/accountManage/usdtIcon.png?preset=full'
import bgSrc3 from '~/assets/images/my/accountManage/greenCard.png?preset=full'
import bgSrc4 from '~/assets/images/my/accountManage/none.png?preset=full'

const bgImg = `url(${getSupportImage(bgSrc3)})`

const { goTo } = routerBackHooks()
const { userInfo } = storeToRefs(useUserInfoStore())
// loading 引入
const { openLoading, closeLoading } = useLoading()
const customizePullDownUp: any = ref(null)
const list: any = ref([])
const dialogs = ref({
  visible: false,
  content: '',
})

const init = (resolve: any = undefined, type: any = undefined) => {
  openLoading()
  getDigitalListRequest().then((res: any) => {
    if (res.status)
      list.value = res.data ?? []
  }).finally(() => {
    closeLoading()
    if (resolve)
      resolve()
  })
}

const addCard = () => {
  // if (!userInfo.value.withdraw_pwd && !userInfo.value.real_name) {
  //   dialogs.value.visible = true
  //   dialogs.value.content = '为了保证您的账户安全请先设置姓名和安全密码。'
  // }
  // else if (!userInfo.value.real_name) {
  //   dialogs.value.visible = true
  //   dialogs.value.content = '为了保证您的账户安全，请先设置姓名。'
  // }
  if (!userInfo.value.withdraw_pwd) {
    dialogs.value.visible = true
    dialogs.value.content = ' 为了保证您的账户安全，请先设置安全密码。'
  }
  else {
    goTo('/my/account-manage/add-virtual-currency')
  }
}
const onConFirm = () => {
  goTo('/set/safe-paw')
}
</script>

<template>
  <div class="dataContentWarp">
    <CustomizePullDownUp
      ref="customizePullDownUp" :pull-up="false" :list="list" :first-down-load="true"
      :no-data-img="bgSrc1" no-data-tip="目前没有数字货币地址" @init="init"
    >
      <template #bSContent>
        <ol class="dataContent">
          <li v-for="(item, index) in list" :key="index">
            <div class="li">
              <div class="cardHead">
                <bgImage :image="bgSrc2" />
                <div class="cardNameWarp">
                  <p class="name1">
                    {{ item.wallet_alias }}
                  </p>
                  <p class="name2">
                    {{ item.currency === 'USDT' ? item.wallet_agreements : item.currency }}
                  </p>
                </div>
                <div class="cardTypeWarp">
                  <p class="type">
                    数字货币
                  </p>
                </div>
              </div>
              <div class="cardMain">
                {{ item.wallet_address }}
              </div>
              <div v-if="item.state !== 1" class="cardDisabled">
                <bgImage :image="bgSrc4" />
                <span>暂时停用</span>
              </div>
            </div>
          </li>
        </ol>
      </template>
      <template #bSAtLast>
        <div class="submitWarp">
          <van-button v-if="list.length < 5" class="customizeConfirm" style="background: #00B087;" @click="addCard()">
            添加数字货币地址
          </van-button>
        </div>
      </template>
    </CustomizePullDownUp>

    <CustomizeDialog
      v-model="dialogs.visible"
      title="温馨提示"
      :content="dialogs.content"
      cancel-text="确定"
      confirm-text="去设置"
      @confirm="onConFirm()"
    />
  </div>
</template>

<style lang="scss" scoped>
.dataContentWarp {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.dataContent {
  width: 100%;
  padding: 0 18px;

  li {
    width: 100%;
    padding-top: 20px;

    .li {
      width: 100%;
      height: 145px;
      border-radius: 5px;
      overflow: hidden;
      color: #FFFFFF;
      padding: 14px 26px;
      position: relative;
      background-image: v-bind(bgImg);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: right bottom;

      .cardHead {
        width: 100%;
        min-height: 43px;
        display: flex;
        align-items: center;

       img{
          width: 28px;
          height: 28px;
          margin-right: 14px;
        }

        .cardNameWarp {
          flex: 1;
          width: 100%;

          .name1 {
            width: 100%;
            height: 22px;
            font-size: 16px;
            line-height: 16px;
            font-weight: 800;
          }

          .name2 {
            width: 100%;
            height: 20px;
            font-size: 14px;
            line-height: 14px;
            font-weight: 800;
            color: #E6E6E6;
          }
        }

        .cardTypeWarp {
          min-height: 43px;

          .type {
            height: 22px;
            font-size: 16px;
            font-weight: 800;
            line-height: 16px;
          }
        }
      }

      .cardMain {
        padding-top: 33px;
        width: 100%;
        min-height: 40px;
        font-size: 28px;
        font-weight: 800;
        line-height: 40px;
        display: flex;
        justify-content: center;
      }

      .cardDisabled {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(55, 55, 55, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: 800;
        line-height: 25px;

       img{
          width: 20px;
          height: 20px;
          margin-right: 8px;
        }
      }
    }
  }
}

.submitWarp {
  width: 100%;
  padding: 25px 18px;
}
</style>
