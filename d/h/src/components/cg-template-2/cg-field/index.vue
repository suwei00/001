<script setup lang="ts">
import { CgIcon } from '@cg-template-2-components/index';
import { ref, useAttrs } from 'vue';

const {
  type,
  modelModifiers,
  maxlength,
  showK,
  split,
  limit = '',
  limitType,
  isMoney,
}: any = useAttrs();
const _attrs: any = useAttrs();
const isValidate = ref(false);
const _type = ref(type);
const isPasw = ref(type === 'password');
const _showK = ref(showK);
const isFocus = ref(false);
const vanFieldRef = ref();

const validate = (val?: string) => {
  if (!_attrs.pattern || _attrs.disabled){
    isValidate.value = false
    return true
  }
  let _val = val || _attrs.modelValue;
  if (split) {
    _val = _val.replace(/(\s)/g, '');
  }
  isValidate.value = !_attrs.pattern.test(_val);
  return !isValidate.value;
};

const setValidate = (state: boolean) => {
  isValidate.value = state;
};

const timeoutTime = 5;
const deleteSpace = (val: string) => {
  const inputElement = vanFieldRef.value.$el.querySelector('input');
  let selectionStart = inputElement.selectionStart;
  let selectionEnd = inputElement.selectionEnd;
  if (/ {2,}/g.test(val)) {
    selectionStart = selectionStart - 1;
    selectionEnd = selectionEnd - 1;
    setTimeout(() => {
      inputElement.selectionStart = selectionStart;
      inputElement.selectionEnd = selectionEnd;
    }, timeoutTime);
  }
  const _val = val.replace(/ {2,}/g, ' ');
  return _val;
};

const deleteLimit = (val: string) => {
  const inputElement = vanFieldRef.value.$el.querySelector('input');
  let selectionStart = inputElement.selectionStart;
  let selectionEnd = inputElement.selectionEnd;
  if (limit && limit.test(val) && Number(maxlength) !== val.length) {
    selectionStart = selectionStart - 1;
    selectionEnd = selectionEnd - 1;
    setTimeout(() => {
      inputElement.selectionStart = selectionStart;
      inputElement.selectionEnd = selectionEnd;
    }, timeoutTime);
  }
  const _val = val.replace(limit, '');
  return _val;
};

const setSplit = (val: string) => {
  const inputElement = vanFieldRef.value.$el.querySelector('input');
  let selectionStart = inputElement.selectionStart;
  let selectionEnd = inputElement.selectionEnd;
  let _val = val;
  if (/(\s)/g.test(val)) {
    _val = val.replace(/(\s)/g, '');
    setTimeout(() => {
      inputElement.selectionStart = selectionStart;
      inputElement.selectionEnd = selectionEnd;
    }, timeoutTime);
  }
  return _val;
};

const onInput = (e: any, _emit: any) => {
  let _val = e.target.value;

  if (isMoney) {
    if (limit) {
      _val = deleteLimit(_val);
    }
    _emit('update:modelValue',_val);
    validate(_val);
    return;
  }

  if (modelModifiers?.lowercase) {
    _val = _val.toLocaleLowerCase();
  } else if (modelModifiers?.uppercase) {
    _val = _val.toLocaleUpperCase();
  }

  if (split) {
    _val = setSplit(_val);
  }
  _val = deleteLimit(_val);
  if (limitType === 'name') {
    _val = deleteSpace(_val);
  }
  setTimeout(()=>{
    _emit('update:modelValue', _val);
  },1)
  validate(_val);
};

const onBlur = (_emit: any, e: any) => {
  setTimeout(() => {
    isFocus.value = false;
  }, 100);
  _emit('blur', e);
};

// 方法
const blur = () => {
  vanFieldRef.value.blur();
};

const formatter = (value: string) => {
  if (split) {
    return value.replace(/(\S{3})(\S+)$/g, '$1 $2');
  } else {
    return value;
  }
};

defineExpose({ validate, setValidate, blur });
</script>

