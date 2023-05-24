<script setup lang="ts">
import { useRouter } from 'vue-router'

interface CgListItem {
  icon?: string
  iconSize?: string
  title?: string
  subTitle?: string
  desc?: string
  descTextAlign?: string
  descWidth?: string | number
  descRow?: string | number
  isLink?: boolean
  to?: string | object
  replace?: boolean
  roundRadius?: string | number
  url?: string
  center?: boolean
  size?: string | number
  hasMargin?: boolean
  margin?: string
  paddingx?: string | number
  paddingy?: string | number
  border?: 'full' | 'long' | 'short'
  itemAlign?: string
  color?: string
  subColor?: string
  font?: string
  subFont?: string
  lineHeight?: string | number
  subLineHeight?: string | number
  subMarginTop?: string | number
  ellipsis?: boolean
  subEllipsis?: boolean
  height?: string | number
  minHeight?: string | number
  boxShadow?: boolean
}

const props = withDefaults(defineProps<CgListItem>(), {
  title: '',
  subTitle: '',
  desc: '',
  isLink: false,
  to: '',
  replace: false,
  roundRadius: '',
  url: '',
  center: false,
  size: '',
  descTextAlign: 'right',
  hasMargin: true,
  margin: 'var(--cg-px-20) 0',
  paddingx: 32,
  paddingy: 12,
  itemAlign: 'center',
  color: 'var(--cg-color-text-3)',
  subColor: 'var(--cg-color-text-4)',
  font: 'var(--cg-font-6)',
  subFont: 'var(--cg-font-11)',
  lineHeight: '36',
  subLineHeight: '30',
  subMarginTop: '16',
  ellipsis: true,
  subEllipsis: false
})

const emits = defineEmits(['click', 'clickRight', 'clickLeft'])
const router = useRouter()
const classes = computed(() => {
  const prefixCls = 'cg-listitem'
  return {
    [prefixCls]: true,
    [`${prefixCls}--clickable`]: props.isLink || props.to,
    [`${prefixCls}--center`]: props.center,
    [`${prefixCls}--large`]: props.size == 'large',
    [`${prefixCls}--border ${prefixCls}--border__${props.border}`]: props.border,
    [`${prefixCls}--ellipsis`]: props.ellipsis
  }
})

const baseStyle = computed(() => {
  let style: any = {
    borderRadius: props.roundRadius,
    margin: props.hasMargin ? props.margin : 'auto',
    color: props.color,
    font: props.font,
    lineHeight: `var(--cg-px-${props.lineHeight})`,
    boxShadow: props.boxShadow ? '0px 1px 7px 0px rgba(237, 238, 241, 1)' : 'none',
    paddingLeft: props.paddingx
  }
  if (props.height) {
    style.height = `var(--cg-px-${props.height})`
  }
  if (props.minHeight) {
    style.minHeight = `var(--cg-px-${props.minHeight})`
  }
  return style
})

const descStyle = computed(() => {
  let style: any = {
    textAlign: props.descTextAlign
  }
  if (props.descWidth) {
    style.width = props.descWidth;
  } else {
    style.maxWidth = '50%';
    style.flex = '1';
  }
  return style;
})

const handleClick = (event: Event) => {
  emits('click', event)

  if (props.to && router) {
    router[props.replace ? 'replace' : 'push'](props.to)
  } else if (props.url) {
    props.replace ? location.replace(props.url) : (location.href = props.url)
  }
}

const rightClick = () => {
  emits('clickRight')
}

const clickLeft = () => {
  emits('clickLeft')
}

</script>

