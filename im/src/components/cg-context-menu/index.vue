<template>
    <!-- 唯一父元素class命名规则 页面:p-pageName 组件c-componentName -->
    <div class='cg-c-context-menu' v-long-press="handLongPress" ref="contextRef">
        <slot></slot>
        <div class="menu-content" :class="[size]" :style="{
            top: toCgPx(top),
            right: toCgPx(right),
            bottom: toCgPx(bottom),
            left: toCgPx(left),
            transform: `translate(0,${toCgPx(top) ? '-100%' : toCgPx(bottom) ? '100%' : '0'})`
        }" v-if="visible && list?.length">
            <div class="menu-triangle-top" v-if="showTriang === 'top'" :style="{
                left: toCgPx(triangLeft),
                right: toCgPx(triangRight),
            }"></div>
            <div class="menu-triangle-bottom" v-if="showTriang === 'bottom'" :style="{
                left: toCgPx(triangLeft),
                right: toCgPx(triangRight),
            }"></div>
            <div class="menu-list">
                <div class="list-item flex ai-c" v-for="(item, index) of list" :key="index" @click="handleClickItem(item)">
                    <slot name="list-item" :item="item">
                        <cg-icon :name="item.icon" />
                        <div class="list-item-text txt-l font_32">
                            {{ item.itemName }}
                        </div>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
export type cgContextMenuItem = {
    icon: string,
    itemName: string,
    [key: string]: any,
}
export interface cgContextMenuProps {
    visible: boolean,
    list?: cgContextMenuItem[],
    size?: "medium" | 'large',
    top?: number | string,
    right?: number | string,
    bottom?: number | string,
    left?: number | string,
    showTriang?: "top" | "bottom",
    triangLeft?: number | string,
    triangRight?: number | string,
}
const props = withDefaults(defineProps<cgContextMenuProps>(), {
    size: 'medium',
    visible: false,
})
const contextRef = ref();
// 
const toCgPx = (num: string | number | undefined): string | undefined => {
    if (num ?? false) return (`var(--cg-px-${-num!})`)
}
const emit = defineEmits(['onItemClick', 'onLongPress'])
const handleClickItem = (data: cgContextMenuItem) => {
    emit('onItemClick', data)
}
const handLongPress = () => {
    const local = (({ offsetWidth, offsetHeight, offsetLeft, offsetTop }) => { return { offsetWidth, offsetHeight, offsetLeft, offsetTop } })(contextRef.value)
    // console.log(local);
    emit('onLongPress', local)
}
</script>
<style lang='scss' scoped>
.cg-c-context-menu {
    // background: #000;
    position: relative;
    display: inline-block;

    .cg_icon {
        display: block;
    }

    .menu-triangle-top {
        width: 24px;
        border: 12px solid;
        border-width: 0px 12px 12px 12px;
        border-color: transparent transparent var(--cg-color-bg-white) transparent;
        position: absolute;
        top: -12px;
    }

    .menu-triangle-bottom {
        position: absolute;
        width: 24px;
        border: 12px solid;
        border-width: 12px 12px 0px 12px;
        border-color: var(--cg-color-bg-white) transparent transparent transparent;
        bottom: -12px;
    }

    .menu-content {
        position: absolute;
        color: var(--cg-color-text-3);
        // right: -24px;
        // top:72.5px;
    }

    .menu-list {
        padding-left: 32px;
        background-color: var(--cg-color-bg-white);
        border-radius: 16px;

        .list-item-text {
            padding: 20px 0;
            margin-left: 24px;
            width: 216.2px;
            border-bottom: 2px solid var(--cg-color-bg-8);
            box-sizing: border-box;
            word-break: break-all;
            padding-right: 40px;
        }

    }

    .large .menu-list .list-item {
        .list-item-text {
            width: 300px;
        }
    }
}
</style>