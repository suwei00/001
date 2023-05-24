<script setup lang="ts">
import { useAppStore } from '@/store-pinia';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const { token } = storeToRefs(useAppStore());
const route = useRoute();
const { userInfo } = storeToRefs(userInfoStateStore());
const showLoading = ref(false);
const schedule = ref(0);
const iframeUrl = globalConfig.IS_PROD ? `${window.location.protocol}//cp.${window.location.host.replace('www.', '')}` : globalConfig.CP_URL;
const cpUrl = ref();

onMounted(() => {
  console.log(userInfo.value);
  const { prefix, uid } = userInfo.value;
  if (route.query.play) {
    const areaIndex = sessionStorage.getItem('AREA_INDEX');
    cpUrl.value = `${iframeUrl}/play/${route.query.play}?t=${token.value}&prefix=${prefix}&uid=${uid}&areaIndex=${areaIndex}`;
  } else {
    cpUrl.value = `${iframeUrl}?t=${token.value}&prefix=${prefix}&uid=${uid}`;
  }
});
// TODO
</script>

<template>
  <div class="cg-lottery">
    <div class="lottery-wrapper">
      <!-- <div v-if="showLoading" class="loading">
          <div class="progress-box">
            <h6>{{ schedule }}%</h6>
            <div class="progress">
              <span :style="{ width: `${schedule}%` }" />
            </div>
          </div>
        </div> -->
      <iframe v-if="token" id="cglottery" :key="cpUrl" :style="{ opacity: showLoading ? 0 : 1 }" :src="cpUrl" w-full h-full frameborder="0" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cg-lottery {
  width: 100%;
  overflow: hidden;
  height: 100vh;

  .lottery-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
  }

  #cglottery {
    width: 100%;
    height: 100%;
    transition: all 0.35s ease;
  }

  .loading {
    width: 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    img {
      width: 100%;
    }

    .progress-box {
      position: absolute;
      bottom: 25%;
      left: 50%;
      transform: translateX(-50%);

      h6 {
        font-weight: bolder;
        color: var(--cg-color-grey10);
        margin-bottom: 8px;
        text-align: right;
      }

      .progress {
        width: 600px;
        height: 10px;
        background-color: var(--cg-color-white11);
        border-radius: 20px;
        overflow: hidden;

        span {
          display: block;
          height: 10px;
          background-color: var(--cg-color-blue15);
          transition: all 0.5s ease;
        }
      }
    }
  }
}
</style>
