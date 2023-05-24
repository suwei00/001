<template>
  <div class="cg-help">
    <CgHeader>
      {{ title }}
      <template #actions>
        <cg-icon width="52" name="i_operator" @click="operator('customer-service')" />
      </template>
    </CgHeader>
    <template v-if="!rightList.length">
      <ul class="help" v-if="!childList.length">
        <template v-for="(item, index) in menuList" :key="item.icon">
          <li class="li_item" @click="navigate(item, item.id)" :class="{ li_active: categoryActive === index }">
            <div class="info">
              <div class="micon">
                <cg-icon :name="item.icon" :width="52" :height="52" />
                <div class="label" v-text="item.label"></div>
              </div>
              <cg-icon name="i_arrowright" :width="16" :height="28" />
            </div>
          </li>
        </template>
      </ul>
      <ul class="help" v-if="childList.length">
        <li class="li_item" :class="{ active: childIndex == subclassActive }" v-for="(item, childIndex) in childList"
          :key="childIndex" @click="changeMenuChild(childIndex + 1, item.name)">
          <div class="info child-info">
            <span>{{ item.name }}</span>
            <cg-icon name="i_arrowright" :width="16" :height="28" />
          </div>
        </li>
      </ul>
      <footer>
        <div>Nếu vấn đề của bạn vẫn chưa được giải quyết,</div>
        <div>
          vui lòng liên hệ <span @click="operator('customer-service')">CSKH</span> để được hỗ trợ
        </div>
      </footer>
    </template>

    <div class="help-view" v-if="rightList.length && !(+categoryActive === 3 && +subclassActive === 6)">
      <div v-for="(fit, ind) in rightList" :key="ind">
        <!--    蓝色标题    -->
        <div v-if="fit.title" :class="['title', { title_o: ind === 0 }]">{{ fit.title }}</div>
        <!--    黑色标题    -->
        <article v-if="fit.article">{{ fit.article }}</article>
        <section v-for="(val, i) in fit.item" :key="i">
          <div class="sectionInfo">
            <nav v-if="val.num">({{ val.num }})&nbsp;</nav>
            <nav v-if="val.num_null">{{ val.num_null }}.&nbsp;</nav>
            <nav v-if="val.hang" style="visibility: hidden">22&nbsp;</nav>
            <div :class="[val.bold ? 'bold' : '', val.black ? 'black-title' : '']">
              <!--    空格    -->
              <span v-if="val.nbsp">&nbsp;&nbsp;&nbsp;&nbsp;</span>
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
                  <cg-icon :name="iconItem[`icon${iconInd + 1}`]" :width="100" :height="100" />
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
                  <cg-icon :name="imgItem[`icon${imgInd + 1}`]" :width="120" :height="120" />
                </div>
                <div class="icon-text">
                  <span>{{ imgItem.cont1 }}</span>
                  <span>{{ imgItem.cont2 }}</span>
                </div>
              </div>
            </div>
          </template>
        </section>
      </div>
    </div>

    <div class="help-view-o" v-if="rightList.length && +categoryActive === 3 && +subclassActive === 6">
      <div v-for="(fit, ind) in rightList" :key="ind">
        <!--    蓝色标题    -->
        <template v-if="fit.title">
          <cg-container padding="0" border="0" :is-shadow="false" :radius="'14,14,0,0'">
            <cg-container-head>
              <template #left>
                <div :class="['title']">{{ fit.title }}</div>
              </template>
            </cg-container-head>
          </cg-container>
        </template>

        <div class="helpBox">
          <!--    黑色标题    -->
          <cg-container padding="0" border="0" :is-shadow="false" radius="0">
            <article v-if="fit.article">{{ fit.article }}</article>
            <section v-for="(val, i) in fit.item" :key="i">
              <p>{{ val[`item${i + 1}`] }}</p>

              <!--    imgs    -->
              <template v-if="val.imgs">
                <div class="imgsCss">
                  <div v-for="(imgsItem, imgsInd) in val.imgs" :key="imgsInd" class="icon-item">
                    <div class="shadow-item" @click="openWin(imgsItem)">
                      <cg-icon :name="imgsItem[`icon${imgsInd + 1}`]" :width="108" :height="108" />
                    </div>
                    <div class="icon-text">
                      <span>{{ imgsItem.cont1 }}</span>
                      <template v-for="(v, t) in customerServices" :key="t">
                        <template v-if="+v.kf_type === +imgsItem.kf_type">
                          <span v-if="v.content">
                            <div v-if="+v.kf_type !== 2">
                              <div v-for="(t_c, index) in v.content?.split(',') || []"
                                :class="{ underline: +v.kf_type !== 2 }" @click="openCust(v, index)">
                                {{ t_c }}
                              </div>
                            </div>
                            <div v-else>
                              <a :href="!isAppSource ? `tel:${callUrl}` : `javascript:void(0)`">
                                <div v-for="(t_c, index) in v.content?.split(',') || []"
                                  :class="{ underline: +v.kf_type !== 2 }" @click="openPhone(v, index)">
                                  {{ t_c }}
                                </div>
                              </a>
                            </div>
                          </span>
                        </template>
                      </template>
                    </div>
                  </div>
                </div>
              </template>
            </section>
          </cg-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted, watch, computed, reactive } from 'vue';
