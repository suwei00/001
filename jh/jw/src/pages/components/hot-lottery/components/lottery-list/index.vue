<script setup lang='ts' name="lottery-list">
import activeBtn from '@images/home/hot-lottery/lottery-list/active-bg.png?preset=full'
import hotII from '@images/home/hot-lottery/lottery-list/hot.gif'
import hotIII from '@images/home/hot-lottery/lottery-list/hot.webp'
import k3II from '@images/home/hot-lottery/lottery-list/k3.gif'
import k3III from '@images/home/hot-lottery/lottery-list/k3.webp'
import pk10II from '@images/home/hot-lottery/lottery-list/pk10.gif'
import pk10III from '@images/home/hot-lottery/lottery-list/pk10.webp'
import sscII from '@images/home/hot-lottery/lottery-list/ssc.gif'
import sscIII from '@images/home/hot-lottery/lottery-list/ssc.webp'
import ll5II from '@images/home/hot-lottery/lottery-list/ll5.gif'
import ll5III from '@images/home/hot-lottery/lottery-list/ll5.webp'
import lucky28II from '@images/home/hot-lottery/lottery-list/lucky28.gif'
import lucky28III from '@images/home/hot-lottery/lottery-list/lucky28.webp'
import lhcII from '@images/home/hot-lottery/lottery-list/lhc.gif'
import lhcIII from '@images/home/hot-lottery/lottery-list/lhc.webp'
import trends from '@images/home/hot-lottery/lottery-list/trends.svg'
import trendPng from '@images/home/hot-lottery/lottery-list/trends.png?preset=full'

import hotI from '@images/home/hot-lottery/lottery-list/hot.png?preset=full'
import k3I from '@images/home/hot-lottery/lottery-list/k3.png?preset=full'
import pk10I from '@images/home/hot-lottery/lottery-list/pk10.png?preset=full'
import sscI from '@images/home/hot-lottery/lottery-list/ssc.png?preset=full'
import ll5I from '@images/home/hot-lottery/lottery-list/ll5.png?preset=full'
import lucky28I from '@images/home/hot-lottery/lottery-list/lucky28.png?preset=full'
import lhcI from '@images/home/hot-lottery/lottery-list/lhc.png?preset=full'

import lott1 from '@images/home/hot-lottery/lottery-list/lott1.png?preset=full'
import lott2 from '@images/home/hot-lottery/lottery-list/lott2.png?preset=full'
import lott3 from '@images/home/hot-lottery/lottery-list/lott3.png?preset=full'
import lott4 from '@images/home/hot-lottery/lottery-list/lott4.png?preset=full'
import lott5 from '@images/home/hot-lottery/lottery-list/lott5.png?preset=full'
import lott6 from '@images/home/hot-lottery/lottery-list/lott6.png?preset=full'
import lott7 from '@images/home/hot-lottery/lottery-list/lott7.png?preset=full'
import lott8 from '@images/home/hot-lottery/lottery-list/lott8.png?preset=full'
import lott9 from '@images/home/hot-lottery/lottery-list/lott9.png?preset=full'
import lott10 from '@images/home/hot-lottery/lottery-list/lott10.png?preset=full'
import lott11 from '@images/home/hot-lottery/lottery-list/lott11.png?preset=full'
import lott12 from '@images/home/hot-lottery/lottery-list/lott12.png?preset=full'
import lott13 from '@images/home/hot-lottery/lottery-list/lott13.png?preset=full'
import lott14 from '@images/home/hot-lottery/lottery-list/lott14.png?preset=full'
import lott15 from '@images/home/hot-lottery/lottery-list/lott15.png?preset=full'
import lott16 from '@images/home/hot-lottery/lottery-list/lott16.png?preset=full'
import lott17 from '@images/home/hot-lottery/lottery-list/lott17.png?preset=full'
import lott18 from '@images/home/hot-lottery/lottery-list/lott18.png?preset=full'
import lott19 from '@images/home/hot-lottery/lottery-list/lott19.png?preset=full'
import lott20 from '@images/home/hot-lottery/lottery-list/lott20.png?preset=full'
import lott21 from '@images/home/hot-lottery/lottery-list/lott21.png?preset=full'
import lott22 from '@images/home/hot-lottery/lottery-list/lott22.png?preset=full'
import lott23 from '@images/home/hot-lottery/lottery-list/lott23.png?preset=full'
import lott24 from '@images/home/hot-lottery/lottery-list/lott24.png?preset=full'
import lott25 from '@images/home/hot-lottery/lottery-list/lott25.png?preset=full'
import lott26 from '@images/home/hot-lottery/lottery-list/lott26.png?preset=full'
import lott27 from '@images/home/hot-lottery/lottery-list/lott27.png?preset=full'
import lott28 from '@images/home/hot-lottery/lottery-list/lott28.png?preset=full'
import lott29 from '@images/home/hot-lottery/lottery-list/lott29.png?preset=full'
import lott30 from '@images/home/hot-lottery/lottery-list/lott30.png?preset=full'
import lott31 from '@images/home/hot-lottery/lottery-list/lott31.png?preset=full'
import lott32 from '@images/home/hot-lottery/lottery-list/lott32.png?preset=full'
import lott33 from '@images/home/hot-lottery/lottery-list/lott33.png?preset=full'
import lott34 from '@images/home/hot-lottery/lottery-list/lott34.png?preset=full'
import lott35 from '@images/home/hot-lottery/lottery-list/lott35.png?preset=full'
import lott36 from '@images/home/hot-lottery/lottery-list/lott36.png?preset=full'
import lott37 from '@images/home/hot-lottery/lottery-list/lott37.png?preset=full'
import lott38 from '@images/home/hot-lottery/lottery-list/lott38.png?preset=full'
import lott39 from '@images/home/hot-lottery/lottery-list/lott39.png?preset=full'
import { ImageAttrs } from 'vite-plugin-image-presets'

