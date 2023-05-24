<!--suppress ALL -->
<template>
  <div class="help-view">
    <div v-for="(fit, ind) in rightList" :key="ind">
      <!--    蓝色标题    -->
      <div v-if="fit.title" class="title" :class="{ title_mt: ind === 0 }">{{ fit.title }}</div>
      <!--    黑色标题    -->
      <article v-if="fit.article">{{ fit.article }}</article>
      <section v-for="(val, i) in fit.item" :key="i">
        <div class="sectionInfo">
          <nav v-if="val.num">({{ val.num }})&nbsp;</nav>
          <nav v-if="val.num_null">{{ val.num_null }}.&nbsp;</nav>
          <nav v-if="val.hang" style="visibility: hidden">22&nbsp;</nav>

          <div>
            <!--    空格    -->
            <span v-if="val.nbsp">&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span v-if="val.margin" :class="val.margin"></span>
            {{ val[`item${i + 1}`] }}
          </div>

        </div>

        <!--    换行    -->
        <div v-if="val.kong" class="kong"></div>

        <!--    icon    -->
        <template v-if="val.icon">
          <div class="iconCss">
            <div v-for="(iconItem, iconInd) in val.icon" :key="iconInd" class="icon-item">
              <div class="bgBox">
                <cg-icon :name="iconItem[`icon${iconInd + 1}`]" :width="54" :height="54" />
              </div>
              <div class="icon-text">
                <span>{{ iconItem.cont1 }}</span>
                <span>{{ iconItem.cont2 }}</span>
                <span>{{ iconItem.cont3 }}</span>
              </div>
            </div>
          </div>
        </template>

        <!--    img    -->
        <template v-if="val.img">
          <div class="imgCss">
            <div v-for="(imgItem, imgInd) in val.img" :key="imgInd" class="icon-item">
              <div>
                <cg-icon :name="imgItem[`icon${imgInd + 1}`]" :width="54" :height="54" />
              </div>
              <div class="icon-text">
                <span>{{ imgItem.cont1 }}</span>
                <span>{{ imgItem.cont2 }}</span>
              </div>
            </div>
          </div>
        </template>

        <!--    imgs    -->
        <template v-if="val.imgs">
          <div class="imgsCss">
            <div v-for="(imgsItem, imgsInd) in val.imgs" :key="imgsInd" class="icon-item">
              <div class="shadow-item">
                <cg-icon :name="imgsItem[`icon${imgsInd + 1}`]" :width="60" :height="60" />
              </div>
              <div class="icon-text ai-c">
                <span>{{ imgsItem.cont1 }}</span>
                <!-- <span v-if="imgsItem.underline" :class="{ underline: imgsItem.underline }" @click="openWin(imgsItem)">{{ imgsItem.cont2 }}</span> -->
                <template v-for="(v, t) in customerServices" :key="t">
                  <span v-if="+imgsItem.kf_type === +v.kf_type && v.content">
                    <p v-for="(t_c, index) in v.content?.split(',') || []"  @click="openWin(v, index)" :class="{ underline: v.url }">
                      {{ t_c }}
                    </p>
                  </span>
                </template>
              </div>
            </div>
          </div>
        </template>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted, watch, computed } from 'vue';
import { contentList } from './mock';
import { useRoute, useRouter } from 'vue-router';
import { CgIcon } from '@/components/cg-template-2';
import { useAppStore } from '@/store-pinia';
import { storeToRefs } from 'pinia';

const props = defineProps({
  menuList: Array<any>
});

const appStore = useAppStore();

const { customerServices } = storeToRefs(appStore);
const openWin = (item: any, index?: number | undefined) => {
  index = index || 0;
  let url = item.url || '';
  // for (const val of customerServices.value) {
  //   if (val.title.toLowerCase().indexOf(item.type) !== -1) url = val.url || '';
  // }
  if (url && url.length) {
    url = url.split(',');
    console.log(url);
    if (index < url.length) {
      window.open(url[index], '_blank');
    } else {
      window.open(url[url.length - 1], '_blank');
    }
  }
};

const router = useRouter();
const rightList = ref<any>();
const updateMenuPosition = () => {
  let category = +window.location.pathname.slice(6, 7);
  let subclass = 1 + +window.location.pathname.slice(8, 9);
  rightList.value = contentList[category][`cont${subclass}`];
  console.log(category, `cont${subclass}`);
  window.scrollTo && window.scrollTo(0, 0);
};
onMounted(() => {
  updateMenuPosition();
});
watch(router.currentRoute, val => {
  if (/^\/help\//.test(val.path)) {
    updateMenuPosition();
  }
});
</script>

<script lang="ts">
export default {
  name: 'HelpContent'
};
</script>
<style lang="scss" scoped>
.help-view {


  .title {
    color: var(--cg-color-blue12);
    font: var(--cg-font-text2);
    margin: 28px 0 8px;
  }

  .title_mt {
    margin-top: 0;
  }

  article {
    margin: 28px 0 8px;
    font: var(--cg-font-text2);
  }

  section {
    font: var(--cg-font-text);
    line-height: 24px;

    .sectionInfo {
      display: flex;
      color: var(--cg-color-grey1);

      nav {
        // width: 42px;
        text-align: left;
      }
    }

    .kong {
      height: 28px;
    }

    .margin {
      padding-left: 18px;
    }

    .zimu {
      padding-left: 22px;
    }

    .zimu-second {
      padding-left: 42px;
    }

    .iconCss {
      display: flex;
      width: 100%;
      height: 54px;
      margin: 14px 0;

      .icon-item {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        .bgBox {
          width: 66px;
          height: 66px;
          background: url(link($base-img-dir + '/icon/i_mock.png')) no-repeat;
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
        }

        .icon-text {
          margin-left: 12px;
          font: var(--cg-font-text5);
          display: flex;
          flex-direction: column;
          text-align: left;
        }
      }
    }
  }
}

.imgCss {
  .icon-item {
    display: flex;
    align-items: center;

    .icon-text {
      display: flex;
      flex-direction: column;
      color: var(--cg-color-grey1);
      font: var(--cg-font-text3);
      margin: 14px 0 14px 12px;
    }
  }
}

.imgsCss {
  display: flex;
  margin-top: 14px;

  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 80px;

    .shadow-item {
      width: 60px;
      height: 60px;
      // background: linear-gradient(360deg, #f3f9ff 0%, var(--cg-color-blue9) 100%);
      // box-shadow: 0px 1px 1px var(--cg-color-white);
      // border-radius: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .icon-text {
      display: flex;
      flex-direction: column;
      text-align: center;
      font: var(--cg-font-text5);
      color: var(--cg-color-blue12);
      margin-top: 7px;

      span:first-child {
        font: var(--cg-font-text1);
        color: var(--cg-color-grey1);
        margin-bottom: 6px;
      }

      .underline {
        cursor: pointer; // 手指
        //text-decoration: underline;
      }
    }
  }
}
</style>
