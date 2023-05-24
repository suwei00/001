# Image 图片

基础用法

```javascript
  <cg-image width="100" height="100" round alt="哈哈" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
  <cg-image width="100" height="100" round fit="contain" :src="`https://pic.ntimg.cn/2009-02-04/200924103934434_2.jpg?t=${new Date().getTime()}`" />
  <cg-image width="100" height="100" round fit="cover" :src="`https://pic.ntimg.cn/2009-02-04/200924103934434_2.jpg?t=${new Date().getTime()}`" />
  <cg-image width="100" height="100" round fit="scale-down" :src="`https://pic.ntimg.cn/2009-02-04/200924103934434_2.jpg?t=${new Date().getTime()}`" />
  <cg-image width="100" height="100" round fit="none" :src="`https://pic.ntimg.cn/2009-02-04/200924103934434_2.jpg?t=${new Date().getTime()}`" />
  <cg-image width="100" height="100" fit="cover" position="right bottom" :src="`https://pic.ntimg.cn/2009-02-04/200924103934434_2.jpg?t=${new Date().getTime()}`" />
  <cg-image width="100" height="100" fit="cover" position="left bottom" :src="`https://pic.ntimg.cn/2009-02-04/200924103934434_2.jpg?t=${new Date().getTime()}`" />
  <cg-image width="100" height="100" radius="8" :src="`https://pic.ntimg.cn/2009-02-04/200924103934434_2.jpg?t=${new Date().getTime()}`" />
  <cg-image width="100" height="100" filter="blur(2px)" :src="`https://pic.ntimg.cn/2009-02-04/200924103934434_2.jpg?t=${new Date().getTime()}`" />
  <cg-image width="300" height="300" fit="cover" radius="8" show-loading :src="`https://pic.ntimg.cn/2009-02-04/200924103934434_2.jpg?t=${new Date().getTime()}`" />
  <cg-image width="300" height="300" fit="cover" radius="8" show-loading lazy alt="哈哈" :src="`https://pic.ntimg.cn/2009-02-04/200924103934434_2.jpg?t=${new Date().getTime()}`" />
  <cg-image width="300" height="300" show-download showLoading block fake-src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" :real-src="`https://pic.ntimg.cn/2009-02-04/200924103934434_2.jpg?t=${new Date().getTime()}`" />
  <cg-image width="300" height="300" show-download showLoading block :real-src="`https://pic.ntimg.cn/2009-02-04/200924103934434_2.jpg?t=${new Date().getTime()}`" />
```

### Props

| 参数     | 说明                 | 类型    | 可选值                    | 默认值  |
| ----------------- | --------------------- | --------- | ------ | ------- |
| src | 图片地址 | string | ------------------------- | ------- |
| fakeSrc | 模糊占位图片地址 | string | ------------------------- | ------- |
| realSrc | 真实大图图片地址 | string | ------------------------- | ------- |
| alt | 图片说明 | string | ------------------------- | ------- |
| width | 图片宽度 | number string | ------------------------- | ------- |
| height | 图片高度 | number string | ------------------------- | ------- |
| fit | object-fit | string | ------------------------- | ------- |
| position | object-position | string | ------------------------- | ------- |
| filter | filter 效果 | string | ------------------------- | ------- |
| round | 圆形图片 | boolean | ------------------------- | ------- |
| radius | 图片圆角大小 | number string | ------------------------- | ------- |
| lazy | 图片懒加载 | boolean | ------------------------- | ------- |
| block | 是否块级元素 | boolean | ------------------------- | ------- |
| showError | 显示加载失败 | boolean | ------------------------- | ------- |
| showLoading | 显示加载中 | boolean | ------------------------- | ------- |
| errorIcon | 加载失败图标 | string | ------------------------- | ------- |
| loadingIcon | 加载中图标 | string | ------------------------- | ------- |
| iconSize | 图标大小 | number string | ------------------------- | ------- |
| showDownload | 是否显示下载按钮 | boolean | ------------------------- | ------- |

### Slots

| name    | 说明                                     |
| ------- | ---------------------------------------- |
| loading | 加载中图标 |
| error | 失败图标 |