// 统计有多少个11选5控制右边高度
const appStore = useAppStore()
const { isLotteryMaintain, token, isLogged } = $(storeToRefs(appStore))

const router = useRouter()
const lottList = ref([
  { label: '热门', path: 'hot', id: 'hot', i: hotI, ii: canUseWebp() ? hotIII : hotII },
  { label: '快3', path: 'k3', id: 'k3', i: k3I, ii: canUseWebp() ? k3III : k3II },
  { label: 'PK10', path: 'pk10', id: 'pk10', i: pk10I, ii: canUseWebp() ? pk10III : pk10II },
  { label: '时时彩', path: 'ssc', id: 'ssc', i: sscI, ii: canUseWebp() ? sscIII : sscII },
  { label: '六合彩', path: 'lhc', id: 'lhc', i: lhcI, ii: canUseWebp() ? lhcIII : lhcII },
  { label: '11选5', path: '115', id: 'll5', i: ll5I, ii: canUseWebp() ? ll5III : ll5II },
  { label: '幸运28', path: 'lucky28', id: 'lucky28', i: lucky28I, ii: canUseWebp() ? lucky28III : lucky28II },
])
const activeBtnUrl = computed(() => `url(${getSupportImage(activeBtn)})`)

// 彩票数据
// 计算时间差
const timeDiff = (start: number, end: number) => {
  const diff = end - start

  // 不允许负数
  if (diff < 0) {
    return {
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
    }
  }
  else {
    const day = Math.floor(diff / 1000 / 60 / 60 / 24) || 0
    const hour = Math.floor(diff / 1000 / 60 / 60 % 24) || 0
    const minute = Math.floor(diff / 1000 / 60 % 60) || 0
    const second = Math.floor(diff / 1000 % 60) || 0

    return {
      day,
      hour,
      minute,
      second,
    }
  }
}
const timestamp = useTimestamp({ offset: 10 })
const currentLott = ref('hot')
let inRequest = $ref(false)
const { data: lotteryData, run: runGetLotteryList } = useRequest(
  () => getLotteryList({ id: currentLott.value, limit: '2' }),
  {
    throttleInterval: 1000,
    onSuccess(list) {
      appStore.numOfLL5 = list.filter(l => l.name.includes('11选5')).length
      setTimeout(() => { inRequest = false }, 2000)
    },
  },
)
const timeDiffStr = (start: number, end: number) => {
  const { minute, second } = timeDiff(start, end)
  if (minute === 0 && second === 0 && !inRequest) {
    inRequest = true
    runGetLotteryList()
  }
  return `00:${padStart(`${minute}`, 2, '0')}:${padStart(`${second}`, 2, '0')}`
}

