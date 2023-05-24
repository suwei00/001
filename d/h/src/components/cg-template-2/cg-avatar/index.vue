<script setup lang='ts'>
import { CgIcon } from '@cg-template-2-components/index';
import { ref, computed } from 'vue';
import type CgAvatar from './index';
interface Props extends CgAvatar.Props {
    // d?: string
    img?: string,
    rate?: number | string,// 圆圈的比例 100 为满圆
    width?: number | string,// 头像的宽度
    height?: number | string,// 头像的高度
}
const props = withDefaults(defineProps<Props>(), { img: '0', rate: 0, width: 128, height: 128 })

const currentRate = ref(0);
const gradientColor = {
    '0%': 'var(--cg-color-blue6)',
    '50%': 'var(--cg-color-blue1)',
    '100%': 'var(--cg-color-blue6)',
};
</script>
<template>
    <div class="cg-avatar" :style="`width: var(--cg-px-${props.width});height:var(--cg-px-${props.height})`">
        <van-circle v-model:current-rate="currentRate" :stroke-width="35" :rate="props.rate" :color="Number(props.rate) <= 0.009 ? 'transparent' : gradientColor"
            class="circle">
            <div class="avatar">
                <app-image :src="`/avatars/avatar-${props.img}.png`" class="img-size" />
                <div class="small-icon">
                    <slot name="icon" />
                </div>
            </div>
        </van-circle>
    </div>
</template>

<style lang='scss' scoped>
:deep(.van-circle) {
    svg {
        // border-radius: 50%;
        // overflow: hidden;
        background: transparent;
    }
}
.cg-avatar {
    position: relative;
    box-shadow: var(--cg-avatar-shadow-small);
    border-radius: 50%;

    .avatar {
        width: 100%;
        height: 100%;
        // border-radius: 50%;
        // overflow: hidden;
    }

    .img-size {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .small-icon {
        position: absolute;
        bottom: -4px;
        right: -4px;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        :deep(.cg_icon) {
            box-shadow: var(--cg-avatar-shadow-blue);
            background: transparent;
            border-radius: 50%;
        }
    }


}

.circle {
    width: 100%;
    height: 100%;
}
</style>