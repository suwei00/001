<script setup lang='ts' name="money-input">
type elInputProps = Omit<InstanceType<typeof import('element-plus/es')['ElInput']>['$props'], 'modelValue'>
interface Props extends elInputProps {
  modelValue: string
  max: number | string
  [key: string]: any
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'blur'): void
  (e: 'update:modelValue', value: string): void
}>()
let value = $ref('')
let data = $(useVModel(props, 'modelValue', emit))
// 设置最大金额
const handleMax = () => {
  value = `${toFloat(props.max)}`
}
watch($$(value), () => {
  data = value
})

const clearMoney = () => {
  value = ''
}
const onBlur = () => {
  emit('blur')
}

defineExpose({ clearMoney })
</script>

<template>
  <div class="money-input">
    <el-input
      v-model="value" :maxlength="props.maxlength" style="width:400px;" placeholder="请输入转账金额"
      @input="value = toFixAmount(value)"
      @blur="onBlur"
    >
      <template #suffix>
        <span text-15px font-jl-font color-color-primary-second cursor-pointer @click="handleMax">全部金额
        </span>
      </template>
    </el-input>
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

.money-input {
  text-align: left;

  .el-input {
    :deep(.el-input__wrapper) {
      border-color: #C5C5C5;
      border-radius: 6px;

      .el-input__inner {
        height: 40px;
        line-height: 42px;
      }

      ::-webkit-input-placeholder {
        font-size: 15px;
      }

      :-moz-placeholder {
        /* Firefox 18- */
        font-size: 15px;
      }

      ::-moz-placeholder {
        /* Firefox 19+ */
        font-size: 15px;
      }

      :-ms-input-placeholder {
        font-size: 15px;
      }
    }
  }
}
</style>
