# contextMenu 右键菜单

## 基础用法

 通过 `visible` 属性控制打开关闭

 通过 `list` 属性传入菜单列表

 ```html
 <cg-context-menu 
        :visible="menuVisible2"
        :list="contextMenuList"
        >
          <van-button @click="menuVisible2=!menuVisible2">
            点击触发菜单
          </van-button>
  </cg-context-menu>
```

通过 `top,right,bottom,left` 属性控制菜单位置

通过 `showTriang` 展示三角形，通过 `triang-left` `triang-right` 控制三角形的位置

```html

 <cg-context-menu 
        :visible="menuVisible"
        :list="contextMenuList"
        @onItemClick="menuVisible =false" 
        @on-long-press="menuVisible=ture"
        top="20" left="0"
        show-triang="bottom" triang-left="-33" 
        size="large"
        >
          <van-button >
            长按触发菜单
          </van-button>
  </cg-context-menu>
```

通过 `list-item` 插槽自定义插槽内容

```html
 <cg-context-menu 
        :visible="menuVisible"
        :list="contextMenuList"
        @onItemClick="menuVisible =false" 
        @on-long-press="menuVisible=ture"
        top="20" left="0"
        show-triang="bottom" triang-left="-33" 
        size="large"
        >
          <van-button >
            长按触发菜单
          </van-button>
          <template #list-item="scoped">
            <div>{{scoped.item.itemName}}</div>
          </template>
  </cg-context-menu>
```

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | `必填`，控制菜单是否展示 | boolean| - |
| list | `必填`，菜单列表 | _cgContextMenuItem[]_ | - |
| showTriang | 展示三角形，可选值`top`——位于菜单上方，`bottom`——位于菜单下方| _string_   | - |
| size | 尺寸，可选值为 `large` `medium` | _string_   |  medium |
| top  | 向上偏移量，当设置top为0时，菜单位于`元素上方`,`top`和`bottom`只需设置一个值| _number_   | - |
| right| 向右偏移量，当设置right为0时，菜单`居右`，`left`和`right`只需设置一个| _number_   | - |
| bottom| 向下偏移量，当设置bottom为0时，菜单位于`元素下方`,`top`和`bottom`只需设置一个值| _number_   | - |
| left|   向左偏移量，当设置left为0时，菜单`居左`，`left`和`right`只需设置一个| _number_   | - |
| triang-left|   三角形偏移量，当设置`triang-left`为0时，三角形`居左`，`triang-left`和`triang-right`只需设置一个| _number_   | - |
| triang-right|   三角形偏移量，当设置`triang-right`为0时，三角形`居右`，`triang-left`和`triang-right`只需设置一个| _number_   | - |

### Slots

| 名称    | 说明             |
| ------- | ---------------- |
| default | 子元素 |
| list-item | 自定义菜单选项卡 |

### event

| 名称    |          说明      | 接收参数 | 参数说明 |
| ------- | ----------------------|-----|-----|
| onItemClick | 点击菜单选项时触发 | item |菜单对象cgContextMenuItem|
| onLongPress | 长按元素时触发 | local | 返回当前长按元素的位置信息 |

:::

### cgContextMenuItem  TS类型

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | icon名字 | _string_ | - |
| itemName | 菜单选项名字 | _string_ | -|
| key | 任意其他键 | _any_ | -|