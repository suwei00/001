<script setup lang='ts'>
import type CgBadge from './index';
interface Props extends CgBadge.Props {
    value?: string | number,
    maxValue?: number,
    isDot?: boolean,
}
withDefaults(defineProps<Props>(), {
    value: '',
    maxValue: 99,
    isDot: false,
});
</script>
<template>
    <div v-if="isDot">
        <div  class="is-dot"></div>
    </div>
    <template v-else>
        <div class="cg_badge" v-if="value">
            <slot></slot>
            <div class="is_fi" :value="value" :max="maxValue">{{ value }}</div>
        </div>
    </template>
</template>
<script lang='ts'>
export default {
    name: 'CgBadge'
}
</script>
<style lang='scss' scoped>
.is-dot{
    background-color: var(--cg-color-red2);
    border-radius: 50%;
    margin-right: 10px;
    width: 20px;
    height: 20px;
}
.cg_badge {
    position: relative;
    .is_fi {
        position: absolute;
        top: -8px;
        right: -9px;
        background-color: var(--cg-color-red3);
        border: 0;
        font: var(--cg-font-text12);
        line-height:37px;
        text-align: center;
        padding: 0;
        width: 36px;
        height: 36px;
        border-radius:50%;
        // transform: scale(0.75);
        transform-origin: 80px -20px;
        color: var(--cg-color-white);
    }
}

</style>

  