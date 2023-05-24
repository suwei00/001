<template>
  <div class="progress-image" 
  ref="container"
  :style="{
    width: cgToPx(props.size),
    height: cgToPx(props.size)
  }">
    <img :src="props.imageUrl" />
    <canvas class="my-canvas" ref="canvasEl" 
    :style="{
      opacity: props.opacity
    }"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
export interface CgUploadImageProps{
  imageUrl?:string,
  progress?:number,
  size?:number,
  fillColor?:string,
  opacity?:number,
}
const props = withDefaults(defineProps<CgUploadImageProps>(),{
  imageUrl:'https://img0.baidu.com/it/u=3425868493,3104015061&fm=253&fmt=auto&app=120&f=JPEG?w=1199&h=800',
  progress:0,
  size:100,
  fillColor:'#000000',
  opacity:0.7
})
const container = ref<HTMLInputElement | null>();
let containerSize:number;
const calcDrawPoint = (progress:number=props.progress,size:number = containerSize) => {
  console.log(containerSize);
  const p = size * 4 * (progress / 100)
  if (p < (size / 2)) {
    return [[size / 2 + p, 0], [size, 0], [size, size], [0, size], [0, 0], [size / 2, 0]]
  } else if (p < (size / 2 + size)) {
    return [[size, p - (size / 2)], [size, size], [0, size], [0, 0], [size / 2, 0]]
  } else if (p < ((size / 2) + (size * 2))) {
    return [[size - (p - (size / 2) - size), size], [0, size], [0, 0], [size / 2, 0]]
  } else if (p < ((size / 2) + (size * 3))) {
    return [[0, size - (p - (size / 2) - (size * 2))], [0, 0], [size / 2, 0]]
  } else {
    return [[(p - (size / 2) - (size * 3)), 0], [size / 2, 0]]
  }
}

const draw = (ctx:CanvasRenderingContext2D) => {
  ctx.beginPath()
  ctx.strokeStyle = props.fillColor
  // 移动到中心点开始绘制
  ctx.moveTo(containerSize / 2, containerSize / 2)
  calcDrawPoint().forEach(points => {
    ctx.lineTo(...points as [number,number])
  })
  // 绘制结束回归中心点
  ctx.lineTo(containerSize / 2, containerSize / 2)
  ctx.closePath()
  ctx.stroke()
  // 定义填充颜色
  ctx.fillStyle = props.fillColor
  ctx.fill()
}

watch(() => props.progress, (value) => {
  if (ctx && value < 100) {
    // 重绘
    ctx.clearRect(0, 0, containerSize, containerSize)
    draw(ctx)
  } else {
    ctx!.clearRect(0, 0, containerSize, containerSize)
  }
})

const canvasEl = ref<HTMLCanvasElement|null>()
let ctx:CanvasRenderingContext2D|null = null
onMounted(() => {
  containerSize = container.value!.offsetWidth;
  canvasEl.value!.width = containerSize ;
  canvasEl.value!.height = containerSize ;
  ctx = canvasEl.value!.getContext('2d')
    draw(ctx!)
})
</script>

<style scoped lang="scss">
.progress-image{
  font-size: 0;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  canvas {
    position: absolute;
    left: 0px;
    top: 0px;
    // width: 100%;
    // height: 100%;
  }
}
</style>
