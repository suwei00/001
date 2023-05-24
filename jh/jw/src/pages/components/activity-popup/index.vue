<script setup lang='ts' name="activity-popup">
const { activityBanners } = defineProps<{
  activityBanners?: {
    id: string
    title: string
    url: string
    sort: string
    img: string
    flags: string
    qr: string
  }[]
}>()

let isOpen = $ref(false)
const currentIndex = $ref(0)

const open = () => { isOpen = true }
const close = () => {
  isOpen = false
  localStorage.setItem('closeActivityPopup', 'do-not-show-anymore')
}

const { handleItemClick } = useActivityRedirect()
const clickHandler = (item: any) => {
  if (item.flags === '0')
    return
  handleItemClick(item)
  close()
}

// 暴露
defineExpose({
  open,
})
</script>

<template>
  <div v-if="isOpen" class="activity-popup">
    <div class="body">
      <div class="close" @click="close">
        <img src="@icons/personal/finance/close-icon.svg" alt="">
      </div>
      <div class="wrapper">
        <div class="box" :style="{ transform: `translateX(-${690 * currentIndex}px)` }">
          <div
            v-for="(banner) in activityBanners"
            :key="banner.id"
            w-690px h-530px text-center shrink-0 flex justify-center items-center
          >
            <jl-cloud-image w="690px" h="530px" :src="banner.img" @click="clickHandler(banner)" />
          </div>
        </div>
      </div>
      <ul v-if=" activityBanners && activityBanners.length > 1" class="dots">
        <li
          v-for="(i) in activityBanners?.length" :key="i" :class="{ active: currentIndex === i - 1 }"
          @click="currentIndex = i - 1"
        />
      </ul>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.activity-popup {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 2000;
    top: 0;
    left: 0;
    background-color: rgb(0, 0, 0, 0.3);
}

.body {
    width: 690px;
    height: 530px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 10px 80px 1px rgba(0, 0, 0, 0.05);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    overflow: hidden;
}

.wrapper {
    width: 690px;
    height: 530px;
    overflow: hidden;

    .box {
        height: 530px;
        display: flex;
        transition: all 0.35s ease;

        img {
            // width: 690px;
            // height: 530px;
            object-fit: contain;
            cursor: pointer;
        }
    }
}

.dots {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 50%;
    transform: translateX(-50%);
    bottom: 24px;

    li {
        background-clip: content-box;
        box-sizing: content-box;
        margin: 0 7px;
        display: block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        padding: 3px;
        border: 1px solid transparent;
        background-color: #9AA4C2;
        cursor: pointer;
    }

    .active {
        border: 1px solid #597EF7;
        background-color: #597EF7;

    }
}

.close {
    position: absolute;
    right: 15px;
    top: 15px;
    padding: 5px;
    cursor: pointer;
    z-index: 2;

    img {
        width: 14px;
        height: 14px;
    }
}
</style>
