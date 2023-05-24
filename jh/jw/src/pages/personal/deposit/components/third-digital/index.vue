<script setup lang='ts' name="third-digital">
// 数字货币充值- 离线模式数字币
import type { F } from 'ts-toolbelt'
import type { ArrElement } from '~/api/type'
type itemProps = ArrElement<Awaited<F.Return<typeof getChannels>>>
interface Props {
  data: itemProps
}
const { data } = defineProps<Props>()
const appStore = useAppStore()
const min = $computed(() => data?.min)
const max = $computed(() => data?.max)
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

// 充值数量
const { errorMessage: numErrMsg, value: num, setValue, setErrors } = $(useField<string>('num', (value) => {
  if (!value || !value.trim())
    return '充值金额不能为空'
  if (!positiveNumberRegx.test(value))
    return '金额格式不对'
  if (+value < min || +value > max)
    return `充值金额必须在${min}-${max}之间`
  return true
}))
const chooseAmount = (m: string | number) => {
  setValue(m.toString())
}
// 手动输入与固定金额联动
const inputHandler = (amount: string) => {
  setValue(amount.replace(/^0|[^0-9]/g, ''))
  amountIndex = currentAmountList.findIndex(c => c.value === amount)
}

// 失焦之后验证,清空错误信息
const handleBlurValidate = () => {
  if (!num)
    setErrors('')
}

// const amount = $computed(() => {
//   if (!num || !rate)
//     return '0'
//   return `${Number(num) * Number(rate)}`
// })
// 禁用充值按钮
const disabled = $computed(() => {
  return !(+num) || !!numErrMsg
})
const { run, loading } = useRequest(() => financePay({ amount: num, id, rate }), {
  manual: true,
  debounceInterval: 300,
  loadingKeep: 1000,
  onSuccess: (url) => {
    openLink(url)
  },
})
// 切换第三方时清零已输入的金额
watch($$(id), () => {
  amountIndex = -1
  setValue('')
  const t = setTimeout(() => {
    setErrors('')
    clearTimeout(t)
  }, 0)
})
</script>

<template>
  <div class="third-digital">
    <div class="validate-wrapper">
      <!-- 充值金额 -->
      <div flex flex-col items-start mt-20px>
        <h5 mb-15px>
          充值金额
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
              <span>¥{{ item.label }}</span>
            </div>
          </template>
        </personal-tabs>
        <template v-if="data.flags === 2">
          <div flex items-center>
            <el-input
              v-model="num" style="width:320px" :placeholder="`请输入${min}-${max}`"
              @input="inputHandler" @blur="handleBlurValidate"
            >
              <template #suffix>
                <span style="color:#333">元</span>
              </template>
            </el-input>
            <!-- <p h-42px pl-16px flex items-center>
              <i class="i-common-tip" />
              <span pl-7px style="color:#94A6B7FF;font-zize:15px;">建议您存入带尾数的金额（例101、503），以便充值后能更快匹配到账。</span>
            </p> -->
          </div>
          <div validate-error>
            {{ numErrMsg }}
          </div>
        </template>
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
    <div personal-subtitle>
      充值说明
    </div>
    <div class="instruction" v-html="filterXSS(note ?? '')" />
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

.third-digital {
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
      font-weight: bold;
      line-height: 20px;
    }

    &.qrcode-box {
      align-items: start;

      .qrcode {
        width: 120px;
        height: 120px;
        border: 1px solid $border-color;
        border-radius: 6px;
        padding: 7px;
      }
    }

  }
}
</style>
