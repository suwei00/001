<script setup lang='ts' name="offline-digital">
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

// const { data: qrcodeInfo } = $(useRequest(() => getDigitalQrCode(data.id)))
const appStore = useAppStore()
const min = $computed(() => data?.min ?? 0)
const max = $computed(() => data?.max ?? 0)
const note = $computed(() => data?.note)
const rate = $computed(() => data?.rate)
const id = $computed(() => data?.id)
const flags = $computed(() => data ? data?.flags : 0)

// const currency_id = $computed(() => qrcodeInfo?.id)
// 当前选中的快捷金额index
let amountIndex = $ref(-1)
const currentAmountList = $computed(() => {
  if (!data)
    return []
  return data.amount_list === '' ? [] : data.amount_list.split(',').map(item => ({ label: item, value: item }))
})

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

// 充值金额
const total = $computed(() => {
  if (!amount || !rate)
    return '0'
  return toFloat(`${Number(amount) * Number(rate)}`)
})
// 禁用充值按钮
const disabled = $computed(() => {
  return !(+amount) || !!numErrMsg
})
// 充值
const { run, loading } = useRequest(() => financePay({ amount, id, rate }), {
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
  <div class="offline-digital">
    <div class="validate-wrapper">
      <!-- 充值金额 -->
      <div flex flex-col items-start mt-20px>
        <h5 v-if="currentAmountList?.length > 0" mb-15px>
          {{ flags === 2 ? '固定金额' : '货币数量' }}
        </h5>
        <personal-tabs
          v-if="currentAmountList?.length > 0" key="currentAmountList" v-model="amountIndex" mb-15px
          :list="currentAmountList" class="tunnels"
        >
          <template #tab="{ item, active }">
            <div
              class="tunnel-item" :class="{ 'font-jl-font-bold color-color-primary-second': active }" w-146px h-60px
              leading-60px @click="chooseAmount(item.value)"
            >
              <span>{{ item.label }}</span>
            </div>
          </template>
        </personal-tabs>
        <template v-if="flags === 2">
          <div flex items-center>
            <label w-92px text-left>货币数量：</label>
            <el-input
              v-model="amount" style="width:325px" :placeholder="`单笔限额${min}-${max}USDT`"
              @input="inputHandler" @blur="handleBlurValidate"
            />
          </div>
          <div validate-error pl-92px>
            {{ numErrMsg }}
          </div>
        </template>
      </div>
    </div>
    <div class="field-item !pt-0px">
      <div personal-subtitle-horizontal w-92px>
        充值汇率：
      </div>
      <span color-black-primary>{{ toFloat(rate ?? 0) }}</span>
    </div>
    <div class="field-item">
      <div personal-subtitle-horizontal w-92px>
        充值金额：
      </div>
      <span color-color-error>{{ total }}</span>
    </div>
    <div class="submit-box">
      <jl-button lh-50px h-50px :disabled="disabled" :loading="loading" w-400px @click="run">
        立即充值
      </jl-button>
      <div class="tip-message">
        <span>充值如遇到任何问题，请联系<a online-service-link @click="appStore.openService">在线客服</a>。</span>
      </div>
    </div>
    <div personal-subtitle>
      充值说明
    </div>
    <div class="instruction" v-html="filterXSS(note ?? '')" />
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

.offline-digital {
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
      font-weight: 600 !important;
      line-height: 20px;
    }

  }
}
</style>
