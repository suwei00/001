<script lang="ts" setup>
// component

import Header from '~/components/Header.vue'
import showHeader from '~/utils/show-header'
import bgSrc66 from '~/assets/images/public/greyRight.png?preset=full'
import bgImage from '~/components/bgImage.vue'
import settop from '~/assets/images/my/tutorial/settop.png?preset=full'
import tu01 from '~/assets/images/my/tutorial/tu01.png?preset=full'
import tu02 from '~/assets/images/my/tutorial/tu002.png?preset=full'
import tu03 from '~/assets/images/my/tutorial/tu03.png?preset=full'
import tu04 from '~/assets/images/my/tutorial/tu04.png?preset=full'
import tu05 from '~/assets/images/my/tutorial/tu05.png?preset=full'
import tu06 from '~/assets/images/my/tutorial/tu06.png?preset=full'
import tu07 from '~/assets/images/my/tutorial/tu07.png?preset=full'
import tu08 from '~/assets/images/my/tutorial/tu08.png?preset=full'
import tu09 from '~/assets/images/my/tutorial/tu09.png?preset=full'
import tu10 from '~/assets/images/my/tutorial/tu10.png?preset=full'
import tu11 from '~/assets/images/my/tutorial/tu11.png?preset=full'
import c01 from '~/assets/images/my/tutorial/c01.png?preset=full'
import c02 from '~/assets/images/my/tutorial/c02.png?preset=full'
import c03 from '~/assets/images/my/tutorial/c03.png?preset=full'
import c04 from '~/assets/images/my/tutorial/c04.png?preset=full'
import c05 from '~/assets/images/my/tutorial/c05.png?preset=full'
import c06 from '~/assets/images/my/tutorial/c06.png?preset=full'
import c07 from '~/assets/images/my/tutorial/c07.png?preset=full'
import c08 from '~/assets/images/my/tutorial/c08.png?preset=full'
import c09 from '~/assets/images/my/tutorial/c09.png?preset=full'
import c10 from '~/assets/images/my/tutorial/c10.png?preset=full'
import c11 from '~/assets/images/my/tutorial/c11.png?preset=full'
import select from '~/assets/images/my/tutorial/select.png?preset=full'
const tutorList = [
  {
    icon: tu01,
    label: '微信话费快充',
    id: '3',
  },
  {
    icon: tu02,
    label: '微信话费慢充',
    id: '4',
  },
  {
    icon: tu03,
    label: '微信转银行卡',
    id: '21',
  },
  {
    icon: tu04,
    label: '支付宝话费快充',
    id: '6',
  },
  {
    icon: tu05,
    label: '支付宝话费慢充',
    id: '1',
  },
  {
    icon: tu06,
    label: '支付宝转银行卡',
    id: '22',
  },
  {
    icon: tu07,
    label: '银行转账',
    id: '16',
  },
  {
    icon: tu08,
    label: 'GOPAY',
    id: '2',
  },
  {
    icon: tu09,
    label: 'OKPAY',
    id: '18',
  },
  {
    icon: tu10,
    label: 'USDT充值',
    id: '12',
  },
  {
    icon: tu11,
    label: 'TOpay',
    id: '23',
  },

]
const route = useRoute()
const { isShowHeader } = showHeader()
const records = {
  channelId: route.query.channelId ?? '',
}
const selectPopVisivle = ref(false)
const onSelectPop = () => {
  selectPopVisivle.value = true
}
const name = ref('')
const setName = () => {
  console.log('records.channelId', records.channelId)
  if (records.channelId === '5')
    name.value = '支付宝话费慢充'
  else if (records.channelId === '7')
    name.value = '支付宝话费快充'
  else if (records.channelId === '14')
    name.value = 'USDT充值'
  else if (records.channelId === '10')
    name.value = '银行转账'
  else
    name.value = tutorList.find((item: any) => item.id === records.channelId)?.label.toString() || ''
  // console.log('name.value', name.value)
}