// 切换彩种
const changeLott = (item: any) => {
  currentLott.value = item.id
  runGetLotteryList()
}

const lottIcon: { [text: string]: any } = {
  id1: lott1,
  id2: lott2,
  id3: lott3,
  id4: lott4,
  id5: lott5,
  id6: lott6,
  id7: lott7,
  id8: lott8,
  id9: lott9,
  id10: lott10,
  id11: lott11,
  id12: lott12,
  id13: lott13,
  id14: lott14,
  id15: lott15,
  id16: lott16,
  id17: lott17,
  id18: lott18,
  id19: lott19,
  id20: lott20,
  id21: lott21,
  id22: lott22,
  id23: lott23,
  id24: lott24,
  id25: lott25,
  id26: lott26,
  id27: lott27,
  id28: lott28,
  id29: lott29,
  id30: lott30,
  id31: lott31,
  id32: lott32,
  id33: lott33,
  id34: lott34,
  id35: lott35,
  id36: lott36,
  id37: lott37,
  id38: lott38,
  id39: lott39,
}
// 根据彩种id跳转到对应的彩种投注页
const goToPage = (id: number) => {
  if (isLotteryMaintain !== 1)
    return
  const type = getTypeByID(id)
  switch (type) {
    case 'ssc':
    case 'll5':
    case 'pk10':
      router.push({ path: '/cg-lottery', query: { url: encodeURIComponent(`/play_center/sscPk10ll5/${id}`) } })
      break
    case 'k3':
      router.push({ path: '/cg-lottery', query: { url: encodeURIComponent(`/play_center/k3/${id}`) } })
      break
    case 'lucky28':
      router.push({ path: '/cg-lottery', query: { url: encodeURIComponent(`/play_center/lucky28/${id}`) } })
      break
    case 'lhc':
      router.push({ path: '/cg-lottery', query: { url: encodeURIComponent(`/play_center/lhc/${id}`) } })
      break
    default:
      break
  }
}
// 跳转走势图
const goTrendChart = (item: any) => {
  if (!isLogged) {
    loginPopup()
    return
  }
  const cpHost = getCpHost()
  if (isDev())
    openLink(`https://cp.jlcs001.com/trend-chart/${getTypeByID(item.id)}/${item.id}?t=${token}`)
  else
    openLink(`${cpHost}/trend-chart/${getTypeByID(item.id)}/${item.id}?t=${token}`)
}
const currentLottId = ref('')
// 不显示倒计时
const noCountdown = [1, 8, 14, 19, 27, 33]
</script>

