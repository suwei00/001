<script setup lang='ts' name="carousel">
interface Item {
  img: string | any[]
  thumb: string
  [key: string]: any
}
// 轮播图切换时间
const TIME = 5000
const { data } = $(useRequest(() => getBannerList(1)))
const bannerList = $computed(() => data?.banner ?? [])
const { count, inc, reset, set, dec } = $(useCounter(0))
const documentVisible = $(useDocumentVisibility())
// 预览图片的index
let hoverThumbIndex = $ref<number | undefined>()
const [navVisible, toggleNavVisible] = $(useToggle(false))
// 下一张
const handlePrev = useDebounceFn(() => {
  if (count <= 0)
    set(bannerList.length - 1)
  else
    dec()
}, 300)
// 上一张
const handleNext = useDebounceFn(() => {
  if (count >= bannerList.length - 1)
    reset(0)
  else inc()
}, 300)
const { pause, resume } = useIntervalFn(() => {
  if (documentVisible === 'visible') {
    resume()
    handleNext()
  }
  else {
    pause()
  }
}, TIME)
const handleMouseEnter = () => {
  toggleNavVisible()
  pause()
}
const handleMouseLeave = () => {
  toggleNavVisible()
  resume()
}
// 分页点击
const handleBulletClick = (index: number, item?: Item) => {
  set(index)
}
// 分页移入
const handleBulletMouseLeave = (index: number) => {
  hoverThumbIndex = undefined
}
// 分页移出
const handleBulletMouseEnter = (index: number) => {
  hoverThumbIndex = index
}

const { handleItemClick } = useActivityRedirect()
</script>

<template>
  <div h-600px class="carousel" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div v-if="bannerList?.length" class="inner">
      <ul class="imgs">
        <li
          v-for="(item, index) in bannerList" :key="item.id" :class="{ active: count === index }" class="img"
          @click="handleItemClick(item)"
        >
          <transition>
            <jl-cloud-image v-show="count === index" class="img-banner" use-bg :src="item.img" />
          </transition>
        </li>
      </ul>
      <ul class="bullets">
        <li
          v-for="item, index in bannerList" :key="item.id" class="bullet"
          :class="[count === index ? 'bullet-active' : '']"
          @mouseenter="handleBulletMouseEnter(index)" @mouseleave="handleBulletMouseLeave((index))"
          @click="handleBulletClick(index)"
        >
          <transition>
            <div v-show="hoverThumbIndex === index " class="preview">
              <jl-cloud-image w="196px" h="60px" :src="item.img" />
            </div>
          </transition>
        </li>
      </ul>
      <transition appear>
        <div v-show="navVisible" class="navigation">
          <span class="prev" @click="handlePrev">
            <i i-carousel-prev w-32px h-32px />
          </span>
          <span class="next" @click="handleNext">
            <i i-carousel-next w-32px h-32px />
          </span>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
@include fade;

.carousel {
  position: relative;

  .inner {
    margin: 0 auto;
    width: 100%;
    min-width: 1400px;
    max-width: 1920px;

    .imgs {
      display: flex;
      position: relative;
      min-width: 1400px;
      width: 100%;
      height: 600px;

      .img {
        min-width: 1400px;
        width: 100%;
        height: 600px;
        position: absolute;
        display: flex;
        justify-content: center;
        z-index: 1;
        cursor: pointer;

        .img-banner {
          max-width: 1920px;
          min-width: 1400px;
          width: 100%;
          height: 600px;
        }

        &.active {
          z-index: 2;
        }
      }
    }

    .bullets {
      position: absolute;
      bottom: 4px;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 3;

      .bullet {
        display: inline-block;
        transition: all .3s;
        position: relative;
        background-clip: content-box;
        box-sizing: content-box;
        margin: 0 7px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        padding: 3px;
        border: 1px solid transparent;
        background-color: #9AA4C2;
        cursor: pointer;

        &+.bullet {
          margin-left: 20px;
        }

        .preview {
          position: absolute;
          top: -70px;
          left: 8px;
          transform: translateX(-50%);
          border: 1px solid $color-black-basic;
          z-index: 1;
          width: 196px;
          height: 60px;
          border: 1px solid #567AFE;
          overflow: hidden;
          box-shadow: 0 2px 8px 1px rgba(86, 122, 254, 0.3);
          background-color: #fff;
        }
      }
      .bullet-active{
        border: 1px solid #597EF7;
        background-color: #597EF7;
      }
    }

    .navigation {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 100%;
      height: 0px;
      display: flex;
      justify-content: space-between;
      z-index: 3;

      span {
        display: block;
        width: 38px;
        height: 80px;
        background: #A8B2CF;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        user-select: none;
        transform: translateY(-50%);
      }
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scale(.9);
}
</style>
