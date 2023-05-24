<script setup lang='ts' name="hot-lottery">
// 热门彩种投注
</script>

<template>
  <div class="hot-lottery">
    <card-title title="热门彩种投注" sub-title="各种游戏玩法供您体验" />
    <div class="lottery-wrapper">
      <lottery-list />
      <div class="list">
        <gain-list />
        <win-list />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hot-lottery {
  padding-top: 55px;
  width: 1300px;
  margin: 0 auto;

  .lottery-wrapper {
    padding-top: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}
</style>
