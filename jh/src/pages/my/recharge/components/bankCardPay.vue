<script lang="ts" setup>
import { Toast } from 'vant'
// components
import InputErr from '~/components/customizeInputErr.vue'
import CustomizeInput from '~/components/customizeInput.vue'
import { getBankLogo } from '~/static/bankIconList'
// 背景图
import bgSrc2 from '~/assets/images/my/active.png?preset=full'
const props = withDefaults(defineProps<Props>(), {
  record: {},
})
const activeBgImg = `url(${getSupportImage(bgSrc2)})`
interface Props {
  record: any
}

const amountList: any = ref([])
const nowRecord = ref({
  bankName: '',
  accountName: '',
  bankCardNo: '',
  content_app: '',
  bank_id: '',
  bankBranch: '',
  id: '',
  min: 0,
  max: 0,
})
const params = ref({
  amount: '',
  name: '',
})
const verifyTip = ref({
  amount: '',
  name: '',
})
// const dialogs = ref({
//   visible: false,
// })

const disabled = computed(() => {
  if (+params.value.amount > nowRecord.value.max || +params.value.amount < nowRecord.value.min)
    return true

  return !(Object.values(params.value).every(item => item))
})

const loading = ref(false)

const verifyParams = (newVal: any, name: string) => {
  switch (name) {
    case 'amount':
      // console.log(newVal, '=====>>>><<<')
      if (newVal === '' || newVal === undefined || newVal === null)
        verifyTip.value[name] = '充值金额不能为空'
      else if (newVal < nowRecord.value.min || newVal > nowRecord.value.max)
        verifyTip.value[name] = `充值金额必须在${nowRecord.value.min}与${nowRecord.value.max}之间`
      else
        verifyTip.value[name] = ''

      break
    case 'name':
      if (newVal === '' || newVal === undefined || newVal === null)
        verifyTip.value[name] = '充值人姓名不能为空'
      else
        verifyTip.value[name] = ''

      break
    default:
      console.log('没有这个参数,我的哥~')
      break
  }
}

const verifyParamsBlur = (newVal: any, name: string) => {
  switch (name) {
    case 'amount':
      if (['', null, undefined].includes(newVal))
        verifyTip.value[name] = ''
      break
    case 'name':
      if (['', null, undefined].includes(newVal))
        verifyTip.value[name] = ''

      break
    default:
      console.log('没有这个参数,我的哥~')
      break
  }
}

const onAmount = (item: any) => {
  params.value.amount = item
}

const submit = () => {
  // if (userInfo.value.real_name) {
  loading.value = true

  financePayOfflineRequest({
    id: nowRecord.value.id,
    amount: params.value.amount,
    name: params.value.name,
  }).then((res: any) => {
    if (res.status) {
      params.value.amount = ''
      params.value.name = ''
      Toast(res.data?.msg ?? '订单提交成功，我们将在5分钟内为您添加额度')
    }
    // window.open(res.data, '_blank')
    params.value.amount = ''
    params.value.name = ''
  }).finally(() => {
    loading.value = false
  })
  // }
  // else {
  // openPop()
  // dialogs.value.visible = true
  // }
}

const init = () => {
  const { record } = props
  const { channelId } = record
  const { note } = record

  if ([null, undefined, ''].includes(record.amount_list)) {
    amountList.value = []
  }
  else {
    const amountArr = record.amount_list.split(',')
    amountList.value = amountArr
  }

  if (['', null, undefined].includes(channelId))
    return

  getPayBankRequest(channelId).then((res: any) => {
    if (res.status) {
      nowRecord.value.bankName = res.data.bankName ?? ''
      nowRecord.value.accountName = res.data.accountName ?? ''
      nowRecord.value.bankCardNo = res.data.bankCardNo ?? ''
      nowRecord.value.content_app = res.data.content_app ?? ''
      nowRecord.value.bank_id = res.data.bank_id ?? ''
      nowRecord.value.bankBranch = res.data.bankBranch ?? ''
      nowRecord.value.id = res.data.id ?? ''
      nowRecord.value.max = res.data.max ?? 0
      nowRecord.value.min = res.data.min ?? 0
    }
  })
}

init()
watch(() => props.record.channelId, (newVal: any) => {
  if (newVal !== '')
    init()
})
</script>

