<script setup lang="ts">
interface CGInputProps {
  modelValue?: string
  maxlength?: string | number
  type?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  search?: boolean
}

withDefaults(defineProps<CGInputProps>(), {
  type: 'text'
})

const isFocus = ref(false)
const textareaRef = ref()
const emits = defineEmits(['update:modelValue', 'input', 'blur', 'focus', 'clear'])

const changeInput = (e: any) => {
  emits('update:modelValue', e.target?.value)
  emits('input', e.target?.value)
  if (textareaRef.value) {
    autoResize()
  }
}

const clearValue = () => {
  emits('update:modelValue', '')
  emits('clear')
  if (textareaRef.value) {
    autoResize()
  }
}

const onBlur = (e: any) => {
  setTimeout(() => {
    isFocus.value = false
  }, 50)
  emits('blur', e)
}

const onFocus = (e: any) => {
  isFocus.value = true
  emits('focus', e)
}

const autoResize = () => {
  textareaRef.value.style.height = 'auto' // 先将高度设置为 auto
  textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px' // 再将高度设置为内容的高度
}
</script>

<template>
  <div class="cg_input" :class="{ input_search: search }">
    <cg-icon v-if="search" name="icon_search" :width="35" class="search" />
    <slot name="left" />
    <input
      v-if="type !== 'textarea'"
      class="content"
      :type="type"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      :readonly="readonly"
      @input="changeInput"
      @blur="onBlur"
      @focus="onFocus"
    />
    <div class="area" v-else>
      <textarea
        ref="textareaRef"
        :type="type"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        :readonly="readonly"
        @input="changeInput"
        @blur="onBlur"
        @focus="onFocus"
      />
      <span class="limit font_24">{{ `${modelValue?.length || 0}/${maxlength}` }}</span>
    </div>
    <slot name="right" />
    <cg-icon
      @click="clearValue"
      v-if="clearable && modelValue && isFocus"
      name="avatar_del"
      class="clear"
    />
  </div>
</template>

<style lang="scss" scoped>
.cg_input {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--cg-color-text-3);
  font: var(--cg-font-6);
  padding: 36px 32px;

  .content {
    flex: 1;
    background-color: transparent;
  }

  .area {
    flex: 1;
    position: relative;
    width: 100%;
    height: auto;
    textarea {
      padding: 0;
      width: 100%;
      resize: none;
      height: auto;
      min-height: 88px;
      background-color: transparent;
      border: none;
      &:focus-visible {
        outline: none;
      }
    }

    .limit {
      position: absolute;
      bottom: -20px;
      right: 0px;
      color: var(--cg-color-text-4);
    }
  }

  .clear {
    margin-left: 12px;
  }
  .search {
    margin-right: 12px;
  }
}

.input_head_type {
  background-color: var(--cg-color-bg-white);
  border-radius: 8px;
  height: 56px;
  padding: 10px 16px;
}
.input_dialog_type {
  font: var(--cg-font-7);
  height: 88px;
  border: 2px solid var(--cg-color-border-1);
  padding: 10px 16px;
}

.input_default_type {
  height: 112px;
}

.input_count_type {
  background-color: var(--cg-color-bg-8);
}

.input_search {
  height: 72px;
  background-color: var(--cg-color-bg-8);
  border: none;
  padding: 18px 24px;
  border-radius: 8px;
}
</style>
