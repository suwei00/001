<script setup lang="ts" name='friends'>
import { LETTERS } from '@/assets/config/data';

interface ArrItem { avatar?: string; friend_name?: string; friend_uid?: string; nick_name?: string; group: string; children: any[]; chat_id?: string }

// 字母导航
const letterList = computed(() => {
    const arr = cloneDeep(LETTERS)
    arr.push('#')
    return arr
})

</script>

<template>
    <cg-nav-header ref="navheader" fixed placeholder title="Bạn">
        <template #left>
            <cg-icon name="icon_whitesearch" />
        </template>
        <template #right>
            <cg-icon name="icon_listadd" />
        </template>
    </cg-nav-header>
    <div class="fried_list">
        <cg-list-item title="Thông tin mới" :has-margin="false" :border="'short'">
            <template #icon>
                <cg-icon name="icon_notice" width="80" />
            </template>
            <template #link>
                <cg-badge :content="1" />
            </template>
        </cg-list-item>
        <cg-list-item title="Nhóm chat của tôi" :has-margin="false" :border="'short'">
            <template #icon>
                <cg-icon name="icon_group" width="80" />
            </template>

        </cg-list-item>
        <cg-list-item title="Trợ lý nhóm" :has-margin="false" :border="'short'">
            <template #icon>
                <cg-icon name="icon_aide" width="80" />
            </template>
        </cg-list-item>
        <div class="group_list">
            <div class="fr_title">
                Bạn bè
            </div>
            <van-index-bar :index-list="letterList" teleport="body" highlight-color="#597EF7" :sticky="false">
                <div>
                    <van-index-anchor>
                        <template #default>
                            <div class="group_name">
                                A
                            </div>
                        </template>
                    </van-index-anchor>
                    <cg-list-item title="哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈" height="120" :has-margin="false"
                        :border="'long'">
                        <template #icon>
                            <cg-avatar badge="avatar_online" size="88" />
                        </template>
                        <template #subTitle>
                            <cg-icon name="vip_vip1" width="86" margin="13,0,0,0"></cg-icon>
                        </template>
                    </cg-list-item>
                </div>
            </van-index-bar>
            <!-- 无 -->
            <!-- <cg-empty /> -->
        </div>

    </div>
</template>

<style lang="scss" scoped>
.group_list {
    background: var(--cg-color-bg-white);

    .group_name {
        height: 64px;
        background: var(--cg-color-bg-8);
        color: var(--cg-color-text-4);
        font: var(--cg-font-10);
        line-height: 64px;
        padding: 0 32px;
    }

    .fr_title {
        font: var(--cg-font-5);
        color: var(--cg-color-text-3);
        line-height: 88px;
        padding-left: 72px;
        border-bottom: 1px solid var(--cg-color-border-1);
        margin-top: 16px;
    }
}
</style>
