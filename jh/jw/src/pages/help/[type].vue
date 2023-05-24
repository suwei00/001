<script setup lang='ts' name="help">
import helpIcon from '@images/help/help.png?preset=full'
import gameIcon from '@images/help/game.png?preset=full'
import corporateIcon from '@images/help/corporate.png?preset=full'
import contactIcon from '@images/help/contact.png?preset=full'

import register from './components/register/index.vue'
import deposit from './components/deposit/index.vue'
import withdraw from './components/withdraw/index.vue'
import transfer from './components/transfer/index.vue'
import application from './components/application/index.vue'
import browser from './components/browser/index.vue'
import ahTutorial from './components/ah-tutorial/index.vue'
import lottery from './components/lottery/index.vue'
import gameType from './components/game-type/index.vue'
import responsibility from './components/responsibility/index.vue'
import about from './components/about/index.vue'
import terms from './components/terms/index.vue'
import privacy from './components/privacy/index.vue'
import service from './components/service/index.vue'

const { type } = defineProps<{ type: string }>()

const helpNavs = [
  {
    title: '帮助指南',
    icon: getSupportImage(helpIcon),
    children: [
      { name: '注册', path: 'register' },
      { name: '充值', path: 'deposit' },
      { name: '提现', path: 'withdraw' },
      { name: '转账', path: 'transfer' },
      { name: '优惠申请', path: 'application' },
      { name: '浏览器', path: 'browser' },
      { name: '防劫持教程', path: 'ah-tutorial' },
    ],
  },
  {
    title: '游戏问题',
    icon: getSupportImage(gameIcon),
    children: [
      { name: '彩票问题', path: 'lottery' },
      { name: '游戏类型', path: 'game-type' },
    ],
  },
  {
    title: '企业事务',
    icon: getSupportImage(corporateIcon),
    children: [
      { name: '博彩责任', path: 'responsibility' },
      { name: '关于我们', path: 'about' },
      { name: '规则条款', path: 'terms' },
      { name: '隐私保护', path: 'privacy' },
    ],
  },
  {
    title: '联系我们',
    icon: getSupportImage(contactIcon),
    children: [],
  },
]

const category = useRouteQuery('category')
const router = useRouter()
// 切换组件
const activeComponent = computed(() => type)
const switchComponent = (path: string) => {
  router.push(`/help/${path}`)
}
// 切换分类
const activeIndex = computed(() => Number(category.value))
const switchNav = (i: number) => {
  category.value = i.toString()
  if (i.toString() === '3') {
    const t = setTimeout(() => {
      router.push('/help/service?category=3')
      clearTimeout(t)
    }, 10)
  }
}
</script>

<template>
  <div pt-20px pb-120px>
    <div id="help">
      <nav>
        <div v-for="(nav, index) in helpNavs" :key="index" class="category" @click="switchNav(index)">
          <h4>
            <img :src="nav.icon" alt="">
            <span :style="{ color: activeIndex === index ? '#53C5FF' : '#333' }">{{ nav.title }}</span>
          </h4>
          <ul :style="{ height: activeIndex === index ? `${nav.children.length * 37 + 18}px` : '0' }">
            <li
              v-for="(item) in nav.children" :key="item.path" :class="{ current: activeComponent === item.path }"
              @click="switchComponent(item.path)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </nav>
      <div class="view-wrapper">
        <!-- <Component :is="Component" /> -->
        <register v-if="type === 'register'" />
        <deposit v-else-if="type === 'deposit'" />
        <withdraw v-else-if="type === 'withdraw'" />
        <transfer v-else-if="type === 'transfer'" />
        <application v-else-if="type === 'application'" />
        <browser v-else-if="type === 'browser'" />
        <ah-tutorial v-else-if="type === 'ah-tutorial'" />
        <lottery v-else-if="type === 'lottery'" />
        <game-type v-else-if="type === 'game-type'" />
        <responsibility v-else-if="type === 'responsibility'" />
        <about v-else-if="type === 'about'" />
        <terms v-else-if="type === 'terms'" />
        <privacy v-else-if="type === 'privacy'" />
        <service v-else-if="type === 'service'" />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
#help {
  width: 1200px;
  margin: 0 auto;
  background: #FFFFFF;
  box-shadow: 0px 0px 12px 1px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  display: flex;
  font-size: 15px;
}

nav {
  width: 241px;
  padding: 39px 41px 100px 40px;

  .category {
    margin-bottom: 35px;

    h4 {
      display: flex;
      align-items: center;
      font-family: $jl-font;
      font-weight: bold;
      font-weight: 600;
      color: #333333;
      cursor: pointer;

      img {
        width: 20px;
        height: 20px;
        margin-right: 8px;
      }
    }

    ul {
      height: 0;
      overflow: hidden;
      transition: all 0.35s ease;

      li {
        width: 160px;
        height: 30px;
        text-align: left;
        margin-bottom: 7px;
        padding: 4px 28px 5px;
        cursor: pointer;
      }

      li:nth-of-type(1) {
        margin-top: 18px;
      }

      .current {
        background: #F3F9FE;
        border-radius: 3px;
        color: #597EF7;
      }
    }
  }
}

.view-wrapper {
  flex-grow: 1;
  border-left: 1px solid #EFEFEC;
}
</style>

<route lang="yaml">
meta:
  layout: main
</route>

