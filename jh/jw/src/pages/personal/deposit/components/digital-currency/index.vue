<script setup lang='ts' name="digital-currency">
import type { TransitionDirection } from 'type'
import type { GlobalComponents } from 'vue'

const { id } = defineProps<{ id: string }>()
const chanelIndex = $ref(0)

const { data: channelRes, run: runGetChannels } = $(useRequest(() => getChannels(id)))

// 通道列表
const channelList = $computed(() => {
  if (!channelRes?.length)
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
const currentChannel = $computed(() => get(channelRes, chanelIndex, undefined))

// 通道id 14离线 12线下 2三方
const channelId = $computed(() => {
  return channelList?.[chanelIndex]?.id
})
let direction = $ref<TransitionDirection>('ltr')
const handleChannelChange: InstanceType<GlobalComponents['PersonalTabs']>['onChange'] = (index) => {
  direction = chanelIndex < index ? 'rtl' : 'ltr'
}
</script>

<template>
  <div key="digital-currency" class="digital-currency">
    <template v-if="channelList.length > 0">
      <div personal-subtitle>
        充值通道
      </div>
      <personal-tabs key="digitalChannels" v-model="chanelIndex" :list="channelList" @change="handleChannelChange">
        <template #tab="{ item, active }">
          <div class="tunnel-item" :class="{ 'font-jl-font-bold color-color-primary-second': active }" w-232px h-60px>
            <span>{{ item.label }}</span>
          </div>
        </template>
      </personal-tabs>
      <transition mode="out-in" :name="direction === 'ltr' ? 'slide-right' : 'slide-left'">
        <!-- 离线 -->
        <offline-digital v-if="channelId === '14'" key="14" :data="currentChannel!" @rate-changed="runGetChannels" />
        <!-- 线下 -->
        <underline-digital v-else-if="channelId === '12'" key="12" :data="currentChannel!" @rate-changed="runGetChannels" />
        <!-- 三方 -->
        <third-digital v-else :data="currentChannel!" />
      </transition>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

.digital-currency {
  font-size: 15px;

  .tunnel-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .field-item {
    display: flex;
    padding-top: 20px;
    align-items: center;

    .title {
      width: 100px;
      padding-top: 0;
      padding-bottom: 0;
    }

    span {
      font-size: 13px;
      font-family: $jl-font;
      font-weight: bold;
      line-height: 20px;
    }

    &.qrcode-box {
      align-items: start;

      .qrcode {
        width: 120px;
        height: 120px;
        border: 1px solid $border-color;
        border-radius: 6px;
        padding: 7px;
      }
    }

  }

  .submit-box {
    display: flex;
    align-items: center;
  }

}
</style>
