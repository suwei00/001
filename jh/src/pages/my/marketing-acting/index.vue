<script lang="ts" setup>
import CreateActing from './components/createActing.vue'
import InviteCode from './components/inviteCode.vue'
import Header from '~/components/Header.vue'

const active = ref(1)
const tabsRef: any = ref(null)
const contentRef: any = ref(null)

const goToTab = (item: any) => {
  let styleStr = ''
  if (item.name === 1)
    styleStr = '0'

  else
    styleStr = '-100%'

  contentRef.value.style.left = styleStr
  tabsRef.value?.scrollTo(item.name === 1 ? 1 : 2)
}
</script>

<template>
  <div class="transitionWarps">
    <Header title="营销代理" />
    <div class="transitionHead">
      <van-tabs ref="tabsRef" v-model:active="active" animated @click-tab="goToTab">
        <van-tab title="创建代理" :name="1" />
        <van-tab title="邀请码" :name="2" />
      </van-tabs>
    </div>
    <div class="transitionMainWarp">
      <div ref="contentRef" class="transitionMain">
        <div class="insideWarp">
          <CreateActing v-if="active === 1" @go-to-tab="goToTab({ name: 2 })" />
        </div>
        <div class="insideWarp">
          <InviteCode v-if="active === 2" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.transitionWarps {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #F5F5F9;

  .transitionHead {
    width: 100%;
    border-top: 1px solid #E5E5E5;
    margin-bottom: 10px;

    .van-tabs {
      height: 100%;
    }

    :deep(.van-tabs__wrap) {
      height: 50px;
    }

    :deep(.van-tab--line) {
      font-size: 14px;
      color: #CCCFD9;
    }

    :deep(.van-tab--active) {
      color: #414655;
    }

    :deep(.van-tabs__line) {
      background: #597EF7;
      height: 2px;
      width: 82px;
    }

    :deep(.van-tabs__content) {
      height: 0;
    }

    :deep(.van-tab__panel) {
      height: 0;
    }
  }

  .transitionMainWarp {
    flex: 1;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .transitionMain {
    position: absolute;
    left: 0;
    top: 0;
    width: 200%;
    height: 100%;
    display: flex;
    transition: left 0.3s ease-in-out;

    .insideWarp {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
}
</style>
