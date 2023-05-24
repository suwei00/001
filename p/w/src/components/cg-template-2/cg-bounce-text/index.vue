<script setup lang="ts">
import { computed, watch, ref, reactive, onMounted, onBeforeUnmount, Ref } from 'vue';
import CgBounceText from './index.d';
import { formatNumToCurrency2Decimal } from '@/utils/format';

interface Props extends CgBounceText.Props {
  text?: string | number;
  suffix?: string;
  duration?: number;
  wrapWidth?: number;
  wrapHeight?: number;
  imageWidth?: number;
}

type animateState = 'running' | 'paused';

const props = withDefaults(defineProps<Props>(), {
  text: '',
  suffix: '',
  duration: 500,
  wrapWidth: 150,
  wrapHeight: 150,
  imageWidth: 100
});

// const state = ref<animateState>('running');
// const count = ref(0);
// const timer = ref();
const buffertext = reactive<any[]>([]);
// const aniref = ref();
// const aniframes = ['scale(1)', 'scale(2.1, 1.2)', 'scale(1)'];

const ftext = computed(() => formatNumToCurrency2Decimal(props.text + '', ''));

// const start = () => {
//   const width = aniref.value?.getBoundingClientRect().width;
//   count.value++;
//   state.value = 'running';
//   // clearTimeout(timer.value);
//   // timer.value = setTimeout(() => {
//   //     if (state.value === 'running' && width === 100) {
//   //         state.value = 'paused';
//   //     }
//   // }, 500);
// };

// const stop = () => {
//   clearTimeout(timer.value);
//   timer.value = null;
//   state.value = 'paused';
// };

// const scale = () => {
//   setTimeout(() => {}, 16.7);
// };

watch(
  () => props.text,
  val => {
    buffertext.push(formatNumToCurrency2Decimal(val.toString()));
    if (eleRef && eleRef.value) {
        const active = eleRef.value.classList.contains('active');
        if (active) {
          eleRef.value.classList.remove('active');
          eleRef.value.classList.add('active');
        } else {
          eleRef.value.classList.add('active');
        }
      // eleRef.value.classList.toggle('active');
      iterationCount.value++;
    }
  }
);

const eleRef = ref();

const iterationCount = ref(0);
const imgIterationCount = ref<string | number>(0);
const txtIterationCount = ref(0);

const startImg = () => {
  imgIterationCount.value = 'infinite';
};

const stopImg = () => {
  imgIterationCount.value = 0;
};

const startTxt = () => {
  if (eleRef && eleRef.value) {
      const active = eleRef.value.classList.contains('active');
      if (active) {
        eleRef.value.classList.remove('active');
        eleRef.value.classList.add('active');
      } else {
        eleRef.value.classList.add('active');
      }
  }
  // txtIterationCount.value = 1;
};

const stopTxt = () => {
  if (eleRef && eleRef.value) {
    eleRef.value.classList.remove('active');
  }
  txtIterationCount.value = 0;
};

const toggleImg = () => {
  if (imgIterationCount.value === 'infinite') {
    stopImg();
  } else {
    startImg();
  }
};

const aniStart = () => {
  console.log('动画开始');
};

const aniIteration = () => {
  // iterationCount.value++;
  console.log(`动画迭代轮次：${iterationCount}`);
};

const aniEnd = () => {
  eleRef.value.classList.remove('active');
  // iterationCount.value = 0;
  // txtIterationCount.value = 0;
  console.log('动画结束');
};

const aniCancel = () => {
  console.log('动画已被取消');
};

onMounted(() => {
  eleRef.value.addEventListener('animationstart', aniStart);

  eleRef.value.addEventListener('animationiteration', aniIteration);

  eleRef.value.addEventListener('animationend', aniEnd);

  eleRef.value.addEventListener('animationcancel', aniCancel);
});

