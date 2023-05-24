<script setup lang="ts">
import { updateAvatar } from '@/http/blue-apis';
import { ref, reactive } from 'vue';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { storeToRefs } from 'pinia';
import { CgHeader, CgButton } from '@/components/cg-template-2';
import { useRouter } from 'vue-router';

const router = useRouter();

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
    userInfoStore.getUserInfo();
    router.go(-1);
  });
};
</script>
<template>
  <div class="edit-avatar">
    <CgHeader> CHỈNH ẢNH ĐẠI DIỆN </CgHeader>
    <section>
      <div class="bar">
        <h3>Xem Trước</h3>
        <!-- <cg-avatar :img="curAvatar" rate="100" width="300" height="300"> </cg-avatar> -->
        <div class="avatar-box">
          <app-image :src="`/avatars/avatar-${curAvatar}.png`" class="img-size" />
        </div>
        <p>{{ userInfo.username }}</p>
      </div>
      <ul class="avatars">
        <li v-for="item in avatarList" class="item"  @click="selectAvatar(item)">
          <div class="box" :class="{ active: curAvatar === item.id }">
            <app-image :src="`/avatars/avatar-${item.id}.png`" class="img-size" />
          </div>
        </li>
      </ul>
      <div class="bot-btn">
        <cg-button width="686" height="88" @click="submitAvatar">LƯU ẢNH ĐẠI DIỆN</cg-button>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
export default {
  name: 'EditAvatar'
};
</script>

<style lang="scss" scoped>
.edit-avatar {
  .bar {
    font: var(--cg-font-text1);
    line-height: 30px;
    text-align: center;
    .cg-avatar {
      margin: 0 auto;
    }
    h3 {
      color: var(--cg-color-black1);
      padding: 24px 0 18px;
    }
    p {
      color: var(--cg-color-blue1);
      padding-top: 20px;
    }
    .avatar-box {
      width: 300px;
      height: 300px;
      padding: 10px;
      border-radius: 60%;
      margin: 0 auto;
      box-shadow: 0px 0px 6px var(--cg-color-blue29);
      background: linear-gradient(to bottom, var(--cg-color-blue6), var(--cg-color-blue1));
      overflow: hidden;
      img {
        max-width: 100%;
        max-height: 100%;
        position: relative;
        border-radius: 60%;
      }
    }
  }
  .avatars {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 40px 18px 84px;
    .item {
      width: 25%;
      .box {
        width: 162px;
        height: 162px;
        border-radius: 50%;
        padding: 6px;
        overflow: hidden;
        background: transparent;
        margin: 6px auto;
        img {
          width: 150px;
          height: 150px;
          display: block;
          border-radius: 50%;
        }
        &.active {
          background: linear-gradient(0, var(--cg-color-blue1) 0%, var(--cg-color-blue6) 100%);
        }
      }
    }
  }
}
.bot-btn {
  padding-bottom: 120px;
  button {
    margin: 0 auto;
    border-radius: 16px;
  }
}
</style>
