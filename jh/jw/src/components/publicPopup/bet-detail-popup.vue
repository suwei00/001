<script setup lang='ts' name="bet-detail-popup">
const { type, data } = defineProps<{ type: string;data: string }>()
const content = $computed(() => data.split('|').filter(d => d.includes('投注内容')).map(d => d.replace('投注内容:', '')).join('/'))

const { popupRef, bodyRef, close } = usePublicPopup()
</script>

<template>
  <div ref="popupRef" class="bet-detail-popup">
    <div ref="bodyRef" class="body">
      <div class="title">
        <h4>注单详情</h4>
        <div class="close" p-5px @click="close">
          <img src="@icons/personal/finance/close-icon.svg" alt="">
        </div>
      </div>
      <div class="content">
        <table>
          <tr>
            <th>投注玩法</th>
            <th>投注内容</th>
          </tr>
          <tr>
            <td>{{ type }}</td>
            <td>{{ !!content ? content : '——' }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.bet-detail-popup {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.3);
}

.body {
  width: 840px;
  min-height: 230px;
  background-color: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0px 10px 80px 1px rgba(0, 0, 0, 0.05);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  font-size: 15px;
  color: #333;
  padding: 32px 35px;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 21px;

  h4 {
    font-size: 18px;
    font-family: $jl-font;
    font-weight: bold;
  }

  .close {
    cursor: pointer;
  }
}
table{
  width: 100%;
  table-layout: fixed;
  th{
    background-color: #F8FAFB;
  }
  th,td{
    padding: 20px 10px;
    text-align: center;
  }
}
</style>

