<script setup lang='ts' name="deposit-select">
const {
  options,
  defaultId,
  index,
  isSub,
} = defineProps<{
  options: any[]
  modelValue: string
  index: string
  defaultId: string
  isSub?: boolean
}>()
const emit = defineEmits(['update:modelValue', 'openSelect'])

let showLabel = $ref(options.filter(o => o.value === defaultId)[0].label)
watch($$(options), () => {
  if (isSub) {
    const arr = options.filter(o => o.value === defaultId)
    showLabel = arr[0].label
    emit('update:modelValue', arr[0].value)
  }
})

// 打开选框
const show = ref(false)
function openInCom() {
  show.value = true
  emit('openSelect', index)
}
// 选中
function choose(n: any) {
  emit('update:modelValue', n.value)
  showLabel = n.label

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
  <div class="box" :style="{ borderColor: show ? '#597EF7FF' : '#C5C5C5FF' }" text-left pl-15px pr-15px @click.stop="openInCom">
    <span>{{ showLabel }}</span>
    <img src="@images/personal/arrow-b.png" w-12px alt="">
    <ul v-show="show">
      <li v-for="(n, i) in options" :key="i" text-left pl-10px @click.stop="choose(n)">
        {{ n.label }}
      </li>
    </ul>
  </div>
</template>

  <style lang='scss' scoped>
  .box {
      width: 280px;
      height: 40px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      border: 1px solid ;
      border-radius: 6px;
      span{
        z-index: -1;
      }

      ul {
          position: absolute;
          z-index: 3;
          top: 45px;
          left: 0;
          background-color: #fff;
          width: 280px;
          padding: 11px 15px;
          text-align: center;
          border-radius: 6px;
          box-shadow: 0px 10px 50px 1px rgba(0, 0, 0, 0.16);
          max-height: 226px;
          overflow-y: scroll;
          overflow-x: hidden;
          &::-webkit-scrollbar{
              display: none;
            }
          -ms-overflow-style: none;
          scrollbar-width: none; /* Firefox */

          li {
              width: 249px;
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

