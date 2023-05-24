<script lang="ts" setup>
import BankCardManage from './components/bankCardManage.vue'
import VirtualCurrencyManage from './components/virtualCurrencyManage.vue'
import Header from '~/components/Header.vue'

const contentRef: any = ref(null)
const crrActive = ref(1)
const tabsRef: any = ref(null)
const goToTab = (item: any) => {
  let styleStr = ''
  crrActive.value = item.name
  if (item.name === 1)
    styleStr = '0'

  else
    styleStr = '-100%'

  contentRef.value.style.left = styleStr
}

onMounted(() => {
  const TAB_ID = localStorage.getItem('TAB_ID')
  localStorage.removeItem('TAB_ID')
  goToTab({ name: Number(TAB_ID) === 1 ? 2 : 1 })
})
</script>

<template>
  <div class="transitionWarps">
    <Header title="账户管理" />
    <div class="transitionHead">
      <van-tabs ref="tabsRef" v-model:active="crrActive" animated @click-tab="goToTab">
        <van-tab title="银行卡管理" :name="1" />
        <van-tab title="数字货币管理" :name="2" />
      </van-tabs>
    </div>
    <div class="transitionMainWarp">
      <div ref="contentRef" class="transitionMain">
        <div class="insideWarp">
          <div v-if="crrActive === 1" class="inside">
            <BankCardManage />
          </div>
        </div>
        <div class="insideWarp">
          <div v-if="crrActive === 2" class="inside">
            <VirtualCurrencyManage />
          </div>
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
  background: #FAFAFA;

  .transitionHead {
    width: 100%;
    border-top: 1px solid #E5E5E5;

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

      .inside {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    }
  }
}
</style>
