<script setup lang="ts">
const list = ref([]);
const loading = ref(false);
const finished = ref(false);

const refresh = () => {
  console.log( "===refresh===" )
}

const loadMoreData = () => {
  setTimeout(() => {
    for (let i = 0; i < 30; i++) {
      list.value.push(list.value.length + 1);
    }
  }, 1000);
}

setTimeout(() => {
  //5s数据全部加载完成
  finished.value = true;
},5000)
</script>

<template>
  <div>
    <cg-list
      :loading="loading"
      :finished="finished"
      @refresh="refresh"
      @loadMoreData="loadMoreData"
     >
      <van-cell v-for="(item, index) in list" :key="index" :title="item" />
    </cg-list>
  </div>
</template>

<style lang="scss" scoped>
</style>
