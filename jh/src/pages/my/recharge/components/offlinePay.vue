<script lang="ts" setup>
// components
import { Toast } from 'vant'
import { handleCopy } from '~/utils/help'
import InputErr from '~/components/customizeInputErr.vue'
import CustomizeInput from '~/components/customizeInput.vue'

import Sc from '~/components/sc.vue'
// 背景图
import bgSrc2 from '~/assets/images/my/active.png?preset=full'
const props = withDefaults(defineProps<Props>(), {
  record: {},
})

// const { openPop } = usePop()

const urlBase = `${location.origin}/upload`

const activeBgImg = `url(${getSupportImage(bgSrc2)})`
const { userInfo } = storeToRefs(useUserInfoStore())

interface Props {
  record: any
}

const amountList: any = ref([])
const nowRecord: any = ref({
  addr: '',
  qr_url: '',
  id: '',
  min: 0,
  max: 0,
  rate: props.record.rate ?? '0.00',
})
const params: any = ref({
  id: '',
  amount: '',
})
const verifyTip = ref({
  id: '',
  amount: '',
})
// const dialogs = ref({
//   visible: false,
// })

// const amountList: any = [100, 200, 300]

const disabled = computed(() => {
  if (params.value.amount > nowRecord.value.max || params.value.amount < nowRecord.value.min)
    return true

  return !(Object.values(params.value).every(item => item))
})

const loading = ref(false)

