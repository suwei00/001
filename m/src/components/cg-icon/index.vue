<script setup lang="ts">
interface CgIcon {
  name: string
  width?: string | number
  height?: string | number
  margin?: string,

}
const props = withDefaults(defineProps<CgIcon>(), {
  name: '',// 文件夹名字_图标名字
  width: 40,
  height: 0,
  margin: '0,0,0,0',

})
const marginTransform = computed(() =>props.margin.split(',').map((s) => `var(--cg-px-${s})`).join(' '));

</script>

<template>
    <img  class="cg_icon"
    :style="`width: var(--cg-px-${width});height: ${height ? `var(--cg-px-${height})` : ''};;margin:${ marginTransform}`"
      :src="getSupportImage((exportImg as any)[props.name])"  />
</template>

<style lang="scss" scoped>
  .cg_icon{
    display: block;
  }
</style>
