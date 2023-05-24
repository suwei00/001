<script setup lang='ts' name="stpage">
import bg from '@images/activity/detail_bg.png?preset=full'

const route = useRoute()
const { id, flag } = route.query

const { data } = useRequest(() => getPromotionDetail({ id: id?.toString(), flag: flag?.toString() }))

// 活动banner
const banner = computed(() => data.value?.static.title_web ?? '')
// 活动规则
const rules = computed(() => data.value?.config.web_content ?? [])
</script>

<template>
  <section :style="getBackgroundImgObj(bg)">
    <jl-cloud-image :src="banner" class="banner" use-bg />
    <!-- 活动规则 -->
    <jl-cloud-image v-for="(rule, i) in rules" :key="i" w="1300px" class="content" :src="rule" />
  </section>
</template>

<style lang='scss' scoped>
section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: 100%;
  background-repeat: repeat-y;

  .banner {
    max-width: 1920px;
    min-width: 1400px;
    width: 100%;
    height: 600px;
  }

  .content {
    width: 1300px;
    height: auto;
    margin-bottom: 30px;
  }
}
</style>

<route lang="yaml">
meta:
  layout: main
</route>
