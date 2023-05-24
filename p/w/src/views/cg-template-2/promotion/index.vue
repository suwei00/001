<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import APIs from '@/http/blue-apis';
import { useRequest } from 'vue-request';

// 写死的静态页
const initList = [
  {
    flag: 'platform',
    src: '/promotion/platform_bg.png',
    id: '0'
  },
];

const router = useRouter();

const { data } = useRequest(APIs.getPromotionList)
const list = computed(() => {
  const arr = data.value?.map((item) => ({ src: item.static.list_web, ...item })) ?? []
  return [...initList, ...arr]
})

const itemClick = (item: any) => {
  const { id, flag } = item
  router.push({ path: `/promotion-detail/${id}/${flag}` })
}
</script>

<template>
  <div class="promotion">
    <ul class="list">
      <li v-for="item in list" :key="item.id" class="item" @click="itemClick(item)">
        <app-image v-if="item.id === '0'" class="img" :src="item.src" />
        <app-image v-else class="img" :src="item.src" is-google-cloud />
      </li>
    </ul>
  </div>

</template>
<script lang='ts'>
export default {
  name: 'Promotion'
}
</script>

<style lang="scss" scoped>
.promotion {
  @include webp($base-img-dir + '/promotion/bg.png');
  width: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: auto 740px;
  background-position-x: center;
  background-position-y: 141px;
  background-color: var(--cg-color-white5);
  padding-top: 21px;
  padding-bottom: 78px;


  .list {
    width: 1200px;
    margin: 0 auto;

    .item {
      width: 100%;
      // height: 200px;
      padding: 3px;
      margin-bottom: 16px;
      cursor: pointer;
      // background: linear-gradient(var(--cg-color-blue3), var(--cg-color-blue12), var(--cg-color-blue14), var(--cg-color-white));
      // border-radius: 12px;
      // filter: drop-shadow(0px 6px 30px var(--cg-color-grey11));
      transition: all ease .25s;

      .img {
        width: 100%;
        height: 100%;
        // border-radius: 12px;
        vertical-align: middle;
      }

      &:hover {
        scale: 1.05;
      }
    }
  }
}
</style>
