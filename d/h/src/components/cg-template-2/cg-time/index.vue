<script setup lang='ts'>
import CgTime from './index.d';
import { timeToVietnamBlue } from '@/utils/time';
interface Props extends CgTime.Props {
    color?: string,// 颜色
    font?: string,// 字体
    time: number,// 时间戳
    formatStr?: string,// 格式化
    isTwoLine?: boolean,// 是否两行显示
    align?: string,// 对齐方式
    size?: string | number,// 大小
}
const props = withDefaults(defineProps<Props>(), {
    isTwoLine: false,
    color: 'var(--cg-color-black1)',
    font: 'var(--cg-font-text2)',
    formatStr: '/',
    align: 'center',
    size: 'var(--cg-font-26)',
})
</script>
<template>
    <div class="cg-time" :style="{ color: props.color, font: props.font, textAlign: props.align, fontSize: size }">
        <div v-if="isTwoLine">
            <div v-html="timeToVietnamBlue(+time, `DD${formatStr}MM${formatStr}YYYY HH:mm:ss`).split(' ').join('<br />')">
            </div>
        </div>
        <div v-else>{{ timeToVietnamBlue(+time, `DD${formatStr}MM${formatStr}YYYY HH:mm:ss`) }}</div>
    </div>
</template>

<style lang='scss' scoped>
.cg-time {}
</style>