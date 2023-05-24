<script setup lang="ts">
const route = useRoute();
const active = ref(0);
const tabs = ref([
  {
    select: "",
    icon: "chat",
    label: "CHAT",
    path: "/",
  },
  {
    select: "",
    icon: "frlist",
    label: "DANH BẠ",
    path: "/friend"
  },
  {
    select: "",
    icon: "mine",
    label: "CÁ NHÂN",
    path: "/profile",
  },
]);

watch(
  route,
  () => {
    const index = computed(() => tabs.value?.findIndex(item => item.path === route.fullPath));
    active.value = index.value;
  },
  { immediate: true }
);
</script>

<template>
  <div class="cg_tab_bar">
    <div
      class="sticky shadow"
    >
      <VanTabbar
        v-model="active"
        :border="false"
        :fixed="false"
        style="
          --van-tabbar-background: transparent;
          --van-tabbar-item-active-background: transparent;
        "
      >
        <VanTabbarItem v-for="item in tabs" :to="item.path" :key="item.path">
          <template #icon>
            <cg-icon name="icon_actchat" v-if="item.icon === 'chat' && active === 0" />
<!--            <cg-icon name="icon_chat" v-else-if="item.icon === 'chat'" />-->
<!--            <cg-badge content="73" max="99" :show-zero="false" location="top-right"-->
            <cg-badge content="73" max="99" :show-zero="false" location="top-right" v-else-if="item.icon === 'chat'">
              <cg-icon name="icon_chat" />
            </cg-badge>

            <cg-icon name="icon_actfrlist" v-if="item.icon === 'frlist' && active === 1" />
            <cg-icon name="icon_frlist" v-else-if="item.icon === 'frlist'" />
            <cg-icon name="icon_actmine" v-if="item.icon === 'mine' && active === 2" />
            <cg-icon name="icon_mine" v-else-if="item.icon === 'mine'" />
          </template>
          {{ item.label }}
        </VanTabbarItem>
      </VanTabbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cg_tab_bar {
  .sticky {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 100;
  }
  .shadow {
    background: #F7F8FA;
    mix-blend-mode: normal;
    backdrop-filter: blur(54.364px);
    box-shadow: 0px -1px 0px rgba(79, 78, 78, 0.15);
    //box-shadow: 0px -1px 6px 0px rgba(0, 0, 0, 0.05);
  }
  ::v-deep(.van-tabbar) {
    > :first-of-type {}
    > :last-of-type {}
  }
}
</style>
