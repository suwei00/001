<script setup lang="ts">
import router from '@/router'
const searchInput = ref(null);

const tabList = [
  { value: '0', label: 'Toàn bộ' },
  { value: '1', label: 'Bạn bè' },
  { value: '2', label: 'Tin nhắn' }
]
const tab_type = ref(tabList[0].value)

const changeTab = () => {
  console.log(tab_type.value)
}
</script>

<template>
<!--  <cg-nav-header left-arrow>-->
  <cg-nav-header left-arrow>
    <template #right>
      <div :style="'width: var(--cg-px-622)'">
        <input placeholder="Tìm kiếm" v-model="searchInput" style="width:100%;" />
<!--        <van-field-->
<!--          v-model="searchInput"-->
<!--          clearable-->
<!--          placeholder="Tìm kiếm"-->
<!--        />-->
      </div>
    </template>
  </cg-nav-header>
  <div class="search">
    <cg-empty v-if="!searchInput" />
    <div class="search_result" v-else>
      <cg-tab v-model="tab_type" :list="tabList" @on-change="changeTab"></cg-tab>

      <div v-show="tab_type !== '2'">
        <div class="title">Bạn bè(3)</div>
        <div class="fried_list">
          <cg-list-item title="哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈" height="120" :has-margin="false" :border="'long'">
            <template #icon>
              <cg-avatar badge="avatar_online" size="88" />
            </template>
            <template #subTitle>
              <cg-icon name="vip_vip1" width="86" margin="13,0,0,0"></cg-icon>
            </template>
          </cg-list-item>
          <cg-list-item title="哈哈" height="120" :has-margin="false" :border="'long'">
            <template #icon>
              <cg-avatar badge="avatar_online" size="88" />
            </template>
            <template #subTitle>
              <cg-icon name="vip_vip1" width="86" margin="13,0,0,0"></cg-icon>
            </template>
          </cg-list-item>
          <cg-list-item title="哈哈" height="120" :has-margin="false" :border="'long'">
            <template #icon>
              <cg-avatar badge="avatar_online" size="88" />
            </template>
            <template #subTitle>
              <cg-icon name="vip_vip1" width="86" margin="13,0,0,0"></cg-icon>
            </template>
          </cg-list-item>

          <cg-high-txt :h-search="'插槽函数'">
            包含插槽函数的对象而非是数组，插槽函数的返回值同一个正常的渲染函数的返回值一样——并且在子组件中被访问时总是会被转化为一个 vnodes 数
          </cg-high-txt>
        </div>
      </div>
      <div v-show="tab_type !== '1'">
        <div class="title">Tin nhắn(3)</div>
        <div class="notice_list">
          <cg-list-item title="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" height="120" :has-margin="false" :border="'long'">
            <template #icon>
              <cg-avatar icon="avatar_notice" badge="avatar_notice" badge-size="30" />
            </template>
          </cg-list-item>
          <cg-list-item title="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" height="120" :has-margin="false" :border="'long'">
            <template #icon>
              <cg-avatar badge="avatar_edit" badge-size="40" icon="avatar_group" />
            </template>
  <!--          <template #link>-->
  <!--            <cg-badge :content="1" />-->
  <!--          </template>-->
          </cg-list-item>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search_result {
  .fried_list,
  .notice_list{
    margin-bottom: 20px;
  }
  .title {
    background-color: #ffffff;
    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    line-height: 30px;
    color: #7A7A7F;
    padding: 20px 0 0 32px;
  }
}
</style>
