<template>
  <div class="divider"><cg-divider /></div>
  <menu>
    <template v-for="item in props.menuList" :key="item.icon">
      <router-link :to="item.path" custom v-slot="{ navigate, isActive }">
        <li class="item" @click="navigate" :class="{ active: isActive }">
          <div class="micon">
            <CgBadge v-if="item.badge" :value="item.badge > 99 ? '99+' : item.badge" >
              <cg-icon :name="item.icon" :width="30" :height="30" />
            </CgBadge>
            <cg-icon v-else :name="item.icon" :width="30" :height="30" />
          </div>
          <div class="label" v-text="item.label"></div>
        </li>
      </router-link>
    </template>
  </menu>
</template>

<script setup lang="ts">
import { CgIcon, CgDivider,CgBadge } from '@/components/cg-template-2';
const props = defineProps({
  menuList: Array<any>
});
</script>

<script lang="ts">
export default {
  name: 'MenuList'
};
</script>

<style lang="scss" scoped>
.divider {
  padding: 0 20px;
}
menu {
  padding: 12px 0;
  margin: 0;
  list-style: none;
  li.item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 46px;
    line-height: 46px;
    padding: 0px 10px 0 20px;
    cursor: pointer;
    position: relative;
    .micon {
      width: 30px;
      margin-right: 12px;
      :deep(.is_fi) {
        top: 0px;
        right: 10px;
      }
    }
    .label {
      flex: 1;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      text-align: left;
      font: var(--cg-font-text);
      line-height: var(--cg-font-17);
      color: var(--cg-color-grey1);
    }
    &.active,
    &:hover {
      background: var(--cg-color-white5);
      .label {
        color: var(--cg-color-blue12);
        font-weight: 700;
      }
    }
    &.active::before, &:hover::before {
      content: '';
      width: 3px;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: linear-gradient(180deg, var(--cg-color-blue3) 0%, var(--cg-color-blue12) 100%);
    }
  }
}
</style>