<template>
  <div :class="classes" :style="baseStyle" @click="handleClick">
    <slot>
      <div class="cg-listitem__icon" :style="`align-items:${itemAlign};padding:var(--cg-px-${paddingy}) var(--cg-px-24) var(--cg-px-${paddingy}) 0;`" v-if="$slots.icon" @click.stop="clickLeft">
        <slot name="icon"></slot>
      </div>
      <div class="cg-listitem__content" :style="`align-items:${itemAlign};padding:var(--cg-px-${paddingy}) var(--cg-px-${paddingx});padding-left: 0;`">
        <slot name="content">
          <div
            class="cg-listitem__title__outer"
            v-if="title || subTitle || $slots.title || $slots.subTitle"
          >
            <div class="cg-listitem__title">
              <!-- <template v-if="subTitle"> -->
              <slot name="title">
                <div v-if="title" class="title" :class="{ ellipsis }">{{ title }}</div>
              </slot>

              <slot name="subTitle">
                <div
                  v-if="subTitle"
                  class="cg-listitem__title-desc"
                  :class="{ ellipsis: subEllipsis }"
                  :style="`color:${props.subColor};font:${props.subFont};line-height:var(--cg-px-${props.subLineHeight});margin-top:var(--cg-px-${props.subMarginTop})`"
                >
                  {{ subTitle }}
                </div>
              </slot>
              <!-- </template> -->
              <!-- <div :class="{ ellipsis }" v-else>
                <slot name="title">
                  {{ title }}
                </slot>
              </div> -->
            </div>
          </div>
          <div
            v-if="desc"
            class="cg-listitem__value"
            :class="{ 'cg-listitem__value--alone': !title && !subTitle && !$slots.title }"
            :style="descStyle"
          >
            <cg-ellipsis v-if="descRow" expandText="" collapseText="" :rows="descRow" :content="desc" />
            <template v-else>{{ desc }}</template>
          </div>
          <slot name="linkdesc"></slot>
          <div class="cg-listitem__link__outer" v-if="isLink || to || $slots.link" @click="rightClick">
            <slot name="link">
              <cg-icon class="arrow-right" name="icon_arrowright" />
            </slot>
          </div>
        </slot>
      </div>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.cg-listitem {
  position: relative;
  display: flex;
  // font: var(--cg-font-6);
  width: 100%;
  // line-height: 36px;
  // padding: 12px 32px;
  padding-left: 32px;
  background: #fff;
  border-radius: 0;
  // box-shadow: 0px 1px 7px 0px rgba(237, 238, 241, 1);
  // color: var(--cg-color-text-3);
  box-sizing: border-box;
  align-items: stretch;

  &--ellipsis {
    .cg-listitem__content,
    .cg-listitem__title__outer {
      overflow: hidden;
    }
  }

  &__content {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    // padding: 12px 32px;
    padding-left: 0;
    overflow: hidden;
  }

  &--center {
    align-items: center;
  }

  &--large {
    padding: 24px 12px;
    .cg-listitem__title-desc {
      font: var(--cg-font-7);
    }
  }

  &--border::after,
  &.cg-listitem--border.cg-listitem--border__short .cg-listitem__content::after {
    border-bottom: 2px solid var(--cg-color-bg-10);
  }

  &.cg-listitem--border.cg-listitem--border__long::after {
    left: 32px;
  }

  &.cg-listitem--border.cg-listitem--border__short::after {
    border-bottom: 0;
  }

  &:last-child {
    &::after {
      // border: 0 !important;
    }
  }

  &::after,
  &.cg-listitem--border.cg-listitem--border__short .cg-listitem__content::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 0;
    transform: scaleY(0.5);
  }

  &:active::before {
    opacity: 0.1;
  }
  &--clickable {
    cursor: pointer;
    &::before {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      background-color: var(--cg-color-bg-black);
      border: inherit;
      border-color: var(--cg-color-bg-black);
      border-radius: inherit;
      transform: translate(-50%, -50%);
      opacity: 0;
      content: ' ';
    }
  }

  &__icon {
    display: flex;
    flex-direction: row;
    // padding: 12px 24px 12px 0;
    align-items: center;
  }

  &__title__outer {
    flex: 1;
  }

  &__title {
    display: flex;
    flex-direction: column;
    min-width: 80px;
    height: 100%;
    justify-content: space-between;
    &-desc {
      // font: var(--cg-font-11);
      // color: var(--cg-color-text-4);
      // margin-top: 16px;
    }
  }
  &__value {
    display: block;
    text-align: right;
    // max-width: 50%;
    font: var(--cg-font-6);
    color: var(--cg-color-text-4);
    word-break: break-all;
    // flex: 1;
    max-height: 100%;
    overflow: hidden;
    // text-overflow: clip;
    &--alone {
    }
  }
  &__link__outer,
  &__link {
    color: var(--cg-color-text-4);
    padding-left: 16px;
    .arrow-right {
      vertical-align: middle;
    }
  }
}
.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
