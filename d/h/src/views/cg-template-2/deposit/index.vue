<script setup lang='ts'>
import { CgHeader, CgIcon } from '@/components/cg-template-2';
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { useAppStore } from '@/store-pinia'
import { storeToRefs } from 'pinia';

const router = useRouter()
const { isApp } = storeToRefs(useAppStore())

const title = ref('')
const setTitle = (val: string) => {
  title.value = val
}

const isTutorial = computed(() => router.currentRoute.value.name === 'DepositTutorial')
const actionHandler = () => {
  if (isTutorial.value) return router.push('/customer-service')
  router.push('/deposit/tutorial')
}
</script>
<template>
  <div class='deposit' :style="{ paddingTop: isApp ? '0' : 'var(--cg-px-88)' }">
    <CgHeader>
      {{ title }}
      <template #actions>
        <cg-icon width="52" :name="isTutorial ? 'i_operator' : 'i_caption'" @click="actionHandler" />
      </template>
    </CgHeader>
    <div class="deposit-content">
      <router-view @title="setTitle"></router-view>
    </div>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'Deposit'
}
</script>

<style lang='scss' scoped>
.deposit {
  // position: absolute;
  // display: flex;
  // flex-direction: column;
  // height: 100%;
  width: 100%;
  // overflow: hidden;
  background-color: var(--cg-color-blue16);
  color: var(--cg-color-black1);

  .deposit-content {
    // flex: 1;
    overflow: auto;
  }
}
</style>