<template>
  <div class="bankCardPayWarp">
    <ul>
      <li>
        <div class="hintNum">
          1
        </div>
        <div class="content">
          <p class="hintLabel">
            请转账到以下银行账户: 单笔最低<span>{{ nowRecord.min }}</span>元，最高<span>{{ nowRecord.max }}</span>元
          </p>
        </div>
      </li>
      <li>
        <div class="label">
          收款银行：
        </div>
        <div class="content">
          <dl class="bankCardWarp" grid grid-cols-2 gap-x-0px gap-y-10px>
            <dt class="active">
              <img loading="lazy" :src="getSupportImage(getBankLogo(String(nowRecord.bank_id)) as any)">

              <span>{{ nowRecord.bankName }}</span>
            </dt>
          </dl>
        </div>
      </li>
      <li>
        <div class="label">
          收款户名：
        </div>
        <div class="content">
          <div class="addressWarp">
            <span>{{ nowRecord.accountName }}</span>
            <div class="copy" @click="handleCopy(nowRecord.accountName)">
              复制
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="label">
          收款账号：
        </div>
        <div class="content">
          <div class="addressWarp">
            <span>{{ nowRecord.bankCardNo }}</span>
            <div class="copy" @click="handleCopy(nowRecord.bankCardNo)">
              复制
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="label">
          开户支行：
        </div>
        <div class="content">
          <div class="addressWarp">
            <span>{{ nowRecord.bankBranch }}</span>
            <div class="copy" @click="handleCopy(nowRecord.bankBranch)">
              复制
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="hintNum">
          2
        </div>
        <div class="content">
          <p class="hintLabel">
            请认真填写您的转账信息：
          </p>
          <p class="hintValue">
            请务必转帐后再提交订单，否则无法及时查到您的款项！
          </p>
        </div>
      </li>
      <li v-if="amountList.length">
        <div class="methodWarp">
          <p>
            {{ (String(record.flags) === '1') ? '充值金额' : '固定金额' }}
          </p>
          <ol grid grid-cols-4 gap-x-21px gap-y-15px>
            <li
              v-for="(item, index) in amountList" :key="index" class="li4"
              :class="{ active: String(item) === String(params.amount) }" @click="onAmount(item)"
            >
              ¥{{ item }}
            </li>
          </ol>
        </div>
      </li>
      <li v-if="String(record.flags) !== '1' || !amountList.length">
        <div class="label">
          充值金额：
        </div>
        <div class="content contentInput">
          <InputErr :err="verifyTip.amount">
            <template #errInput>
              <CustomizeInput
                v-model="params.amount"
                input-type="amount"
                placeholder-color="#6D839A"
                color="#000000"
                :placeholder="`请输入充值金额${nowRecord.min}-${nowRecord.max}元`"
                :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'amount'); callback(); }"
                :on-blur="(newVal: any) => { verifyParamsBlur(newVal, 'amount') }"
                @on-clear="verifyParams('', 'amount')"
              />
            </template>
          </InputErr>
        </div>
      </li>
      <li>
        <div class="label">
          充值人姓名：
        </div>
        <div class="content contentInput">
          <InputErr :err="verifyTip.name">
            <template #errInput>
              <CustomizeInput
                v-model="params.name"
                input-type="realname"
                placeholder-color="#6D839A"
                color="#000000"
                placeholder="请输入转账人真实姓名"
                :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'name'); callback(); }"
                :on-blur="(newVal: any) => { verifyParamsBlur(newVal, 'name') }"
                @on-clear="verifyParams('', 'name')"
              />
            </template>
          </InputErr>
        </div>
      </li>
    </ul>
    <div class="footWarp">
      <div class="submitBtn">
        <van-button
          class="customizeConfirm" :disabled="disabled" :loading="loading" loading-type="spinner"
          loading-text="提交中..." @click="submit()"
        >
          立即充值
        </van-button>
      </div>
      <div class="tips">
        充值如遇到任何问题，请联系<Sc />。
      </div>
      <div class="noteWarp">
        <p class="noteTitle">
          充值说明
        </p>
        <div class="noteContent" v-html="props.record.note" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bankCardPayWarp {
  width: 100%;

  ul {
    width: 100%;
    padding: 10px 18px 10px 18px;
    background-color: #fff;
    font-size: 11px;
    line-height: 11px;
    color: #000000;

    li {
      width: 100%;
      display: flex;
      margin-bottom: 10px;

      .label {
        width: 82px;
        height: 30px;
        display: flex;
        align-items: center;
      }

      .hintNum {
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background-color: #597EF6;
        font-size: 10px;
        line-height: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        margin-right: 10px;
      }

      .content {
        flex: 1;
        width: 100%;
        min-height: 30px;
        display: flex;
        flex-direction: column;

        .bankCardWarp {
          width: 100%;

          dt {
            width: 100px;
            height: 30px;
            // padding: 0 13px;
            border-radius: 6px;
            border: 1px solid #979797;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;

           img{
              width: 15px;
              height: 15px;
              margin-right: 7px;
            }

            &.active {
              border: 1px solid #4080FF;

             img{
                width: 15px;
                height: 15px;
                background-size: 100%;
                background-repeat: no-repeat;
                background-position: center;
              }

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

        .hintLabel {
          width: 100%;
          min-height: 15px;
          line-height: 15px;
          font-size: 11px;

          span {
            color: #FF0000;
          }
        }

        .hintValue {
          width: 100%;
          min-height: 14px;
          line-height: 14px;
          font-size: 10px;
          color: #545454;
        }

        .addressWarp {
          width: 100%;
          min-height: 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .copy {
            min-width: 66px;
            height: 20px;
            border-radius: 3px;
            border: 1px solid #4F73F6;
            font-size: 11px;
            line-height: 11px;
            color: #4F73F6;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
          }
        }
      }

      .contentInput{
        padding-bottom: 12px;
      }

      .methodWarp {
        width: 100%;
        background: #fff;
        padding-bottom: 7px;

        .title {
          width: 100%;
          height: 15px;
          font-weight: 800;
          color: #414656;
          display: flex;
          align-items: center;
        }

        ol {
          width: 100%;
          padding-top: 15px;

          li {
            border-radius: 6px;
            border: 1px solid #979797;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            margin: 0;

            &.li3 {
              width: 100px;
              height: 30px;
            }

            &.li4 {
              width: 69px;
              height: 30px;
            }

            p {
              width: 100%;
              font-size: 10px;
              line-height: 14px;
              text-align: center;
            }

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

  .footWarp {
    width: 100%;
    padding: 25px 18px;

    .submitBtn {
      width: 100%;
    }

    .tips {
      width: 100%;
      min-height: 20px;
      font-size: 14px;
      color: #848484;
      line-height: 20px;
      margin-top: 15px;
      text-align: center;
    }

    .noteWarp{
    padding-left: 14px;
    padding-right: 14px;
    padding-top: 35px;
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

}
</style>
