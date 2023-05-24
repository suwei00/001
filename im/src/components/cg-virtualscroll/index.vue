<script setup lang="ts">
interface ListItem {
  id?: number
  text?: string
}

interface CGVirtualscrollProps {
  listItems: Array<any> //列表数据
  itemHeight: number //列表项高度
  viewportHeight: number //容器高度
}

const props = withDefaults(defineProps<CGVirtualscrollProps>(), {
  listItems: Array as () => ListItem[], //类型断言
})

const $container = ref<HTMLDivElement | null>(null);
const visibleItems = reactive<ListItem[]>([]);
let observer: IntersectionObserver | null = null;

const contentStyle = computed(() => {
  return {
    // contain-intrinsic-size 属性 设置为 虚拟滚动列表 的总高度
    containIntrinsicSize: `${props.listItems.length * props.itemHeight}px`,
    contentVisibility: 'auto',
    // scroll-margin属性设置为滚动边距，根据容器高度和列表项高度进行计算
    scrollMargin: `${(props.viewportHeight / 2) + (props.itemHeight / 2)}px`,
  };
});

onMounted(() => {
  let callback = ( entries, observer) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLDivElement;
        // 为每个列表项添加了一个data-index属性，以便在观察器回调中找到对应的列表项索引
        const itemIndex = parseInt(target.dataset.index!);
        if (entry.isIntersecting) {
          // 进入可视区域，添加到可见列表
          // 动态地将进入可视区域的列表项添加到visibleItems数组中
          visibleItems.push(props.listItems[itemIndex]);
        } else {
          // 离开可视区域 的列表项 则从 visibleItems中移除 (可见列表中移除)
          const index = visibleItems.findIndex((item) => item.id === props.listItems[itemIndex].id);
          if (index !== -1) {
            visibleItems.splice(index, 1);
          }
        }
      });
  };
  let options = {
    root: $container.value,
    rootMargin: "10px",
    threshold: 1.0,
  };
  // Intersection Observer API 监听列表项进入和离开 可视区域(观察列表项的可见性) 的事件
  // 使用Intersection Observer创建了一个观察器，并将其应用于每个列表项
  observer = new IntersectionObserver(callback, options);
});

onBeforeUnmount(() => {
  if (observer && $container.value) {
    observer?.disconnect()
    observer?.unobserve($container.value);
  }
})
</script>

<template>
  <div id="container" class="virtual-scroll-container" :style="{ height: `${viewportHeight}px` }" ref="$container">
    <div class="virtual-scroll-content" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.virtual-scroll-container {
    height: 0px;
    overflow-y: auto;
    position: relative;
    .virtual-scroll-content {
      //content-visibility: hidden;/* 初始化隐藏内容 */
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      .list-item {
        height: 50px;
      }
    }
}
</style>
