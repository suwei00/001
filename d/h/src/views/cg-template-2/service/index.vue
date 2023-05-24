<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useAppStore } from '@/store-pinia';
import { storeToRefs } from 'pinia';
import { CgHeader, CgIcon } from '@/components/cg-template-2';

const appStore = useAppStore();

const { customerServices } = storeToRefs(appStore);

const showPhone = ref(false);

const mm = computed(() => customerServices.value.length % 4);
const openWin = (item: any) => {
  if (+item.kf_type === 2) {
    showPhone.value = true; // !showPhone.value;
  }
  let url;
  if (item.url && item.url.length) {
    url = item.url.split(',');
    window.open(url[0], '_blank');
  }
};
const callUrl = ref('');
const openCust = (item: any, index: number) => {
  if (+item.kf_type === 2) {
    showPhone.value = true; 
    if (item.content && item.content.length) {
      const content = item.content.split(',');
      if (content.length > 1) {
        console.error('content.length', content.length);
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
    console.log('callUrl.value-->', callUrl.value);
  }
  let url;
  if (item.url && item.url.length) {
    url = item.url.split(',');
    if (index < url.length) {
      window.open(url[index], '_blank');
    } else {
      window.open(url[url.length - 1], '_blank');
    }
  }
};

onMounted(() => {
  appStore.getCSKH();
});
</script>
<template>
  <div class="service">
    <CgHeader> CSKH </CgHeader>
    <section>
      <div class="top">
        <div class="left">
          <app-image src="/csphoto.png" />
        </div>
        <div class="right">
          <h3>CHÀO MỪNG ĐẾN VỚI TRUNG TÂM<br />CHĂM SÓC KHÁCH HÀNG</h3>
          <p>PHỤC VỤ BẠN 24/7</p>
        </div>
      </div>
      <ul class="cskh-list">
        <li
          v-for="(item, index) in customerServices"
          :key="index"
          :class="[
            'service-item',
            !!item.url ? 'has-url' : 'no-url',
            !!item.content ? 'has-content' : 'no-content',
            item.title?.toLowerCase().split(' ').join('-'),
            // mm 不等于 0，表示需要补全，等于 0 则不需要
            customerServices.length + (mm !== 0 ? 4 - mm : 0) - (index + 1) < 4 ? 'last-line' : ''
          ]"
          @click="() => openWin(item)"
        >
          <template v-if="index < 8">
            <div class="img-box">
              <app-image
                :is-google-cloud="true"
                :src="item.img"
                :alt="item.title"
                class="item-img"
              />
            </div>
            <div class="desc">
              <!-- <div v-if="item.url" class="title">{{ item.title }}</div> -->
              <!-- <template v-if="+item.kf_type !== 2"> -->
                <div v-if="+item.kf_type === 2 ? item.title && !showPhone : item.title" class="title">
                  <p
                    v-for="(i, index) in item.title.split(',')"
                    :key="index"
                    @click.stop="openCust(item, index)"
                  >
                    {{ i }}
                  </p>
                </div>
              <!-- </template> -->
                <div v-if="+item.kf_type === 2 && item.content && showPhone" class="title content" :class="{'is-call': +item.kf_type === 2, 'just-one': item.title.split(',').length === 1}">
                  <a :href="`tel:${callUrl}`">
                    <p
                      v-for="(i, index) in item.content.split(',')"
                      :key="index"
                      @click.stop="openCust(item, index)"
                    >
                      {{ i }}
                    </p>
                  </a>
                </div>
            </div>
          </template>
        </li>
        <li v-for="i in 4 - mm" v-if="mm !== 0" class="last-line"></li>
      </ul>
      <h2 class="sub-title">TRUNG TÂM GIÚP ĐỠ</h2>
      <ul class="list-links">
        <li class="list-link-item">
          <router-link to="/help?category=1">
            <div class="left">
              <cg-icon name="i_issue" width="52" />
              <div class="label">GIÚP ĐỠ NGƯỜI MỚI</div>
            </div>
            <div class="right">
              <cg-icon name="i_arrowright" width="16" />
            </div>
          </router-link>
        </li>
        <li class="list-link-item">
          <router-link to="/help?category=2">
            <div class="left">
              <cg-icon name="i_game_pr" width="52" />
              <div class="label">VẤN ĐỀ VỀ TRÒ CHƠI</div>
            </div>
            <div class="right">
              <cg-icon name="i_arrowright" width="16" />
            </div>
          </router-link>
        </li>
        <li class="list-link-item">
          <router-link to="/help?category=3">
            <div class="left">
              <cg-icon name="i_about" width="52" />
              <div class="label">GIỚI THIỆU VỀ P3</div>
            </div>
            <div class="right">
              <cg-icon name="i_arrowright" width="16" />
            </div>
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Service'
};
</script>

