<script setup lang='ts' name="third-deposit">
// 三方支付通用组件 如微信 支付宝
import type { TransitionDirection } from 'type'
import type { GlobalComponents } from 'vue'

const { id } = defineProps<{ id: string }>()
// 当前选中的通道index
const chanelIndex = $ref(0)
const { data: channelRes } = $(useRequest(() => getChannels(id)))
// 通道列表
const channelList = $computed(() => {
  if (!channelRes)
    return []
  return channelRes.map((item) => {
    const { name, id } = item
    return {
      ...item,
      label: name,
      value: id,
    }
  })
})

// 当前通道
const currentChannel = $computed(() => get(channelList, chanelIndex, undefined))
let direction = $ref<TransitionDirection>('ltr')
// 当前通道factory_id
const factory_id = $computed(() => currentChannel?.factory_id)
const handleChange: InstanceType<GlobalComponents['PersonalTabs']>['onChange'] = (index) => {
  direction = chanelIndex < index ? 'rtl' : 'ltr'
}
</script>

<template>
  <div class="third-deposit">
    <template v-if="channelList.length > 0">
      <div class="tunnels">
        <div personal-subtitle>
          充值通道
        </div>
        <personal-tabs key="channelList" v-model="chanelIndex" :list="channelList" @change="handleChange">
          <template #tab="{ item, active }">
            <div
              class="tunnel-item" :class="{ 'font-jl-font-bold color-color-primary-second': active }" w-232px
              h-60px
            >
              <span>{{ item.label }}</span>
            </div>
          </template>
        </personal-tabs>
      </div>
      <transition mode="out-in" :name="direction === 'ltr' ? 'slide-right' : 'slide-left'">
        <!-- 微信、支付宝转银行卡 -->
        <third-to-bank v-if="factory_id === '9'" :data="currentChannel!" />
        <common-tunnel v-else :key="currentChannel?.id" :data="currentChannel!" />
      </transition>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;
@include transition-slide-left;
@include transition-slide-right;
.third-deposit {
  .tunnels {
    .tunnel-item {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
