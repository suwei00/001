<script setup lang='ts' name="maintain">
import maintainImg from '@images/common/maintain.png?preset=full'
import maintainThumb from '@images/common/maintain.png?preset=thumbnail&src'

const { height = '180px', enable, center = false, width = '80%', zIndex = 1996 } = defineProps<{
  minimize?: boolean
  enable: boolean
  height?: string
  width?: string
  center?: boolean
  zIndex?: number
}>()
const alignItems = $computed(() => {
  return center ? 'center' : 'flex-end'
})
</script>

<template>
  <div v-if="enable" class="maintain" :class="[minimize ? '' : 'pb-45px']" @click.stop>
    <div class="content" :style="{ height }" :class="minimize ? 'pt-14px' : 'pt-25px'">
      <jl-image
        :class="minimize ? 'w-30px h-27px' : 'w-97px h-87px'" mx-auto mt-0 mb-10px :src="maintainImg"
        :thumb="maintainThumb"
      />
      <div class="text" :class="minimize ? 'text-12px border-0 scale-60 left--20px' : 'text-15px border-2'">
        场馆维护中⋯
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.maintain {
  position: absolute;
  top: 0;
  left: 0;
  z-index: v-bind(zIndex);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: v-bind(alignItems);
  justify-content: center;
  user-select: none;
  background-color: rgba(255, 255, 255, .4);
  cursor: not-allowed;

  .content {
    width: v-bind(width);
    height: 180px;
    background: linear-gradient(180deg, rgba(51, 51, 51, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%);
    box-shadow: 0px 0px 20px 1px rgba(86, 122, 254, 0.6);
    border-radius: 12px;
    opacity: 1;
    border: 2px solid #96AEFF;

    .text {
      width: 117px;
      height: 30px;
      margin: 0 auto;
      border-radius: 15px;
      position: relative;
      line-height: 26px;
      border-style: solid;
      border-color: #fff;
      color: #fff;
      font-size: 15px;
      font-family: $jl-font;
      font-weight: bold;
      text-shadow: 0px 3px 6px rgba(86, 122, 254, 0.6);
    }
  }
}
</style>
