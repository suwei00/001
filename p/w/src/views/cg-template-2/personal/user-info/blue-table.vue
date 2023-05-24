<template>
  <section class="blue-table">
    <div class="header">
      <ul class="line">
        <li>{{ props.labelTitle }}</li>
        <li v-for="item in props.data" :key="item.label">{{ item.label }}</li>
      </ul>
    </div>
    <div class="body">
      <ul class="line">
        <li>{{ props.valueTitle }}</li>
        <li v-for="item in props.data" :key="item.label">{{ item.value }}</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Option } from '@/hooks/useOption';

interface Props {
  data: Array<Option>;
  labelTitle: string;
  valueTitle: string;
}

const props = defineProps<Props>();
</script>

<script lang="ts">
export default {
  name: 'BlueTable'
};
</script>

<style lang="scss" scoped>
.blue-table {
  font: var(--cg-font-text);
  line-height: 17px;
  color: var(--cg-color-grey1);
  border: 1px solid var(--cg-color-blue8);
  width: 880px;
  .line {
    display: flex;
    flex-wrap: nowrap;
    li {
      // width: 86px;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 50px;
      line-height: 20px;
      text-align: center;
      border-right: 1px solid var(--cg-color-blue8);
    }
    li:first-child {
      flex: initial;
      width: 184px;
      font: var(--cg-font-text1);
      line-height: 17px;
      color: var(--cg-color-grey1);
    }
    li:last-child {
      border-right: 0;
    }
  }
  .header {
    background: var(--cg-color-white5);
    .line {
      border-bottom: 1px solid var(--cg-color-blue8);
    }
  }
}
</style>
