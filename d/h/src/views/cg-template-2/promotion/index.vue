<script setup lang="ts">
import { computed } from 'vue';
import { useAppStore } from '@/store-pinia';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'

// 写死的静态页
const initList = [
  {
    flag: 'platform',
    static: {
      list_h5: '/promotion/platform_bg.png'
    },
    id: '0'
  },
];

const router = useRouter()
const appStore = useAppStore()
const { promotionList } = storeToRefs(appStore)
const allPromotionList = computed(() => [...initList, ...promotionList.value])
appStore.getPromotionList()

const handleItemClick = (i: any) => {
  const { id = '', flag = '' } = i;

  router.push(`/promotion-detail/${id}/${flag}`);
};
</script>

<script lang="ts">
export default {
  name: 'Promotion'
};
</script>

<template>
  <div class="promotion-view">
    <h2>KHUYẾN MÃI</h2>
    <ul class="promo-list scroll-y">
      <li v-for="i in allPromotionList" :key="i.id" class="promo" @click="handleItemClick(i)">
        <app-image :is-google-cloud="true" v-if="i.id !== '0'" :src="i.static.list_h5" />
        <app-image v-else :src="i.static.list_h5" />
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.promotion-view {
  overflow: hidden;
  color: var(--cg-color-black1);
  text-align: center;
  padding: 0 25px;
  height: 100%;
  display: flex;
  flex-direction: column;


  h2 {
    font: var(--cg-font-h2);
    margin: 28px auto;
  }

  .promo-list {
    flex: 1;

    .promo {
      width: 100%;
      margin-bottom: 40px;

      img {
        width: 100%;
      }
    }
  }
}
</style>
