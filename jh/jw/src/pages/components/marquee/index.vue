<script setup lang='ts' name="marquee">
// https://vue3-marquee.vercel.app/examples.html
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import noticeImg from '~/assets/images/home/notice/notice.png?preset=full'
import noticeThumb from '~/assets/images/home/notice/notice.png?preset=thumbnail&src'

const { list } = defineProps<{
  list: Array<{
    id: string
    title: string
    content: string
    redirect: number
    redirect_url: string
    state: string
    seq: string
    created_at: number
    created_uid: string
    created_name: string
    updated_at: number
    updated_name: string
    prefix: string
  }>
}>()
const emit = defineEmits(['checkMarquee'])
const clickHandler = (i: number) => {
  emit('checkMarquee', i)
}
</script>

<template>
  <div class="marquee">
    <jl-image class="notice" :src="noticeImg" :thumb="noticeThumb" />
    <Vue3Marquee :duration="200" pause-on-hover ml-9px>
      <span
        v-for="(item, index) in list" :key="index" class="word-style word marquee-text" mr-30px cursor-pointer
        @click="clickHandler(index)" v-html="`${filterXSS(item.title)}:  ${filterXSS(item.content)}`"
      />
    </Vue3Marquee>
    <span class="more" @click="clickHandler(0)">更多</span>
  </div>
</template>

<style lang="scss" scoped>
.marquee {
  width: 1300px;
  margin: 20px auto 0;
  height: 40px;
  line-height: 40px;
  color: $text-primary;
  font-size: 15px;
  background: linear-gradient(180deg, #FFFFFF 0%, #F2F7FB 65%, #FDFDFF 100%);
  box-shadow: 0px 2px 8px 1px rgba(86, 122, 254, 0.3);
  opacity: 1;
  border: 2px solid #FFFFFF;
  border-radius: 20px;
  display: flex;
  align-items: center;

  :deep(.notice) {
    width: 68px;
    height: 80px;
  }

  .marquee-text {
    font-size: 15px;
    color: #515B7C;
    text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  }

  .more {
    margin-left: 10px;
    margin-right: 6px;
    width: 68px;
    height: 28px;
    line-height: 28px;
    border-radius: 14px;
    color: #597EF7FF;
    font-size: 13px;
    cursor: pointer;
    user-select: none;
    border: 1px solid #597EF7;
    &:hover{
      background-color: #597EF7;
      color: white;
    }
  }
}
</style>
