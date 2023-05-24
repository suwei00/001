<script setup lang='ts' name="rebate-paytable">
import { CGCPOddsFormatter, filterOptions } from './data'

const userStore = useUserStore()
const { userRebate } = $(storeToRefs(userStore))

let id = $ref('1')
let type = $ref('k3')
const selfRebate = $computed(() => {
  if (type === 'k3')
    return userRebate && +(+userRebate?.k3 * 100).toFixed()
  else if (type === 'pk10')
    return userRebate && +(+userRebate?.pk10 * 100).toFixed()
  else if (type === 'ssc')
    return userRebate && +(+userRebate?.ssc * 100).toFixed()
  else if (type === 'll5')
    return userRebate && +(+userRebate?.ll5 * 100).toFixed()
  else if (type === 'luck28')
    return userRebate && +(+userRebate?.luck28 * 100).toFixed()
  else if (type === 'lhc')
    return userRebate && +(+userRebate?.lhc * 100).toFixed()
})
const navList = [
  { label: '快3', id: '1', type: 'k3' },
  { label: 'PK10', id: '8', type: 'pk10' },
  { label: '时时彩', id: '14', type: 'ssc' },
  { label: '六合彩', id: '33', type: 'lhc' },
  { label: '11选5', id: '19', type: 'll5' },
  { label: '幸运28', id: '27', type: 'luck28' },
]
let tableData = $ref<{
  name: string
  level: string
  odds: string
  fn: string
}[]>([])

function getRebateOdds() {
  getLotteryOdds({ id })
    .then((res) => {
      // 拼名字
      if (type === 'lhc') {
        let prefixName
        for (let i = 0; i < res.length; i++) {
          if (!res[i].fn) {
            prefixName = i === 0 ? res[i].name : res[i - 1].fn ? res[i].name : `${prefixName}-${res[i].name}`
            continue
          }
          res[i].name = res[i].name === prefixName ? res[i].name : `${prefixName}-${res[i].name}`
        }
      }
      else {
        const nameObj = { name: '', l: '' }
        for (let i = 0; i < res.length; i++) {
          if (res[i].odds === '0' && res[i].level.slice(0, 3) !== nameObj.l) {
            nameObj.name = res[i].name
            nameObj.l = res[i].level
            continue
          }
          if (res[i].level.slice(0, 3) === nameObj.l)
            res[i].name = res[i].name === nameObj.name ? res[i].name : `${nameObj.name}-${res[i].name}`
        }
      }

      const data = res.filter(item => item.fn && item.fn)

      /* 🧩拆分玩法🧩 */
      if (type === 'pk10') {
        // 冠亚和
        CGCPOddsFormatter(data, 'gyh', 1, 'guanyahe')
        // 冠亚和值
        CGCPOddsFormatter(data, 'gyhz', 1, 'guanyahezhi')
        // 双面盘-大小单双龙虎
        CGCPOddsFormatter(data, 'first', 2, '双面盘-大小单双龙虎')
      }
      else if (type === 'll5') {
        // 趣味型-定单双
        CGCPOddsFormatter(data, 'dds', 1, 'dingdanshuang')
        // 趣味型-猜中位
        CGCPOddsFormatter(data, 'czw', 1, 'caizhongwei')
      }
      else if (type === 'ssc') {
        // 两面-大小单双质合
        CGCPOddsFormatter(data, 'lmzh', 2, '两面-大小单双质合')
        // 龙虎斗-龙虎和
        CGCPOddsFormatter(data, 'lhdwq', 1, 'longhudou')
        // 猜豹子
        CGCPOddsFormatter(data, 'baozi', 2, '猜豹子')
      }
      else if (type === 'lhc') {
        // 连码-三中二
        CGCPOddsFormatter(data, 'win32', 1, 'lmWin32')
        // 连码-二中特
        CGCPOddsFormatter(data, 'winte2', 1, 'lmWinte2')
        // 生肖-合肖中
        CGCPOddsFormatter(data, 'hxz', 1, 'hexiaozhong')
        // 生肖-合肖不中
        CGCPOddsFormatter(data, 'hxbz', 1, 'hexiaobuzhong')
        // 生肖-二肖连
        CGCPOddsFormatter(data, 'exl', 1, 'erlianxiao')
        // 生肖-三肖连
        CGCPOddsFormatter(data, 'sxl', 1, 'sanlianxiao')
        // 生肖-四肖连
        CGCPOddsFormatter(data, 'fxl', 1, 'silianxiao')
        // 尾数-特码头尾
        const fnIndex = data.findIndex(d => d.fn === 'tmtw')
        if (fnIndex > -1) {
          data.splice(fnIndex + 1, 0, { name: '尾数-特码头尾-0头', level: '000', odds: data[fnIndex].odds.split(',')[0], fn: 'wtf' })
          data.splice(fnIndex + 2, 0, { name: '尾数-特码头尾-非0头', level: '000', odds: data[fnIndex].odds.split(',')[1], fn: 'wtf' })
          data.splice(fnIndex + 3, 0, { name: '尾数-特码头尾-0尾', level: '000', odds: data[fnIndex].odds.split(',')[5], fn: 'wtf' })
          data.splice(fnIndex + 4, 0, { name: '尾数-特码头尾-非0尾', level: '000', odds: data[fnIndex].odds.split(',')[6], fn: 'wtf' })
        }

        // 尾数-尾数连
        CGCPOddsFormatter(data, 'ewl', 1, 'erweilian')
        CGCPOddsFormatter(data, 'swl', 1, 'sanweilian')
        CGCPOddsFormatter(data, 'fwl', 1, 'siweilian')
      }

      tableData = data.filter(d => filterOptions.findIndex(f => f === d.fn) === -1)
      console.log('🚧 => file: index.vue => line 50 => .then => data', data)
      // tableData = data
    })
    .catch((err) => { console.warn(err) })
}
getRebateOdds()