<template>
  <div class="lottery-list">
    <div h-50px flex rounded-6px overflow-hidden mb-16px divide-x class="btns divide-#EBEBEB">
      <button
        v-for="item in lottList "
        :key="item.label" class="lott-btn w-154px flex flex-col items-center justify-center text-#515B7C"
        :class="{ active: currentLott === item.id || currentLottId === item.id }"
        @mouseover="currentLottId = item.id" @mouseout="currentLottId = ''" @click="changeLott(item)"
      >
        <img :src="currentLott === item.id || currentLottId === item.id ? item.ii : getSupportImage(item.i as ImageAttrs[])" w-24px alt="">
        <p class="text-13px leading-18px font-normal">
          {{ item.label }}
        </p>
      </button>
    </div>

    <ul class="hot-list">
      <li
        v-for="(item, index) in lotteryData" v-show="index < 3" :key="item.name" class="hot-item"
        :style="{ height: item.name.includes('11选5') ? `110px` : `150px` }"
        flex rounded-6px mb-16px px-20px pt-15px pb-12px justify-between
      >
        <div class="w-100%" pr-16px flex flex-col justify-center>
          <div class="left h-40px flex items-center justify-between" mb-13px>
            <div class="flex" w-656px justify-between>
              <!-- 玩法 期号  -->
              <div class="w-200px flex">
                <img src="" alt="">
                <jl-image :src="lottIcon[`id${item.id}`]" w-40px h-40px />
                <div ml-6px>
                  <h3 class="leading-22px text-#515B7C font-semibold">
                    {{ item.name }}
                  </h3>
                  <p class="leading-16px text-11px text-#597EF7 font-normal" text-left>
                    第{{ noCountdown.indexOf(item.id) === -1
                      ? `${get(item, `h[0].issue`)?.slice(0, 4)}-${get(item, `h[0].issue`)?.slice(4)}`
                      : get(item, `h[0].issue`) }}期
                  </p>
                </div>
              </div>

              <!-- 数字球 -->
              <ul flex items-center grow justify-start pl-80px>
                <div class="balls" flex items-center cursor-pointer relative>
                  <!-- 六合彩 -->
                  <template v-if="getTypeByID(item.id) === 'lhc'">
                    <Ball
                      v-for="(ball, ind) in split(get(item, 'h[0].res'), ',').slice(0, -1)" :key="ind" :num="ball"
                      :type="getTypeByID(item.id)"
                    />
                    <div h-48px mr-8px>
                      +
                    </div>
                    <Ball
                      :num="last(split(get(item, 'h[0].res'), ',')) ?? '-'"
                      :type="getTypeByID(item.id)"
                    />
                    <img src="@images/personal/arrow-b.png" w-12px ml-8px>
                  </template>
                  <!-- 其他 -->
                  <template v-else>
                    <Ball
                      v-for="(ball, ind) in split(get(item, 'h[0].res'), ',')" :key="ind" :num="Number(ball)"
                      :type="getTypeByID(item.id)"
                    />
                    <img src="@images/personal/arrow-b.png" w-12px ml-8px>
                  </template>

                  <!-- 历史开奖号码 -->
                  <ul class="ball-detail" :class="{ 'k3-detail': item.name.includes('快三') }">
                    <li
                      v-for="(histroy, indexH) in item.h" v-show="indexH < 5" :key="histroy.ts" text-left mb-10px flex justify-end
                      items-center :style="{ paddingRight: indexH > 0 ? '21px' : '' }"
                    >
                      <!-- 六合彩 -->
                      <template v-if="getTypeByID(item.id) === 'lhc'">
                        <div v-show="indexH > 0" h-48px class="date-num">
                          <div h-27px leading-27px>
                            {{ histroy.issue }}
                          </div>
                        </div>
                        <Ball
                          v-for="(ball, indexB) in split(get(histroy, 'res'), ',').slice(0, -1)" :key="indexB" :small="indexH > 0"
                          :num="ball" :type="getTypeByID(item.id)"
                        />
                        <div h-48px mr-8px>
                          +
                        </div>
                        <Ball
                          :num="last(split(get(histroy, 'res'), ',')) ?? '-'" :type="getTypeByID(item.id)"
                        />
                        <img v-show="indexH === 0" src="@images/personal/arrow-b.png" w-12px ml-8px>
                      </template>
                      <!-- 其他 -->
                      <template v-else>
                        <span v-show="indexH > 0" class="date-num">{{ histroy.issue }}</span>
                        <Ball
                          v-for="(ball, indexB) in split(get(histroy, 'res'), ',')" :key="indexB" :small="indexH > 0"
                          :num="Number(ball)" :type="getTypeByID(item.id)"
                        />
                        <img v-show="indexH === 0" src="@images/personal/arrow-b.png" w-12px ml-8px>
                      </template>
                    </li>
                  </ul>
                </div>
              </ul>
            </div>

            <!-- 倒计时 -->
            <div v-if="noCountdown.indexOf(item.id) === -1" class="text-right" w-120px>
              <p class="text-#515B7C font-semibold text-22px leading-30px">
                {{ timeDiffStr(timestamp, get(item, `d[0].t`) * 1000) }}
              </p>
              <p class="text-#515B7C text-11px">
                距 <span class="text-#597EF7">{{ get(item, `d[0].i`) }}</span> 期
              </p>
            </div>
          </div>
          <lottery-result
            :type="getTypeByID(item.id)"
            :result="split(get(item, `h[0].res`), ',').map((b:string) => +b)"
          />
        </div>

        <!-- 右侧按钮 -->
        <div class="right flex flex-col justify-between">
          <button :class="{ weihu: isLotteryMaintain !== 1 }" class="bet-btn" w-88px h-34px @click="goToPage(item.id)">
            <img v-if="(isLotteryMaintain === 1)" src="@images/home/hot-lottery/lottery-list/cgarrow.svg">
            {{ isLotteryMaintain === 1 ? '立即投注' : '维护中...' }}
          </button>

          <button
            class="trends-btn w-88px h-34px leading-34px text-13px border-solid border-1px border-#E2E2E2" flex
            justify-center items-center @click="goTrendChart(item)"
          >
            <img :src="trends" w-18px h-18px mr-1px mt--1px>
            <img :src="getSupportImage(trendPng)" w-18px h-18px>
            <span>完整走势</span>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang='scss' scoped>