const verifyParams = (newVal: any, name: string) => {
  const { record } = props

  switch (name) {
    case 'amount':
      if (newVal === '' || newVal === undefined || newVal === null)
        verifyTip.value[name] = `${((String(record.flags) !== '1' || !amountList.length) && ['12', '14'].includes(record.channelId)) ? '货币数量' : '充值金额'}不能为空`
      else if (newVal < nowRecord.value.min || newVal > nowRecord.value.max)
        verifyTip.value[name] = `${((String(record.flags) !== '1' || !amountList.length) && ['12', '14'].includes(record.channelId)) ? '货币数量' : '充值金额'}必须在${nowRecord.value.min}-${nowRecord.value.max}之间`
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

const init = () => {
  const { record } = props

  if ([null, undefined, ''].includes(record.amount_list)) {
    amountList.value = []
  }
  else {
    const amountArr = record.amount_list.split(',')
    amountList.value = amountArr
  }

  params.value.amount = ''
  params.value.id = record.id
  // console.log(record, '======<<<<====')

  if (['12'].includes(record.channelId)) {
    getFinanceOfflineUsdtRequest(params.value.id).then((res: any) => {
      // console.log(res, '======<<<<====1111')
      if (res.status) {
        nowRecord.value.addr = res.data.addr ?? ''
        nowRecord.value.qr_url = res.data.qr_url ?? ''
        nowRecord.value.currency_id = res.data.id ?? ''

        nowRecord.value.min = res.data.min ?? 0
        nowRecord.value.max = res.data.max ?? 0
      }
    })
  }
  else {
    nowRecord.value.min = record.min ?? 0
    nowRecord.value.max = record.max ?? 0
  }
}

const submit = () => {
  if (userInfo.value.real_name) {
    loading.value = true

    const pm: any = {
      id: params.value.id,
      amount: String(params.value.amount),
    }
    if (['12', '14'].includes(params.value.id)) {
      pm.currency_id = nowRecord.value.currency_id
      pm.rate = nowRecord.value.rate
    }

    financePayRequest(pm).then((res: any) => {
      if (res.status) {
        params.value.amount = ''
        if (res.data) {
          location.href = res.data
        }
        else {
          if (['12', '14'].includes(params.value.id))
            Toast('订单提交成功，我们将在5分钟内为您添加额度')

          else
            Toast('充值成功')
        }
      }
    }).finally(() => {
      loading.value = false
      const { record } = props

      getChannelsRequest(record.payId).then((res: any) => {
        if (res.status) {
          const resData = res.data ?? []
          // 找到当前的渠道
          const nowChannel = resData.find((item: any) => item.id === record.channelId)
          nowRecord.value.rate = nowChannel.rate ?? '0.00'
        }
      })
    })
  }
  // else {
  //   openPop()
  // dialogs.value.visible = true
  // }
}
console.log()

init()
watch(() => props.record.channelId, (newVal: any) => {
  if (newVal !== '') {
    params.value.id = ''
    params.value.amount = ''
    init()
  }
})
</script>

<template>
  <div class="offlinePayWarp">
    <ul>
      <li v-if="amountList.length">
        <div class="methodWarp">
          <p>
            {{ (['12', '14'].includes(record.channelId) && String(record.flags) !== '1') ? '固定金额' : '充值金额' }}
          </p>
          <ol v-if="amountList.length" grid grid-cols-4 gap-x-21px gap-y-15px>
            <li
              v-for="(item, index) in amountList" :key="index" class="li4"
              :class="{ active: String(item) === String(params.amount) }" @click="onAmount(item)"
            >
              {{ (!['12', '14'].includes(record.channelId) || (['12', '14'].includes(record.channelId) && String(record.flags) !== '2')) ? '¥' : ' ' }}{{ item }}
            </li>
          </ol>
        </div>
      </li>
      <li v-if="(String(record.flags) !== '1' || !amountList.length) && ['12', '14'].includes(record.channelId)">
        <div class="label">
          货币数量：
        </div>
        <div class="content">
          <InputErr :err="verifyTip.amount">
            <template #errInput>
              <CustomizeInput
                v-model="params.amount"
                input-type="amount"
                placeholder-color="#6D839A"
                color="#000000"
                :placeholder="`单笔限额${nowRecord.min}-${nowRecord.max}USDT`"
                :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'amount'); callback(); }"
                :on-blur="(newVal: any) => { verifyParamsBlur(newVal, 'amount') }"
                @on-clear="verifyParams('', 'amount')"
              />
            </template>
          </InputErr>
        </div>
      </li>
      <li v-if="(String(record.flags) !== '1' || !amountList.length) && !['12', '14'].includes(record.channelId)">
        <div class="inputWarp">
          <div class="inputIn">
            <InputErr :err="verifyTip.amount" border="0" padding="0">
              <template #errInput>
                <CustomizeInput
                  v-model="params.amount"
                  placeholder-color="#6D839A"
                  color="#000000"
                  input-type="amount2"
                  :placeholder="`请输入${record.min}-${record.max}元`"
                  :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'amount'); callback(); }"
                  :on-blur="(newVal: any) => { verifyParamsBlur(newVal, 'amount') }"
                  @on-clear="verifyParams('', 'amount')"
                />
              </template>
            </InputErr>
            <!-- <span class="yuan">
              元
            </span> -->
          </div>
        </div>
      </li>
      <li v-show="['12', '14'].includes(record.channelId)">
        <div class="label">
          充值汇率：
        </div>
        <div class="content">
          <p class="num">
            {{ reserveDecimal(nowRecord.rate) }}
          </p>
        </div>
      </li>
      <li v-show="['12', '14'].includes(record.channelId)">
        <div class="label">
          充值金额：
        </div>
        <div class="content">
          <p class="num">
            <span class="red">{{ Number(params.amount) ? reserveDecimal(nowRecord.rate * params.amount) : 0 }}</span>
          </p>
        </div>
      </li>
      <li v-show="['12'].includes(record.channelId)">
        <div class="label">
          收款地址：
        </div>
        <div class="content">
          <div class="addressWarp">
            <span v-if="nowRecord.addr">{{ nowRecord.addr }}</span>
            <span v-else class="grey">请联系客服获取收款地址</span>
            <div class="copy" @click="handleCopy(nowRecord.addr)">
              复制
            </div>
          </div>
        </div>
      </li>
      <li v-show="['12'].includes(record.channelId)">
        <div class="label">
          扫码支付：
        </div>
        <div class="content">
          <!-- <div
            v-if="nowRecord.qr_url" v-bg:lazy=" { src: `${urlBase}${nowRecord.qr_url}${canUseAvif() ? '.avif' : '.webp'}` }"
            class="codeWarp"
          /> -->
          <img v-if="nowRecord.qr_url" loading="lazy" :src=" `${urlBase}${nowRecord.qr_url}${canUseAvif() ? '.avif' : '.webp'}` " alt="" class="codeWarp">
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
        <div class="noteContent" v-html="record.note" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.offlinePayWarp {
  width: 100%;

  .selectWarp {
    width: 100%;
    padding: 0 18px 10px 18px;
    background-color: #fff;

    .methodWarp {
      width: 100%;

      .title {
        width: 100%;
        height: 36px;
        font-weight: 800;
        color: #414656;
        display: flex;
        align-items: center;
      }

      ol {
        width: 100%;
        padding: 5px 0;

        li {
          border-radius: 6px;
          border: 1px solid #979797;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;

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

  ul {
    width: 100%;
    padding: 10px 18px 5px 18px;
    background-color: #fff;
    font-size: 11px;
    line-height: 11px;
    color: #000000;

    li {
      width: 100%;
      display: flex;
      margin-bottom: 15px;

      .inputWarp {
        width: 100%;
        background-color: #fff;
        border-top: 1px solid #F1F1F1;

        .inputLabel {
          width: 100%;
          padding-top: 15px;
          min-height: 16px;
          display: flex;
          align-items: center;
          font-weight: 800;
          color: #414656;
        }

        .inputIn {
          width: 100%;
          display: flex;
          align-items: center;
          padding-top: 25px;
          min-height: 21px;
        }

        .yuan {
          font-size: 15px;
          line-height: 15px;
          color: #414655;
          margin-left: 10px;
        }
      }

      .methodWarp {
        width: 100%;
        background: #fff;

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

        .num {
          width: 100%;
          height: 30px;
          line-height: 30px;
        }

        .hintLabel {
          width: 100%;
          min-height: 15px;
          line-height: 15px;
          font-size: 11px;
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

        .codeWarp {
          width: 125px;
          height: 125px;
          border-radius: 6px;
          border: 1px solid #979797;
          overflow: hidden;
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }

        .hint1 {
          width: 100%;
          display: flex;
          border-radius: 8px;
          border: 1px solid #BDBDBD;
          padding: 19px 8px;

          .hint1Num {
            height: 15px;
            line-height: 15px;
          }

          .hint1Content {
            min-height: 15px;
            line-height: 15px;
          }
        }
      }
    }
  }

  .grey {
    color: #9D9D9D;
    font-size: 11px;
  }
  .red {
    color: #FF0000;
    font-size: 11px;
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
