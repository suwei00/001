<script setup lang='ts'>
import type CgEmpty from './index';
interface Props extends CgEmpty.Props {
    marginTop?: number | string,
    minHeight?: number | string
}
const props = withDefaults(defineProps<Props>(), {
    marginTop: 0,
    minHeight: 500
})
</script>
<template>
    <div class="cg-empty" :style="`margin-top: var(--cg-px-${props.marginTop});min-height:var(--cg-px-${props.minHeight})`">
        <slot name="img">
            <app-image src="/no_data.png" class="img-size" />
        </slot>
        <div class="txt">
            <slot>Hiện không có dữ liệu</slot>
        </div>
        <div class="empty-button">
            <slot name="buttonText"></slot>
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
        width: 97px;
    }

    .txt {
        margin-top: 16px;
        font-size: var(--cg-font-13);
        color: var(--cg-color-grey5);
        line-height: 15px;
    }

    .empty-button {
        margin-top: 30px;
    }
}
</style>