import { contentList } from './mock';
import { useRoute, useRouter } from 'vue-router';
import { CgContainer, CgContainerHead, CgIcon, CgHeader } from '@/components/cg-template-2';
import { useAppStore } from '@/store-pinia';
import { storeToRefs } from 'pinia';
import { Toast } from 'vant';

const menuList = reactive([
  {
    id: 1,
    icon: 'i_qysw',
    label: 'GIÚP ĐỠ NGƯỜI MỚI',
    childList: [
      { name: 'Đăng Ký Tài Khoản', pid: 0 },
      { name: 'Nạp Tiền', pid: 0 },
      { name: 'Rút Tiền', pid: 0 },
      { name: 'Chuyển Khoản', pid: 0 },
      { name: 'Đăng Ký Hoạt Động', pid: 0 },
      { name: 'Trình Duyệt Hỗ Trợ', pid: 0 },
      { name: 'Quên Mật Khẩu', pid: 0 },
      { name: 'Cài Đặt DNS', pid: 0 }
    ]
  },
  {
    id: 2,
    icon: 'i_yxwt',
    label: 'VẤN ĐỀ VỀ TRÒ CHƠI',
    childList: [
      { name: 'Vấn Đề Về Lô Đề', pid: 1 },
      { name: 'Thể Loại Trò Chơi', pid: 1 }
    ]
  },
  {
    id: 3,
    icon: 'i_xsbz',
    label: 'GIỚI THIỆU VỀ P3',
    childList: [
      { name: 'Giới Thiệu', pid: 2 },
      { name: 'Trách Nhiệm Cá Cược', pid: 2 },
      { name: 'Quy Định Điều Khoản', pid: 2 },
      { name: 'Chính Sách Riêng Tư', pid: 2 },
      { name: 'Hỗ Trợ Kỹ Thuật', pid: 2 },
      { name: 'Liên Hệ Với Chúng Tôi', pid: 2 }
    ]
  }
]);

// 点击菜单函数
const categoryActive = ref<number>(0);
const subclassActive = ref<number>(0);
const title = ref<string>('TRUNG TÂM GIÚP ĐỠ');
const childList = ref<any>([]);
const navigate = (item: any, index: number): void => {
  childList.value = item.childList;
  title.value = item.label;
  categoryActive.value = index;
  router.push({
    name: 'Help',
    query: {
      category: categoryActive.value
    }
  });
};
const changeMenuChild = (childIndex: number, label: string): void => {
  subclassActive.value = childIndex;
  title.value = label;
  router.push({
    name: 'Help',
    query: {
      category: categoryActive.value,
      subclass: childIndex
    }
  });
};