const switchNav = (nav: any) => {
  id = nav.id
  type = nav.type
  getRebateOdds()
}

const originArr = $computed(() => {
  const arr = []
  if (selfRebate) {
    const t = Math.floor((selfRebate - 900) / 10)
    arr.push(900)
    for (let i = 1; i <= t; i++)
      arr.push(i * 10 + 900)

    if ((selfRebate - 900) % 10 > 0)
      arr.push(selfRebate)
  }
  return arr.reverse()
})
let expandArr = $ref<number[]>([])
let isExpand = $ref(false)
let expandRebate = $ref(0)
const expandHandler = (rebate: number) => {
  isExpand = !isExpand
  if (isExpand) {
    expandRebate = rebate
    const arr = []
    for (let i = rebate; i >= rebate - 10 && i >= 900; i--)
      arr.push(i)
    expandArr = arr
  }
}

// 赔率展示格式化
const formatOdds = (odds: string, n: number) => {
  const data = odds.includes(',') ? odds.split(',').map(o => toFloat(+o * n / 1000, 3)).join(',') : toFloat(+odds * n / 1000, 3)
  return `赔率${data}`
}
const copyId = ref()
const setHover = (nav: any) => {
  copyId.value = nav.id
}
</script>

<template>
  <div class="rebate-paytable">
    <nav flex items-center pl-20px>
      <ul flex>
        <li
          v-for="nav in navList"
          :key="nav.label" :class="{ 'active-nav': id === nav.id || copyId === nav.id }" class="nav-item" @mouseover="setHover(nav)"
          @mouseout="copyId = ''"
          @click="switchNav(nav)"
        >
          {{ nav.label }}
        </li>
      </ul>
    </nav>
    <div class="body">
      <el-table
        border v-bind="{ ...vLoading }" stripe :data="tableData"
        :header-cell-style="{ borderColor: '#A1B4DA', background: '#dbe6ff', color: '#333' }"
        :header-row-style="{ borderColor: '#A1B4DA' }" :row-style="{ borderColor: '#A1B4DA' }"
        :cell-style="{ borderColor: '#A1B4DA' }" class="main-table"
      >
        <el-table-column align="center" prop="name" label="name" width="170">
          <template #header>
            <div class="table-head">
              <span>玩法</span>
              <span>返点</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-for="n in (isExpand ? expandArr : originArr)" :key="n" align="center">
          <template #header>
            <div>null</div>
            <div class="col-head">
              <span>{{ (n / 100).toString() }}</span>
              <span
                v-if="(isExpand ? n === expandRebate : true) && n > 900" class="btn"
                @click="expandHandler(n)"
              >{{ isExpand ? '收回' : '展开' }}</span>
            </div>
          </template>
          <template #default="{ row: { odds } }">
            <span>{{ formatOdds(odds, n) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.rebate-paytable {
    font-size: 13px;
    color: #333;
}

nav {
    width: 100%;
    height: 70px;
    background: #DDE1E5;
}

.nav-item {
    width: 100px;
    height: 40px;
    line-height: 40px;
    margin-right: 6px;
    background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 59%, #EBEBEB 100%);
    box-shadow: inset 0px 3px 6px 1px #FFFFFF;
    border-radius: 6px;
    color: #515B7C;
    font-size: 18px;
    font-family: $jl-font;
    font-weight: 400;
    cursor: pointer;
}

.active-nav {
    background: linear-gradient(180deg, #96AEFF 0%, #597EF7 100%);
    box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.2);
    color: #fff;
}

.body {
    width: 100%;
    margin-bottom: 200px;
    padding-top: 20px;
    padding-left: 20px;
    text-align: left;
}

.main-table {
    width: 99%;
    border: 1px solid #A1B4DA;
    border-bottom: none;
    color: #333;
}

.table-head {
    position: absolute;
    width: 168px;
    height: 38px;
    top: 0;
    left: -2px;

    span {
        position: absolute;

        &:nth-of-type(1) {
            left: 6px;
            bottom: 1px;
        }

        &:nth-of-type(2) {
            top: 4px;
            right: 6px;
        }
    }

    background: #dbe6ff url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjEwMCUiIHkyPSIxMDAlIiBzdHJva2U9IiNBMUI0REEiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==) no-repeat 100% center;
}

.col-head {
    position: absolute;
    width: 100%;
    height: 38px;
    line-height: 38px;
    top: 1px;
    left: 0px;
    background-color: #dbe6ff;

    .btn {
        position: absolute;
        right: 2px;
        top: -10px;
        cursor: pointer;
        color: #597EF7;
        font-weight: 400;
        font-size: 13px;
    }
}
</style>
