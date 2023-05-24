# collapse 折叠栏

## 基础用法

 通过 `open` 属性控制打开关闭

 通过 `title` 属性来设置标题

```html

<cg-collapse v-model:open="isOpencoll" @change="collapseChange">
  <cg-collapse-item :image="getSupportImage(exportImg.avatar_group)" name="好运来00" />
</cg-collapse>

```

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 展开关闭 | _boolean_ | - |
| title | 标题 | _number \| string_  | - |

### Slots

| 名称    | 说明             |
| ------- | ---------------- |
| default | 子元素 |

### event

| 名称    |          说明      | 传递参数 |
| ------- | ----------------------|-----|
| change | 当collapse状态改变时触发 | open |

:::

### collapse-item-props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | item名字 | _string_ | - |
| image | 图片路径 | _string_ | -|
| lightText | 搜索高亮文字 | _string_ | -|