// 监听路由
const route = useRoute();
const router = useRouter();
const rightList = ref<any>([]);
watch(
  () => [route.query.category, route.query.subclass],
  ([n, m]) => {
    if (Number(n) === 1 && Number(m) == 3) {
      title.value = 'HƯỚNG DẪN RÚT TIỀN';
      rightList.value = contentList[+n - 1][`cont${+m}`];
      categoryActive.value = +n;
      subclassActive.value = +m;
      return;
    }
    if (Number(n) === 1 && Number(m) == 4) {
      title.value = 'HƯỚNG DẪN CHUYỂN KHOẢN';
      rightList.value = contentList[+n - 1][`cont${+m}`];
      categoryActive.value = +n;
      subclassActive.value = +m;
      return;
    }
    if (n && m) {
      rightList.value = contentList[+n - 1][`cont${+m}`];
      categoryActive.value = +n;
      subclassActive.value = +m;
    } else if (!n && !m) {
      rightList.value = [];
      childList.value = [];
      title.value = 'TRUNG TÂM GIÚP ĐỠ';
    } else {
      rightList.value = menuList[+n - 1];
      childList.value = menuList[+n - 1].childList;
      title.value = menuList[+n - 1].label;
      categoryActive.value = +n;
    }
  },
  {
    immediate: true
  }
);

// 详情点击跳转
const appStore = useAppStore();
const { customerServices } = storeToRefs(appStore);
const callUrl = ref('');// 客服地址
const openWin = (item: any) => {
  let url;
  for (const val of customerServices.value) {
    if (+val.kf_type === +item.kf_type) url = val.url;
  }
  if (url && url.length) {
    url = url.split(',');
    const isApp = router.currentRoute.value.query['source'];
    if (isApp) {
      window.open(
        `yiyappnative://event?type=browser&param0=${(url[0])}`,
        '_self'
      );
    } else {
      window.open(url[0], '_blank');
    }
  }
};

const operator = (toPath: string) => {
  router.push(`/${toPath}`);
};


const openCust = (item: any, index?: number | undefined) => {
  index = index || 0;
  let url = item.url || '';
  if (url && url.length) {
    url = url.split(',');
    const isApp = router.currentRoute.value.query['source'];
    // Toast('isApp' + isApp);
    if (index < url.length) {
      if (isApp) {
        window.open(
          `yiyappnative://event?type=browser&param0=${(url[index])}`,
          '_self'
        );
      } else {
        window.open(url[index], '_blank');
      }
    } else {
      if (isApp) {
        window.open(
          `yiyappnative://event?type=browser&param0=${(url[url.length - 1])}`,
          '_self'
        );
      } else {
        window.open(url[url.length - 1], '_blank');
      }
    }
  }
};
const isAppSource = ref(router.currentRoute.value.query['source']);
const openPhone = (item: any) => {
  const isApp = router.currentRoute.value.query['source'];
  console.error('isApp---->',isApp);
  if(isApp){
    let url = '';
    if (item.content && item.content.length) {
      const content = item.content.split(',');
      if (content.length > 1) {
        if (localStorage.getItem('callIndex') == '1') {
          localStorage.setItem('callIndex', '0');
          url = content[localStorage.getItem('callIndex') || '0'];
        } else {
          localStorage.setItem('callIndex', '1');
          url = content[localStorage.getItem('callIndex') || '0'];
        }
      } else {
        url = item.content;
      }
    }
    window.open(
      `yiyappnative://event?type=service_num&param0=${url}`,
      '_self'
    );

  }else{
    if (item.content && item.content.length) {
      const content = item.content.split(',');
      if (content.length > 1) {
        if (localStorage.getItem('callIndex') == '1') {
          localStorage.setItem('callIndex', '0');
          callUrl.value = content[localStorage.getItem('callIndex') || '0'];
        } else {
          localStorage.setItem('callIndex', '1');
          callUrl.value = content[localStorage.getItem('callIndex') || '0'];
        }
      } else {
        callUrl.value = item.content;
      }
    }
  }
};
</script>

<script lang="ts">
export default {
  name: 'HelpContent'
};
</script>

<style lang="scss" scoped>
// 一级菜单样式
// 二级菜单样式
.help {
  background: var(--cg-color-white);
  font: var(--cg-font-text2);

  .li_item {
    width: 100%;
    height: 100px;
    border-bottom: 2px solid var(--cg-color-blue13);
    display: flex;
    align-items: center;

    .info {
      width: 100%;
      padding: 0 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .micon {
        display: flex;
        align-items: center;

        .label {
          margin-left: 20px;
          //color: var(--cg-color-red3);
          //font: var(--cg-font-text2);
        }
      }
    }

    .child-info {
      font: var(--cg-font-text1);
    }
  }
}

