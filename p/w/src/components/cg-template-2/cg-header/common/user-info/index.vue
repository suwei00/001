<script setup lang="ts">
import { CgIcon, CgUseAmount, CgAvatar, CgBadge } from '@/components/cg-template-2';
import { useAppStore } from '@/store-pinia';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { storeToRefs } from 'pinia';
const appStore = useAppStore();
const userInfoStore = userInfoStateStore();
const { userInfo, letterCount } = storeToRefs(userInfoStore);
//站内信未读数量
userInfoStore.runGetMemberNum();
</script>

<template>
  <div class="user_info">
    <div class="info">
      <div class="user_name">
        <cg-icon width="18" name="i_info_user" />
        <p class="name">{{ userInfo.username }}</p>
      </div>
      <cg-use-amount amountPadding="0" segmentation />
    </div>
    <cg-avatar
      :width="55"
      :height="55"
      editable
      :isJump="false"
      :fill-rate="userInfoStore.dataIntegrity * 100"
      @avatarEdit="$router.push('/personal/user-info')"
      @click="$router.push('/personal/user-info')"
    />
    <CgBadge :value="letterCount > 99 ? '99+' : letterCount" v-if="letterCount">
      <cg-icon class="pointer icon_hover icon_ml15" width="24" name="i_email_h" @click="$router.push('/personal/notice')" />
    </CgBadge>
    <cg-icon class="pointer icon_hover icon_ml15" width="24" name="i_email_h" @click="$router.push('/personal/notice')" v-else />
    <cg-icon class="pointer icon_hover icon_ml15" width="24" name="i_quit" @click="appStore.logout" />
  </div>
</template>

<style lang="scss" scoped>
.user_info {
  flex: 1;
  display: flex;
  align-items: center;
  // justify-content: space-between;

  .info {
    min-width: 171px;
    height: 76px;
    padding: 12px 8px 12px 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font: var(--cg-font-text2);
    color: var(--cg-color-white1);

    .user_name {
      display: flex;
      height: 18px;
      align-items: center;

      .name {
        margin-left: 6px;
      }
    }
  }

  .icon_ml15 {
    margin-left: 15px;
  }

  .icon_ml8 {
    margin-left: 8px;
  }
}
</style>
