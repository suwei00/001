<script setup lang="ts">
import ball1 from '@images/home/hot-lottery/lottery-list/ball1.svg'
import ball2 from '@images/home/hot-lottery/lottery-list/ball2.svg'
import ball3 from '@images/home/hot-lottery/lottery-list/ball3.svg'
import ball4 from '@images/home/hot-lottery/lottery-list/ball4.svg'
import ball5 from '@images/home/hot-lottery/lottery-list/ball5.svg'
import ball6 from '@images/home/hot-lottery/lottery-list/ball6.svg'
import ball7 from '@images/home/hot-lottery/lottery-list/ball7.svg'
import ball8 from '@images/home/hot-lottery/lottery-list/ball8.svg'
import ball9 from '@images/home/hot-lottery/lottery-list/ball9.svg'
import ball10 from '@images/home/hot-lottery/lottery-list/ball10.svg'

import dice1 from '@images/home/hot-lottery/lottery-list/dice1.png?preset=full'
import dice2 from '@images/home/hot-lottery/lottery-list/dice2.png?preset=full'
import dice3 from '@images/home/hot-lottery/lottery-list/dice3.png?preset=full'
import dice4 from '@images/home/hot-lottery/lottery-list/dice4.png?preset=full'
import dice5 from '@images/home/hot-lottery/lottery-list/dice5.png?preset=full'
import dice6 from '@images/home/hot-lottery/lottery-list/dice6.png?preset=full'

import ppball from '@images/home/hot-lottery/lottery-list/purple-ball.png?preset=full'
import redball from '@images/home/hot-lottery/lottery-list/red-ball.png?preset=full'
import blueball from '@images/home/hot-lottery/lottery-list/blue-ball.png?preset=full'
import greenball from '@images/home/hot-lottery/lottery-list/green-ball.png?preset=full'

const props = defineProps<{
  type?: string
  num: number | string // menu3 玩法信息 包含 fn place subs
  small?: boolean
}>()

const ballList: { [text: string]: string } = {
  b1: ball1,
  b2: ball2,
  b3: ball3,
  b4: ball4,
  b5: ball5,
  b6: ball6,
  b7: ball7,
  b8: ball8,
  b9: ball9,
  b10: ball10,
}
const diceList: { [text: string]: string } = {
  d1: getSupportImage(dice1),
  d2: getSupportImage(dice2),
  d3: getSupportImage(dice3),
  d4: getSupportImage(dice4),
  d5: getSupportImage(dice5),
  d6: getSupportImage(dice6),
}
const lhcBallList: { [text: string]: string } = {
  red: getSupportImage(redball),
  blue: getSupportImage(blueball),
  green: getSupportImage(greenball),
}
</script>

<template>
  <template v-if="!small">
    <div
      v-if="type === 'k3'" class="ball" :style="{ backgroundImage: `url(${diceList[`d${Number(props.num)}`]})` }"
      w-35px h-35px mr-6px
    />
    <div
      v-else-if="type === 'pk10'" class="ball"
      :style="{ backgroundImage: `url(${ballList[`b${Number(props.num)}`]})` }" w-27px h-27px leading-27px rounded-full
      text-center mr-2px
    />
    <div v-else-if="type === 'lhc'">
      <div
        :style="{ backgroundImage: `url(${lhcBallList[getLhcBall(num.toString())]})` }"
        bg-contain w-27px h-27px leading-27px rounded-full text-center mr-6px block text-black font-black select-none
      >
        {{ num }}
      </div>
      <div w-27px text-center style="color:#515B7C;">
        {{ getZodiac(num.toString()) }}
      </div>
    </div>
    <div
      v-else :style="{ backgroundImage: `url(${getSupportImage(ppball)})` }" w-27px h-27px leading-27px rounded-full
      text-center mr-2px block text-black font-black select-none
    >
      {{ num }}
    </div>
  </template>
  <template v-else>
    <div
      v-if="type === 'k3'" class="ball" :style="{ backgroundImage: `url(${diceList[`d${Number(props.num)}`]})` }"
      w-18px h-18px mr-6px
    />
    <div
      v-else-if="type === 'pk10'" class="ball"
      :style="{ backgroundImage: `url(${ballList[`b${Number(props.num)}`]})` }" w-18px h-18px leading-27px rounded-full
      text-center mr-2px
    />
    <div v-else-if="type === 'lhc'">
      <div
        :style="{ backgroundImage: `url(${lhcBallList[getLhcBall(num.toString())]})` }"
        bg-contain w-27px h-27px leading-27px rounded-full text-center mr-6px block text-black font-black
        select-none style="font-size:11px;background-size: 100% 100%;"
      >
        {{ num }}
      </div>
      <div w-27px text-center style="color:#515B7C;">
        {{ getZodiac(num.toString()) }}
      </div>
    </div>

    <div
      v-else :style="{ backgroundImage: `url(${getSupportImage(ppball)})` }" w-18px h-18px leading-18px rounded-full
      text-center mr-2px block text-black font-black select-none style="font-size:11px;background-size: 100% 100%;"
    >
      {{ num }}
    </div>
  </template>
</template>

<style lang="scss" scoped>
div {
  font-size: 14px;
}

.ball {
  background-size: cover;
  flex-shrink: 0;
}
</style>
