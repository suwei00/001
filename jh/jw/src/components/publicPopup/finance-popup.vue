<script setup lang='ts' name='financePopup'>
const { type, id } = defineProps<{ type: 'deposit' | 'withdraw'; id: string }>()

const noMore = $ref(false)
const { popupRef, bodyRef, close } = usePublicPopup()
const confirm = () => {
  if (noMore)
    readFinancePopup({ id })

  close()
}
</script>

<template>
  <!-- <teleport to="body"> -->
  <div ref="popupRef" class="financePopup">
    <div ref="bodyRef" class="body">
      <div class="title">
        <h4>温馨提示</h4>
        <div class="close" cursor-pointer p-5px @click="close">
          <img src="@icons/personal/finance/close-icon.svg" alt="" h-14px>
        </div>
      </div>
      <template v-if="type === 'deposit'">
        <ul mb-16px>
          <li mb-16px>
            <h6 mr-6px>
              1.
            </h6>
            <p>为了更快为您核实上分，请您充值尾数<span>1-9</span>的金额（例100<span>6</span>、4888<span>9</span>)。</p>
          </li>
          <li>
            <h6 mr-6px>
              2.
            </h6>
            <p>请您先进行转账成功后再提交本页面充值订单，转账金额一定要和提交金额保持一致！</p>
          </li>
        </ul>
      </template>
      <template v-else-if="type === 'withdraw'">
        <p mb-20px>
          为了提现能更快到账，请您提现尾数<span>1-9</span>的金额（例10<span>3</span>、100<span>5</span>)。
        </p>
      </template>
      <el-checkbox v-model="noMore" label="本月不再提示" size="large" mb-10px />
      <button @click="confirm">
        我知道了
      </button>
    </div>
  </div>
  <!-- </teleport> -->
</template>

<style lang='scss' scoped>
.financePopup {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
}

.body {
  width: 550px;
  background: #FFFFFF;
  box-shadow: 0px 10px 80px 1px rgba(0, 0, 0, 0.05);
  border-radius: 10px 10px 10px 10px;
  opacity: 1;
  padding: 51px 50px 0;
}

.title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 34px;

  h4 {
    font-size: 18px;
    font-family: PingFang SC-Semibold, PingFang SC;
    font-weight: 600;
  }
}

ul {
  text-align: left;
  font-size: 15px;

  li {
    display: flex;

    span {
      color: #597EF7;
    }
  }
}

p {
  text-align: left;
  font-size: 15px;

  span {
    color: #597EF7;
  }
}

button {
  width: 450px;
  height: 50px;
  background-color: #597EF7;
  border-radius: 6px;
  font-size: 18px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  margin-bottom: 60px;
}
</style>