onMounted(() => {
  setName()
})
// 根据channelId匹配icon
const getIcon2 = (channelId: string) => {
  switch (channelId) {
    case '1':
      return tu05
    case '2':
      return tu08
    case '3':
      return tu01
    case '4':
      return tu02
    case '5':
      return tu05
    case '6':
      return tu04
    case '7':
      return tu04
    case '12':
      return tu10
    case '14':
      return tu10
    case '16':
      return tu07
    case '18':
      return tu09
    case '21':
      return tu03
    case '22':
      return tu06
    case '23':
      return tu11
    default:
      return tu07
  }
}
// 根据channelId匹配教程
const getTutorial = (channelId: string) => {
  switch (channelId) {
    case '1':
      return c05
    case '2':
      return c08
    case '3':
      return c01
    case '4':
      return c02
    case '5':
      return c05
    case '6':
      return c04
    case '7':
      return c04
    case '12':
      return c10
    case '14':
      return c10
    case '16':
      return c07
    case '18':
      return c09
    case '21':
      return c03
    case '22':
      return c06
    case '23':
      return c11
    default:
      return c07
  }
}
const selectItem = (item: any) => {
  name.value = item.label
  records.channelId = item.id
  selectPopVisivle.value = false
}
const onScroolTop = () => {
  // 需要控制的滚动条盒子
  const previewContract = document.getElementsByClassName('allContainer')[0]
  previewContract.scroll({
    left: 0,
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <Header v-if="isShowHeader" title="充值教程" />
  <div class="myList " @click="onSelectPop()">
    <ol>
      <li>
        <bgImage :key="records.channelId.toString()" class="myListIcon" :image="getIcon2(records.channelId.toString())" />
        <p>{{ name }}</p>
        <bgImage :image="bgSrc66" class="strong" />
      </li>
    </ol>
  </div>
  <div class="allContainer">
    <div class="settop">
      <bgImage :image="settop" @click="onScroolTop()" />
    </div>
    <div class="tutorial_cont ">
      <img loading="lazy" :src="getSupportImage(getTutorial(records.channelId as string))">
      <div class="pre-load">
        <img loading="lazy" :src="getSupportImage(c01)">
        <img loading="lazy" :src="getSupportImage(c02)">
        <img loading="lazy" :src="getSupportImage(c03)">
        <img loading="lazy" :src="getSupportImage(c04)">
        <img loading="lazy" :src="getSupportImage(c05)">
        <img loading="lazy" :src="getSupportImage(c06)">
        <img loading="lazy" :src="getSupportImage(c07)">
        <img loading="lazy" :src="getSupportImage(c08)">
        <img loading="lazy" :src="getSupportImage(c09)">
        <img loading="lazy" :src="getSupportImage(c10)">
        <img loading="lazy" :src="getSupportImage(c11)">
      </div>
    </div>
  </div>
  <van-popup v-model:show="selectPopVisivle" position="bottom" style="border-radius: 12px 12px 0px 0px;">
    <div class="popContent">
      <div class="pop_tit flex">
        <div class="cancelBut" @click="selectPopVisivle = false">
          取消
        </div>
        <div class="flex1 pop_cen">
          选择充值教程
        </div>
      </div>
      <ul>
        <li v-for="(item, index) in tutorList" :key="index" class="flex ai-c" @click="selectItem(item)">
          <bgImage :image="item.icon" class="pop_icon" />
          <p>{{ item.label }}</p>

          <bgImage v-if="records.channelId === item.id " :image="select" class="select_im" />
        </li>
      </ul>
    </div>
  </van-popup>
</template>

<style lang="scss" scoped>
.pre-load{
    width: 0;
    height: 0;
    overflow: hidden;
  }
.popContent {
  background: #FFFFFF;

  .pop_tit {
    height: 72px;
    background: #FFFFFF;
    box-shadow: 0px 9px 10px 0px rgba(0, 0, 0, 0.04);
    line-height: 72px;
    padding: 0 12px;
  }

  .cancelBut {
    font-size: 16px;
    font-weight: 400;
    color: #0091FF;
  }

  .pop_cen {
    font-size: 16px;
    font-weight: 400;
    color: #000000;
    text-align: center;
  }

  ul {
    li {
      padding: 0 12px;
      height: 48px;
      border-bottom: 1px solid #F6F6F6;

      .pop_icon {
        width: 32px;
        height: 32px;
        vertical-align: middle;
        margin-right: 6px;
      }

      p {
        vertical-align: middle;
        flex: 1;

      }
      .select_im{
        width: 17px;
        height: 12px;
      }
    }
  }
}

.myList {
  width: 100%;
  position: fixed;
  left: 0;

  ol {
    height: 44px;

    background: #FFFFFF;
    box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.04);
    position: relative;
    padding: 0 12px;

    li {
      width: 100%;
      min-height: 48px;
      border-bottom: 1px solid #F2F2F2;
      display: flex;
      align-items: center;

      &:last-child {
        border-bottom: none;
      }

      .myListIcon {
        width: 28px;
        height: 28px;
        margin-right: 6px;
      }

      p {
        font-size: 14px;
        font-weight: 400;
        color: #000000;
        flex: 1;
        width: 100%;
      }

      .strong {
        width: 11px;
        height: 16px;

      }
    }
  }
}
.allContainer{
  height: 100%;
  margin-top:49px;
  overflow-y: scroll;
  background: #FFFFFF;
  padding: 0 27px 80px 27px;
  .tutorial_cont {

  .cont_img {
    width: 100%;
  }

}
}
.settop{
  position: absolute;
  width: 44px;
  height: 44px;
  right: 20px;
  bottom: 40px;
  img{
    width: 44px;
    height: 44px;
  }
}
</style>

