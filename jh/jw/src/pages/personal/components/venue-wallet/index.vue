<script setup lang='ts' name="venue-wallet">
// import type { BaseTransitionProps } from 'vue'
const { marginLeft } = defineProps<{ marginLeft?: string }>()
const appStore = useAppStore()
const { platList } = $(storeToRefs(appStore))
const [isExpand, toggleExpand] = $(useToggle(false))
// 展示的场馆列表
const displayList = computed(() => {
  if (!platList)
    return []
  return isExpand ? platList : platList.slice(0, 4)
})
// 切换展开收起
const handleToggleExpand = () => {
  toggleExpand()
}
// const onBeforeEnter: BaseTransitionProps['onBeforeEnter'] = (el) => {
//   el.style.opacity = 0
//   el.style.transform = 'translateX(-100%)'
//   el.style.height = 0
// }
// const onEnter: BaseTransitionProps['onEnter'] = (el, done) => {
//   anime({
//     targets: el,
//     opacity: 1,
//     translateX: 0,
//     height: 110,
//     delay: el.dataset.index * 100,
//   }).finished.then(() => done())
// }
// const onLeave: BaseTransitionProps['onLeave'] = (el, done) => {
//   anime({
//     targets: el,
//     opacity: 0,
//     height: 0,
//     delay: el.dataset.index * 20,
//   }).finished.then(() => done())
// }
</script>

<template>
  <div class="venue-wallet">
    <p personal-subtitle>
      钱包明细
    </p>
    <!-- <transition-group
      appear mode="out-in" class="list" tag="ul" :css="false" @before-enter="onBeforeEnter"
      @enter="onEnter" @leave="onLeave"
    > -->
    <ul class="list" :style="{ marginLeft: `-${marginLeft}` }">
      <li v-for="(item, index) in displayList" :key="index" :data-index="index">
        <wallet-item :data="item" :margin-left="marginLeft" />
      </li>
    </ul>
    <!-- </transition-group> -->
    <div v-if="(platList?.length ?? 0) > 4" class="expand" @click="handleToggleExpand">
      <span>{{ isExpand ? "收起" : '展开' }}</span>
      <i
        class="i-personal-wallet-expand" :class="{ 'rotate-180': isExpand }" color-color-primary-second w-14px
        h-14px
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.venue-wallet {
  padding-top: 25px;

  .title {
    text-align: left;
    color: $color-black-primary;
    font-size: 15px;
    line-height: 20px;
  }

  .list {
    display: flex;
    box-sizing: content-box;
    margin-top: -10px;
    flex-wrap: wrap;

    .card {
      width: 225px;
      height: 90px;
      border: 1px solid $border-color;
      border-radius: 6px;
      color: $color-black-primary;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px 10px 15px 18px;
      margin-left: 20px;
      margin-top: 20px;
      transition: all .3s;

      &:hover {
        transform: scale(1.05);
      }

      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .title {
          font-size: 12px;
          line-height: 17px;
        }

        .btn {
          width: 60px;
          height: 24px;
          line-height: 24px;
          border-radius: 12px;
          border: 1px solid $color-primary-second;
          color: $color-primary-second;
          font-size: 12px;
          cursor: pointer;
        }

      }

      .rmb {
        font-family: $jl-font;
        font-weight: bold;
        font-size: 18px;
        line-height: 25px;
        text-align: left;
        font-weight: bold;
      }
    }
  }

  .expand {
    padding-top: 12px;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      color: $color-primary-second;
      font-size: 13px;
      line-height: 18px;
    }
  }
}
</style>
