<script setup lang='ts'>
import CgDivider from './index.d';
interface Props extends CgDivider.Props {
    direction?: 'horizontal' | 'vertical',// 线条方向
    color?: string,// 线条颜色
    margin?: string,// 线条外边距
}
const props = withDefaults(defineProps<Props>(), {
    direction: 'horizontal',
    margin: '0px 0px 0px 0px',
})
// const props = defineProps<{
//     direction?: string,// 线条方向
//     color?: string,// 线条颜色
// }>()
</script>
<template>
    <div :class="direction"
        :style="{ background: color ? `${props.color}` : `var(--cg-color-white1)`, margin: `${props.margin}` }">
    </div>
</template>

<style lang='scss' scoped>
.horizontal {
    height: 1px;
}

.vertical {
    width: 1px;
    height: 100%;
}
</style>