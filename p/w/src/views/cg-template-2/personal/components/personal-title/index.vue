<script setup lang='ts'>
import { CgDivider } from '@/components/cg-template-2'
defineProps<{
  title?: string,
  description?: string
}>()
</script>
<template>
  <div class="personal-title">
    <div class="main">
      <h5 class="title">{{ title }}</h5>
      <div class="bottom">
        <span class="description">{{ description }}</span>
        <div class="right">
          <slot name="right" />
        </div>
      </div>
    </div>
    <cg-divider />
  </div>

</template>
<script lang='ts'>
export default {
  name: 'PersonalTitle'
}
</script>

<style lang='scss' scoped>
.personal-title {
  width: 100%;
  margin-bottom: 15px;

  .main {
    margin-bottom: 13px;

    .title {
      color: var(--cg-color-blue12);
      font-weight: 700;
      font-size: var(--cg-font-24);
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;

      .description {
        color: var(--cg-color-grey1);
        font-size: var(--cg-font-13);
      }

      .right {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>