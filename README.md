# 001

<template>
  <ul class="cg-big-number">
    <template v-for="(n, idx) in moneyArr" :key="idx">
      <!-- 这里 key 不用 idx 会有问题 -->
      <li v-if="!isNaN(parseInt(n))">
        <div class="num-wrap">
          <div class="cg-num-box" :style="`height: var(--cg-px-${props.numHeight})`">
            <ul :style="{ top: -props.numHeight * Number(n) + 'px' }">
              <li v-for="i in 10" :key="i" :style="`height: var(--cg-px-${props.numHeight})`">
                <div class="txt" :style="`line-height: var(--cg-px-${props.numHeight})`">{{ i - 1 }}</div>
              </li>
            </ul>
          </div>
        </div>
      </li>
      <li class="not-num" v-else>
        <div>{{ n }}</div>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    money: string;
    numHeight?: number;
  }>(),
  {
    money: '',
    numHeight: 49
  }
);

const moneyArr = computed(() => props.money.split(''));
</script>

<script lang="ts">
export default {
  name: 'CgBigNumber'
};
</script>
<style lang="scss" scoped>
.cg-big-number {
  display: flex;
  justify-content: center;
  .num-wrap {
    margin: 3px;
  }
}
.not-num {
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  text-align: center;
  color: var(--cg-color-blue5);
  text-shadow: 0px 4px 4px rgba(190, 215, 239, 0.6);
  display: flex;
  flex-direction: column-reverse;
  padding-bottom: 8px;
}

.cg-big-number.deep-blue {
  .num-wrap {
    background: linear-gradient(90deg, var(--cg-color-blue5) 0%, var(--cg-color-blue3) 39.58%, var(--cg-color-blue3) 62.5%, var(--cg-color-blue5) 100%);
    border-radius: 8px;

    height: 81px;
    margin: 4px;
  }
  .not-num {
    font-size: 52px;
    background: linear-gradient(180deg, var(--cg-color-blue3) 0%, var(--cg-color-blue5) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    text-shadow: 0px 4px 4px rgba(130, 151, 165, 0.4);
    padding-bottom: 17px;
  }
  & .not-num:last-of-type {
    margin-left: 8px;
  }
}

.cg-num-box {
  width: 32px;
  background: linear-gradient(180deg, var(--cg-color-blue8) 0%, var(--cg-color-blue5) 100%);
  box-shadow: inset 0px 4px 4px var(--cg-color-blue5);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  ul {
    position: absolute;
    width: 100%;
    top: 0;
    transition: all 1s;
    li {
    }
  }
  .txt {
    font-family: 'Arial';
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    text-align: center;
    color: var(--cg-color-white);
    text-shadow: 0px 4px 4px var(--cg-color-blue5);
  }
}

.deep-blue .cg-num-box {
  width: 50px;
  background: linear-gradient(to top, var(--cg-color-blue5) 0%, var(--cg-color-blue3) 100%);
  border-radius: 8px;
  box-shadow: none;
  ul {
    li {
    }
  }
  .txt {
    font-size: 52px;
  }
}
</style>




