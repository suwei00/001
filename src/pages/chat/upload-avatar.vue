<script lang="ts" setup>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import avatar from '../../assets/image/avatar/avatar-14.png?preset=full'
import { useFile } from '../../hooks/useFile'
const copperImg = ref('')
const inputFileRef = ref(null)
const { imgBase64 } = useFile(inputFileRef)
const cropperRef = ref<InstanceType<typeof Cropper>>()
const getImgData = () => {
  if (cropperRef.value) {
    const result = cropperRef.value.getResult()
    copperImg.value = result.canvas?.toDataURL() || ''
    // 把copperImg.value储存到localStorage
    localStorage.setItem('avatarImg', copperImg.value)
  }
}
onMounted(() => {
  if (inputFileRef.value)
    inputFileRef.value.dispatchEvent(new MouseEvent('click'))
})
</script>

<template>
  <div class="avatar-title">
    移动和缩放
  </div>

  <div class="avatar-container">
    <input ref="inputFileRef" class="openFile" type="file" accept="image/*">
    <div class="flex-middle img-box">
      <Cropper
        ref="cropperRef"
        class="cropper"
        :src="imgBase64"
        :auto-zoom="false"
        :stencil-props="{
          aspectRatio: 10 / 10,
          class: 'cropper-stencil',
          previewClass: 'cropper-stencil__preview',
          draggingClass: 'cropper-stencil--dragging',
          handlersClasses: {
            default: 'cropper-handler',
            eastNorth: 'cropper-handler--east-north',
            westNorth: 'cropper-handler--west-north',
            eastSouth: 'cropper-handler--east-south',
            westSouth: 'cropper-handler--west-south',
          },
          handlersWrappersClasses: {
            default: 'cropper-handler-wrapper',
            eastNorth: 'cropper-handler-wrapper--east-north',
            westNorth: 'cropper-handler-wrapper--west-north',
            eastSouth: 'cropper-handler-wrapper--east-south',
            westSouth: 'cropper-handler-wrapper--west-south',
          },
        }"
        @change="change"
      />
    </div>
  </div>
  <div class="avatar-footer">
    <div class="cancle" @click="$router.back()">
      取消
    </div>
    <div class="confirm" @click="getImgData">
      选择
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cropper {
  width: 100%;
  height: 375px;
  background: $color-white-1;
}
.openFile{
    display: none;
}
.avatar-container {
    height: calc(var(--viewport-height) - $size50 - $size50);
    // height: calc(var(--viewport-height));
    width: 100%;
    background-color: #000;
    .img-box{
        height: 100%;
    }
  img{
    width: 100%;
  }
}
.avatar-title{
    height: $size50;
    line-height: $size50;
    font-size: $size18;
    color: $color-white-1;
    text-align: center;
    background: #000 !important;
}
.avatar-footer{
    height: $size50;
    line-height: $size50;
    font-size: $size18;
    color: $color-white-1;
    display: flex;
    justify-content: space-between;
    background: #000 !important;
    .cancle{
        padding: 0 18px;
    }
    .confirm{
        padding: 0 18px;
    }
}
.avatar-c{
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
}
.vue-cropper{
    background: #000;
    .cropper-view-box{
        outline: 1px solid #fff !important;
        outline: #fff !important;
    }
}
</style>

<style lang="scss">
.cropper-stencil {
  &__preview {
    &:after,
    &:before {
      content: "";
      opacity: 0;
      transition: opacity 0.25s;
      position: absolute;
      pointer-events: none;
      z-index: 1;
    }

    &:after {
      border-left: solid 1px white;
      border-right: solid 1px white;
      width: 33%;
      height: 100%;
      transform: translateX(-50%);
      left: 50%;
      top: 0;
    }

    &:before {
      border-top: solid 1px white;
      border-bottom: solid 1px white;
      height: 33%;
      width: 100%;
      transform: translateY(-50%);
      top: 50%;
      left: 0;
    }
  }

  &--dragging {
    .cropper-stencil__preview {
      &:after,
      &:before {
        opacity: 0.7;
      }
    }
  }
}

.cropper-line {
  border-color: rgba(white, 0.8);
}

.cropper-handler-wrapper {
  width: 24px;
  height: 24px;
  &--west-north {
    transform: translate(0, 0);
  }
  &--east-south {
    transform: translate(-100%, -100%);
  }
  &--west-south {
    transform: translate(0, -100%);
  }
  &--east-north {
    transform: translate(-100%, 0);
  }
}

.cropper-handler {
  display: block;
  position: relative;
  flex-shrink: 0;
  transition: opacity 0.5s;
  border: none;
  background: white;
  height: 4px;
  width: 4px;
  opacity: 0;
  top: auto;
  left: auto;

  &--west-north,
  &--east-south,
  &--west-south,
  &--east-north {
    display: block;
    height: 16px;
    width: 16px;
    background: none;
    opacity: 0.7;
  }

  &--west-north {
    border-left: solid 2px white;
    border-top: solid 2px white;
  }

  &--east-south {
    border-right: solid 2px white;
    border-bottom: solid 2px white;
  }

  &--west-south {
    border-left: solid 2px white;
    border-bottom: solid 2px white;
  }

  &--east-north {
    border-right: solid 2px white;
    border-top: solid 2px white;
  }

  &--hover {
    opacity: 1;
  }
}
</style>
