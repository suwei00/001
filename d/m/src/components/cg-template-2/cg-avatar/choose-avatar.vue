<template>
  <CgContainer type="popup" padding="30" radius="12">
    <template #head>
      <cg-container-head>
        <template #center>CHỈNH ẢNH ĐẠI DIỆN</template>
        <template #right><cg-icon class="closeicon" width="20" name="i_grey_close" @click="() => props.close()" /></template>
      </cg-container-head>
    </template>
    <template #content>
      <section class="choose-avatar">
        <div class="left">
          <p class="title">Xem Trước</p>
          <div class="cur-avatar">
            <app-image class="img" :src="`/avatar/${curAvatar}.png`" alt="icon-online" />
          </div>
          <p class="name">{{ userInfo.username }}</p>
        </div>
        <div class="right">
          <ul class="">
            <li v-for="item in avatarList" :key="item.id">
              <div class="img-box" @click="$event => selectAvatar(item)">
                <app-image class="img" :src="`/avatar/${item.id}.png`" alt="avatar-img" />
              </div>
            </li>
          </ul>
        </div>
      </section>
      <div class="btn-box">
        <cg-button small @click="$event => submitAvatar()">Lưu ảnh đại diện</cg-button>
      </div>
    </template>
  </CgContainer>
</template>

<script setup lang="ts">
import { updateAvatar } from '@/http/blue-apis';
import { ref, reactive } from 'vue';
import { CgButton, CgContainer, CgContainerHead, CgIcon } from '@/components/cg-template-2';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { storeToRefs } from 'pinia';

const props = defineProps<{ close: () => void }>();

const userInfoStore = userInfoStateStore();
const { userInfo } = storeToRefs(userInfoStore);

const curAvatar = ref(userInfo.value.avatar || '0'); // 初始值是当前用户头像

const avatarList = reactive([
  { id: '1', url: '' },
  { id: '2', url: '' },
  { id: '3', url: '' },
  { id: '4', url: '' },
  { id: '5', url: '' },
  { id: '6', url: '' },
  { id: '7', url: '' },
  { id: '8', url: '' },
  { id: '9', url: '' },
  { id: '10', url: '' },
  { id: '11', url: '' },
  { id: '12', url: '' },
  { id: '13', url: '' },
  { id: '14', url: '' },
  { id: '15', url: '' },
  { id: '16', url: '' }
]);

const selectAvatar = (item: any) => {
  curAvatar.value = item.id;
};

const submitAvatar = async () => {
  updateAvatar({ id: curAvatar.value }).then((res: any) => {
    props.close();
    userInfoStore.getUserInfo();
  });
};
</script>

<script lang="ts">
export default {
  name: 'ChooseAvatar'
};
</script>

<style lang="scss" scoped>
.closeicon {
  cursor: pointer;
}
.choose-avatar {
  display: flex;
  position: relative;
  z-index: 2020;
  justify-content: space-between;
  .left {
    // padding-right: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 110px;

    .cur-avatar {
      overflow: hidden;
      margin: 5px 0 8px;
      border: 3px solid var(--cg-color-blue12);
      border-radius: 50%;
      width: 104px;
      height: 104px;
    }

    .title {
      font: var(--cg-font-text6);
      line-height: 15px;
      color: var(--cg-color-grey1);
    }

    .name {
      font: var(--cg-font-text1);
      line-height: 17px;
      color: var(--cg-color-grey1);
      white-space: normal;
      word-break: break-all;
      text-align: center;
    }
  }

  .right {
    width: 296px;

    ul {
      width: 296px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      li {
        .img-box {
          border: 1px solid transparent;
          border-radius: 100%;
          width: 70px;
          height: 70px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;

          &:hover {
            border-color: var(--cg-color-blue3);
            box-shadow: 0px 0px 12px var(--cg-color-blue3);
          }

          img {
            width: 60px;
            height: 60px;
            border-radius: 60px;
            display: block;
          }
        }
      }
    }
  }
}

.btn-box {
  display: flex;
  justify-content: center;
  padding-top: 28px;
}
</style>
