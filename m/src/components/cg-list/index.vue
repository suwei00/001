<script setup lang="ts">
import { provide, ref } from 'vue'
import { ListProps } from "vant";
import type { PullRefreshProps } from 'vant'

type IListProps = Partial<ListProps>
type IPullRefreshProps = Partial<PullRefreshProps>

interface CGListProps {
  pullRefreshProps?: IPullRefreshProps,
  listProps?: IListProps
  loading?: boolean
  finished?: boolean
  successText?: string
}

const refreshing = ref<boolean>(false)
const props = withDefaults(defineProps<CGListProps>(), {
  loading: false, // 是否正在加载中
  finished: false, // 是否加载完所有数据
  successText: "刷新成功"
})

const emit = defineEmits(['refresh', 'loadMoreData']);

const refresh = () => {
  refreshing.value = false
  emit('refresh')
}

const onLoad = (item: any) => {
  // 执行上拉加载更多的操作
  emit('loadMoreData')
}
</script>

<template>
  <div class="cg_list">
    <VanPullRefresh
      v-model="refreshing"
      @refresh="refresh"
      :success-text="successText"
      v-bind="props.pullRefreshProps"
    >
      <VanList
        :loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        v-bind="props.listProps"
      >
         <slot></slot>
      </VanList>
    </VanPullRefresh>
  </div>
</template>
