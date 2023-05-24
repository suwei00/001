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
.cg_badge {
    position: relative;

 

    .is_fi {
        position: absolute;
        top: -2px;
        right: 5px;
        background-color: var(--cg-color-red2);
        mix-blend-mode: normal;
        box-shadow: 0px 2px 4px rgba(130, 151, 165, 0.4);
        border: 0;
        font-size: 12px;
        line-height: 24px;
        text-align: center;
        padding: 0;
        width: 24px;
        height: 24px;
        border-radius: 24px;
        transform: scale(0.75);
        transform-origin: 80px -20px;
        color: var(--el-color-white);
    }
}

:deep(.el-badge__content) {
    background-color: var(--cg-color-red2);
    border-radius: var(--cg-border-radius);
    font-size: var(--cg-px-9);
    border: 0;
    width: 20px;
    height: 20px;
    line-height: 20px;
}

:deep(.is-dot) {
    width: 12px !important;
    height: 12px !important;
    left: -12px !important;
    top: 3px !important;
    background-color: var(--cg-color-red);
    border-radius: 50%;
    margin-right: 10px;
}
</style>

  