<script setup lang='ts' name="common-tunnel">
import type { F } from 'ts-toolbelt'
import type { ArrElement } from '~/api/type'
type itemProps = ArrElement<Awaited<F.Return<typeof getChannels>>>
const { data: currentChannel } = defineProps<{ data: itemProps }>()
const appStore = useAppStore()
// 当前选中的快捷金额index
let amountIndex = $ref(-1)
// 当前通道id
const currentChannelId = $computed(() => currentChannel?.id)
// 后台开启自定义金额 1关闭 2开启
const isCustomMoneyOn = $computed(() => currentChannel?.flags === 2)
// 快捷金额列表
const currentAmountList = $computed(() => {
  if (!currentChannel?.amount_list)
    return []
  return currentChannel.amount_list === '' ? [] : currentChannel.amount_list.split(',').map(item => ({ label: item, value: item }))
})
// 当前通道最大金额
const max = $computed(() => currentChannel?.max,
)
// 当前通道最小金额
const min = $computed(() => currentChannel?.min)
// 自定义金额
const { errorMessage: customMoneyErrMsg, value: customMoney, setErrors, setValue: setCustomMoney } = $(useField<string>('customMoney', (value) => {
  if (!value || !value.trim())
    return '充值金额不能为空'
  if (!positiveNumberRegx.test(value))
    return '金额格式不对'
  if (Number(value) < min! || Number(value) > max!)
    return `充值金额必须在${min}与${max}之间`
  return true
}))

// 手动输入与固定金额联动
const inputHandler = (amount: string) => {
  setCustomMoney(toFixAmount(amount))
  amountIndex = currentAmountList.findIndex(c => c.value === amount)
}

// 失焦之后验证,清空错误信息
const handleBlurValidate = () => {
  if (!customMoney)
    setErrors('')
}

// 充值金额
const amount = $computed(() => {
  // 有快捷金额列表并且选中了快捷金额，返回快捷金额
  if (currentAmountList.length && amountIndex !== -1)
    return currentAmountList[amountIndex]?.value
  return customMoney
})
// 点击快捷金额，更新自定义金额
watch($$(amount), (value) => {
  if (value)
    setCustomMoney(value)
})
// 禁用充值按钮
const disabled = $computed(() => {
  return !customMoney || !!customMoneyErrMsg
})
// 充值说明
const note = $computed(() => currentChannel?.note)

// 删除自定义金额
const handleDelMoney = () => {
  amountIndex = -1
}
const { run: runFinancePay, loading } = $(useRequest(() => financePay({
  amount,
  id: currentChannelId!,
}), {
  manual: true,
  debounceInterval: 300,
  loadingKeep: 1000,
  onSuccess: (link) => {
    openLink(link)
  },
}))
</script>

<template>
  <div class="common-tunnel">
    <div class="list-wrapper moneys">
      <div personal-subtitle>
        充值金额
      </div>
      <personal-tabs
        v-if="currentAmountList?.length > 0" key="currentAmountList" v-model="amountIndex"
        :list="currentAmountList" class="tunnels"
      >
        <template #tab="{ item, active }">
          <div
            class="tunnel-item" :class="{ 'font-jl-font-bold color-color-primary-second': active }" w-146px
            h-60px lh-60px
          >
            <span>￥{{ item.label }}</span>
          </div>
        </template>
      </personal-tabs>
      <div v-if="isCustomMoneyOn" class="input-wrapper">
        <div class="custom">
          <el-input
            v-model="customMoney" style="width:400px" class="custom-input" :placeholder="`请输入${min}-${max}`"
            @keyup.delete="handleDelMoney"
            @input="inputHandler" @blur="handleBlurValidate"
          >
            <template #suffix>
              元
            </template>
          </el-input>
          <p class="tip-message">
            <i class="i-common-tip" />
            <span>建议您存入带尾数的金额（例101、503），以便存款后能更快匹配到账。</span>
          </p>
        </div>
        <div validate-error pl-2px pb10px>
          {{ customMoneyErrMsg }}
        </div>
      </div>
    </div>
    <div class="submit-box" :class="{ 'mt-20px': !isCustomMoneyOn }">
      <jl-button lh-50px h-50px :disabled="disabled" :loading="loading" w-400px @click="runFinancePay">
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
.common-tunnel {
  .list-wrapper {
    .tunnels {
      .tunnel-item {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    &.moneys {

      .input-wrapper {
        padding-top: 18px;

        .custom {
          display: flex;
          align-items: center;

          .custom-input {
            :deep(.el-input__wrapper) {
              border-color: #C5C5C5;
              border-radius: 6px;

              .el-input__inner {
                height: 42px;
                line-height: 42px;
                font-size: 15px;
                color: $color-black-primary;
                padding-left: 5px;

                &::-webkit-input-placeholder {
                  color: $text-info;
                  font-family: $jl-font;
                  font-size: 15px;
                }
              }

              .el-input__suffix-inner {
                font-size: 15px;
                color: $color-black-primary;
              }
            }
          }
        }

      }
    }
  }
}
</style>
