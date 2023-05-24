<template>
  <div class="agent-report-sub">
    <personal-title title="BÁO BIỂU ĐẠI LÝ" description="" />
    <div class="flex ai-c crs-p" @click="$router.back()">
      <cg-icon width="12" name="i_back" />
      <span class="tip">{{ dataList.label }}</span>
    </div>
    <component :is="component" :data-list="dataList" />
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref } from 'vue'
import {
  CgIcon,
} from '@/components/cg-template-2';
import PersonalTitle from '../components/personal-title/index.vue'
import { useRouter, useRoute } from 'vue-router'

// 获取query参数
const route = useRoute()

const component = defineAsyncComponent(() => import(`./Subs_${route.query.field}.vue`))

const dataList = ref({
  ...route.query
})
</script>

<style lang="scss" scoped>
.tip {
  margin-left: 10px;
  font: var(--cg-font-text2);
  color: var(--cg-color-grey1);
}
</style>