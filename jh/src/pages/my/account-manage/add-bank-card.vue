<script lang="ts" setup>
import Header from '~/components/Header.vue'
import Sc from '~/components/sc.vue'
import CustomizeInput from '~/components/customizeInput.vue'
import CustomizeBankSelect from '~/components/customizeBankSelect.vue'
import CustomizeAreaSelect from '~/components/customizeAreaSelect.vue'
import BgImage from '~/components/bgImage.vue'

import useRouterBack from '~/hooks/routerBackHooks'

import imgSrc1 from '~/assets/images/public/minGreyRight.png?preset=full'

const { goBack } = useRouterBack()
const { userInfo } = storeToRefs(useUserInfoStore())

const params = ref({
  realname: userInfo.value.real_name ?? '',
  bankcard_no: '',
  bank_id: -1,
  bank_addr: '',
  password: '',
})
const verifyTip: any = ref({
  realname: userInfo.value.real_name ?? '',
  bankcard_no: '',
  bank_id: '',
  bank_addr: '',
  password: '',
})
const errorTip = ref('')

const loading = ref(false)
const disabled = computed(() => {
  return !(Object.values(params.value).every(item => item) && !errorTip.value)
})
const verifyParams = (newVal: any, name: string) => {
  switch (name) {
    case 'realname':
      if (['', null, undefined].includes(newVal))
        verifyTip.value[name] = '持卡人姓名不能为空'
      else if (!isRealName(newVal))
        verifyTip.value[name] = '持卡人姓名错误，请重新输入'
      else
        verifyTip.value[name] = ''
      break
    case 'bankcard_no':
      if (['', null, undefined].includes(newVal))
        verifyTip.value[name] = '银行卡号不能为空'
      else if (!isBankCard(newVal))
        verifyTip.value[name] = '银行卡号错误，请重新输入'
      else
        verifyTip.value[name] = ''

      break
    case 'password':
      if (['', null, undefined].includes(newVal))
        verifyTip.value[name] = '安全密码不能为空'
      else if (!isPhoneVirtualCode(newVal))
        verifyTip.value[name] = '安全密码错误，请重新输入'
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
  insertBankRequest({
    ...params.value,
    bankcard_no: params.value.bankcard_no,
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
    <Header title="添加银行卡" />
    <dl>
      <dt>
        <div class="error">
          {{ errorTip }}
        </div>
        <div class="fromItemMain fromItemMain1">
          <p class="label">
            持卡人姓名
          </p>
          <div class="value">
            <span v-if="userInfo.real_name">{{ userInfo.real_name }}</span>
            <CustomizeInput
              v-else
              v-model="params.realname"
              :maxlength="20" input-type="realname"
              placeholder="请输入持卡人姓名"
              :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'realname'); callback(); }"
              :on-blur="(newVal: any) => { verifyParams(newVal, 'realname') }"
            />
          </div>
        </div>
      </dt>
      <dd>
        <p class="rule_text">
          为了您的资金能够足够快速的到账，请确保填写的名字与银行卡开户姓名一致
        </p>
      </dd>
      <dt>
        <div class="fromItemMain">
          <p class="label">
            银行卡号
          </p>
          <div class="value">
            <CustomizeInput
              v-model="params.bankcard_no" :maxlength="20" input-type="number"
              placeholder="请输入银行卡号"
              :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'bankcard_no'); callback(); }"
              :on-blur="(newVal: any) => { verifyParams(newVal, 'bankcard_no') }"
            />
          </div>
        </div>
      </dt>
      <dt>
        <div class="fromItemMain">
          <p class="label">
            开户银行
          </p>
          <div class="value">
            <CustomizeBankSelect
              v-model="params.bank_id"
              views-placeholder="请选择银行"
              input-placeholder="请输入您要查询的银行名称文字"
            />
            <BgImage class="valueIcon" :image="imgSrc1" />
          </div>
        </div>
      </dt>
      <dt>
        <div class="fromItemMain">
          <p class="label">
            开户地点
          </p>
          <div class="value">
            <CustomizeAreaSelect v-model="params.bank_addr" placeholder="请选择开户银行地址" />
            <BgImage class="valueIcon" :image="imgSrc1" />
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
        添加银行卡
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

      &:first-child {
        .fromItemMain {
          border-bottom: none;
        }
      }

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
          display: flex;
          align-items: center;
          .valueIcon{
            width: 5px;
            height: 10px;
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
      .rule_text{
        white-space: nowrap;
        text-align: left;
        transform-origin: 0 18px;
        font-size: 9px;
    transform:scale(0.75);
    -ms-transform:scale(0.75);     /* IE 9 */
    -moz-transform:scale(0.75);     /* Firefox */
    -webkit-transform:scale(0.75); /* Safari 和 Chrome */
    -o-transform:scale(0.75);     /* Opera */
      }
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
