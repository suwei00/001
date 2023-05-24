<script lang="ts" setup>
// component
import { contactList } from '../static'
import Header from '~/components/Header.vue'
import bgImage from '~/components/bgImage.vue'
import routerBackHook from '~/hooks/routerBackHooks'
import bghui from '~/assets/images/public/minGreyRight.png?preset=full'
// static
const { goTo } = routerBackHook()

const go = (item: any) => {
  goTo(item.path)
}
</script>

<template>
  <div class="help_guide cent-bg">
    <Header title="联系我们" />
    <div class="setlist help_list cent-top">
      <ul class="mylist_cent">
        <li v-for="(item, index) in contactList" :key="index" class="list_li" @click="go(item)">
          <p>{{ item.label }}</p>
          <bgImage :image="bghui" class="strong" />
        </li>
      </ul>
    </div>
  </div>
</template>

  <style lang="scss" scoped>
    @import '~/styles/pub_main.scss';
  </style>