.lottery-list {
  width: 921px;
}

.btns {
  background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 44%, #F5F6FD 67%, #D9D9D9 100%);
  box-shadow: 0px 2px 4px 1px rgba(86, 122, 254, 0.3);
}

.lott-btn {
  font-weight: 600;
  position: relative;
}

// .lott-btn::after {
//   content: '';
//   position: absolute;
//   bottom: 0;
//   left: 50%;
//   transform: translateX(-50%);
//   width: 52px;
//   height: 3px;
//   background: #9AA4C2;
//   border-radius: 10px 10px 0px 0px;
// }

.lott-btn.active {
  // background: linear-gradient(180deg, #96AEFF 0%, #96AEFF 18%, #597EF7 56%, #597EF7 100%);
  background: v-bind(activeBtnUrl);
  background-size: cover;
  color: white;
  text-shadow: 0px 3px 6px #092386;

  &:after {
    background: #597EF7;
  }
}

.hot-item {
  background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 27%, #FFFFFF 87%, #F0F0F0 100%);
  box-shadow: 0px 2px 4px 1px rgba(86, 122, 254, 0.3);
  &:hover{
    border: 1px solid #597EF7;
  }
}

.prize {
  background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 16%, #FFFFFF 90%, #EBEBEB 100%);
  box-shadow: 0px 2px 4px 1px rgba(86, 122, 254, 0.3);
}

.prize-top {
  background: linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 11%, #F5F8FF 24%, #F5F8FF 33%, #FFFFFF 60%, #96AEFF 100%);
}

.recommend {
  background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 16%, #FFFFFF 90%, #EBEBEB 100%);
  box-shadow: 0px 2px 4px 1px rgba(86, 122, 254, 0.3);
}

.bet-btn {
  font-size: 13px;
  border-radius: 6px;
  color: #fff;
  background: linear-gradient(180deg, #FF7000 0%, #FF4500 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  img {
    width: 0;
    height: 14.36px;
    margin-right: 3.64px;
    opacity: 0;
    transition: all 0.2s ease;
  }

  &:hover {
    background: linear-gradient(180deg, #FF7000 0%, #F52803 100%);

    img {
      opacity: 1;
      width: 14.36px;
    }
  }
}
.weihu{
  filter: grayscale(1);
    cursor: not-allowed;
    &:hover {
      scale: 1;
    }
}

.trends-btn {
  background: linear-gradient(180deg, #F2F7FB 0%, #FEFEFE 100%);
  transition: all 0.2s ease;
  position: relative;
  margin-bottom: 1.6px;

  img:nth-of-type(2) {
    position: absolute;
    left: 7.4px;
    top: 6.3px;
    opacity: 0;
    transition: all 0.2s ease;
  }

  &:hover {
    background: linear-gradient(180deg, #96AEFF 0%, #597EF7 100%);
    color: #fff;

    img:nth-of-type(2) {
      opacity: 1;
    }
    img:nth-of-type(1) {
      visibility: hidden;
    }
  }
}

.balls {
  // position: relative;
  &:hover {
    .ball-detail {
      display: block;
    }
  }
}

.ball-detail {
  padding: 5px 12px 0 18px;
  position: absolute;
  top: -5px;
  right: -12px;
  background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 82%, #E7E6E6 100%);
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: none;
  animation: showing 0.35s ease;
  overflow: hidden;
  z-index: 5;
}

.k3-detail {
  top: -2.5px;
}

.date-num {
  font-size: 12px;
  font-family: $jl-font;
  font-weight: 400;
  color: #6D7278;
  display: inline-block;
  text-align: left;
  margin-right: 10px;
}

@keyframes showing {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
