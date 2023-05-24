<script setup lang="ts">
import { SuffixInteger } from '@/utils/helpers';
import { computed } from 'vue';
import type CgAmount from './index';

interface Props extends CgAmount.Props {
  amount: string | number;
  size?: string | number;
  weight?: string | number;
  suffix?: string; // 后缀
  padding?: string | number;
  color?: string;
  precision?: number;
  segmentation?: boolean; // 千位符
  isClick?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  amount: 0,
  size: 15,
  weight: 400,
  suffix: '',
  padding: 0,
  color: '',
  precision: 0,
  segmentation: false,
  isClick: false
});

const emit = defineEmits(['callBack']);

const colorClass = computed(() => {
  const amount = Number(props.amount);
  if (amount > 0) {
    return 'amount_blue';
  } else if (amount === 0) {
    return 'amount_grey';
  } else {
    return 'amount_red';
  }
});

const numFormat = (num: number | string) => {
  var res = num.toString().replace(/\d+/, function (n) {
    return n.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  });
  return res;
};

const setShowAmount = (amount: string | number) => {
  if (Number(amount) === 0) {
    return 0;
  }
  let _amount: string | number = '0';
  if (props.precision === 0) {
    _amount = parseInt(amount.toString());
  } else {
    const _list = amount.toString().split('.');
    _list[1] = _list[1] ? SuffixInteger(_list[1], 10) : '0000000000000000000';
    _amount = `${_list[0]}.${_list[1].slice(0, props.precision)}`;
  }
  _amount = Number(_amount);
  if (props.segmentation) {
    _amount = numFormat(_amount);
  }
  return _amount.toString();
};

const callBack = () => {
  if (props.isClick) {
    emit('callBack');
  }
};
</script>

<template>
  <div class="cg_amount">
    <div :class="(colorClass, { underline: isClick })" @click="callBack" :style="`font-size: ${size}px;font-weight:${weight};${color ? `color:var(--cg-color-${color})` : ''}`">
      <span :style="`padding-right:${padding}px`">{{ setShowAmount(amount) }}</span>
      <span v-if="Number(setShowAmount(amount)) != 0">{{ suffix }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cg_amount {
  .amount_blue {
    color: var(--cg-color-blue1);
  }

  .amount_grey {
    color: var(--cg-color-grey1);
  }

  .amount_red {
    color: var(--cg-color-red);
  }
}
</style>
