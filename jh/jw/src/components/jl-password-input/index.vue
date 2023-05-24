<script lang="ts" setup name="jl-password-input">
// TODO: element-plus密码输入框自定义图标难修改，所以封装了一下
import closedImg from '~/assets/images/entry/closed.png?preset=full'
import openedImg from '~/assets/images/entry/opened.png?preset=full'

type elInputProps = Omit<InstanceType<typeof import('element-plus/es')['ElInput']>['$props'], 'modelValue' | 'type'>
interface Props extends elInputProps {
  modelValue: string
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
const data = useVModel(props, 'modelValue', emit)
const [passwordVisible, togglePassVisible] = useToggle(false)

// 获取焦点显示图标，失去焦点不显示图标
const inputRef = ref()
const isFocus = $ref(false)
const clickEye = () => {
  togglePassVisible()
  inputRef.value.focus()
}
</script>

<template>
  <el-input
    ref="inputRef"
    v-bind="props"
    v-model="data" name="eye" :type="passwordVisible ? 'text' : 'password'"
    @focus="isFocus = true"
    @blur="isFocus = false"
  >
    <template #suffix>
      <div id="eye" :style="{ opacity: isFocus ? 1 : 0, cursor: isFocus ? 'pointer' : '' }" p-y-13px p-x-8px @click="clickEye">
        <img
          :src="passwordVisible ? getSupportImage(openedImg) : getSupportImage(closedImg)"
          alt="eye" w-18px
        >
      </div>
    </template>
    <template v-for="[name, slot] in Object.entries($slots)" #[name] :key="name">
      <slot :name="name" v-bind="slot" />
    </template>
  </el-input>
</template>

<style lang="scss" scoped>
</style>
