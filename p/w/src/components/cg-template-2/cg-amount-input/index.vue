<script setup lang="ts">
import { ref, watchEffect, onMounted, onBeforeUnmount } from 'vue';
import { CgIcon } from '@/components/cg-template-2'
import { toThousands, toTwoDecimalsCurrency } from '@/utils/format'

interface Props {
  modelValue: string | number
  defaultValue?: string
  maxLength?: number
  placeholder?: string
  numPattern?: RegExp
  precision?: number
  inputWidth?: string
  isRight?: boolean
  showMoney?: boolean
  maxAmount?: string
  limitMax?: boolean
  rate?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: '',
  maxLength: 12,
  placeholder: 'Vui lòng nhập số tiền chuyển',
  numPattern: () => /^\[1-9]+\.?\d{0,1}$/g,
  precision: 1,
  inputWidth: '480px',
  isRight: false,
  limitMax: true,
  rate: 0
})

const emit = defineEmits(['enter', 'change', 'input', 'blur', 'focus', 'update:modelValue', 'onRight', 'update:change'])

const amountNum = ref('');
const focused = ref(false);
const blured = ref(true);

const enter = () => {
  emit('enter');
};

const change = () => {

  amountNum.value = amountNum.value.replace(/^(\d+)(\.+)(\d*)(\..*)$/g, '$1\.$3');
  if (!props.precision) {
    amountNum.value = amountNum.value.replace(/^0(.*)/g, '$1').replace(/[^0-9]/g, '');
  } else {
    if (String(amountNum.value).indexOf('.') >= 2 || (String(amountNum.value).indexOf('.') === -1) && String(amountNum.value).length > 1) {
      amountNum.value = amountNum.value.replace(/^0(.*)/g, '$1');
    }
  }

  amountNum.value = amountNum.value.replace(/[^0-9]/g, '');
  if (new RegExp('^\\d+\\.?\\d{0,' + props.precision + '}$').test(amountNum.value) || !amountNum.value) {
    emit('update:modelValue', amountNum.value);
    emit('update:change', amountNum.value);
    emit('input', amountNum.value);
  }
  if (props.limitMax && props.maxAmount && parseFloat(amountNum.value) > parseFloat(props.maxAmount)) {
    amountNum.value = props.maxAmount
    emit('update:modelValue', amountNum.value);
  }
};

const focus = () => {
  emit('focus');
  focused.value = true;
  blured.value = false;
};

const blur = () => {
  emit('blur');
  blured.value = true;
  setTimeout(() => {
    focused.value = false;
  }, 300);
};

const onRight = () => {
  emit('onRight');
};

watchEffect(() => {
  amountNum.value = props.defaultValue;
});

watchEffect(() => {
  amountNum.value = `${props.modelValue}`;
});
</script>
<template>
  <div class="input-warp" :style="{ width: inputWidth }">
    <div class="input-before-icon">
      <cg-icon width="26" name="i_dollar" />
    </div>
    <div class="input-inside">
      <input type="text" pattern="[0-9]*" :maxLength="maxLength" v-model="amountNum" @keyup.enter="enter"
        @input="change" @focus="focus" @blur="blur" :placeholder="placeholder" />
      <div class="hide-input" v-show="amountNum.length">
        {{ amountNum }}<span>K</span>
      </div>
      <div class="input-before-btn-warp" v-if="!amountNum && focused && isRight">
        <button @click="onRight()">TOÀN BỘ SỐ TIỀN</button>
      </div>
      <div class="show-money" v-if="showMoney && amountNum">
        <template v-if="rate">
          ={{ toTwoDecimalsCurrency((+amountNum) * 1000 / (+props.rate)) }}U
        </template>
        <template v-else>
          ={{ toThousands(amountNum+ '000') }}đ
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-warp {
  height: 44px;
  width: 480px;
  position: relative;
  border-radius: var(--cg-border-input-radius);
  background: var(--cg-color-white);

  .input-before-icon {
    width: 26px;
    height: 26px;
    position: absolute;
    left: 9px;
    top: 10px;
  }

  .input-inside {
    width: 100%;
    height: 100%;
    position: relative;

    input {
      position: absolute;
      left: 0;
      top: 0;
      background: transparent;
      z-index: 2;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      font-size: var(--cg-font-18);
      font-weight: 400;
      padding: 5px 15px 5px 43px;
      border: 1px solid var(--cg-color-blue8);
      color: var(--cg-color-grey1);
      border-radius: var(--cg-border-input-radius);

      &::placeholder {
        color: var(--cg-color-grey5);
      }
    }

    .hide-input {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      font-size: var(--cg-font-18);
      font-weight: 400;
      color: var(--cg-color-white);
      padding: 5px 15px 5px 43px;

      span {
        color: var(--cg-color-grey1);
      }
    }

    .input-before-btn-warp {
      height: 100%;
      margin-left: 5px;
      position: absolute;
      right: 15px;
      top: 0;
      z-index: 3;

      button {
        height: 100%;
        background: transparent;
        color: var(--cg-color-blue12);
        text-transform: uppercase;
        font-size: var(--cg-font-18);
        cursor: pointer;
      }
    }

    .show-money {
      position: absolute;
      right: 9px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
