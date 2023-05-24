<script setup lang="ts">

interface CGEmptyProps {
  marginTop?: number | string,// 距离顶部距离
  isImg?: boolean, // 是否显示图片
  text?: string, // 缺省文字
}
const props = withDefaults(defineProps<CGEmptyProps>(), {
  marginTop: 200,
  isImg: true,
  text: 'Chưa có nội dung',
})
</script>

<template>
  <div class="cg-empty" :style="`margin-top: var(--cg-px-${props.marginTop})`">
    <slot>
      <img class="no_data" :src="getSupportImage(exportImg.empty_no)" alt="" v-if="props.isImg" />
    </slot>
    <p class="empty-text">{{ props.text }}</p>
  </div>
</template>

<style lang="scss" scoped>
.cg-empty {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .no_data {
    width: 100%;
  }

  .empty-text {
    color: var(--cg-color-text-4);
    font: var(--cg-font-9);
  }
}
</style>
