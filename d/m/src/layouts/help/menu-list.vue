<template>
  <ul class="help">
    <template v-for="(item, index) in props.menuList" :key="item.icon">
      <li class="item" @click="navigate(item, index)" :class="{ ul_active: parentActive === index, itemCss: index === 0 }">
        <div class="micon">
          <cg-icon :name="item.icon" :width="30" :height="30" />
          <div class="label" v-text="item.label"></div>
        </div>
        <menu>
          <ul class="child-ul" v-show="item.show">
            <li class="child-item" :class="{ active: childIndex == childActive }" v-for="(item, childIndex) in item.childList" :key="childIndex" @click.stop="changeMenuChild(index, childIndex)">
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </menu>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { contentList, leftMenuList } from '@/views/cg-template-1/help/mock';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { CgIcon, CgDivider } from '@/components/cg-template-2';

const props = defineProps({
  menuList: Array<any>
});

const router = useRouter();
const parentActive = ref<any>(-1);
const childActive = ref<any>(-1);
const rightContent = ref<string>('');
const navigate = (item: any, index: number): void => {
  childActive.value = null;
  parentActive.value = index;
  props.menuList?.forEach(data => {
    data.show = false;
  });
  item.show = true;
};
const changeMenuChild = (index: number, childIndex: number): void => {
  childActive.value = childIndex;
  rightContent.value = contentList[index][childIndex];
  router.push(`/help/${index}/${childIndex}`);
};

const route = useRoute();
const updateMenuPosition = () => {
  let category = +window.location.pathname.slice(6, 7);
  let subclass = +window.location.pathname.slice(8, 9);
  parentActive.value = category;
  childActive.value = subclass;
  const curMenu = props.menuList[category];
  props.menuList?.forEach(data => {
    data.show = false;
  });
  if (curMenu) {
    curMenu.show = true;
  }
};
onMounted(() => {
  updateMenuPosition();
});
watch(router.currentRoute, val => {
  if (/^\/help\//.test(val.path)) {
    updateMenuPosition();
  }
});
</script>

<script lang="ts">
export default {
  name: 'MenuList'
};
</script>

<style lang="scss" scoped>
.help {
  font: var(--cg-font-text2);
  color: var(--cg-color-grey1);
  .micon {
    height: 42px;
    padding: 0 0 0 11px;
    display: flex;
    align-items: center;
    .label {
      padding-left: 4px;
      cursor: pointer;
      &:hover {
        color: var(--cg-color-red3);
        font: var(--cg-font-text2);
      }
    }
  }
  .itemCss {
    padding: 28px 0 0 0;
  }
  .ul_active {
    .label {
      // margin-left: 2px;
      color: var(--cg-color-red3);
      font: var(--cg-font-text2);
    }
  }
  menu {
    padding: 0;
    margin: 0;
    list-style: none;
    font: var(--cg-font-text4);
    .child-item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 32px;
      line-height: 32px;
      padding: 0 0 0 40px;
      cursor: pointer;
      position: relative;
      font-size: 15px;
      &.active,
      &:hover {
        background: var(--cg-color-white5);
        font: var(--cg-font-text1);
        color: var(--cg-color-blue12);
      }
      &.active::before {
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
}
</style>
