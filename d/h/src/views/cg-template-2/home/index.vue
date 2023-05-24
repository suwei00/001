<script setup lang="ts">
import CgCarousell from './components/carousell/index.vue';
import CgMarquee from './components/marquee/index.vue';
import CgUser from './components/user/index.vue';
import GameContent from './components/game-content/index.vue';
import APIs from '@/http/blue-apis';
import { ref, onActivated, onDeactivated } from 'vue'; // , onMounted, onBeforeUnmount
import { useRequest } from 'vue-request';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store-pinia';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call';
import Advertise from '@/components/cg-template-2/cg-advertise/index.vue';
import EmergencyLetter from '@/components/cg-template-2/emergency-letter/index.vue';
import { connectUnsubscribe, onSubscribe } from '@/http/mqtt';
import { onBannerJump } from '@/utils/helpers';
import { onMounted } from 'vue';
import { gameStateStore } from '@/store-pinia/game';
const gameState = gameStateStore();

const Dialog = new CgDialogClass();
const router = useRouter();
const userInfoStore = userInfoStateStore();
const appStore = useAppStore();
const { isLogin } = storeToRefs(appStore);

const bannerList = ref([]);
useRequest(() => APIs.getBannerByFlags({ flags: 2 }), {
  onSuccess: (data: any) => {
    bannerList.value = data.banner.sort((a: any, b: any) => Number(a.sort) - Number(b.sort));
  }
});

const onToLink = (item: any) => {
  onBannerJump(item)
};

// const { barState, closeDownloadBar } = useCloseBar();

// 广告弹窗
const getAdvertise = () => {
  if (!localStorage.getItem('AdClose')) {
    APIs.getAdvertise().then(res => {
      if (res.banner.length) {
        Dialog.showDialog({
          template: 'tmp3',
          customComponent: Advertise,
          props: { data: res.banner, onToLink, close: () => Dialog.closeDialog() }
        });
      }
    });
  }
};
// 紧急站内信
const emergency = (getAd?: boolean) => {
  APIs.getEmergency()
    .then(res => {
      if (res && res[0].is_read === 0) {
        Dialog.showDialog({
          template: 'tmp2',
          customComponent: EmergencyLetter,
          confirmText: 'CSKH',
          cancelText: 'TÔI ĐÃ HIỂU',
          redTitle: res[0].title,
          props: { data: res[0] },
          onCancel() {
            APIs.readUserMsg({ id: res[0].id }).then(() => {
              emergency(true);
            });
          },
          onOk() {
            APIs.readUserMsg({ id: res[0].id }).then(() => {
              emergency(false);
            });
            router.push('/customer-service');
          }
        });
      } else {
        if (getAd) {
          getAdvertise();
        }
      }
    })
    .catch(err => {
      console.log('err==>', err);
    });
};

onActivated(() => {
  if (appStore.token) {
    emergency(true);
    userInfoStore.RefreshBalance();
  }
  appStore.getHomeData();
  onSubscribe('w88/homeData');
});

onDeactivated(() => {
  connectUnsubscribe('w88/homeData');
});

onMounted(()=>{
  gameState.getGaneList();
})
</script>

<script lang="ts">
export default {
  name: 'Home'
};
</script>

<template>
  <div class="home">
    <!-- :style="{ paddingTop: barState.show ? 'var(--cg-px-124)' : '0' }" -->
    <!--app下载-->
    <!-- <div class="app-download-bar flex-middle-only w100" v-if="barState.show">
      <div class="home-close" @click="closeDownloadBar" />
      <div class="down-load-btn fs-26" @click="appStore.downloadApp"></div>
    </div> -->

    <div class="carousel">
      <cg-carousell :banner-list="bannerList" @to-link="onToLink" />
    </div>
    <div class="marquee_cont">
      <cg-marquee />
    </div>
    <cg-user :is-login="isLogin" />
    <div class="game_content">
      <GameContent />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;

  .carousel {
    width: 100%;
    height: 370px;
  }

  .marquee_cont {
    height: 48px;
    margin-top: 12px;
    margin-bottom: 25px;
    padding: 0 32px;
  }

  .game_content {
    margin-top: 20px;
  }
}

.app-download-bar {
  top: 0;
  position: fixed;
  height: 124px;
  z-index: 11;
  padding: 0 20px;
  background-image: url(link($base-img-dir + 'home/app-download-bg.gif'));
  background-size: 100% 100%;
  font-family: AppleSystemUIFontBold;
  display: flex;
  justify-content: space-between;

  .home-close {
    width: 50px;
    height: 50px;
    margin: 26px 20px 20px 0;
  }

  .down-load-btn {
    width: 185px;
    height: 70px;
    border-radius: 5px;
    padding: 0 20px;
  }
}
</style>
