<script setup lang="ts">
import { ref, computed, useSlots } from 'vue'
// import { Lazyload } from 'vant'
// import Spinner from './spinner.vue';

interface CGImageProps {
  src?: string
  fakeSrc?: string
  realSrc?: string
  alt?: string
  width?: number | string
  height?: number | string
  fit?: string
  position?: string
  filter?: string
  round?: boolean
  radius?: number | string
  lazy?: boolean
  block?: boolean
  showError?: boolean
  showLoading?: boolean
  errorIcon?: string
  loadingIcon?: string
  iconSize?: number | string
  showDownload?: boolean
}

const props = withDefaults(defineProps<CGImageProps>(), {
  src: '', // 'https://pic.ntimg.cn/2009-02-04/200924103934434_2.jpg?t=' + new Date().getTime(),
  fakeSrc: '',
  realSrc: '',
  alt: '',
  fit: 'fill',
  position: 'center center',
  filter: 'none',
  radius: 0,
  showError: true,
  showLoading: false,
  errorIcon: '',
  loadingIcon: '',
  iconSize: 32,
  showDownload: false
})

const slots = useSlots()

const emits = defineEmits(['click', 'load', 'error'])

const loading = ref(true)
const error = ref(false)

const img_src = ref(props.src)
const fake_src = ref(props.fakeSrc)
const real_src = ref(props.realSrc)
const show_download = ref(props.showDownload)

const styleOuter = computed(() => {
  let style: any = {
    width: props.width ? `var(--cg-px-${props.width})` : 'auto',
    height: props.height ? `var(--cg-px-${props.height})` : 'auto',
    display: props.block ? 'block' : 'inline-block'
  }
  if (props.radius) {
    style.borderRadius = `var(--cg-px-${props.radius})`
    style.overflow = 'hidden'
  }
  return style
})

const styleImg = computed(() => {
  let style: any = {
    objectFit: props.fit,
    objectPosition: props.position,
    filter: props.filter
  }
  return style
})

const fakeImgStyle = computed(() => {
  let style: any = {
    objectFit: props.fit,
    objectPosition: props.position
  }
  return style
})

const imgOnload = () => {
  if (!props.lazy) {
    loading.value = false
    emits('load')
  }
}

const imgOnError = () => {
  if (!props.lazy) {
    error.value = true
    emits('error')
  }
}

const imgOuterClicked = (e: any) => {
  emits('click')
}

const getReal = () => {
  img_src.value = real_src.value // + '?t=' + new Date().getTime()
}
</script>

<script lang="ts">
export default {
  name: 'CgImage',
  data() {
    return {
      lazyLoading: true,
      lazyError: false
    }
  },
  mounted() {
    this.$Lazyload.$on(
      'loaded',
      ({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error }, formCache) => {
        this.lazyLoading = false
        this.$emit('load')
      }
    )
    this.$Lazyload.$on(
      'error',
      ({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error }, formCache) => {
        this.lazyError = true
        this.$emit('error')
      }
    )
  }
}
</script>

<template>
  <div
    class="cg-image"
    :style="styleOuter"
    :class="{
      'cg-image--round': round,
      'cg-image--bad': lazy ? lazyError : error,
      'no-src': !img_src,
      'sub-src': fake_src,
      'real-src': real_src
    }"
    @click="imgOuterClicked"
  >
    <div v-if="showError && (lazy ? lazyError : error)" class="cg-image__error">
      <template v-if="errorIcon">
        <cg-icon :name="errorIcon" />
      </template>
      <template v-else>
        <slot name="error">
          <van-icon name="photo-fail" size="20" />
        </slot>
      </template>
    </div>
    <template v-else>
      <template v-if="show_download && !img_src">
        <div class="cg-image__download">
          <img v-if="fake_src" :src="fake_src" class="cg-image__img" :style="fakeImgStyle" />
          <div v-else class="fake-icon">
            <van-icon name="photo" color="var(--cg-color-bg-2)" :size="Number(width) / 3" />
          </div>
          <div class="download">
            <cg-icon name="icon_white_download" @click="getReal" />
          </div>
        </div>
      </template>
      <template v-if="img_src">
        <template v-if="lazy ? lazyLoading : loading">
          <img v-if="fake_src" :src="fake_src" class="cg-image__img" :style="fakeImgStyle" />
          <div v-else class="fake-icon">
            <van-icon name="photo" color="var(--cg-color-bg-2)" :size="Number(width) / 3" />
          </div>
        </template>

        <div v-if="showLoading && (lazy ? lazyLoading : loading)" class="cg-image__loading">
          <template v-if="loadingIcon">
            <cg-icon :name="loadingIcon" />
          </template>
          <template v-else>
            <slot name="loading">
              <Spinner color="white" />
            </slot>
          </template>
        </div>

        <template v-if="lazy">
          <img
            class="cg-image__img"
            :style="styleImg"
            :onload="imgOnload"
            :onerror="imgOnError"
            v-lazy="img_src"
          />
        </template>
        <template v-else>
          <img
            :src="img_src"
            class="cg-image__img"
            :style="styleImg"
            :onload="imgOnload"
            :onerror="imgOnError"
          />
        </template>
      </template>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.cg-image {
  display: inline-block;
  position: relative;
  overflow: hidden;
  &--round {
    overflow: hidden;
    border-radius: 52%;
    .cg-image__img {
      border-radius: inherit;
    }
  }
  .cg-image__img,
  .cg-image__loading,
  .cg-image__error {
    display: block;
    width: 100%;
    height: 100%;
  }
  .cg-image__loading,
  .cg-image__error {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: var(--van-gray-4);
  }
  &__download {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .cg-image__img {
      position: absolute;
      left: 0;
      top: 0;
    }
    .download {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 22;
      background: rgba(0, 0, 0, 0.6);
      width: 100%;
      height: 100%;
    }
  }
  .fake-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
