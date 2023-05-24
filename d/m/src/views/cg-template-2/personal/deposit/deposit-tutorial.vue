<script setup lang='ts'>
import { ref, computed } from 'vue'
import { CgContainerHead, CgContainer, CgRadio, CgIcon, CgDivider, CgScrollBar } from '@/components/cg-template-2'

interface Props {
  close: () => void
}
defineProps<Props>()

const tutorialData = [
  { id: "8", name: "QR Banking", len: 6, folder: 'qrbank' },
  { id: "1", name: "MoMo", len: 6, folder: 'momo' },
  { id: "2", name: "ZaloPay", len: 6, folder: 'zalo' },
  { id: "6", name: "ViettelPay", len: 6, folder: 'viettel' },
  { id: "9", name: "Offline", len: 7, folder: 'offline' },
]
const currentIndex = ref(0)
const current = computed(() => tutorialData[currentIndex.value])

const scrollBarRef = ref()
const switchId = (index: number) => {
  currentIndex.value = index
  scrollBarRef.value.toTop()
}
</script>
<template>
  <CgContainer class="deposit-tutorial" type="popup" width="800" radius="12">
    <template #content>
      <CgContainerHead>
        <template #center>
          <span style="font-size: 17px;">HƯỚNG DẪN NẠP TIỀN</span>
        </template>
        <template #right>
          <CgIcon width="20" class="pointer" name="i_grey_close" @click="close" />
        </template>>
      </CgContainerHead>
      <div class="body">
        <CgRadio @onChoose="switchId" v-model="currentIndex" type="tutorial" :list="tutorialData" v-slot="{ data }">
          <div class="types">
            <cg-icon style="margin-right: 6px;" width="30" :name="`i_paytype_${data.id}`" />
            <span>{{ data.name }}</span>
          </div>
        </CgRadio>
      <!--   <div class="title">
          Hướng Dẫn Đồ Họa
        </div> -->
        <CgDivider margin="40px 0 14px 0" />
        <div class="tutorial-wrapper">
          <cg-scroll-bar ref="scrollBarRef">
            <div class="item" v-for="i, index in current.len" :key="index">
              <app-image :src="`/personal/deposit-tutorial/${current.folder}/${current.folder}${i}.png`" />
              <CgIcon class="item-icon" v-show="index < current.len - 1" width="33" name="i_big_arrow_down" />
            </div>
          </cg-scroll-bar>
        </div>
      </div>
    </template>
  </CgContainer>
</template>
<script lang='ts'>
export default {
  name: 'DepositTutorial'
}
</script>

<style lang='scss' scoped>
.deposit-tutorial {
  color: var(--cg-color-grey1);

  .body {
    padding: 27px 30px 30px;

    .types {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 140px;
    }

    .title {
      width: 100%;
      text-align: center;
      margin-top: 15px;
      font: var(--cg-font-text2);
    }

    .tutorial-wrapper {
      width: 100%;
      height: 434px;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;

        .item-icon {
          filter: drop-shadow(0px 1px 5px var(--cg-color-black7));
          margin: 20px 0;
        }

        img {
          width: 100%;
          filter: drop-shadow(0 5px 10px var(--cg-color-white16));
        }
      }
    }
  }
}
</style>