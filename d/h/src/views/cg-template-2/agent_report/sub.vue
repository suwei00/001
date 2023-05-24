<script lang="ts" setup>
import { defineAsyncComponent, ref, onMounted } from 'vue'
import { CgIcon, CgHeader } from '@/components/cg-template-2';
import { useRouter, useRoute } from 'vue-router'
// 获取query参数
const route = useRoute()
const q = Object.fromEntries(new URLSearchParams(route.params.type as string))

const comp = defineAsyncComponent(() => import(`./Subs_${q.field}.vue`))

const dataList = ref({
    ...q
})
</script>

<template>
    <router-view v-slot="{ Component }">
        <component :is="Component" v-show="Component" />
        <div class="agent-report-sub" v-show="!Component">
            <CgHeader>
                {{ dataList.label }}
            </CgHeader>
            <component :is="comp" :data-list="dataList" />
        </div>
    </router-view>
</template>
  

  
<style lang="scss" scoped>
.tip {
    margin-left: 10px;
    font: var(--cg-font-text2);
    color: var(--cg-color-grey1);
}
</style>