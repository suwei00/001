<script lang="ts" setup>
import { useRoute } from 'vue-router'
import Header from '~/components/Header.vue'
import showHeader from '~/utils/show-header'
// 背景图
import bg1 from '~/assets/images/activity/bg1.png?preset=full'
const bgTwo = `url(${getSupportImage(bg1)})`

const urlBase = `${isDev() ? 'https://jlcs001.com' : location.origin}/upload`

const { isShowHeader } = showHeader()
const route = useRoute()
const { id } = route.query
const titleImg = ref('')
const h5_content = ref([])
const title = ref<string>('')// 标题
console.log(route.query)
if (id) {
  promoDetailRequest({
    id: id.toString(),
    flag: 'static',
  }).then((res: any) => {
    if (res.status)
      console.log(res.data)
    titleImg.value = res.data.static.title_h5
    title.value = res.data.config.title
    h5_content.value = res.data.config.h5_content
  })
}
</script>

<template>
  <div class="contentContainer">
    <Header v-if="isShowHeader" :key="title" :title="title" styles="color: #5D75A2;font-size: 17px;font-weight: 600;" />
    <div>
      <img loading="lazy" :src="`${urlBase}${titleImg}${canUseAvif() ? '.avif' : '.webp'}`" alt="">
      <div class="content">
        <div v-for="(src, index) in h5_content" :key="index" class="imgbox">
          <img loading="lazy" :src="`${urlBase}${src}${canUseAvif() ? '.avif' : '.webp'}`" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
    .contentContainer{
        height: 100%;
        overflow-y: scroll;
        background-image: v-bind(bgTwo);
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
    }
.content{
    padding: 7px 15px ;
    .changeIndex{
        display: flex;
        >div{
            flex:1;
            height: 50px;
            text-align: center;
            line-height: 50px;
        }
        .activeIndex{
            color: blue;
            font-weight: bold;
        }
    }
  .tables{
    position: relative;
    width: 100%;
    height: 500px;
    overflow: hidden;
    border: 2px solid red;
    margin: 30px 0;
    .apply{
        position: absolute;
        bottom: 0;
        width: 145px;
        left: 50%;
        margin-left: -75px;
    }
  }
 .imgbox{
    text-align: center;
    img{
        width: 100%;
    }
    margin-bottom: 15px;
 }
}
</style>

