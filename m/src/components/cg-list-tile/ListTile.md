# ListTile

基础用法

```javascript

```

### Props

| 参数          | 说明                                                                                    | 类型    | 可选值  | 默认值  |
| ------------- | --------------------------------------------------------------------------------------- | ------- | ------- | ------- | ----- |
| active        | 是否选中状态                                                                            | boolean | -       | `false` |
| avatarBorder  | 头像下方是否有 border                                                                   | boolean | -       | `false` |
| contentBorder | 内容下方是否有 border                                                                   | boolean | -       | `false` |
| height        | 高度                                                                                    | `string | number` | -       | `120` |
| start         | 两行下方行的布局方式 `justify-content: flex-start 默认 justify-content: space-between;` | boolean | -       | `false` |
| paddingRight  | 头像距离右边的内容的距离                                                                | `string | number` | -       | `24`  |

### Events

| 参数 | 说明 | 类型 |
| ---- | ---- | ---- |

### Slots

| name   | 说明               |
| ------ | ------------------ |
| avatar | 头像               |
| up     | 内容上行           |
| under  | 内容下行           |
| icon   | 最后的 icon 或文字 |
