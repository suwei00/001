<template>
  <div class="cg-radio">
    <template v-if="type === 'tunnel'">
      <ul class="cg-radio-type1 cg-radio-grid">
        <li class="cg-radio-type1-item cg-radio-grid-item" :class="{ 'cg-radio-type1-active': modelValue === index }"
          v-for="item, index in list" :list="item.id" @click="handleChoose(index)">
          <slot :data="item" :index="index" />
        </li>
      </ul>
    </template>
    <template v-else-if="type === 'payType'">
      <ul class="cg-radio-type2 cg-radio-grid">
        <li class="cg-radio-type2-item cg-radio-grid-item" :class="{ 'cg-radio-type2-active': modelValue === index }"
          v-for="item, index in list" :list="item.id" @click="handleChoose(index)">
          <slot :data="item" :index="index" />
        </li>
      </ul>
    </template>
    <template v-else-if="type === 'money'">
      <ul class="cg-radio-type4 cg-radio-grid">
        <li class="cg-radio-type4-item cg-radio-grid-item" :class="{ 'cg-radio-type4-active': modelValue === index }"
          v-for="item, index in list" :list="item.id" @click="handleChoose(index)">
          <slot :data="item" :index="index" />
        </li>
      </ul>
    </template>
    <template v-else-if="type === 'bank'">
      <ul class="cg-radio-type3">
        <li class="cg-radio-type3-item" :class="{ 'cg-radio-type3-active': modelValue === index }"
          v-for="item, index in list" :list="item.id" @click="handleChoose(index)">
          <slot :data="item" :index="index" />
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup lang='ts'>
/* 
cg-radio-type1:tunnel
cg-radio-type2:payType
cg-radio-type3:bank
cg-radio-type4:money
*/

interface Props {
  modelValue: number | null
  list: Array<any>
  type: 'tunnel' | 'payType' | 'bank' | 'money',// 渠道、支付方式、取款银行、快捷金额
}
const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue', 'onChoose'])

const handleChoose = (index: number) => {
  emit('update:modelValue', index)
  emit('onChoose', { index, item: props.list[index] })
}
</script>

<style lang='scss' scoped>
.cg-radio {
  font-size: var(--cg-font-26);
  color: var(--cg-color-black1);
}

.cg-radio-grid {
  display: grid;
  grid-template-rows: auto;
}

.cg-radio-grid-item {
  width: auto;
  border-radius: var(--cg-border-radius);
  background-size: 100% 100%;
  font: var(--cg-font-text2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.cg-radio-type1 {
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
}

.cg-radio-type1-item {
  height: 80px;
  @include webp($base-img-dir + '/finance/type1.png');
}

.cg-radio-type1-active {
  @include webp($base-img-dir + '/finance/type1_active.png');
  background-size: 100% 100%;
  color: var(--cg-color-blue1);
  font: var(--cg-font-text7);
  box-shadow: 0px 12px 24px var(--cg-color-blue9);
}

.cg-radio-type2 {
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}

.cg-radio-type2-item {
  height: 120px;
  @include webp($base-img-dir + '/finance/type2.png');
}

.cg-radio-type2-active {
  @include webp($base-img-dir + '/finance/type2_active.png');
  background-size: 100% 100%;
  color: var(--cg-color-blue1);
  font: var(--cg-font-text7);
  box-shadow: 0px 12px 24px var(--cg-color-blue9);
}

.cg-radio-type4 {
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}

.cg-radio-type4-item {
  height: 80px;
  @include webp($base-img-dir + '/finance/type4.png');
}

.cg-radio-type4-active {
  @include webp($base-img-dir + '/finance/type4_active.png');
  background-size: 100% 100%;
  // color: var(--cg-color-blue1);
  // font: var(--cg-font-text7);
  box-shadow: 0px 12px 24px var(--cg-color-blue9);
}

.cg-radio-type3 {
  width: 646px;
  display: flex;
  flex-direction: column;

  .cg-radio-type3-item {
    @include webp($base-img-dir + '/finance/type3.png');
    width: 646px;
    height: 80px;
    background-size: 100% 100%;
    font: var(--cg-font-text3);
    margin-bottom: 20px;
    border-radius: var(--cg-border-radius-input);
    padding: 2px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .cg-radio-type3-active {
    @include webp($base-img-dir + '/finance/type3_active.png');
  }
}
</style>