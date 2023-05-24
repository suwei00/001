<script setup lang='ts' name="rebate-select">
const {
  selfRebate, // 返水比例
  modelValue,
  index,
  isCp, // 是否彩票
} = defineProps<{
  selfRebate?: string
  modelValue: string
  index: string
  isCp: boolean
}>()
const emit = defineEmits(['update:modelValue', 'openSelect'])
emit('update:modelValue', selfRebate)
if (!isCp)
  emit('update:modelValue', `${selfRebate}%`)

const options = computed(() => {
  const base = []
  if (selfRebate) {
    const num = +(+selfRebate * 100).toFixed()
    if (!isCp) {
      if (num / 5 > 0) {
        const t = num / 5
        base.push(0)
        for (let i = 1; i <= t; i++)
          base.push(i * 5)

        if (num % 5 > 0)
          base.push(num * 100)
      }
      else {
        base.push(0)
      }
      return base.map((n) => {
        return `${(Number(n) / 100).toFixed(2)}%`
      }).reverse()
    }
    else {
      base.push(0)
      for (let i = 1; i <= num; i++)
        base.push(i * 1)
    }
    return base.filter(n => n >= 900).map((n) => {
      return (Number(n) / 100).toFixed(2)
    }).reverse()
  }
  else {
    return []
  }
})
const show = ref(false)
function openInCom() {
  show.value = true
  emit('openSelect', index)
}
function choose(n: string) {
  emit('update:modelValue', n)
  show.value = false
}
function open() {
  show.value = true
}
function hide() {
  show.value = false
}

defineExpose({ hide, open })
</script>

<template>
  <div class="box" text-left pl-30px pr-23px @click.stop="openInCom">
    <span>{{ modelValue }}</span>
    <img src="@images/personal/arrow-b.png" w-12px alt="">
    <ul v-show="show">
      <el-scrollbar always max-height="204px">
        <li v-for="(n, i) in options" :key="i" @click.stop="choose(n)">
          {{ n }}
        </li>
      </el-scrollbar>
    </ul>
  </div>
</template>

  <style lang='scss' scoped>
  .box {
      width: 100%;
      height: 40px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      span{
        z-index: -1;
      }

      ul {
          position: absolute;
          z-index: 3;
          top: 45px;
          left: 0;
          background-color: #fff;
          width: 123px;
          padding: 11px 15px;
          text-align: center;
          border-radius: 6px;
          box-shadow: 0px 10px 50px 1px rgba(0, 0, 0, 0.16);
          max-height: 226px;

          li {
              width: 93px;
              height: 34px;
              line-height: 34px;

              &:hover {
                  background: #F8FAFB;
                  border-radius: 6px;
              }
          }

          .active {
              background: #F8FAFB;
              border-radius: 6px;
          }
      }

  }
  </style>

