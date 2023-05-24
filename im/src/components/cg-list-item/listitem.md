# listitem 列表项

基础用法

```javascript
  <cg-list-item color="var(--cg-color-bg-4)" sub-color="var(--cg-color-bg-3)"
    font="var(--cg-font-1)" sub-font="var(--cg-font-12)"
    line-height="44" sub-line-height="36"
    sub-margin-top="50" height="300"
    title="哈哈" sub-title="的酸辣粉家里的沙发看老师发的" :item-align="'flex-start'">
    <template #icon>
      <cg-avatar size="96" src="https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b" />
    </template>
  </cg-list-item>
```

### Props

| 参数     | 说明                 | 类型    | 可选值                    | 默认值  |
| ----------------- | --------------------- | --------- | ------ | ------- |
| title | 内容区上方标题 | string | ------ | ------- |
| subTitle | 内容区下方二级标题 | string | ------ | ------- |
| desc | 右边描述文本 | string | ------ | ------- |
| descTextAlign | 描述文本对齐方式 | string | ------ | ------- |
| isLink | 是否跳转链接 | boolean | ------ | ------- |
| to | 跳转router参数 | string object | ------ | ------- |
| replace | 是否push或者replace方式 | boolean | ------ | ------- |
| roundRadius | 圆角大小 | string number | ------ | ------- |
| url | 跳转路径 | string | ------ | ------- |
| center | 子元素对齐方式是否center | boolean | ------ | ------- |
| size | 整个列表项大小 | string number | ------ | ------- |
| hasMargin | 是否有外边距 | boolean | ------ | ------- |
| border | 是否有底边框以及长度 | full long short | ------ | ------- |
| itemAlign | 列表项子元素对齐方式 | string | ------ | ------- |
| color | 基本字体颜色 | string | ------ | ------- |
| subColor | 次要标题颜色 | string | ------ | ------- |
| font | 大标题字体 | string | ------ | ------- |
| subFont | 次级标题字体 | string | ------ | ------- |
| lineHeight | 大标题行高 | string | ------ | ------- |
| subLineHeight | 次级标题行高 | string | ------ | ------- |
| subMarginTop | 标题间距 | string | ------ | ------- |
| ellipsis | 大标题是否显示省略号 | boolean | ------ | ------- |
| subEllipsis | 次级标题是否显示省略号 | boolean | ------ | ------- |
| height | 列表项高度 | string number | ------ | ------- |

### Slots

| name    | 说明                                     |
| ------- | ---------------------------------------- |
| icon | 左边图片 |
| title | 大标题 |
| subTitle | 二级标题 |
| link | 右边箭头 |
