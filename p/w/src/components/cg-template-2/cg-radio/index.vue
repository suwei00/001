<template>
  <div :class="['cg-radio']">
    <template v-if="type === 'exam'">
      <ul>
        <li v-for="(radio, index) in list" @click="handleChoose(index)" :key="radio.value" class="cg-radio-item">
          <cg-icon :name="modelValue === index ? 'i_radio_a' : 'i_radio'" class='i_r' :width="15" :height="15" />
          <slot :data="radio" :index="index" />
        </li>
      </ul>
    </template>
    <!--  充值类型  -->
    <template v-else-if="type === 'payType'">
      <ul class="payType grid-ul">
        <li v-for="(radio, index) in list" @click="handleChoose(index)" :key="radio.value" class="payType-item"
          :class="{ active_payType: modelValue === index }">
          <slot :data="radio" />
        </li>
      </ul>
    </template>
    <!--  充值渠道  -->
    <template v-else-if="type === 'tunnel'">
      <ul class="tunnel grid-ul">
        <li v-for="(radio, index) in list" @click="handleChoose(index)" :key="radio.value" class="tunnel-item"
          :class="{ active_tunnel: modelValue === index }">
          <slot :data="radio" :index="index" />
        </li>
      </ul>
    </template>
    <!--  充值渠道-offline  -->
    <template v-else-if="type === 'offline'">
      <ul class="offline grid-ul">
        <li v-for="(radio, index) in list" @click="handleChoose(index)" :key="radio.value"
          class="tunnel-item offline-item" :class="{ active_offline: modelValue === index }">
          <slot :data="radio" :index="index" />
        </li>
      </ul>
    </template>
    <!-- 充值教程 -->
    <template v-else-if="type === 'tutorial'">
      <ul class="grid-ul tutorial">
        <li v-for="(radio, index) in list" @click="handleChoose(index)" :key="radio.value" class="tutorial-item"
          :class="{ active_tutorial: modelValue === index }">
          <div class="cg-radios-TnTO">
            <slot :data="radio" />
          </div>
        </li>
      </ul>
    </template>
    <!-- 充值教程 -->
    <template v-else-if="type === 'money'">
      <ul class="grid-ul money">
        <li v-for="(radio, index) in list" @click="handleChoose(index)" :key="radio.value" class="tutorial-item"
          :class="{ active_tutorial: modelValue === index }">
          <div class="cg-radios-TnTO">
            <slot :data="radio" />
          </div>
        </li>
      </ul>
    </template>
    <!--  银行卡  -->
    <template v-else-if="type === 'bank'">
      <ul class="cg-radios-I-ul">
        <li v-for="(radio, index) in list" @click="radio.error ? '' : handleChoose(index)" :key="radio.value"
          class="bank-item" :class="{ active_bank: modelValue === index }" :style="list.length === 1 ? 'margin:0' : ''">
          <slot :data="radio" :index="index" />
        </li>
      </ul>
    </template>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'CgRadio'
}
</script>

<script setup lang='ts'>
import { CgIcon } from '@cg-template-2-components/index';

interface Props {
  modelValue: number | null
  list: Array<any>
  type: 'exam' | 'payType' | 'tunnel' | 'offline' | 'bank' | 'tutorial' | 'money',// 答题、支付方式、通道、银行卡、充值教程、快捷金额
}
const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue', 'onChoose'])

const handleChoose = (index: number) => {
  emit('update:modelValue', index)
  emit('onChoose', index)
}
</script>

<style lang='scss' scoped>
.cg-radio {
  font-size: var(--cg-font-text);
  color: var(--cg-color-grey1);

  .cg-radio-item {
    display: flex;
    align-items: center;
    width: 720px;
    padding: 10px 55px;
    border-radius: var(--cg-border-input-radius);
    cursor: pointer;

    .i_r {
      margin-right: 10px;
      flex-shrink: 0;
    }
  }

  .cg-radio-item:nth-child(2n + 1) {
    background: var(--cg-color-white5);
  }
}

.grid-ul {
  display: grid;
  grid-template-rows: auto;
  grid-gap: 8px;
}

.payType {
  grid-template-columns: repeat(6, 1fr);
}

.tunnel {
  grid-template-columns: repeat(4, 1fr);
}

.offline {
  grid-template-columns: repeat(4, 1fr);
}

.tutorial {
  grid-template-columns: repeat(5, 1fr);
}

.money {
  grid-template-columns: repeat(6, 1fr);
}

.payType-item,
.tunnel-item,
.tutorial-item,
.bank-item {
  width: 140px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(link($base-img-dir + '/radios/textRadio.png'));
  background-size: 100% 100%;
  cursor: pointer;
  border-radius: var(--cg-border-button-radius);
}

.payType-item {
  &:hover {
    background-image: url(link($base-img-dir + '/radios/paytype-hover.png'));
    box-shadow: var(--cg-box-shadow-containter);
  }
}

.tunnel-item {
  width: 214px;
  height: 60px;
  background-image: url(link($base-img-dir + '/radios/imgRadio.png'));

  &:hover {
    background-image: url(link($base-img-dir + '/radios/tunnel-hover.png'));
    box-shadow: var(--cg-box-shadow-containter);
  }
}

.offline-item {
  height: 86px;

  &:hover {
    background-image: url(link($base-img-dir + '/radios/offline-hover.png'));
    box-shadow: var(--cg-box-shadow-containter);
  }
}

.tutorial-item {
  width: 140px;
  height: 60px;
  background-image: url(link($base-img-dir + '/radios/imgRO.png'));

  &:hover {
    background-image: url(link($base-img-dir + '/radios/tutorial-hover.png'));
    box-shadow: var(--cg-box-shadow-containter);
  }
}

.cg-radios-TnTO {
  display: flex;
  align-items: center;
}

.cg-radios-I-ul {
  width: auto;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
}

.bank-item {
  width: 100%;
  height: 68px;
  margin: 0 0 6px 0;
  padding: 0 5px;
  background-image: url(link($base-img-dir + '/radios/imgR.png'));
}

.active_payType {
  background-image: url(link($base-img-dir + '/radios/textRadio_a.png'));
  color: var(--cg-color-blue12);
  box-shadow: var(--cg-box-shadow-containter);
  font-weight: 700;

  &:hover {
    background-image: url(link($base-img-dir + '/radios/textRadio_a.png'));
  }
}

.active_tunnel,
.active_offline {
  background-image: url(link($base-img-dir + '/radios/imgRadio_a.png'));
  color: var(--cg-color-blue1);
  box-shadow: var(--cg-box-shadow-containter);
  font-weight: 700;

  &:hover {
    background-image: url(link($base-img-dir + '/radios/imgRadio_a.png'));
  }
}

.active_offline {
  background-image: url(link($base-img-dir + '/radios/imgRadio_bank.png'));

  &:hover {
    background-image: url(link($base-img-dir + '/radios/imgRadio_bank.png'));
  }
}

.active_tutorial {
  background-image: url(link($base-img-dir + '/radios/imgRO_a.png'));
  color: var(--cg-color-blue1);
  box-shadow: var(--cg-box-shadow-containter);
  font-weight: 700;

  &:hover {
    background-image: url(link($base-img-dir + '/radios/imgRO_a.png'));
  }
}

.active_bank {
  background-image: url(link($base-img-dir + '/radios/imgR_a.png'));
  box-shadow: var(--cg-box-shadow-containter);

  &:hover {
    background-image: url(link($base-img-dir + '/radios/imgR_a.png'));
  }
}
</style>