// 一级、二级菜单 底部样式
footer {
  line-height: 54px;
  margin: 32px auto;
  font: var(--cg-font-text3);
  color: var(--cg-color-grey6);

  div {
    text-align: center;

    span {
      color: var(--cg-color-blue1);
      text-decoration: underline;
    }
  }
}

// 详情样式
.help-view {
  width: 686px;
  height: auto;
  margin: 0 auto;
  margin-top: 24px;
  padding: 20px;
  background: var(--cg-color-white);
  border: 2px solid var(--cg-color-blue11);
  box-shadow: 0 8px 8px var(--cg-color-blue12);
  border-radius: 16px;

  .title {
    color: var(--cg-color-blue1);
    font: var(--cg-font-text1);
    margin: 20px 0 20px;
  }

  .title_o {
    margin-top: 0;
  }

  article {
    margin: 20px 0;
    font: var(--cg-font-text2);
  }

  section {
    font: var(--cg-font-text3);
    color: var(--cg-color-black1);
    line-height: 30px;

    .kong {
      height: 28px;
    }

    .sectionInfo {
      display: flex;

      .bold {
        font: var(--cg-font-text8);
        margin: 15px 0 20px 0;
      }

      .black-title {
        font: var(--cg-font-text1);
        color: var(--cg-color-black);
        margin: 15px 0 20px 0;
      }

      nav {
        // width: 42px;
        text-align: left;
      }
    }

    .iconCss {
      display: flex;
      width: 100%;
      margin: 30px 0 20px;

      .icon-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;

        .bgBox {
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
        }

        .icon-text {
          margin-top: 15px;
          font: var(--cg-font-text13);
          display: flex;
          flex-direction: column;
          text-align: center;
        }
      }
    }
  }

  >div:last-of-type {
    section:last-of-type {
      .kong {
        height: 0 !important;
      }
    }
  }
}

.imgCss {
  margin-bottom: 20px;
  margin-top: 10px;

  .icon-item {
    display: flex;
    justify-content: center;
    align-items: center;

    .icon-text {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      color: var(--cg-color-black2);
      line-height: 24px;
      font: var(--cg-font-h3);
      margin-left: 24px;
    }
  }
}

.help-view-o {
  width: 686px;
  height: auto;
  margin: 0 auto;
  margin-top: 24px;
  background: var(--cg-color-white);
  border: 2px solid var(--cg-color-blue11);
  box-shadow: 0 8px 8px var(--cg-color-blue12);
  border-radius: 16px;
  font: var(--cg-font-text3);
  color: var(--cg-color-black1);

  .title {
    width: 100%;
    padding-left: 18px;
  }

  .helpBox {
    padding: 0 20px;

    article {
      margin: 20px 0;
      text-align: center;
      font: var(--cg-font-text7);
    }

    section {
      p {
        width: 570px;
        margin: 0 auto 20px;
        line-height: 30px;
        text-align: center;
      }

      .imgsCss {
        display: flex;
        margin-top: 20px;
        padding-bottom: 12px;
        border-bottom: 2px solid var(--cg-color-blue11);

        .icon-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;

          .shadow-item {
            width: 108px;
            height: 108px;
            // background: linear-gradient(360deg,
            //     var(--cg-color-white10) 0%,
            //     var(--cg-color-blue9) 100%);
            box-shadow: 0px 1px 1px var(--cg-color-white);
            border-radius: 54px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .icon-text {
            display: flex;
            flex-direction: column;
            text-align: center;
            font: var(--cg-font-text7);
            color: var(--cg-color-blue1);
            margin-top: 10px;

            span:first-child {
              color: var(--cg-color-black);
              margin-bottom: 12px;
            }

            .underline {
              //text-decoration: underline;
              margin: 0 auto;
            }
            a{
              color: var(--cg-color-blue1) !important;
            }
          }
        }

        .icon-item:nth-of-type(1) {
          .icon-text {
            >span:nth-of-type(2) {
              display: inline-flex;
            }
          }
        }

        .icon-item:nth-of-type(2) {
          .icon-text {
            >span:nth-of-type(2) {
              display: inline-flex;
            }
          }
        }
      }
    }
  }
}
</style>