<template>
  <div class="w_full" :class="{ error: isValidate, white: $attrs.white }">
    <div class="cg_field" :class="{ field_button: $attrs.rightText }">
      <div v-if="$slots.left" class="slot_left">
        <slot name="left" />
      </div>
      <van-field
        :formatter="formatter"
        @keypress.enter="blur"
        ref="vanFieldRef"
        :class="{ apple: _showK }"
        v-bind="$attrs"
        @input="(e:any) => onInput(e, $emit)"
        @focus="
          e => {
            isFocus = true;
            $emit('focus', e);
          }
        "
        @blur="e => onBlur($emit, e)"
        :type="_type"
        autocomplete="off"
      />
      <cg-icon
        v-if="$attrs.clear && $attrs.modelValue && isFocus"
        @click="$emit('update:modelValue', '')"
        :class="{ field_abs: _showK, field_close: !_showK }"
        name="i_input_close"
      />
      <cg-icon
        v-if="isPasw && $attrs.modelValue"
        @click="_type = _type === 'password' ? 'text' : 'password'"
        class="field_close"
        :name="_type === 'password' ? 'i_pasw_b' : 'i_pasw_z'"
      />
      <div class="field_but" v-if="$attrs.rightText" @click="$emit('butClick')">
        {{ $attrs.rightText }}
      </div>
      <div class="field_tx" v-if="$attrs.rightTet" @click="$emit('butClick')">
        {{ $attrs.rightTet }}
      </div>
      <slot name="right" />
      <div class="show-k" v-if="_showK && $attrs.modelValue">
        {{ $attrs.modelValue }}<span>K</span>
      </div>
    </div>
    <div v-if="isValidate" class="error_text">{{ $attrs.message }}</div>
  </div>
</template>

<style lang="scss" scoped>
.cg_field {
  position: relative;
  display: flex;
  align-items: center;
  font-size: var(--cg-font-26);
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  border: 2px solid var(--cg-color-blue11);
  border-radius: var(--cg-border-radius-input);
  // overflow: hidden;
  position: relative;

  .apple {
    position: absolute;
    left: 69px;
    z-index: 2;
    width: 89%;
  }

  .show-k {
    position: absolute;
    left: 69px;
    width: 89%;
    height: 80px;
    padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
    z-index: 1;
    color: var(--cg-color-white);
    display: flex;
    align-items: center;
    font: var(--cg-font-text2);

    span {
      color: var(--cg-color-black1);
    }
  }

  :deep(.van-field) {
    height: 100%;
    flex: 1;
    font-size: inherit;
    background: transparent;
  }

  :deep(.van-field__body) {
    height: 100%;
  }

  :deep(.van-field__control) {
    font: var(--cg-font-text2) !important;

    &::placeholder {
      color: var(--cg-color-gray);
    }

    &:disabled {
      color: var(--cg-color-black1);
      -webkit-text-fill-color: var(--cg-color-black1);
      -webkit-text-fill-color: var(--cg-color-black1);
    }
  }

  :deep(.van-field__control:read-only) {
    font: var(--cg-font-text2);
    color: var(--cg-color-black1);
  }

  .field_close {
    margin-left: 14px;
    margin-right: 20px;
    width: 40px;
  }

  .field_abs {
    width: 40px;
    position: absolute;
    right: 165px;
    z-index: 10;
  }

  .slot_left {
    height: 100%;
    padding-left: 18px;
    display: flex;
    align-items: center;
  }
}

.white {
  .cg_field {
    background-color: var(--cg-color-white);
  }
}

.field_button {
  background: var(--cg-gradient-input-blue);
  mix-blend-mode: normal;
  border: 1px solid var(--cg-color-blue11);
  box-shadow: 0px 3px 6px var(--cg-color-white), inset 0px 1.5px 3px var(--cg-color-blue11);
  border-radius: var(--cg-border-radius-input);

  .field_but {
    display: flex;
    align-items: center;
    height: 80px;
    color: var(--cg-color-white);
    font: var(--cg-font-text8);
    padding: 0 20px;
    background: var(--cg-gradient-input-blue-but);

    &:active {
      background: var(--cg-gradient-bluebtn-active);
    }
    border-top-right-radius: var(--cg-border-radius-input);
    border-bottom-right-radius: var(--cg-border-radius-input);
    position: relative;
    left: 2px;
  }
}

.error {
  .cg_field {
    border-color: var(--cg-color-red2);
  }
}

.error_text {
  margin-top: 10px;
}

.field_tx {
  position: absolute;
  right: 22px;
  width: 120px;
  text-align: center;
  color: var(--cg-color-blue1);
  z-index: 10;
}
</style>
