<script setup lang='ts' name="LinkList">
const { data: linkList, run: runGetLinkList } = useRequest(getMemberLinkList, { manual: true })
runGetLinkList()

// 返水比例
const userStore = useUserStore()
const { userRebate } = $(storeToRefs(userStore))

// 生成邀请码
const generateRef = ref()
function openGenerate() {
  generateRef.value.open()
}
</script>

<template>
  <div class="link">
    <personal-title title="营销代理" />
    <main>
      <LinkItem v-for="(item) in linkList " :key="item.id" :link-data="item" @update-list="runGetLinkList" />
      <personal-empty v-if="!linkList" mt-84px mb-87px desc="还没有新的邀请码" />
      <div class="create">
        <button @click="openGenerate">
          生成邀请码
        </button>
      </div>

      <generate-code ref="generateRef" :member-rebate="userRebate" @update-list="runGetLinkList" />
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '~/pages/personal/index.scss' as *;

.link {
  @include pageCard;
  font-size: 13px;
  color: #333;
}

main {
  padding-top: 21px;

  .create {
    width: 100%;
    text-align: center;

    button {
      width: 440px;
      height: 50px;
      border-radius: 6px;
      color: #fff;
      font-size: 18px;
      font-family: $jl-font;
      font-weight: 400;
      background-color: #597EF7;
    }
  }
}
</style>

<route lang="yaml">
meta:
  layout: main
  personal: true
  auth: true
</route>
