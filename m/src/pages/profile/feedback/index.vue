<template>
    <!-- 唯一父元素class命名规则 页面:P-pageName 组件C-componentName -->
    <div class='cg-p-feedback'>
        <cg-nav-header title="Gợi ý phản hồi" left-arrow @click-left="$router.go(-1)" :fixed="false" />
        <div class="feedback-form-container">
            <div>Loại phản hồi</div>
            <div class="type-list flex ai-c">
                <div v-for="item of types" :key="item.value"
                class="type-list-item font_26"
                :class="form.type===item.value&&'active-type'"
                @click="form.type=item.value"
                >
                    {{ item.label }}
                </div>
            </div>
            <div class="mg-y-32">Nội dung phản hồi</div>
            <cg-input
                class="input_default_type"
                clearable
                placeholder="Vui lòng mô tả phản hồi càng chi tiết càng tốt và chúng tôi sẽ giải quyết phản hồi đó sớm nhất có thể"
                v-model="form.text"
                type="textarea"
                maxlength="300"
            />
            <div class="mg-y-32">Chụp ảnh phản hồi ({{form.imgList.length}}/5)</div>
            <div class="img-list">
                <van-uploader v-model="form.imgList" multiple preview-size="var(--cg-px-160)" :max-count="5" :after-read="afterRead">
                    <template #preview-cover="scoped">
                        <ProgressImage :progress="scoped.progress" :size="160" @click="test(scoped)" :image-url="scoped.url"/>
                    </template>
                </van-uploader>
            </div>
            <cg-button shape="square" type="primary" class="mt-50">Gửi đi</cg-button>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
const test = (t:any) =>{
    console.log(t);
}
const types = [
    {
        label: 'Gợi ý',
        value: 1
    }, {
        label: 'Lỗi',
        value: 2
    }, {
        label: 'Khác',
        value: 3
    },
]
const form = reactive({
    type:1,
    text:"",
    imgList:[
        { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg',progress:100 },
        { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg',progress:100 },
        { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg',progress:60 },
        { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg',progress:30 },
        { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg',progress:0 },
        
    ],
})
const afterRead = ()=>{
    console.log(form.imgList);
}
</script>
<style lang='scss' scoped>
.cg-p-feedback {
    background-color: var(--cg-color-bg-white);
    color:var( --cg-color-text-3);
    min-height: 100vh;
    .feedback-form-container {
        padding: 32px;

        .type-list {
            padding: 32px 0;
            margin-bottom: 32px;
            border-bottom: 1px solid var(--cg-color-border-1);
            &-item{
                margin-right: 24px;
                border-radius: 28px;
                text-align: center;
                min-width: 124px;
                height: 56px;
                line-height: 56px;
                background-color: var(--cg-color-bg-8);
                color: var(--cg-color-text-1);
            }
            .active-type{
                background-color: var(--cg-color-bg-1);
                color: var(--cg-color-text-white);
            }
        }
    }
    .input_default_type{
        background-color: var(--cg-color-bg-8);
        height: 248px;
        text-align: start;
        position: relative;
    //    ::v-deep(.area) {
    //         line-height: 32px;
    //         font-size: 28px;
    //         height: 100%;
    //         position: static;
    //         > textarea {
    //            height:min-content
    //         }
    //         .limit{
    //             right: 16px;
    //             bottom: 16px;
    //         }    
    //    }
    }
    .mg-y-32{
       margin: 32px 0;
    }
    .mt-50{
       margin-top: 50px;
    }
    .img-list{
        width: calc(100% + 20px);
    }
}
</style>