<template>
  <div class="details">
    <DetailComponent />
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { defineAsyncComponent, provide, watch, inject } from 'vue';

const reloadPage = inject<() => void>('reloadPage');
const router = useRouter()
const route = useRoute()
const params = router.currentRoute.value.params;
const flag = params.flag as string;
const id = params.id as string;

provide('flag', flag);
provide('id', id);

type FlagType = 'cgcpbet' | 'deposit' | 'exam' | 'rescue' | 'static' | 'platform'
type ComponentsOptionType = {
  [key in FlagType]: any;
};

const componentsOption: ComponentsOptionType = {
  'cgcpbet': defineAsyncComponent(() => import(`./CgCpbet.vue`)),
  'deposit': defineAsyncComponent(() => import(`./Deposit.vue`)),
  'exam': defineAsyncComponent(() => import(`./Exam.vue`)),
  'rescue': defineAsyncComponent(() => import(`./Rescue.vue`)),
  'static': defineAsyncComponent(() => import(`./Static.vue`)),
  'platform': defineAsyncComponent(() => import(`./Platform.vue`)),
}

const DetailComponent = componentsOption[flag as FlagType]

watch(route, (a) => {
  reloadPage?.()
})
</script>
<script lang='ts'>
export default {
  name: 'PromotionDetail'
}
</script>

<style lang="scss" scoped>
.details {
  background-color: var(--cg-color-white5);
}
</style>