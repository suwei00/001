<script setup lang='ts'>
import { CgSelect, CgIcon, CgDivider } from '@/components/cg-template-2';
import { ref, computed } from 'vue'
import { useAppStore } from '@/store-pinia';
import { storeToRefs } from 'pinia';

const emit = defineEmits(['title'])
emit('title', 'HƯỚNG DẪN NẠP TIỀN')

const { isApp } = storeToRefs(useAppStore())

const tutorialData = [
  { id: "8", name: "QR Banking", len: 7, folder: 'qrbank' },
  { id: "1", name: "MoMo", len: 7, folder: 'momo' },
  { id: "2", name: "ZaloPay", len: 7, folder: 'zalo' },
  { id: "6", name: "ViettelPay", len: 7, folder: 'viettel' },
  { id: "9", name: "Offline", len: 8, folder: 'offline' },
]
const currentPayTypeId = ref('8')
const current = computed(() => tutorialData.find((item) => item.id === currentPayTypeId.value) ?? { name: '', folder: '', len: 0, id: '' })

const showRef = ref()
const switchPayType = (item: any) => {
  currentPayTypeId.value = item.id
  window.scrollTo && window.scrollTo(0, 0)
}
</script>
<template>
  <div class='deposit-tutorial'>
    <CgSelect v-model="currentPayTypeId" :data="tutorialData" rowKey="id" :defaultShow="false" selectLeftText="HỦY BỎ"
      selectRightText="XÁC NHẬN" type="noBorder" @onOk="switchPayType">
      <div class="current" :style="{ top: isApp ? '0' : 'var(--cg-px-88)' }">
        <div class="flex ai-c">
          <CgIcon style="margin-right: var(--cg-px-20);" width="68" :name="`i_paytype_${currentPayTypeId}`" />
          <span>{{ current.name }}</span>
        </div>
        <CgIcon width="16" name="i_arrowright" />
      </div>
      <template #item="{ data }">
        <div class="item">
          <div class="icon">
            <CgIcon width="74" :name="`i_paytype_${data.id}`" />
          </div>
          <span>{{ data.name }}</span>
        </div>
      </template>
    </CgSelect>
    <CgDivider class="CgDivider" :style="{ top: isApp ? '0' : 'var(--cg-px-188)' }" />

    <!-- 展示教程 -->
    <div ref="showRef" class="show">
      <div class="item" v-for="i, index in current.len" :key="index">
        <app-image :src="`/finance/deposit-tutorial/${current.folder}/${i}.png`" />
        <CgIcon class="item-icon" v-show="index < current.len - 1" width="66" name="i_big_arrow_down" />
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'DepositTutorial'
}
</script>

<style lang='scss' scoped>
.deposit-tutorial {}

.current {
  height: 100px;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font: var(--cg-font-text1);
  background-color: var(--cg-color-white);
  position: fixed;
  z-index: 1;
  width: 100%;
}

.CgDivider {
  width: 686px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.item {
  width: 100%;
  display: flex;
  align-items: center;

  .icon {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;
  }

  span {
    flex: 1;
  }
}

.show {
  width: 100%;
  padding: 42px 78px 50px;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;

    .item-icon {
      filter: drop-shadow(0px -4.125px 13.75px var(--cg-color-black5));
      margin: 60px 0;
    }

    img {
      width: 100%;
      filter: drop-shadow(0 20px 40px var(--cg-color-white11));
    }
  }
}
</style>