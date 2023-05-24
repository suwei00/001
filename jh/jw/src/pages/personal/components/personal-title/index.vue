<script setup lang='ts' name="personal-title">
const { title, hiderBorder = false, back = '' } = defineProps<{ title: string; hiderBorder?: boolean; back?: string }>()

const router = useRouter()
function goBack() {
  if (!back)
    return
  router.push(back)
}
</script>

<template>
  <div class="outer" :class="{ 'hide-border': hiderBorder }">
    <div class="personal-title">
      <h3 :class="Boolean(back) ? 'cursor' : ''" @click="goBack">
        <img v-if="back" src="@icons/personal/arrow-l.svg" alt="">
        {{ title }}
      </h3>
      <div class="desc">
        <slot name="desc" />
      </div>
      <div class="right">
        <slot name="right" />
      </div>
    </div>
    <!-- 站内信详情标题 -->
    <slot name="messageDetail" />
  </div>
</template>

<style lang="scss" scoped>
.outer {
  border-bottom: 1px solid #EBEBEB;
}

.hide-border {
  border-bottom: none;
}

.personal-title {
  padding-bottom: 14px;
  display: flex;
  align-items: center;

  h3 {
    color: $color-black-primary;
    font-family: $jl-font;
    font-weight: bold;
    font-size: 24px;
    line-height: 33px;
    display: flex;

    img {
      filter: brightness(0);
      margin-right: 9px;
    }
  }

  .cursor {
    cursor: pointer;
  }

  .desc {
    margin-left: 10px;
    color: #94A6B7;
    font-size: 15px;
    line-height: 33px;

    a {
      color: $text-primary;
    }
  }

  .right {
    margin-left: auto;
  }
}
</style>

