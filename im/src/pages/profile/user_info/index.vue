<template>
    <!-- 唯一父元素class命名规则 页面:P-pageName 组件C-componentName -->
    <div class='cg-p-user-info'>
        <cg-nav-header title="Thông tin cá nhân" left-arrow @click-left="$router.go(-1)" :fixed="false" />
        <cg-list-item title="Ảnh đại diện" is-link height="160" @click="">
            <template #linkdesc>
                <cg-avatar size="128"
                    src="https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b" />
            </template>
        </cg-list-item>
        <cg-list-item isLink height="112" :title="item.title" :desc="item.desc" subEllipsis v-for="item of itemList" :key="item.type"  />
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
const itemList = [
    {
        title: "Tên nick",
        desc: "AJay_liha",
        type: "nickName"
    },
    {
        title: "Chat ID",
        desc: "34805825",
        type: "seeId"
    },
    {
        title: "Giới tính",
        desc: "Nữ",
        type: "setSex"
    },
    {
        title: "Chữ ký cá nhân",
        desc: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        type: "setDesc"
    },
]
</script>
<style lang='scss' scoped>
.cg-p-user-info {
    .avatar {
        float: right;
    }
}
</style>