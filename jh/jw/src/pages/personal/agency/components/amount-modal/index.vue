<script setup lang='ts' name="amount-modal">
import type { GlobalComponents, Ref } from 'vue'
import type { ArrElement, DateFlag } from '../../../../../api/type'

const props = defineProps<{
  modelValue: boolean
  title: string
  field: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
// 父组件通过provide注入的ty
const injectTy = inject<Ref<DateFlag>>('ty')
const { getGameNameById } = useAppStore()
// 父组件通过provide注入的username
const injectUsername = inject<Ref<string>>('username')
const ty: DateFlag = $ref(injectTy?.value ?? '1')
const visible = $(useVModel(props, 'modelValue', emit))
const username = $ref(injectUsername?.value ?? '')
const scrollRef = $ref<InstanceType<GlobalComponents['ElScrollbar']>>()
// tab改变时，滚动到顶部
const change = () => {
  nextTick(() => scrollRef?.setScrollTop?.(0))
}
const { data, loading } = $(useRequest(() => getReportPlatform({ username, ty }), {
  refreshDeps: $$([ty]),
  debounceInterval: 300,
  loadingKeep: 1000,
}))
// 投注金额数据
const list = $computed(() => {
  if (!data?.d?.length)
    return []
  return data.d.map(item => ({
    label: getGameNameById(item.api_type),
    value: item[props.field as keyof ArrElement<typeof data.d>],
  }))
})
</script>

<template>
  <el-dialog v-model="visible" :show-close="false" width="840px" align-center>
    <template #header>
      <div class="jl-dialog-header">
        <h3 class="title">
          {{ title }}
        </h3>
        <i i-common-close w-14px h-14px @click="visible = false" />
      </div>
    </template>
    <div v-loading="loading" pt-34px pb-35px v-bind="vLoading">
      <jl-switch v-model="ty" :list="dateList" mb-16px width="129px" @change="change" />
      <transition mode="out-in" appear>
        <el-scrollbar v-if="list.length" ref="scrollRef" always :max-height="600">
          <ul class="list">
            <li v-for="item in list" :key="item.label" v-card class="card" shadow-card>
              <div class="game">
                {{ item.label }}
              </div>
              <div class="amount">
                <jl-count :value="+item.value" />
              </div>
            </li>
          </ul>
        </el-scrollbar>
        <personal-empty v-else h-600px desc="暂无数据" />
      </transition>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  margin-left: -19px;
  margin-top: -19px;

  .card {
    width: 178px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    border: 1px solid rgba(223, 234, 246, 1);
    border-radius: 8px;
    margin-left: 19px;
    margin-top: 19px;
    padding: 20px;

    .game {
      font-size: 12px;
      color: $color-black-primary
    }

    .amount {
      font-size: 18px;
      font-family: $jl-font;
      font-weight: bold;
    }
  }
}
</style>
