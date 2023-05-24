<script setup lang="ts">
const listItems = ref([]);
const itemHeight = ref(50);
const viewportHeight = ref(500);

const fatchData = () => {
  for (let i = 0; i < 3000; i++) {
    listItems.value.push({
      id: listItems.value.length,
      text: listItems.value.length + 1
    });
  }
}

onMounted(async () => {
  await fatchData()
})
</script>

<template>
  <div>
    <cg-virtualscroll
      :listItems="listItems"
      :itemHeight="itemHeight"
      :viewportHeight="viewportHeight"
    >
      <div v-for="item in listItems" :key="item.id" class="list-item">
        {{ item.text }}
      </div>
    </cg-virtualscroll>
  </div>
</template>

<style lang="scss" scoped>
</style>
