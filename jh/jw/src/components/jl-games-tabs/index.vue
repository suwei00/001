<script setup lang='ts' name="jl-games-tabs">
// 游戏类型切换tab
import navItemImg from '@images/home/games/nav-item.png?preset=full'
import navItemHoverImg from '@images/home/games/nav-item-hover.png?preset=full'
interface itemProp {
  label: string
  value: string | number
  img?: import('vite-plugin-image-presets').ImageAttrs[]
  hover?: import('vite-plugin-image-presets').ImageAttrs[] | string
  [key: string]: any
}
interface Props {
  modelValue: number | undefined
  list: Array<itemProp>
  direction?: 'vertical' | 'horizontal'
  withIcon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'vertical',
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: itemProp['value']): void
  (e: 'change', index: number, item?: itemProp, event?: MouseEvent): void
}>()
const navItemImgUrl = getImageUrl(navItemImg)
const navItemHoverImgUrl = getImageUrl(navItemHoverImg)
const nanoidList = $computed(() => props.list.map(item => ({ ...item, nanoid: nanoid() })))
let data = $(useVModel(props, 'modelValue', emit))

const handleNavItemClick = (index: number, item: itemProp, event?: MouseEvent) => {
  if (data === index)
    return
  emit('change', index, item, event)
  data = index
}

// need hover
const hoverHandler = debounce((item: any, i: any, e: any) => {
  console.log('hoverHandler', item, i, e)
  if (i === data)
    return
  if (props.withIcon)
    e.target.children[0].src = item.hover as string
}, 300)
const leaveHandler = debounce((item: any, i: any, e: any) => {
  console.log('leaveHandler', item, i, e)
  if (i === data)
    return
  if (props.withIcon)
    e.target.children[0].src = getSupportImage(item.img ?? [])
}, 300)
</script>

<template>
  <div class="jl-games-tabs">
    <ul class="list" :class="[direction === 'horizontal' ? 'horizontal' : 'vertical']">
      <li
        v-for="(item, index) in nanoidList" :key="item.nanoid"
        :class="{ active: index === data, withIcon }"
        @click="handleNavItemClick(index, item)"
        @mouseenter="hoverHandler(item, index, $event)"
        @mouseleave="leaveHandler(item, index, $event)"
      >
        <template v-if="withIcon">
          <img
            v-if="direction === 'vertical'"
            class="icon"
            :src="index === data ? item.hover as string : getSupportImage(item.img ?? [])"
          >
          <span pl-15px>{{ item.label }}</span>
        </template>
        <template v-else>
          <span>{{ item.label }}</span>
        </template>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.jl-games-tabs {

  .list {
    display: flex;

    li {
      width: 129px;
      height: 52px;
      background-repeat: no-repeat;
      background-size: 100% 100% !important;
      font-size: 18px;
      line-height: 50px;
      transition: all .3s;
      cursor: pointer;
      user-select: none;
      box-shadow: 0px 2px 8px 1px rgba(86, 122, 254, 0.3);
      border-radius: 50px;
      background: v-bind(navItemImgUrl);

      .icon {
        width: 38px;
        height: 38px;
        background-repeat: no-repeat;
        background-size: contain !important;
      }

      span {
        color: #333;
        line-height: 42px;
        font-size: 18px;
      }

      &.active {
        background-image: v-bind(navItemHoverImgUrl);

        span {
          color: #ffff;
        }
      }
      &:hover{
        background-image: v-bind(navItemHoverImgUrl);

        span {
          color: #ffff;
        }
      }
    }
    .withIcon{
      display: flex;
      align-items: center;
      padding-left: 11px;
    }

    &.vertical {
      flex-direction: column;

      li {
        &+li {
          margin-top: 14px;
        }
      }
    }

    &.horizontal {
      flex-direction: row;

      li {
        &+li {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>

