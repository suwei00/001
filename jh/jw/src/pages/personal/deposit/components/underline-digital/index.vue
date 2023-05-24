<script setup lang='ts' name="underline-digital">
// 数字货币充值- 离线模式数字币
import { ElMessage } from 'element-plus'
import type { F } from 'ts-toolbelt'
import type { ArrElement } from '~/api/type'
type itemProps = ArrElement<Awaited<F.Return<typeof getChannels>>>
interface Props {
  data: itemProps
}
const { data } = defineProps<Props>()

// 汇率发生变化
const emit = defineEmits(['rateChanged'])

const { data: qrcodeInfo } = $(useRequest(() => getDigitalQrCode(data.id)))
const appStore = useAppStore()
const min = $computed(() => qrcodeInfo?.min ?? 0)
const max = $computed(() => qrcodeInfo?.max ?? 0)
const note = $computed(() => data?.note)
const rate = $computed(() => data?.rate)
const id = $computed(() => data?.id)
// 当前选中的快捷金额index
let amountIndex = $ref(-1)
const currentAmountList = $computed(() => {
  if (!data)
    return []
  return data.amount_list === '' ? [] : data.amount_list.split(',').map(item => ({ label: item, value: item }))
})

// 充值需要的id
const currency_id = $computed(() => qrcodeInfo?.id)
// 二维码地址
const qr_url = $computed(() => qrcodeInfo?.qr_url ?? '')
// 收款地址
const addr = $computed(() => qrcodeInfo?.addr)
// 充值数量
const { errorMessage: numErrMsg, value: amount, setValue, setErrors } = $(useField<string>('num', (value) => {
  if (!value || !value.trim())
    return '货币数量不能为空'
  if (!positiveNumberRegx.test(value))
    return '金额格式不对'
  if (+value < min || +value > max)
    return `货币数量必须在${min}-${max}之间`
  return true
}))
const chooseAmount = (m: string | number) => {
  setValue(m.toString())
}
// 手动输入与固定金额联动
const inputHandler = (amount: string) => {
  setValue(toFixAmount(amount))
  amountIndex = currentAmountList.findIndex(c => c.value === amount)
}

// 失焦之后验证,清空错误信息
const handleBlurValidate = () => {
  if (!amount)
    setErrors('')
}

const total = $computed(() => {
  if (!amount || !rate)
    return '0'
  return toFloat(`${Number(amount) * Number(rate)}`)
})
// 禁用充值按钮
const disabled = $computed(() => {
  return !(+total) || !!numErrMsg || !currency_id
})
const addrRef = ref()
const copy = (dom: Element) => {
  handleCopy(dom, (text) => {
    ElMessage.success({
      message: '内容已复制',
      duration: 3000,
    })
  })
}
const { run, loading } = useRequest(() => financePay({ amount, id, rate, currency_id }), {
  manual: true,
  debounceInterval: 300,
  loadingKeep: 1000,
  onSuccess: () => {
    ElMessage.success('订单提交成功，我们将在5分钟内为您添加额度')
    amountIndex = -1
    setValue('')
    const t = setTimeout(() => {
      setErrors('')
      clearTimeout(t)
    }, 0)
  },
  onError(err) {
    if (err.message === '汇率发生变化')
      emit('rateChanged')
  },
})
</script>

<template>
  <div class="underline-digital">
    <div class="validate-wrapper">
      <!-- 充值金额 -->
      <div flex flex-col items-start mt-20px>
        <h5 v-if="currentAmountList?.length > 0" mb-15px>
          {{ data.flags === 2 ? '固定金额' : '货币数量' }}
        </h5>
        <personal-tabs
          v-if="currentAmountList?.length > 0"
          key="currentAmountList" v-model="amountIndex" mb-15px
          :list="currentAmountList" class="tunnels"
        >
          <template #tab="{ item, active }">
            <div
              class="tunnel-item" :class="{ 'font-jl-font-bold color-color-primary-second': active }"
              w-146px h-60px leading-60px
              @click="chooseAmount(item.value)"
            >
              <span>{{ item.label }}</span>
            </div>
          </template>
        </personal-tabs>
        <template v-if="data.flags === 2">
          <div flex items-center>
            <label w-92px text-left>货币数量：</label>
            <el-input
              v-model="amount" style="width:325px" :placeholder="`单笔限额${min}-${max}USDT`"
              @input="inputHandler"
              @blur="handleBlurValidate"
            />
          </div>
          <div validate-error pl-92px>
            {{ numErrMsg }}
          </div>
        </template>
      </div>
    </div>
    <div relative class="field-item !pt-0px">
      <div personal-subtitle-horizontal w-92px>
        充值汇率：
      </div>
      <span color-black-primary>{{ rate }}</span>
      <div absolute left-500px style="top:-97px">
        <div class="instruction2-title">
          充值说明
        </div>
        <div class="instruction2" v-html="filterXSS(note ?? '')" />
      </div>
    </div>
    <div class="field-item">
      <div personal-subtitle-horizontal w-92px>
        充值金额：
      </div>
      <span color-color-error>{{ total }}</span>
    </div>
    <div class="field-item addr">
      <div personal-subtitle-horizontal w-92px>
        收款地址：
      </div>
      <span ref="addrRef">{{ addr }}</span>
      <button jl-plain-btn ml-25px w-60px h-24px @click="copy(addrRef!)">
        复制
      </button>
    </div>
    <div class="field-item qrcode-box">
      <div personal-subtitle-horizontal w-92px pt-10px>
        扫码支付：
      </div>
      <div class="box">
        <jl-cloud-image :src="qr_url" w-104px h-104px use-bg />
      </div>
    </div>

    <div class="submit-box">
      <jl-button lh-50px h-50px :disabled="disabled" :loading="loading" w-400px @click="run">
        立即充值
      </jl-button>
      <div class="tip-message">
        <span>充值如遇到任何问题，请联系<a online-service-link @click="appStore.openService">在线客服</a>。</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

.underline-digital {
  color: #333;
  .field-item {
    display: flex;
    padding-top: 20px;
    align-items: center;

    .title {
      width: 100px;
      padding-top: 0;
      padding-bottom: 0;
    }

    span {
      font-size: 13px;
      font-family: $jl-font;
      line-height: 20px;
      font-weight: 600 !important;
    }

    &.qrcode-box {
      align-items: start;

      .box {
        width: 120px;
        height: 120px;
        border: 1px solid $border-color;
        border-radius: 6px;
        display: flex;
        align-items: start;
        background-color: #fff;
        padding: 7px;
      }

      .qrcode {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }

    &.addr {
      span {
        font-size: 15px;
        color: $text-primary;
        font-family: $jl-font;
      }
    }

  }
}
</style>
