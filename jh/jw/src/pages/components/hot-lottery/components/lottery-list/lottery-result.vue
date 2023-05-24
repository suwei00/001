<script setup lang='ts' name="lottery-result">
import greenIcon from '@images/home/hot-lottery/lottery-list/green-ball.png?preset=full'
import blueIcon from '@images/home/hot-lottery/lottery-list/blue-ball.png?preset=full'
import redIcon from '@images/home/hot-lottery/lottery-list/red-ball.png?preset=full'
import greyIcon from '@images/home/hot-lottery/lottery-list/grey-ball.png?preset=full'

const { type, result } = defineProps<{

  type: string
  result: number[]
}>()

// pk10 冠亚和
const guanyahe = computed(() => result[0] + result[1])

// k3 lucky28 总和
const zonghe = computed(() => result[0] + result[1] + result[2])

// ssc 总和
const sscZonghe = computed(() => result.reduce((pre, cur) => pre + cur))

// 大小单双
const getBigSmall = (n: number, line: number) => n < line ? '小' : '大'
const getOddEven = (n: number) => n % 2 === 0 ? '双' : '单'
// 龙虎
const getLongHu = (a: number, b: number) => {
  return a > b ? '龙' : '虎'
}

// lucky28 波色
const colorsBall: { [text: string]: any } = {
  green: greenIcon,
  blue: blueIcon,
  red: redIcon,
  grey: greyIcon,
}
const colors = {
  green: [1, 4, 7, 10, 16, 19, 22, 25],
  blue: [2, 5, 8, 11, 17, 20, 23, 26],
  red: [3, 6, 9, 12, 15, 18, 21, 24],
  grey: [13, 14],
}
const getBallColor = (id: number): string => {
  const type = findKey(colors, (item: any) => item.includes((id))) || ''
  return type
}

// 六合彩 特码
const lhcBallList = $computed(() => result.map((b) => {
  return b < 10 ? `0${b}` : b.toString()
}))
const tema = computed(() => last(lhcBallList) ?? '0')
</script>

<template>
  <div class="lottery-result">
    <!-- pk10 -->
    <table v-if="type === 'pk10'">
      <tr>
        <th colspan="5">
          1-5龙虎
        </th>
        <th colspan="3">
          冠亚和
        </th>
      </tr>
      <tr>
        <!-- 龙虎 -->
        <td>{{ getLongHu(result[0], result[9]) }}</td>
        <td>{{ getLongHu(result[1], result[8]) }}</td>
        <td>{{ getLongHu(result[2], result[7]) }}</td>
        <td>{{ getLongHu(result[3], result[6]) }}</td>
        <td>{{ getLongHu(result[4], result[5]) }}</td>
        <!-- 冠亚和 -->
        <td>{{ guanyahe }}</td>
        <td>{{ getBigSmall(guanyahe, 12) }}</td>
        <td>{{ getOddEven(guanyahe) }}</td>
      </tr>
    </table>
    <!-- 快3 -->
    <table v-else-if="type === 'k3'">
      <tr>
        <th colspan="3">
          总和
        </th>
      </tr>
      <tr>
        <td style="width:33.33%;">
          {{ zonghe }}
        </td>
        <td style="width:33.33%;">
          {{ getBigSmall(zonghe, 11) }}
        </td>
        <td style="width:33.33%;">
          {{ getOddEven(zonghe) }}
        </td>
      </tr>
    </table>
    <!-- 时时彩 -->
    <table v-else-if="type === 'ssc'">
      <tr>
        <th colspan="2">
          两面总和
        </th>
        <th colspan="2">
          前二万位
        </th>
        <th colspan="2">
          前三万位
        </th>
      </tr>
      <tr>
        <!-- 两面总和 -->
        <td>{{ getBigSmall(sscZonghe, 23) }}</td>
        <td>{{ getOddEven(sscZonghe) }}</td>
        <!-- 前二万位 -->
        <td>{{ getBigSmall(result[0], 5) }}</td>
        <td>{{ getOddEven(result[0]) }}</td>
        <!-- 前三万位 -->
        <td>{{ getBigSmall(result[0], 5) }}</td>
        <td>{{ getOddEven(result[0]) }}</td>
      </tr>
    </table>
    <!-- lucky28 -->
    <table v-else-if="type === 'lucky28'">
      <tr>
        <th colspan="2">
          总和
        </th>
        <th>波色</th>
      </tr>
      <tr>
        <td style="width:27%;">
          {{ zonghe === 13 || zonghe === 14 ? '-' : zonghe < 15 ? '小' : '大' }}
        </td>
        <td style="width:27%;">
          {{ zonghe === 13 || zonghe === 14 ? '-' : getOddEven(zonghe) }}
        </td>
        <td>
          <span
            class="color-ball"
            :style="{ backgroundImage: `url(${getSupportImage(colorsBall[getBallColor(zonghe)])})` }"
          >
            {{ zonghe }}
          </span>
        </td>
      </tr>
    </table>
    <!-- 六合彩 -->
    <table v-else-if="type === 'lhc'" table-fixed>
      <tr>
        <th colspan="5">
          特码
        </th>
      </tr>
      <tr>
        <td>{{ getZodiac(tema) }}</td>
        <td>{{ getLHCBallColor(tema) }}</td>
        <td>{{ getAnimalType(tema) }}</td>
        <td>{{ +tema === 49 ? '和' : +tema < 25 ? '小' : '大' }}</td>
        <td>{{ +tema === 49 ? '和' : getOddEven(+tema) }}</td>
      </tr>
    </table>
  </div>
</template>

<style lang='scss' scoped>
table {
    width: 775px;
    height: 68px;
    border: 1px solid #D9D9D9;
    font-size: 13px;
    color: #515B7C;
}

th {
    background: linear-gradient(180deg, #FFFFFF 0%, #F2F7FB 100%);
    font-family: $jl-font;
    font-weight: 600;
}

th,
td {
    border: 1px solid #D9D9D9;
}
.color-ball{
    width: 22px;
    height: 22px;
    display: block;
    line-height: 22px;
    font-size: 11px;
    text-align: center;
    color: #000;
    background-size: 100% 100%;
    margin: 0 auto;
}
</style>
