<script setup lang="ts">
import { CgIcon } from '@/components/cg-template-2';
import { ref, useAttrs } from 'vue';
const { modelModifiers, split, limit, limitType, maxlength = 100000, clear = false }: any = useAttrs();
const _attrs: any = useAttrs();
const isValidate = ref(false);
const isPaw = ref(_attrs.type === 'password');
const type = ref(_attrs.type);
const isFocus = ref(false);

const inputRef = ref();

const validate = (val?: string) => {
  if (!_attrs.pattern || _attrs.disabled) {
    isValidate.value = false;
    return true;
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

const setType = () => {
  type.value = type.value === 'password' ? 'text' : 'password';
};

const toLowercase = (val: string) => {
  if (modelModifiers?.lowercase) {
    return val.toLocaleLowerCase();
  } else if (modelModifiers?.uppercase) {
    return val.toLocaleUpperCase();
  }
  return val;
};

const timeoutTime = 5;

const setSplit = (val: string) => {
  const inputElement = inputRef.value.$refs.input;
  let selectionStart = inputElement.selectionStart;
  let selectionEnd = inputElement.selectionEnd;
  let _val;
  if (val.length > 6) {
    _val = val.replace(/(\S{3})(\S{0,3})(\S{0,3})/, '$1 $2 $3');
  } else {
    _val = val.replace(/(\S{3})(\S+)/, '$1 $2');
  }
  const isAdd = _attrs.modelValue.length < _val.length;
  if ((selectionStart === 4 || selectionStart === 8) && isAdd) {
    selectionStart = selectionStart + 1;
    selectionEnd = selectionEnd + 1;
  }

  if ((Number(maxlength) === _val.length && !isAdd) || (selectionStart !== _val.length && !isAdd)) {
    selectionStart = selectionStart - 1;
    selectionEnd = selectionEnd - 1;
  }

  setTimeout(() => {
    inputElement.selectionStart = selectionStart;
    inputElement.selectionEnd = selectionEnd;
  }, timeoutTime);

  return _val;
};

const deleteSpace = (val: string) => {
  const inputElement = inputRef.value.$refs.input;
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
  if (!limit) return val;
  const inputElement = inputRef.value.$refs.input;
  let selectionStart = inputElement.selectionStart;
  let selectionEnd = inputElement.selectionEnd;
  const isAdd = _attrs.modelValue.length < val.length;
  if (limit.test(val) || (Number(maxlength) === val.length && !isAdd)) {
    selectionStart = selectionStart - 1;
    selectionEnd = selectionEnd - 1;
  }
  const _val = val.replace(limit, '');
  setTimeout(() => {
    inputElement.selectionStart = selectionStart;
    inputElement.selectionEnd = selectionEnd;
  }, timeoutTime);

  return _val;
};

const setFrontTrim = (val: string) => {
  let _val = val;
  if (/^\s/.test(_val)) {
    _val = _val.replace(/^\s/, '');
  }
  return _val;
};

const setInpt = (_emit: any, val: string) => {
  let _val = val.length !== _attrs.modelValue.length || _attrs.modelValue.length < maxlength ? val : _attrs.modelValue;
  _val = toLowercase(_val);

  _val = deleteLimit(setFrontTrim(_val));
  if (limitType === 'name') {
    _val = deleteSpace(_val);
  }
  if (split) {
    _val = setSplit(_val);
  }
  _emit('input', _val);
  _emit('update:modelValue', _val);
  validate(_val);
};

const onBlur = (_emit: any, e: any) => {
  setTimeout(() => {
    isFocus.value = false;
  }, 300);
  _emit('blur', e);
};

const clearVal = (_emit: any) => {
  _emit('update:modelValue', '');
  isFocus.value = false;
};

defineExpose({ validate, setValidate });
</script>

<template>
  <div class="w_full">
    <div :class="{ suffix_in: $attrs.suffixIn }">
      <el-input
        ref="inputRef"
        v-bind="$attrs"
        :type="type"
        @focus="
          val => {
            isFocus = true;
            $emit('focus', val);
          }
        "
        @blur="e => onBlur($emit, e)"
        @input="val => setInpt($emit, val)"
        :class="{ error: isValidate }"
      >
        <template #suffix v-if="isPaw && $attrs.modelValue">
          <div class="row">
            <div class="pointer paw" v-if="clear && $attrs.modelValue && isFocus" @click="clearVal($emit)">
              <cg-icon width="16" name="i_input_close" />
            </div>
            <div class="pointer paw paw_r">
              <cg-icon width="19" :name="type === 'password' ? 'i_eyeclose' : 'i_eyeopen'" @click="setType" />
            </div>
          </div>
        </template>
        <template #suffix v-else-if="clear && $attrs.modelValue && isFocus">
          <div class="pointer paw paw_r" @click="clearVal($emit)">
            <cg-icon width="16" name="i_input_close" />
          </div>
        </template>
        <template v-for="(item, key, index) in $slots" :key="index" v-slot:[key]>
          <slot :name="key"></slot>
        </template>
      </el-input>
    </div>

    <div v-if="isValidate" class="message">{{ $attrs.message }}</div>
  </div>
</template>

<style lang="scss" scoped>
.message {
  font: var(--cg-font-text6);
  color: var(--cg-color-red);
  margin-top: 10px;
}
:deep(.el-input__inner) {
  &::placeholder {
    color: var(--cg-color-grey5);
  }

  &::-webkit-input-placeholder {
    /* WebKit browsers 适配谷歌 */
    color: var(--cg-color-grey5);
  }

  &:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 适配火狐 */
    color: var(--cg-color-grey5);
  }

  &::-moz-placeholder {
    /* Mozilla Firefox 19+ 适配火狐 */
    color: var(--cg-color-grey5);
  }

  &:-ms-input-placeholder {
    /* Internet Explorer 10+  适配ie*/
    color: var(--cg-color-grey5);
  }
}
:deep(.el-input__inner) {
  color: var(--cg-color-grey1);
  font: var(--cg-font-text);
}

:deep(.is-disabled) {
  .el-input__inner {
    color: var(--cg-color-grey1) !important;
    font: var(--cg-font-text);
  }
}

.error {
  :deep(.el-input__inner) {
    border-color: var(--cg-color-red);
  }
}

.paw {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
}

.paw_r {
  margin-right: 4px;
}

.row {
  display: flex;
  height: 100%;
  justify-content: flex-end;
  width: 56px;
}

.suffix_in {
  :deep(.el-input__inner) {
    padding-left: 70px !important;
  }
}
</style>
