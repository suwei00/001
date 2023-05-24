<script lang="ts" setup>
import { Toast } from 'vant'
import CustomizeInput from '~/components/customizeInput.vue'
import Sc from '~/components/sc.vue'
// import CustomizeDialog from '~/components/customizeDialog.vue'
import InputErr from '~/components/customizeInputErr.vue'
// 背景图
import bgSrc2 from '~/assets/images/my/active.png?preset=full'

const props = withDefaults(defineProps<Props>(), {
  record: {},
})
const activeBgImg = `url(${getSupportImage(bgSrc2)})`
const { userInfo } = storeToRefs(useUserInfoStore())

interface Props {
  record: any
}
// const { openPop } = usePop()

const amountList: any = ref([])

const params = ref({
  id: '',
  amount: '',
})

const disabled = computed(() => {
  const { record } = props
  if (params.value.amount > record.max || params.value.amount < record.min)
    return true

  return !(Object.values(params.value).every(item => item))
})

const verifyTip = ref({
  id: '',
  amount: '',
})
// const dialogs = ref({
//   visible: false,
// })

const loading = ref(false)

const init = () => {
  const { record } = props
  // console.log(record, '<<<<<<=====', record.amount_list)

  params.value.amount = ''
  params.value.id = record.channelId ?? ''
  if (['', null, undefined].includes(record.amount_list)) {
    amountList.value = []
  }
  else {
    const amountArr = record.amount_list.split(',')
    amountList.value = amountArr
  }
}

const onAmount = (item: any) => {
  params.value.amount = item
}

const verifyParams = (newVal: any, name: string) => {
  const { record } = props

  switch (name) {
    case 'amount':
      if (newVal === '' || newVal === undefined || newVal === null)
        verifyTip.value[name] = '充值金额不能为空'
      else if (newVal < record.min || newVal > record.max)
        verifyTip.value[name] = `充值金额范围为${record.min}-${record.max}`
      else
        verifyTip.value[name] = ''

      break
    default:
      console.log('没有这个参数,我的哥~')
      break
  }
}

const submit = () => {
  if (userInfo.value.real_name) {
    if (verifyTip.value.amount)
      return Toast(verifyTip.value.amount)

    loading.value = true

    financePayRequest(params.value).then((res: any) => {
      if (res.status) {
        params.value.amount = ''
        // Toast('充值成功')
        location.href = res.data
      }
    }).finally(() => {
      loading.value = false
    })
  }
  // else {
  //   openPop()
  // dialogs.value.visible = true
  // }
}

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
  <div class="onlinePayWarp">
    <div class="selectWarp">
      <div class="methodWarp">
        <p class="title">
          充值金额
        </p>
        <ol v-if="amountList.length" grid grid-cols-4 gap-x-21px gap-y-15px>
          <li
            v-for="(item, index) in amountList" :key="index" class="li4"
            :class="{ active: String(item) === String(params.amount) }" @click="onAmount(item)"
          >
            ¥{{ item }}
          </li>
        </ol>
      </div>
    </div>
    <div v-if="String(record.flags) !== '1' || !amountList.length" class="inputWarp">
      <div class="inputIn">
        <InputErr :err="verifyTip.amount" border="0" padding="0">
          <template #errInput>
            <CustomizeInput
              v-model="params.amount" placeholder-color="#6D839A" color="#000000" input-type="amount"
              :placeholder="`请输入${record.min}-${record.max}元`"
              :on-input="(oldVal: any, newVal: any, callback: any) => { verifyParams(newVal, 'amount'); callback(); }"
              :on-blur="(newVal: any) => { verifyParams(newVal, 'amount') }"
            />
          </template>
        </InputErr>
        <!-- <span class="yuan">
          元
        </span> -->
      </div>
    </div>
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
.onlinePayWarp {
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

  .inputWarp {
    width: 100%;
    padding: 0 18px;
    background-color: #fff;

    .inputIn {
      height: 92px;
      display: flex;
      align-items: center;
      padding-top: 36px;
      padding-bottom: 12px;
      border-top: 1px solid #F1F1F1;
    }

    .yuan {
      font-size: 15px;
      line-height: 15px;
      color: #6D839A;
      margin-left: 10px;
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
      padding-top: 35px;
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
}
</style>
