<script lang="ts" setup>
import Header from '~/components/Header.vue'
import Sc from '~/components/sc.vue'
import CustomizeInput from '~/components/customizeInput.vue'
import usdtList from '~/static/usdtList'

// 背景图
import arrowBgSrc from '~/assets/images/my/active.png?preset=full'

import useRouterBack from '~/hooks/routerBackHooks'
const { goBack } = useRouterBack()
const activeBgImg = `url(${getSupportImage(arrowBgSrc)})`

const agreementsList: any = ref(usdtList[0].list)

const params = ref({
  wallet_alias: '',
  wallet_address: '',
  currency: usdtList[0].value,
  wallet_agreements: usdtList[0].list[0]?.value ?? '',
  password: '',
})

const verifyTip: any = ref({
  wallet_alias: '',
  wallet_address: '',
  currency: '',
  wallet_agreements: '',
  password: '',
})
const errorTip = ref('')

const loading = ref(false)
const disabled = computed(() => {
  const newParams = JSON.parse(JSON.stringify(params.value))
  delete newParams.wallet_agreements
  return !(Object.values(newParams).every(item => item) && !errorTip.value)
})

const onCurrency = (item: any) => {
  params.value.currency = item.value
  params.value.wallet_agreements = item.list[0]?.value ?? ''
  agreementsList.value = item.list
}

const onAgreements = (item: any) => {
  params.value.wallet_agreements = item.value
}

const verifyParams = (newVal: any, name: string) => {
  switch (name) {
    case 'wallet_alias':
      if (['', null, undefined].includes(newVal))
        verifyTip.value[name] = '别名不能为空'
      else
        verifyTip.value[name] = ''
      break
    case 'wallet_address':
      if (['', null, undefined].includes(newVal))
        verifyTip.value[name] = '数字货币账户不能为空'
      else if (!isVirtualAddress(newVal))
        verifyTip.value[name] = '请正确输入数字货币地址。'
      else
        verifyTip.value[name] = ''

      break
    case 'password':
      if (['', null, undefined].includes(newVal) || newVal.length < 6)
        verifyTip.value[name] = '请正确输入安全密码。'
      else if (!isPhoneVirtualCode(newVal))
        verifyTip.value[name] = '您的安全密码不对，请重新输入。'
      else
        verifyTip.value[name] = ''

      break
    default:
      console.log('没有这个参数,我的哥~')
      break
  }

  errorTip.value = verifyTip.value[name]
}

const addCard = () => {
  loading.value = true
  insertDigitalAddressRequest({
    ...params.value,
  }).then((res: any) => {
    if (res.status) {
      // console.log(res, '1111')
      goBack()
    }
  }).finally(() => {
    loading.value = false
  })
}
</script>

<template>
  <div class="addBankCardWarp">
    <Header title="添加数字货币" />
    <dl>
      <dt>
        <div class="error">
          {{ errorTip }}
        </div>
        <div class="fromItemMain fromItemMain1">
          <p class="label">
            别名
          </p>
          <div class="value">
            <CustomizeInput
              v-model="params.wallet_alias"
              :maxlength="10"
              color="#394652"
              placeholder="请输入地址别名方便区分钱包地址"
              :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'wallet_alias'); callback(); }"
              :on-blur="(newVal: any) => { verifyParams(newVal, 'wallet_alias') }"
            />
          </div>
        </div>
      </dt>
      <dt>
        <div class="fromItemMain">
          <p class="label">
            数字货币账户
          </p>
          <div class="value">
            <CustomizeInput
              v-model="params.wallet_address"
              :maxlength="44"
              input-type="currency"
              color="#394652"
              placeholder="请输入数字货币账户地址"
              :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'wallet_address'); callback(); }"
              :on-blur="(newVal: any) => { verifyParams(newVal, 'wallet_address') }"
            />
          </div>
        </div>
      </dt>
      <dt>
        <div class="fromItemMain">
          <p class="label">
            数字货币种类
          </p>
          <div class="value">
            <ol grid grid-cols-3 gap-x-19px gap-y-10px>
              <li v-for="(item, index) in usdtList" :key="index" :class="{ active: item.value === params.currency }" @click="onCurrency(item)">
                {{ item.label }}
              </li>
            </ol>
          </div>
        </div>
      </dt>
      <dt v-if="agreementsList.length">
        <div class="fromItemMain">
          <p class="label">
            协议模式
          </p>
          <div class="value">
            <ol grid grid-cols-3 gap-x-19px gap-y-10px>
              <li v-for="(item, index) in agreementsList" :key="index" :class="{ active: item.value === params.wallet_agreements }" @click="onAgreements(item)">
                {{ item.label }}
              </li>
            </ol>
          </div>
        </div>
      </dt>
      <dt>
        <div class="fromItemMain">
          <p class="label">
            安全密码
          </p>
          <div class="value">
            <CustomizeInput
              v-model="params.password" :maxlength="6" input-type="number"
              placeholder="请输入安全密码"
              :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'password'); callback(); }"
              :on-blur="(newVal: any) => { verifyParams(newVal, 'password') }"
            />
          </div>
        </div>
      </dt>
    </dl>
    <div class="submitWarp">
      <van-button
        class="customizeConfirm" oading-type="spinner" loading-text="加载中..." :disabled="disabled"
        :loading="loading" @click="addCard()"
      >
        添加数字货币地址
      </van-button>
      <p>
        如遇到任何问题，请联系<Sc />。
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.addBankCardWarp {
  width: 100%;
  height: 100%;
  background-color: #F5F5F9;
  color: #000000;

  dl {
    width: 100%;
    border-top: 1px solid #E5E5E5;

    dt {
      width: 100%;
      min-height: 64px;
      background-color: #fff;
      padding: 0 18px;

      &:last-child {
        .fromItemMain {
          border-bottom: none;
        }
      }

      .error {
        width: 100%;
        min-height: 12px;
        padding-top: 10px;
        font-size: 9px;
        color: #FF0000;
      }

      .fromItemMain {
        width: 100%;
        min-height: 64px;
        padding: 10px 0;
        border-bottom: 1px solid #F3F3F3;
        display: flex;
        flex-direction: column;

        &.fromItemMain1 {
          height: 69px;
        }

        .label {
          width: 100%;
          height: 20px;
          font-size: 14px;
          line-height: 20px;
        }

        .value {
          flex: 1;
          width: 100%;
          height: 100%;
          padding-top: 6px;

          ol {
            width: 100%;

            li {
              width: 100%;
              height: 30px;
              border-radius: 6px;
              border: 1px solid #979797;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;

              &.active {
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
    }

    dd {
      width: 100%;
      height: 32px;
      line-height: 32px;
      font-size: 9px;
      color: #828282;
      padding: 0 18px;
    }
  }

  .submitWarp {
    width: 100%;
    padding: 25px 18px;

    p {
      text-align: center;
      font-size: 14px;
      color: #848484;
      line-height: 20px;
      height: 20px;
      margin-top: 15px;
    }
  }
}
</style>
