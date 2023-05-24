# Badge 徽标

## 基础用法

### 单独使用

当 Badge 没有子元素时，会作为一个独立的元素进行展示

设置 `max` 属性后，当 `content` 的数值超过最大值时，会自动显示为 {max}+。

```html

<cg-badge :content="200" max="99" />

```

### 通过 `size` 属性来设置徽标的尺寸

  small 为`32px` X `32px` |
  medium 为`36px` X `36px`|
  large 为`76px` X `76px` |
  宽高超出时自适应

### 通过 `color` 属性来设置徽标的背景颜色，`font-color` 属性来设置徽标字体颜色

```html

 <cg-badge :content="'Tham gia nhómTham gia '"  size="large" color="8" font-color="3"/>

```

### 通过 `localtion` 属性来设置徽标的位置

```html
  <cg-badge content="7" max="99" :show-zero="false" location="top-right"> 
    <cg-icon  name="icon_chat" width="48" height="48"/>
  </cg-badge>

```

### 插槽

```html

  <cg-badge content="7" max="99" :show-zero="false" location="top-right"> 
    <cg-icon  name="icon_chat" width="48" height="48"/>
  </cg-badge>

```

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 徽标内容 | _number \| string_ | - |
| color | 徽标背景颜色 | _number \| string_  | `4` |
| font-color | 徽标字体颜色 | _number \| string_  | `white` |
| max | 最大值，超过最大值会显示 `{max}+`，仅当 content 为数字时有效 | _number \| string_ | - |
| show-zero | 当 content 为数字 0 或字符串 '0' 时，是否展示徽标 | _boolean_ | `false` |
| location | 徽标位置，可选值为 `top-left` `bottom-left` `bottom-right` | _string_ | - |
| size | 徽标尺寸，可选值为 `large` `medium` `small`| _string_ | `medium` |

### Slots

| 名称    | 说明             |
| ------- | ---------------- |
| default | 徽标包裹的子元素 |