<style lang="scss" scoped>
.pub_blue {
  background: linear-gradient(0, var(--cg-color-blue1) 0%, var(--cg-color-blue6) 100%);
  border-radius: 16px;
  padding: 6px;
}
.sub-title {
  font: var(--cg-font-text1);
  line-height: 28px;
  color: var(--cg-color-black1);
  padding: 24px 0 24px 32px;
}

.list-links {
  font: var(--cg-font-text9);
  line-height: 24px;
  background-color: var(--cg-color-white);
  color: var(--cg-color-black1);

  a {
    color: var(--cg-color-black1);
  }

  .list-link-item {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--cg-color-blue13);
    align-items: center;
    padding: 0 36px 0 32px;
    > a {
      width: 100%;
      justify-content: space-between;
      display: flex;
      align-items: center;
    }

    .left {
      display: flex;
      align-items: center;

      .label {
        padding-left: 24px;
      }
    }
  }

  .list-link-item:last-child {
    // border-bottom: 0;
  }
}
.service {
  .top {
    display: flex;
    justify-content: flex-start;
    padding: 32px 0 36px 32px;
    background-color: var(--cg-color-white);
    border-bottom: 2px solid var(--cg-color-blue13);
    margin-bottom: 24px;
    .left {
      padding-right: 24px;
      img {
        width: 160px;
        height: 160px;
        display: block;
      }
    }
    .right {
      h3 {
        font: var(--cg-font-text1);
        line-height: 44px;
        color: var(--cg-color-blue1);
      }
      p {
        font: var(--cg-font-text9);
        line-height: 36px;
        color: var(--cg-color-black1);
        padding-top: 24px;
      }
    }
  }
  .cskh-list {
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid var(--cg-color-blue11);
    border-bottom: 1px solid var(--cg-color-blue11);
    font: var(--cg-font-text8);
    line-height: 24px;
    color: var(--cg-color-black1);
    text-align: center;
    align-items: stretch;
    li {
      width: 25%;
      min-height: 144px;
      padding-top: 12px;
      border-right: 1px solid var(--cg-color-blue11);
      border-bottom: 1px solid var(--cg-color-blue11);
      background: linear-gradient(
          180deg,
          var(--cg-color-blue16) 0.35%,
          var(--cg-color-white) 31.34%,
          var(--cg-color-white1) 100%
        ),
        var(--cg-color-white);
      .img-box {
        // width: 60px;
        height: 60px;
        text-align: center;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      img {
        // max-width: 100%;
        height: 100%;
        margin: 0 auto;
      }
      .title {
        padding-top: 20px;
        line-height: 24px;
      }
      .content, .is-call {
        font: var(--cg-font-text12);
        padding-top: 8px;
        line-height: 24px;
        color: var(--cg-color-blue1);
        a{
          font: var(--cg-font-text12);
          color: var(--cg-color-blue1);
        }
      }
      .title.is-call.just-one {
        font: var(--cg-font-text10);
        padding-top: 20px;
        line-height: 24px;
        white-space: nowrap;
        a{
          font: var(--cg-font-text10);
        }
      }
    }
    li:nth-child(4n) {
      border-right: 0;
    }
    li.last-line {
      border-bottom: 0;
    }
  }
}
</style>
