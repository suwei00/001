<script setup lang='ts' name="member-dialog">
const userStore = useUserStore()
const { userRebate } = $(storeToRefs(userStore))

const superData = computed(() => {
  if (sessionStorage.getItem('superRebate'))
    return JSON.parse(sessionStorage.getItem('superRebate') ?? '')
  else return userRebate
})

const data = ref()
let isOpen = $ref(false)
const open = (row: any) => {
  data.value = row
  isOpen = true
}
const close = () => { isOpen = false }

defineExpose({
  open,
})
</script>

<template>
  <div v-if="isOpen" class="member-dialog">
    <div class="body">
      <div class="title">
        <div class="left">
          <h5>详情</h5>
        </div>
        <div class="right" @click="close">
          <img src="@icons/personal/finance/close-icon.svg" alt="">
        </div>
      </div>
      <!-- 表格 -->
      <div class="option-wrapper" mb-30px>
        <div class="options">
          <h5>返水比例</h5>
          <table>
            <tr>
              <th>游戏种类</th>
              <th>自身返水</th>
              <th>返水比例</th>
            </tr>
            <tr>
              <td>真人</td>
              <td>{{ superData?.zr }}%</td>
              <td>{{ data?.zr }}%</td>
            </tr>
            <tr>
              <td>体育</td>
              <td>{{ superData?.ty }}%</td>
              <td>{{ data?.ty }}%</td>
            </tr>
            <tr>
              <td>棋牌</td>
              <td>{{ superData?.qp }}%</td>
              <td>{{ data?.qp }}%</td>
            </tr>
            <tr>
              <td>电子</td>
              <td>{{ superData?.dz }}%</td>
              <td>{{ data?.dz }}%</td>
            </tr>
            <tr>
              <td>捕鱼</td>
              <td>{{ superData?.by }}%</td>
              <td>{{ data?.by }}%</td>
            </tr>
            <tr>
              <td>电竞</td>
              <td>{{ superData?.dj }}%</td>
              <td>{{ data?.dj }}%</td>
            </tr>
          </table>
        </div>
        <div class="options">
          <h5>彩票返点</h5>
          <table>
            <tr>
              <th>彩票种类</th>
              <th>自身返点</th>
              <th>彩票返点</th>
            </tr>
            <tr>
              <td>快3</td>
              <td>{{ superData?.k3 }}</td>
              <td>{{ data?.k3 }}</td>
            </tr>
            <tr>
              <td>PK10</td>
              <td>{{ superData?.pk10 }}</td>
              <td>{{ data?.pk10 }}</td>
            </tr>
            <tr>
              <td>时时彩</td>
              <td>{{ superData?.ssc }}</td>
              <td>{{ data?.ssc }}</td>
            </tr>
            <tr>
              <td>六合彩</td>
              <td>{{ superData?.lhc }}</td>
              <td>{{ data?.lhc }}</td>
            </tr>
            <tr>
              <td>幸运28</td>
              <td>{{ superData?.luck28 }}</td>
              <td>{{ data?.luck28 }}</td>
            </tr>
            <tr>
              <td>11选5</td>
              <td>{{ superData?.ll5 }}</td>
              <td>{{ data?.ll5 }}</td>
            </tr>
          </table>
        </div>
      </div>
      <button @click="close">
        关闭
      </button>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.member-dialog {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: hsl(0, 0%, 0%, 0.3);
  z-index: 2000;
  color: #333;
  font-size: 15px;
}

.body {
  width: 840px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 10px 80px 1px rgba(0, 0, 0, 0.05);
  padding: 32px 35px 54px;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  text-align: left;

  .title {
    text-align: left;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;

    h5 {
      font-size: 18px;
      font-family: $jl-font;
      font-weight: 600;
    }

    .right {
      cursor: pointer;
      padding: 5px;

      img {
        width: 14px;
        height: 14px;
      }
    }
  }
}

.option-wrapper {
  display: flex;
  justify-content: space-between;

  h5 {
    font-family: $jl-font;
    font-weight: 600;
    text-align: center;
    margin-bottom: 14px;
  }
}

.options {
  table {
    width: 375px;
    table-layout: fixed;

    th {
      background: #F7F9FD;
      font-family: $jl-font;
      font-weight: 600;
    }

    th,
    td {
      height: 40px;
      border: 1px solid #D2D7E3;
      text-align: center;
    }
  }
}

button {
  display: block;
  width: 450px;
  height: 50px;
  margin: 0 auto;
  border-radius: 6px;
  background-color: #597EF7;
  font-size: 18px;
  font-family: $jl-font;
  font-weight: 400;
  color: #FFFFFF;
}
</style>