onBeforeUnmount(() => {
  eleRef.value.removeEventListener('animationstart', aniStart);

  eleRef.value.removeEventListener('animationiteration', aniIteration);

  eleRef.value.removeEventListener('animationend', aniEnd);

  eleRef.value.removeEventListener('animationcancel', aniCancel);
});

defineExpose({
  startImg,
  stopImg,
  toggleImg,
  startTxt,
  stopTxt,
});
</script>

<script lang="ts">
export default {
  name: 'CgBounceText'
};
</script>

<template>
   <!-- :style="{ width: wrapWidth + 'px', height: wrapHeight + 'px' }" -->
  <div class="bounce-image active" :style="{ width: wrapWidth + 'px', height: wrapHeight + 'px' }">
    <div class="rotate-image" :style="{ 'animation-iteration-count': imgIterationCount, 'animation-duration': duration * 10 + 'ms' }">
      <slot name="rotateContent">
        <app-image :src="'/venueLogo/venueLogo_11.png'" width="300"/>
      </slot>
    </div>
    <!-- <app-image class="scale-image" :src="'/logo/logo.png'" :width="imageWidth" :style="{ 'animation-iteration-count': imgIterationCount, 'animation-duration': duration + 'ms' }"/> -->
    <div class="scale-image" :style="{ 'animation-iteration-count': imgIterationCount, 'animation-duration': duration + 'ms' }">
      <slot name="scaleContent">
        <app-image :src="'/logo/logo.png'" width="100"/>
      </slot>
    </div>
  </div>
  <div class="bounce-text">
    <div ref="eleRef" class="bounce-text-inner active">
      <slot name="bounceTxt">
        <ul v-if="ftext && ftext.length" class="default-ul">
          <!-- :style="{ 'animation-play-state': state, 'animation-iteration-count': txtIterationCount }" -->
          <li v-for="(item, idx) in ftext.split('')" :class="['bounce-text-item', /[0-9]/.test(item) ? 'num-item' : suffix === item ? 'suffix' : 'joint']" :key="idx">
            <span class="txt">{{ item }}</span>
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bounce-text {
  margin: 0 auto;
  // height: 100px;
  // width: 300px;
  // border: 2px solid pink;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.1) 0%, pink 50%, rgba(255, 255, 255, 0.1) 100%);
  &-inner {
    color: yellow;
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    ul.default-ul {
      justify-content: center;
      display: flex;
      align-items: center;
      line-height: 1.5;
    }
    &.active {
      animation-name: heartBeat;
      animation-duration: 500ms;
      animation-fill-mode: backwards;
      transform-origin: center;
      animation-iteration-count: 1;
    }
  }
  .bounce-text-item {
    // width: 50px;
  }
}

.bounce-image {
  margin: 0 auto;
  border: 1px dashed #eee;
  position: relative;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  .rotate-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background: url(link($base-img-dir + '/venueLogo/venueLogo_11.png')) no-repeat;
    // background-position: center;
    // background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .scale-image {
    position: relative;
    z-index: 9;
  }
  &.active {
    .rotate-image {
      animation-name: rotateImage;
      animation-duration: 5000ms;
      animation-fill-mode: backwards;
      transform-origin: center;
      animation-iteration-count: 0;
      animation-timing-function: linear;
    }
    .scale-image {
      animation-name: bounceImage;
      animation-duration: 500ms;
      animation-fill-mode: backwards;
      transform-origin: center;
      animation-iteration-count: 0;
    }
  }
}

@keyframes heartBeat {
  0% {
    transform: scale(1);
    letter-spacing: 0px;
  }

  80% {
    transform: scale(1.1, 1.1);
    letter-spacing: 1px;
  }

  100% {
    transform: scale(1);
    letter-spacing: 0px;
  }
}

@keyframes bounceImage {
  0% {
    transform: scale(1);
  }

  60% {
    transform: scale(2);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes rotateImage {
  0% {
    transform: rotate(0);
  }

  //   50% {
  //     transform: rotate(180deg);
  //   }

  100% {
    transform: rotate(7200deg);
  }
}
</style>
