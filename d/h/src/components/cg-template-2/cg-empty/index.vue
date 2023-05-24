<script setup lang='ts'>
import type CgEmpty from './index';
interface Props extends CgEmpty.Props {
    marginTop?: number | string,
}
const props = withDefaults(defineProps<Props>(), {
    marginTop: 160
})
</script>
<template>
    <div class="cg-empty" :style="`margin-top: var(--cg-px-${props.marginTop})`">
        <slot name="img">
            <app-image src="/no_data.png" class="img-size" />
        </slot>
        <div class="txt">
            <slot>Hiện không có dữ liệu</slot>

        </div>
        <div class="empty-button">
            <slot name="buttonText" />
        </div>
    </div>
</template>

<style lang='scss' scoped>
.cg-empty {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;

    .img-size {
        width: 280px;
    }

    .txt {
        font-size: var(--cg-font-24);
        color: var(--cg-color-gray);
        line-height: 32px;
    }

    .empty-button {
        margin-top: 18px;
    }
}
</style>