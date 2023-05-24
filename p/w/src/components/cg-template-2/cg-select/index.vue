<script setup lang="ts">
import { useSlots, ref, watch, onUpdated } from 'vue';
import { ElSelect } from 'element-plus';

const $slots = useSlots();
const selectRef = ref<typeof ElSelect | null>(null);

onUpdated(() => {
  const select = selectRef.value;
  if ($slots.prefix) {
    if (select) {
      const prefix = select.$el.querySelector('.el-input__prefix');
      const prefixWidth = prefix?.clientWidth;
      if (prefix) {
        const elInputInner = select.$el.querySelector('.el-input__inner');
        if (elInputInner) {
          elInputInner.style.paddingLeft = `${prefixWidth + 5}px`;
        }
      }
    }
  } else {
    const elInputInner = select?.$el.querySelector('.el-input__inner');
    if (elInputInner) {
      elInputInner.style.paddingLeft = '15px';
    }
  }
});
</script>

<template>
  <el-select ref="selectRef" v-bind="$attrs" style="width: 100%">
    <template #prefix v-if="useSlots()?.prefix">
      <slot name="prefix"></slot>
    </template>
    <el-option v-for="item in ($attrs.options as any)" :style="{ height: `${$attrs.itemHeight || 34}px` }" :key="item.value" :label="item.label" :value="item.value">
      <slot name="selectItem" :data="item"></slot>
    </el-option>
  </el-select>
</template>
<style lang="scss" scoped>
:deep(.el-input__inner) {
  color: var(--cg-color-grey1);
  font: var(--cg-font-text);
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
</style>
